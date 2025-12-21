// CSV 데이터를 JavaScript 객체로 변환

const GameData = {
    levels: [
        {
            id: 1,
            name: "서울 중구 태평로1가",
            type: "SCORE",
            target: 1000,
            moves: 15,
            reward: "IT_001",
            isAd: false,
            blockTheme: {
                name: "관공서 지구",
                emojis: ["🏛️", "📋", "📊", "💼", "🏢"]
            }
        },
        {
            id: 2,
            name: "서울 중구 소공동",
            type: "SCORE",
            target: 1500,
            moves: 20,
            reward: "IT_002",
            isAd: false,
            blockTheme: {
                name: "비즈니스 거리",
                emojis: ["💼", "🏢", "☕", "📱", "💻"]
            }
        },
        {
            id: 3,
            name: "서울 중구 명동",
            type: "SCORE",
            target: 2000,
            moves: 25,
            reward: "IT_003",
            isAd: false,
            blockTheme: {
                name: "쇼핑 천국",
                emojis: ["👗", "💄", "🛍️", "💍", "👜"]
            }
        },
        {
            id: 4,
            name: "서울 중구 을지로",
            type: "SCORE",
            target: 2500,
            moves: 20,
            reward: "IT_004",
            isAd: false,
            blockTheme: {
                name: "공구 거리",
                emojis: ["🔧", "🔨", "⚙️", "🖨️", "📐"]
            }
        },
        {
            id: 5,
            name: "서울 중구 장충동",
            type: "SCORE",
            target: 3000,
            moves: 25,
            reward: "IT_005",
            isAd: false,
            blockTheme: {
                name: "전통 음식",
                emojis: ["🍖", "🥘", "🍲", "🥟", "🍜"]
            }
        },
        {
            id: 6,
            name: "서울 종로구 인사동",
            type: "SCORE",
            target: 3500,
            moves: 20,
            reward: "IT_006",
            isAd: false,
            blockTheme: {
                name: "전통 문화",
                emojis: ["🏮", "🎭", "🖼️", "🎨", "🪔"]
            }
        },
        {
            id: 7,
            name: "광장시장",
            type: "SCORE",
            target: 4000,
            moves: 30,
            reward: "IT_100",
            isAd: true,
            blockTheme: {
                name: "전통 시장",
                emojis: ["🍱", "🥙", "🍢", "🍡", "🧈"]
            }
        },
        {
            id: 8,
            name: "서울 종로구 삼청동",
            type: "SCORE",
            target: 4500,
            moves: 25,
            reward: "IT_007",
            isAd: false,
            blockTheme: {
                name: "갤러리 거리",
                emojis: ["☕", "🎨", "📚", "🍰", "🖼️"]
            }
        },
        {
            id: 9,
            name: "서울 종로구 평창동",
            type: "SCORE",
            target: 5000,
            moves: 30,
            reward: "IT_008",
            isAd: false,
            blockTheme: {
                name: "한옥 마을",
                emojis: ["🏡", "🌲", "🍃", "🏔️", "🌸"]
            }
        },
        {
            id: 10,
            name: "남산 예장동",
            type: "SCORE",
            target: 6000,
            moves: 35,
            reward: "IT_999",
            isAd: false,
            blockTheme: {
                name: "남산 타워",
                emojis: ["🗼", "📸", "🎡", "🌆", "🏰"]
            }
        },
        // 부산 레벨 (11-18)
        {
            id: 11,
            name: "부산 해운대구",
            regionName: "부산 해운대 해수욕장",
            type: "SCORE",
            target: 3000,
            moves: 25,
            reward: "IT_BS_001",
            isAd: false,
            blockTheme: {
                name: "해운대 해변",
                emojis: ["🏖️", "🌊", "☀️", "🏄", "🐚"]
            }
        },
        {
            id: 12,
            name: "부산 중구 자갈치",
            regionName: "부산 자갈치시장",
            type: "SCORE",
            target: 3500,
            moves: 20,
            reward: "IT_BS_002",
            isAd: false,
            blockTheme: {
                name: "자갈치 시장",
                emojis: ["🐟", "🦀", "🦐", "🐙", "🦑"]
            }
        },
        {
            id: 13,
            name: "부산 동래구",
            regionName: "부산 동래온천",
            type: "SCORE",
            target: 4000,
            moves: 25,
            reward: "IT_BS_003",
            isAd: false,
            blockTheme: {
                name: "동래 전통",
                emojis: ["♨️", "🍜", "🥟", "🏮", "🎭"]
            }
        },
        {
            id: 14,
            name: "부산 서면",
            regionName: "부산 서면 먹자골목",
            type: "SCORE",
            target: 4500,
            moves: 30,
            reward: "IT_BS_004",
            isAd: false,
            blockTheme: {
                name: "서면 번화가",
                emojis: ["🍖", "🍺", "🌮", "🍕", "🍗"]
            }
        },
        {
            id: 15,
            name: "부산 광안리",
            regionName: "부산 광안리 해변",
            type: "SCORE",
            target: 5000,
            moves: 25,
            reward: "IT_BS_005",
            isAd: false,
            blockTheme: {
                name: "광안대교",
                emojis: ["🌉", "🌃", "🎆", "☕", "🍰"]
            }
        },
        {
            id: 16,
            name: "부산 감천문화마을",
            regionName: "부산 감천문화마을",
            type: "SCORE",
            target: 5500,
            moves: 30,
            reward: "IT_BS_006",
            isAd: false,
            blockTheme: {
                name: "예술 마을",
                emojis: ["🎨", "🏘️", "📸", "🌈", "🎭"]
            }
        },
        {
            id: 17,
            name: "부산 태종대",
            regionName: "부산 태종대 전망대",
            type: "SCORE",
            target: 6000,
            moves: 30,
            reward: "IT_BS_007",
            isAd: false,
            blockTheme: {
                name: "절벽 바다",
                emojis: ["🏔️", "🌊", "🚢", "🦅", "🌲"]
            }
        },
        {
            id: 18,
            name: "부산 용궁사",
            regionName: "부산 해동용궁사",
            type: "SCORE",
            target: 6500,
            moves: 35,
            reward: "IT_BS_008",
            isAd: false,
            blockTheme: {
                name: "바다 사원",
                emojis: ["🛕", "🌊", "🐉", "🙏", "⛩️"]
            }
        }
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
        "IT_999": { name: "남산 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "남산을 정복한 자의 증표" },

        // 부산 아이템 (IT_BS_001 ~)
        "IT_BS_001": { name: "해운대 회", rarity: "B", effect: "HP_HEAL", value: 15, desc: "신선한 바다의 맛" },
        "IT_BS_002": { name: "자갈치 오징어", rarity: "B", effect: "ATK", value: 5, desc: "쫄깃한 식감" },
        "IT_BS_003": { name: "동래파전", rarity: "A", effect: "GOLD", value: 150, desc: "비 오는 날엔 파전" },
        "IT_BS_004": { name: "돼지국밥", rarity: "A", effect: "HP_MAX", value: 60, desc: "부산의 소울푸드" },
        "IT_BS_005": { name: "밀면", rarity: "B", effect: "COOLDOWN", value: -5, desc: "시원한 육수" },
        "IT_BS_006": { name: "씨앗호떡", rarity: "C", effect: "GOLD", value: 80, desc: "달콤 바삭한 간식" },
        "IT_BS_007": { name: "대구탕", rarity: "A", effect: "SKILL_UP", value: 12, desc: "시원한 해장국" },
        "IT_BS_008": { name: "부산 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "바다 도시를 정복한 증표" }
    },

    characters: [
        { id: "CH_10M", name: "개구쟁이 스케이터", age: "10", gender: "M", skill: "EXP_BOOST", value: 5, desc: "경험치 획득량 +5%", image: "images/characters/ch_10m.png" },
        { id: "CH_10F", name: "떡볶이 요정", age: "10", gender: "F", skill: "EXP_BOOST", value: 5, desc: "경험치 획득량 +5%", image: "images/characters/ch_10f.png" },
        { id: "CH_20M", name: "배낭 여행가", age: "20", gender: "M", skill: "CAFE_BONUS", value: 10, desc: "카페/디저트 스테이지 점수 +10%", image: "images/characters/ch_20m.png" },
        { id: "CH_20F", name: "카페 투어리스트", age: "20", gender: "F", skill: "CAFE_BONUS", value: 10, desc: "카페/디저트 스테이지 점수 +10%", image: "images/characters/ch_20f.png" },
        { id: "CH_30M", name: "넥타이 부대", age: "30", gender: "M", skill: "GOLD_BOOST", value: 5, desc: "골드 획득량 +5%", image: "images/characters/ch_30m.png" },
        { id: "CH_30F", name: "워라밸 요정", age: "30", gender: "F", skill: "GOLD_BOOST", value: 5, desc: "골드 획득량 +5%", image: "images/characters/ch_30f.png" },
        { id: "CH_40M", name: "아웃도어 형님", age: "40", gender: "M", skill: "STAMINA_REGEN", value: 1, desc: "체력 회복 속도 증가", image: "images/characters/ch_40m.png" },
        { id: "CH_40F", name: "파워 워킹 누님", age: "40", gender: "F", skill: "STAMINA_REGEN", value: 1, desc: "체력 회복 속도 증가", image: "images/characters/ch_40f.png" },
        { id: "CH_60M", name: "낭만 가객", age: "60", gender: "M", skill: "ITEM_DROP", value: 5, desc: "아이템 드롭 확률 +5%", image: "images/characters/ch_60m.png" },
        { id: "CH_60F", name: "손맛 장인", age: "60", gender: "F", skill: "ITEM_DROP", value: 5, desc: "아이템 드롭 확률 +5%", image: "images/characters/ch_60f.png" }
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
                {
                    itemId: "IT_001",
                    name: "시청앞 꿀떡",
                    restaurant: "명동 할머니 꿀떡",
                    rarity: "C",
                    address: "서울 중구 명동길 12",
                    phone: "02-1234-5678",
                    category: "간식/디저트",
                    description: "명동 골목에서 40년간 이어온 전통 꿀떡 맛집. 쫄깃한 떡에 달콤한 꿀이 일품입니다.",
                    naverPlaceId: "0000001",
                    kakaoPlaceId: "1000001"
                },
                {
                    itemId: "IT_001_B",
                    name: "덕수궁 찰떡",
                    restaurant: "덕수궁 떡집",
                    rarity: "B",
                    address: "서울 중구 세종대로 99",
                    phone: "02-2222-3333",
                    category: "간식/디저트",
                    description: "덕수궁 돌담길 옆의 전통 떡집. 계절마다 새로운 떡을 선보입니다.",
                    naverPlaceId: "0000002",
                    kakaoPlaceId: "1000002"
                },
                {
                    itemId: "IT_001_C",
                    name: "시청 김밥",
                    restaurant: "시청역 김밥천국",
                    rarity: "C",
                    address: "서울 중구 서소문로 48",
                    phone: "02-3333-4444",
                    category: "분식",
                    description: "직장인들의 사랑방. 저렴하고 푸짐한 김밥과 라면이 인기입니다.",
                    naverPlaceId: "0000003",
                    kakaoPlaceId: "1000003"
                }
            ]
        },
        2: { // 소공동
            name: "서울 중구 소공동",
            restaurants: [
                {
                    itemId: "IT_002",
                    name: "명동 호떡",
                    restaurant: "씨호떡",
                    rarity: "C",
                    address: "서울 중구 명동8길 16",
                    phone: "02-318-4242",
                    category: "간식/디저트",
                    description: "명동의 유명 호떡집. 겨울이면 긴 줄이 늘 서 있는 곳입니다.",
                    naverPlaceId: "11862478",
                    kakaoPlaceId: "18752033"
                },
                {
                    itemId: "IT_002_B",
                    name: "소공동 만두",
                    restaurant: "명동교자",
                    rarity: "B",
                    address: "서울 중구 명동10길 29",
                    phone: "02-776-5348",
                    category: "한식",
                    description: "1966년부터 이어온 원조 칼국수 맛집. 고소한 육수와 쫄깃한 면이 일품입니다.",
                    naverPlaceId: "11623447",
                    kakaoPlaceId: "8292127"
                },
                {
                    itemId: "IT_002_C",
                    name: "칼국수",
                    restaurant: "명동 할머니 국수",
                    rarity: "C",
                    address: "서울 중구 명동길 38",
                    phone: "02-777-8888",
                    category: "한식",
                    description: "할머니의 손맛이 느껴지는 칼국수집. 비오는 날이면 생각나는 맛입니다.",
                    naverPlaceId: "0000006",
                    kakaoPlaceId: "1000006"
                }
            ]
        },
        3: { // 명동
            name: "서울 중구 명동",
            restaurants: [
                {
                    itemId: "IT_003",
                    name: "명동 김밥",
                    restaurant: "유가네 김밥",
                    rarity: "B",
                    address: "서울 중구 명동길 45",
                    phone: "02-778-9999",
                    category: "분식",
                    description: "재료를 아끼지 않는 푸짐한 김밥. 명동 쇼핑 중 한 끼 식사로 제격입니다.",
                    naverPlaceId: "0000007",
                    kakaoPlaceId: "1000007"
                },
                {
                    itemId: "IT_003_B",
                    name: "냉면",
                    restaurant: "고미옥 냉면",
                    rarity: "A",
                    address: "서울 중구 명동8길 28-1",
                    phone: "02-753-2771",
                    category: "한식",
                    description: "경기도 시흥에서 북한 평양냉면집으로 시작한 원조집. 시원한 육수가 일품입니다.",
                    naverPlaceId: "12851684",
                    kakaoPlaceId: "513255431"
                },
                {
                    itemId: "IT_003_C",
                    name: "손만두",
                    restaurant: "동궁 손만두",
                    rarity: "B",
                    address: "서울 중구 명동길 52",
                    phone: "02-779-3333",
                    category: "한식",
                    description: "매일 아침 직접 빚는 손만두. 고기 육즙이 가득한 만두가 별미입니다.",
                    naverPlaceId: "0000009",
                    kakaoPlaceId: "1000009"
                }
            ]
        },
        4: { // 을지로
            name: "서울 중구 을지로",
            restaurants: [
                {
                    itemId: "IT_004",
                    name: "을지로 노가리",
                    restaurant: "노가리골목",
                    rarity: "B",
                    address: "서울 중구 을지로3가 299-1",
                    phone: "02-2266-9999",
                    category: "포차/주점",
                    description: "을지로 골목의 노가리 포차. 직장인들의 퇴근 후 단골 명소입니다.",
                    naverPlaceId: "1100000010",
                    kakaoPlaceId: "2100000010"
                },
                {
                    itemId: "IT_004_B",
                    name: "평양냉면",
                    restaurant: "을지면옥",
                    rarity: "A",
                    address: "서울 중구 을지로3가 299-10",
                    phone: "02-2267-7784",
                    category: "한식",
                    description: "1960년대부터 이어온 평양냉면 전문점. 깔끔한 육수가 일품입니다.",
                    naverPlaceId: "1100000011",
                    kakaoPlaceId: "2100000011"
                },
                {
                    itemId: "IT_004_C",
                    name: "곱창",
                    restaurant: "을지로 곱창집",
                    rarity: "B",
                    address: "서울 중구 을지로 170",
                    phone: "02-2278-8888",
                    category: "한식",
                    description: "신선한 곱창과 대창을 숯불에 구워 먹는 곳. 소주 한잔하기 좋습니다.",
                    naverPlaceId: "1100000012",
                    kakaoPlaceId: "2100000012"
                }
            ]
        },
        5: { // 장충동
            name: "서울 중구 장충동",
            restaurants: [
                {
                    itemId: "IT_005",
                    name: "장충동 왕족발",
                    restaurant: "장충동족발",
                    rarity: "A",
                    address: "서울 중구 장충동1가 60-5",
                    phone: "02-2279-9979",
                    category: "한식",
                    description: "1960년대부터 이어온 족발 전문점. 콜라겐이 풍부한 족발이 일품입니다.",
                    naverPlaceId: "11623448",
                    kakaoPlaceId: "8292128"
                },
                {
                    itemId: "IT_005_B",
                    name: "순두부",
                    restaurant: "북창동 순두부",
                    rarity: "B",
                    address: "서울 중구 장충동2가 202-1",
                    phone: "02-2275-1000",
                    category: "한식",
                    description: "부드러운 순두부찌개가 유명한 골목 맛집입니다.",
                    naverPlaceId: "1100000013",
                    kakaoPlaceId: "2100000013"
                },
                {
                    itemId: "IT_005_C",
                    name: "평양냉면",
                    restaurant: "평양면옥",
                    rarity: "A",
                    address: "서울 중구 장충동1가 60-1",
                    phone: "02-2279-9000",
                    category: "한식",
                    description: "장충동의 유명 냉면집. 시원한 육수가 일품입니다.",
                    naverPlaceId: "1100000014",
                    kakaoPlaceId: "2100000014"
                }
            ]
        },
        6: { // 인사동
            name: "서울 종로구 인사동",
            restaurants: [
                {
                    itemId: "IT_006",
                    name: "인사동 전통차",
                    restaurant: "인사동 찻집",
                    rarity: "B",
                    address: "서울 종로구 인사동길 30",
                    phone: "02-733-2211",
                    category: "카페/차",
                    description: "전통 한옥에서 즐기는 전통차. 마음이 평화로워집니다.",
                    naverPlaceId: "1100000015",
                    kakaoPlaceId: "2100000015"
                },
                {
                    itemId: "IT_006_B",
                    name: "비빔밥",
                    restaurant: "전주비빔밥",
                    rarity: "A",
                    address: "서울 종로구 인사동길 42",
                    phone: "02-722-3211",
                    category: "한식",
                    description: "인사동의 유명 비빔밥 맛집. 다양한 나물 반찬이 풍성합니다.",
                    naverPlaceId: "1100000016",
                    kakaoPlaceId: "2100000016"
                },
                {
                    itemId: "IT_006_C",
                    name: "떡볶이",
                    restaurant: "인사동 떡볶이",
                    rarity: "C",
                    address: "서울 종로구 인사동길 50",
                    phone: "02-735-1234",
                    category: "분식",
                    description: "간단하게 먹기 좋은 떡볶이. 매콤한 맛이 일품입니다.",
                    naverPlaceId: "1100000017",
                    kakaoPlaceId: "2100000017"
                }
            ]
        },
        7: { // 광장시장
            name: "광장시장",
            restaurants: [
                {
                    itemId: "IT_100",
                    name: "광장시장 빈대떡",
                    restaurant: "광장시장 빈대떡",
                    rarity: "SP",
                    address: "서울 종로구 창경동 88",
                    phone: "02-2267-0291",
                    category: "전통시장",
                    description: "광장시장의 명물 빈대떡. 바삭하고 고소한 맛이 일품입니다.",
                    naverPlaceId: "13168580",
                    kakaoPlaceId: "17872893"
                },
                {
                    itemId: "IT_100_B",
                    name: "마약김밥",
                    restaurant: "마약김밥",
                    rarity: "B",
                    address: "서울 종로구 창경동 88-1",
                    phone: "02-2268-1234",
                    category: "분식",
                    description: "광장시장의 유명 마약김밥. 한번 먹으면 계속 생각나는 맛입니다.",
                    naverPlaceId: "1100000018",
                    kakaoPlaceId: "2100000018"
                },
                {
                    itemId: "IT_100_C",
                    name: "육회",
                    restaurant: "육회집",
                    rarity: "A",
                    address: "서울 종로구 창경동 88-2",
                    phone: "02-2269-5678",
                    category: "한식",
                    description: "신선한 육회를 저렴하게 즐길 수 있는 광장시장 명소입니다.",
                    naverPlaceId: "1100000019",
                    kakaoPlaceId: "2100000019"
                }
            ]
        },
        8: { // 삼청동
            name: "서울 종로구 삼청동",
            restaurants: [
                {
                    itemId: "IT_007",
                    name: "삼청동 디저트",
                    restaurant: "삼청동 카페",
                    rarity: "B",
                    address: "서울 종로구 삼청로 45",
                    phone: "02-722-7777",
                    category: "카페/디저트",
                    description: "힘한 분위기의 카페. 달콤한 디저트가 일품입니다.",
                    naverPlaceId: "1100000020",
                    kakaoPlaceId: "2100000020"
                },
                {
                    itemId: "IT_007_B",
                    name: "수제비",
                    restaurant: "삼청동 수제비",
                    rarity: "B",
                    address: "서울 종로구 삼청로 50",
                    phone: "02-723-8888",
                    category: "한식",
                    description: "칼칼한 수제비가 일품인 맛집. 손님이 많아 예약 필수입니다.",
                    naverPlaceId: "1100000021",
                    kakaoPlaceId: "2100000021"
                },
                {
                    itemId: "IT_007_C",
                    name: "한정식",
                    restaurant: "삼청각",
                    rarity: "A",
                    address: "서울 종로구 삼청로 55",
                    phone: "02-724-9999",
                    category: "한식",
                    description: "고급 한정식을 즐길 수 있는 레스토랑. 특별한 날에 추천합니다.",
                    naverPlaceId: "1100000022",
                    kakaoPlaceId: "2100000022"
                }
            ]
        },
        9: { // 평창동
            name: "서울 종로구 평창동",
            restaurants: [
                {
                    itemId: "IT_008",
                    name: "평창동 막걸리",
                    restaurant: "평창동 막걸리집",
                    rarity: "A",
                    address: "서울 종로구 평창동 123",
                    phone: "02-391-1234",
                    category: "전통주",
                    description: "자연의 맛이 살아있는 막걸리. 파전과 함께 먹으면 환상적입니다.",
                    naverPlaceId: "1100000023",
                    kakaoPlaceId: "2100000023"
                },
                {
                    itemId: "IT_008_B",
                    name: "삼계탕",
                    restaurant: "토속촌",
                    rarity: "A",
                    address: "서울 종로구 체부동 85-1",
                    phone: "02-737-7444",
                    category: "한식",
                    description: "경복궁 근처의 유명 삼계탕 맛집. 진한 국물이 일품입니다.",
                    naverPlaceId: "11615367",
                    kakaoPlaceId: "8215242"
                },
                {
                    itemId: "IT_008_C",
                    name: "한정식",
                    restaurant: "평창동 한정식",
                    rarity: "B",
                    address: "서울 종로구 평창동 130",
                    phone: "02-392-5678",
                    category: "한식",
                    description: "조용한 한옥에서 즐기는 한정식. 계절 재료로 만든 요리가 특징입니다.",
                    naverPlaceId: "1100000024",
                    kakaoPlaceId: "2100000024"
                }
            ]
        },
        10: { // 남산
            name: "남산 예장동",
            restaurants: [
                {
                    itemId: "IT_999",
                    name: "남산 증표",
                    restaurant: "남산타워",
                    rarity: "Legendary",
                    address: "서울 용산구 남산공원길 105",
                    phone: "02-3455-9277",
                    category: "관광지",
                    description: "서울의 상징 남산타워. 서울을 정복한 증표입니다.",
                    naverPlaceId: "11862479",
                    kakaoPlaceId: "18752034"
                },
                {
                    itemId: "IT_999_B",
                    name: "돈까스",
                    restaurant: "남산 돈까스",
                    rarity: "B",
                    address: "서울 용산구 용산동2가동 301-1",
                    phone: "02-797-1234",
                    category: "일식/양식",
                    description: "남산 근처의 유명 돈까스 맛집. 바삭한 식감이 일품입니다.",
                    naverPlaceId: "1100000025",
                    kakaoPlaceId: "2100000025"
                },
                {
                    itemId: "IT_999_C",
                    name: "케이블카 도시락",
                    restaurant: "남산 케이블카",
                    rarity: "A",
                    address: "서울 용산구 남산공원길 83",
                    phone: "02-753-2403",
                    category: "분식",
                    description: "남산 케이블카를 타며 먹는 도시락. 특별한 경험입니다.",
                    naverPlaceId: "1100000026",
                    kakaoPlaceId: "2100000026"
                }
            ]
        },
        // 부산 맛집 풀 (11-18)
        11: {
            name: "부산 해운대구",
            restaurants: [
                {
                    itemId: "IT_BS_001",
                    name: "해운대 회",
                    restaurant: "해운대 횟집",
                    rarity: "B",
                    address: "부산 해운대구 해운대해변로 264",
                    phone: "051-742-1234",
                    category: "횟집",
                    description: "해운대 해변가의 신선한 회를 맛볼 수 있는 곳",
                    naverPlaceId: "1100000001",
                    kakaoPlaceId: "2100000001"
                }
            ]
        },
        12: {
            name: "부산 중구 자갈치",
            restaurants: [
                {
                    itemId: "IT_BS_002",
                    name: "자갈치 오징어",
                    restaurant: "자갈치시장",
                    rarity: "B",
                    address: "부산 중구 자갈치해안로 52",
                    phone: "051-245-2594",
                    category: "수산물",
                    description: "부산 최대 수산시장. 신선한 해산물을 바로 구입해 회로 즐길 수 있습니다",
                    naverPlaceId: "11785417",
                    kakaoPlaceId: "8332726"
                }
            ]
        },
        13: {
            name: "부산 동래구",
            restaurants: [
                {
                    itemId: "IT_BS_003",
                    name: "동래파전",
                    restaurant: "동래파전",
                    rarity: "A",
                    address: "부산 동래구 명륜로94번길 43-10",
                    phone: "051-552-0792",
                    category: "한식",
                    description: "1968년 개업한 부산 동래파전 원조집. 두툼하고 푸짐한 파전이 일품",
                    naverPlaceId: "11696169",
                    kakaoPlaceId: "8243504"
                }
            ]
        },
        14: {
            name: "부산 서면",
            restaurants: [
                {
                    itemId: "IT_BS_004",
                    name: "돼지국밥",
                    restaurant: "쌍둥이 돼지국밥",
                    rarity: "A",
                    address: "부산 부산진구 중앙대로 680-1",
                    phone: "051-805-1292",
                    category: "한식",
                    description: "24시간 영업하는 돼지국밥 맛집. 진한 국물이 해장에 최고",
                    naverPlaceId: "13168579",
                    kakaoPlaceId: "17872892"
                }
            ]
        },
        15: {
            name: "부산 광안리",
            restaurants: [
                {
                    itemId: "IT_BS_005",
                    name: "밀면",
                    restaurant: "가야밀면",
                    rarity: "B",
                    address: "부산 부산진구 가야대로 493",
                    phone: "051-896-4884",
                    category: "한식",
                    description: "부산 밀면의 원조. 시원한 육수와 쫄깃한 면발이 특징",
                    naverPlaceId: "11615366",
                    kakaoPlaceId: "8215241"
                }
            ]
        },
        16: {
            name: "부산 감천문화마을",
            restaurants: [
                {
                    itemId: "IT_BS_006",
                    name: "씨앗호떡",
                    restaurant: "감천문화마을 호떡",
                    rarity: "C",
                    address: "부산 사하구 감내2로 203",
                    phone: "051-204-1444",
                    category: "간식",
                    description: "마을 골목에서 즐기는 바삭한 호떡. SNS 핫플레이스",
                    naverPlaceId: "1100000006",
                    kakaoPlaceId: "2100000006"
                }
            ]
        },
        17: {
            name: "부산 태종대",
            restaurants: [
                {
                    itemId: "IT_BS_007",
                    name: "대구탕",
                    restaurant: "태종대 대구탕",
                    rarity: "A",
                    address: "부산 영도구 전망로 24",
                    phone: "051-403-1234",
                    category: "한식",
                    description: "신선한 대구로 끓인 시원한 해장국. 태종대 맛집",
                    naverPlaceId: "1100000007",
                    kakaoPlaceId: "2100000007"
                }
            ]
        },
        18: {
            name: "부산 용궁사",
            restaurants: [
                {
                    itemId: "IT_BS_008",
                    name: "부산 증표",
                    restaurant: "해동용궁사",
                    rarity: "Legendary",
                    address: "부산 기장군 기장읍 용궁길 86",
                    phone: "051-722-7744",
                    category: "관광지",
                    description: "바다 위에 세워진 아름다운 사찰. 일출 명소로 유명",
                    naverPlaceId: "11620714",
                    kakaoPlaceId: "8226489"
                }
            ]
        }
    }
};
