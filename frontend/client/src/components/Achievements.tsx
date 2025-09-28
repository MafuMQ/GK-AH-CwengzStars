import { useQuery } from "@tanstack/react-query";
import { BadgeIcons } from "@/assets/svg/badges";
import ProgressDashboard from "./ProgressDashboard";
import { useEffect, useRef, useState, useMemo } from "react";
import { createConfetti } from "@/lib/utils";
import { Star, Trophy, Target, Award } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    badgeRefs.current = badgeRefs.current.slice(0, badges?.length || 0);
  }, [badges]);

  const handleBadgeHover = (index: number) => {
    if (badges && badges[index].unlocked && badgeRefs.current[index]) {
      createConfetti(badgeRefs.current[index]!, 15);
    }
  };

  const filteredBadges = useMemo(() => {
    return badges?.filter(badge => {
      if (selectedCategory === 'unlocked') return badge.unlocked;
      if (selectedCategory === 'locked') return !badge.unlocked;
      return true;
    });
  }, [badges, selectedCategory]);

  const unlockedCount = badges?.filter(badge => badge.unlocked).length || 0;
  const totalCount = badges?.length || 0;
  const completionPercentage = useMemo(() =>
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0,
    [unlockedCount, totalCount]
  );

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-pink-50 relative" role="region" aria-labelledby="achievements-title">
      <div className="container mx-auto px-4">
        <h2 id="achievements-title" className="font-fredoka text-4xl text-center mb-6">Earn Amazing Rewards</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">Complete challenges, master skills, and collect colorful badges to showcase your learning achievements!</p>

        {/* Stats Overview */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {unlockedCount}
                </div>
                <div className="text-sm text-gray-600">Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {completionPercentage}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600">
              {unlockedCount} of {totalCount} badges collected
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Badge filter options">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all focus:outline-none focus:ring-4 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg focus:ring-purple-300'
                : 'bg-white text-gray-600 hover:bg-purple-50 focus:ring-purple-200'
            }`}
            role="tab"
            aria-selected={selectedCategory === 'all'}
            aria-controls="badges-grid"
          >
            All Badges
          </button>
          <button
            onClick={() => setSelectedCategory('unlocked')}
            className={`px-4 py-2 rounded-full font-medium transition-all focus:outline-none focus:ring-4 ${
              selectedCategory === 'unlocked'
                ? 'bg-green-600 text-white shadow-lg focus:ring-green-300'
                : 'bg-white text-gray-600 hover:bg-green-50 focus:ring-green-200'
            }`}
            role="tab"
            aria-selected={selectedCategory === 'unlocked'}
            aria-controls="badges-grid"
          >
            <Trophy className="w-4 h-4 inline mr-1" aria-hidden="true" />
            Unlocked
          </button>
          <button
            onClick={() => setSelectedCategory('locked')}
            className={`px-4 py-2 rounded-full font-medium transition-all focus:outline-none focus:ring-4 ${
              selectedCategory === 'locked'
                ? 'bg-gray-600 text-white shadow-lg focus:ring-gray-300'
                : 'bg-white text-gray-600 hover:bg-gray-50 focus:ring-gray-200'
            }`}
            role="tab"
            aria-selected={selectedCategory === 'locked'}
            aria-controls="badges-grid"
          >
            <Target className="w-4 h-4 inline mr-1" aria-hidden="true" />
            In Progress
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-primary border-t-primary"></div>
          </div>
        ) : (
          <div
            id="badges-grid"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
            role="grid"
            aria-label={`${filteredBadges?.length || 0} badges`}
          >
            {filteredBadges?.map((badge, index) => (
              <div
                key={badge.id}
                className={`badge-item flex flex-col items-center justify-center p-4 transition-all hover:scale-110 duration-300 rounded-2xl focus-within:ring-4 focus-within:ring-blue-300 ${
                  badge.unlocked
                    ? 'bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-2'
                    : 'bg-gray-100 shadow-sm opacity-60'
                }`}
                ref={el => badgeRefs.current[index] = el}
                onMouseEnter={() => handleBadgeHover(index)}
                role="gridcell"
                tabIndex={0}
                aria-label={`${badge.name} badge${badge.unlocked ? `, level ${badge.level}, unlocked` : ', locked'}`}
              >
                <div className="mb-4 relative">
                  <div className={`w-24 h-24 object-contain transition-all duration-300 ${
                    badge.unlocked
                      ? 'animate-pulse'
                      : 'grayscale'
                  }`}>
                    {BadgeIcons[badge.id as keyof typeof BadgeIcons]}
                  </div>

                  {/* Level indicator for unlocked badges */}
                  {badge.unlocked && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 shadow-lg animate-bounce">
                      <div className="bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-fredoka font-bold text-sm">
                        {badge.level}
                      </div>
                    </div>
                  )}

                  {/* Lock icon for locked badges */}
                  {!badge.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-300 rounded-full p-2 shadow-md">
                        <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Rarity indicator */}
                  {badge.unlocked && badge.level >= 5 && (
                    <div className="absolute -top-2 -left-2">
                      <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>

                <span className={`font-bold px-4 py-2 rounded-full text-center text-sm transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {badge.name}
                </span>

                {/* Progress hint for locked badges */}
                {!badge.unlocked && (
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Keep learning to unlock!
                  </div>
                )}
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
