/**
 * DataLoader - 게임 데이터를 비동기로 로드하고 캐싱하는 클래스
 * 하드코딩된 데이터를 JSON 파일로 분리하여 관리
 */

const DataLoader = {
    // 캐시 저장소
    cache: new Map(),

    // 로딩 상태 추적
    loadingPromises: new Map(),

    // 기본 데이터 경로
    basePath: './data',

    /**
     * JSON 파일을 비동기로 로드 (캐싱 지원)
     * @param {string} path - 파일 경로 (basePath 기준)
     * @param {boolean} forceReload - 캐시 무시하고 새로 로드
     * @returns {Promise<any>} 로드된 데이터
     */
    async load(path, forceReload = false) {
        const fullPath = `${this.basePath}/${path}`;

        // 캐시 확인
        if (!forceReload && this.cache.has(fullPath)) {
            console.log(`📦 캐시에서 로드: ${path}`);
            return this.cache.get(fullPath);
        }

        // 이미 로딩 중인 경우 해당 Promise 반환 (중복 요청 방지)
        if (this.loadingPromises.has(fullPath)) {
            console.log(`⏳ 이미 로딩 중: ${path}`);
            return this.loadingPromises.get(fullPath);
        }

        // 새로 로드
        const loadPromise = this._fetchJson(fullPath);
        this.loadingPromises.set(fullPath, loadPromise);

        try {
            const data = await loadPromise;
            this.cache.set(fullPath, data);
            console.log(`✅ 로드 완료: ${path}`);
            return data;
        } catch (error) {
            console.error(`❌ 로드 실패: ${path}`, error);
            throw error;
        } finally {
            this.loadingPromises.delete(fullPath);
        }
    },

    /**
     * 실제 fetch 수행
     */
    async _fetchJson(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    },

    /**
     * 전국 시도 데이터 로드
     */
    async loadRegions() {
        return this.load('regions.json');
    },

    /**
     * 특정 시도의 구/군/시 데이터 로드
     * @param {string} regionId - 시도 ID (예: 'seoul', 'incheon')
     */
    async loadCities(regionId) {
        return this.load(`cities/${regionId}.json`);
    },

    /**
     * 특정 구/군의 동 데이터 로드
     * @param {string} regionId - 시도 ID
     * @param {string} cityId - 구/군 ID
     */
    async loadDistricts(regionId, cityId) {
        return this.load(`districts/${regionId}/${cityId}.json`);
    },

    /**
     * 특정 지역의 맛집 데이터 로드
     * @param {string} regionId - 시도 ID
     */
    async loadRestaurants(regionId) {
        return this.load(`restaurants/${regionId}.json`);
    },

    /**
     * 레벨 데이터 로드
     */
    async loadLevels() {
        return this.load('levels.json');
    },

    /**
     * 아이템 데이터 로드
     */
    async loadItems() {
        return this.load('items.json');
    },

    /**
     * 여러 파일을 병렬로 로드
     * @param {string[]} paths - 파일 경로 배열
     * @returns {Promise<Map<string, any>>} 경로:데이터 Map
     */
    async loadMultiple(paths) {
        const results = new Map();
        const promises = paths.map(async (path) => {
            const data = await this.load(path);
            results.set(path, data);
        });

        await Promise.all(promises);
        return results;
    },

    /**
     * 게임 시작 시 필수 데이터 프리로드
     */
    async preloadEssentials() {
        console.log('🚀 필수 데이터 프리로드 시작...');
        const startTime = performance.now();

        try {
            await Promise.all([
                this.loadRegions(),
                this.loadLevels(),
                this.loadItems()
            ]);

            const elapsed = (performance.now() - startTime).toFixed(2);
            console.log(`✅ 필수 데이터 프리로드 완료 (${elapsed}ms)`);
        } catch (error) {
            console.error('❌ 필수 데이터 프리로드 실패:', error);
            throw error;
        }
    },

    /**
     * 특정 지역 데이터 프리로드 (지역 선택 시)
     * @param {string} regionId - 시도 ID
     */
    async preloadRegion(regionId) {
        console.log(`🗺️ ${regionId} 지역 데이터 프리로드 시작...`);
        const startTime = performance.now();

        try {
            await Promise.all([
                this.loadCities(regionId),
                this.loadRestaurants(regionId)
            ]);

            const elapsed = (performance.now() - startTime).toFixed(2);
            console.log(`✅ ${regionId} 지역 데이터 프리로드 완료 (${elapsed}ms)`);
        } catch (error) {
            console.error(`❌ ${regionId} 지역 데이터 프리로드 실패:`, error);
            // 실패해도 게임 진행 가능하도록 에러를 던지지 않음
        }
    },

    /**
     * 캐시 초기화
     */
    clearCache() {
        this.cache.clear();
        console.log('🗑️ 데이터 캐시 초기화 완료');
    },

    /**
     * 특정 경로의 캐시만 삭제
     * @param {string} path - 파일 경로
     */
    invalidateCache(path) {
        const fullPath = `${this.basePath}/${path}`;
        this.cache.delete(fullPath);
        console.log(`🗑️ 캐시 삭제: ${path}`);
    },

    /**
     * 캐시 상태 확인
     */
    getCacheStatus() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
};

// 전역에서 사용 가능하도록 export
if (typeof window !== 'undefined') {
    window.DataLoader = DataLoader;
}
