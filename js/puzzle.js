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
        this.currentLevel = GameData.levels.find(l => l.id === levelId);
        if (!this.currentLevel) return;

        this.movesLeft = this.currentLevel.moves;
        this.score = 0;
        this.selectedBlock = null;
        this.activeBooster = null;

        this.createBoard();
        this.updateUI();
        this.updateBoosterCounts();
    },

    createBoard() {
        this.grid = [];
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';

        for (let y = 0; y < this.gridSize; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                const type = Math.floor(Math.random() * 5);
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
        const emojis = ['🎒', '🍯', '🏮', '🌲', '🎭'];
        return emojis[type];
    },

    // 드래그 이벤트 설정
    addDragEvents(block, x, y) {
        let isDragging = false;
        let startX, startY;
        let draggedBlock = null;
        let dragStartTime = 0;

        // 마우스/터치 시작
        const onStart = (e) => {
            if (this.isAnimating) return;

            isDragging = true;
            draggedBlock = block;
            dragStartTime = Date.now();

            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;

            block.classList.add('selected');
            block.style.zIndex = '100';
            block.style.transform = 'scale(1.2)';
        };

        // 마우스/터치 이동
        const onMove = (e) => {
            if (!isDragging) return;

            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            // 블록을 드래그 위치로 이동 (시각적 피드백)
            block.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
        };

        // 마우스/터치 끝
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

        // 이벤트 리스너 등록
        block.addEventListener('mousedown', onStart);
        block.addEventListener('touchstart', onStart, { passive: false });

        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });

        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
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

        // 블록 요소 가져오기
        const blocks = document.querySelectorAll('.block');
        const index1 = block1.y * this.gridSize + block1.x;
        const index2 = block2.y * this.gridSize + block2.x;
        const elem1 = blocks[index1];
        const elem2 = blocks[index2];

        // 스와이프 애니메이션 (블록이 서로 교환되는 모습)
        const dx = (block2.x - block1.x) * (elem1.offsetWidth + 4);
        const dy = (block2.y - block1.y) * (elem1.offsetHeight + 4);

        elem1.style.transition = 'transform 0.3s ease-out';
        elem2.style.transition = 'transform 0.3s ease-out';
        elem1.style.transform = `translate(${dx}px, ${dy}px)`;
        elem2.style.transform = `translate(${-dx}px, ${-dy}px)`;

        await this.sleep(300);

        // 그리드에서 교환
        const temp = this.grid[block1.y][block1.x];
        this.grid[block1.y][block1.x] = this.grid[block2.y][block2.x];
        this.grid[block2.y][block2.x] = temp;

        // 애니메이션 초기화
        elem1.style.transition = '';
        elem2.style.transition = '';
        elem1.style.transform = '';
        elem2.style.transform = '';

        this.renderBoard();

        // 매칭 확인
        await this.sleep(100);
        const matchResult = this.findMatches();

        if (matchResult.matches.length > 0) {
            // 매칭 성공
            this.movesLeft--;
            await this.processMatches(matchResult.matches, matchResult.matchGroups);
            this.checkWinCondition();
        } else {
            // 매칭 실패 - 원래대로 되돌리기
            const temp = this.grid[block1.y][block1.x];
            this.grid[block1.y][block1.x] = this.grid[block2.y][block2.x];
            this.grid[block2.y][block2.x] = temp;

            // 되돌리는 애니메이션
            this.renderBoard();
            await this.sleep(100);

            const blocks2 = document.querySelectorAll('.block');
            const elem1_new = blocks2[index1];
            const elem2_new = blocks2[index2];

            elem1_new.style.transition = 'transform 0.2s ease-out';
            elem2_new.style.transition = 'transform 0.2s ease-out';
            elem1_new.style.transform = `translate(${dx}px, ${dy}px)`;
            elem2_new.style.transform = `translate(${-dx}px, ${-dy}px)`;

            await this.sleep(200);

            elem1_new.style.transition = '';
            elem2_new.style.transition = '';
            elem1_new.style.transform = '';
            elem2_new.style.transform = '';

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

        // 블록 제거 애니메이션 (특수 블록 위치 제외)
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
            }

            this.grid[m.y][m.x] = -1;
        });

        // 모든 특수 블록 생성
        for (const sb of specialBlocks) {
            this.grid[sb.y][sb.x] = sb.type;
            const typeName = sb.type === 102 ? '십자' : (sb.type === 100 ? '가로' : '세로');
            console.log(`특수 블록 생성! 위치: (${sb.x}, ${sb.y}), 타입: ${typeName}`);
        }

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
    },

    // 파티클 효과 생성
    createParticles(blockElement, type) {
        const rect = blockElement.getBoundingClientRect();
        const colors = [
            '#FF69B4', // 빨강
            '#FFD700', // 노랑
            '#4682B4', // 파랑
            '#32CD32', // 초록
            '#9370DB'  // 보라
        ];

        const color = colors[type];
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.background = color;
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';

            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
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
            await this.sleep(400);
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
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x] === -1) {
                    this.grid[y][x] = Math.floor(Math.random() * 5);
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
        document.getElementById('level-info').textContent = this.currentLevel.name;
        document.getElementById('target-score').textContent = this.currentLevel.target;
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('moves-left').textContent = this.movesLeft;
    },

    async checkWinCondition() {
        if (this.score >= this.currentLevel.target) {
            // 목표 달성! 특수 블록 보너스
            await this.activateRemainingSpecialBlocks();
            setTimeout(() => this.showResult(true), 500);
        } else if (this.movesLeft <= 0) {
            setTimeout(() => this.showResult(false), 500);
        }
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
            const stars = this.score >= this.currentLevel.target * 1.5 ? '⭐⭐⭐' :
                this.score >= this.currentLevel.target * 1.2 ? '⭐⭐' : '⭐';
            document.getElementById('result-stars').textContent = stars;

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

            // 3초 후 자동으로 다음 레벨로 이동
            setTimeout(() => {
                popup.classList.remove('active');

                const nextLevel = GameData.levels.find(l => l.id === this.currentLevel.id + 1);
                if (nextLevel) {
                    // 다음 레벨 시작
                    Game.showPuzzle(nextLevel.id);
                } else {
                    // 마지막 레벨이면 지도로
                    alert('축하합니다! 모든 레벨을 클리어했습니다! 🎉');
                    Game.showMap();
                }
            }, 3000);
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
