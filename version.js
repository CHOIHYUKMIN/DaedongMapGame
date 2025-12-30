// 버전 관리 및 캐시 버스터
const APP_VERSION = '1.7.3';
const BUILD_DATE = '2025-12-30';

// 버전 정보를 콘솔에 출력
console.log(`%c🍽️ 말랑말랑 대동맛지도 v${APP_VERSION}`, 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log(`%c📅 Build: ${BUILD_DATE}`, 'color: #764ba2; font-size: 12px;');

// 전역 버전 정보
window.APP_VERSION = APP_VERSION;
window.BUILD_DATE = BUILD_DATE;

// 캐시 버스터 함수 - 동적 스크립트/스타일 로드 시 사용
window.getCacheBuster = function () {
    return `v=${APP_VERSION}`;
};