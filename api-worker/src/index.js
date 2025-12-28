// 대동맛집지도 API - Cloudflare Workers
import { neon } from '@neondatabase/serverless';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
};

export default {
    async fetch(request, env, ctx) {
        // CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        const url = new URL(request.url);
        const path = url.pathname;

        // DB 연결
        const sql = neon(env.DATABASE_URL);

        try {
            // 헬스 체크
            if (path === '/api/health') {
                return json({ status: 'ok', time: new Date().toISOString() });
            }

            // 유저 데이터 가져오기
            if (path === '/api/user' && request.method === 'GET') {
                const uid = url.searchParams.get('uid');
                if (!uid) return json({ error: 'uid required' }, 400);

                const rows = await sql`SELECT * FROM users WHERE uid = ${uid}`;

                if (rows.length === 0) {
                    return json({ exists: false });
                }

                return json({ exists: true, user: rows[0] });
            }

            // 유저 생성/업데이트
            if (path === '/api/user' && request.method === 'POST') {
                const data = await request.json();

                if (!data.uid) return json({ error: 'uid required' }, 400);

                // Upsert
                const result = await sql`
          INSERT INTO users (uid, display_name, character_id, gold, cleared_levels, inventory, boosters)
          VALUES (
            ${data.uid}, 
            ${data.display_name || 'Player'}, 
            ${data.character_id || null},
            ${data.gold || 0},
            ${JSON.stringify(data.cleared_levels || [])},
            ${JSON.stringify(data.inventory || [])},
            ${JSON.stringify(data.boosters || {})}
          )
          ON CONFLICT (uid) DO UPDATE SET
            display_name = EXCLUDED.display_name,
            character_id = EXCLUDED.character_id,
            gold = EXCLUDED.gold,
            cleared_levels = EXCLUDED.cleared_levels,
            inventory = EXCLUDED.inventory,
            boosters = EXCLUDED.boosters,
            updated_at = CURRENT_TIMESTAMP
          RETURNING *
        `;

                return json({ success: true, user: result[0] });
            }

            // 진행상황 동기화
            if (path === '/api/sync' && request.method === 'POST') {
                const data = await request.json();

                if (!data.uid) return json({ error: 'uid required' }, 400);

                // 기존 유저 체크
                const existing = await sql`SELECT * FROM users WHERE uid = ${data.uid}`;

                if (existing.length === 0) {
                    // 신규 유저 생성
                    await sql`
            INSERT INTO users (uid, display_name, character_id, gold, cleared_levels, completed_gus, completed_dongs, inventory, boosters)
            VALUES (
              ${data.uid}, 
              ${data.displayName || 'Player'}, 
              ${data.selectedCharacter || null},
              ${data.gold || 0},
              ${JSON.stringify(data.clearedLevels || [])},
              ${JSON.stringify(data.completedGus || [])},
              ${JSON.stringify(data.completedDongs || [])},
              ${JSON.stringify(data.inventory || [])},
              ${JSON.stringify(data.boosters || {})}
            )
          `;
                } else {
                    // 기존 유저 업데이트 - 더 많은 진행 데이터로 병합
                    const existingLevels = existing[0].cleared_levels || [];
                    const newLevels = data.clearedLevels || [];
                    const mergedLevels = [...new Set([...existingLevels, ...newLevels])];

                    const existingGus = existing[0].completed_gus || [];
                    const newGus = data.completedGus || [];
                    const mergedGus = [...new Set([...existingGus, ...newGus])];

                    const existingDongs = existing[0].completed_dongs || [];
                    const newDongs = data.completedDongs || [];
                    const mergedDongs = [...new Set([...existingDongs, ...newDongs])];

                    const existingInventory = existing[0].inventory || [];
                    const newInventory = data.inventory || [];
                    const mergedInventory = [...new Set([...existingInventory, ...newInventory])];

                    await sql`
            UPDATE users SET
              character_id = COALESCE(${data.selectedCharacter}, character_id),
              gold = GREATEST(${data.gold || 0}, gold),
              cleared_levels = ${JSON.stringify(mergedLevels)},
              completed_gus = ${JSON.stringify(mergedGus)},
              completed_dongs = ${JSON.stringify(mergedDongs)},
              inventory = ${JSON.stringify(mergedInventory)},
              boosters = ${JSON.stringify(data.boosters || existing[0].boosters || {})},
              updated_at = CURRENT_TIMESTAMP
            WHERE uid = ${data.uid}
          `;
                }

                return json({
                    success: true,
                    message: 'Progress synced',
                    timestamp: new Date().toISOString()
                });
            }

            // 지역 데이터
            if (path === '/api/regions') {
                const rows = await sql`SELECT * FROM regions ORDER BY level_offset`;
                return json({ regions: rows }, 200, { 'Cache-Control': 'public, max-age=3600' });
            }

            // 시/군/구 데이터
            if (path.startsWith('/api/cities/')) {
                const regionId = path.replace('/api/cities/', '');
                const rows = await sql`SELECT * FROM cities WHERE region_id = ${regionId}`;
                return json({ cities: rows }, 200, { 'Cache-Control': 'public, max-age=3600' });
            }

            // 동 데이터
            if (path.startsWith('/api/districts/')) {
                const cityId = path.replace('/api/districts/', '');
                const rows = await sql`SELECT * FROM districts WHERE city_id = ${cityId}`;
                return json({ districts: rows }, 200, { 'Cache-Control': 'public, max-age=3600' });
            }

            return json({ error: 'Not found' }, 404);

        } catch (error) {
            console.error('API Error:', error);
            return json({ error: error.message }, 500);
        }
    }
};

function json(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...CORS_HEADERS, ...extraHeaders }
    });
}
