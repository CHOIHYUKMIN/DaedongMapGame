# 버전 관리 가이드

## 현재 버전: v1.1.0

### 버전 업데이트 방법

새 기능을 추가하거나 버그를 수정한 후 캐시 문제를 방지하기 위해 버전을 업데이트하세요.

#### 1. version.js 업데이트
```javascript
const APP_VERSION = '1.2.0'; // <- 여기를 변경
const BUILD_DATE = '2025-12-21'; // <- 배포 날짜로 변경
```

#### 2. index.html 업데이트
모든 CSS와 JS 파일의 `?v=` 파라미터를 새 버전으로 변경:

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css?v=1.2.0">
<link rel="stylesheet" href="css/mobile.css?v=1.2.0">
<!-- ... 나머지 CSS 파일도 동일하게 -->

<!-- JavaScript -->
<script src="version.js?v=1.2.0"></script>
<script src="js/data.js?v=1.2.0"></script>
<!-- ... 나머지 JS 파일도 동일하게 -->
```

#### 3. 자동 업데이트 스크립트 (선택사항)

PowerShell 스크립트로 버전 자동 업데이트:

```powershell
# update-version.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion
)

# version.js 업데이트
(Get-Content version.js) -replace "APP_VERSION = '[^']+'", "APP_VERSION = '$NewVersion'" | Set-Content version.js

# 현재 날짜로 BUILD_DATE 업데이트
$currentDate = Get-Date -Format "yyyy-MM-dd"
(Get-Content version.js) -replace "BUILD_DATE = '[^']+'", "BUILD_DATE = '$currentDate'" | Set-Content version.js

# index.html의 모든 ?v= 파라미터 업데이트
(Get-Content index.html) -replace "\?v=[0-9]+\.[0-9]+\.[0-9]+", "?v=$NewVersion" | Set-Content index.html

Write-Host "✅ 버전이 $NewVersion 으로 업데이트되었습니다!" -ForegroundColor Green
```

사용법:
```powershell
.\update-version.ps1 -NewVersion "1.2.0"
```

## 버전 번호 규칙 (Semantic Versioning)

`MAJOR.MINOR.PATCH` (예: 1.2.3)

- **MAJOR (주 버전)**: 호환되지 않는 대규모 변경
  - 예: 1.x.x → 2.0.0
  
- **MINOR (부 버전)**: 새 기능 추가 (하위 호환)
  - 예: 1.1.0 → 1.2.0
  
- **PATCH (패치)**: 버그 수정
  - 예: 1.1.0 → 1.1.1

## 변경 이력

### v1.1.0 (2025-12-21)
- ✨ 캐릭터 커스터마이징 시스템 추가
  - 6개 카테고리 코스튬 시스템
  - 17종 코스튬 아이템
  - 레이어 기반 Canvas 합성
  - 잠금 해제 조건 시스템
  - 스탯 보너스 시스템
- 🔧 캐시 버스팅 시스템 추가

### v1.0.0 (2025-12-XX)
- 🎉 초기 출시
- 3-Match 퍼즐 게임
- 서울/경기 지도 탐험
- 10종 캐릭터 시스템
- 아이템 수집 시스템

## 배포 체크리스트

배포 전 확인사항:

- [ ] version.js에서 버전 번호 업데이트
- [ ] version.js에서 빌드 날짜 업데이트
- [ ] index.html의 모든 CSS/JS 파일에 새 버전 파라미터 추가
- [ ] CHANGELOG.md 업데이트 (있는 경우)
- [ ] Git 커밋 메시지에 버전 명시
- [ ] 로컬 테스트 완료
- [ ] Git push
- [ ] Firebase deploy
- [ ] 배포 후 실제 URL에서 버전 확인 (F12 콘솔에서 APP_VERSION 확인)

## 배포 후 버전 확인

브라우저 개발자 도구 콘솔에서:
```javascript
console.log(APP_VERSION); // "1.1.0"
console.log(BUILD_DATE);  // "2025-12-21"
```

또는 쿠키/캐시 삭제 없이 강제 새로고침:
- Windows: `Ctrl + Shift + R` 또는 `Ctrl + F5`
- Mac: `Cmd + Shift + R`
