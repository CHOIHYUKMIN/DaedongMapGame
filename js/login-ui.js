// 로그인 UI 컴포넌트

const LoginUI = {
  // 로그인 팝업 표시
  showLoginPopup() {
    // 이미 로그인되어 있으면 무시
    if (UserSync.currentUser) return;

    const popup = document.createElement('div');
    popup.id = 'login-popup';
    popup.innerHTML = `
      <div class="login-overlay">
        <div class="login-content">
          <h2>🗺️ 대동맛집지도</h2>
          <p>로그인하여 진행상황을 저장하세요!</p>
          
          <div class="login-buttons">
            <button class="login-btn google" onclick="LoginUI.loginGoogle()">
              <img src="https://www.google.com/favicon.ico" alt="G" style="width:20px;height:20px;margin-right:8px;">
              Google 로그인
            </button>
            
            <button class="login-btn guest" onclick="LoginUI.loginGuest()">
              👤 게스트로 시작
            </button>
          </div>
          
          <p class="login-note">
            ⚠️ 게스트 모드는 이 기기에서만 진행상황이 저장됩니다
          </p>
        </div>
      </div>
    `;

    // 스타일 추가
    const style = document.createElement('style');
    style.id = 'login-popup-style';
    style.textContent = `
      .login-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease;
      }
      
      .login-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 350px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      
      .login-content h2 {
        margin: 0 0 10px 0;
        color: #FF6B9D;
        font-size: 28px;
      }
      
      .login-content p {
        color: #666;
        margin-bottom: 25px;
      }
      
      .login-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .login-btn {
        padding: 14px 24px;
        border: none;
        border-radius: 30px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }
      
      .login-btn.google {
        background: #4285f4;
        color: white;
      }
      
      .login-btn.google:hover {
        background: #357abd;
        transform: translateY(-2px);
      }
      
      .login-btn.guest {
        background: #f0f0f0;
        color: #333;
      }
      
      .login-btn.guest:hover {
        background: #e0e0e0;
      }
      
      .login-note {
        font-size: 12px !important;
        color: #999 !important;
        margin-top: 20px !important;
        margin-bottom: 0 !important;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(popup);
  },

  // 로그인 팝업 닫기
  hideLoginPopup() {
    const popup = document.getElementById('login-popup');
    const style = document.getElementById('login-popup-style');
    if (popup) popup.remove();
    if (style) style.remove();
  },

  // Google 로그인
  async loginGoogle() {
    try {
      await UserSync.loginWithGoogle();
      this.hideLoginPopup();
      // 게임 시작 - 메인 메뉴로 이동
      if (typeof Game !== 'undefined') {
        Game.startGame();
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  },

  // 게스트 로그인
  async loginGuest() {
    try {
      await UserSync.loginAsGuest();
      this.hideLoginPopup();
      // 게임 시작 - 메인 메뉴로 이동
      if (typeof Game !== 'undefined') {
        Game.startGame();
      }
    } catch (error) {
      console.error('게스트 로그인 실패:', error);
    }
  },

  // 로그인 필요 체크
  requireLogin(callback) {
    if (UserSync.currentUser) {
      callback();
    } else {
      this.showLoginPopup();
    }
  }
};

window.LoginUI = LoginUI;
