import { Button } from "@/components/ui/button";
import GradeLevelSelector from "./GradeLevelSelector";
import React from "react";

const Hero = () => {
  return (
    <section className="pt-16 pb-1 bg-white relative overflow-hidden">
      {/* Star decorations */}
      <div className="absolute top-10 right-10 text-purple text-2xl">✦</div>
      <div className="absolute top-20 left-20 text-secondary text-xl">✦</div>
      <div className="absolute bottom-40 right-20 text-primary text-2xl">✦</div>

      <div className="absolute top-[45rem] left-40 text-purple-400 text-2xl">✦</div>
      <div className="absolute top-60 right-[66rem] text-purple-400 text-xl">✦</div>
      <div className="absolute bottom-60 right-[30rem] text-purple text-2xl">✦</div>
      <div className="absolute top-[55rem] left-20 text-purple text-2xl">✦</div>

      <div className="container mx-auto px-4">
        {/* Main headline  */}
        <div className="text-center mb-16">
          <h1 className="font-fredoka text-4xl text-primary md:text-5xl lg:text-6xl leading-tight mb-4">
            Luna Learn helps your child 
            <span className="block">prepare for school</span>
          </h1>
        </div>

        {/* Three features section with images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Voice-based interaction */}
          <div className="rounded-3xl overflow-hidden shadow-lg relative">
            <div className="h-48 bg-gradient-to-br from-primary to-pink-300 flex items-center justify-center relative">
              <div className="absolute top-4 left-4 bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10V12C19 15.866 15.866 19 12 19M12 19C8.13401 19 5 15.866 5 12V10M12 19V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-32 h-32">
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <circle cx="100" cy="100" r="80" fill="#7ED6DF" />
                  <rect x="70" y="65" width="60" height="75" rx="15" fill="#4ECDC4" />
                  <circle cx="85" cy="85" r="10" fill="white" />
                  <circle cx="115" cy="85" r="10" fill="white" />
                  <circle cx="85" cy="85" r="5" fill="#2A2D7E" />
                  <circle cx="115" cy="85" r="5" fill="#2A2D7E" />
                  <rect x="85" y="110" width="30" height="8" rx="4" fill="white" />
                  <path d="M65 60L75 40H125L135 60H65Z" fill="#2A2D7E" />
                  <rect x="75" y="30" width="50" height="15" rx="7.5" fill="#FF6B6B" />
                  <rect x="60" y="140" width="20" height="30" rx="5" fill="#A78BFA" />
                  <rect x="120" y="140" width="20" height="30" rx="5" fill="#A78BFA" />
                  <circle cx="100" cy="45" r="5" fill="#FFD166" />
                </svg>
              </div>
              {/* Speech bubble */}
              <div className="absolute top-5 right-5 bg-blue-400 text-white font-fredoka text-sm py-1 px-3 rounded-full">
                <span>Hello!</span>
              </div>
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-fredoka text-primary text-xl mb-2">Voice-based interaction</h3>
              <p className="text-gray-600">LunaLearn hears and responds using the latest voice recognition and AI technology.</p>
            </div>
          </div>

          {/* Safe learning space */}
          <div className="rounded-3xl overflow-hidden shadow-lg relative">
            <div className="h-48 bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center relative">
              <div className="w-40 h-40 relative">
                {/* Character image */}
                <div className="w-full h-full bg-blue-400 rounded-full flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <circle cx="50" cy="50" r="40" fill="#7E9DDF" />
                    <circle cx="40" cy="40" r="8" fill="white" />
                    <circle cx="60" cy="40" r="8" fill="white" />
                    <circle cx="40" cy="40" r="4" fill="#2A2D7E" />
                    <circle cx="60" cy="40" r="4" fill="#2A2D7E" />
                    <path d="M40 60C45 68 55 68 60 60" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M30 30C35 20 65 20 70 30" fill="#6BD475" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-white text-blue-400 font-fredoka text-sm py-1 px-3 rounded-full">
                <span>SAFE SPACE</span>
              </div>
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-fredoka text-primary text-xl mb-2">Safe learning space</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, recusandae?</p>
            </div>
          </div>

          {/* Focus on Fun */}
          <div className="rounded-3xl overflow-hidden shadow-lg relative">
            <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-300 flex items-center justify-center relative">
              <div className="absolute bottom-4 right-4 bg-green w-12 h-12 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 3.5C14.5 4.05228 14.0523 4.5 13.5 4.5C12.9477 4.5 12.5 4.05228 12.5 3.5C12.5 2.94772 12.9477 2.5 13.5 2.5C14.0523 2.5 14.5 2.94772 14.5 3.5Z" fill="white"/>
                  <path d="M9.5 6.5C9.5 7.05228 9.05228 7.5 8.5 7.5C7.94772 7.5 7.5 7.05228 7.5 6.5C7.5 5.94772 7.94772 5.5 8.5 5.5C9.05228 5.5 9.5 5.94772 9.5 6.5Z" fill="white"/>
                  <path d="M17.5 8.5C17.5 9.05228 17.0523 9.5 16.5 9.5C15.9477 9.5 15.5 9.05228 15.5 8.5C15.5 7.94772 15.9477 7.5 16.5 7.5C17.0523 7.5 17.5 7.94772 17.5 8.5Z" fill="white"/>
                  <path d="M9 14.5C9 15.0523 8.55228 15.5 8 15.5C7.44772 15.5 7 15.0523 7 14.5C7 13.9477 7.44772 13.5 8 13.5C8.55228 13.5 9 13.9477 9 14.5Z" fill="white"/>
                  <path d="M17 16.5C17 17.0523 16.5523 17.5 16 17.5C15.4477 17.5 15 17.0523 15 16.5C15 15.9477 15.4477 15.5 16 15.5C16.5523 15.5 17 15.9477 17 16.5Z" fill="white"/>
                  <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="white"/>
                  <path d="M12 21C13.6569 21 15 19.6569 15 18C15 16.3431 13.6569 15 12 15C10.3431 15 9 16.3431 9 18C9 19.6569 10.3431 21 12 21Z" fill="white"/>
                </svg>
              </div>

              <div className="w-36 h-36 relative">
                {/* Game illustration */}
                <div className="w-full h-full bg-white p-2 rounded-2xl shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-yellow-100 rounded-xl flex items-center justify-center relative">
                    {/* Game elements */}
                    <div className="absolute top-2 left-2 bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-fredoka">1</div>
                    <div className="absolute bottom-2 right-2 bg-pink-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-fredoka">2</div>
                    <div className="absolute top-2 right-2 bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-fredoka">3</div>
                    
                    {/* Game character */}
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 50 50" width="80%" height="80%">
                        <circle cx="25" cy="25" r="20" fill="#FF9E9E" />
                        <circle cx="18" cy="20" r="4" fill="white" />
                        <circle cx="32" cy="20" r="4" fill="white" />
                        <circle cx="18" cy="20" r="2" fill="#2A2D7E" />
                        <circle cx="32" cy="20" r="2" fill="#2A2D7E" />
                        <path d="M20 30C22 33 28 33 30 30" stroke="#2A2D7E" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Speech bubble */}
              <div className="absolute top-5 right-5 bg-pink-400 text-white font-fredoka text-sm py-1 px-3 rounded-full">
                <span>Let's play!</span>
              </div>
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-fredoka text-primary text-xl mb-2">Focus on Fun</h3>
              <p className="text-gray-600">Game-based lessons to keep kids learning longer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Robot character SVG component
const RobotCharacter = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" fill="#7ED6DF" />
    <rect x="65" y="60" width="70" height="90" rx="15" fill="#4ECDC4" />
    <circle cx="85" cy="85" r="10" fill="white" />
    <circle cx="115" cy="85" r="10" fill="white" />
    <circle cx="85" cy="85" r="5" fill="#2A2D7E" />
    <circle cx="115" cy="85" r="5" fill="#2A2D7E" />
    <rect x="85" y="110" width="30" height="8" rx="4" fill="white" />
    <path d="M60 55L75 35H125L140 55H60Z" fill="#2A2D7E" />
    <rect x="75" y="25" width="50" height="15" rx="7.5" fill="#FF6B6B" />
    <rect x="55" y="150" width="20" height="30" rx="5" fill="#A78BFA" />
    <rect x="125" y="150" width="20" height="30" rx="5" fill="#A78BFA" />
    <circle cx="100" cy="40" r="5" fill="#FFD166" />
  </svg>
);

// Dinosaur character SVG component (like Buddy.ai blue dino)
const BlueDinoCharacter = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue body */}
    <ellipse cx="100" cy="120" rx="55" ry="50" fill="#7E9DDF" />
    
    {/* Green Dino Suit */}
    <path d="M70 95C65 85 68 65 85 60C110 50 135 70 140 80C145 90 145 115 140 125C135 135 125 140 115 140C105 140 75 135 70 95Z" fill="#6BD475" />
    
    {/* Face */}
    <circle cx="100" cy="85" r="35" fill="#7E9DDF" />
    
    {/* White eyes background */}
    <circle cx="85" cy="75" r="10" fill="white" />
    <circle cx="115" cy="75" r="10" fill="white" />
    
    {/* Dark eyes */}
    <circle cx="85" cy="75" r="5" fill="#2A2D7E" />
    <circle cx="115" cy="75" r="5" fill="#2A2D7E" />
    
    {/* Cute mouth */}
    <path d="M85 95C90 105 110 105 115 95" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
    
    {/* Dino spikes/hat */}
    <path d="M70 65C75 45 125 45 130 65" fill="#6BD475" />
    <circle cx="80" cy="50" r="10" fill="#6BD475" />
    <circle cx="100" cy="45" r="10" fill="#6BD475" />
    <circle cx="120" cy="50" r="10" fill="#6BD475" />
    
    {/* Tail */}
    <path d="M45 110C35 100 40 80 50 85C60 90 55 105 45 110Z" fill="#6BD475" />
  </svg>
);

export default Hero;
