// 인천 중구 동(洞) 데이터 - 정확한 좌표 기준
const IncheonJungguDongData = {
    dongs: [
        {
            id: "incheon_junggu_chinatown",
            name: "차이나타운",
            guId: "incheon_junggu",
            center: [37.4737, 126.6289], // 차이나타운 제1패루 (중화가)
            zoom: 16,
            color: "#FF4444",
            icon: "🏮",
            levelCount: 1,
            description: "인천 개항 역사의 중심, 짜장면 발상지",
            unlockCondition: "NONE"
        },
        {
            id: "incheon_junggu_sinpo",
            name: "신포동",
            guId: "incheon_junggu",
            center: [37.4690, 126.6252], // 신포동 행정복지센터
            zoom: 16,
            color: "#FF6B6B",
            icon: "🍗",
            levelCount: 1,
            description: "신포국제시장, 닭강정 골목",
            unlockCondition: "COMPLETE_incheon_junggu_chinatown"
        },
        {
            id: "incheon_junggu_bukseong",
            name: "북성동",
            guId: "incheon_junggu",
            center: [37.4752, 126.6185], // 북성동 (개항동 행정복지센터)
            zoom: 16,
            color: "#4ECDC4",
            icon: "🏛️",
            levelCount: 1,
            description: "근대 역사 거리, 개항장",
            unlockCondition: "COMPLETE_incheon_junggu_sinpo"
        },
        {
            id: "incheon_junggu_songwol",
            name: "송월동",
            guId: "incheon_junggu",
            center: [37.4762, 126.6145], // 송월동 동화마을
            zoom: 16,
            color: "#45B7D1",
            icon: "🎨",
            levelCount: 1,
            description: "송월동 동화마을, 포토존",
            unlockCondition: "COMPLETE_incheon_junggu_bukseong"
        },
        {
            id: "incheon_junggu_jayu",
            name: "자유공원",
            guId: "incheon_junggu",
            center: [37.4780, 126.6220], // 자유공원
            zoom: 16,
            color: "#96CEB4",
            icon: "🗽",
            levelCount: 1,
            description: "맥아더장군 동상, 인천 전경",
            unlockCondition: "COMPLETE_incheon_junggu_songwol"
        },
        {
            id: "incheon_junggu_wolmi",
            name: "월미도",
            guId: "incheon_junggu",
            center: [37.4744, 126.5978], // 월미도
            zoom: 15,
            color: "#DDA0DD",
            icon: "🎡",
            levelCount: 1,
            description: "놀이공원과 횟집거리",
            unlockCondition: "COMPLETE_incheon_junggu_jayu"
        },
        {
            id: "incheon_junggu_yeongjong",
            name: "영종도",
            guId: "incheon_junggu",
            center: [37.5001, 126.5358], // 영종도
            zoom: 13,
            color: "#87CEEB",
            icon: "✈️",
            levelCount: 1,
            description: "인천국제공항, 을왕리해수욕장",
            unlockCondition: "COMPLETE_incheon_junggu_wolmi"
        },
        {
            id: "incheon_junggu_unseo",
            name: "운서동",
            guId: "incheon_junggu",
            center: [37.4997, 126.4865], // 운서동 (공항 근처)
            zoom: 14,
            color: "#98D8C8",
            icon: "🛫",
            levelCount: 1,
            description: "공항철도, 스카이72 골프장",
            unlockCondition: "COMPLETE_incheon_junggu_yeongjong"
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
