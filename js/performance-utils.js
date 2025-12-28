/**
 * PerformanceUtils - 게임 성능 최적화 유틸리티
 * 끊김 현상 해결을 위한 디바운싱, 쓰로틀링, 메모리 관리 등
 */

const PerformanceUtils = {
    // 활성 타이머 추적 (메모리 누수 방지)
    activeTimers: new Set(),

    // 이벤트 리스너 추적
    eventListeners: new Map(),

    /**
     * 디바운스 - 연속 호출 중 마지막만 실행
     * @param {Function} func - 실행할 함수
     * @param {number} wait - 대기 시간 (ms)
     * @param {string} key - 고유 키 (중복 방지용)
     * @returns {Function} 디바운스된 함수
     */
    debounce(func, wait, key = null) {
        let timeoutId = null;

        const debouncedFn = (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                this.activeTimers.delete(timeoutId);
            }

            timeoutId = setTimeout(() => {
                func.apply(this, args);
                this.activeTimers.delete(timeoutId);
                timeoutId = null;
            }, wait);

            this.activeTimers.add(timeoutId);
        };

        debouncedFn.cancel = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                this.activeTimers.delete(timeoutId);
                timeoutId = null;
            }
        };

        return debouncedFn;
    },

    /**
     * 쓰로틀 - 일정 시간 간격으로만 실행
     * @param {Function} func - 실행할 함수
     * @param {number} limit - 최소 간격 (ms)
     * @returns {Function} 쓰로틀된 함수
     */
    throttle(func, limit) {
        let inThrottle = false;
        let lastArgs = null;

        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;

                setTimeout(() => {
                    inThrottle = false;
                    if (lastArgs) {
                        func.apply(this, lastArgs);
                        lastArgs = null;
                    }
                }, limit);
            } else {
                lastArgs = args;
            }
        };
    },

    /**
     * requestAnimationFrame 래퍼 - 부드러운 애니메이션
     * @param {Function} callback - 프레임마다 실행할 함수
     * @returns {Object} { start, stop } 컨트롤러
     */
    animationLoop(callback) {
        let animationId = null;
        let isRunning = false;
        let lastTime = 0;

        const loop = (currentTime) => {
            if (!isRunning) return;

            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            callback(deltaTime, currentTime);
            animationId = requestAnimationFrame(loop);
        };

        return {
            start: () => {
                if (isRunning) return;
                isRunning = true;
                lastTime = performance.now();
                animationId = requestAnimationFrame(loop);
            },
            stop: () => {
                isRunning = false;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            },
            isRunning: () => isRunning
        };
    },

    /**
     * 무거운 작업을 청크로 분할 실행 (UI 블로킹 방지)
     * @param {Array} items - 처리할 아이템들
     * @param {Function} processor - 각 아이템 처리 함수
     * @param {number} chunkSize - 한 번에 처리할 양
     * @param {number} delay - 청크 간 딜레이 (ms)
     * @returns {Promise} 완료 Promise
     */
    async processInChunks(items, processor, chunkSize = 50, delay = 0) {
        const total = items.length;
        let processed = 0;

        for (let i = 0; i < total; i += chunkSize) {
            const chunk = items.slice(i, i + chunkSize);

            for (const item of chunk) {
                await processor(item, processed);
                processed++;
            }

            // 청크 간 딜레이 (UI 업데이트 기회 제공)
            if (delay > 0 && i + chunkSize < total) {
                await this.sleep(delay);
            }

            // 매 청크마다 프레임 양보
            await this.nextFrame();
        }

        return processed;
    },

    /**
     * 다음 프레임까지 대기
     */
    nextFrame() {
        return new Promise(resolve => requestAnimationFrame(resolve));
    },

    /**
     * 지정 시간 대기
     * @param {number} ms - 대기 시간
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 이벤트 리스너 등록 (추적 기능 포함)
     * @param {Element} element - DOM 요소
     * @param {string} event - 이벤트 타입
     * @param {Function} handler - 핸들러
     * @param {Object} options - 옵션
     * @returns {Function} 리스너 제거 함수
     */
    addTrackedListener(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);

        const key = `${element.id || 'anon'}_${event}`;
        if (!this.eventListeners.has(key)) {
            this.eventListeners.set(key, []);
        }
        this.eventListeners.get(key).push({ element, event, handler, options });

        return () => {
            element.removeEventListener(event, handler, options);
            const listeners = this.eventListeners.get(key);
            const index = listeners.findIndex(l => l.handler === handler);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    },

    /**
     * 특정 요소의 모든 이벤트 리스너 제거
     * @param {Element} element - DOM 요소
     */
    removeAllListeners(element) {
        this.eventListeners.forEach((listeners, key) => {
            const remaining = listeners.filter(l => {
                if (l.element === element) {
                    element.removeEventListener(l.event, l.handler, l.options);
                    return false;
                }
                return true;
            });

            if (remaining.length === 0) {
                this.eventListeners.delete(key);
            } else {
                this.eventListeners.set(key, remaining);
            }
        });
    },

    /**
     * 모든 타이머 정리
     */
    clearAllTimers() {
        this.activeTimers.forEach(id => {
            clearTimeout(id);
            clearInterval(id);
        });
        this.activeTimers.clear();
        console.log('🧹 모든 타이머 정리 완료');
    },

    /**
     * 메모리 정리 (화면 전환 시 호출)
     */
    cleanup() {
        this.clearAllTimers();
        console.log('🧹 메모리 정리 완료');
    },

    /**
     * 성능 측정 헬퍼
     * @param {string} label - 측정 레이블
     * @param {Function} fn - 측정할 함수
     * @returns {any} 함수 실행 결과
     */
    async measure(label, fn) {
        const start = performance.now();
        const result = await fn();
        const elapsed = (performance.now() - start).toFixed(2);
        console.log(`⏱️ ${label}: ${elapsed}ms`);
        return result;
    },

    /**
     * 이미지 프리로드
     * @param {string[]} urls - 이미지 URL 배열
     * @returns {Promise<HTMLImageElement[]>} 로드된 이미지들
     */
    preloadImages(urls) {
        const promises = urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        });

        return Promise.all(promises);
    },

    /**
     * Lazy 로딩 옵저버 생성
     * @param {Function} onVisible - 요소가 보일 때 실행할 함수
     * @param {Object} options - IntersectionObserver 옵션
     * @returns {IntersectionObserver}
     */
    createLazyObserver(onVisible, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onVisible(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { ...defaultOptions, ...options });
    }
};

// 전역에서 사용 가능하도록 export
if (typeof window !== 'undefined') {
    window.PerformanceUtils = PerformanceUtils;
}
