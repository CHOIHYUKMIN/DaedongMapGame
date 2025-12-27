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
        // 메인 메뉴가 표시된 후 지도 초기화 (충분한 지연 시간 확보)
        setTimeout(() => {
            if (!this.regionMap) {
                this.initRegionMap();
                // 지도 타일이 로드될 시간을 주고 크기 재조정
                setTimeout(() => {
                    if (this.regionMap) {
                        this.regionMap.invalidateSize();
                        console.log('🔄 지도 크기 재조정 (300ms)');
                    }
                }, 300);
                setTimeout(() => {
                    if (this.regionMap) {
                        this.regionMap.invalidateSize();
                        // 강제로 지도 다시 그리기
                        this.regionMap.setView([37.5, 127.0], 8);
                        console.log('🔄 지도 강제 새로고침 (1000ms)');
                    }
                }, 1000);
            } else {
                // 지도가 이미 있으면 크기 재조정
                this.regionMap.invalidateSize();
                this.regionMap.setView([37.5, 127.0], 8);
            }
        }, 300);
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
        console.log(`🎮 showPuzzle 호출: levelId = ${levelId} (type: ${typeof levelId})`);
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

        // 지역별 레벨 오프셋 매핑 (data.js 기준)
        const regionOffsets = {
            'seoul': 0,      // 1-10
            'busan': 10,     // 11-18
            'gangwon': 18,   // 19-26
            'daegu': 26,     // 27-33
            'incheon': 33,   // 34-40
            'gwangju': 40,   // 41-46
            'daejeon': 46,   // 47-52
            'ulsan': 52,     // 53-57
            'sejong': 57,    // 58-62
            'gyeonggi': 62,  // 63-74
            'chungbuk': 74,  // 75-80
            'chungnam': 80,  // 81-87
            'jeonbuk': 87,   // 88-94
            'jeonnam': 94,   // 95-102
            'gyeongbuk': 102, // 103-111
            'gyeongnam': 111, // 112-119
            'jeju': 119      // 120-125
        };

        // 광역시/특별시: 바로 구 선택
        const metropolitanCities = ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan'];

        // 도: 시/군 선택 필요
        const provinces = ['gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju'];

        if (region === 'seoul') {
            // 서울: 25개 구 지도 표시
            this.currentRegion = 'seoul';
            this.regionLevelOffset = 0;
            this.showGuMap('seoul'); // 구 지도 표시
        } else if (region === 'gyeonggi') {
            // 경기도: 31개 시/군 지도 표시
            this.currentRegion = 'gyeonggi';
            this.regionLevelOffset = regionOffsets['gyeonggi'] || 0;
            this.showSiMap('gyeonggi'); // 시/군 지도 표시
        } else if (provinces.includes(region)) {
            // 다른 도: 시/군 지도 표시 (추후 데이터 추가)
            this.currentRegion = region;
            this.currentDong = null;
            this.regionLevelOffset = regionOffsets[region] || 0;

            // 아직 시/군 데이터가 없으면 바로 레벨로 이동
            alert(`${regionData?.name || region} 지역은 준비 중입니다.\n기본 레벨로 이동합니다.`);

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        } else if (metropolitanCities.includes(region)) {
            // 광역시: 구 지도 표시 (추후 데이터 추가)
            this.currentRegion = region;
            this.currentDong = null;
            this.regionLevelOffset = regionOffsets[region] || 0;

            // 아직 구 데이터가 없으면 바로 레벨로 이동
            alert(`${regionData?.name || region} 지역은 준비 중입니다.\n기본 레벨로 이동합니다.`);

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        } else if (region === 'sejong') {
            // 세종: 동 바로 선택 (단일 행정구역)
            this.currentRegion = 'sejong';
            this.currentDong = null;
            this.regionLevelOffset = regionOffsets['sejong'] || 0;

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        } else {
            // 기타 지역: 바로 레벨로 이동
            this.currentRegion = region;
            this.currentDong = null;
            this.regionLevelOffset = regionOffsets[region] || 0;

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        }
    },

    // 시/군 지도 표시 (경기도 등 도 단위)
    showSiMap(provinceId) {
        console.log(`🗺️ ${provinceId} 시/군 지도 표시`);

        const screen = document.getElementById('main-menu');
        if (!screen) return;

        const regionData = typeof RegionData !== 'undefined' ? RegionData.getRegion(provinceId) : null;

        // 기존 지도 제거
        if (this.regionMap) {
            this.regionMap.remove();
            this.regionMap = null;
        }

        // 타이틀 업데이트
        const titleDiv = screen.querySelector('.title');
        if (titleDiv) {
            titleDiv.innerHTML = `
                <button onclick="Game.showMainMenu()" style="
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                ">← 뒤로</button>
                <h1>${regionData?.name || provinceId} > 시/군 선택</h1>
            `;
        }

        // 지도 컨테이너 업데이트
        const mapContainer = screen.querySelector('.map-selection-container');
        if (mapContainer) {
            mapContainer.querySelector('h3').textContent = `${regionData?.name || provinceId} 시/군`;
            mapContainer.querySelector('p').textContent = '시/군을 선택하세요';
        }

        // 시/군 지도 초기화
        setTimeout(() => {
            this.initSiMap(provinceId);
        }, 300);
    },

    // 시/군 지도 초기화
    initSiMap(provinceId) {
        console.log(`🗺️ ${provinceId} 시/군 지도 초기화 시작...`);

        const mapContainer = document.getElementById('region-map');
        if (!mapContainer) {
            console.error('❌ 지도 컨테이너를 찾을 수 없습니다');
            return;
        }

        const regionData = typeof RegionData !== 'undefined' ? RegionData.getRegion(provinceId) : null;
        const center = regionData?.center || [37.4138, 127.5183]; // 경기도 중심
        const zoom = regionData?.zoom || 9;

        try {
            this.regionMap = L.map('region-map', {
                center: center,
                zoom: zoom,
                zoomControl: true,
                scrollWheelZoom: true,
                dragging: true,
                doubleClickZoom: true,
                touchZoom: true,
                boxZoom: true,
                keyboard: true,
                attributionControl: true,
                tap: true,
                tapTolerance: 15
            });

            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 14,
                minZoom: 8
            });

            tileLayer.addTo(this.regionMap);
            console.log('✅ 타일 레이어 추가 완료');

            // 마커들을 저장할 배열
            const markers = [];

            // 줌 레벨에 따른 반경 계산 함수
            const getRadiusByZoom = (zoom) => {
                const baseRadius = 4000;
                const baseZoom = 9;
                return baseRadius * Math.pow(0.6, zoom - baseZoom);
            };

            // 경기도 시/군 데이터 로드
            if (provinceId === 'gyeonggi' && typeof GyeonggiSiData !== 'undefined') {
                const cities = GyeonggiSiData.getCitiesByProvince(provinceId);
                const completedCities = this.userData.completedCities || [];

                cities.forEach(city => {
                    // 수원시는 항상 해제, 나머지는 조건 확인
                    const isUnlocked = city.id === 'gyeonggi_suwon' ||
                        (city.unlockCondition === 'NONE') ||
                        (city.unlockCondition.startsWith('COMPLETE_') &&
                            completedCities.includes(city.unlockCondition.replace('COMPLETE_', '')));

                    const marker = L.circle(city.center, {
                        color: isUnlocked ? city.color : '#999',
                        fillColor: isUnlocked ? city.color : '#ccc',
                        fillOpacity: isUnlocked ? 0.6 : 0.4,
                        radius: getRadiusByZoom(zoom),
                        weight: 3,
                        interactive: true,
                        bubblingMouseEvents: false
                    }).addTo(this.regionMap);

                    markers.push(marker);

                    const popupContent = isUnlocked ? `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px;">${city.icon} ${city.name}</strong><br>
                            <p style="margin: 5px 0; font-size: 12px;">${city.description}</p>
                            <p style="margin: 5px 0;">${city.dongCount > 0 ? city.dongCount + '개 동' : '준비 중'}</p>
                            <button onclick="Game.selectSi('${city.id}')" style="
                                background: linear-gradient(135deg, ${city.color}, ${this.darkenColor(city.color)});
                                color: white;
                                border: none;
                                padding: 10px 24px;
                                border-radius: 20px;
                                cursor: pointer;
                                font-weight: bold;
                                margin-top: 5px;
                                font-size: 14px;
                            ">선택하기</button>
                        </div>
                    ` : `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px; color: #999;">${city.icon} ${city.name}</strong><br>
                            <p style="margin: 5px 0; color: #999; font-size: 12px;">🔒 잠금</p>
                            <p style="margin: 5px 0; color: #999; font-size: 11px;">이전 지역을 완료하세요</p>
                        </div>
                    `;

                    marker.bindPopup(popupContent, {
                        closeButton: true,
                        autoClose: false,
                        closeOnClick: false
                    });

                    marker.on('click', function (e) {
                        L.DomEvent.stopPropagation(e);
                        console.log(`🖱️ ${city.name} 클릭됨`);
                        this.openPopup();
                    });

                    marker.on('mouseover', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.8 : 0.6
                        });
                    });

                    marker.on('mouseout', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.6 : 0.4
                        });
                    });
                });

                console.log(`✅ ${cities.length}개 시/군 마커 추가 완료`);
            } else {
                console.error('❌ 시/군 데이터가 로드되지 않음');
            }

            // 줌 이벤트 리스너 - 마커 크기 조정
            this.regionMap.on('zoomend', () => {
                const currentZoom = this.regionMap.getZoom();
                const newRadius = getRadiusByZoom(currentZoom);
                markers.forEach(marker => {
                    marker.setRadius(newRadius);
                });
                console.log(`🔍 줌 레벨: ${currentZoom}, 마커 반경: ${Math.round(newRadius)}m`);
            });

            // 지도 크기 재조정
            setTimeout(() => {
                if (this.regionMap) {
                    this.regionMap.invalidateSize();
                }
            }, 100);

        } catch (error) {
            console.error('❌ 시/군 지도 초기화 오류:', error);
        }
    },

    // 시/군 선택
    selectSi(cityId) {
        console.log(`📍 시/군 선택: ${cityId}`);

        const city = typeof GyeonggiSiData !== 'undefined' ? GyeonggiSiData.getCity(cityId) : null;
        if (!city) {
            console.error('시/군 데이터를 찾을 수 없습니다:', cityId);
            return;
        }

        this.currentCity = cityId;

        // 동 데이터가 있는 시/군들 (추후 확장)
        const citiesWithDongMap = []; // 아직 동 데이터 없음

        if (citiesWithDongMap.includes(cityId)) {
            // 동 지도 표시
            this.showCityDongMap(cityId);
        } else {
            // 동 데이터 없으면 바로 레벨 지도로 이동
            this.currentDong = null;

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        }
    },

    // 구(區) 지도 표시
    showGuMap(cityId) {
        console.log(`🗺️ ${cityId} 구 지도 표시`);

        const screen = document.getElementById('main-menu');
        if (!screen) return;

        // 기존 지도 제거
        if (this.regionMap) {
            this.regionMap.remove();
            this.regionMap = null;
        }

        // 타이틀 업데이트
        const titleDiv = screen.querySelector('.title');
        if (titleDiv) {
            titleDiv.innerHTML = `
                <button onclick="Game.showMainMenu()" style="
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                ">← 뒤로</button>
                <h1>서울특별시 > 구 선택</h1>
            `;
        }

        // 지도 컨테이너 업데이트
        const mapContainer = screen.querySelector('.map-selection-container');
        if (mapContainer) {
            mapContainer.querySelector('h3').textContent = '서울 25개 구';
            mapContainer.querySelector('p').textContent = '구를 선택하세요';
        }

        // 구 지도 초기화
        setTimeout(() => {
            this.initGuMap(cityId);
        }, 300);
    },

    // 구 지도 초기화
    initGuMap(cityId) {
        console.log(`🗺️ ${cityId} 구 지도 초기화 시작...`);

        const mapContainer = document.getElementById('region-map');
        if (!mapContainer) {
            console.error('❌ 지도 컨테이너를 찾을 수 없습니다');
            return;
        }

        // 서울 중심 좌표
        const seoulCenter = [37.5665, 126.9780];

        try {
            this.regionMap = L.map('region-map', {
                center: seoulCenter,
                zoom: 11,
                zoomControl: true,
                scrollWheelZoom: true,
                dragging: true,
                doubleClickZoom: true,
                touchZoom: true,
                boxZoom: true,
                keyboard: true,
                attributionControl: true,
                tap: true,
                tapTolerance: 15
            });

            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 14,
                minZoom: 10
            });

            tileLayer.addTo(this.regionMap);
            console.log('✅ 타일 레이어 추가 완료');

            // 마커들을 저장할 배열
            const markers = [];

            // 줌 레벨에 따른 반경 계산 함수
            const getRadiusByZoom = (zoom) => {
                // 기본 줌 11에서 반경 2000m
                // 줌이 1 증가할 때마다 반경 50% 감소
                const baseRadius = 2000;
                const baseZoom = 11;
                return baseRadius * Math.pow(0.6, zoom - baseZoom);
            };

            // 서울 구 데이터 로드
            if (typeof SeoulGuData !== 'undefined') {
                const gus = SeoulGuData.getGusByCity(cityId);
                const completedGus = this.userData.completedGus || [];

                gus.forEach(gu => {
                    // 중구는 항상 해제, 나머지는 조건 확인
                    const isUnlocked = gu.id === 'seoul_junggu' ||
                        (gu.unlockCondition === 'NONE') ||
                        (gu.unlockCondition.startsWith('COMPLETE_') &&
                            completedGus.includes(gu.unlockCondition.replace('COMPLETE_', '')));

                    const marker = L.circle(gu.center, {
                        color: isUnlocked ? gu.color : '#999',
                        fillColor: isUnlocked ? gu.color : '#ccc',
                        fillOpacity: isUnlocked ? 0.6 : 0.4,
                        radius: getRadiusByZoom(11),
                        weight: 3,
                        interactive: true,
                        bubblingMouseEvents: false
                    }).addTo(this.regionMap);

                    markers.push(marker);

                    const popupContent = isUnlocked ? `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px;">${gu.icon} ${gu.name}</strong><br>
                            <p style="margin: 5px 0; font-size: 12px;">${gu.description}</p>
                            <p style="margin: 5px 0;">${gu.dongCount}개 동</p>
                            <button onclick="Game.selectGu('${gu.id}')" style="
                                background: linear-gradient(135deg, ${gu.color}, ${this.darkenColor(gu.color)});
                                color: white;
                                border: none;
                                padding: 10px 24px;
                                border-radius: 20px;
                                cursor: pointer;
                                font-weight: bold;
                                margin-top: 5px;
                                font-size: 14px;
                            ">선택하기</button>
                        </div>
                    ` : `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px; color: #999;">${gu.icon} ${gu.name}</strong><br>
                            <p style="margin: 5px 0; color: #999; font-size: 12px;">🔒 잠금</p>
                            <p style="margin: 5px 0; color: #999; font-size: 11px;">이전 구를 완료하세요</p>
                        </div>
                    `;

                    marker.bindPopup(popupContent, {
                        closeButton: true,
                        autoClose: false,
                        closeOnClick: false
                    });

                    marker.on('click', function (e) {
                        L.DomEvent.stopPropagation(e);
                        console.log(`🖱️ ${gu.name} 클릭됨`);
                        this.openPopup();
                    });

                    marker.on('mouseover', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.8 : 0.6
                        });
                    });

                    marker.on('mouseout', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.6 : 0.4
                        });
                    });
                });

                console.log(`✅ ${gus.length}개 구 마커 추가 완료`);
            } else {
                console.error('❌ SeoulGuData가 로드되지 않음');
            }

            // 줌 이벤트 리스너 - 마커 크기 조정
            this.regionMap.on('zoomend', () => {
                const currentZoom = this.regionMap.getZoom();
                const newRadius = getRadiusByZoom(currentZoom);
                markers.forEach(marker => {
                    marker.setRadius(newRadius);
                });
                console.log(`🔍 줌 레벨: ${currentZoom}, 마커 반경: ${Math.round(newRadius)}m`);
            });

            // 지도 크기 재조정
            setTimeout(() => {
                if (this.regionMap) {
                    this.regionMap.invalidateSize();
                }
            }, 100);

        } catch (error) {
            console.error('❌ 구 지도 초기화 오류:', error);
        }
    },

    // 구 선택
    selectGu(guId) {
        console.log(`📍 구 선택: ${guId}`);

        const gu = typeof SeoulGuData !== 'undefined' ? SeoulGuData.getGu(guId) : null;
        if (!gu) {
            console.error('구 데이터를 찾을 수 없습니다:', guId);
            return;
        }

        this.currentGu = guId;

        // 동 지도가 있는 구들
        const gusWithDongMap = ['seoul_gangnam', 'seoul_junggu', 'seoul_jongno'];

        if (gusWithDongMap.includes(guId)) {
            this.showDongMap(guId);
        } else {
            // 다른 구들은 바로 레벨 지도로 이동 (기본 서울 레벨 사용)
            this.currentDong = null;  // 동 선택 없음
            this.currentRegion = 'seoul';
            this.regionLevelOffset = 0;  // 서울 레벨 시작점

            if (this.userData.selectedCharacter) {
                this.showMap();
            } else {
                this.showCharacterSelect();
            }
        }
    },

    // 동(洞) 지도 표시
    showDongMap(guId) {
        console.log(`🗺️ ${guId} 동 지도 표시`);

        const gu = typeof SeoulGuData !== 'undefined' ? SeoulGuData.getGu(guId) : null;
        const screen = document.getElementById('main-menu');
        if (!screen || !gu) return;

        // 기존 지도 제거
        if (this.regionMap) {
            this.regionMap.remove();
            this.regionMap = null;
        }

        // 타이틀 업데이트
        const titleDiv = screen.querySelector('.title');
        if (titleDiv) {
            titleDiv.innerHTML = `
                <button onclick="Game.showGuMap('seoul')" style="
                    position: absolute;
                    left: 20px;
                    top: 15px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                ">← 뒤로</button>
                <h1>서울 > ${gu.name} > 동 선택</h1>
            `;
        }

        // 지도 컨테이너 업데이트
        const mapContainer = screen.querySelector('.map-selection-container');
        if (mapContainer) {
            mapContainer.querySelector('h3').textContent = `${gu.name} ${gu.dongCount}개 동`;
            mapContainer.querySelector('p').textContent = '동을 선택하세요';
        }

        // 동 지도 초기화
        setTimeout(() => {
            this.initDongMap(guId);
        }, 300);
    },

    // 동 지도 초기화
    initDongMap(guId) {
        console.log(`🗺️ ${guId} 동 지도 초기화 시작...`);

        const mapContainer = document.getElementById('region-map');
        if (!mapContainer) {
            console.error('❌ 지도 컨테이너를 찾을 수 없습니다');
            return;
        }

        const gu = typeof SeoulGuData !== 'undefined' ? SeoulGuData.getGu(guId) : null;
        if (!gu) return;

        try {
            this.regionMap = L.map('region-map', {
                center: gu.center,
                zoom: 13,
                zoomControl: true,
                scrollWheelZoom: true,
                dragging: true,
                doubleClickZoom: true,
                touchZoom: true,
                boxZoom: true,
                keyboard: true,
                attributionControl: true,
                tap: true,
                tapTolerance: 15
            });

            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 16,
                minZoom: 12
            });

            tileLayer.addTo(this.regionMap);
            console.log('✅ 타일 레이어 추가 완료');

            // 마커들을 저장할 배열
            const markers = [];

            // 줌 레벨에 따른 반경 계산 함수
            const getRadiusByZoom = (zoom) => {
                // 기본 줌 13에서 반경 400m
                const baseRadius = 400;
                const baseZoom = 13;
                return baseRadius * Math.pow(0.6, zoom - baseZoom);
            };

            // 구별 동 데이터 소스 선택
            let dongDataSource = null;
            if (guId === 'seoul_gangnam' && typeof GangnamDongData !== 'undefined') {
                dongDataSource = GangnamDongData;
            } else if (guId === 'seoul_junggu' && typeof JungguDongData !== 'undefined') {
                dongDataSource = JungguDongData;
            } else if (guId === 'seoul_jongno' && typeof JongnoguDongData !== 'undefined') {
                dongDataSource = JongnoguDongData;
            }

            // 동 데이터 로드
            if (dongDataSource) {
                const dongs = dongDataSource.getDongsByGu(guId);
                console.log(`📍 구ID: ${guId}, 동 데이터 소스: ${dongDataSource === GangnamDongData ? 'GangnamDongData' : dongDataSource === JungguDongData ? 'JungguDongData' : 'JongnoguDongData'}`);
                console.log(`📍 찾은 동 개수: ${dongs.length}`, dongs.map(d => d.name));
                const completedDongs = this.userData.completedDongs || [];

                dongs.forEach(dong => {
                    // 역삼1동은 항상 해제
                    const isUnlocked = dong.id === 'seoul_gangnam_yeoksam1' ||
                        (dong.unlockCondition === 'NONE') ||
                        (dong.unlockCondition.startsWith('COMPLETE_') &&
                            completedDongs.includes(dong.unlockCondition.replace('COMPLETE_', '')));

                    const marker = L.circle(dong.center, {
                        color: isUnlocked ? dong.color : '#999',
                        fillColor: isUnlocked ? dong.color : '#ccc',
                        fillOpacity: isUnlocked ? 0.6 : 0.4,
                        radius: getRadiusByZoom(13),
                        weight: 3,
                        interactive: true,
                        bubblingMouseEvents: false
                    }).addTo(this.regionMap);

                    markers.push(marker);

                    const popupContent = isUnlocked ? `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 16px;">${dong.icon} ${dong.name}</strong><br>
                            <p style="margin: 5px 0; font-size: 11px;">${dong.description}</p>
                            <p style="margin: 5px 0; font-size: 12px;">${dong.levelCount}개 레벨</p>
                            <button onclick="Game.selectDong('${dong.id}')" style="
                                background: linear-gradient(135deg, ${dong.color}, ${this.darkenColor(dong.color)});
                                color: white;
                                border: none;
                                padding: 8px 20px;
                                border-radius: 20px;
                                cursor: pointer;
                                font-weight: bold;
                                margin-top: 5px;
                                font-size: 13px;
                            ">선택하기</button>
                        </div>
                    ` : `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 16px; color: #999;">${dong.icon} ${dong.name}</strong><br>
                            <p style="margin: 5px 0; color: #999; font-size: 11px;">🔒 잠금</p>
                            <p style="margin: 5px 0; color: #999; font-size: 10px;">이전 동을 완료하세요</p>
                        </div>
                    `;

                    marker.bindPopup(popupContent, {
                        closeButton: true,
                        autoClose: false,
                        closeOnClick: false
                    });

                    marker.on('click', function (e) {
                        L.DomEvent.stopPropagation(e);
                        console.log(`🖱️ ${dong.name} 클릭됨`);
                        this.openPopup();
                    });

                    marker.on('mouseover', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.8 : 0.6
                        });
                    });

                    marker.on('mouseout', function (e) {
                        this.setStyle({
                            fillOpacity: isUnlocked ? 0.6 : 0.4
                        });
                    });
                });

                console.log(`✅ ${dongs.length}개 동 마커 추가 완료`);
            } else {
                console.error('❌ GangnamDongData가 로드되지 않음');
            }

            // 줌 이벤트 리스너 - 마커 크기 조정
            this.regionMap.on('zoomend', () => {
                const currentZoom = this.regionMap.getZoom();
                const newRadius = getRadiusByZoom(currentZoom);
                markers.forEach(marker => {
                    marker.setRadius(newRadius);
                });
                console.log(`🔍 줌 레벨: ${currentZoom}, 마커 반경: ${Math.round(newRadius)}m`);
            });

            // 지도 크기 재조정
            setTimeout(() => {
                if (this.regionMap) {
                    this.regionMap.invalidateSize();
                }
            }, 100);

        } catch (error) {
            console.error('❌ 동 지도 초기화 오류:', error);
        }
    },

    // 동 선택
    selectDong(dongId) {
        console.log(`📍 동 선택: ${dongId}`);

        // 여러 동 데이터 소스에서 검색
        let dong = null;
        if (typeof GangnamDongData !== 'undefined') {
            dong = GangnamDongData.getDong(dongId);
        }
        if (!dong && typeof JungguDongData !== 'undefined') {
            dong = JungguDongData.getDong(dongId);
        }
        if (!dong && typeof JongnoguDongData !== 'undefined') {
            dong = JongnoguDongData.getDong(dongId);
        }

        if (!dong) {
            console.error('동 데이터를 찾을 수 없습니다:', dongId);
            return;
        }

        this.currentDong = dongId;

        // 캐릭터 선택 또는 레벨 지도로 이동
        if (this.userData.selectedCharacter) {
            this.showMap();
        } else {
            this.showCharacterSelect();
        }
    },

    initRegionMap() {
        console.log('🗺️ 지역 선택 지도 초기화 시작...');

        // 지역 선택 지도 생성
        if (this.regionMap) {
            console.log('기존 지도 제거');
            this.regionMap.remove();
            this.regionMap = null;
        }

        const mapContainer = document.getElementById('region-map');
        if (!mapContainer) {
            console.error('❌ 지도 컨테이너를 찾을 수 없습니다');
            return;
        }

        // 컨테이너 크기 확인
        console.log('지도 컨테이너 크기:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);

        const koreaCenter = [36.5, 127.8]; // 한국 중심

        try {
            // 지도 생성 - 인터랙션 활성화
            this.regionMap = L.map('region-map', {
                center: koreaCenter,
                zoom: 7,
                zoomControl: true, // 줌 컨트롤 표시
                scrollWheelZoom: true, // 마우스 휠 줌 활성화
                dragging: true, // 드래그 활성화
                doubleClickZoom: true, // 더블클릭 줌 활성화
                touchZoom: true, // 터치 줌 활성화
                boxZoom: true, // 박스 줌 활성화
                keyboard: true, // 키보드 네비게이션
                attributionControl: true,
                tap: true, // 모바일 탭 이벤트
                tapTolerance: 15 // 탭 허용 오차
            });

            console.log('✅ Leaflet 지도 객체 생성 완료');

            // 타일 레이어 추가
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 13,
                minZoom: 6
            });

            tileLayer.addTo(this.regionMap);
            console.log('✅ 타일 레이어 추가 완료');

            // 타일 로드 이벤트
            tileLayer.on('load', () => {
                console.log('✅ 지도 타일 로드 완료');
                setTimeout(() => {
                    if (this.regionMap) {
                        this.regionMap.invalidateSize();
                        console.log('🔄 지도 크기 재조정 (타일 로드 후)');
                    }
                }, 100);
            });

            tileLayer.on('tileerror', (error) => {
                console.error('❌ 타일 로드 오류:', error);
            });

            // 지도 준비 완료 이벤트
            this.regionMap.whenReady(() => {
                console.log('✅ 지도 준비 완료');

                // 드래그 핸들러 강제 활성화
                if (this.regionMap.dragging) {
                    this.regionMap.dragging.enable();
                    console.log('✅ 드래그 핸들러 활성화');
                }

                // 여러 번 크기 재조정 시도
                this.regionMap.invalidateSize();
                setTimeout(() => {
                    if (this.regionMap) {
                        this.regionMap.invalidateSize();
                        console.log('🔄 지도 크기 재조정 (준비 완료 후)');
                    }
                }, 100);
                setTimeout(() => {
                    if (this.regionMap) {
                        this.regionMap.invalidateSize();
                        console.log('🔄 지도 크기 재조정 (최종)');
                    }
                }, 500);
            });

            // RegionData에서 모든 지역 가져오기
            if (typeof RegionData !== 'undefined') {
                const regions = RegionData.getAllRegions();

                regions.forEach(region => {
                    // 모든 지역 활성화 (전국 플레이 가능)
                    const isUnlocked = true;

                    // 실제 좌표에 레이블 마커 표시 (원형 대신)
                    const customIcon = L.divIcon({
                        html: `
                            <div class="region-marker ${isUnlocked ? 'unlocked' : 'locked'}" style="
                                background: ${isUnlocked ? `linear-gradient(135deg, ${region.color}, ${this.darkenColor(region.color)})` : 'linear-gradient(135deg, #999, #666)'};
                                color: white;
                                padding: 8px 12px;
                                border-radius: 20px;
                                font-weight: bold;
                                font-size: 13px;
                                white-space: nowrap;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.3);
                                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                                cursor: pointer;
                                transition: transform 0.2s, box-shadow 0.2s;
                                display: flex;
                                align-items: center;
                                gap: 4px;
                            ">
                                <span style="font-size: 16px;">${region.icon}</span>
                                <span>${region.shortName}</span>
                            </div>
                        `,
                        className: 'custom-region-marker',
                        iconSize: [100, 40],
                        iconAnchor: [50, 20]
                    });

                    const marker = L.marker(region.center, {
                        icon: customIcon,
                        interactive: true
                    }).addTo(this.regionMap);

                    const popupContent = isUnlocked ? `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px;">${region.icon} ${region.shortName}</strong><br>
                            <p style="margin: 5px 0; font-size: 12px;">${region.description}</p>
                            <p style="margin: 5px 0;">${region.levels}개 레벨</p>
                            <button onclick="Game.selectRegion('${region.id}')" style="
                                background: linear-gradient(135deg, ${region.color}, ${this.darkenColor(region.color)});
                                color: white;
                                border: none;
                                padding: 10px 24px;
                                border-radius: 20px;
                                cursor: pointer;
                                font-weight: bold;
                                margin-top: 5px;
                                font-size: 14px;
                            ">시작하기</button>
                        </div>
                    ` : `
                        <div style="text-align: center; padding: 10px; min-width: 150px;">
                            <strong style="font-size: 18px; color: #999;">${region.icon} ${region.shortName}</strong><br>
                            <p style="margin: 5px 0; color: #999; font-size: 12px;">🔒 준비 중</p>
                            <p style="margin: 5px 0; color: #999; font-size: 11px;">곧 업데이트 예정입니다</p>
                        </div>
                    `;

                    // 팝업 바인딩
                    marker.bindPopup(popupContent, {
                        closeButton: true,
                        autoClose: false,
                        closeOnClick: false
                    });

                    // 클릭 이벤트 - 즉시 팝업 열기
                    marker.on('click', function (e) {
                        L.DomEvent.stopPropagation(e);
                        console.log(`🖱️ ${region.shortName} 클릭됨`);
                        this.openPopup();
                    });
                });

                console.log(`✅ ${regions.length}개 지역 마커 추가 완료`);
            } else {
                console.warn('⚠️ RegionData가 로드되지 않음 - 기본 마커만 표시');

                // RegionData가 없을 경우 기본 마커
                const seoulMarker = L.circle([37.5665, 126.9780], {
                    color: '#FF6B9D',
                    fillColor: '#FF6B9D',
                    fillOpacity: 0.6,
                    radius: 20000,
                    weight: 3
                }).addTo(this.regionMap);

                seoulMarker.bindPopup(`
                    <div style="text-align: center; padding: 10px;">
                        <strong style="font-size: 18px;">서울</strong><br>
                        <p style="margin: 5px 0;">10개 동네</p>
                        <button onclick="Game.selectRegion('seoul')" style="
                            background: linear-gradient(135deg, #FF6B9D, #C44569);
                            color: white;
                            border: none;
                            padding: 10px 24px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-weight: bold;
                        ">시작하기</button>
                    </div>
                `);

                seoulMarker.on('click', function () {
                    console.log('🖱️ 서울 클릭됨');
                    this.openPopup();
                });
            }

            console.log('✅ 지역 선택 지도 초기화 완료');
        } catch (error) {
            console.error('❌ 지도 초기화 오류:', error);
        }
    },

    // 색상을 어둡게 만드는 헬퍼 함수
    darkenColor(color) {
        // 간단한 색상 어둡게 하기
        const colorMap = {
            '#FF6B9D': '#C44569', // 서울
            '#4682B4': '#2F5F8F', // 부산
            '#FF6347': '#CC4F39', // 대구
            '#20B2AA': '#188F88', // 인천
            '#9370DB': '#7556B3', // 광주
            '#FFD700': '#CCB000', // 대전
            '#FF8C00': '#CC7000', // 울산
            '#32CD32': '#28A428', // 세종
            '#8A2BE2': '#6F22B8', // 경기
            '#D2691E': '#A85318', // 강원
            '#6A5ACD': '#5447A4', // 충북
            '#BA55D3': '#9444A8', // 충남
            '#CD5C5C': '#A44A4A', // 전북
            '#8B0000': '#6F0000', // 전남
            '#2F4F4F': '#243F3F', // 경북
            '#5F9EA0': '#4C7E80', // 경남
            '#B0C4DE': '#8C9CB4'  // 제주
        };
        return colorMap[color] || color;
    },

    // 지도 렌더링 (Leaflet.js 사용) - 동별 레벨 시스템 지원
    renderMap() {
        // 기존 지도 제거
        if (this.map) {
            this.map.remove();
        }

        // 현재 동 데이터 가져오기
        let center, zoom, levels;

        if (this.currentDong) {
            // 동이 선택된 경우 - 여러 동 데이터 소스에서 검색
            let dong = null;
            if (typeof GangnamDongData !== 'undefined') {
                dong = GangnamDongData.getDong(this.currentDong);
            }
            if (!dong && typeof JungguDongData !== 'undefined') {
                dong = JungguDongData.getDong(this.currentDong);
            }
            if (!dong && typeof JongnoguDongData !== 'undefined') {
                dong = JongnoguDongData.getDong(this.currentDong);
            }

            if (dong) {
                center = dong.center;
                zoom = dong.zoom || 15;
                // 동별 레벨 생성 (levelCount 기반)
                levels = this.generateDongLevels(dong);
                console.log(`📍 ${dong.name} 레벨 생성:`, levels.length, '개');
            } else {
                // 폴백: 기본 서울 중심
                console.warn('⚠️ 동 데이터를 찾을 수 없음, 기본 레벨 사용');
                center = [37.5665, 126.9780];
                zoom = 13;
                levels = this.getDefaultLevels();
            }
        } else {
            // 동이 선택되지 않은 경우 - 기존 로직 (부산 등)
            center = [37.5665, 126.9780];
            zoom = 13;
            levels = this.getDefaultLevels();
        }

        // Leaflet 지도 생성
        this.map = L.map('seoul-map', {
            center: center,
            zoom: zoom,
            zoomControl: true,
            scrollWheelZoom: true
        });

        // OpenStreetMap 타일 레이어
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 18
        }).addTo(this.map);

        // 레벨 마커 추가
        this.renderLevelMarkers(levels);

        // 맛집 마커 표시 (레벨 ID 기반)
        if (typeof RestaurantMap !== 'undefined' && levels.length > 0) {
            // 현재 지역/동에 해당하는 레벨 ID로 맛집 표시
            const firstLevelId = levels[0].id;
            RestaurantMap.showRestaurantsForLevel(this.map, firstLevelId);
            console.log(`🍽️ 레벨 ${firstLevelId} 맛집 마커 로드`);
        }
    },

    // 동별 레벨 생성 헬퍼 함수 - GameData.levels의 실제 레벨 데이터 사용
    generateDongLevels(dong) {
        const levels = [];
        const baseLatLng = dong.center;

        // GameData.levels에서 서울 레벨 (1-10)을 사용
        const seoulLevels = GameData.levels.slice(0, 10);
        const levelsToUse = Math.min(dong.levelCount, seoulLevels.length);

        for (let i = 0; i < levelsToUse; i++) {
            // 동 중심 주변에 레벨 배치 (원형 배치)
            const angle = (i / levelsToUse) * 2 * Math.PI;
            const radius = 0.004; // 약 400m

            const baseLevel = seoulLevels[i];
            levels.push({
                ...baseLevel, // GameData의 실제 레벨 데이터 사용 (id, blockTheme, target 등)
                lat: baseLatLng[0] + Math.cos(angle) * radius,
                lng: baseLatLng[1] + Math.sin(angle) * radius,
                name: `${dong.name} ${i + 1}`,
                dongId: dong.id
            });
        }

        console.log(`📍 ${dong.name} 레벨 생성 완료:`, levels.map(l => l.id));
        return levels;
    },

    // 기본 레벨 가져오기 (지역별)
    getDefaultLevels() {
        // 지역별 레벨 수 매핑
        const regionLevelCounts = {
            'seoul': 10, 'busan': 8, 'gangwon': 8, 'daegu': 7, 'incheon': 7,
            'gwangju': 6, 'daejeon': 6, 'ulsan': 5, 'sejong': 5, 'gyeonggi': 12,
            'chungbuk': 6, 'chungnam': 7, 'jeonbuk': 7, 'jeonnam': 8,
            'gyeongbuk': 9, 'gyeongnam': 8, 'jeju': 6
        };

        // 지역별 중심 좌표 매핑
        const regionCenters = {
            'seoul': [37.5665, 126.9780],
            'busan': [35.1796, 129.0756],
            'gangwon': [37.8228, 128.1555],
            'daegu': [35.8714, 128.6014],
            'incheon': [37.4563, 126.7052],
            'gwangju': [35.1595, 126.8526],
            'daejeon': [36.3504, 127.3845],
            'ulsan': [35.5384, 129.3114],
            'sejong': [36.4800, 127.2890],
            'gyeonggi': [37.4138, 127.5183],
            'chungbuk': [36.6357, 127.4912],
            'chungnam': [36.5184, 126.8000],
            'jeonbuk': [35.8203, 127.1088],
            'jeonnam': [34.8161, 126.4629],
            'gyeongbuk': [36.5760, 128.5056],
            'gyeongnam': [35.4606, 128.2132],
            'jeju': [33.4996, 126.5312]
        };

        const levelCount = regionLevelCounts[this.currentRegion] || 10;
        const center = regionCenters[this.currentRegion] || [37.5665, 126.9780];

        // 지역 레벨 가져오기
        const regionLevels = GameData.levels.slice(this.regionLevelOffset, this.regionLevelOffset + levelCount);

        // 원형 배치로 좌표 생성
        return regionLevels.map((level, index) => {
            const angle = (index / levelCount) * 2 * Math.PI;
            const radius = 0.02; // 약 2km 반경
            return {
                ...level,
                lat: center[0] + Math.cos(angle) * radius,
                lng: center[1] + Math.sin(angle) * radius
            };
        });
    },

    // 레벨 마커 렌더링 헬퍼 함수
    renderLevelMarkers(levels) {
        levels.forEach((level, index) => {
            const isCleared = this.userData.clearedLevels.includes(level.id);
            const isLocked = index > 0 && !this.userData.clearedLevels.includes(levels[index - 1].id);

            const marker = L.marker([level.lat, level.lng], {
                icon: L.divIcon({
                    html: `<div class="level-node ${isCleared ? 'cleared' : ''} ${isLocked ? 'locked' : ''}">
                        <div class="level-number">${index + 1}</div>
                    </div>`,
                    className: 'custom-marker',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                })
            }).addTo(this.map);

            marker.bindPopup(`<div style="text-align: center; padding: 5px;">
                <strong>${level.name}</strong><br>
                ${isCleared ? '✅ 클리어!' : isLocked ? '🔒 잠김' : '목표: ' + level.target + '점'}
            </div>`);

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

    exitPuzzle() {
        if (confirm('퍼즐을 종료하고 지도로 돌아가시겠습니까?')) {
            document.getElementById('result-popup').classList.remove('active');
            this.showMap();
        }
    },

    resetGame() {
        if (confirm('정말로 게임을 초기화하시겠습니까?')) {
            localStorage.removeItem('daedongMapGame');
            location.reload();
        }
    },

    // 다음 레벨로 이동
    goToNextLevel() {
        const popup = document.getElementById('result-popup');
        popup.classList.remove('active');

        // 다음 레벨 버튼 숨기기
        const nextLevelBtn = document.getElementById('next-level-btn');
        if (nextLevelBtn) {
            nextLevelBtn.style.display = 'none';
        }

        if (this.currentLevelId) {
            const nextLevel = GameData.levels.find(l => l.id === this.currentLevelId + 1);
            if (nextLevel) {
                this.showPuzzle(nextLevel.id);
            } else {
                alert('🎊 축하합니다! 모든 레벨을 클리어했습니다!');
                this.showMap();
            }
        } else {
            this.showMap();
        }
    }
};

// 페이지 로드 시 게임 초기화
window.addEventListener('DOMContentLoaded', () => {
    console.log('=== 말랑말랑 대동맛지도 ===');
    console.log('웹 버전 v0.1');
    Game.init();
});
