// 유저 데이터 동기화 모듈
// Firebase Auth + Neon PostgreSQL 연동

const UserSync = {
    // Cloudflare Workers API URL
    API_URL: 'https://daedong-api.hyukchm.workers.dev',

    // 현재 유저
    currentUser: null,

    // 동기화 상태
    isSyncing: false,
    lastSyncTime: null,

    // 로컬 저장소 키
    LOCAL_KEY: 'daedong_user_data',

    // 초기화
    async init() {
        console.log('🔐 UserSync 초기화...');

        // Firebase Auth 상태 변경 감지
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.onLogin(user);
                } else {
                    this.onLogout();
                }
            });
        }

        // 로컬 데이터 로드
        this.loadLocalData();
    },

    // 로그인 시
    async onLogin(firebaseUser) {
        console.log('✅ 로그인:', firebaseUser.displayName || firebaseUser.email);

        this.currentUser = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Player',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL
        };

        // 서버에서 유저 데이터 가져오기
        await this.syncFromServer();

        // UI 업데이트
        this.updateLoginUI(true);
    },

    // 로그아웃 시
    onLogout() {
        console.log('👋 로그아웃');
        this.currentUser = null;
        this.updateLoginUI(false);
    },

    // 로그인 UI 업데이트
    updateLoginUI(isLoggedIn) {
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');

        if (loginBtn) {
            loginBtn.style.display = isLoggedIn ? 'none' : 'block';
        }

        if (userInfo && this.currentUser) {
            userInfo.innerHTML = `
        <span style="font-size: 12px;">
          ${this.currentUser.photoURL ? `<img src="${this.currentUser.photoURL}" style="width:20px;height:20px;border-radius:50%;vertical-align:middle;">` : '👤'}
          ${this.currentUser.displayName}
        </span>
      `;
            userInfo.style.display = isLoggedIn ? 'block' : 'none';
        }
    },

    // 서버에서 데이터 동기화
    async syncFromServer() {
        if (!this.currentUser || !this.API_URL) {
            // API 없으면 로컬 데이터 사용
            return this.loadLocalData();
        }

        try {
            this.isSyncing = true;

            const response = await fetch(`${this.API_URL}/api/user?uid=${this.currentUser.uid}`);
            const serverData = await response.json();

            if (serverData && serverData.uid) {
                // 서버 데이터가 있으면 로컬과 병합
                const localData = this.loadLocalData();
                const mergedData = this.mergeData(localData, serverData);

                this.saveLocalData(mergedData);
                this.applyToGame(mergedData);

                console.log('📥 서버 데이터 동기화 완료');
            }

            this.lastSyncTime = new Date();

        } catch (error) {
            console.warn('⚠️ 서버 동기화 실패, 로컬 데이터 사용:', error.message);
        } finally {
            this.isSyncing = false;
        }
    },

    // 서버로 데이터 저장
    async syncToServer() {
        if (!this.currentUser || !this.API_URL) return;

        try {
            this.isSyncing = true;

            const userData = this.getGameData();
            userData.uid = this.currentUser.uid;
            userData.display_name = this.currentUser.displayName;

            await fetch(`${this.API_URL}/api/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            this.lastSyncTime = new Date();
            console.log('📤 서버 저장 완료');

        } catch (error) {
            console.warn('⚠️ 서버 저장 실패:', error.message);
        } finally {
            this.isSyncing = false;
        }
    },

    // 게임 데이터 가져오기
    getGameData() {
        if (typeof Game === 'undefined') return {};

        return {
            selectedCharacter: Game.userData?.selectedCharacter,
            gold: Game.userData?.gold || 0,
            mp: Game.userData?.mp || 0,
            hearts: Game.userData?.hearts || 5,
            clearedLevels: Game.userData?.clearedLevels || [],
            completedGus: Game.userData?.completedGus || [],
            completedDongs: Game.userData?.completedDongs || [],
            inventory: Game.userData?.inventory || [],
            boosters: Game.userData?.boosters || { HAMMER: 0, BOMB: 0, RAINBOW: 0 }
        };
    },

    // 게임에 데이터 적용
    applyToGame(data) {
        if (typeof Game === 'undefined') return;

        if (data.selectedCharacter) Game.userData.selectedCharacter = data.selectedCharacter;
        if (data.gold !== undefined) Game.userData.gold = data.gold;
        if (data.mp !== undefined) Game.userData.mp = data.mp;
        if (data.hearts !== undefined) Game.userData.hearts = data.hearts;
        if (data.clearedLevels) Game.userData.clearedLevels = data.clearedLevels;
        if (data.completedGus) Game.userData.completedGus = data.completedGus;
        if (data.completedDongs) Game.userData.completedDongs = data.completedDongs;
        if (data.inventory) Game.userData.inventory = data.inventory;
        if (data.boosters) Game.userData.boosters = data.boosters;

        // 로컬 저장
        Game.saveUserData();
    },

    // 로컬 데이터 로드
    loadLocalData() {
        try {
            const data = localStorage.getItem(this.LOCAL_KEY);
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    },

    // 로컬 데이터 저장
    saveLocalData(data) {
        try {
            localStorage.setItem(this.LOCAL_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('로컬 저장 실패:', e);
        }
    },

    // 데이터 병합 (최신 우선)
    mergeData(local, server) {
        // 더 많이 진행된 데이터 우선
        const localProgress = (local.clearedLevels?.length || 0);
        const serverProgress = (server.cleared_levels?.length || server.clearedLevels?.length || 0);

        if (serverProgress >= localProgress) {
            return {
                ...local,
                ...server,
                clearedLevels: server.cleared_levels || server.clearedLevels || local.clearedLevels || [],
                completedGus: server.completed_gus || server.completedGus || local.completedGus || [],
                completedDongs: server.completed_dongs || server.completedDongs || local.completedDongs || []
            };
        }

        return local;
    },

    // Google 로그인
    async loginWithGoogle() {
        if (typeof firebase === 'undefined') {
            alert('Firebase가 로드되지 않았습니다.');
            return;
        }

        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인에 실패했습니다: ' + error.message);
        }
    },

    // 익명 로그인 (게스트)
    async loginAsGuest() {
        if (typeof firebase === 'undefined') {
            // Firebase 없으면 로컬만 사용
            this.currentUser = { uid: 'guest_' + Date.now(), displayName: '게스트' };
            this.updateLoginUI(true);
            return;
        }

        try {
            await firebase.auth().signInAnonymously();
        } catch (error) {
            console.error('게스트 로그인 오류:', error);
        }
    },

    // 로그아웃
    async logout() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().signOut();
        }
        this.currentUser = null;
        this.updateLoginUI(false);
    },

    // 자동 저장 (레벨 클리어 시 등)
    autoSave() {
        // 로컬 저장
        const data = this.getGameData();
        if (this.currentUser) {
            data.uid = this.currentUser.uid;
        }
        this.saveLocalData(data);

        // 서버 저장 (로그인 시)
        if (this.currentUser && this.API_URL) {
            // 디바운싱 (5초 이내 중복 저장 방지)
            if (this._saveTimeout) clearTimeout(this._saveTimeout);
            this._saveTimeout = setTimeout(() => this.syncToServer(), 2000);
        }
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    UserSync.init();
});

// 전역 접근
window.UserSync = UserSync;
