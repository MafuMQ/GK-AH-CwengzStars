import { useState, useEffect, useCallback, useMemo } from "react";
import { Play, Pause, RotateCcw, Zap, Heart, Shield, AlertTriangle, User, Package, Bug } from "lucide-react";

interface CyberRunnerGameProps {
  onClose: () => void;
}

interface Obstacle {
  id: number;
  type: 'weak_password' | 'suspicious_popup' | 'phish_worm';
  x: number;
  y: number;
  passed: boolean;
}

interface Collectible {
   id: number;
   type: 'private_data' | 'trusted_adult' | 'firewall_boost' | 'antivirus_shield';
   x: number;
   y: number;
   collected: boolean;
 }

const CyberRunnerGame = ({ onClose }: CyberRunnerGameProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [securityScore, setSecurityScore] = useState(100);
  const [distance, setDistance] = useState(0);
  const [wellbeing, setWellbeing] = useState(100);
  const [runnerY, setRunnerY] = useState(50);
  const [isJumping, setIsJumping] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [activeEffects, setActiveEffects] = useState<{type: string, duration: number}[]>([]);

  const jump = useCallback(() => {
    if (!isJumping && gameState === 'playing') {
      setIsJumping(true);
      setRunnerY(20);

      setTimeout(() => {
        setRunnerY(50);
        setIsJumping(false);
      }, 500);
    }
  }, [isJumping, gameState]);

  const dash = useCallback(() => {
    if (gameState === 'playing') {
      setGameSpeed(prev => Math.min(prev + 1, 5));
      setTimeout(() => setGameSpeed(20000), 10000);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setSecurityScore(100);
    setDistance(0);
    setWellbeing(100);
    setRunnerY(50);
    setObstacles([]);
    setCollectibles([]);
    setGameSpeed(2);
    setLives(3);
    setCombo(0);
    setLevel(1);
    setExperience(0);
    setActiveEffects([]);
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setSecurityScore(100);
    setDistance(0);
    setWellbeing(100);
    setObstacles([]);
    setCollectibles([]);
    setLives(3);
    setCombo(0);
    setLevel(1);
    setExperience(0);
    setActiveEffects([]);
    if (gameLoop) {
      clearInterval(gameLoop);
      setGameLoop(null);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        dash();
      } else if (e.code === 'Escape') {
        pauseGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, dash]);

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      const loop = setInterval(() => {
        setDistance(prev => prev + gameSpeed);

        // Move obstacles
        setObstacles(prev => prev.map(obs => ({
          ...obs,
          x: obs.x - gameSpeed
        })).filter(obs => obs.x > -50));

        // Move collectibles
        setCollectibles(prev => prev.map(col => ({
          ...col,
          x: col.x - gameSpeed
        })).filter(col => col.x > -50));

        // Generate new obstacles
        if (Math.random() < 0.02) {
          const types: ('weak_password' | 'suspicious_popup' | 'phish_worm')[] = ['weak_password', 'suspicious_popup', 'phish_worm'];
          const type = types[Math.floor(Math.random() * types.length)];

          const newObstacle: Obstacle = {
            id: Date.now(),
            type,
            x: 100,
            y: type === 'weak_password' ? 60 : type === 'suspicious_popup' ? 30 : 70,
            passed: false
          };
          setObstacles(prev => [...prev, newObstacle]);
        }

        // Generate new collectibles
        if (Math.random() < 0.02) {
          const types: ('private_data' | 'trusted_adult' | 'firewall_boost' | 'antivirus_shield')[] =
            ['private_data', 'trusted_adult', 'firewall_boost', 'antivirus_shield'];
          const type = types[Math.floor(Math.random() * types.length)];

          const newCollectible: Collectible = {
            id: Date.now() + Math.random(),
            type,
            x: 100,
            y: type === 'private_data' ? 40 : type === 'trusted_adult' ? 80 :
               type === 'firewall_boost' ? 60 : 30,
            collected: false
          };
          setCollectibles(prev => [...prev, newCollectible]);
        }

        // Check collisions
        obstacles.forEach(obs => {
          if (obs.x < 15 && obs.x > 5 && !obs.passed) {
            obs.passed = true;

            if (obs.type === 'weak_password' && runnerY < 40) {
              // Hit weak password gap
              setWellbeing(prev => Math.max(0, prev - 20));
              setSecurityScore(prev => Math.max(0, prev - 10));
            } else if (obs.type === 'suspicious_popup' && runnerY > 40) {
              // Hit suspicious popup
              setWellbeing(prev => Math.max(0, prev - 30));
              setSecurityScore(prev => Math.max(0, prev - 15));
            } else if (obs.type === 'phish_worm') {
              // Hit phish worm
              setWellbeing(prev => Math.max(0, prev - 25));
              setSecurityScore(prev => Math.max(0, prev - 20));
            }
          }
        });

        // Check collectibles
        collectibles.forEach(col => {
          if (col.x < 15 && col.x > 5 && !col.collected) {
            col.collected = true;

            if (col.type === 'trusted_adult') {
              setSecurityScore(prev => Math.min(100, prev + 15));
              setGameSpeed(prev => prev + 0.5);
              setTimeout(() => setGameSpeed(2), 2000);
              setCombo(prev => prev + 1);
              setExperience(prev => prev + 10);
            } else if (col.type === 'private_data') {
              setSecurityScore(prev => Math.max(0, prev - 25));
              setCombo(0);
            } else if (col.type === 'firewall_boost') {
              setActiveEffects(prev => [...prev, {type: 'firewall', duration: 1000}]);
              setSecurityScore(prev => Math.min(100, prev + 20));
              setCombo(prev => prev + 1);
              setExperience(prev => prev + 15);
            } else if (col.type === 'antivirus_shield') {
              setActiveEffects(prev => [...prev, {type: 'antivirus', duration: 800}]);
              setLives(prev => Math.min(3, prev + 1));
              setCombo(prev => prev + 1);
              setExperience(prev => prev + 20);
            }
          }
        });

        // Update score
        setScore(prev => prev + gameSpeed);

        // Check game over
        if (wellbeing <= 0 || securityScore <= 0) {
          if (lives > 1) {
            setLives(prev => prev - 1);
            setWellbeing(100);
            setSecurityScore(100);
            setCombo(0);
          } else {
            setGameState('gameOver');
            if (gameLoop) clearInterval(gameLoop);
          }
        }

        // Level progression
        if (Math.floor(distance) > 0 && Math.floor(distance) % 500 === 0) {
          setLevel(prev => prev + 1);
          setGameSpeed(prev => prev + 0.2);
        }
      }, 100);

      setGameLoop(loop);
    }

    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [gameState, gameSpeed, obstacles, collectibles, runnerY, wellbeing, securityScore]);

  const securityInfo = useMemo(() => {
    if (securityScore >= 80) return { level: "Excellent", color: "text-green-600" };
    if (securityScore >= 60) return { level: "Good", color: "text-blue-600" };
    if (securityScore >= 40) return { level: "Fair", color: "text-yellow-600" };
    return { level: "Critical", color: "text-red-600" };
  }, [securityScore]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cyber-runner-title"
    >
      <div className="relative max-w-6xl w-full mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-3xl shadow-2xl p-8">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close Cyber Runner game"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 id="cyber-runner-title" className="text-3xl font-bold text-white mb-2">Cyber Runner</h2>
          <div className="flex justify-center items-center gap-6 text-white" role="status" aria-live="polite">
            <div className="text-lg" aria-label={`Distance traveled: ${Math.floor(distance)} meters`}>
              Distance: {Math.floor(distance)}m
            </div>
            <div className={`text-xl font-bold ${securityInfo.color}`} aria-label={`Security level: ${securityInfo.level}`}>
              Security: {securityInfo.level}
            </div>
            <div className="text-lg" aria-label={`Current score: ${Math.floor(score)}`}>
              Score: {Math.floor(score)}
            </div>
            <div className="text-lg" aria-label={`Lives remaining: ${lives}`}>
              ❤️ Lives: {lives}
            </div>
            <div className="text-lg" aria-label={`Current combo: ${combo}`}>
              🔥 Combo: {combo}
            </div>
            <div className="text-lg" aria-label={`Current level: ${level}`}>
              ⭐ Level: {level}
            </div>
          </div>
        </div>

        {/* Game Content */}
        {gameState === 'menu' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Welcome to Cyber Runner!</h3>
            <p className="text-lg mb-6 text-gray-300">
              Run along the fiber optic cables to deliver a secure message! Jump over weak passwords,
              dash through pop-ups, and make smart decisions to maintain your digital well-being!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-800 p-4 rounded-xl">
                <h4 className="font-bold text-blue-300 mb-2">🎮 Controls</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div><strong>SPACE:</strong> Jump over obstacles</div>
                  <div><strong>SHIFT:</strong> Dash for speed boost</div>
                  <div><strong>ESC:</strong> Pause game</div>
                </div>
              </div>
              <div className="bg-purple-800 p-4 rounded-xl">
                <h4 className="font-bold text-purple-300 mb-2">📊 Objectives</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>✅ Avoid private data cubes</div>
                  <div>✅ Collect trusted adult icons</div>
                  <div>✅ Maintain digital well-being</div>
                  <div>✅ Achieve high security score</div>
                </div>
              </div>
            </div>
            <button
              onClick={startGame}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Start the Cyber Runner game"
            >
              Start Running!
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="relative">
            {/* Game Canvas */}
            <div className="relative w-full h-96 bg-gradient-to-b from-cyan-900 to-blue-900 rounded-xl overflow-hidden border-2 border-cyan-400">
              {/* Fiber Optic Path */}
              <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 to-blue-400"></div>

              {/* Runner */}
              <div
                className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg transition-all duration-300"
                style={{ left: '10%', bottom: `${runnerY}%` }}
              >
                🏃‍♂️
              </div>

              {/* Obstacles */}
              {obstacles.map(obs => (
                <div
                  key={obs.id}
                  className={`absolute w-6 h-6 flex items-center justify-center text-sm ${
                    obs.type === 'weak_password' ? 'bg-yellow-500' :
                    obs.type === 'suspicious_popup' ? 'bg-red-500' : 'bg-purple-500'
                  }`}
                  style={{ left: `${obs.x}%`, bottom: `${obs.y}%` }}
                >
                  {obs.type === 'weak_password' ? '🔑' :
                   obs.type === 'suspicious_popup' ? '📢' : '🐛'}
                </div>
              ))}

              {/* Collectibles */}
              {collectibles.map(col => (
                <div
                  key={col.id}
                  className={`absolute w-6 h-6 flex items-center justify-center text-sm ${
                    col.type === 'private_data' ? 'bg-orange-500' :
                    col.type === 'trusted_adult' ? 'bg-green-500' :
                    col.type === 'firewall_boost' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                  style={{ left: `${col.x}%`, bottom: `${col.y}%` }}
                >
                  {col.type === 'private_data' ? '📦' :
                   col.type === 'trusted_adult' ? '👨‍💼' :
                   col.type === 'firewall_boost' ? '🛡️' : '🛡️'}
                </div>
              ))}

              {/* UI Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-lg font-bold">{wellbeing}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-bold">{securityScore}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={pauseGame}
                    className="bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Help */}
            <div className="mt-4 text-center text-gray-300 text-sm">
              <p>SPACE: Jump | SHIFT: Dash | ESC: Pause</p>
            </div>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Game Paused</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setGameState('playing')}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700"
              >
                Resume
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-700"
              >
                Restart
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Mission Complete!</h3>

            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {Math.floor(distance)}m
                  </div>
                  <div className="text-sm text-gray-400">Distance Traveled</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${securityInfo.color}`}>
                    {securityScore}%
                  </div>
                  <div className="text-sm text-gray-400">Final Security</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    {Math.floor(score)}
                  </div>
                  <div className="text-sm text-gray-400">Total Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {level}
                  </div>
                  <div className="text-sm text-gray-400">Level Reached</div>
                </div>
              </div>

              {securityScore >= 80 && (
                <div className="text-green-400 font-bold text-xl mb-4">
                  🎉 Outstanding! You delivered the message securely!
                </div>
              )}
              {securityScore >= 60 && securityScore < 80 && (
                <div className="text-blue-400 font-bold text-xl mb-4">
                  👍 Good job! The message was delivered safely!
                </div>
              )}
              {securityScore >= 40 && securityScore < 60 && (
                <div className="text-yellow-400 font-bold text-xl mb-4">
                  ⚠️ Close call! Remember to be more careful next time!
                </div>
              )}
              {securityScore < 40 && (
                <div className="text-red-400 font-bold text-xl mb-4">
                  💥 Mission failed! Your digital well-being suffered!
                </div>
              )}
            </div>

            <button
              onClick={startGame}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberRunnerGame;