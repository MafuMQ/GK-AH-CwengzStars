import { useState } from "react";
import { Shield, Sword, Eye, Heart, MapPin, Users, MessageCircle, Gamepad2, GraduationCap, Home, Star, Zap, Award } from "lucide-react";

interface CyberHeroRPGProps {
  onClose: () => void;
}

interface CyberbullyingScenario {
  id: number;
  title: string;
  description: string;
  victimMessage: string;
  bullyMessage: string;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actions: {
    intervene: { empathy: number; outcome: string; success: boolean };
    report: { empathy: number; outcome: string; success: boolean };
    block: { empathy: number; outcome: string; success: boolean };
    support: { empathy: number; outcome: string; success: boolean };
  };
}

interface Quest {
  id: number;
  name: string;
  description: string;
  zone: string;
  requiredEmpathy: number;
  scenariosNeeded: number;
  completed: boolean;
  reward: string;
}

interface Zone {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  peaceRestored: boolean;
}

const zones: Zone[] = [
  {
    id: 1,
    name: "Social Media City",
    description: "The bustling hub of online interaction",
    icon: MessageCircle,
    color: "blue",
    unlocked: true,
    peaceRestored: false
  },
  {
    id: 2,
    name: "Gaming Realms",
    description: "Virtual worlds of adventure and competition",
    icon: Gamepad2,
    color: "purple",
    unlocked: false,
    peaceRestored: false
  },
  {
    id: 3,
    name: "School Network",
    description: "Digital classrooms and study groups",
    icon: GraduationCap,
    color: "green",
    unlocked: false,
    peaceRestored: false
  },
  {
    id: 4,
    name: "Community Square",
    description: "Local neighborhood groups and forums",
    icon: Home,
    color: "orange",
    unlocked: false,
    peaceRestored: false
  }
];

const scenarios: CyberbullyingScenario[] = [
  {
    id: 1,
    title: "The Mocking Comments",
    description: "Someone is leaving mean comments on a classmate's photo",
    victimMessage: "Why do people keep commenting 'lol you're so ugly' on my picture? 😢",
    bullyMessage: "lol you're so ugly, delete this pic 😂",
    location: "Social Media City",
    difficulty: 'easy',
    actions: {
      intervene: { empathy: 20, outcome: "You calmly explain that mocking others isn't okay and everyone deserves respect.", success: true },
      report: { empathy: 15, outcome: "You report the comment to the platform moderators.", success: true },
      block: { empathy: 10, outcome: "You help the victim block the bully and remove the comments.", success: true },
      support: { empathy: 25, outcome: "You send encouraging messages and help the victim feel better.", success: true }
    }
  },
  {
    id: 2,
    title: "The Gaming Taunts",
    description: "A player is being harassed during an online game",
    victimMessage: "This player keeps calling me 'noob' and saying I should quit gaming 😔",
    bullyMessage: "You're such a noob, go back to single player games!",
    location: "Gaming Realms",
    difficulty: 'medium',
    actions: {
      intervene: { empathy: 25, outcome: "You remind everyone that gaming should be fun for all skill levels.", success: true },
      report: { empathy: 20, outcome: "You report the toxic behavior to the game moderators.", success: true },
      block: { empathy: 15, outcome: "You help create a positive gaming environment by muting negativity.", success: true },
      support: { empathy: 30, outcome: "You team up with the victim and show them gaming can be supportive.", success: true }
    }
  },
  {
    id: 3,
    title: "The Group Chat Pressure",
    description: "Someone is being excluded and pressured in a study group",
    victimMessage: "They keep leaving me out of the group chat and making fun of my ideas 😢",
    bullyMessage: "Your ideas are stupid, why don't you just leave the group?",
    location: "School Network",
    difficulty: 'hard',
    actions: {
      intervene: { empathy: 30, outcome: "You facilitate inclusive communication and ensure everyone participates.", success: true },
      report: { empathy: 25, outcome: "You report the exclusion to teachers or group administrators.", success: true },
      block: { empathy: 20, outcome: "You help create a new, positive study environment.", success: true },
      support: { empathy: 35, outcome: "You actively include the victim and validate their contributions.", success: true }
    }
  },
  {
    id: 4,
    title: "The Neighborhood Rumor",
    description: "False rumors are spreading in the community forum",
    victimMessage: "People are spreading lies about me in the neighborhood group 😢",
    bullyMessage: "Did you hear what [victim] did? Total liar!",
    location: "Community Square",
    difficulty: 'medium',
    actions: {
      intervene: { empathy: 25, outcome: "You correct the misinformation and promote truth in the community.", success: true },
      report: { empathy: 20, outcome: "You report the false information to community moderators.", success: true },
      block: { empathy: 15, outcome: "You help limit the spread of harmful rumors.", success: true },
      support: { empathy: 30, outcome: "You stand up for the victim and share positive community stories.", success: true }
    }
  }
];

const quests: Quest[] = [
  {
    id: 1,
    name: "Peace in the City",
    description: "Restore peace to Social Media City by resolving 3 bullying encounters",
    zone: "Social Media City",
    requiredEmpathy: 50,
    scenariosNeeded: 3,
    completed: false,
    reward: "Social Media Badge"
  },
  {
    id: 2,
    name: "Gaming Harmony",
    description: "Bring peace to Gaming Realms by helping 3 gamers",
    zone: "Gaming Realms",
    requiredEmpathy: 75,
    scenariosNeeded: 3,
    completed: false,
    reward: "Gaming Hero Title"
  },
  {
    id: 3,
    name: "Study Buddy Network",
    description: "Create a supportive School Network by resolving 3 academic conflicts",
    zone: "School Network",
    requiredEmpathy: 100,
    scenariosNeeded: 3,
    completed: false,
    reward: "Academic Excellence Award"
  },
  {
    id: 4,
    name: "Community Guardian",
    description: "Protect Community Square by stopping 3 rumor campaigns",
    zone: "Community Square",
    requiredEmpathy: 125,
    scenariosNeeded: 3,
    completed: false,
    reward: "Community Hero Medal"
  }
];

const CyberHeroRPG = ({ onClose }: CyberHeroRPGProps) => {
  const [gamePhase, setGamePhase] = useState<'intro' | 'exploration' | 'encounter' | 'action' | 'results' | 'victory'>('intro');
  const [currentZone, setCurrentZone] = useState(0);
  const [empathy, setEmpathy] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [scenariosResolved, setScenariosResolved] = useState(0);
  const [currentScenario, setCurrentScenario] = useState<CyberbullyingScenario | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [encounterLog, setEncounterLog] = useState<string[]>([]);
  const [unlockedZones, setUnlockedZones] = useState<number[]>([1]);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  const addToLog = (message: string) => {
    setEncounterLog(prev => [...prev, message]);
  };

  const checkLevelUp = (newExperience: number) => {
    const newLevel = Math.floor(newExperience / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      addToLog(`🎉 Leveled up to ${newLevel}! Your empathy powers grow stronger!`);
    }
  };

  const checkQuestCompletion = (zoneId: number) => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;

    const quest = quests.find(q => q.zone === zone.name);
    if (!quest) return;

    const zoneScenarios = encounterLog.filter(log =>
      log.includes(`resolved in ${zone.name}`)
    ).length;

    if (zoneScenarios >= quest.scenariosNeeded && empathy >= quest.requiredEmpathy && !quest.completed) {
      setCompletedQuests(prev => [...prev, quest.id]);
      addToLog(`🏆 Quest Completed: ${quest.name}! Reward: ${quest.reward}`);
      return true;
    }
    return false;
  };

  const checkZoneUnlock = (zoneId: number) => {
    if (unlockedZones.includes(zoneId)) return;

    const requiredQuests = quests.filter(q => q.id < zoneId).length;
    if (completedQuests.length >= requiredQuests) {
      setUnlockedZones(prev => [...prev, zoneId]);
      const zone = zones.find(z => z.id === zoneId);
      if (zone) {
        addToLog(`🌟 Unlocked ${zone.name}! A new area needs your help!`);
      }
    }
  };

  const startEncounter = () => {
    const availableScenarios = scenarios.filter(s =>
      zones.find(z => z.name === s.location)?.unlocked &&
      s.location === zones[currentZone].name
    );

    if (availableScenarios.length === 0) {
      addToLog("This area is peaceful for now. Try exploring other zones!");
      return;
    }

    const randomScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
    setCurrentScenario(randomScenario);
    setGamePhase('encounter');
    addToLog(`⚔️ Encounter in ${randomScenario.location}: ${randomScenario.title}`);
  };

  const handleAction = (action: 'intervene' | 'report' | 'block' | 'support') => {
    if (!currentScenario) return;

    setSelectedAction(action);
    setGamePhase('action');

    setTimeout(() => {
      const actionResult = currentScenario.actions[action];
      const newEmpathy = empathy + actionResult.empathy;
      const newExperience = experience + (actionResult.success ? 25 : 10);

      setEmpathy(newEmpathy);
      setExperience(newExperience);
      setScenariosResolved(prev => prev + 1);

      checkLevelUp(newExperience);

      addToLog(`✅ ${actionResult.outcome} (+${actionResult.empathy} empathy)`);

      if (actionResult.success) {
        checkQuestCompletion(zones[currentZone].id);
        checkZoneUnlock(zones[currentZone].id + 1);
      }

      setShowOutcome(true);

      setTimeout(() => {
        setGamePhase('exploration');
        setCurrentScenario(null);
        setSelectedAction(null);
        setShowOutcome(false);
      }, 3000);
    }, 1000);
  };

  const moveToZone = (zoneIndex: number) => {
    if (unlockedZones.includes(zones[zoneIndex].id)) {
      setCurrentZone(zoneIndex);
      addToLog(`🗺️ Traveled to ${zones[zoneIndex].name}`);
    } else {
      addToLog("This area is still locked. Complete more quests to unlock it!");
    }
  };

  const getEmpathyLevel = () => {
    if (empathy >= 150) return { level: "Cyber Guardian", color: "text-purple-600", bg: "bg-purple-100" };
    if (empathy >= 100) return { level: "Empathy Hero", color: "text-blue-600", bg: "bg-blue-100" };
    if (empathy >= 50) return { level: "Kindness Knight", color: "text-green-600", bg: "bg-green-100" };
    return { level: "Digital Citizen", color: "text-gray-600", bg: "bg-gray-100" };
  };

  const empathyInfo = getEmpathyLevel();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-6xl w-full mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Cyber Hero RPG</h2>
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className={`px-3 py-1 rounded-full font-bold ${empathyInfo.color} ${empathyInfo.bg}`}>
              {empathyInfo.level}
            </div>
            <div className="text-xl font-bold text-blue-600">
              Level {level}
            </div>
            <div className="text-lg font-semibold">
              Empathy: {empathy}
            </div>
            <div className="text-sm text-gray-600">
              XP: {experience}
            </div>
          </div>
        </div>

        {/* Game Content */}
        {gamePhase === 'intro' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome to Cyber Hero RPG!</h3>
            <p className="text-lg mb-6">
              You are a digital hero on a quest to restore peace to online communities.
              Instead of fighting with swords, you'll use empathy and wisdom to combat cyberbullying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-2">Your Mission</h4>
                <p className="text-gray-600">
                  Travel through different online zones, encounter cyberbullying scenarios,
                  and choose the right response to increase your Empathy Meter.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="font-bold text-xl mb-2">Your Powers</h4>
                <p className="text-gray-600">
                  <strong>Intervene:</strong> Step in and address the situation<br/>
                  <strong>Report:</strong> Use platform tools to report abuse<br/>
                  <strong>Block:</strong> Help remove toxic influences<br/>
                  <strong>Support:</strong> Provide encouragement to victims
                </p>
              </div>
            </div>
            <button
              onClick={() => setGamePhase('exploration')}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              Begin Your Quest
            </button>
          </div>
        )}

        {gamePhase === 'exploration' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Choose Your Destination</h3>
            <p className="text-lg mb-6">Select an online zone to explore and help maintain peace:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {zones.map((zone, index) => {
                const Icon = zone.icon;
                const isUnlocked = unlockedZones.includes(zone.id);
                const isCurrentZone = index === currentZone;

                return (
                  <div
                    key={zone.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isCurrentZone
                        ? 'border-blue-400 bg-blue-50'
                        : isUnlocked
                        ? 'border-gray-200 bg-white hover:border-gray-300'
                        : 'border-gray-100 bg-gray-50 opacity-50'
                    }`}
                    onClick={() => isUnlocked && moveToZone(index)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-8 h-8 ${isUnlocked ? `text-${zone.color}-600` : 'text-gray-400'}`} />
                      <div>
                        <h4 className="font-bold">{zone.name}</h4>
                        <p className="text-sm text-gray-600">{zone.description}</p>
                      </div>
                    </div>
                    {!isUnlocked && (
                      <div className="text-xs text-gray-500">🔒 Complete previous zones to unlock</div>
                    )}
                    {isUnlocked && zone.peaceRestored && (
                      <div className="text-xs text-green-600">✅ Peace Restored</div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h4 className="font-bold mb-4">Current Zone: {zones[currentZone].name}</h4>
              <p className="text-gray-600 mb-4">{zones[currentZone].description}</p>

              <div className="flex gap-4">
                <button
                  onClick={startEncounter}
                  className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-all"
                >
                  ⚔️ Seek Encounters
                </button>
                <button
                  onClick={() => setGamePhase('victory')}
                  className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-all"
                >
                  📊 View Progress
                </button>
              </div>
            </div>
          </div>
        )}

        {gamePhase === 'encounter' && currentScenario && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">⚔️ Encounter: {currentScenario.title}</h3>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="text-sm text-gray-500 mb-4">Location: {currentScenario.location}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-bold text-blue-700 mb-2">Victim:</div>
                  <div className="text-blue-600">"{currentScenario.victimMessage}"</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm font-bold text-red-700 mb-2">Bully:</div>
                  <div className="text-red-600">"{currentScenario.bullyMessage}"</div>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{currentScenario.description}</p>

              <div className="text-sm text-gray-500 mb-4">
                Choose your response wisely. Each action affects your Empathy Meter!
              </div>

              <button
                onClick={() => setGamePhase('action')}
                className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
              >
                Choose Your Action
              </button>
            </div>
          </div>
        )}

        {gamePhase === 'action' && currentScenario && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Choose Your Response</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleAction('intervene')}
                disabled={!!selectedAction}
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                🗣️ Intervene
              </button>
              <button
                onClick={() => handleAction('report')}
                disabled={!!selectedAction}
                className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-all disabled:opacity-50"
              >
                🚨 Report
              </button>
              <button
                onClick={() => handleAction('block')}
                disabled={!!selectedAction}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition-all disabled:opacity-50"
              >
                🚫 Block
              </button>
              <button
                onClick={() => handleAction('support')}
                disabled={!!selectedAction}
                className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-all disabled:opacity-50"
              >
                🤝 Support
              </button>
            </div>

            {showOutcome && selectedAction && (
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-lg font-bold mb-2">Action Result:</div>
                <div className="text-gray-700">
                  {currentScenario.actions[selectedAction as keyof typeof currentScenario.actions].outcome}
                </div>
                <div className="text-green-600 font-bold mt-2">
                  +{currentScenario.actions[selectedAction as keyof typeof currentScenario.actions].empathy} Empathy
                </div>
              </div>
            )}
          </div>
        )}

        {gamePhase === 'victory' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Hero's Journey</h3>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {empathy}
                  </div>
                  <div className="text-sm text-gray-600">Total Empathy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {scenariosResolved}
                  </div>
                  <div className="text-sm text-gray-600">Scenarios Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {completedQuests.length}
                  </div>
                  <div className="text-sm text-gray-600">Quests Completed</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Active Quests:</h4>
                <div className="space-y-2">
                  {quests.map(quest => (
                    <div
                      key={quest.id}
                      className={`p-3 rounded-lg border ${
                        completedQuests.includes(quest.id)
                          ? 'bg-green-50 border-green-200'
                          : empathy >= quest.requiredEmpathy
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold">{quest.name}</div>
                          <div className="text-sm text-gray-600">{quest.description}</div>
                        </div>
                        <div className="text-right">
                          {completedQuests.includes(quest.id) ? (
                            <div className="text-green-600 font-bold">✅ Completed</div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              {quest.requiredEmpathy} empathy needed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Encounter Log:</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {encounterLog.map((entry, idx) => (
                    <div key={idx} className="text-sm text-gray-700 mb-1">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>

              {completedQuests.length >= 3 && (
                <div className="text-green-700 font-bold text-xl mb-4">
                  🎉 Congratulations! You've become a true Cyber Hero!
                </div>
              )}
            </div>

            <button
              onClick={() => setGamePhase('exploration')}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              Continue Quest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberHeroRPG;