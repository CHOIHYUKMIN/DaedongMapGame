# deploy.ps1
# 배포 자동화 스크립트 - 버전 동기화 + Firebase 배포
# 사용법: .\deploy.ps1 [-BumpMinor] [-BumpPatch] [-Version "1.7.4"]

param(
    [switch]$BumpMinor,
    [switch]$BumpPatch,
    [string]$Version
)

# PowerShell 콘솔 인코딩을 UTF-8로 설정 (한글 깨짐 방지)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 | Out-Null

# version.js에서 현재 버전 읽기
$versionFile = Get-Content "version.js" -Raw -Encoding UTF8
if ($versionFile -match "APP_VERSION = '([^']+)'") {
    $currentVersion = $Matches[1]
    Write-Host "현재 버전: v$currentVersion" -ForegroundColor Cyan
}
else {
    Write-Host "오류: version.js에서 버전을 찾을 수 없습니다" -ForegroundColor Red
    exit 1
}

# 새 버전 결정
if ($Version) {
    $newVersion = $Version
}
elseif ($BumpMinor) {
    $parts = $currentVersion -split '\.'
    $parts[1] = [int]$parts[1] + 1
    $parts[2] = 0
    $newVersion = $parts -join '.'
}
elseif ($BumpPatch) {
    $parts = $currentVersion -split '\.'
    $parts[2] = [int]$parts[2] + 1
    $newVersion = $parts -join '.'
}
else {
    # 버전 변경 없이 현재 버전으로 배포
    $newVersion = $currentVersion
}

$currentDate = Get-Date -Format "yyyy-MM-dd"

Write-Host ""
Write-Host "===========================================" -ForegroundColor Magenta
Write-Host "  대동맛지도 배포 v$newVersion" -ForegroundColor Magenta
Write-Host "===========================================" -ForegroundColor Magenta
Write-Host ""

# 1. version.js 업데이트
Write-Host "[1/3] version.js 업데이트..." -ForegroundColor Yellow
$versionContent = @"
// 버전 관리 및 캐시 버스터
const APP_VERSION = '$newVersion';
const BUILD_DATE = '$currentDate';

// 버전 정보를 콘솔에 출력
console.log(`%c🍽️ 말랑말랑 대동맛지도 v`${APP_VERSION}`, 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log(`%c📅 Build: `${BUILD_DATE}`, 'color: #764ba2; font-size: 12px;');

// 전역 버전 정보
window.APP_VERSION = APP_VERSION;
window.BUILD_DATE = BUILD_DATE;

// 캐시 버스터 함수 - 동적 스크립트/스타일 로드 시 사용
window.getCacheBuster = function() {
    return ``v=`${APP_VERSION}``;
};
"@
$versionContent | Set-Content "version.js" -NoNewline -Encoding UTF8
Write-Host "  완료" -ForegroundColor Green

# 2. index.html 캐시 버스터 업데이트
Write-Host "[2/3] index.html 캐시 버스터 동기화..." -ForegroundColor Yellow
$htmlContent = Get-Content "index.html" -Raw -Encoding UTF8
$htmlContent = $htmlContent -replace "\?v=[0-9]+\.[0-9]+\.[0-9]+", "?v=$newVersion"
$htmlContent = $htmlContent -replace '<div class="version">v[0-9]+\.[0-9]+\.[0-9]+</div>', "<div class=`"version`">v$newVersion</div>"
$htmlContent | Set-Content "index.html" -NoNewline -Encoding UTF8
Write-Host "  완료" -ForegroundColor Green

# 3. Firebase 배포
Write-Host "[3/3] Firebase 배포..." -ForegroundColor Yellow
npx firebase-tools deploy --only hosting --project daedongmapgame

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "  배포 완료! v$newVersion" -ForegroundColor Green
Write-Host "  URL: https://daedongmapgame.web.app" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Green
