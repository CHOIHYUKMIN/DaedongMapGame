# update-version.ps1
# 버전 자동 업데이트 스크립트
# 사용법: .\update-version.ps1 -NewVersion "1.7.4"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion
)

# 버전 형식 검증
if ($NewVersion -notmatch '^\d+\.\d+\.\d+$') {
    Write-Host "오류: 버전은 X.Y.Z 형식이어야 합니다 (예: 1.7.3)" -ForegroundColor Red
    exit 1
}

Write-Host "버전 업데이트 시작: v$NewVersion" -ForegroundColor Cyan

# 현재 날짜
$currentDate = Get-Date -Format "yyyy-MM-dd"

# 1. version.js 업데이트
Write-Host "version.js 업데이트 중..." -ForegroundColor Yellow
$versionContent = Get-Content "version.js" -Raw -Encoding UTF8
$versionContent = $versionContent -replace "APP_VERSION = '[^']+'", "APP_VERSION = '$NewVersion'"
$versionContent = $versionContent -replace "BUILD_DATE = '[^']+'", "BUILD_DATE = '$currentDate'"
$versionContent | Set-Content "version.js" -NoNewline -Encoding UTF8
Write-Host "  version.js 업데이트 완료" -ForegroundColor Green

# 2. index.html 캐시 버스터 업데이트
Write-Host "index.html 캐시 버스터 업데이트 중..." -ForegroundColor Yellow
$htmlContent = Get-Content "index.html" -Raw -Encoding UTF8
$htmlContent = $htmlContent -replace "\?v=[0-9]+\.[0-9]+\.[0-9]+", "?v=$NewVersion"
# HTML 내 버전 표시도 업데이트
$htmlContent = $htmlContent -replace '<div class="version">v[0-9]+\.[0-9]+\.[0-9]+</div>', "<div class=`"version`">v$NewVersion</div>"
$htmlContent | Set-Content "index.html" -NoNewline -Encoding UTF8
Write-Host "  index.html 업데이트 완료" -ForegroundColor Green

# 완료 메시지
Write-Host ""
Write-Host "버전 업데이트 완료!" -ForegroundColor Green
Write-Host "  버전: v$NewVersion" -ForegroundColor Cyan
Write-Host "  날짜: $currentDate" -ForegroundColor Cyan
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Yellow
Write-Host "  1. git add ." -ForegroundColor White
Write-Host "  2. git commit -m `"chore: bump version to v$NewVersion`"" -ForegroundColor White
Write-Host "  3. npx firebase-tools deploy --only hosting --project daedongmapgame" -ForegroundColor White
Write-Host ""
