---
description: Firebase Hosting 배포 방법
---

# Firebase Hosting 배포

## 기본 정보
- **프로젝트 ID**: daedongmapgame
- **호스팅 URL**: https://daedongmapgame.web.app
- **Firebase Console**: https://console.firebase.google.com/project/daedongmapgame/overview

## 배포 방법

// turbo
1. 프로젝트 폴더로 이동하여 Firebase 배포 실행:
```bash
npx firebase-tools deploy --only hosting --project daedongmapgame
```

## 배포 전 체크리스트
- [ ] 코드 변경사항 확인
- [ ] 로컬에서 테스트 완료 (`npx http-server -p 8082 --cors`)
- [ ] 버전 번호 업데이트 (필요시)

## 로컬 테스트 서버 실행
// turbo
```bash
npx http-server -p 8082 --cors
```
로컬 테스트 URL: http://127.0.0.1:8082
