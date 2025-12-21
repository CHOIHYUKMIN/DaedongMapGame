# 🚀 Cloud Run 배포 가이드

## 사전 준비

### 1. Docker 설치
- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) 설치

### 2. Google Cloud SDK 설치
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 설치

### 3. Google Cloud 프로젝트 생성
```powershell
# 로그인
gcloud auth login

# 프로젝트 생성 (프로젝트 ID는 고유해야 함)
gcloud projects create daedong-map-game --name="대동맛지도게임"

# 프로젝트 설정
gcloud config set project daedong-map-game

# 결제 계정 연결 (필수)
# https://console.cloud.google.com/billing 에서 설정
```

## 로컬 Docker 테스트

```powershell
# 이미지 빌드
docker build -t daedong-map-game .

# 로컬 실행
docker run -p 8080:8080 daedong-map-game

# 브라우저에서 확인: http://localhost:8080
```

## Cloud Run 배포

### 방법 1: 수동 배포 (빠른 테스트용)

```powershell
# API 활성화
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# 이미지 빌드 및 푸시
gcloud builds submit --tag gcr.io/daedong-map-game/daedong-map-game

# Cloud Run 배포
gcloud run deploy daedong-map-game \
  --image gcr.io/daedong-map-game/daedong-map-game \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated \
  --memory 256Mi
```

### 방법 2: Cloud Build 자동 배포 (권장)

```powershell
# cloudbuild.yaml 사용
gcloud builds submit --config=cloudbuild.yaml
```

## 배포 후 확인

배포가 완료되면 URL이 표시됩니다:
```
https://daedong-map-game-xxxxxxxxx-an.a.run.app
```

## 업데이트 배포

코드를 수정한 후:

```powershell
gcloud builds submit --config=cloudbuild.yaml
```

## 사용자 정의 도메인 연결 (선택사항)

1. Cloud Run 콘솔에서 서비스 선택
2. "도메인 관리" → "도메인 추가"
3. DNS 설정 안내에 따라 진행

## 비용 관리

### 무료 티어
- 월 200만 요청
- 36만 vCPU-초
- 180만 GiB-초

### 비용 절감 팁
- `--min-instances 0` 설정 (트래픽 없을 때 비용 없음)
- `--memory 256Mi` (최소 메모리 사용)
- `--max-instances 10` (과도한 스케일링 방지)

## 문제 해결

### 로그 확인
```powershell
gcloud run logs read daedong-map-game --region asia-northeast3
```

### 서비스 삭제
```powershell
gcloud run services delete daedong-map-game --region asia-northeast3
```

## 다음 단계: 백엔드 서비스 추가

백엔드 API를 추가하려면:

1. 백엔드 프로젝트를 별도 폴더에 생성
2. 백엔드용 Dockerfile 작성
3. Cloud Run에 별도 서비스로 배포
4. 프론트엔드에서 백엔드 URL 연결

예시:
- 프론트엔드: `https://daedong-map-game-xxxxx.run.app`
- 백엔드: `https://daedong-api-xxxxx.run.app`
