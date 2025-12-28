const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'postgresql://neondb_owner:npg_imK2eDbpxVs9@ep-autumn-dawn-a19595o7-pooler.ap-southeast-1.aws.neon.tech/game_data?sslmode=require';
const sql = neon(DATABASE_URL);

const DATA_DIR = path.join(__dirname, '..', 'data');

async function seedCities() {
    console.log('\n🏙️ 시/군/구 데이터 추가 중...');

    const citiesDir = path.join(DATA_DIR, 'cities');
    const files = fs.readdirSync(citiesDir).filter(f => f.endsWith('.json'));

    let count = 0;

    for (const file of files) {
        const regionId = file.replace('.json', '');
        const data = JSON.parse(fs.readFileSync(path.join(citiesDir, file), 'utf8'));
        const cities = data.cities || data.districts || [];

        for (const city of cities) {
            try {
                await sql`
          INSERT INTO cities (id, region_id, name, center_lat, center_lng, zoom, color, icon, description, dong_count, unlock_condition)
          VALUES (
            ${city.id}, 
            ${regionId}, 
            ${city.name}, 
            ${city.center[0]}, 
            ${city.center[1]}, 
            ${city.zoom || 13}, 
            ${city.color || '#FF6B6B'}, 
            ${city.icon || '📍'}, 
            ${city.description || ''}, 
            ${city.dongCount || 0}, 
            ${city.unlockCondition || 'NONE'}
          )
          ON CONFLICT (id) DO UPDATE SET name = ${city.name}
        `;
                count++;
            } catch (e) {
                console.log(`  ⚠️ ${city.id}: ${e.message.slice(0, 50)}`);
            }
        }
        console.log(`  📁 ${file}: ${cities.length}개`);
    }

    console.log(`  ✅ 총 ${count}개 시/군/구 추가 완료`);
}

async function seedDistricts() {
    console.log('\n🏘️ 동/읍/면 데이터 추가 중...');

    const districtsDir = path.join(DATA_DIR, 'districts');
    const regions = fs.readdirSync(districtsDir).filter(f =>
        fs.statSync(path.join(districtsDir, f)).isDirectory()
    );

    let count = 0;

    for (const regionId of regions) {
        const regionDir = path.join(districtsDir, regionId);
        const files = fs.readdirSync(regionDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const data = JSON.parse(fs.readFileSync(path.join(regionDir, file), 'utf8'));
            const neighborhoods = data.neighborhoods || [];
            const cityId = data.districtId;

            for (const dong of neighborhoods) {
                try {
                    await sql`
            INSERT INTO districts (id, city_id, region_id, name, center_lat, center_lng, zoom, color, icon, description, level_count, specialties, unlock_condition)
            VALUES (
              ${dong.id}, 
              ${cityId}, 
              ${regionId}, 
              ${dong.name}, 
              ${dong.center[0]}, 
              ${dong.center[1]}, 
              ${dong.zoom || 15}, 
              ${dong.color || '#FF6B6B'}, 
              ${dong.icon || '📍'}, 
              ${dong.description || ''}, 
              ${dong.levelCount || 1},
              ${JSON.stringify(dong.specialties || [])},
              ${dong.unlockCondition || 'NONE'}
            )
            ON CONFLICT (id) DO UPDATE SET name = ${dong.name}
          `;
                    count++;
                } catch (e) {
                    console.log(`  ⚠️ ${dong.id}: ${e.message.slice(0, 50)}`);
                }
            }
        }
        console.log(`  📁 ${regionId}: ${files.length}개 파일`);
    }

    console.log(`  ✅ 총 ${count}개 동/읍/면 추가 완료`);
}

async function seedRestaurants() {
    console.log('\n🍽️ 맛집 데이터 추가 중...');

    const restaurantsDir = path.join(DATA_DIR, 'restaurants');
    const files = fs.readdirSync(restaurantsDir).filter(f => f.endsWith('.json'));

    let count = 0;

    for (const file of files) {
        const regionId = file.replace('.json', '');
        const data = JSON.parse(fs.readFileSync(path.join(restaurantsDir, file), 'utf8'));
        const restaurants = data.restaurants || [];

        for (const r of restaurants) {
            try {
                await sql`
          INSERT INTO restaurants (id, region_id, name, district, description, category, rarity)
          VALUES (
            ${r.id || `${regionId}_${r.name.replace(/\s/g, '_')}`}, 
            ${regionId}, 
            ${r.name}, 
            ${r.district || r.location || ''}, 
            ${r.description || r.menu || ''}, 
            ${r.category || '한식'},
            ${r.rarity || 'C'}
          )
          ON CONFLICT (id) DO UPDATE SET name = ${r.name}
        `;
                count++;
            } catch (e) {
                console.log(`  ⚠️ ${r.name}: ${e.message.slice(0, 50)}`);
            }
        }
        console.log(`  📁 ${file}: ${restaurants.length}개`);
    }

    console.log(`  ✅ 총 ${count}개 맛집 추가 완료`);
}

async function showStats() {
    console.log('\n📊 최종 통계:');

    const regions = await sql`SELECT COUNT(*) as count FROM regions`;
    const cities = await sql`SELECT COUNT(*) as count FROM cities`;
    const districts = await sql`SELECT COUNT(*) as count FROM districts`;
    const restaurants = await sql`SELECT COUNT(*) as count FROM restaurants`;

    console.log(`  • regions: ${regions[0].count}개`);
    console.log(`  • cities: ${cities[0].count}개`);
    console.log(`  • districts: ${districts[0].count}개`);
    console.log(`  • restaurants: ${restaurants[0].count}개`);
}

async function main() {
    console.log('🚀 전체 데이터 마이그레이션 시작...');

    try {
        await seedCities();
        await seedDistricts();
        await seedRestaurants();
        await showStats();

        console.log('\n🎉 전체 마이그레이션 완료!');
    } catch (error) {
        console.error('❌ 오류:', error);
    }
}

main();
