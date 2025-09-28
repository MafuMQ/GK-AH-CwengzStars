import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { CharacterAvatars } from "@/assets/svg/characters";
import { BadgeIcons } from "@/assets/svg/badges";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatGradeLevel } from "@/lib/utils";
import { createConfetti } from "@/lib/utils";
import { Game, Badge, Character } from "@shared/types";
import { Link } from "wouter";
import { Loader2, Star, Calendar, Award, BookOpen, Zap, ChevronRight, Clock } from "lucide-react";
import HeaderDashboard from "@/components/HeaderDashboard";

const DashboardPage = () => {
  // Notifications center state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "badge",
      message: "You earned a new badge: Cyber Safety Star!",
      read: false,
      time: "2m ago"
    },
    {
      id: 2,
      type: "streak",
      message: "You're on a 7-day learning streak!",
      read: false,
      time: "10m ago"
    },
    {
      id: 3,
      type: "game",
      message: "Try Phishing Detective in your recommended games.",
      read: false,
      time: "1h ago"
    }
  ]);

  const handleMarkRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  // Toast notification state
  const [showBadgeToast, setShowBadgeToast] = useState(true);
  const [showStreakToast, setShowStreakToast] = useState(true);
  const [showGameToast, setShowGameToast] = useState(true);

  // Check if any toast is visible
  const anyToastVisible = showBadgeToast || showStreakToast || showGameToast;

  useEffect(() => {
    const badgeTimer = setTimeout(() => setShowBadgeToast(false), 3500);
    const streakTimer = setTimeout(() => setShowStreakToast(false), 5000);
    const gameTimer = setTimeout(() => setShowGameToast(false), 6500);
    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(streakTimer);
      clearTimeout(gameTimer);
    };
  }, []);
  // Placeholder user data (replace with real user data if available)
  const user = {
    name: "Alex",
    avatar: "https://ui-avatars.com/api/?name=Alex&background=0D8ABC&color=fff"
  };
  const [celebrateRef, setCelebrateRef] = useState<HTMLDivElement | null>(null);
  
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress']
  });
  
  const { data: badges, isLoading: badgesLoading } = useQuery<Badge[]>({
    queryKey: ['/api/badges']
  });
  
  const { data: characters, isLoading: charactersLoading } = useQuery<Character[]>({
    queryKey: ['/api/characters']
  });
  
  const { data: recommendedGames, isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ['/api/games/recommended']
  });
  
  const isLoading = progressLoading || badgesLoading || charactersLoading || gamesLoading;
  
  // Get the unlocked badges
  const unlockedBadges = badges?.filter(badge => badge.unlocked) || [];
  const totalBadges = badges?.length || 0;
  
  // Handle celebration animation
  const handleCelebrate = () => {
    if (celebrateRef) {
      createConfetti(celebrateRef, 50);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard | Cyber Quest</title>
        <meta 
          name="description" 
          content="Track your learning progress, collect rewards, and find new educational games."
        />
      </Helmet>

      {/* Centered Popup Toast Notifications with blurred background */}
      {anyToastVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-[101] transition-all"></div>
          <div className="relative z-[102] flex flex-col gap-4 items-center">
            {showBadgeToast && (
              <div className="animate-fade-in-up bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-2xl shadow-2xl flex items-center gap-2 min-w-[320px] text-lg font-medium">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="font-semibold">Congrats!</span>
                <span>You earned a new badge: <span className="font-bold">Cyber Safety Star</span></span>
              </div>
            )}
            {showStreakToast && (
              <div className="animate-fade-in-up bg-purple-100 border-l-4 border-purple-500 p-6 rounded-2xl shadow-2xl flex items-center gap-2 min-w-[320px] text-lg font-medium">
                <Star className="w-6 h-6 text-purple-500" />
                <span className="font-semibold">Streak!</span>
                <span>You're on a <span className="font-bold">7-day learning streak</span>!</span>
              </div>
            )}
            {showGameToast && (
              <div className="animate-fade-in-up bg-blue-100 border-l-4 border-blue-500 p-6 rounded-2xl shadow-2xl flex items-center gap-2 min-w-[320px] text-lg font-medium">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="font-semibold">New Game!</span>
                <span>Try <span className="font-bold">Phishing Detective</span> in your recommended games.</span>
              </div>
            )}
          </div>
        </div>
      )}

      <HeaderDashboard/>

      <div className="overflow-hidden pt-24 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              {/* Personalized Greeting */}
              <div className="flex items-center gap-4 mb-4">
                <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-primary shadow" />
                <div>
                  <h1 className="font-fredoka text-4xl md:text-5xl text-center md:text-left mb-1">
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-yellow-500 bg-clip-text text-transparent">
                      Welcome back, {user.name}!
                    </span>
                  </h1>
                  <p className="text-gray-800 text-lg text-center md:text-left">Continue your learning adventure and collect more rewards!</p>
                </div>
              </div>
              {!isLoading && (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-yellow-100 rounded-full text-yellow-600 font-bold text-sm">
                    {formatGradeLevel(3)} {/* Hardcoded for demo, would come from user profile */}
                  </div>
                  <div className="px-3 py-1 bg-primary/10 rounded-full text-primary font-bold text-sm flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow stroke-yellow" />
                    {progress?.weeklyPoints || 0} points
                  </div>
                  <div className="px-3 py-1 bg-purple-100 rounded-full text-purple-600 font-bold text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {progress?.streakDays || 0} day streak
                  </div>
                </div>
              )}
            </div>
            <div 
              className="mt-6 md:mt-0 relative"
              ref={setCelebrateRef}>
              <Button 
                onClick={handleCelebrate}
                className="bg-primary text-white font-bold px-6 py-2 rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                Celebrate! 🎉
              </Button>
            </div>
            
            {/* Notifications Bell Icon in Header */}
        <div className="fixed top-20 right-10 z-50">
            <button
            aria-label="Show notifications"
            className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setShowNotifications(v => !v)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
            </button>
        </div>

        {/* Notifications Panel */}
        {showNotifications && (
        <div className="fixed top-16 right-8 z-50 w-80 max-w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-fade-in-up" role="dialog" aria-modal="true" aria-label="Notifications Center">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-primary">Notifications</h2>
                <button className="text-gray-400 hover:text-primary" aria-label="Close notifications" onClick={() => setShowNotifications(false)}>
                ×
                </button>
            </div>
            {notifications.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No notifications</div>
            ) : (
                <ul className="space-y-3">
                {notifications.map(n => (
                    <li key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                    <span className="mt-1">
                        {n.type === "badge" && <Award className="w-5 h-5 text-yellow-500" />}
                        {n.type === "streak" && <Star className="w-5 h-5 text-purple-500" />}
                        {n.type === "game" && <BookOpen className="w-5 h-5 text-blue-500" />}
                    </span>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{n.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        {!n.read && (
                        <button className="text-xs text-primary hover:underline" onClick={() => handleMarkRead(n.id)} aria-label="Mark as read">Mark as read</button>
                        )}
                        <button className="text-xs text-gray-400 hover:text-red-500" onClick={() => handleDismiss(n.id)} aria-label="Dismiss notification">Dismiss</button>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </div>
        )}
            </div>
        </div>
        <div className="absolute bottom-[3rem] left-[390px] w-[400px] h-[400px] bg-primary opacity-10 rounded-full"></div>
        <div className="absolute top-[-160px] right-[-100px] w-[300px] h-[300px] bg-purple-400 opacity-60 rounded-full"></div>
      
        <div className="absolute top-[5rem] right-[15rem] text-teal-400 text-4xl">✦</div>
        <div className="absolute top-[9rem] right-[40rem] text-purple-400 text-xl">✦</div>
        <div className="absolute top-[5rem] left-[10rem] text-yellow-500 text-2xl">✦</div>

        <div className="absolute top-[15rem] left-[25rem] text-primary text-3xl">✦</div>
        <div className="absolute top-[15rem] right-[70rem] text-secondary text-xl">✦</div>
        <div className="absolute top-[15rem] right-[10rem] text-blue-400 text-2xl">✦</div>
      </div>
      
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-10">

                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Badges Earned</p>
                    <h3 className="text-2xl text-yellow-500 font-fredoka">{unlockedBadges.length} <span className="text-gray-400 text-lg">/ {totalBadges}</span></h3>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Games Played</p>
                    <h3 className="text-2xl text-pink-500 font-fredoka">24</h3>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quest Time</p>
                    <h3 className="text-2xl text-blue-500 font-fredoka">4.5 hours</h3>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Star className="w-8 h-8 text-purple-500"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Learning Streak</p>
                    <h3 className="text-2xl text-purple-500 font-fredoka">{progress?.streakDays || 0} <span className="text-lg">days</span></h3>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Skills Improved</p>
                    <h3 className="text-2xl text-green-500 font-fredoka">3</h3>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="dashboard" className="mb-12">
                <TabsList className="p-6 w-full bg-primary/30 flex justify-center mb-8">
                  <TabsTrigger value="dashboard" className="text-lg">Dashboard</TabsTrigger>
                  <TabsTrigger value="achievements" className="text-lg">Achievements</TabsTrigger>
                  <TabsTrigger value="quest" className="text-lg">Quests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="focus:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">

                      <Card className="border-none mb-6 bg-white rounded-3xl shadow-lg items-center gap-4 relative">
                        <CardHeader>
                          <CardTitle className="text-primary">Weekly Progress</CardTitle>
                          <CardDescription>Your learning journey this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6">
                            <div className="flex justify-between mb-1">
                              <span  className="text-primary">Weekly Points</span>
                              <span className="font-bold">{progress?.weeklyPoints || 0} / {progress?.weeklyGoal || 500}</span>
                            </div>
                            <Progress value={(progress?.weeklyPoints || 0) / (progress?.weeklyGoal || 10) * 100} className="h-4" />
                          </div>
                          
                          <h4 className="text-primary mb-3">Learning Streak</h4>
                          <div className="flex justify-between mb-6">
                            {['S','M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center bg-gray-400 text-gray-700 justify-center font-bold mb-1 ${
                                  index < (progress?.streakDays || 0) ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-500"
                                }`}>
                                  {day}
                                </div>
                                {index < (progress?.streakDays || 0) && (
                                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <h4 className="font-bold text-primary mb-3">Your Skills</h4>
                          <div className="space-y-4 bg-red-800">
                            {progress?.skills?.map((skill, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <span>{skill.name} Skills</span>
                                  <span className="font-bold">{skill.progress}%</span>
                                </div>
                                <Progress value={skill.progress} className={`h-4 ${skill.color}`} />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="grid grid-cols-1 lg:grid-cols-2 border-none mb-6 bg-white rounded-3xl shadow-lg items-center gap-4">
                        <div>
                          <CardHeader>
                            <CardTitle className="text-primary">Recent Activities</CardTitle>
                            <CardDescription>Your latest learning adventures</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-5 h-5 text-yellow-500" />
                                </div>
                                <div>
                                  <p className="font-bold">Completed "Mine Sweeper" game</p>
                                  <p className="text-gray-500 text-sm">2 hours ago • Score: 85/100 • 15 minutes</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                  <Award className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-bold">Earned "Safety Master" badge</p>
                                  <p className="text-gray-500 text-sm">Yesterday • Achievement Unlocked</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                  <p className="font-bold">Completed "Space Explorer" game</p>
                                  <p className="text-gray-500 text-sm">2 days ago • Score: 70/100 • 20 minutes</p>
                                </div>
                              </li>
                            </ul>
                            <Button variant="ghost" className="w-full bg-primary/30 mt-4 justify-center gap-1">
                                  View All Activities <ChevronRight size={16}/>
                            </Button>
                          </CardContent>
                        </div>
                        <div>
                          <CardHeader>
                            <CardTitle className="text-primary">Recent Badges</CardTitle>
                            <CardDescription>Your latest achievements</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-4 justify-center">
                              {unlockedBadges.slice(0, 3).map((badge) => (
                                <div key={badge.id} className="w-16 h-16">
                                  {BadgeIcons[badge.id as keyof typeof BadgeIcons]}
                                </div>
                              ))}
                            </div>
                            {unlockedBadges.length > 0 ? (
                              <Button variant="ghost" className="w-full  bg-primary/30 mt-4 justify-center gap-1">
                                  View All Badges <ChevronRight size={16} />
                              </Button>
                            ) : (
                              <p className="text-center text-gray-500 text-sm mt-4">
                                Complete activities to earn badges!
                              </p>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-primary">Continue Learning</CardTitle>
                          <CardDescription>Pick up where you left off</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {recommendedGames?.slice(0, 3).map((game, index) => (
                            <Link key={index} href={`/games/${game.id}`}>
                              <a className="block p-3 rounded-lg hover:bg-gray-50 transition-colors mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    {/* Display game icon based on subject */}
                                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 8L16 12L12 16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-bold">{game.title}</h4>
                                    <p className="text-xs text-gray-500">{game.subject} • {game.durationMinutes} min</p>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          ))}
                          <Button asChild className="w-full bg-primary text-white mt-2">
                            <Link href="/games">
                              <a>Explore More Games</a>
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-primary">Daily Challenge</CardTitle>
                          <CardDescription>Complete for bonus points!</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 bg-gradient-to-r from-yellow-200 to-primary/20 rounded-lg mb-4">
                            <h4 className="font-bold text-black flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              Pong Master Challenge
                            </h4>
                            <p className="text-sm text-gray-700 mt-1 mb-3">
                              Complete 3 math games today to earn 50 bonus points and progress toward your next badge!
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-bold">Progress: 1/3</div>
                              <Button size="sm" className="bg-primary text-white">
                                Start Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-white rounded-3xl shadow-lg p-4">
                        <h3 className="font-fredoka text-primary text-2xl mb-4">Recommendations</h3>
                        <ul className="space-y-4">
                          <li className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-bold text-black mb-1">Improve your Cyber skills</h4>
                            <p className="text-gray-600 mb-2">Your phishing spoting skills could use more practice.</p>
                            <a href="/games?subject=reading" className="text-primary font-bold flex items-center">
                              Play Phishing Games 
                              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </li>
                          <li className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <h4 className="font-bold text-black mb-1">Challenge yourself in Reality River</h4>
                            <p className="text-gray-600 mb-2">Try some harder phishing games to level up!</p>
                            <a href="/games?subject=science" className="text-primary font-bold flex items-center">
                              Play Cyber Games 
                              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="focus:outline-none">
                  <div className="mb-8">
                    <h3 className="text-2xl text-primary font-fredoka mb-4">Your Achievements</h3>
                    <p className="text-gray-600 mb-6">
                      Collect badges by completing activities and mastering skills!
                    </p>
                    
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                      <h4 className="font-bold text-primary mb-2">Achievement Progress</h4>
                      <div className="mb-2 flex justify-between items-center">
                        <span>You've earned {unlockedBadges.length} out of {badges?.length || 0} badges</span>
                        <span className="font-bold">{Math.round((unlockedBadges.length / (badges?.length || 1)) * 100)}%</span>
                      </div>
                      <Progress value={Math.round((unlockedBadges.length / (badges?.length || 1)) * 100)} className="h-4" />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                      {badges?.map((badge) => (
                        <div key={badge.id} className="flex flex-col items-center p-4 hover:scale-105 transition-transform">
                          <div className="mb-3 relative">
                            <div className={`w-20 h-20 ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                              {BadgeIcons[badge.id as keyof typeof BadgeIcons]}
                            </div>
                            {badge.unlocked ? (
                              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                                <div className="bg-yellow-400 text-dark w-6 h-6 rounded-full flex items-center justify-center font-fredoka text-sm">
                                  {badge.level}
                                </div>
                              </div>
                            ) : (
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className={`font-bold text-center ${!badge.unlocked ? 'text-gray-400' : ''}`}>
                            {badge.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button value="ghost" className="bg-primary text-white font-bold px-6 py-2 rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                      View Full Achievements <ChevronRight size={16}/>
                    </Button>
                  </div>

                  {/* Challenge Yourself */}
                    <div className="mb-4 bg-gradient-to-r from-primary to-purple-400 rounded-3xl p-6 text-white text-center">
                      <h3 className="font-fredoka text-white text-2xl mb-3">Challenge Yourself!</h3>
                      <p className="mb-6">Complete more learning activities to unlock new badges and rewards.</p>
                      <Button  className="bg-white text-primary hover:bg-white/90 font-bold px-6 py-2 rounded-full"
                        asChild>
                        <a href="/games">Play More Games</a>
                      </Button>
                    </div>
                </TabsContent>

                <TabsContent value="quest" className="focus:outline-none">
                  <div className="mb-8">
                    <h3 className="text-2xl text-primary font-fredoka mb-4">Your Learning Paths</h3>
                    <p className="text-gray-600 mb-6">
                      These friendly characters will guide you through your learning journey!
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                      {characters?.map((character) => (
                        <div key={character.id} className="flex flex-col items-center">
                          <div className={`w-24 h-24 mb-4 rounded-full p-2 ${character.color} hover:scale-110 transition-transform cursor-pointer`}>
                            {CharacterAvatars[character.id as keyof typeof CharacterAvatars]}
                          </div>
                          <h4 className="font-fredoka text-center">{character.name}</h4>
                          <div className="flex flex-wrap justify-center gap-1 mt-2">
                            {character.skills.slice(0, 2).map((skill, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button asChild className="bg-purple-500 text-white font-bold px-6 py-2 rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                    <Link href="/characters">
                      <a>Finish All Paths</a>
                    </Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
