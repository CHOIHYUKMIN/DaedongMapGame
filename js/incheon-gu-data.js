// 인천 10개 구/군 데이터
const IncheonGuData = {
    gus: [
        {
            id: "incheon_junggu",
            name: "중구",
            cityId: "incheon",
            center: [37.4738, 126.6217],
            zoom: 13,
            color: "#FF6B9D",
            icon: "✈️",
            dongCount: 12,
            description: "인천국제공항과 차이나타운",
            unlockCondition: "NONE" // 시작 지역
        },
        {
            id: "incheon_donggu",
            name: "동구",
            cityId: "incheon",
            center: [37.4737, 126.6432],
            zoom: 13,
            color: "#4682B4",
            icon: "🏛️",
            dongCount: 6,
            description: "인천역과 동인천역 주변",
            unlockCondition: "COMPLETE_incheon_junggu"
        },
        {
            id: "incheon_michuhol",
            name: "미추홀구",
            cityId: "incheon",
            center: [37.4421, 126.6502],
            zoom: 13,
            color: "#90EE90",
            icon: "🏢",
            dongCount: 21,
            description: "인천의 구도심, 숭의동과 주안",
            unlockCondition: "COMPLETE_incheon_donggu"
        },
        {
            id: "incheon_yeonsu",
            name: "연수구",
            cityId: "incheon",
            center: [37.4102, 126.6783],
            zoom: 13,
            color: "#FFB6C1",
            icon: "🌊",
            dongCount: 12,
            description: "송도국제도시와 컨벤시아",
            unlockCondition: "COMPLETE_incheon_michuhol"
        },
        {
            id: "incheon_namdong",
            name: "남동구",
            cityId: "incheon",
            center: [37.4486, 126.7317],
            zoom: 13,
            color: "#DDA0DD",
            icon: "🏭",
            dongCount: 18,
            description: "인천대공원과 남동공단",
            unlockCondition: "COMPLETE_incheon_yeonsu"
        },
        {
            id: "incheon_bupyeong",
            name: "부평구",
            cityId: "incheon",
            center: [37.5066, 126.7219],
            zoom: 13,
            color: "#F0E68C",
            icon: "🛍️",
            dongCount: 22,
            description: "부평 지하상가와 부평역",
            unlockCondition: "COMPLETE_incheon_namdong"
        },
        {
            id: "incheon_gyeyang",
            name: "계양구",
            cityId: "incheon",
            center: [37.5371, 126.7377],
            zoom: 13,
            color: "#CD853F",
            icon: "⛰️",
            dongCount: 11,
            description: "계양산과 아라뱃길",
            unlockCondition: "COMPLETE_incheon_bupyeong"
        },
        {
            id: "incheon_seogu",
            name: "서구",
            cityId: "incheon",
            center: [37.5455, 126.6762],
            zoom: 13,
            color: "#FFD700",
            icon: "🌆",
            dongCount: 16,
            description: "청라국제도시와 루원시티",
            unlockCondition: "COMPLETE_incheon_gyeyang"
        },
        {
            id: "incheon_ganghwa",
            name: "강화군",
            cityId: "incheon",
            center: [37.7467, 126.4877],
            zoom: 11,
            color: "#228B22",
            icon: "🏯",
            dongCount: 0,
            description: "강화도와 마니산, 역사 유적지",
            unlockCondition: "COMPLETE_incheon_seogu"
        },
        {
            id: "incheon_ongjin",
            name: "옹진군",
            cityId: "incheon",
            center: [37.4467, 126.6380],
            zoom: 10,
            color: "#20B2AA",
            icon: "🏝️",
            dongCount: 0,
            description: "백령도, 대청도, 연평도",
            unlockCondition: "COMPLETE_incheon_ganghwa"
        }
    ],

    // 구 ID로 구 정보 가져오기
    getGu(guId) {
        return this.gus.find(gu => gu.id === guId) || null;
    },

    // 도시 ID로 구 목록 가져오기
    getGusByCity(cityId) {
        return this.gus.filter(gu => gu.cityId === cityId);
    },

    // 잠금 해제된 구 목록 가져오기
    getUnlockedGus(completedGus = []) {
        return this.gus.filter(gu => {
            if (gu.unlockCondition === "NONE") return true;
            if (gu.unlockCondition.startsWith("COMPLETE_")) {
                const requiredGu = gu.unlockCondition.replace("COMPLETE_", "");
                return completedGus.includes(requiredGu);
            }
            return false;
        });
    }
};
