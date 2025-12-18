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

    // 지도 렌더링
    renderMap() {
        const container = document.getElementById('level-nodes');
        container.innerHTML = '';

        // 실제 서울 지도 기반 좌표 (중구/종로구 중심)
        const pathPositions = [
            { x: 200, y: 250 },   // 1. 태평로1가 (시청)
            { x: 250, y: 230 },   // 2. 소공동 (동쪽)
            { x: 280, y: 260 },   // 3. 명동 (남동쪽)
            { x: 320, y: 240 },   // 4. 을지로 (동쪽)
            { x: 340, y: 300 },   // 5. 장충동 (남산 동쪽)
            { x: 150, y: 200 },   // 6. 인사동 (서쪽)
            { x: 120, y: 280 },   // 7. 광장시장 (남쪽)
            { x: 100, y: 150 },   // 8. 삼청동 (북쪽)
            { x: 60, y: 100 },    // 9. 평창동 (더 북쪽)
            { x: 280, y: 350 }    // 10. 남산 (남쪽)
        ];

        GameData.levels.forEach((level, index) => {
            const node = document.createElement('div');
            node.className = 'level-node';

            // 좌표 설정
            const pos = pathPositions[index] || { x: 100, y: 100 };
            node.style.left = pos.x + 'px';
            node.style.top = pos.y + 'px';

            // 클리어 여부 확인
            if (this.userData.clearedLevels.includes(level.id)) {
                node.classList.add('cleared');
            }

            // 잠금 여부
            if (level.id > 1 && !this.userData.clearedLevels.includes(level.id - 1)) {
                node.classList.add('locked');
                node.onclick = () => alert('이전 레벨을 먼저 클리어하세요!');
            } else {
                node.onclick = () => this.showPuzzle(level.id);
            }

            // 레벨 정보
            const levelNumber = document.createElement('div');
            levelNumber.className = 'level-number';
            levelNumber.textContent = level.id;

            const levelName = document.createElement('div');
            levelName.className = 'level-name';
            levelName.textContent = level.name.split(' ').pop(); // 마지막 단어만 (동 이름)

            node.appendChild(levelNumber);
            node.appendChild(levelName);

            // 맛집 스테이지 표시
            if (level.isAd) {
                node.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
                const icon = document.createElement('div');
                icon.style.fontSize = '16px';
                icon.textContent = '🍴';
                node.appendChild(icon);
            }

            container.appendChild(node);
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
