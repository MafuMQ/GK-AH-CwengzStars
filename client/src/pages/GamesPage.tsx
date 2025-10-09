import { useState } from "react";
import { Game } from "@shared/types";
import { Loader2, Shield, Sword, Grid3X3, Search, Brain, Zap,Eye } from "lucide-react";
import HeaderDashboard from "@/components/HeaderDashboard";
import JuniorAgentGame from "@/components/JuniorAgentGame";
import CyberSafetyQuiz from "@/components/CyberSafetyQuiz";
import CyberHeroRPG from "@/components/CyberHeroRPG";
import DataFortressBuilder from "@/components/DataFortressBuilder";
import CyberRunnerGame from "@/components/CyberRunnerGame";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

// Digital Footprint Game Modal (inline)
function DigitalFootprintGameModal({ onClose }: { onClose: () => void }) {
  const [gamePhase, setGamePhase] = useState<'intro' | 'profile' | 'feed' | 'apps' | 'opportunities' | 'results'>('intro');
  const [currentYear, setCurrentYear] = useState(1);
  const [reputation, setReputation] = useState(50);
  const [digitalFootprint, setDigitalFootprint] = useState<'green' | 'yellow' | 'red'>('green');
  const [footprintHistory, setFootprintHistory] = useState<string[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [selectedApps, setSelectedApps] = useState<number[]>([]);
  const [unlockedOpportunities, setUnlockedOpportunities] = useState<number[]>([]);
  const [gameLog, setGameLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setGameLog(prev => [...prev, `Year ${currentYear}: ${message}`]);
  };

  const updateFootprint = (newEntries: string[]) => {
    const allEntries = [...footprintHistory, ...newEntries];
    setFootprintHistory(allEntries);
    
    const redCount = allEntries.filter(f => f === 'red').length;
    const yellowCount = allEntries.filter(f => f === 'yellow').length;
    const greenCount = allEntries.filter(f => f === 'green').length;
    
    if (redCount > yellowCount + greenCount) {
      setDigitalFootprint('red');
    } else if (yellowCount > greenCount || redCount > 0) {
      setDigitalFootprint('yellow');
    } else {
      setDigitalFootprint('green');
    }
  };

  const handlePostSelection = (postId: number) => {
    const posts = [
      { id: 1, content: "Just got an A+ on my math test! So proud of myself! 🎉", consequences: { reputation: 15, footprint: 'green' as const } },
      { id: 2, content: "At the beach with my family! Perfect day! 🏖️ [Photo of family at beach]", consequences: { reputation: 5, footprint: 'yellow' as const } },
      { id: 3, content: "I hate this teacher! She gave us so much homework! 😡", consequences: { reputation: -20, footprint: 'red' as const } },
      { id: 4, content: "Check out this funny video I found! https://randomsite.com/funny-video", consequences: { reputation: -10, footprint: 'red' as const } },
      { id: 5, content: "My phone number is 555-0123 if anyone wants to text me!", consequences: { reputation: -25, footprint: 'red' as const } },
      { id: 6, content: "Working on a school project about recycling. Anyone have good ideas?", consequences: { reputation: 10, footprint: 'green' as const } }
    ];

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    setSelectedPosts(prev => {
      const newSelection = prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId];
      const reputationChange = prev.includes(postId) ? -post.consequences.reputation : post.consequences.reputation;
      setReputation(current => Math.max(0, Math.min(100, current + reputationChange)));
      updateFootprint(prev.includes(postId) ? [] : [post.consequences.footprint]);
      addToLog(prev.includes(postId) ? `Removed post: "${post.content.substring(0, 30)}..."` : `Posted: "${post.content.substring(0, 30)}..."`);
      return newSelection;
    });
  };

  const handleAppSelection = (appId: number) => {
    const apps = [
      { id: 1, name: "SafeChat", privacyRisk: 'low' as const, reputationChange: 2 },
      { id: 2, name: "SocialSnap", privacyRisk: 'high' as const, reputationChange: -8 },
      { id: 3, name: "StudyBuddy", privacyRisk: 'medium' as const, reputationChange: -4 },
      { id: 4, name: "GameZone", privacyRisk: 'high' as const, reputationChange: -8 }
    ];

    const app = apps.find(a => a.id === appId);
    if (!app) return;

    setSelectedApps(prev => {
      const newSelection = prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId];
      const reputationChange = prev.includes(appId) ? -app.reputationChange : app.reputationChange;
      setReputation(current => Math.max(0, Math.min(100, current + reputationChange)));
      const footprintColor = app.privacyRisk === 'high' ? 'red' : app.privacyRisk === 'medium' ? 'yellow' : 'green';
      updateFootprint(prev.includes(appId) ? [] : [footprintColor]);
      addToLog(prev.includes(appId) ? `Disconnected from ${app.name}` : `Connected ${app.name} app`);
      return newSelection;
    });
  };

  const checkOpportunities = () => {
    const opportunities = [
      { id: 1, name: "Student Council President", requirements: { minReputation: 70, maxRisk: 20 } },
      { id: 2, name: "Summer Internship", requirements: { minReputation: 60, maxRisk: 15 } },
      { id: 3, name: "Sports Team Captain", requirements: { minReputation: 50, maxRisk: 25 } },
      { id: 4, name: "Academic Scholarship", requirements: { minReputation: 80, maxRisk: 10 } }
    ];

    const newlyUnlocked = opportunities.filter(opp => {
      const alreadyUnlocked = unlockedOpportunities.includes(opp.id);
      const meetsRequirements = reputation >= opp.requirements.minReputation && footprintHistory.filter(f => f === 'red').length <= opp.requirements.maxRisk;
      return !alreadyUnlocked && meetsRequirements;
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedOpportunities(prev => [...prev, ...newlyUnlocked.map(opp => opp.id)]);
      newlyUnlocked.forEach(opp => { addToLog(`🎉 Unlocked: ${opp.name}!`); });
    }
  };

  const nextPhase = () => {
    if (gamePhase === 'intro') setGamePhase('profile');
    else if (gamePhase === 'profile') setGamePhase('feed');
    else if (gamePhase === 'feed') setGamePhase('apps');
    else if (gamePhase === 'apps') { setGamePhase('opportunities'); checkOpportunities(); }
    else if (gamePhase === 'opportunities') {
      if (currentYear < 3) {
        setCurrentYear(current => current + 1);
        setGamePhase('feed');
        setSelectedPosts([]);
        setSelectedApps([]);
      } else {
        setGamePhase('results');
      }
    }
  };

  const getFootprintColor = () => {
    switch (digitalFootprint) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'red': return 'text-red-600 bg-red-100';
    }
  };

  const getReputationColor = () => {
    if (reputation >= 70) return 'text-green-600';
    if (reputation >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold" onClick={onClose}>×</button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Digital Footprint Adventure</h2>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-lg font-semibold">Year {currentYear} of 3</span>
            <div className={`px-3 py-1 rounded-full font-bold ${getFootprintColor()}`}>Footprint: {digitalFootprint.toUpperCase()}</div>
            <div className={`text-xl font-bold ${getReputationColor()}`}>Reputation: {reputation}</div>
          </div>
        </div>
        {gamePhase === 'intro' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome to Your Digital Journey!</h3>
            <p className="text-lg mb-6">You're about to embark on a 3-year adventure managing your online presence.</p>
            <button onClick={nextPhase} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700">Start Your Journey</button>
          </div>
        )}
        {gamePhase === 'results' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Digital Journey Complete!</h3>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">Final Reputation: {reputation}</div>
              <div className="text-2xl font-bold text-green-600 mb-4">Digital Footprint: {digitalFootprint.toUpperCase()}</div>
            </div>
            <button onClick={onClose} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700">Close Game</button>
          </div>
        )}
      </div>
    </div>
  );
}

const GamesPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAgentGame, setShowAgentGame] = useState(false);
  const [showDigitalFootprintGame, setShowDigitalFootprintGame] = useState(false);
  const [showCyberHeroRPG, setShowCyberHeroRPG] = useState(false);
  const [showDataFortressBuilder, setShowDataFortressBuilder] = useState(false);
  const [showCyberRunnerGame, setShowCyberRunnerGame] = useState(false);
    // Placeholder states for new games (to be implemented later)
    // const [showMiniGames, setShowMiniGames] = useState(false);
    // const [showCyberSort, setShowCyberSort] = useState(false);
    // const [showMinesweeper, setShowMinesweeper] = useState(false);
    // const [showPong, setShowPong] = useState(false);
    // const [showSpaceInvader, setShowSpaceInvader] = useState(false);

  return (
    <>
      <Helmet>
        <title>Games Library | Cyber Quest</title>
        <meta name="description" content="Explore our collection of fun educational games designed to make learning exciting for grades K-6." />
      </Helmet>
      <HeaderDashboard/>
      <div className="pt-24 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h1 className="font-fredoka text-4xl md:text-5xl text-center mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-yellow-500 bg-clip-text text-transparent">Games Library</span>
          </h1>
          <p className="text-gray-700 text-lg text-center max-w-2xl mx-auto mb-10">
            Explore our collection of interactive educational games designed to make learning fun while building essential skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            <div className="bg-gradient-to-br from-yellow-200 via-blue-100 to-pink-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowAgentGame(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-2">Junior Agent: Spot the Scam!</h3>
              <p className="text-gray-700 mb-4">Analyze digital messages and highlight suspicious elements!</p>
              <Button className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            <div className="bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowQuiz(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Cyber Safety Quiz</h3>
              <p className="text-gray-700 mb-4">Test your cyber safety skills!</p>
              <Button className="bg-purple-600 text-white font-bold px-6 py-2 rounded-full">Play Quiz</Button>
            </div>
            <div className="bg-gradient-to-br from-green-200 via-blue-100 to-purple-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowDigitalFootprintGame(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Digital Footprint Adventure</h3>
              <p className="text-gray-700 mb-4">Manage your online presence!</p>
              <Button className="bg-green-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            <div className="bg-gradient-to-br from-red-200 via-purple-100 to-blue-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowCyberHeroRPG(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Sword className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-700 mb-2">Cyber Hero RPG</h3>
              <p className="text-gray-700 mb-4">Combat cyberbullying in digital realms!</p>
              <Button className="bg-red-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            <div className="bg-gradient-to-br from-cyan-200 via-green-100 to-blue-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowDataFortressBuilder(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid3X3 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">Data Fortress Builder</h3>
              <p className="text-gray-700 mb-4">Build a strategic fortress to protect your data!</p>
              <Button className="bg-cyan-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            <div className="bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowCyberRunnerGame(true)}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Cyber Runner</h3>
              <p className="text-gray-700 mb-4">Run, jump, and dash to deliver messages safely through digital threats!</p>
              <Button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            {/* Mini Games Card */}
            <div className="bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/src/extras/game-portal/index.html', '_blank')}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid3X3 className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-orange-700 mb-2">Mini Games</h3>
              <p className="text-gray-700 mb-4">Choose from an assortment of quick, fun cyber challenges!</p>
              <Button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            {/* Cyber Sort Card */}
            <div className="bg-gradient-to-br from-teal-200 via-blue-100 to-green-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/src/extras/game-portal/game1.html', '_blank')}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-teal-700 mb-2">Cyber Sort</h3>
              <p className="text-gray-700 mb-4">Sort cyber items into private and public spaces to stay safe!</p>
              <Button className="bg-teal-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            {/* Minesweeper Card */}
            <div className="bg-gradient-to-br from-gray-200 via-blue-100 to-yellow-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/src/extras/games/minesweeper/ms.html', '_blank')}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid3X3 className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Minesweeper</h3>
              <p className="text-gray-700 mb-4">Clear the field and avoid digital hazards in this classic challenge!</p>
              <Button className="bg-gray-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            {/* Pong Card */}
            <div className="bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/src/extras/games/pong/pong.html', '_blank')}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Pong</h3>
              <p className="text-gray-700 mb-4">Score points and earn power-ups by answering cyber safety quizzes!</p>
              <Button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
            {/* Space Invader Card */}
            <div className="bg-gradient-to-br from-indigo-200 via-blue-100 to-green-100 rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open('/src/extras/games/space invader/si.html', '_blank')}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Sword className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Space Invader</h3>
              <p className="text-gray-700 mb-4">Defend against alien threats and boost your shields with cyber quizzes!</p>
              <Button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-full">Play Game</Button>
            </div>
          </div>
        </div>
      </div>
      {showAgentGame && <JuniorAgentGame onClose={() => setShowAgentGame(false)} />}
      {showQuiz && <CyberSafetyQuiz onClose={() => setShowQuiz(false)} />}
      {showDigitalFootprintGame && <DigitalFootprintGameModal onClose={() => setShowDigitalFootprintGame(false)} />}
      {showCyberHeroRPG && <CyberHeroRPG onClose={() => setShowCyberHeroRPG(false)} />}
      {showDataFortressBuilder && <DataFortressBuilder onClose={() => setShowDataFortressBuilder(false)} />}
      {showCyberRunnerGame && <CyberRunnerGame onClose={() => setShowCyberRunnerGame(false)} />}
    </>
  );
};

export default GamesPage;
