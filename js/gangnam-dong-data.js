// 강남구 22개 동 데이터
const GangnamDongData = {
    dongs: [
        {
            id: "seoul_gangnam_yeoksam1",
            name: "역삼1동",
            guId: "seoul_gangnam",
            center: [37.4987, 127.0365],  // 역삼1동 행정복지센터 기준
            zoom: 15,
            color: "#FF69B4",
            icon: "🏢",
            levelCount: 5,
            description: "테헤란로 IT 중심지",
            unlockCondition: "NONE" // 시작 동
        },
        {
            id: "seoul_gangnam_yeoksam2",
            name: "역삼2동",
            guId: "seoul_gangnam",
            center: [37.4953, 127.0467],
            zoom: 15,
            color: "#FF1493",
            icon: "🍜",
            levelCount: 4,
            description: "강남역 먹자골목",
            unlockCondition: "COMPLETE_seoul_gangnam_yeoksam1"
        },
        {
            id: "seoul_gangnam_samsung1",
            name: "삼성1동",
            guId: "seoul_gangnam",
            center: [37.5072, 127.0553],  // 코엑스 좌표 기준
            zoom: 15,
            color: "#4682B4",
            icon: "🏢",
            levelCount: 4,
            description: "코엑스와 삼성동",
            unlockCondition: "COMPLETE_seoul_gangnam_yeoksam2"
        },
        {
            id: "seoul_gangnam_samsung2",
            name: "삼성2동",
            guId: "seoul_gangnam",
            center: [37.5059, 127.0553],
            zoom: 15,
            color: "#1E90FF",
            icon: "🏬",
            levelCount: 3,
            description: "봉은사와 현대백화점",
            unlockCondition: "COMPLETE_seoul_gangnam_samsung1"
        },
        {
            id: "seoul_gangnam_daechi1",
            name: "대치1동",
            guId: "seoul_gangnam",
            center: [37.4944, 127.0619],
            zoom: 15,
            color: "#32CD32",
            icon: "📚",
            levelCount: 4,
            description: "학원가의 중심",
            unlockCondition: "COMPLETE_seoul_gangnam_samsung2"
        },
        {
            id: "seoul_gangnam_daechi2",
            name: "대치2동",
            guId: "seoul_gangnam",
            center: [37.4896, 127.0542],
            zoom: 15,
            color: "#90EE90",
            icon: "🎓",
            levelCount: 3,
            description: "대치동 학원가",
            unlockCondition: "COMPLETE_seoul_gangnam_daechi1"
        },
        {
            id: "seoul_gangnam_daechi4",
            name: "대치4동",
            guId: "seoul_gangnam",
            center: [37.4997, 127.0729],
            zoom: 15,
            color: "#98FB98",
            icon: "🏫",
            levelCount: 3,
            description: "은마아파트 단지",
            unlockCondition: "COMPLETE_seoul_gangnam_daechi2"
        },
        {
            id: "seoul_gangnam_cheongdam",
            name: "청담동",
            guId: "seoul_gangnam",
            center: [37.5205, 127.0471],  // 청담동 명품거리 기준
            zoom: 15,
            color: "#FFD700",
            icon: "💎",
            levelCount: 5,
            description: "명품 거리와 갤러리",
            unlockCondition: "COMPLETE_seoul_gangnam_samsung1"
        },
        {
            id: "seoul_gangnam_apgujeong",
            name: "압구정동",
            guId: "seoul_gangnam",
            center: [37.5274, 127.0286],
            zoom: 15,
            color: "#FF69B4",
            icon: "👗",
            levelCount: 5,
            description: "로데오거리 패션",
            unlockCondition: "COMPLETE_seoul_gangnam_cheongdam"
        },
        {
            id: "seoul_gangnam_sinsa",
            name: "신사동",
            guId: "seoul_gangnam",
            center: [37.5175, 127.0188],  // 가로수길 기준
            zoom: 15,
            color: "#DDA0DD",
            icon: "🌳",
            levelCount: 5,
            description: "가로수길 카페거리",
            unlockCondition: "COMPLETE_seoul_gangnam_apgujeong"
        },
        {
            id: "seoul_gangnam_nonhyeon1",
            name: "논현1동",
            guId: "seoul_gangnam",
            center: [37.5104, 127.0221],
            zoom: 15,
            color: "#F0E68C",
            icon: "🍽️",
            levelCount: 4,
            description: "논현동 맛집거리",
            unlockCondition: "COMPLETE_seoul_gangnam_sinsa"
        },
        {
            id: "seoul_gangnam_nonhyeon2",
            name: "논현2동",
            guId: "seoul_gangnam",
            center: [37.5063, 127.0307],
            zoom: 15,
            color: "#FAFAD2",
            icon: "🏘️",
            levelCount: 3,
            description: "학동역 주변",
            unlockCondition: "COMPLETE_seoul_gangnam_nonhyeon1"
        },
        {
            id: "seoul_gangnam_seocho",
            name: "서초동",
            guId: "seoul_gangnam",
            center: [37.4838, 127.0145],
            zoom: 15,
            color: "#20B2AA",
            icon: "⚖️",
            levelCount: 4,
            description: "법원과 검찰청",
            unlockCondition: "COMPLETE_seoul_gangnam_nonhyeon2"
        },
        {
            id: "seoul_gangnam_banpo1",
            name: "반포1동",
            guId: "seoul_gangnam",
            center: [37.5040, 127.0031],
            zoom: 15,
            color: "#87CEEB",
            icon: "🌉",
            levelCount: 3,
            description: "반포한강공원",
            unlockCondition: "COMPLETE_seoul_gangnam_seocho"
        },
        {
            id: "seoul_gangnam_banpo2",
            name: "반포2동",
            guId: "seoul_gangnam",
            center: [37.4974, 127.0091],
            zoom: 15,
            color: "#B0E0E6",
            icon: "🏞️",
            levelCount: 3,
            description: "세빛섬과 한강",
            unlockCondition: "COMPLETE_seoul_gangnam_banpo1"
        },
        {
            id: "seoul_gangnam_banpo3",
            name: "반포3동",
            guId: "seoul_gangnam",
            center: [37.4902, 127.0132],
            zoom: 15,
            color: "#ADD8E6",
            icon: "🏡",
            levelCount: 3,
            description: "반포 주공아파트",
            unlockCondition: "COMPLETE_seoul_gangnam_banpo2"
        },
        {
            id: "seoul_gangnam_banpo4",
            name: "반포4동",
            guId: "seoul_gangnam",
            center: [37.4987, 126.9943],
            zoom: 15,
            color: "#AFEEEE",
            icon: "🌸",
            levelCount: 3,
            description: "반포본동",
            unlockCondition: "COMPLETE_seoul_gangnam_banpo3"
        },
        {
            id: "seoul_gangnam_jamwon",
            name: "잠원동",
            guId: "seoul_gangnam",
            center: [37.5149, 127.0112],
            zoom: 15,
            color: "#FFB6C1",
            icon: "🌺",
            levelCount: 3,
            description: "신사역 주변",
            unlockCondition: "COMPLETE_seoul_gangnam_sinsa"
        },
        {
            id: "seoul_gangnam_ilwon1",
            name: "일원1동",
            guId: "seoul_gangnam",
            center: [37.4844, 127.0838],
            zoom: 15,
            color: "#FFA07A",
            icon: "🏥",
            levelCount: 3,
            description: "삼성서울병원",
            unlockCondition: "COMPLETE_seoul_gangnam_daechi4"
        },
        {
            id: "seoul_gangnam_ilwon2",
            name: "일원2동",
            guId: "seoul_gangnam",
            center: [37.4901, 127.0895],
            zoom: 15,
            color: "#FF7F50",
            icon: "🏘️",
            levelCount: 3,
            description: "일원동 주거지",
            unlockCondition: "COMPLETE_seoul_gangnam_ilwon1"
        },
        {
            id: "seoul_gangnam_ilwonbon",
            name: "일원본동",
            guId: "seoul_gangnam",
            center: [37.4785, 127.0875],
            zoom: 15,
            color: "#FA8072",
            icon: "🌳",
            levelCount: 3,
            description: "일원 본동",
            unlockCondition: "COMPLETE_seoul_gangnam_ilwon2"
        },
        {
            id: "seoul_gangnam_suseo",
            name: "수서동",
            guId: "seoul_gangnam",
            center: [37.4869, 127.1002],
            zoom: 15,
            color: "#E9967A",
            icon: "🚄",
            levelCount: 4,
            description: "수서역 SRT",
            unlockCondition: "COMPLETE_seoul_gangnam_ilwonbon"
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
