import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { cn, getGradeColor, getSubjectColor } from "@/lib/utils";
import { Helmet } from "react-helmet";
import { Game } from "@shared/types";
import { Loader2 } from "lucide-react";
import HeaderDashboard from "@/components/HeaderDashboard";


// Mock games array — outside the component
const mockGames: Game[] = [
  {
    id: 1,
    title: "Number Blast",
    subject: "Academics",
    description:
      "Solve addition and subtraction problems by blasting the correct answers!",
    minGrade: 1,
    maxGrade: 7,
    durationMinutes: 10,
    imageUrl:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/012/original/happy_no.png?1748692462",
  },
  {
    id: 2,
    title: "Code Wizards",
    subject: "Technology",
    description:
      "Learn basic coding concepts through fun puzzles and magical challenges.",
    minGrade: 4,
    maxGrade: 7,
    durationMinutes: 25,
    imageUrl:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/009/original/code_wizard.png?1748691628",
  },
  {
    id: 3,
    title: "Word Heroes",
    subject: "Communication",
    description:
      "Build vocabulary and spelling skills by rescuing words from the villain!",
    minGrade: 1,
    maxGrade: 7,
    durationMinutes: 12,
    imageUrl:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/010/original/word_hero.png?1748691861",
  },
  {
    id: 4,
    title: "Happy Painting",
    subject: "Creativity",
    description:
      "Explore colors and shapes while creating beautiful digital art masterpieces.",
    minGrade: 1,
    maxGrade: 7,
    durationMinutes: 15,
    imageUrl:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/167/011/original/happy_painting.png?1748692045",
  },
];

const GamesPage = () => {
  const [location] = useLocation();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.split("?")[1]);
    const subject = searchParams.get("subject");
    const grade = searchParams.get("grade");
    const character = searchParams.get("character");

    if (subject) setSelectedSubject(subject);
    if (grade) setSelectedGrade(parseInt(grade));

    if (character) {
      toast({
        title: "Character Selected",
        description: `Showing games featuring your selected character!`,
        duration: 3000,
      });
    }
  }, [location, toast]);

  // Use mock data instead of fetching from API
  const games = mockGames;
  const isLoading = false;
  const error = null;

  const subjects = ["all", "academics", "technology", "communication", "creativity"];
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

  const filteredGames = games?.filter((game) => {
    if (
      selectedSubject !== "all" &&
      game.subject.toLowerCase() !== selectedSubject
    ) {
      return false;
    }

    if (
      selectedGrade !== null &&
      (game.minGrade > selectedGrade || game.maxGrade < selectedGrade)
    ) {
      return false;
    }

    if (
      searchTerm &&
      !game.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Helmet>
        <title>Games Library | Cyber Quest</title>
        <meta
          name="description"
          content="Explore our collection of fun educational games designed to make learning exciting for grades K-6."
        />
      </Helmet>

        <HeaderDashboard/>
        

      <div className="pt-24 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-fredoka text-4xl md:text-5xl text-center mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Games Library
            </span>
          </h1>
          <p className="text-gray-700 text-lg text-center max-w-2xl mx-auto mb-10">
            Explore our collection of interactive educational games designed to
            make learning fun while building essential skills.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for games..."
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-3 text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-10 flex flex-col md:flex-row gap-6 justify-center">4

            {/* Subjects */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <h3 className="font-bold mb-3 text-center md:text-left">
                Subject:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    className={cn(
                      "px-4 py-2 rounded-full font-bold",
                      selectedSubject === subject
                        ? subject === "all"
                          ? "bg-primary text-white"
                          : getSubjectColor(subject)
                        : "bg-gray-200 text-dark hover:bg-primary/10"
                    )}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject === "all"
                      ? "All"
                      : subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade */}
            <div className="bg-white p-4 rounded-2xl shadow">
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
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">

        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-yellow-400 opacity-60 rounded-full"></div>
        <div className="absolute top-[-50px] left-[300px] w-[200px] h-[200px] bg-green-400 opacity-60 rounded-full"></div>
        <div className="absolute top-[220px] left-[800px] w-[300px] h-[300px] bg-primary opacity-30 rounded-full"></div>
        <div className="absolute top-[-70px] right-[-0px] w-[300px] h-[300px] bg-purple-400 opacity-30 rounded-full"></div>

        <div className="absolute top-10 right-10 text-purple text-2xl">✦</div>
        <div className="absolute top-20 left-20 text-secondary text-xl">✦</div>
        <div className="absolute bottom-40 right-20 text-primary text-2xl">
          ✦
        </div>

        <div className="absolute top-[45rem] left-40 text-purple-400 text-2xl">
          ✦
        </div>
        <div className="absolute top-60 right-[66rem] text-purple-400 text-xl">
          ✦
        </div>
        <div className="absolute bottom-60 right-[30rem] text-purple text-2xl">
          ✦
        </div>
        <div className="absolute top-[55rem] left-20 text-purple text-2xl">
          ✦
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-fredoka text-gray-700 mb-4">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't load the games right now.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary text-white"
              >
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="mb-8">
              <h2 className="font-fredoka text-2xl mb-2">
                {filteredGames?.length || 0} Games Found
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {filteredGames && filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                  <h3 className="text-2xl font-fredoka mb-2">No games found</h3>
                  <p className="text-gray-600 mb-6">
                    Try changing your filters to see more games.
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedSubject("all");
                      setSelectedGrade(null);
                      setSearchTerm("");
                    }}
                    className="bg-primary text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesPage;
