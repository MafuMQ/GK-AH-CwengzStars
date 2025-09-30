import { useState } from "react";
import { Shield, Lock, MapPin, Camera, Key, Wifi, WifiOff, AlertTriangle, CheckCircle, Star, Grid3X3 } from "lucide-react";

interface DataFortressBuilderProps {
  onClose: () => void;
}

interface Tile {
  id: number;
  type: 'data' | 'security' | 'risk';
  category: string;
  name: string;
  value: number;
  icon: any;
  color: string;
  description: string;
}

interface PlacedTile {
  tile: Tile;
  x: number;
  y: number;
  rotation: number;
}

const availableTiles: Tile[] = [
  // Data Tiles (High Value)
  {
    id: 1,
    type: 'data',
    category: 'personal',
    name: 'Family Photo',
    value: 30,
    icon: Camera,
    color: 'blue',
    description: 'Precious family memories'
  },
  {
    id: 2,
    type: 'data',
    category: 'financial',
    name: 'Bank Password',
    value: 50,
    icon: Key,
    color: 'green',
    description: 'Access to financial accounts'
  },
  {
    id: 3,
    type: 'data',
    category: 'location',
    name: 'Location Data',
    value: 25,
    icon: MapPin,
    color: 'purple',
    description: 'Your current location history'
  },
  {
    id: 4,
    type: 'data',
    category: 'social',
    name: 'Social Profile',
    value: 20,
    icon: Star,
    color: 'pink',
    description: 'Your social media identity'
  },

  // Security Tiles (Protectors)
  {
    id: 5,
    type: 'security',
    category: 'password',
    name: 'Strong Password',
    value: 15,
    icon: Lock,
    color: 'green',
    description: 'Complex password with symbols'
  },
  {
    id: 6,
    type: 'security',
    category: 'privacy',
    name: 'Private Settings',
    value: 20,
    icon: Shield,
    color: 'blue',
    description: 'Maximum privacy controls'
  },
  {
    id: 7,
    type: 'security',
    category: 'network',
    name: 'VPN Protection',
    value: 25,
    icon: Wifi,
    color: 'teal',
    description: 'Secure network encryption'
  },
  {
    id: 8,
    type: 'security',
    category: 'auth',
    name: 'Two-Factor Auth',
    value: 30,
    icon: CheckCircle,
    color: 'emerald',
    description: 'Extra security layer'
  },

  // Risk Tiles (Threats)
  {
    id: 9,
    type: 'risk',
    category: 'network',
    name: 'Public WiFi',
    value: -20,
    icon: WifiOff,
    color: 'red',
    description: 'Unsecure public network'
  },
  {
    id: 10,
    type: 'risk',
    category: 'website',
    name: 'Suspicious Site',
    value: -15,
    icon: AlertTriangle,
    color: 'orange',
    description: 'Untrusted website'
  }
];

const DataFortressBuilder = ({ onClose }: DataFortressBuilderProps) => {
  const [gamePhase, setGamePhase] = useState<'intro' | 'building' | 'results'>('intro');
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>(() => {
    const shuffled = [...availableTiles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12); // Start with 12 random tiles
  });
  const [placedTiles, setPlacedTiles] = useState<PlacedTile[]>([]);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [gameBoard, setGameBoard] = useState<(PlacedTile | null)[][]>(
    Array(6).fill(null).map(() => Array(6).fill(null))
  );
  const [gameLog, setGameLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setGameLog(prev => [...prev, message]);
  };

  const calculateScore = (board: (PlacedTile | null)[][]) => {
    let totalScore = 0;
    const checked = Array(6).fill(null).map(() => Array(6).fill(false));

    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        if (board[y][x] && !checked[y][x]) {
          const tile = board[y][x]!;
          let zoneScore = tile.tile.value;
          let zoneSize = 1;
          checked[y][x] = true;

          // Check adjacent tiles for zone bonuses
          const adjacent = [
            [x-1, y], [x+1, y], [x, y-1], [x, y+1]
          ];

          for (const [adjX, adjY] of adjacent) {
            if (adjX >= 0 && adjX < 6 && adjY >= 0 && adjY < 6 && board[adjY][adjX]) {
              const adjTile = board[adjY][adjX]!;
              if (adjTile.tile.type === 'security' && tile.tile.type === 'data') {
                zoneScore += 10; // Security bonus
                addToLog(`🔒 Security bonus: ${tile.tile.name} protected by ${adjTile.tile.name}`);
              } else if (adjTile.tile.type === 'risk' && tile.tile.type === 'data') {
                zoneScore -= 15; // Risk penalty
                addToLog(`⚠️ Risk penalty: ${tile.tile.name} exposed to ${adjTile.tile.name}`);
              }
            }
          }

          totalScore += zoneScore;
        }
      }
    }

    return totalScore;
  };

  const placeTile = (x: number, y: number) => {
    if (!selectedTile || gameBoard[y][x]) return;

    const newPlacedTile: PlacedTile = {
      tile: selectedTile,
      x,
      y,
      rotation: 0
    };

    const newBoard = gameBoard.map(row => [...row]);
    newBoard[y][x] = newPlacedTile;

    setGameBoard(newBoard);
    setPlacedTiles(prev => [...prev, newPlacedTile]);

    // Remove tile from available tiles
    setTiles(prev => prev.filter(t => t.id !== selectedTile.id));

    // Calculate new score
    const newScore = calculateScore(newBoard);
    setScore(newScore);

    addToLog(`📍 Placed ${selectedTile.name} at position (${x+1}, ${y+1})`);
    setSelectedTile(null);
  };

  const getAdjacentTiles = (x: number, y: number) => {
    const adjacent = [];
    const directions = [[-1,0], [1,0], [0,-1], [0,1]];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < 6 && newY >= 0 && newY < 6) {
        adjacent.push([newX, newY]);
      }
    }
    return adjacent;
  };

  const getTileColor = (tile: Tile) => {
    if (tile.type === 'data') return 'bg-blue-100 border-blue-300';
    if (tile.type === 'security') return 'bg-green-100 border-green-300';
    return 'bg-red-100 border-red-300';
  };

  const getSecurityLevel = () => {
    if (score >= 200) return { level: "Impenetrable", color: "text-purple-600" };
    if (score >= 150) return { level: "Fortified", color: "text-green-600" };
    if (score >= 100) return { level: "Secure", color: "text-blue-600" };
    if (score >= 50) return { level: "Protected", color: "text-yellow-600" };
    return { level: "Vulnerable", color: "text-red-600" };
  };

  const finishGame = () => {
    setGamePhase('results');
    const security = getSecurityLevel();
    addToLog(`🏆 Game Complete! Final Security Level: ${security.level} (${score} points)`);
  };

  const resetGame = () => {
    setGamePhase('building');
    setScore(0);
    setTiles(() => {
      const shuffled = [...availableTiles].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 12);
    });
    setPlacedTiles([]);
    setGameBoard(Array(6).fill(null).map(() => Array(6).fill(null)));
    setSelectedTile(null);
    setGameLog([]);
  };

  const securityInfo = getSecurityLevel();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-7xl w-full mx-auto bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Data Fortress Builder</h2>
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className={`text-xl font-bold ${securityInfo.color}`}>
              {securityInfo.level}
            </div>
            <div className="text-lg font-semibold">
              Score: {score}
            </div>
            <div className="text-sm text-gray-600">
              Tiles: {tiles.length} remaining
            </div>
          </div>
        </div>

        {/* Game Content */}
        {gamePhase === 'intro' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Build Your Data Fortress!</h3>
            <p className="text-lg mb-6">
              Strategically place data tiles and security measures to create an impenetrable fortress.
              Protect your valuable information from digital threats!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-100 p-4 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h4 className="font-bold text-blue-700">Data Tiles</h4>
                <p className="text-sm text-blue-600">Valuable information to protect</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-green-700">Security Tiles</h4>
                <p className="text-sm text-green-600">Protection and defense measures</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-red-700">Risk Tiles</h4>
                <p className="text-sm text-red-600">Threats to avoid or contain</p>
              </div>
            </div>
            <button
              onClick={() => setGamePhase('building')}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all"
            >
              Start Building
            </button>
          </div>
        )}

        {gamePhase === 'building' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Build Your Fortress</h3>
            <p className="text-lg mb-6">Click a tile to select it, then click on the grid to place it. Create secure zones and avoid risks!</p>

            {/* Game Board */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-4 text-center">Your Data Fortress (6x6 Grid)</h4>
              <div className="grid grid-cols-6 gap-1 max-w-md mx-auto mb-4">
                {gameBoard.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center text-xs font-bold ${
                        cell
                          ? getTileColor(cell.tile)
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                      }`}
                      onClick={() => placeTile(x, y)}
                    >
                      {cell ? (
                        <div className="text-center">
                          <div className="text-lg mb-1">
                            {cell.tile.type === 'data' ? '📱' :
                             cell.tile.type === 'security' ? '🔒' : '⚠️'}
                          </div>
                          <div className="text-xs leading-tight">{cell.tile.name}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">+</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Available Tiles */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4">Available Tiles ({tiles.length})</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {tiles.map(tile => {
                  const Icon = tile.icon;
                  return (
                    <div
                      key={tile.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTile?.id === tile.id
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTile(tile)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">
                          {tile.type === 'data' ? '📱' :
                           tile.type === 'security' ? '🔒' : '⚠️'}
                        </div>
                        <div className="text-xs font-bold leading-tight mb-1">{tile.name}</div>
                        <div className={`text-xs ${tile.type === 'data' ? 'text-blue-600' : tile.type === 'security' ? 'text-green-600' : 'text-red-600'}`}>
                          {tile.value > 0 ? '+' : ''}{tile.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={finishGame}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-all"
              >
                Complete Fortress
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-700 transition-all"
              >
                Reset Game
              </button>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-bold text-blue-700 mb-1">📱 Data Tiles</div>
                <div className="text-blue-600">Place near security for bonuses</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-bold text-green-700 mb-1">🔒 Security Tiles</div>
                <div className="text-green-600">Protect adjacent data tiles</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="font-bold text-red-700 mb-1">⚠️ Risk Tiles</div>
                <div className="text-red-600">Avoid placing near valuable data</div>
              </div>
            </div>
          </div>
        )}

        {gamePhase === 'results' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Fortress Complete!</h3>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {score} Points
              </div>
              <div className={`text-2xl font-bold mb-4 ${securityInfo.color}`}>
                Security Level: {securityInfo.level}
              </div>

              {score >= 200 && (
                <div className="text-green-700 font-bold text-xl mb-4">
                  🏆 Outstanding! Your fortress is impenetrable!
                </div>
              )}
              {score >= 150 && score < 200 && (
                <div className="text-blue-700 font-bold text-xl mb-4">
                  🔒 Excellent! Your data is well protected!
                </div>
              )}
              {score >= 100 && score < 150 && (
                <div className="text-yellow-700 font-bold text-xl mb-4">
                  🛡️ Good! Your fortress has solid defenses!
                </div>
              )}
              {score < 100 && (
                <div className="text-red-700 font-bold text-xl mb-4">
                  ⚠️ Your fortress needs more security measures!
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-bold mb-2">Building Log:</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {gameLog.map((entry, idx) => (
                    <div key={idx} className="text-sm text-gray-700 mb-1">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>🏗️ Tiles Placed:</strong> {placedTiles.length}
                </div>
                <div>
                  <strong>📊 Average Security:</strong> {placedTiles.length > 0 ? Math.round(score / placedTiles.length) : 0} per tile
                </div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all"
            >
              Build Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFortressBuilder;