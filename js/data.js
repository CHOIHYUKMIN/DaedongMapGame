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
    ],

    // 동네별 맛집 아이템 풀
    restaurantPools: {
        1: { // 태평로1가 (시청)
            name: "서울 중구 태평로1가",
            restaurants: [
                { itemId: "IT_001", name: "시청앞 꿀떡", restaurant: "명동 할머니 꿀떡", rarity: "C" },
                { itemId: "IT_001_B", name: "덕수궁 찰떡", restaurant: "덕수궁 떡집", rarity: "B" },
                { itemId: "IT_001_C", name: "시청 김밥", restaurant: "시청역 김밥천국", rarity: "C" }
            ]
        },
        2: { // 소공동
            name: "서울 중구 소공동",
            restaurants: [
                { itemId: "IT_002", name: "명동 호떡", restaurant: "씨호떡", rarity: "C" },
                { itemId: "IT_002_B", name: "소공동 만두", restaurant: "명동교자", rarity: "B" },
                { itemId: "IT_002_C", name: "칼국수", restaurant: "명동 할머니 국수", rarity: "C" }
            ]
        },
        3: { // 명동
            name: "서울 중구 명동",
            restaurants: [
                { itemId: "IT_003", name: "명동 김밥", restaurant: "유가네 김밥", rarity: "B" },
                { itemId: "IT_003_B", name: "냉면", restaurant: "고미옥 냉면", rarity: "A" },
                { itemId: "IT_003_C", name: "손만두", restaurant: "동궁 손만두", rarity: "B" }
            ]
        },
        4: { // 을지로
            name: "서울 중구 을지로",
            restaurants: [
                { itemId: "IT_004", name: "을지로 노가리", restaurant: "노가리골목", rarity: "B" },
                { itemId: "IT_004_B", name: "평양냉면", restaurant: "을지면옥", rarity: "A" },
                { itemId: "IT_004_C", name: "곱창", restaurant: "을지로 곱창집", rarity: "B" }
            ]
        },
        5: { // 장충동
            name: "서울 중구 장충동",
            restaurants: [
                { itemId: "IT_005", name: "장충동 왕족발", restaurant: "장충동족발", rarity: "A" },
                { itemId: "IT_005_B", name: "순두부", restaurant: "북창동 순두부", rarity: "B" },
                { itemId: "IT_005_C", name: "평양냉면", restaurant: "평양면옥", rarity: "A" }
            ]
        },
        6: { // 인사동
            name: "서울 종로구 인사동",
            restaurants: [
                { itemId: "IT_006", name: "인사동 전통차", restaurant: "인사동 찻집", rarity: "B" },
                { itemId: "IT_006_B", name: "비빔밥", restaurant: "전주비빔밥", rarity: "A" },
                { itemId: "IT_006_C", name: "떡볶이", restaurant: "인사동 떡볶이", rarity: "C" }
            ]
        },
        7: { // 광장시장
            name: "광장시장",
            restaurants: [
                { itemId: "IT_100", name: "광장시장 빈대떡", restaurant: "광장시장 빈대떡", rarity: "SP" },
                { itemId: "IT_100_B", name: "마약김밥", restaurant: "마약김밥", rarity: "B" },
                { itemId: "IT_100_C", name: "육회", restaurant: "육회집", rarity: "A" }
            ]
        },
        8: { // 삼청동
            name: "서울 종로구 삼청동",
            restaurants: [
                { itemId: "IT_007", name: "삼청동 디저트", restaurant: "삼청동 카페", rarity: "B" },
                { itemId: "IT_007_B", name: "수제비", restaurant: "삼청동 수제비", rarity: "B" },
                { itemId: "IT_007_C", name: "한정식", restaurant: "삼청각", rarity: "A" }
            ]
        },
        9: { // 평창동
            name: "서울 종로구 평창동",
            restaurants: [
                { itemId: "IT_008", name: "평창동 막걸리", restaurant: "평창동 막걸리집", rarity: "A" },
                { itemId: "IT_008_B", name: "삼계탕", restaurant: "토속촌", rarity: "A" },
                { itemId: "IT_008_C", name: "한정식", restaurant: "평창동 한정식", rarity: "B" }
            ]
        },
        10: { // 남산
            name: "남산 예장동",
            restaurants: [
                { itemId: "IT_999", name: "남산 증표", restaurant: "남산타워", rarity: "Legendary" },
                { itemId: "IT_999_B", name: "돈까스", restaurant: "남산 돈까스", rarity: "B" },
                { itemId: "IT_999_C", name: "케이블카 도시락", restaurant: "남산 케이블카", rarity: "A" }
            ]
        }
    }
};
