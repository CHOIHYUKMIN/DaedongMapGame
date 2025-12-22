// audio-ui.js - 오디오 UI 컨트롤 연결

document.addEventListener('DOMContentLoaded', () => {
    // UI 요소 가져오기
    const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeControl = document.getElementById('volume-control');
    const bgmVolumeSlider = document.getElementById('bgm-volume-slider');
    const bgmVolumeValue = document.getElementById('bgm-volume-value');

    // 초기 상태 설정
    updateBGMButton();
    updateVolumeDisplay();

    // 배경음악 토글 버튼
    bgmToggleBtn.addEventListener('click', () => {
        const enabled = audioManager.toggleBGM();
        updateBGMButton();

        // 피드백 애니메이션
        bgmToggleBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            bgmToggleBtn.style.transform = 'scale(1)';
        }, 200);
    });

    // 볼륨 버튼 (팝업 토글)
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        volumeControl.classList.toggle('show');
    });

    // 볼륨 슬라이더
    bgmVolumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audioManager.setBGMVolume(volume);
        updateVolumeDisplay();
    });

    // 외부 클릭 시 볼륨 컨트롤 닫기
    document.addEventListener('click', (e) => {
        if (!volumeControl.contains(e.target) && e.target !== volumeBtn) {
            volumeControl.classList.remove('show');
        }
    });

    // UI 업데이트 함수들
    function updateBGMButton() {
        const status = audioManager.getStatus();
        if (status.bgmEnabled) {
            bgmToggleBtn.classList.remove('disabled');
            bgmToggleBtn.textContent = '🎵';
            bgmToggleBtn.title = '배경음악 끄기';
        } else {
            bgmToggleBtn.classList.add('disabled');
            bgmToggleBtn.textContent = '🔇';
            bgmToggleBtn.title = '배경음악 켜기';
        }
    }

    function updateVolumeDisplay() {
        const status = audioManager.getStatus();
        const volumePercent = Math.round(status.bgmVolume * 100);
        bgmVolumeValue.textContent = `${volumePercent}%`;
        bgmVolumeSlider.value = volumePercent;
    }

    // 게임 이벤트와 연동
    // 퍼즐 매칭 시 효과음
    window.addEventListener('puzzle-match', () => {
        audioManager.playSFX('match');
    });

    // 레벨 클리어 시 효과음
    window.addEventListener('level-complete', () => {
        audioManager.playSFX('success');
    });

    // 버튼 클릭 시 효과음
    document.querySelectorAll('.btn, .btn-large, .icon-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            audioManager.playSFX('click');
        });
    });
});
