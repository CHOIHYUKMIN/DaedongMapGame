// ========================================
// Costume UI Controller
// ========================================

class CostumeUIController {
    constructor() {
        this.currentCategory = 'heads';
        this.selectedCostumeId = null;
    }

    // 코스튬 화면 열기
    async open() {
        // 모든 화면 숨기기
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.popup').forEach(p => p.classList.remove('active'));

        // 코스튬 화면 표시
        document.getElementById('costume-screen').classList.add('active');

        // 데이터 로드 및 UI 업데이트
        await CostumeSystem.init();
        CostumeSystem.loadEquippedCostumes();

        this.updatePreview();
        this.updateStatBonusSummary();
        this.showCategory(this.currentCategory);
    }

    // 카테고리 표시
    showCategory(category) {
        this.currentCategory = category;

        // 탭 활성화
        document.querySelectorAll('.costume-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.costume-tab[data-category="${category}"]`).classList.add('active');

        // 해당 카테고리 코스튬 표시
        this.renderCostumeGrid(category);
    }

    // 코스튬 그리드 렌더링
    renderCostumeGrid(category) {
        const grid = document.getElementById('costume-grid');
        const costumes = CostumeSystem.getCostumesByCategory(category);

        if (costumes.length === 0) {
            grid.innerHTML = `
                <div class="costume-empty-state">
                    <div class="costume-empty-state-icon">📦</div>
                    <div class="costume-empty-state-text">아직 코스튬이 없습니다</div>
                    <div class="costume-empty-state-hint">레벨을 올리거나 퍼즐을 클리어하면 코스튬을 획득할 수 있습니다!</div>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';

        costumes.forEach(costume => {
            const isUnlocked = CostumeSystem.unlockedCostumes.has(costume.id);
            const isEquipped = CostumeSystem.equippedCostumes[category] === costume.id;

            const item = document.createElement('div');
            item.className = `costume-item ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}`;
            item.onclick = () => isUnlocked && this.showCostumeDetail(costume.id);

            const rarityColor = CostumeSystem.getRarityColor(costume.rarity);

            item.innerHTML = `
                <div class="costume-icon">
                    <span style="font-size: 40px;">${this.getCategoryIcon(category)}</span>
                </div>
                <div class="costume-name">${costume.name}</div>
                <div class="costume-rarity" style="background-color: ${rarityColor}; color: white;">
                    ${this.getRarityText(costume.rarity)}
                </div>
                ${costume.statBonus !== 'NONE' ? `
                    <div class="costume-stats">
                        <span class="stat-bonus">+${costume.bonusValue} ${this.getStatBonusText(costume.statBonus)}</span>
                    </div>
                ` : ''}
            `;

            grid.appendChild(item);
        });
    }

    // 코스튬 상세 모달 표시
    showCostumeDetail(costumeId) {
        const costume = CostumeSystem.costumes.find(c => c.id === costumeId);
        if (!costume) return;

        this.selectedCostumeId = costumeId;
        const isUnlocked = CostumeSystem.unlockedCostumes.has(costumeId);
        const isEquipped = CostumeSystem.equippedCostumes[costume.category] === costumeId;

        // 아이콘
        document.getElementById('detail-icon').innerHTML = `
            <span style="font-size: 80px;">${this.getCategoryIcon(costume.category)}</span>
        `;

        // 이름 및 설명
        document.getElementById('detail-name').textContent = costume.name;
        document.getElementById('detail-description').textContent = costume.description;

        // 스탯 정보
        const statsHtml = `
            <div class="costume-detail-stat">
                <span class="label">희귀도:</span>
                <span class="value" style="color: ${CostumeSystem.getRarityColor(costume.rarity)}">
                    ${this.getRarityText(costume.rarity)}
                </span>
            </div>
            ${costume.statBonus !== 'NONE' ? `
                <div class="costume-detail-stat">
                    <span class="label">스탯 보너스:</span>
                    <span class="value">+${costume.bonusValue} ${this.getStatBonusText(costume.statBonus)}</span>
                </div>
            ` : ''}
            <div class="costume-detail-stat">
                <span class="label">카테고리:</span>
                <span class="value">${this.getCategoryText(costume.category)}</span>
            </div>
        `;
        document.getElementById('detail-stats').innerHTML = statsHtml;

        // 잠금 해제 정보
        if (!isUnlocked) {
            const unlockInfo = document.getElementById('detail-unlock');
            unlockInfo.style.display = 'block';
            unlockInfo.innerHTML = `
                <strong>🔒 잠금 해제 조건:</strong><br>
                ${this.getUnlockConditionText(costume)}
            `;
        } else {
            document.getElementById('detail-unlock').style.display = 'none';
        }

        // 장착 버튼
        const equipBtn = document.getElementById('detail-equip-btn');
        if (!isUnlocked) {
            equipBtn.disabled = true;
            equipBtn.textContent = '잠김';
        } else if (isEquipped) {
            equipBtn.textContent = '장착 해제';
            equipBtn.disabled = false;
        } else {
            equipBtn.textContent = '장착';
            equipBtn.disabled = false;
        }

        // 모달 표시
        document.getElementById('costume-detail-modal').classList.add('active');
    }

    // 상세 모달 닫기
    closeDetail() {
        document.getElementById('costume-detail-modal').classList.remove('active');
        this.selectedCostumeId = null;
    }

    // 상세 모달에서 장착/해제
    equipFromDetail() {
        if (!this.selectedCostumeId) return;

        const costume = CostumeSystem.costumes.find(c => c.id === this.selectedCostumeId);
        if (!costume) return;

        const isEquipped = CostumeSystem.equippedCostumes[costume.category] === this.selectedCostumeId;

        if (isEquipped) {
            CostumeSystem.unequipCostume(costume.category);
        } else {
            CostumeSystem.equipCostume(this.selectedCostumeId);
        }

        this.closeDetail();
        this.updatePreview();
        this.updateStatBonusSummary();
        this.showCategory(this.currentCategory);
    }

    // 캐릭터 프리뷰 업데이트
    async updatePreview() {
        const baseCharId = window.Game?.player?.characterId || 'ch_20m';
        await CostumeSystem.generateCharacterImage(baseCharId);
    }

    // 스탯 보너스 요약 업데이트
    updateStatBonusSummary() {
        const bonuses = CostumeSystem.applyStatBonuses();
        const list = document.getElementById('stat-bonus-list');

        const bonusEntries = Object.entries(bonuses).filter(([key, value]) => value > 0);

        if (bonusEntries.length === 0) {
            list.innerHTML = '<div style="text-align: center; padding: 10px; opacity: 0.7;">장착된 코스튬이 없습니다</div>';
            return;
        }

        list.innerHTML = bonusEntries.map(([key, value]) => `
            <div class="stat-bonus-item">
                <span class="value">+${value}%</span>
                <span class="label">${this.getStatBonusText(key)}</span>
            </div>
        `).join('');
    }

    // 저장 및 닫기
    saveAndClose() {
        // 이미 자동 저장되었으므로 화면만 전환
        if (window.Game && window.Game.showInventory) {
            window.Game.showInventory();
        }
    }

    // 헬퍼 함수들
    getCategoryIcon(category) {
        const icons = {
            'heads': '🧢',
            'tops': '👕',
            'bottoms': '👖',
            'bags': '🎒',
            'accessories': '🕶️',
            'special': '✨'
        };
        return icons[category] || '📦';
    }

    getCategoryText(category) {
        const texts = {
            'heads': '모자/헤어',
            'tops': '상의',
            'bottoms': '하의',
            'bags': '가방',
            'accessories': '액세서리',
            'special': '특수 효과'
        };
        return texts[category] || category;
    }

    getRarityText(rarity) {
        const texts = {
            'C': '일반',
            'B': '고급',
            'A': '희귀',
            'S': '영웅',
            'SP': '특별',
            'Legendary': '전설'
        };
        return texts[rarity] || rarity;
    }

    getStatBonusText(bonus) {
        const texts = {
            'GOLD_BOOST': '골드 획득',
            'EXP_BOOST': '경험치 획득',
            'ITEM_DROP': '아이템 드롭',
            'SCORE_BOOST': '점수 획득',
            'SPEED_BOOST': '이동 속도',
            'STAMINA_REGEN': '체력 회복',
            'INVENTORY': '가방 슬롯',
            'NONE': '없음'
        };
        return texts[bonus] || bonus;
    }

    getUnlockConditionText(costume) {
        switch (costume.unlockCondition) {
            case 'LEVEL':
                return `레벨 ${costume.unlockValue} 달성`;
            case 'ITEM':
                return `아이템 "${costume.unlockValue}" 획득`;
            case 'REGION':
                return `"${costume.unlockValue}" 지역 클리어`;
            case 'GOLD':
                return `골드 ${costume.unlockValue}개 보유`;
            case 'ACHIEVEMENT':
                return `업적 "${costume.unlockValue}" 달성`;
            default:
                return '알 수 없는 조건';
        }
    }
}

// 전역 인스턴스 생성
const CostumeUI = new CostumeUIController();
