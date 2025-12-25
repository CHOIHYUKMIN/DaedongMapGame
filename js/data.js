// CSV 데이터를 JavaScript 객체로 변환

const GameData = {
    levels: [
        {
            id: 1,
            name: "서울 중구 태평로1가",
            type: "SCORE",
            target: 2500,
            moves: 20,
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
            target: 3500,
            moves: 22,
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
            target: 4500,
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
            target: 5500,
            moves: 25,
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
            target: 6500,
            moves: 28,
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
            target: 7500,
            moves: 28,
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
            target: 8500,
            moves: 32,
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
            target: 9500,
            moves: 30,
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
            target: 10500,
            moves: 32,
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
            target: 12000,
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
        },
        // 강원도 레벨 (19-26)
        { id: 19, name: "강원 춘천 닭갈비", regionName: "춘천 닭갈비거리", type: "SCORE", target: 3000, moves: 20, reward: "IT_GW_001", isAd: false, blockTheme: { name: "춘천 닭갈비", emojis: ["🍗", "🔥", "🥘", "🌶️", "🧀"] } },
        { id: 20, name: "강원 속초 오징어순대", regionName: "속초 중앙시장", type: "COLLECT", target: 12, moves: 22, reward: "IT_GW_002", isAd: false, blockTheme: { name: "속초 오징어", emojis: ["🦑", "🐙", "🌊", "🏖️", "⛵"] } },
        { id: 21, name: "강원 강릉 커피거리", regionName: "강릉 안목해변", type: "SCORE", target: 3500, moves: 24, reward: "IT_GW_003", isAd: false, blockTheme: { name: "커피 거리", emojis: ["☕", "🌊", "🏖️", "☀️", "🌅"] } },
        { id: 22, name: "강원 평창 메밀전병", regionName: "평창 봉평장터", type: "COLLECT", target: 14, moves: 26, reward: "IT_GW_004", isAd: false, blockTheme: { name: "메밀 음식", emojis: ["🥞", "🌾", "⛰️", "❄️", "🎿"] } },
        { id: 23, name: "강원 정선 곤드레밥", regionName: "정선 아리랑시장", type: "SCORE", target: 4000, moves: 28, reward: "IT_GW_005", isAd: false, blockTheme: { name: "산나물 밥상", emojis: ["🍚", "🌿", "⛰️", "🥬", "🍃"] } },
        { id: 24, name: "강원 동해 물회", regionName: "동해 추암해변", type: "COLLECT", target: 16, moves: 30, reward: "IT_GW_006", isAd: false, blockTheme: { name: "동해 물회", emojis: ["🐟", "🌊", "🧊", "🥒", "🌶️"] } },
        { id: 25, name: "강원 원주 막국수", regionName: "원주 막국수촌", type: "SCORE", target: 4500, moves: 32, reward: "IT_GW_007", isAd: false, blockTheme: { name: "막국수", emojis: ["🍜", "🥒", "🌾", "❄️", "🧊"] } },
        { id: 26, name: "강원 설악산", regionName: "설악산 대청봉", type: "SCORE", target: 5000, moves: 35, reward: "IT_GW_999", isAd: false, blockTheme: { name: "설악산", emojis: ["⛰️", "🌲", "🦌", "🏔️", "🌄"] } },

        // 대구광역시 레벨 (27-33)
        { id: 27, name: "대구 동인동 찜갈비", regionName: "대구 동인동", type: "SCORE", target: 3500, moves: 22, reward: "IT_DG_001", isAd: false, blockTheme: { name: "찜갈비", emojis: ["🍖", "🔥", "🥘", "🌶️", "🍯"] } },
        { id: 28, name: "대구 서문시장", regionName: "대구 서문시장", type: "COLLECT", target: 14, moves: 24, reward: "IT_DG_002", isAd: false, blockTheme: { name: "전통시장", emojis: ["🛍️", "🍱", "🥟", "🍢", "🏮"] } },
        { id: 29, name: "대구 막창골목", regionName: "대구 안지랑", type: "SCORE", target: 4000, moves: 26, reward: "IT_DG_003", isAd: false, blockTheme: { name: "막창", emojis: ["🥩", "🔥", "🍺", "🧄", "🌶️"] } },
        { id: 30, name: "대구 따로국밥", regionName: "대구 북성로", type: "COLLECT", target: 16, moves: 28, reward: "IT_DG_004", isAd: false, blockTheme: { name: "따로국밥", emojis: ["🍲", "🥘", "🍚", "🌶️", "🧄"] } },
        { id: 31, name: "대구 납작만두", regionName: "대구 중앙로", type: "SCORE", target: 4500, moves: 30, reward: "IT_DG_005", isAd: false, blockTheme: { name: "납작만두", emojis: ["🥟", "🍱", "🥢", "🧄", "🌶️"] } },
        { id: 32, name: "대구 팔공산", regionName: "팔공산 관봉", type: "COLLECT", target: 18, moves: 32, reward: "IT_DG_006", isAd: false, blockTheme: { name: "팔공산", emojis: ["⛰️", "🌲", "🛕", "🌄", "🍂"] } },
        { id: 33, name: "대구 83타워", regionName: "대구 83타워", type: "SCORE", target: 5000, moves: 35, reward: "IT_DG_999", isAd: false, blockTheme: { name: "83타워", emojis: ["🗼", "🌃", "🎡", "📸", "🌆"] } },

        // 인천광역시 레벨 (34-40)
        { id: 34, name: "인천 차이나타운", regionName: "인천 차이나타운", type: "SCORE", target: 3500, moves: 22, reward: "IT_IC_001", isAd: false, blockTheme: { name: "짜장면", emojis: ["🍜", "🥟", "🏮", "🐉", "🎎"] } },
        { id: 35, name: "인천 신포시장", regionName: "신포국제시장", type: "COLLECT", target: 14, moves: 24, reward: "IT_IC_002", isAd: false, blockTheme: { name: "닭강정", emojis: ["🍗", "🌶️", "🍯", "🧄", "🥢"] } },
        { id: 36, name: "인천 송도", regionName: "송도 센트럴파크", type: "SCORE", target: 4000, moves: 26, reward: "IT_IC_003", isAd: false, blockTheme: { name: "송도", emojis: ["🏙️", "🌃", "🏢", "🌉", "🚇"] } },
        { id: 37, name: "인천 월미도", regionName: "월미도 놀이공원", type: "COLLECT", target: 16, moves: 28, reward: "IT_IC_004", isAd: false, blockTheme: { name: "월미도", emojis: ["🎡", "🎢", "🎠", "🌊", "🏖️"] } },
        { id: 38, name: "인천 소래포구", regionName: "소래포구 어시장", type: "SCORE", target: 4500, moves: 30, reward: "IT_IC_005", isAd: false, blockTheme: { name: "소래 젓갈", emojis: ["🦐", "🦀", "🐙", "🦑", "🐟"] } },
        { id: 39, name: "인천 강화도", regionName: "강화도 순무", type: "COLLECT", target: 18, moves: 32, reward: "IT_IC_006", isAd: false, blockTheme: { name: "강화 특산물", emojis: ["🥕", "🌾", "🏺", "🏛️", "⛩️"] } },
        { id: 40, name: "인천대교", regionName: "인천대교 전망대", type: "SCORE", target: 5000, moves: 35, reward: "IT_IC_999", isAd: false, blockTheme: { name: "인천대교", emojis: ["🌉", "🚗", "🌊", "🌅", "📸"] } },

        // 광주광역시 레벨 (41-46)
        { id: 41, name: "광주 양동시장", regionName: "광주 양동시장", type: "SCORE", target: 3500, moves: 22, reward: "IT_GJ_001", isAd: false, blockTheme: { name: "시장 먹거리", emojis: ["🍱", "🥟", "🍢", "🍡", "🏮"] } },
        { id: 42, name: "광주 오리탕", regionName: "광주 오리탕거리", type: "COLLECT", target: 14, moves: 24, reward: "IT_GJ_002", isAd: false, blockTheme: { name: "오리탕", emojis: ["🦆", "🥘", "🍲", "🌶️", "🧄"] } },
        { id: 43, name: "광주 떡갈비", regionName: "광주 송정떡갈비", type: "SCORE", target: 4000, moves: 26, reward: "IT_GJ_003", isAd: false, blockTheme: { name: "떡갈비", emojis: ["🍖", "🔥", "🍱", "🥢", "🌶️"] } },
        { id: 44, name: "광주 무등산", regionName: "무등산 정상", type: "COLLECT", target: 16, moves: 28, reward: "IT_GJ_004", isAd: false, blockTheme: { name: "무등산", emojis: ["⛰️", "🌲", "🌄", "🍃", "🦌"] } },
        { id: 45, name: "광주 남도음식", regionName: "광주 전통한정식", type: "SCORE", target: 4500, moves: 30, reward: "IT_GJ_005", isAd: false, blockTheme: { name: "한정식", emojis: ["🍚", "🥘", "🍲", "🥬", "🌶️"] } },
        { id: 46, name: "광주 5·18 민주광장", regionName: "5·18 민주광장", type: "SCORE", target: 5000, moves: 35, reward: "IT_GJ_999", isAd: false, blockTheme: { name: "민주광장", emojis: ["🏛️", "🕊️", "🌹", "📚", "🎨"] } },

        // 대전광역시 레벨 (47-52)
        { id: 47, name: "대전 성심당", regionName: "대전 성심당 본점", type: "SCORE", target: 3500, moves: 22, reward: "IT_DJ_001", isAd: false, blockTheme: { name: "성심당 빵", emojis: ["🍞", "🥐", "🥖", "🧁", "☕"] } },
        { id: 48, name: "대전 은행동 칼국수", regionName: "대전 은행동", type: "COLLECT", target: 14, moves: 24, reward: "IT_DJ_002", isAd: false, blockTheme: { name: "칼국수", emojis: ["🍜", "🥟", "🥢", "🌶️", "🧄"] } },
        { id: 49, name: "대전 중앙시장", regionName: "대전 중앙시장", type: "SCORE", target: 4000, moves: 26, reward: "IT_DJ_003", isAd: false, blockTheme: { name: "전통시장", emojis: ["🛍️", "🍱", "🥟", "🍢", "🏮"] } },
        { id: 50, name: "대전 대청호", regionName: "대청호 은어", type: "COLLECT", target: 16, moves: 28, reward: "IT_DJ_004", isAd: false, blockTheme: { name: "대청호", emojis: ["🐟", "🌊", "🚤", "🏞️", "🌅"] } },
        { id: 51, name: "대전 한밭수목원", regionName: "한밭수목원", type: "SCORE", target: 4500, moves: 30, reward: "IT_DJ_005", isAd: false, blockTheme: { name: "수목원", emojis: ["🌳", "🌲", "🌷", "🦋", "🌺"] } },
        { id: 52, name: "대전 엑스포", regionName: "대전 엑스포과학공원", type: "SCORE", target: 5000, moves: 35, reward: "IT_DJ_999", isAd: false, blockTheme: { name: "엑스포", emojis: ["🔬", "🧪", "🚀", "🤖", "🎡"] } },

        // 울산광역시 레벨 (53-57)
        { id: 53, name: "울산 언양불고기", regionName: "언양 불고기거리", type: "SCORE", target: 4000, moves: 24, reward: "IT_US_001", isAd: false, blockTheme: { name: "언양불고기", emojis: ["🥩", "🔥", "🍖", "🥬", "🧄"] } },
        { id: 54, name: "울산 대왕암", regionName: "대왕암공원", type: "COLLECT", target: 16, moves: 26, reward: "IT_US_002", isAd: false, blockTheme: { name: "대왕암", emojis: ["🌊", "🏖️", "🌅", "⛰️", "📸"] } },
        { id: 55, name: "울산 태화강", regionName: "태화강 대공원", type: "SCORE", target: 4500, moves: 28, reward: "IT_US_003", isAd: false, blockTheme: { name: "태화강", emojis: ["🌊", "🦢", "🌳", "🌸", "🚶"] } },
        { id: 56, name: "울산 방어회", regionName: "울산 방어축제", type: "COLLECT", target: 18, moves: 30, reward: "IT_US_004", isAd: false, blockTheme: { name: "방어회", emojis: ["🐟", "🍱", "🌊", "❄️", "🥢"] } },
        { id: 57, name: "울산 현대자동차", regionName: "현대자동차 공장", type: "SCORE", target: 5000, moves: 35, reward: "IT_US_999", isAd: false, blockTheme: { name: "자동차 도시", emojis: ["🚗", "🏭", "⚙️", "🔧", "🏗️"] } },

        // 세종특별자치시 레벨 (58-62)
        { id: 58, name: "세종 한국식당", regionName: "세종 한정식", type: "SCORE", target: 4000, moves: 24, reward: "IT_SJ_001", isAd: false, blockTheme: { name: "한정식", emojis: ["🍚", "🥘", "🍲", "🥬", "🌶️"] } },
        { id: 59, name: "세종호수공원", regionName: "세종호수공원", type: "COLLECT", target: 16, moves: 26, reward: "IT_SJ_002", isAd: false, blockTheme: { name: "호수공원", emojis: ["🌊", "🦢", "🌳", "🚶", "🌅"] } },
        { id: 60, name: "세종 전통시장", regionName: "세종 조치원시장", type: "SCORE", target: 4500, moves: 28, reward: "IT_SJ_003", isAd: false, blockTheme: { name: "전통시장", emojis: ["🛍️", "🍱", "🥟", "🍢", "🏮"] } },
        { id: 61, name: "세종 연기벌", regionName: "연기벌 들녘", type: "COLLECT", target: 18, moves: 30, reward: "IT_SJ_004", isAd: false, blockTheme: { name: "연기벌", emojis: ["🌾", "🌳", "🚜", "🌅", "🌻"] } },
        { id: 62, name: "세종 정부청사", regionName: "세종 정부청사", type: "SCORE", target: 5000, moves: 35, reward: "IT_SJ_999", isAd: false, blockTheme: { name: "행정수도", emojis: ["🏛️", "🏢", "📋", "📊", "⚖️"] } },

        // 경기도 레벨 (63-74)
        { id: 63, name: "경기 수원 왕갈비", regionName: "수원 왕갈비거리", type: "SCORE", target: 4000, moves: 24, reward: "IT_GG_001", isAd: false, blockTheme: { name: "수원 왕갈비", emojis: ["🍖", "🔥", "🥘", "🌶️", "🧄"] } },
        { id: 64, name: "경기 수원화성", regionName: "수원화성 행궁", type: "COLLECT", target: 16, moves: 26, reward: "IT_GG_002", isAd: false, blockTheme: { name: "수원화성", emojis: ["🏯", "🏛️", "🎎", "📚", "🌳"] } },
        { id: 65, name: "경기 성남 분당", regionName: "분당 카페거리", type: "SCORE", target: 4200, moves: 27, reward: "IT_GG_003", isAd: false, blockTheme: { name: "분당 카페", emojis: ["☕", "🍰", "🥐", "🏢", "🌃"] } },
        { id: 66, name: "경기 용인 에버랜드", regionName: "에버랜드", type: "COLLECT", target: 17, moves: 28, reward: "IT_GG_004", isAd: false, blockTheme: { name: "에버랜드", emojis: ["🎢", "🎠", "🎡", "🐼", "🎪"] } },
        { id: 67, name: "경기 고양 일산", regionName: "일산 호수공원", type: "SCORE", target: 4400, moves: 29, reward: "IT_GG_005", isAd: false, blockTheme: { name: "일산", emojis: ["🌊", "🌳", "🚶", "🌸", "☀️"] } },
        { id: 68, name: "경기 의정부 부대찌개", regionName: "의정부 부대찌개거리", type: "COLLECT", target: 18, moves: 30, reward: "IT_GG_006", isAd: false, blockTheme: { name: "부대찌개", emojis: ["🍲", "🌭", "🧀", "🌶️", "🍜"] } },
        { id: 69, name: "경기 파주 임진각", regionName: "임진각 평화누리", type: "SCORE", target: 4600, moves: 31, reward: "IT_GG_007", isAd: false, blockTheme: { name: "임진각", emojis: ["🕊️", "🌾", "🏛️", "🌳", "🎗️"] } },
        { id: 70, name: "경기 가평 닭갈비", regionName: "가평 닭갈비", type: "COLLECT", target: 19, moves: 32, reward: "IT_GG_008", isAd: false, blockTheme: { name: "가평 닭갈비", emojis: ["🍗", "🥘", "🌶️", "🧀", "🥬"] } },
        { id: 71, name: "경기 평택 소머리국밥", regionName: "평택 소머리국밥", type: "SCORE", target: 4800, moves: 33, reward: "IT_GG_009", isAd: false, blockTheme: { name: "소머리국밥", emojis: ["🍲", "🥘", "🍚", "🌶️", "🧄"] } },
        { id: 72, name: "경기 이천 쌀밥", regionName: "이천 쌀밥", type: "COLLECT", target: 20, moves: 34, reward: "IT_GG_010", isAd: false, blockTheme: { name: "이천 쌀밥", emojis: ["🍚", "🌾", "🥘", "🍲", "🥬"] } },
        { id: 73, name: "경기 안산 다문화", regionName: "안산 다문화거리", type: "SCORE", target: 5000, moves: 35, reward: "IT_GG_011", isAd: false, blockTheme: { name: "다문화", emojis: ["🌍", "🍜", "🥘", "🍲", "🥟"] } },
        { id: 74, name: "경기 광교호수공원", regionName: "광교호수공원", type: "SCORE", target: 5500, moves: 38, reward: "IT_GG_999", isAd: false, blockTheme: { name: "광교호수", emojis: ["🌊", "🏞️", "🚶", "🌳", "🌸"] } },

        // 충청북도 레벨 (75-80)
        { id: 75, name: "충북 청주 직지", regionName: "청주 직지사", type: "SCORE", target: 4000, moves: 24, reward: "IT_CB_001", isAd: false, blockTheme: { name: "직지", emojis: ["📖", "🏛️", "📜", "🖋️", "📚"] } },
        { id: 76, name: "충북 충주댐", regionName: "충주댐", type: "COLLECT", target: 16, moves: 26, reward: "IT_CB_002", isAd: false, blockTheme: { name: "충주댐", emojis: ["🌊", "🏞️", "⚡", "🚤", "🏔️"] } },
        { id: 77, name: "충북 제천 약초", regionName: "제천 약초시장", type: "SCORE", target: 4300, moves: 28, reward: "IT_CB_003", isAd: false, blockTheme: { name: "약초", emojis: ["🌿", "🍵", "💊", "🌾", "🏥"] } },
        { id: 78, name: "충북 단양 마늘", regionName: "단양 마늘축제", type: "COLLECT", target: 17, moves: 29, reward: "IT_CB_004", isAd: false, blockTheme: { name: "단양 마늘", emojis: ["🧄", "🌾", "⛰️", "🏞️", "🚣"] } },
        { id: 79, name: "충북 괴산 고추", regionName: "괴산 청결고추", type: "SCORE", target: 4600, moves: 31, reward: "IT_CB_005", isAd: false, blockTheme: { name: "청결고추", emojis: ["🌶️", "🌾", "🔥", "☀️", "🚜"] } },
        { id: 80, name: "충북 속리산", regionName: "속리산 법주사", type: "SCORE", target: 5000, moves: 35, reward: "IT_CB_999", isAd: false, blockTheme: { name: "속리산", emojis: ["⛰️", "🛕", "🌲", "🍂", "🦌"] } },

        // 충청남도 레벨 (81-87)
        { id: 81, name: "충남 천안 호두과자", regionName: "천안 호두과자", type: "SCORE", target: 4000, moves: 24, reward: "IT_CN_001", isAd: false, blockTheme: { name: "호두과자", emojis: ["🥜", "🍰", "🥐", "☕", "🎁"] } },
        { id: 82, name: "충남 아산 어리굴젓", regionName: "아산 어리굴젓", type: "COLLECT", target: 16, moves: 26, reward: "IT_CN_002", isAd: false, blockTheme: { name: "어리굴젓", emojis: ["🦪", "🌊", "🌶️", "🧄", "🍚"] } },
        { id: 83, name: "충남 공주 밤", regionName: "공주 밤축제", type: "SCORE", target: 4300, moves: 28, reward: "IT_CN_003", isAd: false, blockTheme: { name: "공주 밤", emojis: ["🌰", "🍂", "🌳", "🏯", "🏛️"] } },
        { id: 84, name: "충남 부여 백제", regionName: "부여 백제문화단지", type: "COLLECT", target: 17, moves: 29, reward: "IT_CN_004", isAd: false, blockTheme: { name: "백제문화", emojis: ["🏛️", "👑", "⚔️", "📚", "🏺"] } },
        { id: 85, name: "충남 보령 굴", regionName: "보령 굴축제", type: "SCORE", target: 4600, moves: 31, reward: "IT_CN_005", isAd: false, blockTheme: { name: "보령 굴", emojis: ["🦪", "🌊", "🏖️", "🔥", "🧄"] } },
        { id: 86, name: "충남 서산 간척지", regionName: "서산 간척지", type: "COLLECT", target: 18, moves: 32, reward: "IT_CN_006", isAd: false, blockTheme: { name: "서산", emojis: ["🌾", "🚜", "🌅", "🦆", "🌊"] } },
        { id: 87, name: "충남 태안 해변", regionName: "태안 몽산포", type: "SCORE", target: 5000, moves: 35, reward: "IT_CN_999", isAd: false, blockTheme: { name: "태안 해변", emojis: ["🏖️", "🌊", "🌅", "🐚", "☀️"] } },

        // 전북특별자치도 레벨 (88-94)
        { id: 88, name: "전북 전주 비빔밥", regionName: "전주 한옥마을", type: "SCORE", target: 4500, moves: 26, reward: "IT_JB_001", isAd: false, blockTheme: { name: "전주 비빔밥", emojis: ["🍚", "🥘", "🥬", "🌶️", "🥚"] } },
        { id: 89, name: "전북 전주 콩나물국밥", regionName: "전주 남부시장", type: "COLLECT", target: 17, moves: 28, reward: "IT_JB_002", isAd: false, blockTheme: { name: "콩나물국밥", emojis: ["🍲", "🌱", "🍚", "🌶️", "🧄"] } },
        { id: 90, name: "전북 군산 빵", regionName: "군산 이성당", type: "SCORE", target: 4800, moves: 30, reward: "IT_JB_003", isAd: false, blockTheme: { name: "군산 빵", emojis: ["🍞", "🥐", "☕", "🥖", "🧁"] } },
        { id: 91, name: "전북 순창 고추장", regionName: "순창 고추장마을", type: "COLLECT", target: 18, moves: 31, reward: "IT_JB_004", isAd: false, blockTheme: { name: "순창 고추장", emojis: ["🌶️", "🥘", "🏺", "🌾", "🔥"] } },
        { id: 92, name: "전북 정읍 내장산", regionName: "내장산 단풍", type: "SCORE", target: 5000, moves: 33, reward: "IT_JB_005", isAd: false, blockTheme: { name: "내장산", emojis: ["⛰️", "🍂", "🌳", "🍁", "🦌"] } },
        { id: 93, name: "전북 김제 지평선", regionName: "김제 지평선축제", type: "COLLECT", target: 19, moves: 34, reward: "IT_JB_006", isAd: false, blockTheme: { name: "지평선", emojis: ["🌾", "🚜", "🌅", "🏞️", "☀️"] } },
        { id: 94, name: "전북 무주 반딧불", regionName: "무주 반딧불축제", type: "SCORE", target: 5500, moves: 38, reward: "IT_JB_999", isAd: false, blockTheme: { name: "반딧불", emojis: ["✨", "🌌", "⛰️", "🌲", "🦋"] } },

        // 전라남도 레벨 (95-102)
        { id: 95, name: "전남 여수 게장", regionName: "여수 게장백반", type: "SCORE", target: 4500, moves: 26, reward: "IT_JN_001", isAd: false, blockTheme: { name: "여수 게장", emojis: ["🦀", "🌊", "🍚", "🌶️", "🧄"] } },
        { id: 96, name: "전남 순천만", regionName: "순천만 갈대밭", type: "COLLECT", target: 17, moves: 28, reward: "IT_JN_002", isAd: false, blockTheme: { name: "순천만", emojis: ["🌾", "🌊", "🦆", "🌅", "📸"] } },
        { id: 97, name: "전남 보성 녹차", regionName: "보성 녹차밭", type: "SCORE", target: 4800, moves: 30, reward: "IT_JN_003", isAd: false, blockTheme: { name: "보성 녹차", emojis: ["🍵", "🌱", "☕", "🏞️", "🌿"] } },
        { id: 98, name: "전남 벌교 꼬막", regionName: "벌교 꼬막정식", type: "COLLECT", target: 18, moves: 31, reward: "IT_JN_004", isAd: false, blockTheme: { name: "벌교 꼬막", emojis: ["🦪", "🌊", "🍚", "🧄", "🌶️"] } },
        { id: 99, name: "전남 장흥 한우", regionName: "장흥 한우축제", type: "SCORE", target: 5000, moves: 33, reward: "IT_JN_005", isAd: false, blockTheme: { name: "장흥 한우", emojis: ["🥩", "🐄", "🔥", "🌾", "🍖"] } },
        { id: 100, name: "전남 목포 낙지", regionName: "목포 연포탕", type: "COLLECT", target: 19, moves: 34, reward: "IT_JN_006", isAd: false, blockTheme: { name: "낙지연포탕", emojis: ["🐙", "🌊", "🌶️", "🍲", "🧄"] } },
        { id: 101, name: "전남 해남 땅끝", regionName: "해남 땅끝마을", type: "SCORE", target: 5300, moves: 36, reward: "IT_JN_007", isAd: false, blockTheme: { name: "땅끝마을", emojis: ["🌊", "🏖️", "🌅", "🗺️", "🚶"] } },
        { id: 102, name: "전남 신안 천일염", regionName: "신안 염전", type: "SCORE", target: 5800, moves: 40, reward: "IT_JN_999", isAd: false, blockTheme: { name: "천일염", emojis: ["🧂", "☀️", "🌊", "🏝️", "🚜"] } },

        // 경상북도 레벨 (103-111)
        { id: 103, name: "경북 안동 찜닭", regionName: "안동 찜닭골목", type: "SCORE", target: 4500, moves: 26, reward: "IT_GB_001", isAd: false, blockTheme: { name: "안동 찜닭", emojis: ["🍗", "🥘", "🌶️", "🥔", "🧄"] } },
        { id: 104, name: "경북 경주 빵", regionName: "경주 황남빵", type: "COLLECT", target: 17, moves: 28, reward: "IT_GB_002", isAd: false, blockTheme: { name: "경주 빵", emojis: ["🥐", "🥜", "☕", "🏯", "🎎"] } },
        { id: 105, name: "경북 경주 불국사", regionName: "불국사 석굴암", type: "SCORE", target: 4800, moves: 30, reward: "IT_GB_003", isAd: false, blockTheme: { name: "불국사", emojis: ["🛕", "⛩️", "🏯", "🌸", "📚"] } },
        { id: 106, name: "경북 포항 과메기", regionName: "포항 구룡포", type: "COLLECT", target: 18, moves: 31, reward: "IT_GB_004", isAd: false, blockTheme: { name: "과메기", emojis: ["🐟", "❄️", "🌊", "🧄", "🌶️"] } },
        { id: 107, name: "경북 구미 왕소금빵", regionName: "구미 왕소금빵", type: "SCORE", target: 5000, moves: 33, reward: "IT_GB_005", isAd: false, blockTheme: { name: "왕소금빵", emojis: ["🥐", "🧂", "☕", "🍞", "🧈"] } },
        { id: 108, name: "경북 문경 오미자", regionName: "문경 오미자축제", type: "COLLECT", target: 19, moves: 34, reward: "IT_GB_006", isAd: false, blockTheme: { name: "오미자", emojis: ["🍒", "🍵", "⛰️", "🌿", "💊"] } },
        { id: 109, name: "경북 청송 사과", regionName: "청송 사과", type: "SCORE", target: 5300, moves: 36, reward: "IT_GB_007", isAd: false, blockTheme: { name: "청송 사과", emojis: ["🍎", "🌳", "🍂", "🚜", "🌾"] } },
        { id: 110, name: "경북 영주 한우", regionName: "영주 한우", type: "COLLECT", target: 20, moves: 37, reward: "IT_GB_008", isAd: false, blockTheme: { name: "영주 한우", emojis: ["🥩", "🐄", "🔥", "🌾", "🍖"] } },
        { id: 111, name: "경북 첨성대", regionName: "경주 첨성대", type: "SCORE", target: 6000, moves: 40, reward: "IT_GB_999", isAd: false, blockTheme: { name: "첨성대", emojis: ["🏯", "⭐", "🌙", "🔭", "📚"] } },

        // 경상남도 레벨 (112-119)
        { id: 112, name: "경남 통영 굴", regionName: "통영 굴구이", type: "SCORE", target: 4500, moves: 26, reward: "IT_GN_001", isAd: false, blockTheme: { name: "통영 굴", emojis: ["🦪", "🔥", "🌊", "🧄", "🍋"] } },
        { id: 113, name: "경남 진주 냉면", regionName: "진주 냉면", type: "COLLECT", target: 17, moves: 28, reward: "IT_GN_002", isAd: false, blockTheme: { name: "진주 냉면", emojis: ["🍜", "❄️", "🧊", "🥒", "🥚"] } },
        { id: 114, name: "경남 거제 멸치", regionName: "거제 멸치축제", type: "SCORE", target: 4800, moves: 30, reward: "IT_GN_003", isAd: false, blockTheme: { name: "거제 멸치", emojis: ["🐟", "🌊", "☀️", "🏖️", "🚢"] } },
        { id: 115, name: "경남 밀양 돼지국밥", regionName: "밀양 돼지국밥", type: "COLLECT", target: 18, moves: 31, reward: "IT_GN_004", isAd: false, blockTheme: { name: "돼지국밥", emojis: ["🍲", "🥘", "🍚", "🌶️", "🧄"] } },
        { id: 116, name: "경남 남해 마늘", regionName: "남해 마늘", type: "SCORE", target: 5000, moves: 33, reward: "IT_GN_005", isAd: false, blockTheme: { name: "남해 마늘", emojis: ["🧄", "🌊", "🏝️", "🌾", "☀️"] } },
        { id: 117, name: "경남 하동 녹차", regionName: "하동 녹차밭", type: "COLLECT", target: 19, moves: 34, reward: "IT_GN_006", isAd: false, blockTheme: { name: "하동 녹차", emojis: ["🍵", "🌱", "⛰️", "🌿", "☕"] } },
        { id: 118, name: "경남 사천 죽방렴", regionName: "사천 죽방렴", type: "SCORE", target: 5300, moves: 36, reward: "IT_GN_007", isAd: false, blockTheme: { name: "죽방렴", emojis: ["🐟", "🌊", "🎣", "🏖️", "🦀"] } },
        { id: 119, name: "경남 가야산", regionName: "해인사 팔만대장경", type: "SCORE", target: 6000, moves: 40, reward: "IT_GN_999", isAd: false, blockTheme: { name: "가야산", emojis: ["⛰️", "🛕", "📚", "🌲", "🍂"] } },

        // 제주특별자치도 레벨 (120-125)
        { id: 120, name: "제주 흑돼지", regionName: "제주 흑돼지거리", type: "SCORE", target: 5000, moves: 28, reward: "IT_JJ_001", isAd: false, blockTheme: { name: "제주 흑돼지", emojis: ["🐷", "🔥", "🥩", "🧄", "🌶️"] } },
        { id: 121, name: "제주 고등어회", regionName: "제주 고등어축제", type: "COLLECT", target: 18, moves: 30, reward: "IT_JJ_002", isAd: false, blockTheme: { name: "고등어회", emojis: ["🐟", "🌊", "🍱", "🧄", "🌶️"] } },
        { id: 122, name: "제주 감귤", regionName: "제주 감귤밭", type: "SCORE", target: 5300, moves: 32, reward: "IT_JJ_003", isAd: false, blockTheme: { name: "제주 감귤", emojis: ["🍊", "🌳", "☀️", "🌴", "🏝️"] } },
        { id: 123, name: "제주 전복죽", regionName: "제주 전복죽", type: "COLLECT", target: 19, moves: 34, reward: "IT_JJ_004", isAd: false, blockTheme: { name: "전복죽", emojis: ["🐚", "🍲", "🌊", "🧄", "🍚"] } },
        { id: 124, name: "제주 성산일출봉", regionName: "성산일출봉", type: "SCORE", target: 5600, moves: 36, reward: "IT_JJ_005", isAd: false, blockTheme: { name: "성산일출봉", emojis: ["⛰️", "🌅", "🌊", "🏝️", "📸"] } },
        { id: 125, name: "제주 한라산", regionName: "한라산 백록담", type: "SCORE", target: 6500, moves: 40, reward: "IT_JJ_999", isAd: false, blockTheme: { name: "한라산", emojis: ["🏔️", "🌋", "🦌", "🌲", "☁️"] } }
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
        "IT_BS_008": { name: "부산 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "바다 도시를 정복한 증표" },

        // 강원도 아이템
        "IT_GW_001": { name: "춘천 닭갈비", rarity: "B", effect: "HP_HEAL", value: 15, desc: "강원도의 명물 닭갈비" },
        "IT_GW_002": { name: "속초 오징어순대", rarity: "C", effect: "ATK", value: 5, desc: "신선한 오징어 요리" },
        "IT_GW_003": { name: "강릉 커피", rarity: "B", effect: "COOLDOWN", value: -5, desc: "바다가 보이는 커피 한 잔" },
        "IT_GW_004": { name: "평창 메밀전병", rarity: "C", effect: "GOLD", value: 80, desc: "고소한 메밀의 맛" },
        "IT_GW_005": { name: "정선 곤드레밥", rarity: "A", effect: "HP_MAX", value: 50, desc: "산나물이 가득한 밥상" },
        "IT_GW_006": { name: "동해 물회", rarity: "B", effect: "HP_HEAL", value: 12, desc: "시원한 물회" },
        "IT_GW_007": { name: "막국수", rarity: "B", effect: "GOLD", value: 100, desc: "메밀로 만든 국수" },
        "IT_GW_999": { name: "강원 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "설악산을 정복한 증표" },

        // 대구 아이템
        "IT_DG_001": { name: "동인동 찜갈비", rarity: "A", effect: "ATK", value: 8, desc: "대구의 명물 찜갈비" },
        "IT_DG_002": { name: "서문시장 먹거리", rarity: "C", effect: "GOLD", value: 70, desc: "전통시장의 맛" },
        "IT_DG_003": { name: "대구 막창", rarity: "B", effect: "HP_HEAL", value: 13, desc: "쫄깃한 막창" },
        "IT_DG_004": { name: "따로국밥", rarity: "B", effect: "HP_MAX", value: 45, desc: "따로 또 같이" },
        "IT_DG_005": { name: "납작만두", rarity: "C", effect: "GOLD", value: 75, desc: "대구 스타일 만두" },
        "IT_DG_006": { name: "팔공산 약수", rarity: "A", effect: "COOLDOWN", value: -8, desc: "팔공산의 천연 약수" },
        "IT_DG_999": { name: "대구 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "대구를 정복한 증표" },

        // 인천 아이템
        "IT_IC_001": { name: "짜장면", rarity: "B", effect: "HP_HEAL", value: 14, desc: "차이나타운의 맛" },
        "IT_IC_002": { name: "신포 닭강정", rarity: "C", effect: "ATK", value: 5, desc: "달콤 매콤한 닭강정" },
        "IT_IC_003": { name: "송도 디저트", rarity: "B", effect: "GOLD", value: 90, desc: "신도시 감성" },
        "IT_IC_004": { name: "월미도 추억", rarity: "C", effect: "GOLD", value: 80, desc: "놀이공원의 추억" },
        "IT_IC_005": { name: "소래 젓갈", rarity: "A", effect: "SKILL_UP", value: 10, desc: "전통 방식의 젓갈" },
        "IT_IC_006": { name: "강화 순무", rarity: "B", effect: "HP_MAX", value: 48, desc: "강화도 특산물" },
        "IT_IC_999": { name: "인천 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "인천을 정복한 증표" },

        // 광주 아이템
        "IT_GJ_001": { name: "양동시장 먹거리", rarity: "C", effect: "GOLD", value: 70, desc: "시장 구경의 즐거움" },
        "IT_GJ_002": { name: "광주 오리탕", rarity: "A", effect: "HP_MAX", value: 52, desc: "영양 가득 오리탕" },
        "IT_GJ_003": { name: "송정 떡갈비", rarity: "B", effect: "ATK", value: 7, desc: "광주의 자랑" },
        "IT_GJ_004": { name: "무등산 약수", rarity: "B", effect: "HP_HEAL", value: 13, desc: "무등산의 천연수" },
        "IT_GJ_005": { name: "남도 한정식", rarity: "A", effect: "SKILL_UP", value: 11, desc: "정갈한 밥상" },
        "IT_GJ_999": { name: "광주 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "광주를 정복한 증표" },

        // 대전 아이템
        "IT_DJ_001": { name: "성심당 빵", rarity: "A", effect: "HP_HEAL", value: 15, desc: "대전의 명물 빵집" },
        "IT_DJ_002": { name: "은행동 칼국수", rarity: "B", effect: "HP_MAX", value: 47, desc: "진한 육수의 칼국수" },
        "IT_DJ_003": { name: "중앙시장 먹거리", rarity: "C", effect: "GOLD", value: 75, desc: "시장의 다양한 맛" },
        "IT_DJ_004": { name: "대청호 은어", rarity: "B", effect: "ATK", value: 6, desc: "은어 구이" },
        "IT_DJ_005": { name: "수목원 힐링", rarity: "B", effect: "COOLDOWN", value: -6, desc: "자연 속 휴식" },
        "IT_DJ_999": { name: "대전 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "대전을 정복한 증표" },

        // 울산 아이템
        "IT_US_001": { name: "언양불고기", rarity: "A", effect: "ATK", value: 9, desc: "불향 가득한 언양불고기" },
        "IT_US_002": { name: "대왕암 추억", rarity: "C", effect: "GOLD", value: 85, desc: "바다의 아름다움" },
        "IT_US_003": { name: "태화강 자연", rarity: "B", effect: "HP_HEAL", value: 14, desc: "생태공원의 여유" },
        "IT_US_004": { name: "울산 방어", rarity: "A", effect: "HP_MAX", value: 50, desc: "겨울 별미 방어" },
        "IT_US_999": { name: "울산 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "울산을 정복한 증표" },

        // 세종 아이템
        "IT_SJ_001": { name: "세종 한정식", rarity: "B", effect: "HP_MAX", value: 48, desc: "행정수도의 품격" },
        "IT_SJ_002": { name: "호수공원", rarity: "C", effect: "GOLD", value: 70, desc: "도심 속 호수" },
        "IT_SJ_003": { name: "조치원 떡", rarity: "C", effect: "HP_HEAL", value: 12, desc: "전통시장 떡" },
        "IT_SJ_004": { name: "연기벌 쌀", rarity: "B", effect: "HP_MAX", value: 45, desc: "비옥한 평야의 쌀" },
        "IT_SJ_999": { name: "세종 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "세종을 정복한 증표" },

        // 경기도 아이템
        "IT_GG_001": { name: "수원 왕갈비", rarity: "A", effect: "ATK", value: 9, desc: "화성의 명물 왕갈비" },
        "IT_GG_002": { name: "수원화성 증표", rarity: "A", effect: "SKILL_UP", value: 10, desc: "세계문화유산" },
        "IT_GG_003": { name: "분당 카페", rarity: "B", effect: "COOLDOWN", value: -5, desc: "신도시 카페" },
        "IT_GG_004": { name: "에버랜드 추억", rarity: "C", effect: "GOLD", value: 80, desc: "즐거운 놀이공원" },
        "IT_GG_005": { name: "일산 호수", rarity: "B", effect: "HP_HEAL", value: 13, desc: "호수공원의 여유" },
        "IT_GG_006": { name: "부대찌개", rarity: "B", effect: "HP_MAX", value: 47, desc: "의정부의 명물" },
        "IT_GG_007": { name: "임진각 평화", rarity: "B", effect: "GOLD", value: 95, desc: "평화의 메시지" },
        "IT_GG_008": { name: "가평 닭갈비", rarity: "A", effect: "ATK", value: 7, desc: "가평의 별미" },
        "IT_GG_009": { name: "평택 소머리국밥", rarity: "B", effect: "HP_MAX", value: 49, desc: "진한 소머리국밥" },
        "IT_GG_010": { name: "이천 쌀밥", rarity: "A", effect: "HP_HEAL", value: 16, desc: "이천 쌀의 고소함" },
        "IT_GG_011": { name: "안산 다문화", rarity: "B", effect: "GOLD", value: 100, desc: "세계의 맛" },
        "IT_GG_999": { name: "경기 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "경기도를 정복한 증표" },

        // 충청북도 아이템
        "IT_CB_001": { name: "청주 직지", rarity: "A", effect: "GOLD", value: 150, desc: "세계 최초 금속활자" },
        "IT_CB_002": { name: "충주댐", rarity: "B", effect: "HP_MAX", value: 46, desc: "거대한 댐" },
        "IT_CB_003": { name: "제천 약초", rarity: "A", effect: "HP_HEAL", value: 18, desc: "전통 약초" },
        "IT_CB_004": { name: "단양 마늘", rarity: "B", effect: "ATK", value: 6, desc: "단양 특산 마늘" },
        "IT_CB_005": { name: "괴산 고추", rarity: "C", effect: "ATK", value: 5, desc: "청결고추" },
        "IT_CB_999": { name: "충북 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "충북을 정복한 증표" },

        // 충청남도 아이템
        "IT_CN_001": { name: "천안 호두과자", rarity: "B", effect: "GOLD", value: 95, desc: "천안의 명물" },
        "IT_CN_002": { name: "아산 어리굴젓", rarity: "A", effect: "HP_HEAL", value: 16, desc: "전통 어리굴젓" },
        "IT_CN_003": { name: "공주 밤", rarity: "C", effect: "GOLD", value: 80, desc: "공주 알밤" },
        "IT_CN_004": { name: "백제문화", rarity: "B", effect: "COOLDOWN", value: -6, desc: "백제의 역사" },
        "IT_CN_005": { name: "보령 굴", rarity: "A", effect: "HP_MAX", value: 50, desc: "싱싱한 굴" },
        "IT_CN_006": { name: "서산 쌀", rarity: "B", effect: "HP_MAX", value: 46, desc: "간척지 쌀" },
        "IT_CN_999": { name: "충남 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "충남을 정복한 증표" },

        // 전북 아이템
        "IT_JB_001": { name: "전주 비빔밥", rarity: "SP", effect: "HP_MAX", value: 60, desc: "전주의 자랑" },
        "IT_JB_002": { name: "콩나물국밥", rarity: "B", effect: "HP_HEAL", value: 14, desc: "해장에 그만" },
        "IT_JB_003": { name: "군산 빵", rarity: "A", effect: "GOLD", value: 130, desc: "이성당의 명물" },
        "IT_JB_004": { name: "순창 고추장", rarity: "A", effect: "ATK", value: 8, desc: "전통 고추장" },
        "IT_JB_005": { name: "내장산 단풍", rarity: "B", effect: "COOLDOWN", value: -7, desc: "가을 단풍" },
        "IT_JB_006": { name: "김제 쌀", rarity: "A", effect: "HP_MAX", value: 52, desc: "지평선 쌀" },
        "IT_JB_999": { name: "전북 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "전북을 정복한 증표" },

        // 전남 아이템
        "IT_JN_001": { name: "여수 게장", rarity: "A", effect: "HP_HEAL", value: 17, desc: "여수 돌게장" },
        "IT_JN_002": { name: "순천만 갈대", rarity: "B", effect: "GOLD", value: 95, desc: "자연의 아름다움" },
        "IT_JN_003": { name: "보성 녹차", rarity: "A", effect: "COOLDOWN", value: -8, desc: "향기로운 녹차" },
        "IT_JN_004": { name: "벌교 꼬막", rarity: "B", effect: "HP_MAX", value: 48, desc: "통통한 꼬막" },
        "IT_JN_005": { name: "장흥 한우", rarity: "SP", effect: "ATK", value: 12, desc: "최고급 한우" },
        "IT_JN_006": { name: "목포 낙지", rarity: "A", effect: "HP_HEAL", value: 18, desc: "연포탕의 진미" },
        "IT_JN_007": { name: "땅끝 추억", rarity: "B", effect: "GOLD", value: 105, desc: "한반도 끝자락" },
        "IT_JN_999": { name: "전남 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "전남을 정복한 증표" },

        // 경북 아이템
        "IT_GB_001": { name: "안동 찜닭", rarity: "A", effect: "ATK", value: 9, desc: "안동의 명물" },
        "IT_GB_002": { name: "경주 빵", rarity: "B", effect: "GOLD", value: 95, desc: "황남빵" },
        "IT_GB_003": { name: "불국사 증표", rarity: "SP", effect: "SKILL_UP", value: 15, desc: "세계문화유산" },
        "IT_GB_004": { name: "포항 과메기", rarity: "A", effect: "HP_MAX", value: 53, desc: "겨울 별미" },
        "IT_GB_005": { name: "구미 소금빵", rarity: "B", effect: "HP_HEAL", value: 14, desc: "버터 향 가득" },
        "IT_GB_006": { name: "문경 오미자", rarity: "A", effect: "HP_HEAL", value: 17, desc: "다섯 가지 맛" },
        "IT_GB_007": { name: "청송 사과", rarity: "B", effect: "GOLD", value: 100, desc: "아삭한 사과" },
        "IT_GB_008": { name: "영주 한우", rarity: "A", effect: "ATK", value: 10, desc: "최고급 한우" },
        "IT_GB_999": { name: "경북 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "경북을 정복한 증표" },

        // 경남 아이템
        "IT_GN_001": { name: "통영 굴", rarity: "A", effect: "HP_MAX", value: 51, desc: "통영의 신선한 굴" },
        "IT_GN_002": { name: "진주 냉면", rarity: "B", effect: "HP_HEAL", value: 15, desc: "진주 특색 냉면" },
        "IT_GN_003": { name: "거제 멸치", rarity: "B", effect: "ATK", value: 7, desc: "거제 특산 멸치" },
        "IT_GN_004": { name: "밀양 돼지국밥", rarity: "A", effect: "HP_MAX", value: 50, desc: "진한 육수" },
        "IT_GN_005": { name: "남해 마늘", rarity: "C", effect: "ATK", value: 6, desc: "남해 특산 마늘" },
        "IT_GN_006": { name: "하동 녹차", rarity: "A", effect: "COOLDOWN", value: -7, desc: "지리산 녹차" },
        "IT_GN_007": { name: "죽방렴", rarity: "B", effect: "GOLD", value: 110, desc: "전통 어업" },
        "IT_GN_999": { name: "경남 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "경남을 정복한 증표" },

        // 제주 아이템
        "IT_JJ_001": { name: "제주 흑돼지", rarity: "SP", effect: "HP_MAX", value: 70, desc: "제주의 명물" },
        "IT_JJ_002": { name: "제주 고등어", rarity: "A", effect: "HP_HEAL", value: 18, desc: "통통한 고등어회" },
        "IT_JJ_003": { name: "제주 감귤", rarity: "B", effect: "GOLD", value: 100, desc: "달콤한 감귤" },
        "IT_JJ_004": { name: "제주 전복", rarity: "A", effect: "HP_MAX", value: 55, desc: "영양 만점 전복" },
        "IT_JJ_005": { name: "성산일출", rarity: "SP", effect: "GOLD", value: 180, desc: "아름다운 일출" },
        "IT_JJ_999": { name: "제주 증표", rarity: "Legendary", effect: "UNLOCK", value: 0, desc: "한라산을 정복한 증표" }
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
