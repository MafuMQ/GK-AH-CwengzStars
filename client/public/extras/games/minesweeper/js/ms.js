// Vanilla JavaScript Minesweeper

document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const BEGINNER = { mines: 15, size: 10 };
    const INTERMEDIATE = { mines: 40, size: 16 };
    const EXPERT = { mines: 99, size: 22 };
    // Game state
    let board = [];
    let boardSize = BEGINNER.size;
    let mineCount = BEGINNER.mines;
    let flaggedCells = 0;
    let revealedCells = 0;
    let gameOver = false;
    let gameStarted = false;
    let timer = 0;
    let timerInterval = null;
    // DOM elements
    const gameBoard = document.querySelector('.game-board');
    const minesCounter = document.querySelector('.mines-counter');
    const timerDisplay = document.querySelector('.timer');
    const restartBtn = document.querySelector('.restart-btn');
    const winMessage = document.querySelector('.game-message.win');
    const loseMessage = document.querySelector('.game-message.lose');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    // Initialize the game
    function initGame() {
        board = [];
        flaggedCells = 0;
        revealedCells = 0;
        gameOver = false;
        gameStarted = false;
        timer = 0;
        timerDisplay.textContent = `⏱️ ${timer}`;
        minesCounter.textContent = `💣 ${mineCount}`;
        gameBoard.innerHTML = '';
        winMessage.style.display = 'none';
        loseMessage.style.display = 'none';
        restartBtn.textContent = '😊';
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        createBoard();
    }
    // Create the game board
    function createBoard() {
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        for (let row = 0; row < boardSize; row++) {
            board[row] = [];
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                const content = document.createElement('div');
                content.classList.add('cell-content');
                cell.appendChild(content);
                cell.addEventListener('click', () => handleCellClick(row, col));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    handleRightClick(row, col);
                });
                gameBoard.appendChild(cell);
                board[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }
    }
    // Place mines on the board
    function placeMines(firstClickRow, firstClickCol) {
        const positions = [];
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) {
                    continue;
                }
                positions.push({row, col});
            }
        }
        if (positions.length < mineCount) {
            mineCount = positions.length;
        }
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
        for (let i = 0; i < mineCount; i++) {
            const {row, col} = positions[i];
            board[row][col].isMine = true;
        }
        calculateNeighborMines();
    }
    // Calculate the number of mines around each cell
    function calculateNeighborMines() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!board[row][col].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const newRow = row + i;
                            const newCol = col + j;
                            if (
                                newRow >= 0 && 
                                newRow < boardSize && 
                                newCol >= 0 && 
                                newCol < boardSize &&
                                board[newRow][newCol].isMine
                            ) {
                                count++;
                            }
                        }
                    }
                    board[row][col].neighborMines = count;
                }
            }
        }
    }
    // Handle left click on a cell
    function handleCellClick(row, col) {
        if (gameOver || board[row][col].isFlagged) return;
        if (!gameStarted) {
            gameStarted = true;
            placeMines(row, col);
            startTimer();
        }
        const cell = board[row][col];
        if (cell.isRevealed) return;
        revealCell(row, col);
        if (cell.isMine) {
            gameOver = true;
            revealAllMines();
            loseMessage.style.display = 'block';
            restartBtn.textContent = '😵';
            stopTimer();
        } else {
            checkWinCondition();
        }
    }
    // Handle right click (flagging)
    function handleRightClick(row, col) {
        if (gameOver || board[row][col].isRevealed) return;
        const cell = board[row][col];
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell.isFlagged) {
            cell.isFlagged = false;
            cellElement.classList.remove('flagged');
            flaggedCells--;
        } else {
            cell.isFlagged = true;
            cellElement.classList.add('flagged');
            flaggedCells++;
        }
        updateMinesCounter();
    }
    // Reveal a cell and its neighbors if empty
    function revealCell(row, col) {
        if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) return;
        if (board[row][col].isRevealed || board[row][col].isFlagged) return;
        const cell = board[row][col];
        cell.isRevealed = true;
        revealedCells++;
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('revealed');
        if (cell.isMine) {
            cellElement.classList.add('mine');
        } else if (cell.neighborMines > 0) {
            const contentElement = cellElement.querySelector('.cell-content');
            contentElement.textContent = cell.neighborMines;
            cellElement.classList.add(`cell-${cell.neighborMines}`);
        } else {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealCell(row + i, col + j);
                }
            }
        }
    }
    // Reveal all mines when game is lost
    function revealAllMines() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col].isMine) {
                    const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                    if (!board[row][col].isFlagged) {
                        cellElement.classList.add('revealed', 'mine');
                    }
                }
            }
        }
    }
    // Check if the player has won
    function checkWinCondition() {
        const totalCells = boardSize * boardSize;
        if (revealedCells === totalCells - mineCount) {
            gameOver = true;
            winMessage.style.display = 'block';
            restartBtn.textContent = '😎';
            stopTimer();
            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    if (board[row][col].isMine && !board[row][col].isFlagged) {
                        board[row][col].isFlagged = true;
                        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                        cellElement.classList.add('flagged');
                    }
                }
            }
            updateMinesCounter();
        }
    }
    // Update the mines counter display
    function updateMinesCounter() {
        minesCounter.textContent = `💣 ${mineCount - flaggedCells}`;
    }
    // Start the game timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = `⏱️ ${timer}`;
        }, 1000);
    }
    // Stop the game timer
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }
    // Event listeners
    restartBtn.addEventListener('click', initGame);
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mineCount = parseInt(btn.dataset.mines);
            boardSize = parseInt(btn.dataset.size);
            initGame();
        });
    });
    // Initialize the game
    initGame();
});
