// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const gamePage = document.getElementById('gamePage');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const logoutBtn = document.getElementById('logoutBtn');
const gamesGrid = document.getElementById('gamesGrid');
const addGameForm = document.getElementById('addGameForm');
const backToDashboard = document.getElementById('backToDashboard');
const gamePageTitle = document.getElementById('gamePageTitle');
const gameContainer = document.getElementById('gameContainer');

// Demo credentials
const validEmail = "user@example.com";
const validPassword = "password123";

// Sample games data
let games = [
    {
        id: 1,
        title: "Cyber Sort",
        icon: "🔒",
        description: "Sort private and public information in this cybersecurity game",
        url: "#"
    },
    {
        id: 2,
        title: "Math Challenge",
        icon: "🧮",
        description: "Test your math skills with timed challenges",
        url: "#"
    },
    {
        id: 3,
        title: "Word Puzzle",
        icon: "🧩",
        description: "Solve word puzzles and expand your vocabulary",
        url: "#"
    },
    {
        id: 4,
        title: "Memory Game",
        icon: "🧠",
        description: "Match pairs of cards to test your memory",
        url: "#"
    }
];

// Check if user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    showDashboard();
}

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    // Simple validation
    if (email === validEmail && password === validPassword) {
        // Successful login
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            sessionStorage.setItem('isLoggedIn', 'true');
        }
        
        // Show success message
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        // Redirect to dashboard after a short delay
        setTimeout(showDashboard, 1000);
    } else {
        // Show error message
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
});

// Logout button
logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    showLogin();
});

// Back to dashboard button
backToDashboard.addEventListener('click', function() {
    showDashboard();
});

// Add game form submission
addGameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('gameTitle').value;
    const icon = document.getElementById('gameIcon').value;
    const description = document.getElementById('gameDescription').value;
    const url = document.getElementById('gameUrl').value;
    
    // Create new game object
    const newGame = {
        id: games.length + 1,
        title: title,
        icon: icon,
        description: description,
        url: url || "#"
    };
    
    // Add to games array
    games.push(newGame);
    
    // Update games grid
    renderGames();
    
    // Reset form
    addGameForm.reset();
    
    // Show confirmation
    alert('Game added successfully!');
});

// Show login page
function showLogin() {
    loginPage.style.display = 'flex';
    dashboardPage.style.display = 'none';
    gamePage.style.display = 'none';
    loginForm.reset();
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Show dashboard
function showDashboard() {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    gamePage.style.display = 'none';
    renderGames();
}

// Show game page
function showGame(gameId) {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'none';
    gamePage.style.display = 'flex';
    
    // Find the game
    const game = games.find(g => g.id === gameId);
    
    if (game) {
        // Set game title
        gamePageTitle.textContent = game.title;
        
        // Load game content
        loadGameContent(game);
    }
}

// Load game content based on game type
function loadGameContent(game) {
    // Clear previous content
    gameContainer.innerHTML = '';
    
    // Check if this is a built-in game or external URL
    if (game.url && game.url !== '#') {
        // Load external game in iframe
        gameContainer.innerHTML = `
            <iframe src="${game.url}" width="100%" height="600" frameborder="0" style="border-radius: 10px;"></iframe>
            <div style="text-align: center; margin-top: 15px;">
                <button class="back-to-dashboard" onclick="showDashboard()">Back to Dashboard</button>
            </div>
        `;
    } else {
        // Load built-in game content
        switch(game.title) {
            case "Cyber Sort":
                loadCyberSortGame(game);
                break;
            case "Math Challenge":
                loadMathGame(game);
                break;
            case "Word Puzzle":
                loadWordGame(game);
                break;
            case "Memory Game":
                loadMemoryGame(game);
                break;
            default:
                loadDefaultGame(game);
        }
    }
}

// Default game template
function loadDefaultGame(game) {
    gameContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 60px; margin-bottom: 20px;">${game.icon}</div>
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div style="margin-top: 30px; padding: 20px; background: rgba(26, 26, 46, 0.7); border-radius: 10px;">
                <p>This game is under development.</p>
                <p>You can add your own game logic here or link to an external game.</p>
            </div>
            <button class="play-btn" style="margin-top: 20px;" onclick="alert('Game would start now!')">Start Game</button>
        </div>
    `;
}

// Cyber Sort Game (your original game)
function loadCyberSortGame(game) {
    gameContainer.innerHTML = `
        <div id="cyberSortGame">
            <div style="text-align: center; margin-bottom: 30px;">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
            <div style="background: rgba(26, 26, 46, 0.7); padding: 20px; border-radius: 10px;">
                <p style="text-align: center; margin-bottom: 20px;">This is where your Cyber Sort game would be loaded.</p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <div style="width: 200px; height: 200px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 40px;">🔒</span>
                    </div>
                    <div style="width: 200px; height: 200px; background: var(--secondary); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 40px;">🌐</span>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="play-btn" onclick="alert('Cyber Sort game starting!')">Play Cyber Sort</button>
                </div>
            </div>
        </div>
    `;
}

// Simple Math Game
function loadMathGame(game) {
    gameContainer.innerHTML = `
        <div id="mathGame" style="text-align: center;">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div style="background: rgba(26, 26, 46, 0.7); padding: 20px; border-radius: 10px; margin-top: 20px;">
                <div id="mathProblem" style="font-size: 24px; margin: 20px 0;">5 + 3 = ?</div>
                <input type="number" id="mathAnswer" placeholder="Your answer" style="padding: 10px; width: 100px; text-align: center; font-size: 18px;">
                <button class="play-btn" style="margin-left: 10px;" onclick="checkMathAnswer()">Check Answer</button>
                <div id="mathResult" style="margin-top: 15px;"></div>
            </div>
        </div>
    `;
}

// Word Puzzle Game
function loadWordGame(game) {
    gameContainer.innerHTML = `
        <div id="wordGame" style="text-align: center;">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div style="background: rgba(26, 26, 46, 0.7); padding: 20px; border-radius: 10px; margin-top: 20px;">
                <div style="font-size: 20px; margin-bottom: 15px;">Unscramble the word: <strong>LPPAE</strong></div>
                <input type="text" id="wordAnswer" placeholder="Your answer" style="padding: 10px; width: 150px; text-align: center; font-size: 18px;">
                <button class="play-btn" style="margin-left: 10px;" onclick="checkWordAnswer()">Check Answer</button>
                <div id="wordResult" style="margin-top: 15px;"></div>
            </div>
        </div>
    `;
}

// Memory Game
function loadMemoryGame(game) {
    gameContainer.innerHTML = `
        <div id="memoryGame" style="text-align: center;">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div style="background: rgba(26, 26, 46, 0.7); padding: 20px; border-radius: 10px; margin-top: 20px;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px auto; max-width: 300px;">
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                    <div class="memory-card" onclick="flipCard(this)">?</div>
                </div>
                <button class="play-btn" onclick="startMemoryGame()">Start Memory Game</button>
            </div>
        </div>
    `;
}

// Simple game functions (these would be more complex in a real game)
function checkMathAnswer() {
    const answer = document.getElementById('mathAnswer').value;
    const resultDiv = document.getElementById('mathResult');
    
    if (answer === '8') {
        resultDiv.innerHTML = '<span style="color: var(--success)">Correct! Well done!</span>';
    } else {
        resultDiv.innerHTML = '<span style="color: var(--danger)">Try again!</span>';
    }
}

function checkWordAnswer() {
    const answer = document.getElementById('wordAnswer').value;
    const resultDiv = document.getElementById('wordResult');
    
    if (answer.toLowerCase() === 'apple') {
        resultDiv.innerHTML = '<span style="color: var(--success)">Correct! The word is APPLE!</span>';
    } else {
        resultDiv.innerHTML = '<span style="color: var(--danger)">Try again! Hint: It\'s a fruit.</span>';
    }
}

function flipCard(card) {
    card.style.background = 'var(--accent)';
    card.innerHTML = 'A';
    card.style.color = 'white';
}

function startMemoryGame() {
    alert('Memory game started! Match the pairs.');
}

// Render games grid
function renderGames() {
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <button class="play-btn" onclick="showGame(${game.id})">Play Game</button>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

// Make functions globally available for onclick attributes
window.showGame = showGame;
window.checkMathAnswer = checkMathAnswer;
window.checkWordAnswer = checkWordAnswer;
window.flipCard = flipCard;
window.startMemoryGame = startMemoryGame;

// Initial render
renderGames();