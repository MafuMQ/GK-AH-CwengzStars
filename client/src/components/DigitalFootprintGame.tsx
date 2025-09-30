import { useState, useEffect, useMemo, useCallback } from "react";
import { Heart, MessageCircle, Share2, Users, Smartphone, Shield, AlertTriangle, CheckCircle, X } from "lucide-react";

interface DigitalFootprintGameProps {
  onClose: () => void;
}

interface Post {
  id: number;
  type: 'text' | 'image' | 'link' | 'status';
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'personal' | 'social' | 'achievement' | 'opinion' | 'location' | 'contact';
  consequences: {
    reputation: number;
    opportunities: string[];
    footprint: 'green' | 'yellow' | 'red';
  };
}

interface App {
  id: number;
  name: string;
  description: string;
  privacyRisk: 'low' | 'medium' | 'high';
  dataCollection: string[];
  benefits: string[];
}

interface Opportunity {
  id: number;
  name: string;
  type: 'school' | 'social' | 'career' | 'personal';
  requirements: {
    minReputation: number;
    maxRiskTolerance: number;
    requiredSkills: string[];
  };
  description: string;
}

const posts: Post[] = [
  {
    id: 1,
    type: 'text',
    content: "Just got an A+ on my math test! So proud of myself! 🎉",
    riskLevel: 'low',
    category: 'achievement',
    consequences: {
      reputation: 15,
      opportunities: ['Academic Excellence Award'],
      footprint: 'green'
    }
  },
  {
    id: 2,
    type: 'image',
    content: "At the beach with my family! Perfect day! 🏖️ [Photo of family at beach]",
    riskLevel: 'medium',
    category: 'location',
    consequences: {
      reputation: 5,
      opportunities: [],
      footprint: 'yellow'
    }
  },
  {
    id: 3,
    type: 'text',
    content: "I hate this teacher! She gave us so much homework! 😡",
    riskLevel: 'high',
    category: 'opinion',
    consequences: {
      reputation: -20,
      opportunities: [],
      footprint: 'red'
    }
  },
  {
    id: 4,
    type: 'link',
    content: "Check out this funny video I found! https://randomsite.com/funny-video",
    riskLevel: 'high',
    category: 'social',
    consequences: {
      reputation: -10,
      opportunities: [],
      footprint: 'red'
    }
  },
  {
    id: 5,
    type: 'text',
    content: "My phone number is 555-0123 if anyone wants to text me!",
    riskLevel: 'high',
    category: 'contact',
    consequences: {
      reputation: -25,
      opportunities: [],
      footprint: 'red'
    }
  },
  {
    id: 6,
    type: 'text',
    content: "Working on a school project about recycling. Anyone have good ideas?",
    riskLevel: 'low',
    category: 'achievement',
    consequences: {
      reputation: 10,
      opportunities: ['Environmental Club Leadership'],
      footprint: 'green'
    }
  }
];

const apps: App[] = [
  {
    id: 1,
    name: "SafeChat",
    description: "A privacy-focused messaging app",
    privacyRisk: 'low',
    dataCollection: ['Basic profile info'],
    benefits: ['End-to-end encryption', 'No data sharing']
  },
  {
    id: 2,
    name: "SocialSnap",
    description: "Popular photo sharing platform",
    privacyRisk: 'high',
    dataCollection: ['Photos', 'Location data', 'Contacts', 'Usage patterns'],
    benefits: ['Large user base', 'Photo filters', 'Social features']
  },
  {
    id: 3,
    name: "StudyBuddy",
    description: "Educational networking app",
    privacyRisk: 'medium',
    dataCollection: ['School info', 'Study habits', 'Basic profile'],
    benefits: ['Study groups', 'Resource sharing', 'Academic networking']
  },
  {
    id: 4,
    name: "GameZone",
    description: "Gaming and social platform",
    privacyRisk: 'high',
    dataCollection: ['Gaming activity', 'Friends list', 'Device info', 'Purchase history'],
    benefits: ['Multiplayer games', 'Social features', 'Achievements']
  }
];

const opportunities: Opportunity[] = [
  {
    id: 1,
    name: "Student Council President",
    type: 'school',
    requirements: {
      minReputation: 70,
      maxRiskTolerance: 20,
      requiredSkills: ['Leadership', 'Communication']
    },
    description: "Lead your school's student government and make important decisions"
  },
  {
    id: 2,
    name: "Summer Internship",
    type: 'career',
    requirements: {
      minReputation: 60,
      maxRiskTolerance: 15,
      requiredSkills: ['Responsibility', 'Professionalism']
    },
    description: "Gain valuable work experience at a local business"
  },
  {
    id: 3,
    name: "Sports Team Captain",
    type: 'personal',
    requirements: {
      minReputation: 50,
      maxRiskTolerance: 25,
      requiredSkills: ['Teamwork', 'Motivation']
    },
    description: "Lead your team and help them succeed"
  },
  {
    id: 4,
    name: "Academic Scholarship",
    type: 'school',
    requirements: {
      minReputation: 80,
      maxRiskTolerance: 10,
      requiredSkills: ['Academic Excellence', 'Focus']
    },
    description: "Receive funding to help pay for future education"
  }
];

const DigitalFootprintGame = ({ onClose }: DigitalFootprintGameProps) => {
  const [gamePhase, setGamePhase] = useState<'intro' | 'profile' | 'feed' | 'apps' | 'opportunities' | 'results'>('intro');
  const [currentYear, setCurrentYear] = useState(1);
  const [reputation, setReputation] = useState(50);
  const [digitalFootprint, setDigitalFootprint] = useState<'green' | 'yellow' | 'red'>('green');
  const [footprintHistory, setFootprintHistory] = useState<string[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [selectedApps, setSelectedApps] = useState<number[]>([]);
  const [unlockedOpportunities, setUnlockedOpportunities] = useState<number[]>([]);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showActivity: true,
    allowMessages: true,
    shareLocation: false
  });
  const [weeklyActivity, setWeeklyActivity] = useState(0);

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
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    setSelectedPosts(prev => {
      const newSelection = prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId];

      // Update reputation and footprint
      const reputationChange = prev.includes(postId)
        ? -post.consequences.reputation
        : post.consequences.reputation;

      // Adjust based on privacy settings
      let adjustedReputationChange = reputationChange;
      if (!privacySettings.profileVisible && post.category === 'personal') {
        adjustedReputationChange *= 0.5; // Reduced impact for private profiles
      }
      if (privacySettings.showActivity === false) {
        adjustedReputationChange *= 1.2; // More careful users get better results
      }

      setReputation(current => Math.max(0, Math.min(100, current + adjustedReputationChange)));
      updateFootprint(prev.includes(postId)
        ? []
        : [post.consequences.footprint]);

      // Update risk tolerance based on post risk level
      const riskChange = post.riskLevel === 'high' ? 15 : post.riskLevel === 'medium' ? 8 : 3;
      setRiskTolerance(current => Math.max(0, Math.min(100,
        prev.includes(postId) ? current - riskChange : current + riskChange
      )));

      addToLog(prev.includes(postId)
        ? `Removed post: "${post.content.substring(0, 30)}..."`
        : `Posted: "${post.content.substring(0, 30)}..."`);

      return newSelection;
    });
  };

  const handleAppSelection = (appId: number) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    setSelectedApps(prev => {
      const newSelection = prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId];

      // Update reputation based on privacy risk
      const reputationChange = prev.includes(appId)
        ? (app.privacyRisk === 'high' ? 5 : app.privacyRisk === 'medium' ? 3 : 1)
        : (app.privacyRisk === 'high' ? -8 : app.privacyRisk === 'medium' ? -4 : -2);

      setReputation(current => Math.max(0, Math.min(100, current + reputationChange)));

      const footprintColor = app.privacyRisk === 'high' ? 'red' : app.privacyRisk === 'medium' ? 'yellow' : 'green';
      updateFootprint(prev.includes(appId)
        ? []
        : [footprintColor]);

      addToLog(prev.includes(appId)
        ? `Disconnected from ${app.name}`
        : `Connected ${app.name} app`);

      return newSelection;
    });
  };

  const checkOpportunities = () => {
    const newlyUnlocked = opportunities.filter(opp => {
      const alreadyUnlocked = unlockedOpportunities.includes(opp.id);
      const meetsRequirements =
        reputation >= opp.requirements.minReputation &&
        footprintHistory.filter(f => f === 'red').length <= opp.requirements.maxRiskTolerance;

      return !alreadyUnlocked && meetsRequirements;
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedOpportunities(prev => [...prev, ...newlyUnlocked.map(opp => opp.id)]);
      newlyUnlocked.forEach(opp => {
        addToLog(`🎉 Unlocked: ${opp.name}!`);
      });
    }
  };

  const nextPhase = () => {
    if (gamePhase === 'intro') {
      setGamePhase('profile');
    } else if (gamePhase === 'profile') {
      setGamePhase('feed');
    } else if (gamePhase === 'feed') {
      setGamePhase('apps');
    } else if (gamePhase === 'apps') {
      setGamePhase('opportunities');
      checkOpportunities();
    } else if (gamePhase === 'opportunities') {
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

  const footprintColorClasses = useMemo(() => {
    switch (digitalFootprint) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'red': return 'text-red-600 bg-red-100';
    }
  }, [digitalFootprint]);

  const reputationColorClasses = useMemo(() => {
    if (reputation >= 70) return 'text-green-600';
    if (reputation >= 40) return 'text-yellow-600';
    return 'text-red-600';
  }, [reputation]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="digital-footprint-title"
    >
      <div className="relative max-w-4xl w-full mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none focus:ring-4 focus:ring-gray-300"
          onClick={onClose}
          aria-label="Close Digital Footprint Adventure game"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 id="digital-footprint-title" className="text-3xl font-bold text-purple-700 mb-2">Digital Footprint Adventure</h2>
          <div className="flex justify-center items-center gap-4 mb-4 flex-wrap" role="status" aria-live="polite">
            <span className="text-lg font-semibold" aria-label={`Current year: ${currentYear} of 3`}>
              Year {currentYear} of 3
            </span>
            <div className={`px-3 py-1 rounded-full font-bold ${footprintColorClasses}`} aria-label={`Digital footprint: ${digitalFootprint}`}>
              Footprint: {digitalFootprint.toUpperCase()}
            </div>
            <div className={`text-xl font-bold ${reputationColorClasses}`} aria-label={`Current reputation: ${reputation} out of 100`}>
              Reputation: {reputation}
            </div>
            <div className="flex items-center gap-2" aria-label={`Risk tolerance: ${riskTolerance} out of 100`}>
              <span className="text-sm font-medium">Risk Tolerance:</span>
              <div className="w-20 h-2 bg-gray-200 rounded-full" role="progressbar" aria-valuenow={riskTolerance} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    riskTolerance < 30 ? 'bg-green-500' :
                    riskTolerance < 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${riskTolerance}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold w-8">{riskTolerance}</span>
            </div>
          </div>
        </div>

        {/* Tutorial Modal */}
        {showTutorial && gamePhase === 'intro' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4">
              <h3 className="text-2xl font-bold mb-4 text-center">🎮 How to Play</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="font-bold text-purple-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Manage Your Profile</h4>
                    <p className="text-sm text-gray-600">Set up your digital identity and privacy settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="font-bold text-purple-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Choose Your Posts</h4>
                    <p className="text-sm text-gray-600">Decide what to share on social media - every post matters!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Connect Apps</h4>
                    <p className="text-sm text-gray-600">Choose which apps to use and understand their privacy implications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="font-bold text-purple-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Unlock Opportunities</h4>
                    <p className="text-sm text-gray-600">Build a positive digital footprint to access better opportunities</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowTutorial(false)}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-400"
                >
                  Skip Tutorial
                </button>
                <button
                  onClick={() => {
                    setShowTutorial(false);
                    // Continue to main intro
                  }}
                  className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Content */}
        {gamePhase === 'intro' && !showTutorial && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome to Your Digital Journey!</h3>
            <p className="text-lg mb-6">
              You're about to embark on a 3-year adventure managing your online presence.
              Every choice you make will create a digital footprint that affects your future opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-700">Positive Actions</h4>
                <p className="text-sm text-green-600">Build your reputation and unlock opportunities</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-bold text-yellow-700">Risky Actions</h4>
                <p className="text-sm text-yellow-600">May affect your digital safety</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <X className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-bold text-red-700">Dangerous Actions</h4>
                <p className="text-sm text-red-600">Can harm your reputation and opportunities</p>
              </div>
            </div>
            <button
              onClick={nextPhase}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all focus:outline-none focus:ring-4 focus:ring-purple-300"
              aria-label="Start your digital footprint journey"
            >
              Start Your Journey
            </button>
          </div>
        )}

        {gamePhase === 'profile' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Create Your Digital Profile</h3>
            <p className="text-lg mb-6">Your profile is the foundation of your online presence. Set your privacy preferences wisely!</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Profile Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-20 h-20 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Alex Thompson</h4>
                <p className="text-gray-600 mb-4">Middle School Student | Age 13</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Interests:</strong> Gaming, Sports, Art
                  </div>
                  <div>
                    <strong>Goals:</strong> Good grades, Make friends, Learn new things
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Privacy Settings
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Public Profile</span>
                    <input
                      type="checkbox"
                      checked={privacySettings.profileVisible}
                      onChange={(e) => setPrivacySettings(prev => ({...prev, profileVisible: e.target.checked}))}
                      className="w-4 h-4 text-purple-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Show Online Activity</span>
                    <input
                      type="checkbox"
                      checked={privacySettings.showActivity}
                      onChange={(e) => setPrivacySettings(prev => ({...prev, showActivity: e.target.checked}))}
                      className="w-4 h-4 text-purple-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Allow Direct Messages</span>
                    <input
                      type="checkbox"
                      checked={privacySettings.allowMessages}
                      onChange={(e) => setPrivacySettings(prev => ({...prev, allowMessages: e.target.checked}))}
                      className="w-4 h-4 text-purple-600"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Share Location Data</span>
                    <input
                      type="checkbox"
                      checked={privacySettings.shareLocation}
                      onChange={(e) => setPrivacySettings(prev => ({...prev, shareLocation: e.target.checked}))}
                      className="w-4 h-4 text-purple-600"
                    />
                  </label>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600">
                    💡 <strong>Tip:</strong> More privacy = safer online experience, but you might miss some social opportunities!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={nextPhase}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              Continue to Social Media
            </button>
          </div>
        )}

        {gamePhase === 'feed' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Manage Your Social Media Feed</h3>
            <p className="text-lg mb-6">Choose what to post. Each post creates part of your digital footprint!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {posts.map(post => (
                <div
                  key={post.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPosts.includes(post.id)
                      ? `border-${post.consequences.footprint === 'green' ? 'green' : post.consequences.footprint === 'yellow' ? 'yellow' : 'red'}-400 bg-${post.consequences.footprint === 'green' ? 'green' : post.consequences.footprint === 'yellow' ? 'yellow' : 'red'}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handlePostSelection(post.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      post.consequences.footprint === 'green' ? 'bg-green-500' :
                      post.consequences.footprint === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium mb-2">{post.content}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          post.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                          post.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {post.riskLevel.toUpperCase()} RISK
                        </span>
                        <span className="capitalize">{post.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextPhase}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              Continue to Apps
            </button>
          </div>
        )}

        {gamePhase === 'apps' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Connect Apps & Services</h3>
            <p className="text-lg mb-6">Choose which apps to connect. Some collect more data than others!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {apps.map(app => (
                <div
                  key={app.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedApps.includes(app.id)
                      ? `border-${app.privacyRisk === 'low' ? 'green' : app.privacyRisk === 'medium' ? 'yellow' : 'red'}-400 bg-${app.privacyRisk === 'low' ? 'green' : app.privacyRisk === 'medium' ? 'yellow' : 'red'}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleAppSelection(app.id)}
                >
                  <div className="flex items-start gap-3">
                    <Smartphone className={`w-6 h-6 mt-1 ${
                      app.privacyRisk === 'low' ? 'text-green-600' :
                      app.privacyRisk === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{app.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{app.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          app.privacyRisk === 'low' ? 'bg-green-100 text-green-700' :
                          app.privacyRisk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.privacyRisk.toUpperCase()} PRIVACY RISK
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <strong>Collects:</strong> {app.dataCollection.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextPhase}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              See Opportunities
            </button>
          </div>
        )}

        {gamePhase === 'opportunities' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Available Opportunities</h3>
            <p className="text-lg mb-6">Based on your digital footprint, here are the opportunities available to you:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {opportunities.map(opp => {
                const isUnlocked = unlockedOpportunities.includes(opp.id);
                const canUnlock =
                  reputation >= opp.requirements.minReputation &&
                  footprintHistory.filter(f => f === 'red').length <= opp.requirements.maxRiskTolerance;

                return (
                  <div
                    key={opp.id}
                    className={`p-4 rounded-xl border-2 ${
                      isUnlocked
                        ? 'border-green-400 bg-green-50'
                        : canUnlock
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        isUnlocked ? 'bg-green-500' :
                        canUnlock ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{opp.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{opp.description}</p>
                        <div className="text-xs space-y-1">
                          <div><strong>Type:</strong> {opp.type}</div>
                          <div><strong>Min Reputation:</strong> {opp.requirements.minReputation}</div>
                          <div><strong>Max Risk:</strong> {opp.requirements.maxRiskTolerance} red marks</div>
                          {isUnlocked && (
                            <div className="text-green-600 font-bold">✅ UNLOCKED!</div>
                          )}
                          {!isUnlocked && canUnlock && (
                            <div className="text-yellow-600 font-bold">⚠️ Almost there!</div>
                          )}
                          {!isUnlocked && !canUnlock && (
                            <div className="text-red-600 font-bold">❌ Requirements not met</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={nextPhase}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              {currentYear < 3 ? 'Next Year' : 'See Final Results'}
            </button>
          </div>
        )}

        {gamePhase === 'results' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Digital Journey Complete!</h3>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${reputationColorClasses}`}>
                    {reputation}
                  </div>
                  <div className="text-sm text-gray-600">Final Reputation</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${footprintColorClasses}`}>
                    {digitalFootprint.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Digital Footprint</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {unlockedOpportunities.length}
                  </div>
                  <div className="text-sm text-gray-600">Opportunities Unlocked</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Your Journey Log:</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {gameLog.map((entry, idx) => (
                    <div key={idx} className="text-sm text-gray-700 mb-1">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>

              {reputation >= 70 && unlockedOpportunities.length >= 2 && (
                <div className="text-green-700 font-bold text-xl mb-4">
                  🎉 Excellent! You've mastered digital citizenship!
                </div>
              )}
              {reputation < 40 && (
                <div className="text-red-700 font-bold text-xl mb-4">
                  😔 Your digital footprint needs more careful management.
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all"
            >
              Close Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalFootprintGame;