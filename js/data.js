// CSV 데이터를 JavaScript 객체로 변환

const GameData = {
    levels: [
        { id: 1, name: "서울 중구 태평로1가", type: "SCORE", target: 1000, moves: 15, reward: "IT_001", isAd: false },
        { id: 2, name: "서울 중구 소공동", type: "SCORE", target: 1500, moves: 20, reward: "IT_002", isAd: false },
        { id: 3, name: "서울 중구 명동", type: "SCORE", target: 2000, moves: 25, reward: "IT_003", isAd: false },
        { id: 4, name: "서울 중구 을지로", type: "SCORE", target: 2500, moves: 20, reward: "IT_004", isAd: false },
        { id: 5, name: "서울 중구 장충동", type: "SCORE", target: 3000, moves: 25, reward: "IT_005", isAd: false },
        { id: 6, name: "서울 종로구 인사동", type: "SCORE", target: 3500, moves: 20, reward: "IT_006", isAd: false },
        { id: 7, name: "광장시장", type: "SCORE", target: 4000, moves: 30, reward: "IT_100", isAd: true },
        { id: 8, name: "서울 종로구 삼청동", type: "SCORE", target: 4500, moves: 25, reward: "IT_007", isAd: false },
        { id: 9, name: "서울 종로구 평창동", type: "SCORE", target: 5000, moves: 30, reward: "IT_008", isAd: false },
        { id: 10, name: "남산 예장동", type: "SCORE", target: 6000, moves: 35, reward: "IT_999", isAd: false }
    ],

    items: {
        "IT_001": { name: "시청앞 꿀떡", rarity: "C", effect: "HP_HEAL", value: 10, desc: "말랑말랑해서 먹으면 기운이 난다" },
        "IT_002": { name: "명동 호떡", rarity: "C", effect: "GOLD", value: 50, desc: "겨울엔 역시 따끈한 호떡" },
        "IT_003": { name: "명동 김밥", rarity: "B", effect: "ATK", value: 5, desc: "든든한 한 끼" },
        "IT_004": { name: "을지로 노가리", rarity: "B", effect: "ATK", value: 5, desc: "씹을수록 고소한 맛" },
        "IT_005": { name: "장충동 왕족발", rarity: "A", effect: "SKILL_UP", value: 10, desc: "콜라겐 덩어리" },
        "IT_006": { name: "인사동 전통차", rarity: "B", effect: "COOLDOWN", value: -5, desc: "마음이 차분해진다" },
        "IT_007": { name: "삼청동 디저트", rarity: "B", effect: "GOLD", value: 100, desc: "힙한 분위기의 달콤함" },
        "IT_008": { name: "평창동 막걸리", rarity: "A", effect: "HP_MAX", value: 50, desc: "자연의 맛이 그대로" },
        "IT_100": { name: "광장시장 빈대떡", rarity: "SP", effect: "MP_INSTANT", value: 50, desc: "전통의 맛. 먹으면 포인트가 된다" },
        "IT_999": { name: "남산 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "남산을 정복한 자의 증표" }
    },

    characters: [
        { id: "CH_10M", name: "개구쟁이 스케이터", age: "10", gender: "M", skill: "EXP_BOOST", value: 5, desc: "경험치 획득량 +5%" },
        { id: "CH_10F", name: "떡볶이 요정", age: "10", gender: "F", skill: "EXP_BOOST", value: 5, desc: "경험치 획득량 +5%" },
        { id: "CH_20M", name: "배낭 여행가", age: "20", gender: "M", skill: "CAFE_BONUS", value: 10, desc: "카페/디저트 스테이지 점수 +10%" },
        { id: "CH_20F", name: "카페 투어리스트", age: "20", gender: "F", skill: "CAFE_BONUS", value: 10, desc: "카페/디저트 스테이지 점수 +10%" },
        { id: "CH_30M", name: "넥타이 부대", age: "30", gender: "M", skill: "GOLD_BOOST", value: 5, desc: "골드 획득량 +5%" },
        { id: "CH_30F", name: "워라밸 요정", age: "30", gender: "F", skill: "GOLD_BOOST", value: 5, desc: "골드 획득량 +5%" },
        { id: "CH_40M", name: "아웃도어 형님", age: "40", gender: "M", skill: "STAMINA_REGEN", value: 1, desc: "체력 회복 속도 증가" },
        { id: "CH_40F", name: "파워 워킹 누님", age: "40", gender: "F", skill: "STAMINA_REGEN", value: 1, desc: "체력 회복 속도 증가" },
        { id: "CH_60M", name: "낭만 가객", age: "60", gender: "M", skill: "ITEM_DROP", value: 5, desc: "아이템 드롭 확률 +5%" },
        { id: "CH_60F", name: "손맛 장인", age: "60", gender: "F", skill: "ITEM_DROP", value: 5, desc: "아이템 드롭 확률 +5%" }
    ],

    boosters: {
        "HAMMER": { name: "망치", icon: "🔨", desc: "블록 1개를 제거합니다", effect: "REMOVE_ONE" },
        "BOMB": { name: "폭탄", icon: "💣", desc: "3x3 영역을 폭파합니다", effect: "REMOVE_AREA" },
        "RAINBOW": { name: "레인보우", icon: "🌈", desc: "같은 색 블록을 모두 제거합니다", effect: "REMOVE_COLOR" }
    },

    craftingRecipes: [
        {
            id: "RECIPE_HAMMER",
            name: "망치",
            icon: "🔨",
            desc: "블록 1개를 제거합니다",
            materials: [
                { rarity: "C", count: 3 }
            ],
            result: { type: "BOOSTER", id: "HAMMER", count: 1 }
        },
        {
            id: "RECIPE_BOMB",
            name: "폭탄",
            icon: "💣",
            desc: "3x3 영역을 폭파합니다",
            materials: [
                { rarity: "B", count: 2 },
                { rarity: "A", count: 1 }
            ],
            result: { type: "BOOSTER", id: "BOMB", count: 1 }
        },
        {
            id: "RECIPE_RAINBOW",
            name: "레인보우",
            icon: "🌈",
            desc: "같은 색 블록을 모두 제거합니다",
            materials: [
                { rarity: "A", count: 2 },
                { rarity: "SP", count: 1 }
            ],
            result: { type: "BOOSTER", id: "RAINBOW", count: 1 }
        }
    ]
};
