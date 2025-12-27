// 경기도 시/군 데이터
const GyeonggiSiData = {
    cities: [
        {
            id: "gyeonggi_suwon",
            name: "수원시",
            provinceId: "gyeonggi",
            center: [37.2636, 127.0286],
            zoom: 12,
            color: "#FF69B4",
            icon: "🏯",
            dongCount: 44,
            description: "화성 행궁과 수원 갈비의 도시",
            unlockCondition: "NONE"
        },
        {
            id: "gyeonggi_seongnam",
            name: "성남시",
            provinceId: "gyeonggi",
            center: [37.4200, 127.1267],
            zoom: 12,
            color: "#4682B4",
            icon: "💻",
            dongCount: 45,
            description: "판교 테크노밸리의 IT 도시",
            unlockCondition: "COMPLETE_gyeonggi_suwon"
        },
        {
            id: "gyeonggi_goyang",
            name: "고양시",
            provinceId: "gyeonggi",
            center: [37.6564, 126.8350],
            zoom: 12,
            color: "#90EE90",
            icon: "🌷",
            dongCount: 39,
            description: "일산 호수공원과 킨텍스",
            unlockCondition: "COMPLETE_gyeonggi_seongnam"
        },
        {
            id: "gyeonggi_yongin",
            name: "용인시",
            provinceId: "gyeonggi",
            center: [37.2411, 127.1775],
            zoom: 12,
            color: "#FFB6C1",
            icon: "🎢",
            dongCount: 31,
            description: "에버랜드와 한국민속촌",
            unlockCondition: "COMPLETE_gyeonggi_suwon"
        },
        {
            id: "gyeonggi_bucheon",
            name: "부천시",
            provinceId: "gyeonggi",
            center: [37.5034, 126.7660],
            zoom: 12,
            color: "#DDA0DD",
            icon: "🎬",
            dongCount: 36,
            description: "만화와 영화의 도시",
            unlockCondition: "COMPLETE_gyeonggi_goyang"
        },
        {
            id: "gyeonggi_ansan",
            name: "안산시",
            provinceId: "gyeonggi",
            center: [37.3219, 126.8309],
            zoom: 12,
            color: "#F0E68C",
            icon: "🌊",
            dongCount: 25,
            description: "시화호와 다문화의 도시",
            unlockCondition: "COMPLETE_gyeonggi_bucheon"
        },
        {
            id: "gyeonggi_anyang",
            name: "안양시",
            provinceId: "gyeonggi",
            center: [37.3943, 126.9568],
            zoom: 12,
            color: "#CD853F",
            icon: "⛰️",
            dongCount: 31,
            description: "관악산 자락의 예술 도시",
            unlockCondition: "COMPLETE_gyeonggi_seongnam"
        },
        {
            id: "gyeonggi_pyeongtaek",
            name: "평택시",
            provinceId: "gyeonggi",
            center: [36.9921, 127.0889],
            zoom: 11,
            color: "#FFD700",
            icon: "🚂",
            dongCount: 27,
            description: "국제도시와 미군기지",
            unlockCondition: "COMPLETE_gyeonggi_suwon"
        },
        {
            id: "gyeonggi_siheung",
            name: "시흥시",
            provinceId: "gyeonggi",
            center: [37.3800, 126.8027],
            zoom: 12,
            color: "#98FB98",
            icon: "🏖️",
            dongCount: 18,
            description: "오이도와 갯골생태공원",
            unlockCondition: "COMPLETE_gyeonggi_ansan"
        },
        {
            id: "gyeonggi_gimpo",
            name: "김포시",
            provinceId: "gyeonggi",
            center: [37.6152, 126.7156],
            zoom: 12,
            color: "#B0C4DE",
            icon: "✈️",
            dongCount: 10,
            description: "김포공항과 한강 하구",
            unlockCondition: "COMPLETE_gyeonggi_goyang"
        },
        {
            id: "gyeonggi_gwangmyeong",
            name: "광명시",
            provinceId: "gyeonggi",
            center: [37.4786, 126.8644],
            zoom: 13,
            color: "#FF6347",
            icon: "💎",
            dongCount: 18,
            description: "KTX 광명역과 광명동굴",
            unlockCondition: "COMPLETE_gyeonggi_bucheon"
        },
        {
            id: "gyeonggi_gwangju",
            name: "광주시",
            provinceId: "gyeonggi",
            center: [37.4294, 127.2551],
            zoom: 12,
            color: "#FFA07A",
            icon: "🍶",
            dongCount: 6,
            description: "남한산성과 도자기의 고장",
            unlockCondition: "COMPLETE_gyeonggi_yongin"
        },
        {
            id: "gyeonggi_gunpo",
            name: "군포시",
            provinceId: "gyeonggi",
            center: [37.3617, 126.9352],
            zoom: 13,
            color: "#9370DB",
            icon: "🌸",
            dongCount: 10,
            description: "산본 신도시와 수리산",
            unlockCondition: "COMPLETE_gyeonggi_anyang"
        },
        {
            id: "gyeonggi_hanam",
            name: "하남시",
            provinceId: "gyeonggi",
            center: [37.5393, 127.2147],
            zoom: 12,
            color: "#20B2AA",
            icon: "🛍️",
            dongCount: 6,
            description: "스타필드와 미사강변도시",
            unlockCondition: "COMPLETE_gyeonggi_seongnam"
        },
        {
            id: "gyeonggi_osan",
            name: "오산시",
            provinceId: "gyeonggi",
            center: [37.1498, 127.0698],
            zoom: 13,
            color: "#FF1493",
            icon: "📚",
            dongCount: 6,
            description: "세마역과 오산대",
            unlockCondition: "COMPLETE_gyeonggi_pyeongtaek"
        },
        {
            id: "gyeonggi_icheon",
            name: "이천시",
            provinceId: "gyeonggi",
            center: [37.2720, 127.4347],
            zoom: 11,
            color: "#32CD32",
            icon: "🍚",
            dongCount: 2,
            description: "이천 쌀과 도자기 축제",
            unlockCondition: "COMPLETE_gyeonggi_gwangju"
        },
        {
            id: "gyeonggi_uiwang",
            name: "의왕시",
            provinceId: "gyeonggi",
            center: [37.3449, 126.9683],
            zoom: 13,
            color: "#FFE4B5",
            icon: "🚃",
            dongCount: 6,
            description: "철도박물관과 백운호수",
            unlockCondition: "COMPLETE_gyeonggi_gunpo"
        },
        {
            id: "gyeonggi_paju",
            name: "파주시",
            provinceId: "gyeonggi",
            center: [37.7599, 126.7800],
            zoom: 11,
            color: "#BA55D3",
            icon: "📖",
            dongCount: 9,
            description: "헤이리 예술마을과 DMZ",
            unlockCondition: "COMPLETE_gyeonggi_gimpo"
        },
        {
            id: "gyeonggi_namyangju",
            name: "남양주시",
            provinceId: "gyeonggi",
            center: [37.6360, 127.2165],
            zoom: 11,
            color: "#7B68EE",
            icon: "🌳",
            dongCount: 12,
            description: "다산 정약용과 물의 정원",
            unlockCondition: "COMPLETE_gyeonggi_hanam"
        },
        {
            id: "gyeonggi_hwaseong",
            name: "화성시",
            provinceId: "gyeonggi",
            center: [37.1994, 126.8313],
            zoom: 11,
            color: "#FFDAB9",
            icon: "🚀",
            dongCount: 23,
            description: "동탄 신도시와 공룡박물관",
            unlockCondition: "COMPLETE_gyeonggi_osan"
        },
        {
            id: "gyeonggi_uijeongbu",
            name: "의정부시",
            provinceId: "gyeonggi",
            center: [37.7381, 127.0338],
            zoom: 12,
            color: "#DEB887",
            icon: "🍖",
            dongCount: 14,
            description: "부대찌개의 원조",
            unlockCondition: "COMPLETE_gyeonggi_namyangju"
        },
        {
            id: "gyeonggi_yangju",
            name: "양주시",
            provinceId: "gyeonggi",
            center: [37.7853, 127.0456],
            zoom: 11,
            color: "#87CEEB",
            icon: "⛰️",
            dongCount: 4,
            description: "감악산과 송암스페이스센터",
            unlockCondition: "COMPLETE_gyeonggi_uijeongbu"
        },
        {
            id: "gyeonggi_guri",
            name: "구리시",
            provinceId: "gyeonggi",
            center: [37.5943, 127.1295],
            zoom: 13,
            color: "#FF8C00",
            icon: "🌾",
            dongCount: 8,
            description: "동구릉과 왕숙천",
            unlockCondition: "COMPLETE_gyeonggi_namyangju"
        },
        {
            id: "gyeonggi_pocheon",
            name: "포천시",
            provinceId: "gyeonggi",
            center: [37.8949, 127.2003],
            zoom: 11,
            color: "#228B22",
            icon: "🍇",
            dongCount: 2,
            description: "산정호수와 허브아일랜드",
            unlockCondition: "COMPLETE_gyeonggi_yangju"
        },
        {
            id: "gyeonggi_dongducheon",
            name: "동두천시",
            provinceId: "gyeonggi",
            center: [37.9035, 127.0606],
            zoom: 12,
            color: "#FFA500",
            icon: "🎖️",
            dongCount: 7,
            description: "미군기지와 소요산",
            unlockCondition: "COMPLETE_gyeonggi_yangju"
        },
        {
            id: "gyeonggi_anseong",
            name: "안성시",
            provinceId: "gyeonggi",
            center: [37.0079, 127.2798],
            zoom: 11,
            color: "#DB7093",
            icon: "🥁",
            dongCount: 1,
            description: "안성맞춤과 남사당패",
            unlockCondition: "COMPLETE_gyeonggi_pyeongtaek"
        },
        {
            id: "gyeonggi_yeoju",
            name: "여주시",
            provinceId: "gyeonggi",
            center: [37.2983, 127.6374],
            zoom: 11,
            color: "#8B4513",
            icon: "👑",
            dongCount: 1,
            description: "세종대왕릉과 신륵사",
            unlockCondition: "COMPLETE_gyeonggi_icheon"
        },
        {
            id: "gyeonggi_yangpyeong",
            name: "양평군",
            provinceId: "gyeonggi",
            center: [37.4917, 127.4877],
            zoom: 11,
            color: "#006400",
            icon: "💧",
            dongCount: 0,
            description: "두물머리와 용문사",
            unlockCondition: "COMPLETE_gyeonggi_yeoju"
        },
        {
            id: "gyeonggi_gapyeong",
            name: "가평군",
            provinceId: "gyeonggi",
            center: [37.8315, 127.5096],
            zoom: 11,
            color: "#2E8B57",
            icon: "🚠",
            dongCount: 0,
            description: "남이섬과 아침고요수목원",
            unlockCondition: "COMPLETE_gyeonggi_yangpyeong"
        },
        {
            id: "gyeonggi_yeoncheon",
            name: "연천군",
            provinceId: "gyeonggi",
            center: [38.0966, 127.0750],
            zoom: 11,
            color: "#556B2F",
            icon: "🦅",
            dongCount: 0,
            description: "DMZ와 재인폭포",
            unlockCondition: "COMPLETE_gyeonggi_pocheon"
        }
    ],

    // 시/군 ID로 정보 가져오기
    getCity(cityId) {
        return this.cities.find(city => city.id === cityId) || null;
    },

    // 도 ID로 시/군 목록 가져오기
    getCitiesByProvince(provinceId) {
        return this.cities.filter(city => city.provinceId === provinceId);
    },

    // 잠금 해제된 시/군 목록 가져오기
    getUnlockedCities(completedCities = []) {
        return this.cities.filter(city => {
            if (city.unlockCondition === "NONE") return true;
            if (city.unlockCondition.startsWith("COMPLETE_")) {
                const requiredCity = city.unlockCondition.replace("COMPLETE_", "");
                return completedCities.includes(requiredCity);
            }
            return false;
        });
    }
};
