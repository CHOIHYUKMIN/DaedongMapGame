# Nginx 베이스 이미지 사용 (경량화)
FROM nginx:alpine

# 기본 nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/

# 게임 파일 복사 (불필요한 파일 제외)
COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js

# data 폴더가 있다면 복사 (선택사항)
# COPY data /usr/share/nginx/html/data

# 포트 8080 노출 (Cloud Run 기본 포트)
EXPOSE 8080

# 컨테이너 실행 시 nginx 시작
CMD ["nginx", "-g", "daemon off;"]
