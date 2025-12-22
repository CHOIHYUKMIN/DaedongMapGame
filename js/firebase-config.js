// Firebase 설정 및 초기화
// Firebase Console에서 설정값을 가져와 여기에 입력하세요

const firebaseConfig = {
    apiKey: "AIzaSyAfOemSxZug0R3zhvIADr2YVcUvQ5_NTvw",
    authDomain: "daedongmapgame.firebaseapp.com",
    projectId: "daedongmapgame",
    storageBucket: "daedongmapgame.firebasestorage.app",
    messagingSenderId: "922451969830",
    appId: "1:922451969830:web:4dac3cc4d0a5b77e59e3e7",
    measurementId: "G-997J0N3BP5"
};

// Firebase 앱 초기화
let app, auth, db;

function initFirebase() {
    try {
        // Firebase SDK 로드 확인
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK가 로드되지 않았습니다.');
            return false;
        }

        // Firebase 초기화
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();

        console.log('✅ Firebase 초기화 완료');

        // 인증 상태 변경 리스너
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('사용자 로그인:', user.email);
                onUserLogin(user);
            } else {
                console.log('사용자 로그아웃');
                onUserLogout();
            }
        });

        return true;
    } catch (error) {
        console.error('Firebase 초기화 실패:', error);
        return false;
    }
}

// 사용자 로그인 시 호출
function onUserLogin(user) {
    // UI 업데이트
    updateLoginUI(true, user);

    // Firestore에서 데이터 로드
    loadUserDataFromFirestore(user.uid);
}

// 사용자 로그아웃 시 호출
function onUserLogout() {
    // UI 업데이트
    updateLoginUI(false);
}

// 로그인 UI 업데이트
function updateLoginUI(isLoggedIn, user = null) {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');

    if (isLoggedIn && user) {
        loginBtn.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            userInfo.innerHTML = `
                <img src="${user.photoURL || '/images/default-avatar.png'}" 
                     style="width: 36px; height: 36px; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
                     onclick="if(confirm('로그아웃 하시겠습니까?')) FirebaseAuth.logout();"
                     title="${user.displayName || user.email}">
            `;
        }
    } else {
        loginBtn.style.display = 'block';
        if (userInfo) {
            userInfo.style.display = 'none';
        }
    }
}

// Firebase Authentication 기능
const FirebaseAuth = {
    // Google 로그인
    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');

            const result = await auth.signInWithPopup(provider);
            console.log('Google 로그인 성공:', result.user.email);
            return result.user;
        } catch (error) {
            console.error('Google 로그인 실패:', error);
            alert('로그인에 실패했습니다: ' + error.message);
            return null;
        }
    },

    // 이메일/비밀번호 로그인
    async loginWithEmail(email, password) {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            return result.user;
        } catch (error) {
            console.error('이메일 로그인 실패:', error);
            alert('로그인에 실패했습니다: ' + error.message);
            return null;
        }
    },

    // 회원가입
    async signup(email, password, displayName) {
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);

            // 프로필 업데이트
            await result.user.updateProfile({ displayName });

            return result.user;
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다: ' + error.message);
            return null;
        }
    },

    // 로그아웃
    async logout() {
        try {
            await auth.signOut();
            console.log('로그아웃 완료');

            // localStorage 데이터 유지 (옵션)
            if (confirm('로컬 데이터를 삭제하시겠습니까?')) {
                localStorage.removeItem('daedongMapGame');
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    },

    // 현재 사용자 가져오기
    getCurrentUser() {
        return auth.currentUser;
    }
};

// Firestore 데이터 동기화
const FirestoreSync = {
    // Firestore에서 사용자 데이터 로드
    async loadUserData(userId) {
        try {
            const docRef = db.collection('users').doc(userId);
            const doc = await docRef.get();

            if (doc.exists) {
                const data = doc.data();
                console.log('Firestore 데이터 로드:', data);

                // Game.userData에 병합
                if (data.gameData) {
                    Object.assign(Game.userData, data.gameData);
                    Game.saveUserData(); // localStorage에도 저장
                }

                // Restaurant Collection 복원
                if (data.restaurantCollection && window.RestaurantCollection) {
                    RestaurantCollection.collection = data.restaurantCollection;
                    RestaurantCollection.saveCollection(); // localStorage에도 저장
                    console.log('맛집 도감 데이터 복원 완료');
                }

                return data;
            } else {
                console.log('신규 사용자 - Firestore에 데이터 생성');
                await this.saveUserData(userId);
                return null;
            }
        } catch (error) {
            console.error('Firestore 데이터 로드 실패:', error);
            return null;
        }
    },

    // Firestore에 사용자 데이터 저장
    async saveUserData(userId) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docRef = db.collection('users').doc(userId || user.uid);

            // Prepare data to save
            const saveData = {
                profile: {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                },
                gameData: Game.userData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Include restaurant collection if available
            if (window.RestaurantCollection && RestaurantCollection.collection) {
                saveData.restaurantCollection = RestaurantCollection.collection;
            }

            await docRef.set(saveData, { merge: true });

            console.log('✅ Firestore 저장 완료');
        } catch (error) {
            console.error('Firestore 저장 실패:', error);
        }
    },

    // 실시간 동기화 시작
    startRealtimeSync(userId) {
        const docRef = db.collection('users').doc(userId);

        return docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                console.log('실시간 데이터 업데이트:', data);

                // 다른 기기에서 변경된 데이터 반영
                if (data.gameData) {
                    Object.assign(Game.userData, data.gameData);
                    // UI 업데이트
                    if (typeof Game.updateUI === 'function') {
                        Game.updateUI();
                    }
                }
            }
        }, (error) => {
            console.error('실시간 동기화 오류:', error);
        });
    }
};

// Firestore에서 데이터 로드 (내부 함수)
async function loadUserDataFromFirestore(userId) {
    const data = await FirestoreSync.loadUserData(userId);

    // 실시간 동기화 시작
    FirestoreSync.startRealtimeSync(userId);
}

// Game 객체에 Firestore 저장 함수 추가
if (typeof Game !== 'undefined') {
    const originalSaveUserData = Game.saveUserData;

    Game.saveUserData = function () {
        // 기존 localStorage 저장
        originalSaveUserData.call(this);

        // Firestore에도 저장 (로그인 상태일 경우)
        const user = FirebaseAuth.getCurrentUser();
        if (user) {
            FirestoreSync.saveUserData(user.uid);
        }
    };
}

// 페이지 로드 시 Firebase 초기화
document.addEventListener('DOMContentLoaded', () => {
    // Firebase SDK 로드 대기
    setTimeout(() => {
        initFirebase();
    }, 1000);
});
