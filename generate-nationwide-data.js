// 전국 레벨 및 아이템 데이터 자동 생성 스크립트

const fs = require('fs');

// 지역별 정보
const regions = [
    // 이미 완료된 지역
    { id: 'seoul', name: '서울', levels: 10, startId: 1, done: true },
    { id: 'busan', name: '부산', levels: 8, startId: 11, done: true },
    
    // 추가할 지역
    { id: 'gangwon', name: '강원', icon: '⛰️', levels: 8, startId: 19, specialty: ['막국수', '닭갈비', '황태구이', '감자옹심이', '오징어순대', '곤드레밥', '메밀전병', '강원 증표'] },
    { id: 'daegu', name: '대구', icon: '🍎', levels: 7, startId: 27, specialty: ['막창', '따로국밥', '동인동찜갈비', '납작만두', '뭉티기', '대구 육개장', '대구 증표'] },
    { id: 'incheon', name: '인천', icon: '✈️', levels: 7, startId: 34, specialty: ['차이나타운 짜장면', '신포 닭강정', '연평도 꽃게', '소래 젓갈', '만두', '냉면', '인천 증표'] },
    { id: 'gwangju', name: '광주', icon: '🎨', levels: 6, startId: 41, specialty: ['오리탕', '떡갈비', '무등산 보리밥', '송정 떡갈비', '곰탕', '광주 증표'] },
    { id: 'daejeon', name: '대전', icon: '🔬', levels: 6, startId: 47, specialty: ['칼국수', '성심당 빵', '은어구이', '대전 육칼', '튀김소보로', '대전 증표'] },
    { id: 'ulsan', name: '울산', icon: '🏭', levels: 5, startId: 53, specialty: ['언양불고기', '대게', '방어회', '울산 돼지국밥', '울산 증표'] },
    { id: 'sejong', name: '세종', icon: '🏢', levels: 5, startId: 58, specialty: ['한정식', '떡갈비', '연근조림', '쌈밥', '세종 증표'] },
    { id: 'gyeonggi', name: '경기', icon: '🌆', levels: 12, startId: 63, specialty: ['수원 왕갈비', '전곡리 막국수', '광주 곤드레밥', '평택 소머리국밥', '의정부 부대찌개', '가평 닭갈비', '안성 남사당', '여주 고구마', '파주 장단콩', '이천 쌀밥', '용인 백암순대', '경기 증표'] },
    { id: 'chungbuk', name: '충북', icon: '🏔️', levels: 6, startId: 75, specialty: ['청주 직지', '충주 사과', '제천 약초', '옥천 장어', '괴산 청결고추', '충북 증표'] },
    { id: 'chungnam', name: '충남', icon: '🌾', levels: 7, startId: 81, specialty: ['아산 어리굴젓', '공주 밤', '보령 굴', '천안 호두과자', '서산 어리굴젓', '예산 사과', '충남 증표'] },
    { id: 'jeonbuk', name: '전북', icon: '🍚', levels: 7, startId: 88, specialty: ['전주 비빔밥', '콩나물국밥', '한정식', '전주 막걸리', '모주', '순창 고추장', '전북 증표'] },
    { id: 'jeonnam', name: '전남', icon: '🌊', levels: 8, startId: 95, specialty: ['꼬막', '낙지연포탕', '무안 양파', '해남 고구마', '보성 녹차', '장흥 한우', '여수 게장', '전남 증표'] },
    { id: 'gyeongbuk', name: '경북', icon: '🏯', levels: 9, startId: 103, specialty: ['안동 찜닭', '경주 빵', '영주 한우', '포항 과메기', '구미 왕소금빵', '문경 오미자', '청송 사과', '경산 대추', '경북 증표'] },
    { id: 'gyeongnam', name: '경남', icon: '🏖️', levels: 8, startId: 112, specialty: ['통영 굴', '진주 냉면', '밀양 돼지국밥', '거제 멸치', '사천 죽방렴', '남해 마늘', '함안 수박', '경남 증표'] },
    { id: 'jeju', name: '제주', icon: '🍊', levels: 6, startId: 120, specialty: ['흑돼지', '고등어회', '감귤', '한라봉', '전복죽', '제주 증표'] }
];

// 레벨 데이터 생성
function generateLevels() {
    let levels = [];
    
    regions.forEach(region => {
        if (region.done) return; // 이미 완료된 지역은 스킵
        
        for (let i = 0; i < region.levels; i++) {
            const levelId = region.startId + i;
            const isLastLevel = i === region.levels - 1;
            const itemId = isLastLevel ? `IT_${region.id.toUpperCase()}_999` : `IT_${region.id.toUpperCase()}_${String(i + 1).padStart(3, '0')}`;
            
            const level = {
                id: levelId,
                name: `${region.name} ${region.specialty[i]}`,
                regionName: `${region.name} ${region.specialty[i]}`,
                type: isLastLevel ? 'BOSS' : (i % 3 === 0 ? 'SCORE' : 'COLLECT'),
                target: isLastLevel ? 1 : (i % 3 === 0 ? 3000 + i * 500 : 10 + i * 2),
                moves: 20 + i * 2,
                reward: itemId,
                isAd: false,
                blockTheme: {
                    name: `${region.specialty[i]}`,
                    emojis: getEmojisForRegion(region.id, i)
                }
            };
            
            levels.push(level);
        }
    });
    
    return levels;
}

// 아이템 데이터 생성
function generateItems() {
    let items = {};
    
    regions.forEach(region => {
        if (region.done) return;
        
        for (let i = 0; i < region.levels; i++) {
            const isLastLevel = i === region.levels - 1;
            const itemId = isLastLevel ? `IT_${region.id.toUpperCase()}_999` : `IT_${region.id.toUpperCase()}_${String(i + 1).padStart(3, '0')}`;
            const rarity = isLastLevel ? 'Legendary' : (i % 4 === 0 ? 'A' : (i % 3 === 0 ? 'B' : 'C'));
            const effect = getRarityEffect(rarity, isLastLevel);
            
            items[itemId] = {
                name: region.specialty[i],
                rarity: rarity,
                effect: effect.type,
                value: effect.value,
                desc: `${region.name}의 명물 ${region.specialty[i]}`
            };
        }
    });
    
    return items;
}

// 맛집 풀 데이터 생성
function generateRestaurantPools() {
    let pools = {};
    
    regions.forEach(region => {
        if (region.done) return;
        
        for (let i = 0; i < region.levels; i++) {
            const levelId = region.startId + i;
            const isLastLevel = i === region.levels - 1;
            const itemId = isLastLevel ? `IT_${region.id.toUpperCase()}_999` : `IT_${region.id.toUpperCase()}_${String(i + 1).padStart(3, '0')}`;
            
            pools[levelId] = {
                name: `${region.name} ${region.specialty[i]}`,
                restaurants: [
                    {
                        itemId: itemId,
                        name: region.specialty[i],
                        restaurant: `${region.name} ${region.specialty[i]} 맛집`,
                        rarity: isLastLevel ? 'Legendary' : (i % 4 === 0 ? 'A' : (i % 3 === 0 ? 'B' : 'C')),
                        address: `${region.name} 대표 맛집`,
                        phone: `0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 8999) + 1000}-${Math.floor(Math.random() * 8999) + 1000}`,
                        category: getCategoryForFood(region.specialty[i]),
                        description: `${region.name}의 대표 ${region.specialty[i]} 맛집`,
                        naverPlaceId: `${levelId}000001`,
                        kakaoPlaceId: `${levelId + 1000000}`
                    }
                ]
            };
        }
    });
    
    return pools;
}

// 보조 함수들
function getEmojisForRegion(regionId, index) {
    const emojiSets = {
        gangwon: [['🏔️', '🌲', '❄️', '🎿', '🏂'], ['🍜', '🥘', '🍲', '🥟', '🍱'], ['🐟', '🦑', '🐙', '🦐', '🦀'], ['🥔', '🌽', '🥕', '🥬', '🍠'], ['🌊', '⛰️', '🏖️', '🌅', '🌄']],
        daegu: [['🍎', '🍑', '🍇', '🍊', '🍓'], ['🍖', '🥘', '🍲', '🥟', '🍜'], ['🏙️', '🏢', '🌆', '🎪', '🎭']],
        incheon: [['✈️', '🛫', '🚢', '⚓', '🌊'], ['🍜', '🥟', '🍱', '🍲', '🥘'], ['🦀', '🦐', '🐙', '🦑', '🐟']],
        gwangju: [['🎨', '🖼️', '🎭', '🏛️', '📚'], ['🍖', '🥘', '🍲', '🍜', '🥟']],
        daejeon: [['🔬', '🧪', '🧬', '⚗️', '🔭'], ['🍞', '🥐', '🥖', '🧁', '🍰'], ['🍜', '🥘', '🍲', '🥟', '🍱']],
        ulsan: [['🏭', '🚗', '🚢', '⚓', '🌊'], ['🍖', '🥘', '🦀', '🐟', '🦐']],
        sejong: [['🏢', '🏛️', '📋', '📊', '💼'], ['🍖', '🥘', '🍲', '🥟', '🍜']],
        gyeonggi: [['🌆', '🏢', '🏙️', '🌃', '🎡'], ['🍖', '🥘', '🍲', '🍜', '🥟']],
        chungbuk: [['🏔️', '⛰️', '🌲', '🍃', '🌳'], ['🍎', '🥘', '🍲', '🥟', '🍜']],
        chungnam: [['🌾', '🌊', '⛵', '🏖️', '🐚'], ['🦪', '🥘', '🍲', '🥟', '🍜']],
        jeonbuk: [['🍚', '🥘', '🍲', '🍜', '🥟'], ['🏮', '🎭', '🏛️', '📚', '🖼️']],
        jeonnam: [['🌊', '🏖️', '⛵', '🐚', '🦀'], ['🦑', '🐙', '🦐', '🐟', '🦪']],
        gyeongbuk: [['🏯', '⛩️', '🏛️', '📚', '🎭'], ['🍖', '🥘', '🍲', '🍜', '🥟']],
        gyeongnam: [['🏖️', '🌊', '⛵', '🐚', '🦀'], ['🦪', '🍜', '🥘', '🍲', '🥟']],
        jeju: [['🍊', '🌺', '🌴', '🏝️', '🌊'], ['🐷', '🐟', '🦑', '🐙', '🦐']]
    };
    
    const set = emojiSets[regionId] || [['🍽️', '🍴', '🥢', '🍱', '🥘']];
    return set[index % set.length];
}

function getRarityEffect(rarity, isLegendary) {
    if (isLegendary) return { type: 'UNLOCK', value: 0 };
    
    const effects = {
        'A': [{ type: 'SKILL_UP', value: 10 }, { type: 'HP_MAX', value: 50 }, { type: 'GOLD', value: 150 }],
        'B': [{ type: 'ATK', value: 5 }, { type: 'COOLDOWN', value: -5 }, { type: 'GOLD', value: 100 }],
        'C': [{ type: 'HP_HEAL', value: 10 }, { type: 'GOLD', value: 50 }]
    };
    
    const options = effects[rarity] || effects['C'];
    return options[Math.floor(Math.random() * options.length)];
}

function getCategoryForFood(food) {
    if (food.includes('증표')) return '관광지';
    if (food.includes('빵') || food.includes('과자') || food.includes('떡')) return '디저트';
    if (food.includes('갈비') || food.includes('불고기') || food.includes('국밥')) return '한식';
    if (food.includes('회') || food.includes('굴') || food.includes('게')) return '해산물';
    if (food.includes('막걸리') || food.includes('주')) return '전통주';
    return '한식';
}

// 데이터 생성 및 저장
const newLevels = generateLevels();
const newItems = generateItems();
const newPools = generateRestaurantPools();

// JSON 형식으로 출력
console.log('// === 추가 레벨 데이터 ===');
console.log(JSON.stringify(newLevels, null, 8).replace(/"(\w+)":/g, '$1:'));

console.log('\n\n// === 추가 아이템 데이터 ===');
console.log(JSON.stringify(newItems, null, 8).replace(/"(\w+)":/g, '$1:'));

console.log('\n\n// === 추가 맛집 풀 데이터 ===');
console.log(JSON.stringify(newPools, null, 8).replace(/"(\w+)":/g, '$1:'));

console.log(`\n\n총 ${newLevels.length}개의 레벨이 생성되었습니다.`);
