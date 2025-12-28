// PWA 업데이트 관리
const PWAUpdate = {
    init() {
        if ('serviceWorker' in navigator) {
            // 기존 SW 등록 코드를 여기서 확장
            navigator.serviceWorker.ready.then(registration => {
                console.log('🔄 PWA 업데이트 체크 활성화');

                // 주기적으로 업데이트 확인 (1시간마다)
                setInterval(() => {
                    registration.update();
                    console.log('🔍 SW 업데이트 확인 중...');
                }, 60 * 60 * 1000);

                // 업데이트 발견 시
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🆕 새 버전 발견!');

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // 기존 SW가 있고 새 SW 설치 완료 = 업데이트
                                console.log('✅ 새 버전 준비 완료!');
                                this.showUpdateNotification();
                            } else {
                                // 첫 설치
                                console.log('✅ PWA 첫 설치 완료!');
                            }
                        }
                    });
                });
            });

            // SW 교체 시 페이지 새로고침
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    console.log('🔄 새 버전으로 전환 중...');
                    window.location.reload();
                }
            });
        }
    },

    showUpdateNotification() {
        // 이미 알림이 있으면 중복 생성 방지
        if (document.getElementById('pwa-update-bar')) return;

        const updateBar = document.createElement('div');
        updateBar.id = 'pwa-update-bar';
        updateBar.innerHTML = `
            <span>🆕 새 버전이 있습니다!</span>
            <button id="pwa-update-btn">지금 업데이트</button>
            <button id="pwa-update-close">✕</button>
        `;
        updateBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 99999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        `;

        document.body.prepend(updateBar);

        // 업데이트 버튼 스타일
        const updateBtn = document.getElementById('pwa-update-btn');
        updateBtn.style.cssText = `
            background: white;
            color: #667eea;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 13px;
        `;
        updateBtn.addEventListener('click', () => {
            window.location.reload();
        });

        // 닫기 버튼 스타일
        const closeBtn = document.getElementById('pwa-update-close');
        closeBtn.style.cssText = `
            background: transparent;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
            padding: 5px;
            opacity: 0.8;
        `;
        closeBtn.addEventListener('click', () => {
            updateBar.remove();
        });
    }
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    PWAUpdate.init();
});
