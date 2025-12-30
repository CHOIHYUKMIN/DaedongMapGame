---
description: Firebase Hosting 배포 방법
---

# Firebase Hosting 배포

## 기본 정보
- **프로젝트 ID**: daedongmapgame
- **호스팅 URL**: https://daedongmapgame.web.app
- **Firebase Console**: https://console.firebase.google.com/project/daedongmapgame/overview

## 배포 방법 (추천)

### 자동 배포 (버전 동기화 포함)
// turbo
1. 배포 스크립트 실행 (버전 동기화 + Firebase 배포 한 번에):
```powershell
.\deploy.ps1
```

### 버전 업그레이드 후 배포
// turbo
2. 패치 버전 업그레이드 (1.7.3 → 1.7.4):
```powershell
.\deploy.ps1 -BumpPatch
```

// turbo
3. 마이너 버전 업그레이드 (1.7.3 → 1.8.0):
```powershell
.\deploy.ps1 -BumpMinor
```

### 수동 배포 (버전 지정)
// turbo
4. 특정 버전으로 배포:
```powershell
.\deploy.ps1 -Version "2.0.0"
```

## 버전 관리 구조
- **version.js**: 중앙 버전 관리 파일 (APP_VERSION, BUILD_DATE)
- **deploy.ps1**: 배포 시 자동으로 version.js → index.html 버전 동기화
- **index.html**: CSS/JS 캐시 버스터 (`?v=X.Y.Z`)

## 로컬 테스트 서버
// turbo
```powershell
npx http-server -p 8082 --cors
```
로컬 테스트 URL: http://127.0.0.1:8082
