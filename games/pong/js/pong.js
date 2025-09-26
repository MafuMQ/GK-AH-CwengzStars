// Game elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const gameOverScreen = document.getElementById('game-over');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Game settings
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
const PADDLE_SPEED = 8;
const WINNING_SCORE = 5;

// COMPLETELY REBALANCED DIFFICULTY SETTINGS
const DIFFICULTY_SETTINGS = {
    1: { // Easy - Beatabe with basic skill
        reactionDelay: 15,
        maxSpeed: 4.2,
        errorMargin: 35,
        prediction: 0.4,
        consistency: 0.7
    },
    2: { // Medium - Challenging but fair
        reactionDelay: 8,
        maxSpeed: 5.5,
        errorMargin: 18,
        prediction: 0.7,
        consistency: 0.85
    },
    3: { // Hard - Requires good reflexes
        reactionDelay: 4,
        maxSpeed: 6.8,
        errorMargin: 8,
        prediction: 0.85,
        consistency: 0.95
    },
    4: { // Expert - Very difficult to beat
        reactionDelay: 1,
        maxSpeed: 7.5,
        errorMargin: 3,
        prediction: 0.95,
        consistency: 0.99
    }
};

// Current difficulty level (2 = medium by default)
let currentDifficulty = 2;
let difficultySettings = DIFFICULTY_SETTINGS[currentDifficulty];

// Game state
let playerScore = 0;
let computerScore = 0;
let gameRunning = true;
let framesSinceLastMove = 0;

// Paddle positions
const playerPaddle = {
    x: 30,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0
};

const computerPaddle = {
    x: canvas.width - 30 - PADDLE_WIDTH,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: BALL_SIZE,
    dx: 5,
    dy: 5,
    speed: 5
};

// Key state tracking
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

// Event listeners for keyboard
window.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
        e.preventDefault();
    }
});

// Difficulty button event listeners
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        difficultyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Set difficulty level
        currentDifficulty = parseInt(btn.dataset.level);
        difficultySettings = DIFFICULTY_SETTINGS[currentDifficulty];

        // Reset ball if game is running
        if (gameRunning) {
            resetBall();
        }
    });
});

// Restart button
restartBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
    resetBall();
    gameRunning = true;
    gameOverScreen.style.display = 'none';
});

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // Random direction
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() * 2 - 1) * ball.speed;

    // Reset frame counter for computer AI
    framesSinceLastMove = 0;
}

// Update game state
function update() {
    if (!gameRunning) return;

    // Move player paddle
    playerPaddle.dy = 0;
    if (keys.ArrowUp) playerPaddle.dy = -PADDLE_SPEED;
    if (keys.ArrowDown) playerPaddle.dy = PADDLE_SPEED;

    playerPaddle.y += playerPaddle.dy;

    // Keep player paddle on screen
    if (playerPaddle.y < 0) playerPaddle.y = 0;
    if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }

    // Move computer paddle (AI with adjustable difficulty)
    framesSinceLastMove++;

    // Only move computer paddle after reaction delay
    if (framesSinceLastMove >= difficultySettings.reactionDelay) {
        // Calculate where the ball will be when it reaches the computer paddle
        let predictedY = ball.y;
        if (ball.dx > 0) { // Only predict if ball is moving toward computer
            const framesToReach = (computerPaddle.x - ball.x) / ball.dx;
            predictedY = ball.y + (ball.dy * framesToReach * difficultySettings.prediction);
        }

        // Add some randomness/error based on difficulty
        const error = (Math.random() - 0.5) * difficultySettings.errorMargin;
        const targetY = predictedY + error;

        // Calculate movement direction
        const computerPaddleCenter = computerPaddle.y + computerPaddle.height / 2;
        const diff = targetY - computerPaddleCenter;

        // Apply consistency factor - sometimes the AI doesn't react perfectly
        if (Math.random() > difficultySettings.consistency) {
            // AI makes a small mistake
            computerPaddle.dy = (Math.random() - 0.5) * difficultySettings.maxSpeed * 0.7;
        } else {
            // Normal AI behavior
            if (Math.abs(diff) > 5) {
                computerPaddle.dy = Math.sign(diff) * Math.min(
                    Math.abs(diff) * 0.12, 
                    difficultySettings.maxSpeed
                );
            } else {
                computerPaddle.dy = 0;
            }
        }

        computerPaddle.y += computerPaddle.dy;
        framesSinceLastMove = 0;
    }

    // Keep computer paddle on screen
    if (computerPaddle.y < 0) computerPaddle.y = 0;
    if (computerPaddle.y + computerPaddle.height > canvas.height) {
        computerPaddle.y = canvas.height - computerPaddle.height;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Ball collision with paddles
    // Player paddle
    if (
        ball.x - ball.size < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + playerPaddle.height &&
        ball.dx < 0
    ) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPoint = (ball.y - (playerPaddle.y + playerPaddle.height / 2)) / (playerPaddle.height / 2);
        const angle = hitPoint * (Math.PI / 4); // Max 45 degrees

        ball.dx = Math.abs(ball.dx) * 1.05; // Increase speed slightly
        ball.dy = ball.speed * Math.sin(angle);
    }

    // Computer paddle
    if (
        ball.x + ball.size > computerPaddle.x &&
        ball.y > computerPaddle.y &&
        ball.y < computerPaddle.y + computerPaddle.height &&
        ball.dx > 0
    ) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPoint = (ball.y - (computerPaddle.y + computerPaddle.height / 2)) / (computerPaddle.height / 2);
        const angle = hitPoint * (Math.PI / 4); // Max 45 degrees

        ball.dx = -Math.abs(ball.dx) * 1.05; // Increase speed slightly
        ball.dy = ball.speed * Math.sin(angle);
    }

    // Scoring
    if (ball.x < 0) {
        // Computer scores
        computerScore++;
        computerScoreElem.textContent = computerScore;
        resetBall();

        if (computerScore >= WINNING_SCORE) {
            endGame(false);
        }
    }

    if (ball.x > canvas.width) {
        // Player scores
        playerScore++;
        playerScoreElem.textContent = playerScore;
        resetBall();

        if (playerScore >= WINNING_SCORE) {
            endGame(true);
        }
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

    // Draw ball
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw center line (dashed)
    ctx.setLineDash([10, 15]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// End game function
function endGame(playerWon) {
    gameRunning = false;
    if (playerWon) {
        resultMessage.textContent = 'YOU WIN!';
        resultMessage.className = 'win-message';
    } else {
        resultMessage.textContent = 'COMPUTER WINS!';
        resultMessage.className = 'lose-message';
    }
    gameOverScreen.style.display = 'flex';
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
resetBall();
gameLoop();
