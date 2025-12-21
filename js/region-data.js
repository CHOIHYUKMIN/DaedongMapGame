// 전국 지역 데이터 정의

const RegionData = {
    // 17개 시도 메타데이터
    regions: {
        'seoul': {
            id: 'seoul',
            name: '서울특별시',
            shortName: '서울',
            center: [37.5665, 126.9780],
            zoom: 11,
            color: '#FF69B4',
            icon: '🏛️',
            levels: 10,
            description: '대한민국의 수도, 600년 역사의 중심지'
        },
        'busan': {
            id: 'busan',
            name: '부산광역시',
            shortName: '부산',
            center: [35.1796, 129.0756],
            zoom: 11,
            color: '#4682B4',
            icon: '🌊',
            levels: 8,
            description: '해운대, 광안리로 유명한 항구 도시'
        },
        'daegu': {
            id: 'daegu',
            name: '대구광역시',
            shortName: '대구',
            center: [35.8714, 128.6014],
            zoom: 11,
            color: '#FF6347',
            icon: '🍎',
            levels: 7,
            description: '사과와 섬유산업의 도시'
        },
        'incheon': {
            id: 'incheon',
            name: '인천광역시',
            shortName: '인천',
            center: [37.4563, 126.7052],
            zoom: 11,
            color: '#20B2AA',
            icon: '✈️',
            levels: 7,
            description: '인천국제공항이 있는 관문 도시'
        },
        'gwangju': {
            id: 'gwangju',
            name: '광주광역시',
            shortName: '광주',
            center: [35.1595, 126.8526],
            zoom: 11,
            color: '#9370DB',
            icon: '🎨',
            levels: 6,
            description: '예술과 민주주의의 도시'
        },
        'daejeon': {
            id: 'daejeon',
            name: '대전광역시',
            shortName: '대전',
            center: [36.3504, 127.3845],
            zoom: 11,
            color: '#FFD700',
            icon: '🔬',
            levels: 6,
            description: '과학과 기술의 중심지'
        },
        'ulsan': {
            id: 'ulsan',
            name: '울산광역시',
            shortName: '울산',
            center: [35.5384, 129.3114],
            zoom: 11,
            color: '#FF8C00',
            icon: '🏭',
            levels: 5,
            description: '현대자동차와 조선업의 도시'
        },
        'sejong': {
            id: 'sejong',
            name: '세종특별자치시',
            shortName: '세종',
            center: [36.4800, 127.2890],
            zoom: 11,
            color: '#32CD32',
            icon: '🏢',
            levels: 5,
            description: '대한민국의 행정 수도'
        },
        'gyeonggi': {
            id: 'gyeonggi',
            name: '경기도',
            shortName: '경기',
            center: [37.4138, 127.5183],
            zoom: 10,
            color: '#87CEEB',
            icon: '🌆',
            levels: 12,
            description: '서울을 둘러싼 수도권'
        },
        'gangwon': {
            id: 'gangwon',
            name: '강원특별자치도',
            shortName: '강원',
            center: [37.8228, 128.1555],
            zoom: 9,
            color: '#228B22',
            icon: '⛰️',
            levels: 8,
            description: '설악산과 동해바다의 자연'
        },
        'chungbuk': {
            id: 'chungbuk',
            name: '충청북도',
            shortName: '충북',
            center: [36.8, 127.7],
            zoom: 10,
            color: '#FFA07A',
            icon: '🏔️',
            levels: 6,
            description: '내륙의 중심, 청주와 충주'
        },
        'chungnam': {
            id: 'chungnam',
            name: '충청남도',
            shortName: '충남',
            center: [36.5184, 126.8],
            zoom: 10,
            color: '#DDA0DD',
            icon: '🌾',
            levels: 7,
            description: '서해안과 평야 지대'
        },
        'jeonbuk': {
            id: 'jeonbuk',
            name: '전북특별자치도',
            shortName: '전북',
            center: [35.7175, 127.153],
            zoom: 10,
            color: '#98FB98',
            icon: '🍚',
            levels: 7,
            description: '전주비빔밥의 고장'
        },
        'jeonnam': {
            id: 'jeonnam',
            name: '전라남도',
            shortName: '전남',
            center: [34.8679, 126.991],
            zoom: 10,
            color: '#F0E68C',
            icon: '🌊',
            levels: 8,
            description: '천개의 섬과 남도 음식'
        },
        'gyeongbuk': {
            id: 'gyeongbuk',
            name: '경상북도',
            shortName: '경북',
            center: [36.4919, 128.8889],
            zoom: 9,
            color: '#CD853F',
            icon: '🏯',
            levels: 9,
            description: '천년 고도 경주와 안동'
        },
        'gyeongnam': {
            id: 'gyeongnam',
            name: '경상남도',
            shortName: '경남',
            center: [35.4606, 128.2132],
            zoom: 10,
            color: '#DB7093',
            icon: '🏖️',
            levels: 8,
            description: '통영과 거제의 바다'
        },
        'jeju': {
            id: 'jeju',
            name: '제주특별자치도',
            shortName: '제주',
            center: [33.4996, 126.5312],
            zoom: 10,
            color: '#FF69B4',
            icon: '🍊',
            levels: 6,
            description: '한라산과 돌하르방의 섬'
        }
    },

    // 특정 지역 정보 가져오기
    getRegion(regionId) {
        return this.regions[regionId] || null;
    },

    // 모든 지역 목록 가져오기
    getAllRegions() {
        return Object.values(this.regions);
    },

    // 광역시/특별시 목록
    getMetropolitanCities() {
        return ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong'];
    },

    // 도 목록
    getProvinces() {
        return ['gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju'];
    },

    // 지역별 대표 맛집 카테고리
    regionalSpecialties: {
        'seoul': ['궁중요리', '한정식', '떡볶이', '빈대떡'],
        'busan': ['밀면', '돼지국밥', '씨앗호떡', '동래파전'],
        'daegu': ['막창', '따로국밥', '동인동찜갈비'],
        'incheon': ['짬뽕', '냉면', '연평도 꽃게'],
        'gwangju': ['오리탕', '무등산 보리밥', '떡갈비'],
        'daejeon': ['칼국수', '성심당 빵', '은어구이'],
        'ulsan': ['언양불고기', '대게', '방어회'],
        'sejong': ['한정식', '떡갈비', '연근조림'],
        'gyeonggi': ['수원갈비', '수원왕갈비', '광주 곤드레밥'],
        'gangwon': ['감자옹심이', '막국수', '닭갈비', '황태구이'],
        'chungbuk': ['청주 직지', '음성 고추', '충주 사과'],
        'chungnam': ['아산 어리굴젓', '공주 밤', '보령 굴'],
        'jeonbuk': ['전주비빔밥', '콩나물국밥', '한정식'],
        'jeonnam': ['꼬막', '낙지연포탕', '흑산도 흑염소'],
        'gyeongbuk': ['안동찜닭', '경주빵', '영주 한우'],
        'gyeongnam': ['통영굴', '진주냉면', '밀양 돼지국밥'],
        'jeju': ['흑돼지', '고등어회', '감귤', '한라봉']
    }
};
