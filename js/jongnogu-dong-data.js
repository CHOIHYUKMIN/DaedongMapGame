// 서울 종로구 17개 동 데이터
const JongnoguDongData = {
    dongs: [
        {
            id: "seoul_jongno_insadong",
            name: "인사동",
            guId: "seoul_jongno",
            center: [37.5731, 126.9854],
            zoom: 16,
            color: "#FFD700",
            icon: "🎨",
            levelCount: 5,
            description: "인사동 전통문화거리",
            unlockCondition: "NONE"
        },
        {
            id: "seoul_jongno_samcheong",
            name: "삼청동",
            guId: "seoul_jongno",
            center: [37.5825, 126.9821],
            zoom: 16,
            color: "#FFA500",
            icon: "☕",
            levelCount: 5,
            description: "삼청동 카페거리",
            unlockCondition: "COMPLETE_seoul_jongno_insadong"
        },
        {
            id: "seoul_jongno_bukchon",
            name: "가회동",
            guId: "seoul_jongno",
            center: [37.5820, 126.9835],
            zoom: 16,
            color: "#FF8C00",
            icon: "🏘️",
            levelCount: 5,
            description: "북촌 한옥마을",
            unlockCondition: "COMPLETE_seoul_jongno_samcheong"
        },
        {
            id: "seoul_jongno_gyeongbokgung",
            name: "세종로",
            guId: "seoul_jongno",
            center: [37.5760, 126.9768],
            zoom: 16,
            color: "#DAA520",
            icon: "🏰",
            levelCount: 6,
            description: "경복궁과 광화문",
            unlockCondition: "COMPLETE_seoul_jongno_insadong"
        },
        {
            id: "seoul_jongno_jongno1",
            name: "종로1가",
            guId: "seoul_jongno",
            center: [37.5705, 126.9820],
            zoom: 16,
            color: "#B8860B",
            icon: "🏛️",
            levelCount: 4,
            description: "종각역과 보신각",
            unlockCondition: "NONE"
        },
        {
            id: "seoul_jongno_jongno2",
            name: "종로2가",
            guId: "seoul_jongno",
            center: [37.5700, 126.9870],
            zoom: 16,
            color: "#CD853F",
            icon: "📿",
            levelCount: 4,
            description: "탑골공원과 귀금속거리",
            unlockCondition: "COMPLETE_seoul_jongno_jongno1"
        },
        {
            id: "seoul_jongno_jongno3",
            name: "종로3가",
            guId: "seoul_jongno",
            center: [37.5700, 126.9920],
            zoom: 16,
            color: "#D2691E",
            icon: "🍗",
            levelCount: 5,
            description: "익선동 핫플레이스",
            unlockCondition: "COMPLETE_seoul_jongno_jongno2"
        },
        {
            id: "seoul_jongno_gwangjang",
            name: "예지동",
            guId: "seoul_jongno",
            center: [37.5700, 126.9992],
            zoom: 16,
            color: "#8B4513",
            icon: "🥞",
            levelCount: 6,
            description: "광장시장 먹거리",
            unlockCondition: "COMPLETE_seoul_jongno_jongno3"
        },
        {
            id: "seoul_jongno_dongdaemun",
            name: "창신동",
            guId: "seoul_jongno",
            center: [37.5745, 127.0095],
            zoom: 16,
            color: "#A0522D",
            icon: "🧵",
            levelCount: 4,
            description: "봉제공장 골목",
            unlockCondition: "COMPLETE_seoul_jongno_gwangjang"
        },
        {
            id: "seoul_jongno_hyehwa",
            name: "혜화동",
            guId: "seoul_jongno",
            center: [37.5820, 127.0020],
            zoom: 16,
            color: "#DEB887",
            icon: "🎭",
            levelCount: 5,
            description: "대학로 연극거리",
            unlockCondition: "COMPLETE_seoul_jongno_bukchon"
        },
        {
            id: "seoul_jongno_daehakro",
            name: "명륜동",
            guId: "seoul_jongno",
            center: [37.5870, 126.9960],
            zoom: 16,
            color: "#F4A460",
            icon: "📚",
            levelCount: 4,
            description: "성균관대학교",
            unlockCondition: "COMPLETE_seoul_jongno_hyehwa"
        },
        {
            id: "seoul_jongno_buam",
            name: "부암동",
            guId: "seoul_jongno",
            center: [37.5930, 126.9660],
            zoom: 16,
            color: "#BC8F8F",
            icon: "🎬",
            levelCount: 4,
            description: "부암동 예술마을",
            unlockCondition: "COMPLETE_seoul_jongno_samcheong"
        },
        {
            id: "seoul_jongno_pyeongchang",
            name: "평창동",
            guId: "seoul_jongno",
            center: [37.6100, 126.9750],
            zoom: 16,
            color: "#8B4513",
            icon: "🏔️",
            levelCount: 4,
            description: "평창동 미술관 거리",
            unlockCondition: "COMPLETE_seoul_jongno_buam"
        },
        {
            id: "seoul_jongno_cheongwadae",
            name: "청운동",
            guId: "seoul_jongno",
            center: [37.5870, 126.9705],
            zoom: 16,
            color: "#6B8E23",
            icon: "🏛️",
            levelCount: 5,
            description: "청와대 인근",
            unlockCondition: "COMPLETE_seoul_jongno_gyeongbokgung"
        },
        {
            id: "seoul_jongno_changdeok",
            name: "와룡동",
            guId: "seoul_jongno",
            center: [37.5800, 126.9920],
            zoom: 16,
            color: "#556B2F",
            icon: "🌳",
            levelCount: 4,
            description: "창덕궁과 비원",
            unlockCondition: "COMPLETE_seoul_jongno_bukchon"
        },
        {
            id: "seoul_jongno_changgyeong",
            name: "연건동",
            guId: "seoul_jongno",
            center: [37.5790, 126.9990],
            zoom: 16,
            color: "#8FBC8F",
            icon: "🏥",
            levelCount: 3,
            description: "서울대병원",
            unlockCondition: "COMPLETE_seoul_jongno_changdeok"
        },
        {
            id: "seoul_jongno_cheonggyecheon",
            name: "수송동",
            guId: "seoul_jongno",
            center: [37.5710, 126.9780],
            zoom: 16,
            color: "#2E8B57",
            icon: "💧",
            levelCount: 4,
            description: "청계천 문화거리",
            unlockCondition: "COMPLETE_seoul_jongno_jongno1"
        }
    ],

    // 동 ID로 동 정보 가져오기
    getDong(dongId) {
        return this.dongs.find(dong => dong.id === dongId) || null;
    },

    // 구 ID로 동 목록 가져오기
    getDongsByGu(guId) {
        return this.dongs.filter(dong => dong.guId === guId);
    },

    // 잠금 해제된 동 목록 가져오기
    getUnlockedDongs(completedDongs = []) {
        return this.dongs.filter(dong => {
            if (dong.unlockCondition === "NONE") return true;
            if (dong.unlockCondition.startsWith("COMPLETE_")) {
                const requiredDong = dong.unlockCondition.replace("COMPLETE_", "");
                return completedDongs.includes(requiredDong);
            }
            return false;
        });
    }
};
