# 🚀 빠른 시작 가이드

## 로컬 Docker 테스트

### 1단계: Docker Desktop 실행
- Docker Desktop을 실행하세요
- 시스템 트레이에서 Docker 아이콘이 정상 작동 중인지 확인

### 2단계: Docker 이미지 빌드
```powershell
cd d:\DEVELOP\DaedongMapGame
docker build -t daedong-map-game .
```

### 3단계: 로컬 실행
```powershell
# 기존 Python 서버 종료 (Ctrl+C)
# Docker 컨테이너 실행
docker run -p 8080:8080 daedong-map-game
```

### 4단계: 테스트
브라우저에서 `http://localhost:8080` 접속

---

## Cloud Run 배포

### 사전 준비 (한 번만)

1. **Google Cloud SDK 설치**
   - [다운로드](https://cloud.google.com/sdk/docs/install)

2. **Google Cloud 로그인**
   ```powershell
   gcloud auth login
   ```

3. **프로젝트 생성 및 설정**
   ```powershell
   # 프로젝트 ID는 고유해야 함 (예: daedong-map-game-12345)
   gcloud projects create [YOUR-PROJECT-ID] --name="대동맛지도"
   gcloud config set project [YOUR-PROJECT-ID]
   ```

4. **결제 계정 연결** (필수)
   - https://console.cloud.google.com/billing
   - 프로젝트에 결제 계정 연결
   - **무료 티어 범위 내에서는 비용 없음**

5. **API 활성화**
   ```powershell
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   ```

### 배포하기

```powershell
# 방법 1: 간단 배포 (테스트용)
gcloud builds submit --tag gcr.io/[YOUR-PROJECT-ID]/daedong-map-game
gcloud run deploy daedong-map-game \
  --image gcr.io/[YOUR-PROJECT-ID]/daedong-map-game \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated

# 방법 2: Cloud Build 자동 배포 (권장)
gcloud builds submit --config=cloudbuild.yaml
```

### 배포 완료!
배포가 완료되면 URL이 표시됩니다:
```
Service URL: https://daedong-map-game-xxxxxxxxx-an.a.run.app
```

---

## 업데이트 배포

코드를 수정한 후:

```powershell
gcloud builds submit --config=cloudbuild.yaml
```

---

## 비용 정보

### Cloud Run 무료 티어 (매월)
- ✅ **200만 요청**
- ✅ **36만 vCPU-초**
- ✅ **180만 GiB-초**

### 이 게임의 예상 사용량
- 월 방문자 1,000명
- 평균 5페이지 뷰
- → **5,000 요청/월** (무료 범위의 0.25%)

**결론: 거의 무료로 운영 가능!** 🎉

---

## 백엔드 서비스 추가 방법

### 프로젝트 구조 예시
```
your-workspace/
├── DaedongMapGame/          # 프론트엔드 (현재 게임)
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ...
│
└── DaedongMapAPI/           # 백엔드 서비스 (추가 예정)
    ├── Dockerfile
    ├── server.js (or app.py)
    └── ...
```

### 백엔드 배포 예시 (Node.js)

1. **Dockerfile 예시**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 8080
   CMD ["node", "server.js"]
   ```

2. **Cloud Run 배포**
   ```powershell
   cd DaedongMapAPI
   gcloud run deploy daedong-api \
     --source . \
     --platform managed \
     --region asia-northeast3 \
     --allow-unauthenticated
   ```

3. **프론트엔드에서 연결**
   ```javascript
   // js/game.js
   const API_URL = 'https://daedong-api-xxxxx.run.app';
   
   async function saveScore(score) {
       const response = await fetch(`${API_URL}/api/scores`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ score })
       });
       return response.json();
   }
   ```

---

## 문제 해결

### Docker 빌드 실패
```powershell
# Docker Desktop이 실행 중인지 확인
docker ps

# Docker Desktop 재시작
```

### gcloud 명령어 오류
```powershell
# 재로그인
gcloud auth login

# 프로젝트 확인
gcloud config list
```

### 배포 로그 확인
```powershell
gcloud run logs read daedong-map-game --region asia-northeast3 --limit 50
```

---

## 다음 단계

✅ Docker 설정 완료  
✅ Cloud Run 배포 준비 완료  
⬜ Docker Desktop 실행 후 로컬 테스트  
⬜ Google Cloud 프로젝트 생성  
⬜ Cloud Run 배포  
⬜ 사용자 정의 도메인 연결 (선택)  
⬜ 백엔드 API 개발 및 배포 (선택)  

궁금한 점이 있으시면 언제든지 물어보세요! 🚀
