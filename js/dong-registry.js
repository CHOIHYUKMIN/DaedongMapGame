// 동(洞) 데이터 레지스트리 - 모든 동 데이터를 통합 관리
// 새 지역 추가 시 이 파일에 등록만 하면 자동으로 동 지도가 활성화됨

const DongDataRegistry = {
    // 등록된 동 데이터 소스들
    sources: {},

    // JSON 기반 데이터 캐시
    jsonCache: {},

    // 동 데이터 소스 등록
    register(guId, dataSource) {
        this.sources[guId] = dataSource;
        console.log(`📍 동 데이터 등록: ${guId}`);
    },

    // 해당 구에 동 데이터가 있는지 확인
    hasDongData(guId) {
        return !!this.sources[guId] || !!this.jsonCache[guId];
    },

    // 해당 구의 동 데이터 소스 가져오기
    getDataSource(guId) {
        return this.sources[guId] || this.jsonCache[guId] || null;
    },

    // 해당 구의 동 목록 가져오기
    getDongs(guId) {
        // 기존 하드코딩 데이터 확인
        const source = this.sources[guId];
        if (source && typeof source.getDongsByGu === 'function') {
            return source.getDongsByGu(guId);
        }
        if (source && source.dongs) {
            return source.dongs;
        }

        // JSON 캐시 확인
        const cached = this.jsonCache[guId];
        if (cached && cached.neighborhoods) {
            return cached.neighborhoods;
        }

        return [];
    },

    // 특정 동 가져오기
    getDong(dongId) {
        for (const guId in this.sources) {
            const source = this.sources[guId];
            if (source && typeof source.getDong === 'function') {
                const dong = source.getDong(dongId);
                if (dong) return dong;
            }
        }

        // JSON 캐시에서도 검색
        for (const guId in this.jsonCache) {
            const cached = this.jsonCache[guId];
            if (cached && cached.neighborhoods) {
                const dong = cached.neighborhoods.find(d => d.id === dongId);
                if (dong) return dong;
            }
        }

        return null;
    },

    // JSON 파일에서 동 데이터 비동기 로드 (새 기능)
    async loadFromJson(regionId, districtId) {
        const cacheKey = `${regionId}_${districtId}`;

        // 이미 캐시에 있으면 반환
        if (this.jsonCache[cacheKey]) {
            return this.jsonCache[cacheKey];
        }

        // DataLoader가 있으면 사용
        if (typeof DataLoader !== 'undefined') {
            try {
                const data = await DataLoader.loadDistricts(regionId, districtId);
                this.jsonCache[cacheKey] = data;
                console.log(`📍 JSON 동 데이터 로드 완료: ${cacheKey}`);
                return data;
            } catch (error) {
                console.warn(`⚠️ JSON 동 데이터 로드 실패: ${cacheKey}`, error);
            }
        }

        return null;
    }
};

// 기존 동 데이터 소스들 자동 등록
document.addEventListener('DOMContentLoaded', () => {
    // 서울 강남구
    if (typeof GangnamDongData !== 'undefined') {
        DongDataRegistry.register('seoul_gangnam', GangnamDongData);
    }
    // 서울 중구
    if (typeof JungguDongData !== 'undefined') {
        DongDataRegistry.register('seoul_junggu', JungguDongData);
    }
    // 서울 종로구
    if (typeof JongnoguDongData !== 'undefined') {
        DongDataRegistry.register('seoul_jongno', JongnoguDongData);
    }
    // 인천 중구
    if (typeof IncheonJungguDongData !== 'undefined') {
        DongDataRegistry.register('incheon_junggu', IncheonJungguDongData);
    }

    console.log('✅ 동 데이터 레지스트리 초기화 완료:', Object.keys(DongDataRegistry.sources));
});
