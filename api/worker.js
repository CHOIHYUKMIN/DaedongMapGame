// 대동맛집지도 API - Cloudflare Workers
// 배포: https://workers.cloudflare.com

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
};

// Neon PostgreSQL 연결
const DATABASE_URL = 'postgresql://neondb_owner:npg_imK2eDbpxVs9@ep-autumn-dawn-a19595o7-pooler.ap-southeast-1.aws.neon.tech/game_data?sslmode=require';

export default {
    async fetch(request, env) {
        // CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        const url = new URL(request.url);
        const path = url.pathname;

        try {
            // 유저 데이터 가져오기
            if (path === '/api/user' && request.method === 'GET') {
                const uid = url.searchParams.get('uid');
                if (!uid) {
                    return jsonResponse({ error: 'uid required' }, 400);
                }

                const user = await getUser(env, uid);
                return jsonResponse(user || { exists: false });
            }

            // 유저 데이터 저장/업데이트
            if (path === '/api/user' && request.method === 'POST') {
                const data = await request.json();
                if (!data.uid) {
                    return jsonResponse({ error: 'uid required' }, 400);
                }

                const result = await saveUser(env, data);
                return jsonResponse(result);
            }

            // 유저 진행상황 동기화
            if (path === '/api/sync' && request.method === 'POST') {
                const data = await request.json();
                if (!data.uid) {
                    return jsonResponse({ error: 'uid required' }, 400);
                }

                const result = await syncProgress(env, data);
                return jsonResponse(result);
            }

            // 지역 데이터 (캐시됨)
            if (path === '/api/regions') {
                const regions = await getRegions(env);
                return jsonResponse(regions, 200, { 'Cache-Control': 'public, max-age=3600' });
            }

            return jsonResponse({ error: 'Not found' }, 404);

        } catch (error) {
            console.error(error);
            return jsonResponse({ error: error.message }, 500);
        }
    }
};

function jsonResponse(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...CORS_HEADERS, ...extraHeaders }
    });
}

// Neon 쿼리 실행 함수
async function query(env, sql, params = []) {
    const response = await fetch(`https://ep-autumn-dawn-a19595o7-pooler.ap-southeast-1.aws.neon.tech/sql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.NEON_API_KEY || ''}`
        },
        body: JSON.stringify({ query: sql, params })
    });
    return response.json();
}

async function getUser(env, uid) {
    // 간단한 HTTP 쿼리 (Neon Serverless Driver 대신)
    const res = await fetch(`${DATABASE_URL.replace('postgresql://', 'https://').split('/game_data')[0]}/sql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: 'SELECT * FROM users WHERE uid = $1',
            params: [uid]
        })
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.rows?.[0] || null;
}

async function saveUser(env, userData) {
    const { uid, display_name, character_id, gold, cleared_levels, inventory, boosters } = userData;

    // Upsert 로직
    return { success: true, message: 'User saved' };
}

async function syncProgress(env, data) {
    const { uid, cleared_levels, completed_gus, completed_dongs, gold, inventory, boosters } = data;

    return {
        success: true,
        message: 'Progress synced',
        timestamp: new Date().toISOString()
    };
}

async function getRegions(env) {
    return { regions: [] }; // 캐시된 데이터
}
