// ========================================
// Region Manager - Hierarchical Region System
// ========================================

class RegionManager {
    constructor() {
        this.cities = [];
        this.gus = [];
        this.dongs = [];
        this.levels = [];
        this.playerProgress = {
            unlockedGus: new Set(['GU_JUNGGU']), // 중구는 처음부터 해제
            unlockedDongs: new Set(['DONG_SOGONG']), // 소공동은 처음부터 해제
            completedDongs: new Set(),
            completedGus: new Set(),
            completedCities: new Set(),
            clearedStages: new Set()
        };
    }

    async init() {
        await this.loadData();
        this.loadPlayerProgress();
        console.log('✅ 지역 시스템 초기화 완료');
    }

    async loadData() {
        await Promise.all([
            this.loadCityData(),
            this.loadGuData(),
            this.loadDongData(),
            this.loadLevelData()
        ]);
    }

    async loadCityData() {
        try {
            const response = await fetch('data/CityData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length < 5) continue;

                this.cities.push({
                    id: parts[0],
                    name: parts[1],
                    province: parts[2],
                    lat: parseFloat(parts[3]),
                    lng: parseFloat(parts[4]),
                    description: parts[5] || ''
                });
            }
            console.log(`📍 ${this.cities.length}개 도시 로드`);
        } catch (error) {
            console.error('❌ CityData 로드 실패:', error);
        }
    }

    async loadGuData() {
        try {
            const response = await fetch('data/GuData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length < 7) continue;

                this.gus.push({
                    id: parts[0],
                    name: parts[1],
                    cityId: parts[2],
                    lat: parseFloat(parts[3]),
                    lng: parseFloat(parts[4]),
                    description: parts[5] || '',
                    unlockCondition: parts[6] || 'NONE',
                    totalDongs: parseInt(parts[7]) || 0
                });
            }
            console.log(`🏢 ${this.gus.length}개 구 로드`);
        } catch (error) {
            console.error('❌ GuData 로드 실패:', error);
        }
    }

    async loadDongData() {
        try {
            const response = await fetch('data/DongData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length < 8) continue;

                this.dongs.push({
                    id: parts[0],
                    name: parts[1],
                    guId: parts[2],
                    lat: parseFloat(parts[3]),
                    lng: parseFloat(parts[4]),
                    description: parts[5] || '',
                    stageCount: parseInt(parts[6]) || 0,
                    unlockCondition: parts[7] || 'NONE'
                });
            }
            console.log(`🏘️ ${this.dongs.length}개 동 로드`);
        } catch (error) {
            console.error('❌ DongData 로드 실패:', error);
        }
    }

    async loadLevelData() {
        try {
            const response = await fetch('data/LevelData.csv');
            const text = await response.text();
            const lines = text.trim().split('\n');

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const parts = line.split(',');
                if (parts.length < 10) continue;

                this.levels.push({
                    id: parseInt(parts[0]),
                    dongId: parts[1],
                    stageNumber: parseInt(parts[2]),
                    regionName: parts[3],
                    missionType: parts[4],
                    targetVal: parseInt(parts[5]),
                    moves: parseInt(parts[6]),
                    gimmick: parts[7] || '',
                    rewardItem: parts[8] || '',
                    restaurantId: parts[9] || ''
                });
            }
            console.log(`🎮 ${this.levels.length}개 스테이지 로드`);
        } catch (error) {
            console.error('❌ LevelData 로드 실패:', error);
        }
    }

    // 플레이어 진행 상황 로드
    loadPlayerProgress() {
        const saved = localStorage.getItem('regionProgress');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.playerProgress.unlockedGus = new Set(data.unlockedGus || ['GU_JUNGGU']);
                this.playerProgress.unlockedDongs = new Set(data.unlockedDongs || ['DONG_SOGONG']);
                this.playerProgress.completedDongs = new Set(data.completedDongs || []);
                this.playerProgress.completedGus = new Set(data.completedGus || []);
                this.playerProgress.completedCities = new Set(data.completedCities || []);
                this.playerProgress.clearedStages = new Set(data.clearedStages || []);
            } catch (e) {
                console.error('진행 상황 로드 실패:', e);
            }
        }
    }

    // 진행 상황 저장
    savePlayerProgress() {
        const data = {
            unlockedGus: [...this.playerProgress.unlockedGus],
            unlockedDongs: [...this.playerProgress.unlockedDongs],
            completedDongs: [...this.playerProgress.completedDongs],
            completedGus: [...this.playerProgress.completedGus],
            completedCities: [...this.playerProgress.completedCities],
            clearedStages: [...this.playerProgress.clearedStages]
        };
        localStorage.setItem('regionProgress', JSON.stringify(data));
    }

    // 구 잠금 해제 체크
    isGuUnlocked(guId) {
        return this.playerProgress.unlockedGus.has(guId);
    }

    // 동 잠금 해제 체크
    isDongUnlocked(dongId) {
        return this.playerProgress.unlockedDongs.has(dongId);
    }

    // 스테이지 클리어 체크
    isStageClear(levelId) {
        return this.playerProgress.clearedStages.has(levelId);
    }

    // 스테이지 클리어 처리
    clearStage(levelId) {
        this.playerProgress.clearedStages.add(levelId);

        const level = this.levels.find(l => l.id === levelId);
        if (!level) return;

        // 동 완료 체크
        const dongStages = this.levels.filter(l => l.dongId === level.dongId);
        const allCleared = dongStages.every(l => this.playerProgress.clearedStages.has(l.id));

        if (allCleared) {
            this.completeDong(level.dongId);
        }

        this.savePlayerProgress();
    }

    // 동 완료 처리
    completeDong(dongId) {
        this.playerProgress.completedDongs.add(dongId);

        const dong = this.dongs.find(d => d.id === dongId);
        if (!dong) return;

        // 다음 동 해제
        this.unlockNextDong(dongId);

        // 구 완료 체크
        const guDongs = this.dongs.filter(d => d.guId === dong.guId);
        const allCompleted = guDongs.every(d => this.playerProgress.completedDongs.has(d.id));

        if (allCompleted) {
            this.completeGu(dong.guId);
        }

        this.savePlayerProgress();

        // 알림
        if (window.Game && window.Game.showNotification) {
            window.Game.showNotification(
                '🎉 동네 완료!',
                `${dong.name}을(를) 완료했습니다!`,
                3000
            );
        }
    }

    // 구 완료 처리
    completeGu(guId) {
        this.playerProgress.completedGus.add(guId);

        const gu = this.gus.find(g => g.id === guId);
        if (!gu) return;

        // 다음 구 해제
        this.unlockNextGu(guId);

        // 도시 완료 체크
        const cityGus = this.gus.filter(g => g.cityId === gu.cityId);
        const allCompleted = cityGus.every(g => this.playerProgress.completedGus.has(g.id));

        if (allCompleted) {
            this.completeCity(gu.cityId);
        }

        this.savePlayerProgress();

        // 알림
        if (window.Game && window.Game.showNotification) {
            window.Game.showNotification(
                '🏆 구 완료!',
                `${gu.name}을(를) 완료했습니다!`,
                5000
            );
        }
    }

    // 도시 완료
    completeCity(cityId) {
        this.playerProgress.completedCities.add(cityId);
        this.savePlayerProgress();

        const city = this.cities.find(c => c.id === cityId);
        if (city && window.Game && window.Game.showNotification) {
            window.Game.showNotification(
                '👑 도시 완료!',
                `${city.name}을(를) 완료했습니다! 축하합니다!`,
                7000
            );
        }
    }

    // 다음 동 잠금 해제
    unlockNextDong(completedDongId) {
        const nextDong = this.dongs.find(d =>
            d.unlockCondition === `COMPLETE_${completedDongId}`
        );

        if (nextDong) {
            this.playerProgress.unlockedDongs.add(nextDong.id);
        }
    }

    // 다음 구 잠금 해제
    unlockNextGu(completedGuId) {
        const nextGu = this.gus.find(g =>
            g.unlockCondition === `COMPLETE_${completedGuId}`
        );

        if (nextGu) {
            this.playerProgress.unlockedGus.add(nextGu.id);
        }
    }

    // 도시별 구 목록
    getGusByCity(cityId) {
        return this.gus.filter(g => g.cityId === cityId);
    }

    // 구별 동 목록
    getDongsByGu(guId) {
        return this.dongs.filter(d => d.guId === guId);
    }

    // 동별 스테이지 목록
    getStagesByDong(dongId) {
        return this.levels.filter(l => l.dongId === dongId);
    }

    // 진행률 계산
    getProgress() {
        const totalStages = this.levels.length;
        const clearedStages = this.playerProgress.clearedStages.size;

        return {
            totalStages,
            clearedStages,
            percentage: Math.floor((clearedStages / totalStages) * 100),
            totalDongs: this.dongs.length,
            completedDongs: this.playerProgress.completedDongs.size,
            totalGus: this.gus.length,
            completedGus: this.playerProgress.completedGus.size
        };
    }
}

// 전역 인스턴스
const RegionSystem = new RegionManager();
