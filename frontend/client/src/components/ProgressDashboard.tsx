import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

interface ProgressData {
  weeklyPoints: number;
  weeklyGoal: number;
  previousWeekPoints: number;
  streakDays: number;
  skills: {
    name: string;
    progress: number;
    color: string;
  }[];
}

const ProgressDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/progress'],
    select: (data: ProgressData) => data,
  });

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary to-purple p-6">
        <h3 className="font-fredoka text-white text-2xl">Your Learning Journey</h3>
      </div>
      
      {isLoading ? (
        <div className="p-6 flex justify-center">
          <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-primary border-t-primary"></div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 bg-gray-50 rounded-2xl p-4">
              <h4 className="font-bold mb-2">Weekly Points</h4>
              <div className="flex items-end gap-2">
                <span className="font-fredoka text-4xl text-primary">{data?.weeklyPoints || 0}</span>
                {data && data.weeklyPoints > data.previousWeekPoints ? (
                  <span className="text-green mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L19 10L5 10L12 3Z" fill="currentColor" />
                      <path d="M12 21L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {data.weeklyPoints - data.previousWeekPoints}
                  </span>
                ) : null}
                <span className="text-gray-500 text-sm mb-1">from last week</span>
              </div>
              <Progress 
                value={(data?.weeklyPoints || 0) / (data?.weeklyGoal || 1) * 100} 
                className="h-4 mt-2"
              />
              <div className="flex justify-between mt-1 text-xs">
                <span>0</span>
                <span>Goal: {data?.weeklyGoal || 1000}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-2xl p-4">
              <h4 className="font-bold mb-2">Learning Streak</h4>
              <div className="flex items-end gap-2">
                <span className="font-fredoka text-4xl text-yellow">{data?.streakDays || 0}</span>
                <span className="text-gray-500 text-sm mb-1">days in a row</span>
              </div>
              <div className="flex justify-between mt-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="w-10 text-center">
                    <div 
                      className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold ${
                        index < (data?.streakDays || 0) 
                          ? "bg-yellow text-white" 
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {day}
                    </div>
                    {index < (data?.streakDays || 0) && (
                      <svg className="w-4 h-4 text-green mx-auto mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <h4 className="font-bold mb-3">Your Skills</h4>
          <div className="space-y-4">
            {data?.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name} Skills</span>
                  <span className="font-bold">{skill.progress}%</span>
                </div>
                <Progress 
                  value={skill.progress} 
                  className={`h-3 ${skill.color}`} 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/dashboard">
              <Button className="bg-primary text-white font-bold px-6 py-6 rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                View Full Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
