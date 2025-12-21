// 메인 게임 로직

const Game = {
    userData: {
        gold: 0,
        mp: 0,
        hearts: 5,
        selectedCharacter: null,
        inventory: [],
        clearedLevels: [],
        boosters: {
            HAMMER: 0,
            BOMB: 0,
            RAINBOW: 0
        }
    },

    selectedAge: null,
    selectedGender: null,

    init() {
        this.loadUserData();
        this.setupCharacterSelect();
        this.initRegionMap();

        // 이미 캐릭터를 선택한 적이 있으면 메인 메뉴로, 아니면 캐릭터 선택으로
        if (this.userData.selectedCharacter) {
            this.showMainMenu();
        } else {
            // 처음 접속하는 사용자
            this.showCharacterSelect();
        }
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
        const options = [
            '캐릭터 변경',
            '게임 초기화',
            '닫기'
        ];

        const choice = prompt(
            '⚙️ 설정\n\n' +
            '1. 캐릭터 변경\n' +
            '2. 게임 초기화\n' +
            '3. 닫기\n\n' +
            '번호를 입력하세요:'
        );

        switch (choice) {
            case '1':
                this.changeCharacter();
                break;
            case '2':
                this.resetGame();
                break;
            case '3':
            default:
                break;
        }
    },

    changeCharacter() {
        if (confirm('캐릭터를 변경하시겠습니까?\n\n현재 진행 상황은 유지됩니다.')) {
            this.showCharacterSelect();
        }
    },

    showInfo() {
        alert('게임 정보\n\n말랑말랑 대동맛지도\n서울/경기 지역을 탐험하며 맛집을 찾아가는 퍼즐 게임입니다.');
    },

    showInventory() {
        const popup = document.getElementById('inventory-popup');
        popup.classList.add('active');

        // 캐릭터 정보 표시
        const character = GameData.characters.find(c => c.id === this.userData.selectedCharacter);
        if (character) {
            // 캐릭터 이모지 (나이/성별별)
            const avatarEmojis = {
                '10M': '👦', '10F': '👧',
                '20M': '🧑', '20F': '👩',
                '30M': '👨‍💼', '30F': '👩‍💼',
                '40M': '👨‍🦰', '40F': '👩‍🦰',
                '60M': '👴', '60F': '👵'
            };
            const emojiKey = character.age + character.gender;

            document.getElementById('inventory-avatar').textContent = avatarEmojis[emojiKey] || '👤';
            document.getElementById('inventory-char-name').textContent = character.name;
            document.getElementById('inventory-char-desc').textContent = character.desc;
            document.getElementById('inventory-char-skill').textContent = character.skill;
        }

        // 아이템 목록 표시
        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';

        if (this.userData.inventory.length === 0) {
            grid.innerHTML = `
                <div class="empty-inventory">
                    <div class="empty-inventory-icon">📦</div>
                    <p>아이템이 없습니다</p>
                    <p style="font-size: 12px;">레벨을 클리어하여 아이템을 획득하세요!</p>
                </div>
            `;
        } else {
            // 아이템 개수 집계
            const itemCounts = {};
            this.userData.inventory.forEach(itemId => {
                itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
            });

            // 아이템 카드 생성
            Object.entries(itemCounts).forEach(([itemId, count]) => {
                const item = GameData.items[itemId];
                if (item) {
                    const itemEmojis = {
                        'HP_HEAL': '❤️',
                        'GOLD': '💰',
                        'ATK': '⚔️',
                        'SKILL_UP': '🔥',
                        'COOLDOWN': '⏱️',
                        'HP_MAX': '💪',
                        'MP_INSTANT': '🎫',
                        'UNLOCK': '🏆'
                    };

                    const card = document.createElement('div');
                    card.className = `item-card rarity-${item.rarity}`;
                    card.innerHTML = `
                        <div class="item-icon">${itemEmojis[item.effect] || '🍱'}</div>
                        <div class="item-name">${item.name}</div>
                        <div class="item-count">×${count}</div>
                    `;
                    card.onclick = () => this.showItemDetail(itemId);
                    grid.appendChild(card);
                }
            });
        }
    },

    closeInventory() {
        document.getElementById('inventory-popup').classList.remove('active');
    },

    showItemDetail(itemId) {
        const item = GameData.items[itemId];
        if (item) {
            alert(`📦 ${item.name}\n\n${item.desc}\n\n등급: ${item.rarity}\n효과: ${item.effect} +${item.value}`);
        }
    },

    showCrafting() {
        const popup = document.getElementById('crafting-popup');
        popup.classList.add('active');

        this.selectedRecipe = null;
        this.renderRecipes();
    },

    renderRecipes() {
        const grid = document.getElementById('recipe-grid');
        grid.innerHTML = '';

        GameData.craftingRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            // 재료 텍스트
            const materialText = recipe.materials.map(m =>
                `${m.rarity}×${m.count}`
            ).join(', ');

            card.innerHTML = `
                <div class="recipe-icon">${recipe.icon}</div>
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-materials">${materialText}</div>
            `;

            card.onclick = () => this.selectRecipe(recipe);
            grid.appendChild(card);
        });
    },

    selectRecipe(recipe) {
        this.selectedRecipe = recipe;

        // 모든 카드에서 selected 제거
        document.querySelectorAll('.recipe-card').forEach(c => c.classList.remove('selected'));

        // 선택된 카드 하이라이트
        event.currentTarget.classList.add('selected');

        // 재료 확인 및 표시
        this.displayRecipeDetails(recipe);
    },

    displayRecipeDetails(recipe) {
        const container = document.getElementById('selected-recipe');

        // 인벤토리에서 등급별 아이템 개수 집계
        const rarityCount = {};
        this.userData.inventory.forEach(itemId => {
            const item = GameData.items[itemId];
            if (item) {
                rarityCount[item.rarity] = (rarityCount[item.rarity] || 0) + 1;
            }
        });

        // 재료 충족 여부 확인
        let canCraft = true;
        const materialsList = recipe.materials.map(material => {
            const has = rarityCount[material.rarity] || 0;
            const hasEnough = has >= material.count;
            if (!hasEnough) canCraft = false;

            return `
                <div class="material-item ${hasEnough ? 'has' : 'missing'}">
                    <div class="material-icon">${material.rarity === 'C' ? '⚪' : material.rarity === 'B' ? '🟢' : material.rarity === 'A' ? '🔵' : '🟣'}</div>
                    <div class="material-text">
                        <strong>${material.rarity}등급 아이템</strong><br>
                        <small>필요: ${material.count}개 / 보유: ${has}개</small>
                    </div>
                    <div class="material-status">${hasEnough ? '✅' : '❌'}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h4>${recipe.icon} ${recipe.name}</h4>
            <p>${recipe.desc}</p>
            <div class="materials-list">
                <strong>필요한 재료:</strong>
                ${materialsList}
            </div>
        `;

        // 조합 버튼 활성화/비활성화
        const craftBtn = document.getElementById('craft-btn');
        craftBtn.disabled = !canCraft;
    },

    executeCraft() {
        if (!this.selectedRecipe) return;

        const recipe = this.selectedRecipe;

        // 재료 소비
        const usedItems = [];
        recipe.materials.forEach(material => {
            let needed = material.count;
            for (let i = this.userData.inventory.length - 1; i >= 0 && needed > 0; i--) {
                const itemId = this.userData.inventory[i];
                const item = GameData.items[itemId];
                if (item && item.rarity === material.rarity) {
                    usedItems.push(this.userData.inventory.splice(i, 1)[0]);
                    needed--;
                }
            }
        });

        // 부스터 획득
        this.userData.boosters[recipe.result.id] += recipe.result.count;

        this.saveUserData();

        alert(`✨ 조합 성공!\n\n${recipe.icon} ${recipe.name}을(를) 획득했습니다!\n\n사용한 재료:\n${usedItems.map(id => GameData.items[id].name).join(', ')}`);

        // UI 갱신
        this.renderRecipes();
        if (this.selectedRecipe) {
            this.displayRecipeDetails(this.selectedRecipe);
        }
    },

    closeCrafting() {
        document.getElementById('crafting-popup').classList.remove('active');
        this.selectedRecipe = null;
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
                <div style="text-align: center;">
                    <img src="${character.image}" alt="${character.name}" 
                         style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 15px; 
                                border-radius: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                padding: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
                    <h3>${character.name}</h3>
                    <p>${character.desc}</p>
                    <p style="margin-top: 10px; color: #00796B;">
                        고유 능력: ${character.skill}
                    </p>
                </div>
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

        // 처음 캐릭터를 선택한 경우 환영 메시지
        const character = GameData.characters.find(c => c.id === this.userData.selectedCharacter);
        if (character && !this.userData.clearedLevels.length) {
            alert(`🎉 환영합니다!\n\n${character.name}님, 서울 맛집 여행을 시작합니다!\n\n고유 능력: ${character.skill}`);
        }

        this.showMap();
    },

    selectRegion(region) {
        // 지역 데이터 가져오기
        const regionData = typeof RegionData !== 'undefined' ? RegionData.getRegion(region) : null;

        if (region === 'seoul') {
            // 서울: 레벨 1-10
            this.currentRegion = 'seoul';
            this.regionLevelOffset = 0;

            // If user already has a character, go directly to map
            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                // New user needs to select character first
                this.showCharacterSelect();
            }
        } else if (region === 'busan') {
            // 부산: 레벨 11-18
            this.currentRegion = 'busan';
            this.regionLevelOffset = 10;

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        } else if (region === 'gyeonggi') {
            alert('경기도 지역은 준비 중입니다!\n곧 업데이트될 예정입니다. 😊');
        } else {
            // 기타 지역 (아직 미구현)
            const regionName = regionData ? regionData.name : region;
            alert(`${regionName} 지역은 준비 중입니다!\n곧 업데이트될 예정입니다. 😊`);
        }
    },

    initRegionMap() {
        // 지역 선택 지도 생성
        if (this.regionMap) {
            this.regionMap.remove();
        }

        const koreaCenter = [37.5, 127.0];

        this.regionMap = L.map('region-map', {
            center: koreaCenter,
            zoom: 9,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 11,
            minZoom: 9
        }).addTo(this.regionMap);

        // 서울 마커
        const seoulMarker = L.circle([37.5665, 126.9780], {
            color: '#FF6B9D',
            fillColor: '#FF6B9D',
            fillOpacity: 0.5,
            radius: 15000
        }).addTo(this.regionMap);

        seoulMarker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="font-size: 18px;">서울</strong><br>
                <p style="margin: 5px 0;">10개 동네</p>
                <button onclick="Game.selectRegion('seoul')" style="
                    background: linear-gradient(135deg, #FF6B9D, #C44569);
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                ">시작하기</button>
            </div>
        `);

        seoulMarker.on('click', () => {
            seoulMarker.openPopup();
        });

        // 경기도 영역 (잠금)
        const gyeonggiArea = L.circle([37.4, 127.3], {
            color: '#999',
            fillColor: '#ccc',
            fillOpacity: 0.3,
            radius: 30000
        }).addTo(this.regionMap);

        gyeonggiArea.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="font-size: 18px; color: #999;">경기도</strong><br>
                <p style="margin: 5px 0; color: #999;">🔒 준비 중</p>
            </div>
        `);
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
    onLevelClear(levelId, score, rewardItemId = null) {
        console.log(`레벨 ${levelId} 클리어! 점수: ${score}`);

        // 레벨 클리어 기록
        if (!this.userData.clearedLevels.includes(levelId)) {
            this.userData.clearedLevels.push(levelId);
        }

        // 아이템 획득 (맛집 풀에서 선택된 아이템 또는 기본 아이템)
        const itemId = rewardItemId || GameData.levels.find(l => l.id === levelId)?.reward;
        if (itemId) {
            this.userData.inventory.push(itemId);

            // 맛집 도감에 추가 (Restaurant Collection System)
            if (window.RestaurantCollection) {
                // Find restaurant data from restaurantPools
                let restaurantData = null;
                for (const poolLevelId in GameData.restaurantPools) {
                    const pool = GameData.restaurantPools[poolLevelId];
                    const found = pool.restaurants.find(r => r.itemId === itemId);
                    if (found) {
                        restaurantData = found;
                        break;
                    }
                }

                if (restaurantData) {
                    const added = RestaurantCollection.addRestaurant(itemId, restaurantData);
                    if (added) {
                        console.log(`맛집 도감에 추가됨: ${restaurantData.name}`);
                    }
                }
            }
        }

        // 보상 지급 (기존 로직 유지)
        const level = GameData.levels.find(l => l.id === levelId);
        if (level) {
            this.userData.gold += 100; // Gold reward
            // 맛집 스테이지 보너스
            if (level.isAd) {
                this.userData.mp += 50;
                console.log('맛집 홍보 보너스! +50 MP');
            }
        }

        this.saveUserData();
    }

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
