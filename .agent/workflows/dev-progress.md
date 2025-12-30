---
description: 대동맛집지도 개발 진행 상황 및 다음 작업
---

# 🗺️ 대동맛집지도 개발 기록

**마지막 업데이트:** 2025-12-30 16:55
**현재 버전:** v1.7.4
**배포 URL:** https://daedongmapgame.web.app

---

## ✅ 완료된 작업 (2025-12-30)

### 1. 대구/광주/대전 동 데이터 추가
- **대구 동구** (`data/districts/daegu/donggu.json`) - 신천동, 동촌동, 팔공산 3개 동
- **광주 서구** (`data/districts/gwangju/seogu.json`) - 상무지구, 치평동, 광천동 3개 동
- **대전 동구** (`data/districts/daejeon/donggu.json`) - 중앙시장, 대전역, 한밭수목원 3개 동

### 2. PowerShell 인코딩 문제 해결
- `deploy.ps1` UTF-8 BOM 인코딩으로 저장
- 콘솔 출력 시 한글 깨짐 현상 완전 해결
- 배포 스크립트 실행 시 정상적인 한글 표시 확인

### 3. 버전 관리 및 배포
- v1.7.3 → v1.7.4 패치 업데이트
- GitHub 푸시 완료 (4개 커밋)
- Firebase Hosting 배포 완료

---

## ✅ 완료된 작업 (2025-12-28)

### 1. 핵심 시스템 파일 생성
| 파일 | 설명 |
|------|------|
| `js/data-loader.js` | 비동기 JSON 데이터 로더 (캐싱 지원) |
| `js/performance-utils.js` | 성능 최적화 유틸리티 (디바운싱, 쓰로틀링) |
| `js/dong-registry.js` | 동 데이터 레지스트리 (JSON 로딩 기능 추가) |

### 2. 전국 데이터 JSON 완성

#### 지역 데이터 (`data/regions.json`)
- 17개 시도 기본 정보

#### 시/군/구 데이터 (`data/cities/*.json`)
| 지역 | 파일 | 개수 |
|------|------|------|
| 서울특별시 | seoul.json | 25개 구 |
| 부산광역시 | busan.json | 16개 구/군 |
| 대구광역시 | daegu.json | 8개 구/군 |
| 인천광역시 | incheon.json | 10개 구/군 |
| 광주광역시 | gwangju.json | 5개 구 |
| 대전광역시 | daejeon.json | 5개 구 |
| 울산광역시 | ulsan.json | 5개 구/군 |
| 세종특별자치시 | sejong.json | 1개 + 읍면동 |
| 경기도 | gyeonggi.json | 31개 시/군 |
| 강원도 | gangwon.json | 18개 시/군 |
| 충청북도 | chungbuk.json | 11개 시/군 |
| 충청남도 | chungnam.json | 15개 시/군 |
| 전북특별자치도 | jeonbuk.json | 14개 시/군 |
| 전라남도 | jeonnam.json | 22개 시/군 |
| 경상북도 | gyeongbuk.json | 23개 시/군 |
| 경상남도 | gyeongnam.json | 18개 시/군 |
| 제주특별자치도 | jeju.json | 2개 시 + 읍면동 |

#### 동(洞) 데이터 (`data/districts/**/*.json`)

**서울 25개 구 전체 완료:**
- gangnam, junggu, mapo, jongno, songpa, yongsan, seocho
- seongdong, seodaemun, yeongdeungpo, gangdong, gwanak, dongjak
- nowon, gangbuk, gwangjin, dongdaemun, seongbuk, jungnang
- dobong, eunpyeong, gangseo, yangcheon, guro, geumcheon

**인천 8개 구 완료:**
- junggu, yeonsu, donggu, michuhol, namdong, bupyeong, gyeyang, seogu

**부산 10개 구 완료:**
- haeundae, junggu, seogu, busanjingu
- donggu, yeongdogu, dongraegu, namgu, suyeonggu, geumjeonggu

#### 맛집 데이터 (`data/restaurants/*.json`)
- 17개 시도 전체 완료 (111개 맛집)

### 3. 시스템 아키텍처 문서 작성

**새 파일:** `docs/ARCHITECTURE.md`
- 시스템 개요 및 핵심 기능
- 아키텍처 다이어그램 (ASCII Art)
- 기술 스택 (Frontend, Backend, DB)
- 프로젝트 구조
- 데이터 흐름
- 배포 환경 및 방법
- CI/CD 파이프라인 (GitHub Actions 권장 설정)

### 3. game.js 통합 및 수정

- `init()`: DataLoader 초기화 추가
- `selectGu()`: DongDataRegistry 사용하도록 수정
- 인천 중구 동 지도 진입 문제 해결

### 4. UI/UX 개선

**CSS 수정 (`css/style.css`, `css/mobile.css`)**
- 지도 크기 확대: 고정 높이 → flex 레이아웃으로 남은 공간 채움
- 모바일 버튼 깨짐 방지: flex-wrap, 폰트 크기 조정
- 메인 메뉴 레이아웃 개선

### 5. 퍼즐 게임 점수 계산 개선 (`js/puzzle.js`)

**새로운 4단계 플로우:**
1. `showGoalReachedCelebration()` - 목표 달성 축하 화면 (별 애니메이션)
2. `showSpecialBlocksBonus()` - 특수 블록 보너스 단계
3. `convertMovesToScore()` - 남은 이동수 → 점수 변환
4. `showResult()` - 최종 결과 팝업

**새 함수:**
- `countSpecialBlocks()` - 특수 블록 개수 체크

---

## 📁 주요 파일 구조

```
daedongmapgame/
├── index.html                   # 메인 HTML (v1.7.1 스크립트 참조)
├── css/
│   ├── style.css               # 메인 스타일 (지도 크기 확대)
│   └── mobile.css              # 모바일 스타일 (버튼 개선)
├── js/
│   ├── data-loader.js          # 비동기 데이터 로더 (NEW)
│   ├── performance-utils.js    # 성능 유틸 (NEW)
│   ├── dong-registry.js        # 동 레지스트리 (업데이트)
│   ├── game.js                 # 게임 로직 (DataLoader 통합)
│   ├── puzzle.js               # 퍼즐 엔진 (점수 계산 개선)
│   └── app-version.js          # v1.7.1
└── data/
    ├── regions.json            # 17개 시도
    ├── levels.json             # 레벨 데이터
    ├── items.json              # 아이템 데이터
    ├── cities/                 # 228개+ 시/군/구 (17개 파일)
    ├── districts/              # 동 데이터
    │   ├── seoul/ (25개 구)
    │   ├── busan/ (4개 구)
    │   └── incheon/ (2개 구)
    └── restaurants/            # 맛집 (17개 파일, 111개)
```

---

## 📊 통계

| 항목 | 개수 |
|------|------|
| 시도 데이터 | 17개 |
| 시/군/구 | 228개+ |
| 동 데이터 파일 | 43개 (서울25 + 인천8 + 부산10) |
| 동 개수 | 약 200개+ |
| 맛집 파일 | 17개 |
| 맛집 개수 | 111개 |
| 문서 | ARCHITECTURE.md |

---

## 💾 데이터베이스 아키텍처

### 1. Neon PostgreSQL (클라우드 DB)

| 항목 | 값 |
|------|-----|
| 서비스 | [Neon](https://neon.tech) - Serverless PostgreSQL |
| 리전 | `ap-southeast-1` (싱가포르) |
| 연결 | `@neondatabase/serverless` 드라이버 |
| API | Cloudflare Workers (`api-worker/`) |

**주요 테이블:**
- `users` - 유저 정보 (uid, gold, inventory, cleared_levels 등)
- `regions`, `cities`, `districts` - 지역 데이터 (백업용)
- `restaurants`, `levels`, `items` - 게임 콘텐츠 (백업용)

**API 엔드포인트:**
- `POST /api/sync` - 진행 상황 동기화 (병합 로직)
- `GET /api/user?uid=xxx` - 유저 데이터 조회
- `GET /api/regions` - 지역 데이터 조회

### 2. JSON 파일 데이터베이스 (정적 데이터)

| 디렉토리 | 파일 수 | 설명 |
|----------|---------|------|
| `data/cities/` | 17개 | 시/군/구 정보 |
| `data/districts/` | 43개 | 동 데이터 (서울25+인천8+부산10) |
| `data/restaurants/` | 17개 | 맛집 정보 |
| `data/` | 3개 | regions.json, levels.json, items.json |

**장점:**
- ✅ 오프라인 사용 가능 (PWA Service Worker 캐싱)
- ✅ Firebase Hosting CDN 캐싱
- ✅ 빠른 초기 로딩

### 3. 데이터 흐름

```
게임 시작 → JSON 파일 로딩 (정적 데이터)
         → LocalStorage 로딩 (오프라인 진행)
         → Neon DB 동기화 (로그인 시)
```

---

## 🚀 다음 작업 (TODO)

### 우선순위 높음
1. [x] ~~**인천/부산 추가 구 동 데이터**~~ - ✅ 완료
2. [x] ~~**시스템 아키텍처 문서 작성**~~ - ✅ 완료
3. [x] ~~**로컬 테스트**~~ - ✅ 완료
4. [x] ~~**배포**~~ - ✅ v1.7.4 배포 완료
5. [x] ~~**대구, 광주, 대전 동 데이터 추가**~~ - ✅ 완료 (각 1개 구씩)

### 우선순위 중간
6. [ ] **기존 하드코딩 JS 파일 정리** - JSON으로 대체 후 제거 가능
   - `incheon-gu-data.js`, `seoul-gu-data.js` 등
7. [ ] **대구/광주/대전 추가 구 동 데이터** - 나머지 구들
8. [ ] **GitHub Actions CI/CD 구축**

### 우선순위 낮음
9. [ ] **PerformanceUtils 실제 적용** - 지도 렌더링 최적화
10. [ ] **DataLoader 전면 통합** - 기존 하드코딩 완전 대체

---

## 🔧 개발 환경

### 로컬 서버 실행
```bash
cd d:\DEVELOP\WORKSPACE\daedongmapgame
python -m http.server 8000
# 브라우저: http://localhost:8000
```

### 배포
```bash
npx firebase-tools deploy
```

---

## 🐛 알려진 이슈

1. **로컬 서버 포트 충돌** - 8080 포트 사용 불가 시 8000 사용
2. **서울 외 지역 동 지도** - 대부분 미구현 (바로 레벨로 이동)

---

## 📝 커밋 메시지 템플릿

```
v1.7.1: 전국 데이터 완성 및 UI 개선

- 전국 17개 시도 + 228개 시/군/구 JSON 데이터 완성
- 서울 25개 구 동 데이터 추가 (140+ 동)
- 맛집 데이터 17개 지역 완성 (111개)
- DataLoader/PerformanceUtils 시스템 추가
- 지도 크기 확대 및 모바일 버튼 개선
- 퍼즐 점수 계산 4단계 애니메이션 추가
```

---

마지막 배포: 2025-12-28 07:58
