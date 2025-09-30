import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden animated-gradient py-44">
      <div className="container mx-auto flex items-center gap-12 px-6">
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
            Cyber Quest: Empowering Kids for Safe & Smart Digital Adventures
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg font-semibold">
            Embark on interactive quests that teach kids to navigate the digital world safely, responsibly, and confidently.
          </p>
          <div className="flex gap-5">
            <a href="/quizz" className="bg-transparent border-2 border-white text-white font-bold px-4 py-2 rounded-full hover:bg-white hover:text-primary transition-all hover:-translate-y-1 duration-300 text-lg">
              Try for Free
            </a>
            <a href="/login" className="bg-transparent border-2 border-white text-white font-bold px-4 py-2 rounded-full hover:bg-white hover:text-primary transition-all hover:-translate-y-1 duration-300 text-lg">
              See Demo
            </a>

          </div>
        </div>
        <div className="flex-1 relative z-0 text-center">
          <img src="https://shorturl.at/MRorC" alt="Happy Robot" className="w-full max-w-md mx-auto animate-float"/>
          <div className="absolute top-[-10px] left-[-700px] w-[500px] h-[500px] bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-white opacity-10 rounded-full"></div>
        
          <div className="absolute top-10 left-[-15rem] text-primary text-3xl">✦</div>
          <div className="absolute top-[-5rem] left-[-45rem] text-secondary/40 text-3xl">✦</div>
          <div className="absolute bottom-60 right-[20rem] text-primary text-2xl">✦</div>

          <div className="absolute top-[15rem] left-[25rem] text-primary text-3xl">✦</div>
          <div className="absolute top-[15rem] right-[70rem] text-secondary text-xl">✦</div>
          <div className="absolute bottom-60 left-[-50rem] text-purple/80 text-2xl">✦</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
