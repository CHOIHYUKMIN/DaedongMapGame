// 퍼즐 게임 엔진

const Puzzle = {
    grid: [],
    gridSize: 7,
    selectedBlock: null,
    movesLeft: 0,
    score: 0,
    currentLevel: null,
    isAnimating: false,

    init(levelId) {
        console.log(`🎮 Puzzle.init 호출: levelId = ${levelId} (type: ${typeof levelId})`);
        console.log(`🔍 GameData.levels에서 레벨 검색 중... (총 ${GameData.levels.length}개 레벨)`);

        this.currentLevel = GameData.levels.find(l => l.id === levelId);

        if (!this.currentLevel) {
            console.error(`❌ 레벨 ID ${levelId}을(를) 찾을 수 없습니다!`);
            console.log('🔍 사용 가능한 레벨 ID 목록:', GameData.levels.slice(0, 20).map(l => l.id));
            return;
        }

        console.log(`✅ 레벨 찾음: ${this.currentLevel.name}`);
        console.log(`🎨 blockTheme:`, this.currentLevel.blockTheme);

        // 이모지 매핑 초기화 (중복 방지를 위해 셔플)
        this.initEmojiMapping();

        this.movesLeft = this.currentLevel.moves;
        this.score = 0;
        this.selectedBlock = null;
        this.activeBooster = null;

        this.createBoard();
        this.updateUI();
        this.updateBoosterCounts();
    },

    // 이모지 매핑 초기화 - 각 타입에 고유한 이모지 할당
    initEmojiMapping() {
        if (this.currentLevel && this.currentLevel.blockTheme) {
            const themeEmojis = [...this.currentLevel.blockTheme.emojis];
            // Fisher-Yates 셔플로 순서 랜덤화
            for (let i = themeEmojis.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [themeEmojis[i], themeEmojis[j]] = [themeEmojis[j], themeEmojis[i]];
            }
            this.emojiMapping = themeEmojis;
            console.log(`🎯 이모지 매핑:`, this.emojiMapping);
        } else {
            this.emojiMapping = ['🎒', '🍯', '🏮', '🌲', '🎭'];
        }
    },

    createBoard() {
        this.grid = [];
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';

        // 난이도 계산
        const difficulty = this.calculateDifficulty();
        this.gridSize = difficulty.gridSize;

        // 블럭 타입 수를 이모지 개수로 제한 (중복 방지)
        const maxBlockTypes = this.emojiMapping ? this.emojiMapping.length : 5;
        const blockTypeCount = Math.min(difficulty.blockTypes, maxBlockTypes);

        // 그리드 크기 조정
        board.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;

        for (let y = 0; y < this.gridSize; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                const type = Math.floor(Math.random() * blockTypeCount);
                this.grid[y][x] = type;

                const block = document.createElement('div');
                block.className = `block block-${type}`;
                block.dataset.x = x;
                block.dataset.y = y;
                block.textContent = this.getBlockEmoji(type);

                // 드래그 이벤트 추가
                this.addDragEvents(block, x, y);

                board.appendChild(block);
            }
        }
    },


    getBlockEmoji(type) {
        // 초기화된 이모지 매핑 사용 (중복 방지)
        if (this.emojiMapping && this.emojiMapping[type]) {
            return this.emojiMapping[type];
        }

        // 지역별 블록 테마 사용 (폴백)
        if (this.currentLevel && this.currentLevel.blockTheme) {
            const themeEmojis = this.currentLevel.blockTheme.emojis;
            return themeEmojis[type % themeEmojis.length];
        }

        // 기본 이모지 (하위 호환성)
        const defaultEmojis = ['🎒', '🍯', '🏮', '🌲', '🎭'];
        return defaultEmojis[type];
    },

    // 난이도 계산 (레벨 ID 기반)
    calculateDifficulty() {
        const levelId = this.currentLevel.id;

        // 20레벨까지는 5가지 블록
        // 21-40레벨은 6가지 블록
        // 41-60레벨은 7가지 블록
        // 61+ 레벨은 8가지 블록
        if (levelId <= 20) {
            return { blockTypes: 5, gridSize: 7 };
        } else if (levelId <= 40) {
            return { blockTypes: 6, gridSize: 7 };
        } else if (levelId <= 60) {
            return { blockTypes: 7, gridSize: 8 };
        } else {
            return { blockTypes: 8, gridSize: 8 };
        }
    },

    // 드래그 이벤트 설정
    addDragEvents(block, x, y) {
        let isDragging = false;
        let startX, startY;
        let dragStartTime = 0;

        // 마우스/터치 이동 핸들러
        const onMove = (e) => {
            if (!isDragging) return;

            // passive: false로 설정했기 때문에 preventDefault 가능
            if (e.cancelable) {
                e.preventDefault();
            }

            const touch = e.touches ? e.touches[0] : e;
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            // 블록을 드래그 위치로 이동 (시각적 피드백)
            block.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
        };

        // 마우스/터치 종료 핸들러
        const onEnd = (e) => {
            if (!isDragging) return;

            isDragging = false;
            const touch = e.changedTouches ? e.changedTouches[0] : e;
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const dragDuration = Date.now() - dragStartTime;

            // 원래 위치로 복귀
            block.style.transform = '';
            block.style.zIndex = '';
            block.classList.remove('selected');

            // 이벤트 리스너 제거
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchend', onEnd);

            // 부스터 활성화 중이면 부스터 사용
            if (this.activeBooster && dragDuration < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                this.useBooster(x, y);
                return;
            }

            // 특수 블록 클릭 감지 (짧은 시간 + 짧은 거리 = 탭)
            const blockType = this.grid[y][x];
            if (dragDuration < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                if (blockType >= 100 && blockType <= 104) {
                    // 특수 블록 활성화
                    this.activateSpecialBlock(x, y, blockType);
                    return;
                }
            }

            // 드래그 방향 판단
            const direction = this.getSwipeDirection(deltaX, deltaY);

            if (direction) {
                const targetX = x + direction.x;
                const targetY = y + direction.y;

                if (targetX >= 0 && targetX < this.gridSize &&
                    targetY >= 0 && targetY < this.gridSize) {
                    this.swapBlocks({ x, y }, { x: targetX, y: targetY });
                }
            }
        };

        // 마우스/터치 시작 핸들러
        const onStart = (e) => {
            if (this.isAnimating) return;

            // 터치 이벤트면 preventDefault로 스크롤 방지
            if (e.type === 'touchstart' && e.cancelable) {
                e.preventDefault();
            }

            isDragging = true;
            dragStartTime = Date.now();

            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;

            block.classList.add('selected');
            block.style.zIndex = '100';
            block.style.transform = 'scale(1.2)';

            // move와 end 이벤트를 window에 등록 (드래그가 블록 밖으로 나가도 동작)
            window.addEventListener('mousemove', onMove, { passive: false });
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('mouseup', onEnd, { passive: true });
            window.addEventListener('touchend', onEnd, { passive: true });
        };

        // 블록에 시작 이벤트만 등록
        block.addEventListener('mousedown', onStart, { passive: false });
        block.addEventListener('touchstart', onStart, { passive: false });
    },

    // 스와이프 방향 판단
    getSwipeDirection(deltaX, deltaY) {
        const threshold = 30; // 최소 드래그 거리

        if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
            return null; // 너무 짧은 드래그
        }

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 가로 방향
            return deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
        } else {
            // 세로 방향
            return deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
        }
    },

    // 특수 블록 활성화
    async activateSpecialBlock(x, y, type) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const typeNames = {
            100: '가로',
            101: '세로',
            102: '십자',
            103: '3x3 폭탄',
            104: '같은 색 전체'
        };
        console.log(`특수 블록 활성화! 위치: (${x}, ${y}), 타입: ${typeNames[type]}`);

        const blocksToRemove = [];

        if (type === 100) {
            // 가로 줄 전체 제거
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[y][i] !== -1) {
                    blocksToRemove.push({ x: i, y });
                }
            }
        } else if (type === 101) {
            // 세로 줄 전체 제거
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][x] !== -1) {
                    blocksToRemove.push({ x, y: i });
                }
            }
        } else if (type === 102) {
            // 십자 - 가로 + 세로 동시 제거
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[y][i] !== -1) {
                    blocksToRemove.push({ x: i, y });
                }
            }
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][x] !== -1 && i !== y) {
                    blocksToRemove.push({ x, y: i });
                }
            }
        } else if (type === 103) {
            // 3x3 범위 폭탄
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < this.gridSize && ny >= 0 && ny < this.gridSize) {
                        if (this.grid[ny][nx] !== -1) {
                            blocksToRemove.push({ x: nx, y: ny });
                        }
                    }
                }
            }
        } else if (type === 104) {
            // 같은 색 전체 제거
            const targetColor = this.grid[y][x];
            for (let cy = 0; cy < this.gridSize; cy++) {
                for (let cx = 0; cx < this.gridSize; cx++) {
                    if (this.grid[cy][cx] === targetColor && this.grid[cy][cx] < 100) {
                        blocksToRemove.push({ x: cx, y: cy });
                    }
                }
            }
        }

        // 점수 추가
        const scoreMultiplier = type === 104 ? 200 : (type === 103 ? 180 : 150);
        this.score += blocksToRemove.length * scoreMultiplier;
        this.updateUI();

        // 블록 제거 애니메이션
        blocksToRemove.forEach(pos => {
            const blocks = document.querySelectorAll('.block');
            const index = pos.y * this.gridSize + pos.x;
            const block = blocks[index];

            if (block) {
                block.classList.add('exploding');
                this.createParticles(block, this.grid[pos.y][pos.x]);
            }

            this.grid[pos.y][pos.x] = -1;
        });

        await this.sleep(500);

        this.renderBoard();
        await this.sleep(200);

        // 중력 적용
        await this.applyGravity();

        // 새 블록 생성
        this.fillEmpty();
        this.renderBoard();
        await this.sleep(300);

        // 연쇄 매칭 확인
        const newMatchResult = this.findMatches();
        if (newMatchResult.matches.length > 0) {
            await this.processMatches(newMatchResult.matches, newMatchResult.matchGroups);
        }

        this.isAnimating = false;
        this.checkWinCondition();
    },

    async swapBlocks(block1, block2) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 블록 요소 가져오기 (캐싱)
        const blocks = document.querySelectorAll('.block');
        const index1 = block1.y * this.gridSize + block1.x;
        const index2 = block2.y * this.gridSize + block2.x;
        const elem1 = blocks[index1];
        const elem2 = blocks[index2];

        // GPU 가속 활성화
        elem1.style.willChange = 'transform';
        elem2.style.willChange = 'transform';

        // 스와이프 애니메이션
        const gap = 3;
        const dx = (block2.x - block1.x) * (elem1.offsetWidth + gap);
        const dy = (block2.y - block1.y) * (elem1.offsetHeight + gap);

        // 더 빠른 애니메이션 (0.15s)
        const smoothEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        elem1.style.transition = `transform 0.15s ${smoothEasing}`;
        elem2.style.transition = `transform 0.15s ${smoothEasing}`;
        elem1.style.transform = `translate(${dx}px, ${dy}px)`;
        elem2.style.transform = `translate(${-dx}px, ${-dy}px)`;
        elem1.style.zIndex = '10';
        elem2.style.zIndex = '10';

        await this.sleep(150); // 더 짧은 대기

        // 그리드에서 교환
        const temp = this.grid[block1.y][block1.x];
        this.grid[block1.y][block1.x] = this.grid[block2.y][block2.x];
        this.grid[block2.y][block2.x] = temp;

        // 스타일 초기화
        elem1.style.cssText = '';
        elem2.style.cssText = '';

        this.renderBoard();

        // 매칭 확인
        const matchResult = this.findMatches();

        if (matchResult.matches.length > 0) {
            this.movesLeft--;
            await this.processMatches(matchResult.matches, matchResult.matchGroups);
            this.checkWinCondition();
        } else {
            // 매칭 실패 - 원래대로 되돌리기
            const temp = this.grid[block1.y][block1.x];
            this.grid[block1.y][block1.x] = this.grid[block2.y][block2.x];
            this.grid[block2.y][block2.x] = temp;

            this.renderBoard();

            const blocks2 = document.querySelectorAll('.block');
            const elem1_new = blocks2[index1];
            const elem2_new = blocks2[index2];

            elem1_new.style.willChange = 'transform';
            elem2_new.style.willChange = 'transform';

            const bounceEasing = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            elem1_new.style.transition = `transform 0.12s ${bounceEasing}`;
            elem2_new.style.transition = `transform 0.12s ${bounceEasing}`;
            elem1_new.style.transform = `translate(${dx}px, ${dy}px)`;
            elem2_new.style.transform = `translate(${-dx}px, ${-dy}px)`;

            await this.sleep(120);

            elem1_new.style.cssText = '';
            elem2_new.style.cssText = '';

            this.renderBoard();
        }

        this.updateUI();
        this.isAnimating = false;
    },

    findMatches() {
        const matches = [];
        const matchGroups = []; // 각 매칭 그룹을 별도로 저장

        // 가로 매칭
        for (let y = 0; y < this.gridSize; y++) {
            let matchCount = 1;
            let matchStart = 0;

            for (let x = 1; x <= this.gridSize; x++) {
                if (x < this.gridSize && this.grid[y][x] === this.grid[y][x - 1] && this.grid[y][x] !== -1) {
                    matchCount++;
                } else {
                    if (matchCount >= 3) {
                        const group = [];
                        for (let i = matchStart; i < x; i++) {
                            group.push({ x: i, y, isSpecial: matchCount >= 4 });
                            matches.push({ x: i, y });
                        }
                        matchGroups.push({ blocks: group, count: matchCount, direction: 'horizontal' });
                    }
                    matchCount = 1;
                    matchStart = x;
                }
            }
        }

        // 세로 매칭
        for (let x = 0; x < this.gridSize; x++) {
            let matchCount = 1;
            let matchStart = 0;

            for (let y = 1; y <= this.gridSize; y++) {
                if (y < this.gridSize && this.grid[y][x] === this.grid[y - 1][x] && this.grid[y][x] !== -1) {
                    matchCount++;
                } else {
                    if (matchCount >= 3) {
                        const group = [];
                        for (let i = matchStart; i < y; i++) {
                            group.push({ x, y: i, isSpecial: matchCount >= 4 });
                            matches.push({ x, y: i });
                        }
                        matchGroups.push({ blocks: group, count: matchCount, direction: 'vertical' });
                    }
                    matchCount = 1;
                    matchStart = y;
                }
            }
        }

        return { matches, matchGroups };
    },

    async processMatches(matches, matchGroups) {
        this.isAnimating = true;

        // 중복 제거
        const uniqueMatches = [...new Set(matches.map(m => `${m.x},${m.y}`))].map(str => {
            const [x, y] = str.split(',').map(Number);
            return { x, y };
        });

        // 특수 블록 생성 위치들 결정 (모든 4개 이상 매칭 그룹)
        const specialBlocks = [];
        for (const group of matchGroups) {
            const midIndex = Math.floor(group.blocks.length / 2);
            const pos = {
                x: group.blocks[midIndex].x,
                y: group.blocks[midIndex].y
            };

            if (group.count >= 7) {
                // 7개 이상 - 같은 색 전체 제거
                specialBlocks.push({
                    ...pos,
                    type: 104,
                    color: this.grid[pos.y][pos.x]
                });
            } else if (group.count === 6) {
                // 6개 - 3x3 범위 폭탄
                specialBlocks.push({
                    ...pos,
                    type: 103
                });
            } else if (group.count === 5) {
                // 5개 이상 - 십자 모양 특수 블록
                specialBlocks.push({
                    ...pos,
                    type: 102 // 십자 (가로+세로)
                });
            } else if (group.count === 4) {
                // 4개 - 가로줄 or 세로줄 제거
                specialBlocks.push({
                    ...pos,
                    type: group.direction === 'horizontal' ? 100 : 101
                });
            }
        }

        // 점수 추가 및 즉시 UI 업데이트
        const baseScore = uniqueMatches.length * 100;
        const bonusScore = specialBlocks.length * 300;
        this.score += baseScore + bonusScore;
        this.updateUI();

        // 화면 흔들림 효과 적용
        const puzzleBoard = document.querySelector('.puzzle-board');
        const isCombo = uniqueMatches.length >= 6;
        if (puzzleBoard) {
            puzzleBoard.classList.remove('shake', 'shake-strong');
            void puzzleBoard.offsetWidth; // 애니메이션 리셋
            puzzleBoard.classList.add(isCombo ? 'shake-strong' : 'shake');
        }

        // 대량 매칭 시 폭발 플래시 효과
        if (uniqueMatches.length >= 5) {
            this.createExplosionFlash();
        }

        // 블록 제거 애니메이션 (특수 블록 위치 제외)
        let soundCount = 0; // 동시에 너무 많은 사운드 방지
        uniqueMatches.forEach(m => {
            // 특수 블록 생성 위치는 제거하지 않음
            if (specialBlocks.some(sb => sb.x === m.x && sb.y === m.y)) {
                return;
            }

            const blocks = document.querySelectorAll('.block');
            const index = m.y * this.gridSize + m.x;
            const block = blocks[index];

            if (block) {
                block.classList.add('exploding');
                this.createParticles(block, this.grid[m.y][m.x]);

                // 강화된 버블 팝 사운드
                if (soundCount < 8 && typeof audioManager !== 'undefined') {
                    setTimeout(() => {
                        audioManager.playExplosivePopSound();
                    }, soundCount * 25);
                    soundCount++;
                }
            }

            this.grid[m.y][m.x] = -1;
        });

        // 모든 특수 블록 생성
        for (const sb of specialBlocks) {
            this.grid[sb.y][sb.x] = sb.type;
            const typeName = sb.type === 102 ? '십자' : (sb.type === 100 ? '가로' : '세로');
            console.log(`특수 블록 생성! 위치: (${sb.x}, ${sb.y}), 타입: ${typeName}`);
        }

        await this.sleep(280); // 폭발 애니메이션 (더 빠르게)

        this.renderBoard();
        await this.sleep(60); // 렌더링 안정화 (최소화)

        // 중력 적용
        await this.applyGravity();

        // 새 블록 생성
        this.fillEmpty();
        this.renderBoard();
        await this.sleep(150); // 새 블록 등장 (더 빠르게)

        // 연쇄 매칭 확인 - requestAnimationFrame 사용
        requestAnimationFrame(async () => {
            const newMatchResult = this.findMatches();
            if (newMatchResult.matches.length > 0) {
                await this.processMatches(newMatchResult.matches, newMatchResult.matchGroups);
            }
        });

        this.isAnimating = false;
    },

    // 폭발 플래시 효과 생성
    createExplosionFlash() {
        const flash = document.createElement('div');
        flash.className = 'explosion-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
    },

    // 파티클 효과 생성 - 임팩트 강화
    createParticles(blockElement, type) {
        const rect = blockElement.getBoundingClientRect();
        const colors = [
            ['#FF69B4', '#FF1493', '#FF6B81'], // 핑크
            ['#FFD700', '#FFA500', '#FFEC8B'], // 골드
            ['#4682B4', '#1E90FF', '#87CEEB'], // 블루
            ['#32CD32', '#00FF00', '#90EE90'], // 그린
            ['#9370DB', '#8A2BE2', '#DDA0DD'], // 퍼플
            ['#FF8C00', '#FF6347', '#FFB347'], // 오렌지
            ['#FF4500', '#DC143C', '#FF6B6B'], // 레드
            ['#00CED1', '#20B2AA', '#7FFFD4']  // 시안
        ];

        const colorSet = colors[type % colors.length] || colors[0];
        const particleCount = 8; // 파티클 수 줄임 (성능 개선)

        // DocumentFragment 사용으로 DOM 접근 최소화
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const randomColor = colorSet[Math.floor(Math.random() * colorSet.length)];
            particle.style.cssText = `
                background: radial-gradient(circle at 30% 30%, white 0%, ${randomColor} 50%, transparent 100%);
                box-shadow: 0 0 8px ${randomColor};
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: ${6 + Math.random() * 8}px;
                height: ${6 + Math.random() * 8}px;
                will-change: transform, opacity;
            `;

            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
            const distance = 50 + Math.random() * 60;
            particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--ty', (Math.sin(angle) * distance - 15) + 'px');

            fragment.appendChild(particle);
        }

        document.body.appendChild(fragment);

        // 일괄 삭제로 성능 개선
        setTimeout(() => {
            document.querySelectorAll('.particle').forEach(p => p.remove());
        }, 800);

        // 추가 스파클 효과 (간소화)
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'particle sparkle';
                sparkle.style.cssText = `
                    background: white;
                    box-shadow: 0 0 10px white, 0 0 20px gold;
                    left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 20}px;
                    top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * 20}px;
                    width: 5px;
                    height: 5px;
                    will-change: transform, opacity;
                `;

                const angle = Math.random() * Math.PI * 2;
                const distance = 60 + Math.random() * 40;
                sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
                sparkle.style.setProperty('--ty', (Math.sin(angle) * distance - 20) + 'px');

                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 600);
            }, i * 60);
        }
    },

    async applyGravity() {
        let movedBlocks = []; // 이동한 블록들의 위치 저장

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = this.gridSize - 1; y >= 0; y--) {
                if (this.grid[y][x] === -1) {
                    // 위에서 블록 찾기
                    for (let k = y - 1; k >= 0; k--) {
                        if (this.grid[k][x] !== -1) {
                            this.grid[y][x] = this.grid[k][x];
                            this.grid[k][x] = -1;
                            movedBlocks.push({ x, y }); // 이동한 블록 기록
                            break;
                        }
                    }
                }
            }
        }

        if (movedBlocks.length > 0) {
            // 떨어지는 애니메이션과 함께 렌더링
            this.renderBoardWithFallAnimation(movedBlocks);
            await this.sleep(220); // 더 빠른 낙하
        }
    },

    renderBoardWithFallAnimation(movedBlocks) {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            const x = index % this.gridSize;
            const y = Math.floor(index / this.gridSize);
            const type = this.grid[y][x];

            if (type === -1) {
                block.style.opacity = '0';
            } else {
                // 이동한 블록만 falling 클래스 추가
                const isMoved = movedBlocks.some(m => m.x === x && m.y === y);
                block.className = `block block-${type}${isMoved ? ' falling' : ''}`;
                block.textContent = this.getBlockEmoji(type);
                block.style.opacity = '1';
            }
        });

        // 애니메이션 클래스 제거
        setTimeout(() => {
            blocks.forEach(block => {
                block.classList.remove('falling');
            });
        }, 400);
    },

    fillEmpty() {
        const difficulty = this.calculateDifficulty();
        const blockTypeCount = difficulty.blockTypes;

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x] === -1) {
                    this.grid[y][x] = Math.floor(Math.random() * blockTypeCount);
                }
            }
        }
    },

    renderBoard() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            const x = index % this.gridSize;
            const y = Math.floor(index / this.gridSize);
            const type = this.grid[y][x];

            if (type === -1) {
                block.style.opacity = '0';
            } else if (type === 100) {
                // 가로 줄 제거
                block.className = 'block block-special-row';
                block.textContent = '⚡';
                block.style.opacity = '1';
            } else if (type === 101) {
                // 세로 줄 제거
                block.className = 'block block-special-column';
                block.textContent = '💥';
                block.style.opacity = '1';
            } else if (type === 102) {
                // 십자 제거
                block.className = 'block block-special-cross';
                block.textContent = '✨';
                block.style.opacity = '1';
            } else if (type === 103) {
                // 3x3 폭탄
                block.className = 'block block-special-bomb';
                block.textContent = '💣';
                block.style.opacity = '1';
            } else if (type === 104) {
                // 같은 색 전체 제거
                block.className = 'block block-special-rainbow';
                block.textContent = '🌈';
                block.style.opacity = '1';
            } else {
                block.className = `block block-${type}`;
                block.textContent = this.getBlockEmoji(type);
                block.style.opacity = '1';
            }
        });
    },

    updateUI() {
        document.getElementById('level-info').textContent = this.currentLevel.regionName || this.currentLevel.name;
        document.getElementById('target-score').textContent = this.currentLevel.targetVal || this.currentLevel.target;
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('moves-left').textContent = this.movesLeft;

        // 실시간 별 상태 업데이트
        const targetScore = this.currentLevel.targetVal || this.currentLevel.target;
        let starCount = 0;
        if (this.score >= targetScore * 1.5) {
            starCount = 3;
        } else if (this.score >= targetScore * 1.2) {
            starCount = 2;
        } else if (this.score >= targetScore) {
            starCount = 1;
        }

        const filledStars = '⭐'.repeat(starCount);
        const emptyStars = '☆'.repeat(3 - starCount);
        const starElement = document.getElementById('star-status');
        if (starElement) {
            starElement.innerHTML = `<span style="color: #FFD700">${filledStars}</span><span style="color: #999; opacity: 0.4">${emptyStars}</span>`;
        }
    },

    async checkWinCondition() {
        const targetScore = this.currentLevel.targetVal || this.currentLevel.target;

        if (this.score >= targetScore) {
            // 목표 달성! 특수 블록 보너스
            this.isAnimating = true;

            // 1단계: 특수 블록 모두 터트리기
            await this.activateRemainingSpecialBlocks();
            await this.sleep(500);

            // 2단계: 남은 이동수를 점수로 환산 (애니메이션)
            await this.convertMovesToScore();
            await this.sleep(500);

            // 3단계: 결과 팝업 표시
            this.showResult(true);
            this.isAnimating = false;
        } else if (this.movesLeft <= 0) {
            setTimeout(() => this.showResult(false), 500);
        }
    },

    // 남은 이동수를 점수로 환산 (애니메이션 효과)
    async convertMovesToScore() {
        if (this.movesLeft <= 0) return;

        const pointsPerMove = 500; // 이동 1개당 500점
        const totalBonus = this.movesLeft * pointsPerMove;

        console.log(`🎁 남은 이동수 ${this.movesLeft}개 -> ${totalBonus}점 보너스!`);

        // 보너스 점수 알림 표시
        const bonusOverlay = document.createElement('div');
        bonusOverlay.className = 'move-bonus-overlay';
        bonusOverlay.innerHTML = `
            <div class="bonus-content">
                <h2>🎁 남은 이동 보너스!</h2>
                <div class="bonus-moves">
                    <span class="moves-count">${this.movesLeft}</span>
                    <span class="moves-label">개 이동 남음</span>
                </div>
                <div class="bonus-arrow">⬇️</div>
                <div class="bonus-score">+<span id="bonus-score-counter">0</span>점</div>
            </div>
        `;
        bonusOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;

        const styleContent = `
            .bonus-content {
                text-align: center;
                color: white;
            }
            .bonus-content h2 {
                font-size: 28px;
                margin-bottom: 20px;
                color: #FFD700;
                text-shadow: 0 2px 10px rgba(255, 215, 0, 0.5);
            }
            .bonus-moves {
                font-size: 24px;
                margin: 15px 0;
            }
            .moves-count {
                font-size: 60px;
                font-weight: bold;
                color: #667eea;
                text-shadow: 0 0 20px rgba(102, 126, 234, 0.8);
            }
            .moves-label {
                display: block;
                margin-top: 5px;
                color: #aaa;
            }
            .bonus-arrow {
                font-size: 40px;
                margin: 15px 0;
                animation: bounce 0.5s infinite alternate;
            }
            .bonus-score {
                font-size: 48px;
                font-weight: bold;
                color: #32CD32;
                text-shadow: 0 0 20px rgba(50, 205, 50, 0.8);
            }
            @keyframes bounce {
                from { transform: translateY(-5px); }
                to { transform: translateY(5px); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;

        const styleTag = document.createElement('style');
        styleTag.textContent = styleContent;
        document.head.appendChild(styleTag);
        document.body.appendChild(bonusOverlay);

        // 점수 카운터 애니메이션
        const bonusCounter = document.getElementById('bonus-score-counter');
        const movesElement = bonusOverlay.querySelector('.moves-count');
        const duration = 1500; // 1.5초 동안 카운트
        const steps = this.movesLeft; // 이동수만큼 스텝
        const interval = duration / steps;

        let currentMoves = this.movesLeft;
        let accumulatedScore = 0;

        for (let i = 0; i < steps; i++) {
            await this.sleep(interval);

            currentMoves--;
            accumulatedScore += pointsPerMove;

            // UI 업데이트
            movesElement.textContent = currentMoves;
            bonusCounter.textContent = accumulatedScore.toLocaleString();

            // 실제 점수 업데이트
            this.score += pointsPerMove;
            this.movesLeft--;
            this.updateUI();

            // 사운드 효과 (있으면)
            if (typeof audioManager !== 'undefined' && i % 2 === 0) {
                audioManager.playExplosivePopSound();
            }
        }

        // 최종 점수 강조
        bonusCounter.style.transform = 'scale(1.3)';
        bonusCounter.style.color = '#FFD700';
        await this.sleep(800);

        // 오버레이 제거
        bonusOverlay.style.animation = 'fadeOut 0.3s ease';
        bonusOverlay.style.opacity = '0';
        await this.sleep(300);
        bonusOverlay.remove();
        styleTag.remove();
    },

    async activateRemainingSpecialBlocks() {
        const specialBlocks = [];

        // 모든 특수 블록 찾기
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const type = this.grid[y][x];
                if (type >= 100 && type <= 104) {
                    specialBlocks.push({ x, y, type });
                }
            }
        }

        if (specialBlocks.length === 0) return;

        // 하나씩 터트리기
        for (const block of specialBlocks) {
            await this.activateSpecialBlock(block.x, block.y, block.type);
            await this.sleep(300);
        }
    },

    showResult(win) {
        const popup = document.getElementById('result-popup');
        document.getElementById('result-title').textContent = win ? '레벨 클리어!' : '실패...';
        document.getElementById('result-score').textContent = `최종 점수: ${this.score}`;


        if (win) {
            // 별 개수 계산
            const starCount = this.score >= this.currentLevel.target * 1.5 ? 3 :
                this.score >= this.currentLevel.target * 1.2 ? 2 : 1;

            // 별 표시 (채워진 별 + 빈 별)
            const filledStars = '⭐'.repeat(starCount);
            const emptyStars = '☆'.repeat(3 - starCount);

            const starsElement = document.getElementById('result-stars');
            starsElement.innerHTML = `
                <div style="font-size: 48px; margin: 20px 0;">
                    <span style="color: #FFD700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${filledStars}</span><span style="color: #999; opacity: 0.3;">${emptyStars}</span>
                </div>
            `;

            const rewardList = document.getElementById('reward-list');
            rewardList.innerHTML = '';

            // 동네 맛집 풀에서 랜덤 아이템 선택
            const levelId = this.currentLevel.id;
            const restaurantPool = GameData.restaurantPools[levelId];

            if (restaurantPool && restaurantPool.restaurants.length > 0) {
                // 랜덤으로 맛집 선택
                const randomIndex = Math.floor(Math.random() * restaurantPool.restaurants.length);
                const selectedRestaurant = restaurantPool.restaurants[randomIndex];

                // 아이템 데이터에 등록 (동적으로)
                if (!GameData.items[selectedRestaurant.itemId]) {
                    GameData.items[selectedRestaurant.itemId] = {
                        name: selectedRestaurant.name,
                        rarity: selectedRestaurant.rarity,
                        effect: "FOOD",
                        value: 10,
                        desc: `${restaurantPool.name}의 ${selectedRestaurant.restaurant}`,
                        restaurant: selectedRestaurant.restaurant
                    };
                }

                // 리스트에 표시
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${selectedRestaurant.name}</strong><br>
                    <small style="color: #999;">📍 ${selectedRestaurant.restaurant} (${restaurantPool.name})</small>
                `;
                rewardList.appendChild(li);

                // Game.onLevelClear에 선택된 아이템 전달
                Game.onLevelClear(this.currentLevel.id, this.score, selectedRestaurant.itemId);
            } else {
                // 풀이 없으면 기본 아이템
                const item = GameData.items[this.currentLevel.reward];
                if (item) {
                    const li = document.createElement('li');
                    li.textContent = `${item.name} (${item.desc})`;
                    rewardList.appendChild(li);
                }
                Game.onLevelClear(this.currentLevel.id, this.score);
            }

            // 다음 레벨 버튼 표시 (자동 이동 대신)
            const nextLevel = GameData.levels.find(l => l.id === this.currentLevel.id + 1);
            const nextLevelBtn = document.getElementById('next-level-btn');
            const nextLevelMsg = document.getElementById('next-level-msg');

            if (nextLevel && nextLevelBtn) {
                nextLevelBtn.style.display = 'inline-block';
                // 현재 레벨 ID를 저장해서 Game.goToNextLevel에서 사용
                Game.currentLevelId = this.currentLevel.id;
            } else if (nextLevelBtn) {
                // 마지막 레벨인 경우
                nextLevelBtn.style.display = 'none';
                if (nextLevelMsg) {
                    nextLevelMsg.textContent = '🎊 모든 레벨을 클리어했습니다!';
                }
            }
        } else {
            document.getElementById('result-stars').textContent = '😢';
        }

        popup.classList.add('active');
    },

    activeBooster: null,

    activateBooster(boosterType) {
        if (this.isAnimating) return;

        // 보유 개수 확인
        if (Game.userData.boosters[boosterType] <= 0) {
            alert('부스터가 부족합니다!\n인벤토리에서 조합하세요.');
            return;
        }

        // 이전 활성화 취소
        document.querySelectorAll('.booster-btn').forEach(btn => btn.classList.remove('active'));

        // 활성화 상태 설정
        this.activeBooster = boosterType;
        const btnId = boosterType === 'HAMMER' ? 'hammer-btn' :
            boosterType === 'BOMB' ? 'bomb-btn' : 'rainbow-btn';
        document.getElementById(btnId).classList.add('active');

        alert(`${GameData.boosters[boosterType].name} 활성화!\n\n블록을 클릭하세요.`);
    },

    async useBooster(x, y) {
        if (!this.activeBooster || this.isAnimating) return;

        const boosterType = this.activeBooster;
        const booster = GameData.boosters[boosterType];

        this.isAnimating = true;

        // 부스터 소비
        Game.userData.boosters[boosterType]--;
        Game.saveUserData();
        this.updateBoosterCounts();

        // 활성화 해제
        this.activeBooster = null;
        document.querySelectorAll('.booster-btn').forEach(btn => btn.classList.remove('active'));

        const blocksToRemove = [];

        if (boosterType === 'HAMMER') {
            // 망치: 블록 1개 제거
            blocksToRemove.push({ x, y });
        } else if (boosterType === 'BOMB') {
            // 폭탄: 3x3 영역 제거
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < this.gridSize && ny >= 0 && ny < this.gridSize) {
                        if (this.grid[ny][nx] !== -1) {
                            blocksToRemove.push({ x: nx, y: ny });
                        }
                    }
                }
            }
        } else if (boosterType === 'RAINBOW') {
            // 레인보우: 같은 색 블록 전체 제거
            const targetColor = this.grid[y][x];
            if (targetColor >= 0 && targetColor < 100) {
                for (let cy = 0; cy < this.gridSize; cy++) {
                    for (let cx = 0; cx < this.gridSize; cx++) {
                        if (this.grid[cy][cx] === targetColor) {
                            blocksToRemove.push({ x: cx, y: cy });
                        }
                    }
                }
            }
        }

        // 점수 추가
        this.score += blocksToRemove.length * 150;
        this.updateUI();

        // 블록 제거 애니메이션
        blocksToRemove.forEach(pos => {
            const blocks = document.querySelectorAll('.block');
            const index = pos.y * this.gridSize + pos.x;
            const block = blocks[index];

            if (block) {
                block.classList.add('exploding');
                this.createParticles(block, this.grid[pos.y][pos.x]);
            }

            this.grid[pos.y][pos.x] = -1;
        });

        await this.sleep(500);

        this.renderBoard();
        await this.sleep(200);

        // 중력 적용
        await this.applyGravity();

        // 새 블록 생성
        this.fillEmpty();
        this.renderBoard();
        await this.sleep(300);

        // 연쇄 매칭 확인
        const newMatchResult = this.findMatches();
        if (newMatchResult.matches.length > 0) {
            await this.processMatches(newMatchResult.matches, newMatchResult.matchGroups);
        }

        this.isAnimating = false;
        this.checkWinCondition();
    },

    updateBoosterCounts() {
        document.getElementById('hammer-count').textContent = Game.userData.boosters.HAMMER;
        document.getElementById('bomb-count').textContent = Game.userData.boosters.BOMB;
        document.getElementById('rainbow-count').textContent = Game.userData.boosters.RAINBOW;

        // 버튼 비활성화 처리
        document.getElementById('hammer-btn').disabled = Game.userData.boosters.HAMMER <= 0;
        document.getElementById('bomb-btn').disabled = Game.userData.boosters.BOMB <= 0;
        document.getElementById('rainbow-btn').disabled = Game.userData.boosters.RAINBOW <= 0;
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
