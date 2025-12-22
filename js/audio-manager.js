// AudioManager.js - 배경음악 관리 시스템

class AudioManager {
    constructor() {
        this.bgm = null;
        this.sfxEnabled = true;
        this.bgmEnabled = true;
        this.bgmVolume = 0.3; // 기본 볼륨 30%
        this.sfxVolume = 0.5;
        this.currentTrack = null;

        // 로컬스토리지에서 설정 불러오기
        this.loadSettings();
    }

    /**
     * 배경음악 초기화 및 재생
     */
    init() {
        // 배경음악 파일 생성 (Web Audio API 사용)
        // 실제 음악 파일이 없으므로 간단한 멜로디 생성
        this.createBackgroundMusic();

        // 사용자 인터랙션 후 자동 재생
        document.addEventListener('click', () => {
            if (this.bgmEnabled && this.bgm && this.bgm.paused) {
                this.playBGM();
            }
        }, { once: true });
    }

    /**
     * Web Audio API를 사용한 배경음악 생성
     */
    createBackgroundMusic() {
        // 실제 프로젝트에서는 음악 파일을 사용하는 것이 좋습니다
        // 여기서는 데모를 위해 간단한 오디오 엘리먼트 생성
        this.bgm = new Audio();
        this.bgm.loop = true;
        this.bgm.volume = this.bgmVolume;

        // 무료 배경음악 URL (나중에 실제 파일로 교체)
        // 임시로 빈 오디오 생성
        this.bgm.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

        console.log('🎵 AudioManager initialized');
    }

    /**
     * 배경음악 재생
     */
    playBGM() {
        if (!this.bgm || !this.bgmEnabled) return;

        this.bgm.play().catch(err => {
            console.log('BGM autoplay prevented:', err);
        });
    }

    /**
     * 배경음악 일시정지
     */
    pauseBGM() {
        if (this.bgm) {
            this.bgm.pause();
        }
    }

    /**
     * 배경음악 토글
     */
    toggleBGM() {
        this.bgmEnabled = !this.bgmEnabled;

        if (this.bgmEnabled) {
            this.playBGM();
        } else {
            this.pauseBGM();
        }

        this.saveSettings();
        return this.bgmEnabled;
    }

    /**
     * 배경음악 볼륨 설정
     * @param {number} volume - 0.0 ~ 1.0
     */
    setBGMVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
        if (this.bgm) {
            this.bgm.volume = this.bgmVolume;
        }
        this.saveSettings();
    }

    /**
     * 효과음 재생
     * @param {string} soundType - 효과음 타입
     */
    playSFX(soundType) {
        if (!this.sfxEnabled) return;

        const sfx = new Audio();
        sfx.volume = this.sfxVolume;

        // 효과음 타입별 처리
        switch (soundType) {
            case 'click':
                // 클릭 효과음
                sfx.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
                break;
            case 'match':
                // 매칭 효과음
                sfx.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
                break;
            case 'success':
                // 성공 효과음
                sfx.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
                break;
            default:
                return;
        }

        sfx.play().catch(err => console.log('SFX play error:', err));
    }

    /**
     * 효과음 토글
     */
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        this.saveSettings();
        return this.sfxEnabled;
    }

    /**
     * 설정 저장
     */
    saveSettings() {
        const settings = {
            bgmEnabled: this.bgmEnabled,
            sfxEnabled: this.sfxEnabled,
            bgmVolume: this.bgmVolume,
            sfxVolume: this.sfxVolume
        };
        localStorage.setItem('audioSettings', JSON.stringify(settings));
    }

    /**
     * 설정 불러오기
     */
    loadSettings() {
        const saved = localStorage.getItem('audioSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.bgmEnabled = settings.bgmEnabled !== undefined ? settings.bgmEnabled : true;
            this.sfxEnabled = settings.sfxEnabled !== undefined ? settings.sfxEnabled : true;
            this.bgmVolume = settings.bgmVolume || 0.3;
            this.sfxVolume = settings.sfxVolume || 0.5;
        }
    }

    /**
     * 현재 상태 반환
     */
    getStatus() {
        return {
            bgmEnabled: this.bgmEnabled,
            sfxEnabled: this.sfxEnabled,
            bgmVolume: this.bgmVolume,
            sfxVolume: this.sfxVolume,
            isPlaying: this.bgm && !this.bgm.paused
        };
    }
}

// 전역 AudioManager 인스턴스
const audioManager = new AudioManager();

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    audioManager.init();
});
