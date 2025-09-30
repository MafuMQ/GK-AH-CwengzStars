import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { Eye, EyeOff, Settings, Book, Clock, Bell, Lock, Calendar, Lightbulb, ChevronRight } from "lucide-react";
import HeaderDashboard from "@/components/HeaderDashboard";


const sampleData = [
  { name: 'Math', thisWeek: 85, lastWeek: 65 },
  { name: 'Reading', thisWeek: 60, lastWeek: 50 },
  { name: 'Science', thisWeek: 40, lastWeek: 30 },
  { name: 'Social Studies', thisWeek: 25, lastWeek: 20 },
];

const timeData = [
  { day: 'Mon', minutes: 30 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 25 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 35 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 20 },
];

const ParentsPage = () => {
  return (
    <>
      <Helmet>
        <title>Parent Dashboard | Cyber Quest</title>
        <meta 
          name="description" 
          content="Monitor your child's learning progress, set limits, and view detailed reports."
        />
      </Helmet>

      <HeaderDashboard/>

      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <h1 className="font-fredoka text-4xl md:text-5xl text-center mb-6">
            <span className="bg-gradient-to-r from-blue via-green to-primary bg-clip-text text-transparent">
              Parent Dashboard
            </span>
          </h1>
          <p className="text-gray-700 text-lg text-center max-w-2xl mx-auto mb-10">
            Stay connected with your child's learning journey. Monitor progress, set limits, and support their growth.
          </p>
        </div>
      </div>
      
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Child Selector - In a real app, this would show multiple children if applicable */}
          <div className="mb-8 flex items-center justify-between bg-white rounded-xl shadow p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                A
              </div>
              <div>
                <h2 className="font-bold text-lg">Alex's Learning Journey</h2>
                <p className="text-gray-600 text-sm">Grade 3 • Last activity: Today</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings size={16} />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
              <TabsTrigger value="progress" className="text-lg">Progress</TabsTrigger>
              <TabsTrigger value="controls" className="text-lg">Parental Controls</TabsTrigger>
              <TabsTrigger value="resources" className="text-lg">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Book size={20} className="text-primary" />
                      Learning Time
                    </CardTitle>
                    <CardDescription>This week's learning activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-fredoka text-primary">4.5 hours</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Up 23% from last week
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb size={20} className="text-yellow" />
                      Skills Improved
                    </CardTitle>
                    <CardDescription>Areas of improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-fredoka text-yellow">3 skills</div>
                    <div className="flex gap-2 mt-1">
                      <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-bold">Math</span>
                      <span className="bg-pink-100 text-pink-800 rounded-full px-2 py-0.5 text-xs font-bold">Reading</span>
                      <span className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-bold">Science</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Bell size={20} className="text-purple" />
                      Next Goal
                    </CardTitle>
                    <CardDescription>Upcoming milestone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-fredoka text-purple">Science Badge</div>
                    <p className="text-sm text-gray-600">80% complete</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Subject Progress</CardTitle>
                    <CardDescription>Comparison with last week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sampleData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="thisWeek" name="This Week" fill="#FF6B6B" />
                          <Bar dataKey="lastWeek" name="Last Week" fill="#FFD166" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Learning Time</CardTitle>
                    <CardDescription>Minutes spent learning each day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={timeData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="minutes" name="Minutes" stroke="#A78BFA" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8L16 12L12 16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Completed "Number Blast" game</p>
                        <p className="text-gray-500 text-sm">2 hours ago • Score: 85/100 • 15 minutes</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8L16 12L12 16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Earned "Math Master" badge</p>
                        <p className="text-gray-500 text-sm">Yesterday • Achievement Unlocked</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8L16 12L12 16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Completed "Space Explorer" game</p>
                        <p className="text-gray-500 text-sm">2 days ago • Score: 70/100 • 20 minutes</p>
                      </div>
                    </li>
                  </ul>
                  <Button variant="ghost" className="w-full mt-4 justify-center gap-1">
                    View All Activities
                    <ChevronRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="focus:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Subject mastery by percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Math</span>
                          <span>75%</span>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-bold">Strengths:</span> Addition, Subtraction, Shapes
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-bold">Areas to improve:</span> Multiplication, Division
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Reading</span>
                          <span>60%</span>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-pink rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-bold">Strengths:</span> Vocabulary, Comprehension
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-bold">Areas to improve:</span> Spelling, Grammar
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Science</span>
                          <span>40%</span>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-bold">Strengths:</span> Animals, Plants
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-bold">Areas to improve:</span> Solar System, Weather
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Social Studies</span>
                          <span>25%</span>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-bold">Strengths:</span> Communities
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-bold">Areas to improve:</span> History, Geography
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Badges Earned</CardTitle>
                      <CardDescription>Achievement rewards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <div className="w-16 h-16">
                          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="30" fill="#FFD166" />
                            <circle cx="32" cy="32" r="25" fill="#FFDA85" />
                            <path d="M22 22L42 42" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
                            <path d="M42 22L22 42" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
                            <path d="M32 16V48" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
                            <path d="M16 32H48" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="32" cy="32" r="7" fill="white" />
                            <circle cx="32" cy="32" r="5" fill="#FF6B6B" />
                          </svg>
                        </div>
                        <div className="w-16 h-16">
                          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="30" fill="#F9A8D4" />
                            <circle cx="32" cy="32" r="25" fill="#FBC7E3" />
                            <rect x="18" y="18" width="28" height="28" rx="4" fill="white" />
                            <path d="M22 26H42" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
                            <path d="M22 32H42" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
                            <path d="M22 38H35" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
                            <path d="M15 15L22 22" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                            <path d="M49 15L42 22" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                            <path d="M15 49L22 42" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                            <path d="M49 49L42 42" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="w-16 h-16">
                          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="30" fill="#7ED6DF" />
                            <circle cx="32" cy="32" r="25" fill="#A5E9EF" />
                            <path d="M28 20V38C28 41.3137 25.3137 44 22 44V44" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" />
                            <path d="M36 20V38C36 41.3137 38.6863 44 42 44V44" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" />
                            <rect x="25" y="15" width="14" height="5" rx="2.5" fill="#2A2D7E" />
                            <circle cx="28" cy="32" r="3" fill="#FF6B6B" />
                            <circle cx="36" cy="26" r="2" fill="#A78BFA" />
                            <circle cx="32" cy="36" r="2" fill="#F9A8D4" />
                          </svg>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full mt-4 justify-center gap-1">
                        View All Badges <ChevronRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Activities</CardTitle>
                      <CardDescription>Personalized for your child</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Space Explorer</h4>
                          <p className="text-sm text-gray-600">Improve science knowledge</p>
                        </li>
                        <li className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Word Heroes</h4>
                          <p className="text-sm text-gray-600">Build reading skills</p>
                        </li>
                        <li className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Number Blast</h4>
                          <p className="text-sm text-gray-600">Practice multiplication</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="controls" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock size={20} />
                      Screen Time Limits
                    </CardTitle>
                    <CardDescription>Set daily usage limits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Daily Time Limit</h4>
                          <p className="text-sm text-gray-600">Maximum time per day</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">60 min</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Session Limit</h4>
                          <p className="text-sm text-gray-600">Maximum time per session</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">20 min</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Break Reminder</h4>
                          <p className="text-sm text-gray-600">Remind to take breaks</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Every 20 min</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar size={20} />
                      Schedule
                    </CardTitle>
                    <CardDescription>Set when app can be accessed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">School Days</h4>
                          <p className="text-sm text-gray-600">Monday - Friday</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">3:00 PM - 7:00 PM</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Weekends</h4>
                          <p className="text-sm text-gray-600">Saturday - Sunday</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">10:00 AM - 7:00 PM</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Bedtime Mode</h4>
                          <p className="text-sm text-gray-600">Block access at night</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">After 8:00 PM</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock size={20} />
                      Content Controls
                    </CardTitle>
                    <CardDescription>Manage accessible content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Grade Level</h4>
                          <p className="text-sm text-gray-600">Show content for these grades</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Grades 2-4</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Subject Focus</h4>
                          <p className="text-sm text-gray-600">Prioritize these subjects</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Math, Reading</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Difficulty Level</h4>
                          <p className="text-sm text-gray-600">Challenge setting</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">Medium</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye size={20} />
                      <EyeOff size={20} />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>Manage data and privacy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Data Collection</h4>
                          <p className="text-sm text-gray-600">Learning analytics</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">Enabled</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Weekly Reports</h4>
                          <p className="text-sm text-gray-600">Email progress reports</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">Enabled</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Profile Visibility</h4>
                          <p className="text-sm text-gray-600">Child's display name</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">First name only</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Educational Articles</CardTitle>
                    <CardDescription>Guides for parents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Supporting Your Child's Learning at Home</h4>
                          <p className="text-sm text-gray-600 mt-1">5 min read</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Digital Literacy for Elementary Students</h4>
                          <p className="text-sm text-gray-600 mt-1">8 min read</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Balancing Screen Time and Physical Activity</h4>
                          <p className="text-sm text-gray-600 mt-1">6 min read</p>
                        </a>
                      </li>
                    </ul>
                    <Button variant="ghost" className="w-full mt-4 justify-center gap-1">
                      View All Articles <ChevronRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Printable Activities</CardTitle>
                    <CardDescription>Offline learning resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Math Worksheets - Grade 3</h4>
                          <p className="text-sm text-gray-600 mt-1">10 printable pages</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Reading Comprehension Activities</h4>
                          <p className="text-sm text-gray-600 mt-1">5 stories with questions</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <h4 className="font-bold">Science Experiment Guides</h4>
                          <p className="text-sm text-gray-600 mt-1">3 at-home experiments</p>
                        </a>
                      </li>
                    </ul>
                    <Button variant="ghost" className="w-full mt-4 justify-center gap-1">
                      View All Printables <ChevronRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Parent Support</CardTitle>
                    <CardDescription>Help and resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold flex items-center gap-1">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          FAQ & Help Center
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Common questions and answers</p>
                      </a>
                      
                      <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold flex items-center gap-1">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Contact Support
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Get help from our team</p>
                      </a>
                      
                      <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold flex items-center gap-1">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V4C14.7614 4 17 6.23858 17 9C17 11.7614 14.7614 14 12 14H5M12 14C9.23858 14 7 16.2386 7 19C7 21.7614 9.23858 24 12 24V24M12 14L19 21M5 14L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Parent Community
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Connect with other parents</p>
                      </a>
                      
                      <a href="#" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold flex items-center gap-1">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7.5M14.5 2L20 7.5M14.5 2V7.5H20M16 12H8M16 16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Curriculum Guide
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">Educational standards by grade</p>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ParentsPage;
