import { Link } from "wouter";
import { Game } from "./GameLibrary";
import { getSubjectColor } from "@/lib/utils";
import { GameIcons } from "@/assets/svg/game-icons";
import { Star, Clock, Play } from "lucide-react";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const gradeBadge =
    game.minAge === game.maxAge
      ? `Grade ${game.minAge === 0 ? "K" : game.minAge}`
      : `Grades ${game.minAge === 0 ? "K" : game.minAge}-${game.maxAge}`;

  const iconKey = game.subject.toLowerCase() as keyof typeof GameIcons;
  const Icon = GameIcons[iconKey];

  return (
    <div className="game-card bg-white rounded-3xl overflow-hidden shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
      <Link href={`/games/${game.id}`}>
        <a className="block">
          <div className="relative">
            <div className="flex items-center w-48 h-48 overflow-hidden">
              {game.imageUrl ? (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  {Icon ? (
                    <div className="w-16 h-16">{Icon}</div>
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 11H10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 9L8 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="17" cy="10" r="1" fill="currentColor" />
                      <circle cx="14" cy="13" r="1" fill="currentColor" />
                      <path
                        d="M6.5 5H17.5C18.3284 5 19 5.67157 19 6.5V17.5C19 18.3284 18.3284 19 17.5 19H6.5C5.67157 19 5 18.3284 5 17.5V6.5C5 5.67157 5.67157 5 6.5 5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>

            <span
              className={`absolute top-4 right-4 font-bold px-3 py-1 rounded-full text-sm ${getSubjectColor(
                game.subject
              )}`}
            >
              {game.subject}
            </span>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent h-16"></div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-fredoka text-xl truncate">{game.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {game.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-bold">
                  {gradeBadge}
                </span>
                <span className="ml-2 text-gray-500 text-sm flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {game.durationMinutes} min
                </span>
              </div>
              <button
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
                aria-label={`Play ${game.title}`}
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default GameCard;
