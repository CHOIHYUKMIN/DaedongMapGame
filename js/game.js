// 메인 게임 로직

const Game = {
    userData: {
        gold: 0,
        mp: 0,
        hearts: 5,
        selectedCharacter: null,
        inventory: [],
        clearedLevels: []
    },

    selectedAge: null,
    selectedGender: null,

    init() {
        this.loadUserData();
        this.showMainMenu();
        this.setupCharacterSelect();
    },

    // 화면 전환
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    showMainMenu() {
        this.showScreen('main-menu');
    },

    showCharacterSelect() {
        this.showScreen('character-select');
    },

    showMap() {
        this.showScreen('map-screen');
        this.renderMap();
        this.updateResourceDisplay();
    },

    showPuzzle(levelId) {
        this.showScreen('puzzle-screen');
        Puzzle.init(levelId);
    },

    showSettings() {
        alert('설정 화면 (미구현)');
    },

    showInfo() {
        alert('게임 정보\n\n말랑말랑 대동맛지도\n서울/경기 지역을 탐험하며 맛집을 찾아가는 퍼즐 게임입니다.');
    },

    showInventory() {
        let message = '🎒 인벤토리\n\n';
        if (this.userData.inventory.length === 0) {
            message += '아이템이 없습니다.';
        } else {
            this.userData.inventory.forEach(itemId => {
                const item = GameData.items[itemId];
                if (item) {
                    message += `• ${item.name} (${item.desc})\n`;
                }
            });
        }
        alert(message);
    },

    showShop() {
        alert('상점 (미구현)\n추후 MP를 사용하여 아이템을 구매할 수 있습니다.');
    },

    // 캐릭터 선택 설정
    setupCharacterSelect() {
        // 나이 버튼
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedAge = btn.dataset.age;
                this.updateCharacterPreview();
            });
        });

        // 성별 버튼
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedGender = btn.dataset.gender;
                this.updateCharacterPreview();
            });
        });
    },

    updateCharacterPreview() {
        const preview = document.getElementById('selected-character');

        if (!this.selectedAge || !this.selectedGender) {
            preview.innerHTML = '<p>나이와 성별을 선택해주세요</p>';
            return;
        }

        const character = GameData.characters.find(c =>
            c.age === this.selectedAge && c.gender === this.selectedGender
        );

        if (character) {
            preview.innerHTML = `
                <h3>${character.name}</h3>
                <p>${character.desc}</p>
                <p style="margin-top: 10px; color: #00796B;">
                    고유 능력: ${character.skill}
                </p>
            `;
            this.userData.selectedCharacter = character.id;
        }
    },

    startGame() {
        if (!this.userData.selectedCharacter) {
            alert('캐릭터를 선택해주세요!');
            return;
        }

        this.saveUserData();
        this.showMap();
    },

    selectRegion(region) {
        if (region === 'seoul') {
            this.showCharacterSelect();
        } else if (region === 'gyeonggi') {
            alert('경기도 지역은 준비 중입니다!\n곧 업데이트될 예정입니다. 😊');
        }
    },

    // 지도 렌더링 (Leaflet.js 사용)
    renderMap() {
        // 기존 지도 제거
        if (this.map) {
            this.map.remove();
        }

        // 서울 중심 좌표
        const seoulCenter = [37.5665, 126.9780];

        // Leaflet 지도 생성
        this.map = L.map('seoul-map', {
            center: seoulCenter,
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: true
        });

        // OpenStreetMap 타일 레이어
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 18
        }).addTo(this.map);

        // 레벨 실제 좌표
        const levelLocations = [
            { lat: 37.5665, lng: 126.9780 },  // 1. 시청
            { lat: 37.5640, lng: 126.9810 },  // 2. 소공동
            { lat: 37.5636, lng: 126.9826 },  // 3. 명동
            { lat: 37.5664, lng: 126.9910 },  // 4. 을지로
            { lat: 37.5610, lng: 127.0050 },  // 5. 장충동
            { lat: 37.5730, lng: 126.9850 },  // 6. 인사동
            { lat: 37.5705, lng: 127.0000 },  // 7. 광장시장
            { lat: 37.5860, lng: 126.9830 },  // 8. 삼청동
            { lat: 37.6100, lng: 126.9750 },  // 9. 평창동
            { lat: 37.5512, lng: 126.9882 }   // 10. 남산
        ];

        // 경로 선 그리기 (레벨 순서대로)
        const pathCoordinates = levelLocations.map(loc => [loc.lat, loc.lng]);
        L.polyline(pathCoordinates, {
            color: '#FF6B9D',
            weight: 4,
            opacity: 0.6,
            smoothFactor: 1,
            dashArray: '10, 10'
        }).addTo(this.map);

        GameData.levels.forEach((level, index) => {
            const loc = levelLocations[index];
            if (!loc) return;

            const isCleared = this.userData.clearedLevels.includes(level.id);
            const isLocked = level.id > 1 && !this.userData.clearedLevels.includes(level.id - 1);

            const iconHtml = `<div style="background: ${isCleared ? 'linear-gradient(135deg, #FFD700, #FFA500)' : isLocked ? '#ccc' : 'linear-gradient(135deg, #FF6B9D, #C44569)'};border: 3px solid ${isCleared ? '#FFA500' : isLocked ? '#999' : '#C44569'};border-radius: 50%;width: 40px;height: 40px;display: flex;align-items: center;justify-content: center;color: white;font-weight: bold;font-size: 16px;box-shadow: 0 2px 8px rgba(0,0,0,0.3);cursor: ${isLocked ? 'not-allowed' : 'pointer'};opacity: ${isLocked ? '0.5' : '1'};">${level.id}</div>`;

            const marker = L.marker([loc.lat, loc.lng], {
                icon: L.divIcon({
                    html: iconHtml,
                    className: 'custom-marker',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                })
            }).addTo(this.map);

            marker.bindPopup(`<div style="text-align: center; padding: 5px;"><strong>${level.name}</strong><br>${isCleared ? '✅ 클리어!' : isLocked ? '🔒 잠김' : '목표: ' + level.target + '점'}</div>`);

            if (!isLocked) {
                marker.on('click', () => this.showPuzzle(level.id));
            } else {
                marker.on('click', () => alert('이전 레벨을 먼저 클리어하세요!'));
            }
        });
    },

    updateResourceDisplay() {
        document.getElementById('gold-display').textContent = this.userData.gold;
        document.getElementById('mp-display').textContent = this.userData.mp;
        document.getElementById('heart-display').textContent = this.userData.hearts;
    },

    // 레벨 클리어 처리
    onLevelClear(levelId, score) {
        console.log(`레벨 ${levelId} 클리어! 점수: ${score}`);

        // 클리어 기록
        if (!this.userData.clearedLevels.includes(levelId)) {
            this.userData.clearedLevels.push(levelId);
        }

        // 보상 지급
        const level = GameData.levels.find(l => l.id === levelId);
        if (level) {
            this.userData.inventory.push(level.reward);
            this.userData.gold += 100;

            // 맛집 스테이지 보너스
            if (level.isAd) {
                this.userData.mp += 50;
                console.log('맛집 홍보 보너스! +50 MP');
            }
        }

        this.saveUserData();
    },

    retryLevel() {
        document.getElementById('result-popup').classList.remove('active');
        const levelId = Puzzle.currentLevel.id;
        Puzzle.init(levelId);
    },

    pauseGame() {
        if (confirm('게임을 일시정지하고 지도로 돌아가시겠습니까?')) {
            document.getElementById('result-popup').classList.remove('active');
            this.showMap();
        }
    },

    // 데이터 저장/로드
    saveUserData() {
        localStorage.setItem('daedongMapGame', JSON.stringify(this.userData));
        console.log('게임 저장 완료');
    },

    loadUserData() {
        const saved = localStorage.getItem('daedongMapGame');
        if (saved) {
            this.userData = JSON.parse(saved);
            console.log('저장된 게임 로드 완료');
        } else {
            console.log('새 게임 시작');
        }
    },

    resetGame() {
        if (confirm('정말로 게임을 초기화하시겠습니까?')) {
            localStorage.removeItem('daedongMapGame');
            location.reload();
        }
    }
};

// 페이지 로드 시 게임 초기화
window.addEventListener('DOMContentLoaded', () => {
    console.log('=== 말랑말랑 대동맛지도 ===');
    console.log('웹 버전 v0.1');
    Game.init();
});
