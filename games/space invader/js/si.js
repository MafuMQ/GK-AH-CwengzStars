// Game constants - ADJUSTED FOR BETTER GAMEPLAY
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 7;
const ENEMY_ROWS = 5;
const ENEMY_COLS = 10;
const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 30;
const ENEMY_SPACING = 15;
const ENEMY_BASE_SPEED = 15; // Increased from 1 to 15 (pixels per move)
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;
const BULLET_SPEED = 8;
const ENEMY_BULLET_SPEED = 6;
const ENEMY_SHOOT_CHANCE = 0.02; // Increased from 0.005 to 0.02 (4x more frequent)
const ENEMY_MOVE_INTERVAL = 800; // Decreased from 1000ms to 800ms (faster movement)

// Game state
let gameState = {
    score: 0,
    lives: 3,
    gameOver: false,
    gameStarted: false
};

// Game objects
let player = {
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: CANVAS_HEIGHT - 50,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    speed: PLAYER_SPEED
};

let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let keys = {};
let lastEnemyMove = 0;
let enemyDirection = 1; // 1 for right, -1 for left
let stars = [];

// DOM elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const finalScoreElement = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const uiOverlay = document.getElementById('ui-overlay');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// Initialize stars for background
function initStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

// Create enemies
function createEnemies() {
    enemies = [];
    const startX = (CANVAS_WIDTH - (ENEMY_COLS * (ENEMY_WIDTH + ENEMY_SPACING))) / 2;
    const startY = 50;

    for (let row = 0; row < ENEMY_ROWS; row++) {
        for (let col = 0; col < ENEMY_COLS; col++) {
            enemies.push({
                x: startX + col * (ENEMY_WIDTH + ENEMY_SPACING),
                y: startY + row * (ENEMY_HEIGHT + ENEMY_SPACING),
                width: ENEMY_WIDTH,
                height: ENEMY_HEIGHT,
                alive: true,
                type: row // Different rows have different colors
            });
        }
    }
}

// Draw player ship
function drawPlayer() {
    ctx.fillStyle = '#4fc3f7';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Draw engine glow
    ctx.fillStyle = '#2196f3';
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height + 5, 8, 0, Math.PI);
    ctx.fill();
}

// Draw enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        if (!enemy.alive) return;

        // Different colors for different rows
        let color;
        switch(enemy.type) {
            case 0: color = '#ff5252'; break; // Red
            case 1: color = '#ff9800'; break; // Orange
            case 2: color = '#ffeb3b'; break; // Yellow
            case 3: color = '#4caf50'; break; // Green
            default: color = '#2196f3'; // Blue
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
        ctx.lineTo(enemy.x, enemy.y);
        ctx.lineTo(enemy.x + enemy.width, enemy.y);
        ctx.closePath();
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width * 0.3, enemy.y + enemy.height * 0.4, 4, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width * 0.7, enemy.y + enemy.height * 0.4, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw bullets
function drawBullets() {
    // Player bullets
    ctx.fillStyle = '#4fc3f7';
    playerBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);
    });

    // Enemy bullets
    ctx.fillStyle = '#ff5252';
    enemyBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);
    });
}

// Draw stars
function drawStars() {
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Move player
function movePlayer() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < CANVAS_WIDTH - player.width) {
        player.x += player.speed;
    }
}

// Move enemies - IMPROVED MOVEMENT LOGIC
function moveEnemies(timestamp) {
    // Move enemies every ENEMY_MOVE_INTERVAL ms
    if (timestamp - lastEnemyMove > ENEMY_MOVE_INTERVAL) {
        lastEnemyMove = timestamp;

        // Check if enemies need to change direction
        let shouldChangeDirection = false;
        enemies.forEach(enemy => {
            if (!enemy.alive) return;

            if ((enemyDirection === 1 && enemy.x + enemy.width >= CANVAS_WIDTH - 10) || 
                (enemyDirection === -1 && enemy.x <= 10)) {
                shouldChangeDirection = true;
            }
        });

        if (shouldChangeDirection) {
            enemyDirection *= -1;
            // Move enemies down
            enemies.forEach(enemy => {
                if (enemy.alive) {
                    enemy.y += 20;
                }
            });
        } else {
            // Move enemies horizontally with increased speed
            enemies.forEach(enemy => {
                if (enemy.alive) {
                    enemy.x += ENEMY_BASE_SPEED * enemyDirection;
                }
            });
        }
    }
}

// Shoot player bullet
function shootPlayerBullet() {
    // Limit to one bullet at a time for better balance
    if (playerBullets.length === 0) {
        playerBullets.push({
            x: player.x + player.width / 2 - BULLET_WIDTH / 2,
            y: player.y,
            width: BULLET_WIDTH,
            height: BULLET_HEIGHT
        });
    }
}

// Enemy shooting - INCREASED FREQUENCY
function enemyShoot() {
    // Only shoot if there are enemies
    if (enemies.length === 0) return;

    // Get alive enemies
    const aliveEnemies = enemies.filter(enemy => enemy.alive);
    if (aliveEnemies.length === 0) return;

    // Higher chance to shoot
    if (Math.random() < ENEMY_SHOOT_CHANCE) {
        // Pick a random alive enemy from the bottom row for more strategic shooting
        const bottomRow = Math.max(...aliveEnemies.map(e => e.type));
        const bottomEnemies = aliveEnemies.filter(e => e.type === bottomRow);
        const shooter = bottomEnemies[Math.floor(Math.random() * bottomEnemies.length)];

        enemyBullets.push({
            x: shooter.x + shooter.width / 2 - BULLET_WIDTH / 2,
            y: shooter.y + shooter.height,
            width: BULLET_WIDTH,
            height: BULLET_HEIGHT
        });
    }
}

// Move bullets
function moveBullets() {
    // Move player bullets up
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        playerBullets[i].y -= BULLET_SPEED;
        // Remove bullets that go off screen
        if (playerBullets[i].y + playerBullets[i].height < 0) {
            playerBullets.splice(i, 1);
        }
    }

    // Move enemy bullets down
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        enemyBullets[i].y += ENEMY_BULLET_SPEED;
        // Remove bullets that go off screen
        if (enemyBullets[i].y > CANVAS_HEIGHT) {
            enemyBullets.splice(i, 1);
        }
    }
}

// Check collisions
function checkCollisions() {
    // Player bullets vs enemies
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        const bullet = playerBullets[i];
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (!enemy.alive) continue;

            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                // Collision detected
                enemy.alive = false;
                playerBullets.splice(i, 1);
                gameState.score += 10;
                scoreElement.textContent = gameState.score;
                break;
            }
        }
    }

    // Enemy bullets vs player
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const bullet = enemyBullets[i];
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            // Player hit
            enemyBullets.splice(i, 1);
            gameState.lives--;
            livesElement.textContent = gameState.lives;

            if (gameState.lives <= 0) {
                gameState.gameOver = true;
            }
            break;
        }
    }

    // Check if all enemies are defeated
    const allEnemiesDead = enemies.every(enemy => !enemy.alive);
    if (allEnemiesDead && !gameState.gameOver) {
        // Create new wave with slightly faster movement
        createEnemies();
        // Optional: Increase difficulty for next wave
    }

    // Check if enemies reached the bottom
    for (const enemy of enemies) {
        if (enemy.alive && enemy.y + enemy.height >= player.y) {
            gameState.gameOver = true;
            break;
        }
    }
}

// Update game state
function update(timestamp) {
    if (!gameState.gameStarted || gameState.gameOver) return;

    movePlayer();
    moveEnemies(timestamp);
    moveBullets();
    enemyShoot();
    checkCollisions();
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars
    drawStars();

    // Draw game objects
    drawPlayer();
    drawEnemies();
    drawBullets();
}

// Game loop
function gameLoop(timestamp) {
    update(timestamp);
    draw();

    if (gameState.gameOver) {
        gameOverScreen.classList.remove('hidden');
        startScreen.classList.add('hidden');
        uiOverlay.style.display = 'flex';
        finalScoreElement.textContent = gameState.score;
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Initialize game
function initGame() {
    gameState = {
        score: 0,
        lives: 3,
        gameOver: false,
        gameStarted: true
    };

    player = {
        x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: CANVAS_HEIGHT - 50,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        speed: PLAYER_SPEED
    };

    playerBullets = [];
    enemyBullets = [];
    keys = {};
    enemyDirection = 1;
    lastEnemyMove = 0;

    scoreElement.textContent = '0';
    livesElement.textContent = '3';

    createEnemies();
    initStars();

    uiOverlay.style.display = 'none';
    gameOverScreen.classList.add('hidden');
    startScreen.classList.add('hidden');

    requestAnimationFrame(gameLoop);
}

// Event listeners
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    // Prevent spacebar from scrolling
    if (e.key === ' ') {
        e.preventDefault();
    }

    // Shoot with spacebar
    if (e.key === ' ' && gameState.gameStarted && !gameState.gameOver) {
        shootPlayerBullet();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', initGame);

// Initialize stars on load
initStars();
