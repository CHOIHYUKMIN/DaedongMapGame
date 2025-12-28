const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_imK2eDbpxVs9@ep-autumn-dawn-a19595o7-pooler.ap-southeast-1.aws.neon.tech/game_data?sslmode=require';

const sql = neon(DATABASE_URL);

async function migrate() {
    console.log('🚀 데이터베이스 마이그레이션 시작...\n');

    try {
        // 1. 테이블 생성
        console.log('📦 테이블 생성 중...');

        // regions 테이블
        await sql`
      CREATE TABLE IF NOT EXISTS regions (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        name_en VARCHAR(50),
        type VARCHAR(20),
        center_lat DECIMAL(10, 6),
        center_lng DECIMAL(10, 6),
        zoom INT DEFAULT 10,
        color VARCHAR(10),
        icon VARCHAR(10),
        level_offset INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log('  ✅ regions 테이블 생성');

        // cities 테이블
        await sql`
      CREATE TABLE IF NOT EXISTS cities (
        id VARCHAR(50) PRIMARY KEY,
        region_id VARCHAR(20) REFERENCES regions(id),
        name VARCHAR(50) NOT NULL,
        center_lat DECIMAL(10, 6),
        center_lng DECIMAL(10, 6),
        zoom INT DEFAULT 12,
        color VARCHAR(10),
        icon VARCHAR(10),
        description TEXT,
        dong_count INT DEFAULT 0,
        unlock_condition VARCHAR(50) DEFAULT 'NONE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log('  ✅ cities 테이블 생성');

        // districts 테이블
        await sql`
      CREATE TABLE IF NOT EXISTS districts (
        id VARCHAR(80) PRIMARY KEY,
        city_id VARCHAR(50) REFERENCES cities(id),
        region_id VARCHAR(20) REFERENCES regions(id),
        name VARCHAR(50) NOT NULL,
        center_lat DECIMAL(10, 6),
        center_lng DECIMAL(10, 6),
        zoom INT DEFAULT 15,
        color VARCHAR(10),
        icon VARCHAR(10),
        description TEXT,
        level_count INT DEFAULT 1,
        specialties JSONB,
        unlock_condition VARCHAR(80) DEFAULT 'NONE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log('  ✅ districts 테이블 생성');

        // restaurants 테이블
        await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id VARCHAR(80) PRIMARY KEY,
        region_id VARCHAR(20) REFERENCES regions(id),
        name VARCHAR(100) NOT NULL,
        district VARCHAR(50),
        description TEXT,
        category VARCHAR(30),
        rarity VARCHAR(5) DEFAULT 'C',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log('  ✅ restaurants 테이블 생성');

        // users 테이블
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid VARCHAR(100) UNIQUE NOT NULL,
        display_name VARCHAR(100),
        character_id VARCHAR(20),
        gold INT DEFAULT 0,
        cleared_levels JSONB DEFAULT '[]',
        inventory JSONB DEFAULT '[]',
        boosters JSONB DEFAULT '{"HAMMER":0,"BOMB":0,"RAINBOW":0}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        console.log('  ✅ users 테이블 생성\n');

        // 2. 시도 데이터 추가
        console.log('🗺️ 시도 데이터 추가 중...');

        const regions = [
            { id: 'seoul', name: '서울특별시', type: '특별시', lat: 37.5665, lng: 126.9780, zoom: 11, color: '#FF6B9D', icon: '🏛️', offset: 0 },
            { id: 'busan', name: '부산광역시', type: '광역시', lat: 35.1796, lng: 129.0756, zoom: 11, color: '#4ECDC4', icon: '🌊', offset: 10 },
            { id: 'daegu', name: '대구광역시', type: '광역시', lat: 35.8714, lng: 128.6014, zoom: 11, color: '#FF9800', icon: '🍎', offset: 26 },
            { id: 'incheon', name: '인천광역시', type: '광역시', lat: 37.4563, lng: 126.7052, zoom: 11, color: '#2196F3', icon: '✈️', offset: 33 },
            { id: 'gwangju', name: '광주광역시', type: '광역시', lat: 35.1595, lng: 126.8526, zoom: 11, color: '#9C27B0', icon: '🎨', offset: 40 },
            { id: 'daejeon', name: '대전광역시', type: '광역시', lat: 36.3504, lng: 127.3845, zoom: 11, color: '#4CAF50', icon: '🔬', offset: 46 },
            { id: 'ulsan', name: '울산광역시', type: '광역시', lat: 35.5384, lng: 129.3114, zoom: 11, color: '#607D8B', icon: '🏭', offset: 52 },
            { id: 'sejong', name: '세종특별자치시', type: '특별자치시', lat: 36.4800, lng: 127.2890, zoom: 11, color: '#00BCD4', icon: '🏛️', offset: 57 },
            { id: 'gyeonggi', name: '경기도', type: '도', lat: 37.4138, lng: 127.5183, zoom: 9, color: '#8BC34A', icon: '🏙️', offset: 62 },
            { id: 'gangwon', name: '강원특별자치도', type: '특별자치도', lat: 37.8228, lng: 128.1555, zoom: 9, color: '#03A9F4', icon: '🏔️', offset: 74 },
            { id: 'chungbuk', name: '충청북도', type: '도', lat: 36.6357, lng: 127.4914, zoom: 9, color: '#FFEB3B', icon: '🌾', offset: 80 },
            { id: 'chungnam', name: '충청남도', type: '도', lat: 36.6588, lng: 126.6728, zoom: 9, color: '#FFC107', icon: '🦪', offset: 87 },
            { id: 'jeonbuk', name: '전북특별자치도', type: '특별자치도', lat: 35.8203, lng: 127.1080, zoom: 9, color: '#E91E63', icon: '🍚', offset: 94 },
            { id: 'jeonnam', name: '전라남도', type: '도', lat: 34.8161, lng: 126.4629, zoom: 9, color: '#673AB7', icon: '🐙', offset: 101 },
            { id: 'gyeongbuk', name: '경상북도', type: '도', lat: 36.4919, lng: 128.8889, zoom: 9, color: '#3F51B5', icon: '🏛️', offset: 109 },
            { id: 'gyeongnam', name: '경상남도', type: '도', lat: 35.4606, lng: 128.2132, zoom: 9, color: '#009688', icon: '🌸', offset: 118 },
            { id: 'jeju', name: '제주특별자치도', type: '특별자치도', lat: 33.4996, lng: 126.5312, zoom: 10, color: '#FF5722', icon: '🍊', offset: 127 }
        ];

        for (const r of regions) {
            await sql`
        INSERT INTO regions (id, name, type, center_lat, center_lng, zoom, color, icon, level_offset)
        VALUES (${r.id}, ${r.name}, ${r.type}, ${r.lat}, ${r.lng}, ${r.zoom}, ${r.color}, ${r.icon}, ${r.offset})
        ON CONFLICT (id) DO UPDATE SET name = ${r.name}
      `;
        }
        console.log(`  ✅ ${regions.length}개 시도 추가 완료\n`);

        // 3. 테스트 쿼리
        console.log('🔍 데이터 확인...');
        const result = await sql`SELECT COUNT(*) as count FROM regions`;
        console.log(`  ✅ regions 테이블: ${result[0].count}개 레코드\n`);

        console.log('🎉 마이그레이션 완료!');

    } catch (error) {
        console.error('❌ 오류:', error.message);
        console.error(error);
    }
}

migrate();
