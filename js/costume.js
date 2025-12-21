// ========================================
// Costume Manager - Character Customization System
// ========================================

class CostumeManager {
    constructor() {
        this.costumes = [];
        this.unlockedCostumes = new Set();
        this.equippedCostumes = {
            base: null,
            bottoms: null,
            tops: null,
            bags: null,
            heads: null,
            accessories: null,
            special: null
        };
        this.previewCanvas = null;
        this.previewCtx = null;
    }

    // 초기화
    async init() {
        await this.loadCostumeData();
        this.initPreviewCanvas();
        this.loadPlayerCostumes();
    }

    // 코스튬 데이터 로드
    async loadCostumeData() {
        try {
            const response = await fetch('data/CostumeData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');
            
            // 헤더 제외하고 파싱
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const parts = line.split(',');
                const costume = {
                    id: parts[0],
                    name: parts[1],
                    category: parts[2],
                    rarity: parts[3],
                    unlockCondition: parts[4],
                    unlockValue: parts[5],
                    statBonus: parts[6],
                    bonusValue: parseInt(parts[7]) || 0,
                    description: parts[8],
                    spriteFile: parts[9]
                };
                
                this.costumes.push(costume);
            }
            
            console.log(`✅ ${this.costumes.length}개의 코스튬 로드 완료`);
        } catch (error) {
            console.error('❌ 코스튬 데이터 로드 실패:', error);
        }
    }

    // 프리뷰 캔버스 초기화
    initPreviewCanvas() {
        this.previewCanvas = document.getElementById('costume-preview-canvas');
        if (!this.previewCanvas) {
            // 동적으로 생성
            this.previewCanvas = document.createElement('canvas');
            this.previewCanvas.id = 'costume-preview-canvas';
            this.previewCanvas.width = 512;
            this.previewCanvas.height = 512;
        }
        this.previewCtx = this.previewCanvas.getContext('2d');
    }

    // 플레이어의 잠금 해제된 코스튬 로드
    loadPlayerCostumes() {
        const saved = localStorage.getItem('unlockedCostumes');
        if (saved) {
            this.unlockedCostumes = new Set(JSON.parse(saved));
        }
        
        // 기본 아이템은 항상 잠금 해제
        this.unlockCostume('CS_010'); // 기본 티셔츠
        this.unlockCostume('CS_020'); // 청바지
    }

    // 플레이어의 장착 코스튬 로드
    loadEquippedCostumes() {
        const saved = localStorage.getItem('equippedCostumes');
        if (saved) {
            const data = JSON.parse(saved);
            this.equippedCostumes = { ...this.equippedCostumes, ...data };
        }
    }

    // 코스튬 잠금 해제
    unlockCostume(costumeId) {
        this.unlockedCostumes.add(costumeId);
        this.saveUnlockedCostumes();
        console.log(`🎉 코스튬 잠금 해제: ${costumeId}`);
    }

    // 코스튬 장착
    equipCostume(costumeId) {
        const costume = this.costumes.find(c => c.id === costumeId);
        if (!costume) {
            console.error('❌ 존재하지 않는 코스튬:', costumeId);
            return false;
        }

        if (!this.unlockedCostumes.has(costumeId)) {
            console.error('❌ 잠금 해제되지 않은 코스튬:', costumeId);
            return false;
        }

        // 해당 카테고리에 장착
        this.equippedCostumes[costume.category] = costumeId;
        this.saveEquippedCostumes();
        
        console.log(`👔 코스튬 장착: ${costume.name} (${costume.category})`);
        
        // 스탯 보너스 적용
        this.applyStatBonuses();
        
        return true;
    }

    // 코스튬 해제
    unequipCostume(category) {
        if (this.equippedCostumes[category]) {
            console.log(`👕 코스튬 해제: ${category}`);
            this.equippedCostumes[category] = null;
            this.saveEquippedCostumes();
            this.applyStatBonuses();
        }
    }

    // 스탯 보너스 계산 및 적용
    applyStatBonuses() {
        const bonuses = {
            GOLD_BOOST: 0,
            EXP_BOOST: 0,
            ITEM_DROP: 0,
            SCORE_BOOST: 0,
            SPEED_BOOST: 0,
            STAMINA_REGEN: 0,
            INVENTORY: 0
        };

        // 장착된 모든 코스튬의 보너스 합산
        Object.values(this.equippedCostumes).forEach(costumeId => {
            if (!costumeId) return;
            
            const costume = this.costumes.find(c => c.id === costumeId);
            if (costume && costume.statBonus !== 'NONE') {
                bonuses[costume.statBonus] = (bonuses[costume.statBonus] || 0) + costume.bonusValue;
            }
        });

        // 게임 시스템에 보너스 적용
        if (window.Game && window.Game.player) {
            window.Game.player.costumeBonuses = bonuses;
            console.log('✨ 코스튬 보너스 적용:', bonuses);
        }

        return bonuses;
    }

    // 캐릭터 이미지 생성 (레이어 합성)
    async generateCharacterImage(baseCharacterId) {
        // 캔버스 초기화
        this.previewCtx.clearRect(0, 0, 512, 512);

        // 레이어 순서대로 그리기
        const layers = ['base', 'bottoms', 'tops', 'bags', 'heads', 'accessories', 'special'];
        
        for (const layer of layers) {
            let imagePath = null;
            
            if (layer === 'base') {
                // 베이스 캐릭터
                imagePath = `images/characters/${baseCharacterId}.png`;
            } else {
                // 코스튬 레이어
                const costumeId = this.equippedCostumes[layer];
                if (costumeId) {
                    const costume = this.costumes.find(c => c.id === costumeId);
                    if (costume) {
                        imagePath = `images/characters/costumes/${layer}/${costume.spriteFile}`;
                    }
                }
            }

            if (imagePath) {
                try {
                    const img = await this.loadImage(imagePath);
                    this.previewCtx.drawImage(img, 0, 0, 512, 512);
                } catch (error) {
                    console.warn(`⚠️ 이미지 로드 실패: ${imagePath}`);
                }
            }
        }

        return this.previewCanvas.toDataURL('image/png');
    }

    // 이미지 로드 헬퍼
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }

    // 조건 체크 및 자동 잠금 해제
    checkUnlockConditions(condition) {
        this.costumes.forEach(costume => {
            if (this.unlockedCostumes.has(costume.id)) return;

            let shouldUnlock = false;

            switch (costume.unlockCondition) {
                case 'LEVEL':
                    if (condition.type === 'LEVEL' && condition.value >= parseInt(costume.unlockValue)) {
                        shouldUnlock = true;
                    }
                    break;
                
                case 'ITEM':
                    if (condition.type === 'ITEM' && condition.itemId === costume.unlockValue) {
                        shouldUnlock = true;
                    }
                    break;
                
                case 'REGION':
                    if (condition.type === 'REGION' && condition.region === costume.unlockValue) {
                        shouldUnlock = true;
                    }
                    break;
                
                case 'GOLD':
                    if (condition.type === 'GOLD' && condition.gold >= parseInt(costume.unlockValue)) {
                        shouldUnlock = true;
                    }
                    break;
                
                case 'ACHIEVEMENT':
                    if (condition.type === 'ACHIEVEMENT' && condition.achievement === costume.unlockValue) {
                        shouldUnlock = true;
                    }
                    break;
            }

            if (shouldUnlock) {
                this.unlockCostume(costume.id);
                this.showUnlockNotification(costume);
            }
        });
    }

    // 잠금 해제 알림 표시
    showUnlockNotification(costume) {
        if (window.Game && window.Game.showNotification) {
            window.Game.showNotification(
                '🎉 새 코스튬!',
                `${costume.name}을(를) 잠금 해제했습니다!`,
                3000
            );
        }
    }

    // 카테고리별 코스튬 목록 가져오기
    getCostumesByCategory(category) {
        return this.costumes.filter(c => c.category === category);
    }

    // 잠금 해제된 코스튬만 가져오기
    getUnlockedCostumes() {
        return this.costumes.filter(c => this.unlockedCostumes.has(c.id));
    }

    // 저장
    saveUnlockedCostumes() {
        localStorage.setItem('unlockedCostumes', JSON.stringify([...this.unlockedCostumes]));
    }

    saveEquippedCostumes() {
        localStorage.setItem('equippedCostumes', JSON.stringify(this.equippedCostumes));
    }

    // 희귀도 색상
    getRarityColor(rarity) {
        const colors = {
            'C': '#9E9E9E',      // Common - Gray
            'B': '#4CAF50',      // Uncommon - Green
            'A': '#2196F3',      // Rare - Blue
            'S': '#9C27B0',      // Epic - Purple
            'SP': '#FF9800',     // Special - Orange
            'Legendary': '#F44336'  // Legendary - Red
        };
        return colors[rarity] || '#9E9E9E';
    }
}

// 전역 인스턴스 생성
const CostumeSystem = new CostumeManager();
