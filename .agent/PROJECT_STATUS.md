# 대동맛지도 프로젝트 상태

## 최근 업데이트: 2025-12-26

## 배포 정보
- **Production URL**: https://daedongmapgame.web.app
- **Firebase Project ID**: daedongmapgame
- **마지막 배포**: 2025-12-26 22:21 KST

## 프로젝트 구조
```
daedongmapgame/
├── index.html          # 메인 HTML
├── manifest.json       # PWA 매니페스트
├── sw.js              # Service Worker
├── firebase.json      # Firebase 설정
├── css/               # 스타일시트
├── js/                # JavaScript 파일
│   ├── game.js        # 메인 게임 로직
│   ├── puzzle.js      # 퍼즐 게임 로직
│   ├── data.js        # 게임 데이터 (레벨, 아이템, 맛집)
│   ├── region-data.js # 전국 17개 시도 데이터
│   ├── seoul-gu-data.js    # 서울 25개 구 데이터
│   ├── gangnam-dong-data.js # 강남구 동 데이터
│   ├── junggu-dong-data.js  # 중구 동 데이터
│   └── jongnogu-dong-data.js # 종로구 동 데이터
└── images/            # 이미지 리소스
```

## 현재 기능
- ✅ 전국 17개 시도 지역 선택 (Leaflet 지도)
- ✅ 서울 25개 구 선택
- ✅ 강남구/중구/종로구 동 단위 지도
- ✅ 3-Match 퍼즐 게임
- ✅ 맛집 도감 시스템
- ✅ 캐릭터 선택 및 코스튬 시스템
- ✅ Firebase 인증 (Google 로그인)
- ✅ PWA 지원 (앱 설치 가능)
- ✅ 오디오 시스템 (BGM, 효과음)

## 알려진 이슈 (작업 중)
1. **동네 선택 시 원형 마커 표시**: 확인 필요
2. **도시 선택 시 지도 포커싱**: 비서울 지역 선택 시 해당 지역으로 지도 이동이 안됨

## 기술 스택
- Frontend: Vanilla JavaScript, HTML5, CSS3
- Map: Leaflet.js + OpenStreetMap
- Backend: Firebase (Auth, Firestore, Hosting)
- PWA: Service Worker

## 배포 명령어
```bash
npx firebase-tools deploy --only hosting --project daedongmapgame
```

## 로컬 개발
```bash
npx http-server -p 8082 --cors
# 접속: http://127.0.0.1:8082
```
