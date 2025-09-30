import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn, getGradeColor, getSubjectColor } from "@/lib/utils";
import GameCard from "./GameCard";

export type Game = {
  id: string | number;
  title: string;
  description: string;
  subject: string;
  minAge: number;
  maxAge: number;
  imageUrl?: string;
  durationMinutes: number;
};


const mockGames: Game[] = [
  {
    id: 1,
    title: "Mine Sweeper",
    subject: "minesweeper",
    description:
      "A fun and interactive game to teach kids basic math skills through colorful graphics and engaging gameplay.",
    minAge: 6,
    maxAge: 17,
    durationMinutes: 10,
    imageUrl:
      "https://i.postimg.cc/5Np7xj0Q/technology.png",
  },
  {
    id: 2,
    title: "Pong",
    subject: "Pong",
    description:
      "Play the classic game of Pong while improving hand-eye coordination and reflexes.",
    minAge: 4,
    maxAge: 17,
    durationMinutes: 25,
    imageUrl:
      "https://i.postimg.cc/bvFMTrbD/ping-pong-1.png",
  },
  {
    id: 3,
    title: "Space Inavders",
    subject: "Space Invaders",
    description:
      "Defend the galaxy from waves of alien invaders while learning about space and astronomy.",
    minAge: 4,
    maxAge: 17,
    durationMinutes: 12,
    imageUrl:
      "https://i.postimg.cc/NjjpzYQk/spaceship.png",
  }

];



const GameLibrary = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const { data: games, isLoading } = useQuery({
    queryKey: ["/api/games"],
    select: (data: Game[]) => data,
  });

  const filteredGames = (games || []).filter((game) => {
    if (
      selectedSubject !== "all" &&
      game.subject.toLowerCase() !== selectedSubject.toLowerCase()
    ) {
      return false;
    }
    if (
      selectedGrade !== null &&
      (game.minAge > selectedGrade || game.maxAge < selectedGrade)
    ) {
      return false;
    }
    return true;
  });

  const displayGames = filteredGames.length > 0 ? filteredGames : mockGames;

  const subjects = [
    "all",
    "Mine Sweeper",
    "Pong",
    "Space Invaders"
  ];
  const grades = [
    { id: null, label: "All" },
    { id: 0, label: "1" },
    { id: 1, label: "2" },
    { id: 2, label: "3" },
    { id: 3, label: "4" },
    { id: 4, label: "5" },
    { id: 5, label: "6" },
    { id: 6, label: "7" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-fredoka text-4xl text-center mb-6">
        Our Games
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore our collection of interactive educational games designed to
          make learning fun while building essential skills.
        </p>
        

        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-center">
          <div className="bg-gray-50 p-4 rounded-2xl shadow">
            <h3 className="font-bold mb-3 text-center md:text-left">
              Games:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  className={cn(
                    "px-4 py-2 rounded-full font-bold",
                    selectedSubject.toLowerCase() === subject.toLowerCase()
                      ? subject === "all"
                        ? "bg-primary text-white"
                        : getSubjectColor(subject)
                      : "bg-gray-200 text-dark hover:bg-primary/10"
                  )}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject === "all" ? "All" : subject}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl shadow">
            <h3 className="font-bold mb-3 text-center md:text-left">
              Level:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {grades.map((grade) => (
                <button
                  key={grade.id !== null ? grade.id : "all"}
                  className={cn(
                    "w-10 h-10 rounded-full font-fredoka",
                    selectedGrade === grade.id
                      ? grade.id === null
                        ? "bg-primary text-white"
                        : getGradeColor(grade.id)
                      : "bg-gray-200 text-dark hover:bg-primary/10"
                  )}
                  onClick={() => setSelectedGrade(grade.id)}
                >
                  {grade.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-primary border-t-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default GameLibrary;
