import { useRef, useEffect } from "react";
import { BadgeIcons } from "@/assets/svg/badges";
import { createConfetti } from "@/lib/utils";
import { Badge } from "@shared/types";

interface BadgeItemProps {
  badge: Badge;
}

const BadgeItem = ({ badge }: BadgeItemProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (badge.unlocked && badgeRef.current) {
      createConfetti(badgeRef.current, 20);
    }
  };

  return (
    <div 
      ref={badgeRef}
      className="badge-item flex flex-col items-center justify-center p-4 transition-all hover:scale-110 duration-300"
      onMouseEnter={handleMouseEnter}
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
  );
};

export default BadgeItem;
