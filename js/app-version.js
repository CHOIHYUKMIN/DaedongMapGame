// 앱 버전 관리 - 이 파일만 수정하면 모든 스크립트 캐시가 무효화됨
const APP_VERSION = '1.7.2';

// 버전 정보
const VersionInfo = {
    version: APP_VERSION,
    buildDate: '2025-12-28',
    changes: [
        '📦 DataLoader 시스템 추가 (비동기 JSON 데이터 로딩)',
        '⚡ PerformanceUtils 추가 (성능 최적화 유틸리티)',
        '🗺️ 전국 17개 시도 + 229개 시/군/구 데이터 완성',
        '🍽️ 17개 지역 맛집 데이터 추가 (121개)',
        '🏘️ 전국 206개 동 데이터 완성',
        '🔧 game.js DataLoader 통합 초기화 추가',
        '🐘 Neon PostgreSQL 데이터베이스 연동',
        '🔐 Firebase Auth 로그인 시스템 추가',
        '☁️ 클라우드 진행상황 저장/동기화',
        '🎮 점수 계산 4단계 애니메이션 개선'
    ]
};

console.log(`🎮 대동맛지도 v${APP_VERSION} 로드됨`);
