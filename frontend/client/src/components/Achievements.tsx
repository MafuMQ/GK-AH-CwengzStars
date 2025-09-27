import { useQuery } from "@tanstack/react-query";
import { BadgeIcons } from "@/assets/svg/badges";
import ProgressDashboard from "./ProgressDashboard";
import { useEffect, useRef } from "react";
import { createConfetti } from "@/lib/utils";

export type Badge = {
  id: string;
  name: string;
  unlocked: boolean;
  level: number;
};

const Achievements = () => {
  const { data: badges, isLoading } = useQuery({
    queryKey: ['/api/badges'],
    select: (data: Badge[]) => data,
  });

  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, badges?.length || 0);
  }, [badges]);

  const handleBadgeHover = (index: number) => {
    if (badges && badges[index].unlocked && badgeRefs.current[index]) {
      createConfetti(badgeRefs.current[index]!, 15);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-pink-50 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-fredoka text-4xl text-center mb-6">Earn Amazing Rewards</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Complete challenges, master skills, and collect colorful badges to showcase your learning achievements!</p>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-primary border-t-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {badges?.map((badge, index) => (
              <div 
                key={badge.id} 
                className="badge-item flex flex-col items-center justify-center p-4 transition-all hover:scale-110 duration-300"
                ref={el => badgeRefs.current[index] = el}
                onMouseEnter={() => handleBadgeHover(index)}
              >
                <div className="mb-4 relative">
                  <div className={`w-24 h-24 object-contain ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                    {BadgeIcons[badge.id as keyof typeof BadgeIcons]}
                  </div>
                  {badge.unlocked && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      <div className="bg-yellow text-dark w-8 h-8 rounded-full flex items-center justify-center font-fredoka">
                        {badge.level}
                      </div>
                    </div>
                  )}
                  {!badge.unlocked && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className={`font-bold bg-white px-4 py-2 rounded-full shadow text-sm ${!badge.unlocked ? 'text-gray-400' : ''}`}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Progress Dashboard Preview */}
        <ProgressDashboard />
      </div>
    </section>
  );
};

export default Achievements;
