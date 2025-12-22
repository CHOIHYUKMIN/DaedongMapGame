// 서울 25개 구 데이터
const SeoulGuData = {
    gus: [
        {
            id: "seoul_gangnam",
            name: "강남구",
            cityId: "seoul",
            center: [37.5172, 127.0473],
            zoom: 13,
            color: "#FF69B4",
            icon: "🏢",
            dongCount: 22,
            description: "서울의 중심, 강남",
            unlockCondition: "NONE"
        },
        {
            id: "seoul_gangdong",
            name: "강동구",
            cityId: "seoul",
            center: [37.5301, 127.1238],
            zoom: 13,
            color: "#87CEEB",
            icon: "🌳",
            dongCount: 18,
            description: "한강과 함께하는 동쪽 끝",
            unlockCondition: "COMPLETE_seoul_gangnam"
        },
        {
            id: "seoul_gangbuk",
            name: "강북구",
            cityId: "seoul",
            center: [37.6398, 127.0256],
            zoom: 13,
            color: "#90EE90",
            icon: "⛰️",
            dongCount: 13,
            description: "북한산 자락의 평화로운 동네",
            unlockCondition: "COMPLETE_seoul_seongbuk"
        },
        {
            id: "seoul_gangseo",
            name: "강서구",
            cityId: "seoul",
            center: [37.5509, 126.8495],
            zoom: 13,
            color: "#FFB6C1",
            icon: "✈️",
            dongCount: 20,
            description: "김포공항이 있는 서쪽 관문",
            unlockCondition: "COMPLETE_seoul_yangcheon"
        },
        {
            id: "seoul_gwanak",
            name: "관악구",
            cityId: "seoul",
            center: [37.4784, 126.9516],
            zoom: 13,
            color: "#DDA0DD",
            icon: "🎓",
            dongCount: 21,
            description: "서울대학교와 관악산",
            unlockCondition: "COMPLETE_seoul_dongjak"
        },
        {
            id: "seoul_gwangjin",
            name: "광진구",
            cityId: "seoul",
            center: [37.5384, 127.0822],
            zoom: 13,
            color: "#F0E68C",
            icon: "🎡",
            dongCount: 15,
            description: "건대입구와 뚝섬의 활기",
            unlockCondition: "COMPLETE_seoul_seongdong"
        },
        {
            id: "seoul_guro",
            name: "구로구",
            cityId: "seoul",
            center: [37.4954, 126.8874],
            zoom: 13,
            color: "#CD853F",
            icon: "🏭",
            dongCount: 16,
            description: "구로디지털단지의 IT 중심지",
            unlockCondition: "COMPLETE_seoul_yeongdeungpo"
        },
        {
            id: "seoul_geumcheon",
            name: "금천구",
            cityId: "seoul",
            center: [37.4519, 126.9018],
            zoom: 13,
            color: "#FFD700",
            icon: "💼",
            dongCount: 10,
            description: "가산디지털단지",
            unlockCondition: "COMPLETE_seoul_guro"
        },
        {
            id: "seoul_nowon",
            name: "노원구",
            cityId: "seoul",
            center: [37.6542, 127.0568],
            zoom: 13,
            color: "#98FB98",
            icon: "🏘️",
            dongCount: 19,
            description: "서울 동북부의 주거 중심지",
            unlockCondition: "COMPLETE_seoul_dobong"
        },
        {
            id: "seoul_dobong",
            name: "도봉구",
            cityId: "seoul",
            center: [37.6688, 127.0471],
            zoom: 13,
            color: "#B0C4DE",
            icon: "🌲",
            dongCount: 14,
            description: "도봉산과 함께하는 북쪽 끝",
            unlockCondition: "COMPLETE_seoul_gangbuk"
        },
        {
            id: "seoul_dongdaemun",
            name: "동대문구",
            cityId: "seoul",
            center: [37.5744, 127.0396],
            zoom: 13,
            color: "#FF6347",
            icon: "🛍️",
            dongCount: 14,
            description: "동대문시장과 패션의 거리",
            unlockCondition: "COMPLETE_seoul_junggu"
        },
        {
            id: "seoul_dongjak",
            name: "동작구",
            cityId: "seoul",
            center: [37.5124, 126.9393],
            zoom: 13,
            color: "#FFA07A",
            icon: "🌸",
            dongCount: 15,
            description: "사당동과 노량진의 활기",
            unlockCondition: "COMPLETE_seoul_yongsan"
        },
        {
            id: "seoul_mapo",
            name: "마포구",
            cityId: "seoul",
            center: [37.5663, 126.9019],
            zoom: 13,
            color: "#9370DB",
            icon: "🎨",
            dongCount: 16,
            description: "홍대와 상암의 문화 중심지",
            unlockCondition: "COMPLETE_seoul_yongsan"
        },
        {
            id: "seoul_seodaemun",
            name: "서대문구",
            cityId: "seoul",
            center: [37.5791, 126.9368],
            zoom: 13,
            color: "#20B2AA",
            icon: "🏛️",
            dongCount: 14,
            description: "이화여대와 신촌의 젊음",
            unlockCondition: "COMPLETE_seoul_jongno"
        },
        {
            id: "seoul_seocho",
            name: "서초구",
            cityId: "seoul",
            center: [37.4837, 127.0324],
            zoom: 13,
            color: "#FF1493",
            icon: "⚖️",
            dongCount: 18,
            description: "법조타운과 강남의 중심",
            unlockCondition: "COMPLETE_seoul_gangnam"
        },
        {
            id: "seoul_seongdong",
            name: "성동구",
            cityId: "seoul",
            center: [37.5634, 127.0371],
            zoom: 13,
            color: "#FFE4B5",
            icon: "🏗️",
            dongCount: 17,
            description: "성수동 카페거리와 뚝섬",
            unlockCondition: "COMPLETE_seoul_junggu"
        },
        {
            id: "seoul_seongbuk",
            name: "성북구",
            cityId: "seoul",
            center: [37.5894, 127.0167],
            zoom: 13,
            color: "#FFDAB9",
            icon: "📚",
            dongCount: 20,
            description: "고려대학교와 북악산",
            unlockCondition: "COMPLETE_seoul_jongno"
        },
        {
            id: "seoul_songpa",
            name: "송파구",
            cityId: "seoul",
            center: [37.5145, 127.1059],
            zoom: 13,
            color: "#FF69B4",
            icon: "🎢",
            dongCount: 28,
            description: "잠실과 롯데월드",
            unlockCondition: "COMPLETE_seoul_gangnam"
        },
        {
            id: "seoul_yangcheon",
            name: "양천구",
            cityId: "seoul",
            center: [37.5170, 126.8664],
            zoom: 13,
            color: "#DEB887",
            icon: "🏡",
            dongCount: 18,
            description: "목동과 신정동의 주거지",
            unlockCondition: "COMPLETE_seoul_mapo"
        },
        {
            id: "seoul_yeongdeungpo",
            name: "영등포구",
            cityId: "seoul",
            center: [37.5264, 126.8963],
            zoom: 13,
            color: "#4682B4",
            icon: "🏢",
            dongCount: 18,
            description: "여의도 금융가",
            unlockCondition: "COMPLETE_seoul_yongsan"
        },
        {
            id: "seoul_yongsan",
            name: "용산구",
            cityId: "seoul",
            center: [37.5326, 126.9905],
            zoom: 13,
            color: "#32CD32",
            icon: "🗼",
            dongCount: 16,
            description: "용산역과 이태원",
            unlockCondition: "COMPLETE_seoul_junggu"
        },
        {
            id: "seoul_eunpyeong",
            name: "은평구",
            cityId: "seoul",
            center: [37.6027, 126.9291],
            zoom: 13,
            color: "#BA55D3",
            icon: "🌳",
            dongCount: 16,
            description: "북한산 자락의 평화",
            unlockCondition: "COMPLETE_seoul_seodaemun"
        },
        {
            id: "seoul_jongno",
            name: "종로구",
            cityId: "seoul",
            center: [37.5730, 126.9794],
            zoom: 13,
            color: "#FFD700",
            icon: "🏰",
            dongCount: 17,
            description: "경복궁과 인사동의 전통",
            unlockCondition: "COMPLETE_seoul_junggu"
        },
        {
            id: "seoul_junggu",
            name: "중구",
            cityId: "seoul",
            center: [37.5636, 126.9976],
            zoom: 13,
            color: "#FF6B9D",
            icon: "🏛️",
            dongCount: 15,
            description: "서울의 심장, 명동과 시청",
            unlockCondition: "NONE" // 시작 지역
        },
        {
            id: "seoul_jungnang",
            name: "중랑구",
            cityId: "seoul",
            center: [37.6063, 127.0925],
            zoom: 13,
            color: "#7B68EE",
            icon: "🏞️",
            dongCount: 16,
            description: "중화역과 먹골역 주변",
            unlockCondition: "COMPLETE_seoul_dongdaemun"
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
