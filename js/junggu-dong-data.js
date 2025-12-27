// 서울 중구 15개 동 데이터
const JungguDongData = {
    dongs: [
        {
            id: "seoul_junggu_sogong",
            name: "소공동",
            guId: "seoul_junggu",
            center: [37.5650, 126.9810],
            zoom: 16,
            color: "#FF69B4",
            icon: "🏨",
            levelCount: 5,
            description: "명동교자와 롯데백화점",
            unlockCondition: "NONE" // 시작 동
        },
        {
            id: "seoul_junggu_myeongdong",
            name: "명동",
            guId: "seoul_junggu",
            center: [37.5636, 126.9869],
            zoom: 16,
            color: "#FF1493",
            icon: "🛍️",
            levelCount: 6,
            description: "명동 쇼핑거리",
            unlockCondition: "COMPLETE_seoul_junggu_sogong"
        },
        {
            id: "seoul_junggu_euljiro1",
            name: "을지로1가",
            guId: "seoul_junggu",
            center: [37.5661, 126.9818],
            zoom: 16,
            color: "#9370DB",
            icon: "🏢",
            levelCount: 4,
            description: "을지로입구역 금융가",
            unlockCondition: "COMPLETE_seoul_junggu_myeongdong"
        },
        {
            id: "seoul_junggu_euljiro2",
            name: "을지로2가",
            guId: "seoul_junggu",
            center: [37.5665, 126.9891],
            zoom: 16,
            color: "#8A2BE2",
            icon: "🏬",
            levelCount: 4,
            description: "을지로 골목 문화",
            unlockCondition: "COMPLETE_seoul_junggu_euljiro1"
        },
        {
            id: "seoul_junggu_euljiro3",
            name: "을지로3가",
            guId: "seoul_junggu",
            center: [37.5665, 126.9920],
            zoom: 16,
            color: "#4B0082",
            icon: "🍺",
            levelCount: 5,
            description: "노가리골목과 힙지로",
            unlockCondition: "COMPLETE_seoul_junggu_euljiro2"
        },
        {
            id: "seoul_junggu_chungmu1",
            name: "충무로1가",
            guId: "seoul_junggu",
            center: [37.5610, 126.9870],
            zoom: 16,
            color: "#FF6347",
            icon: "🎬",
            levelCount: 4,
            description: "충무로 영화의 거리",
            unlockCondition: "COMPLETE_seoul_junggu_myeongdong"
        },
        {
            id: "seoul_junggu_pildong",
            name: "필동",
            guId: "seoul_junggu",
            center: [37.5580, 126.9920],
            zoom: 16,
            color: "#DC143C",
            icon: "🏛️",
            levelCount: 3,
            description: "남산골 한옥마을",
            unlockCondition: "COMPLETE_seoul_junggu_chungmu1"
        },
        {
            id: "seoul_junggu_jangchung1",
            name: "장충동1가",
            guId: "seoul_junggu",
            center: [37.5617, 127.0067],
            zoom: 16,
            color: "#B22222",
            icon: "🦶",
            levelCount: 5,
            description: "장충동 족발골목",
            unlockCondition: "COMPLETE_seoul_junggu_pildong"
        },
        {
            id: "seoul_junggu_jangchung2",
            name: "장충동2가",
            guId: "seoul_junggu",
            center: [37.5590, 127.0040],
            zoom: 16,
            color: "#CD5C5C",
            icon: "⛰️",
            levelCount: 4,
            description: "남산 동쪽 자락",
            unlockCondition: "COMPLETE_seoul_junggu_jangchung1"
        },
        {
            id: "seoul_junggu_hoehyeon",
            name: "회현동",
            guId: "seoul_junggu",
            center: [37.5590, 126.9810],
            zoom: 16,
            color: "#F08080",
            icon: "🗼",
            levelCount: 4,
            description: "남산타워 입구",
            unlockCondition: "COMPLETE_seoul_junggu_chungmu1"
        },
        {
            id: "seoul_junggu_namsan",
            name: "남산동",
            guId: "seoul_junggu",
            center: [37.5545, 126.9870],
            zoom: 16,
            color: "#FA8072",
            icon: "🌲",
            levelCount: 4,
            description: "남산공원과 케이블카",
            unlockCondition: "COMPLETE_seoul_junggu_hoehyeon"
        },
        {
            id: "seoul_junggu_taepyeong1",
            name: "태평로1가",
            guId: "seoul_junggu",
            center: [37.5660, 126.9770],
            zoom: 16,
            color: "#4169E1",
            icon: "🏛️",
            levelCount: 5,
            description: "덕수궁과 시청앞 광장",
            unlockCondition: "NONE"
        },
        {
            id: "seoul_junggu_seosomun",
            name: "서소문동",
            guId: "seoul_junggu",
            center: [37.5620, 126.9725],
            zoom: 16,
            color: "#1E90FF",
            icon: "⛪",
            levelCount: 3,
            description: "서소문 역사공원",
            unlockCondition: "COMPLETE_seoul_junggu_taepyeong1"
        },
        {
            id: "seoul_junggu_sindang",
            name: "신당동",
            guId: "seoul_junggu",
            center: [37.5630, 127.0115],
            zoom: 16,
            color: "#00CED1",
            icon: "🍜",
            levelCount: 5,
            description: "신당동 떡볶이 타운",
            unlockCondition: "COMPLETE_seoul_junggu_jangchung1"
        },
        {
            id: "seoul_junggu_gwanghee",
            name: "광희동",
            guId: "seoul_junggu",
            center: [37.5650, 127.0080],
            zoom: 16,
            color: "#20B2AA",
            icon: "🧥",
            levelCount: 4,
            description: "패션타운과 광희문",
            unlockCondition: "COMPLETE_seoul_junggu_sindang"
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
