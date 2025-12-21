## 긴급 복구 작업

### 문제 발생
PowerShell `-replace` 명령어로 index.html 수정 시:
- `` `r`n `` 문자가 리터럴로 삽입됨
- UTF-8 인코딩 깨짐 (한글: 말랑말랑 → ?�?�)
- HTML 구조 파괴

### 복구 방법

1. **Git 롤백**
   ```powershell
   git checkout 841d8e9 -- index.html
   ```

2. **수동으로 아래 내용 추가**

   **CSS 추가 (19번 라인 근처, costume.css 다음에):**
   ```html
   <link rel="stylesheet" href="css/puzzle-layout.css?v=1.3.0">
   ```

   **JS 추가 (277번 라인 근처, data.js 다음에):**
   ```html
   <script src="js/region.js?v=1.3.0"></script>
   <script src="js/restaurant.js?v=1.3.0"></script>
   ```

3. **UTF-8 BOM 없이 저장**
   - 메모장: 다른 이름으로 저장 → 인코딩: UTF-8
   - VS Code: 하단 UTF-8 클릭 → Save with Encoding → UTF-8

4. **배포**
   ```powershell
   git add index.html
   git commit -m "fix: index.html 복구 및 수동으로 필수 파일 링크 추가"
   git push origin main
   firebase deploy --only hosting
   ```

### 교훈
- PowerShell 문자열 치환은 위험함
- 파일 인코딩 항상 체크 필요
- 중요 파일은 백업 후 작업
