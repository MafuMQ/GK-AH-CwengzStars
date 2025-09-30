import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import GameLibrary from "../components/GameLibrary";
import Achievements from "../components/Achievements";
import CallToAction from "../components/CallToAction";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VirusTotalScanner from "../components/VirusTotalScanner";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [showVirusTotalScanner, setShowVirusTotalScanner] = useState(false);

  return (
    <>
        <Helmet>
        <title>Cyber Quest</title>
        <meta
            name="description"
            content="Cyber Quest is an educational game that makes learning fun and engaging for children. Explore a world of knowledge with interactive lessons, quizzes, and adventures."
        />
        </Helmet>
        <Header/>
        <HeroSection />
        <GameLibrary />

        {/* VirusTotal Scanner Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-fredoka text-4xl md:text-5xl text-white mb-6">
                🔒 VirusTotal Security Scanner
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-10">
                Stay safe online! Use our integrated VirusTotal scanner to check files and URLs for malware and security threats.
                Perfect for learning about cybersecurity in a safe environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl mb-4">📁</div>
                  <h3 className="text-xl font-bold text-white mb-2">File Scanner</h3>
                  <p className="text-gray-300">Upload and scan files for viruses and malware using multiple antivirus engines.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl mb-4">🔗</div>
                  <h3 className="text-xl font-bold text-white mb-2">URL Scanner</h3>
                  <p className="text-gray-300">Check websites and URLs for malicious content and phishing attempts.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Learn & Protect</h3>
                  <p className="text-gray-300">Educational tool to help kids understand online safety and security concepts.</p>
                </div>
              </div>

              <button
                onClick={() => setShowVirusTotalScanner(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:-translate-y-1 duration-300 flex items-center gap-2 mx-auto"
              >
                <span className="text-2xl">🛡️</span>
                Launch Security Scanner
              </button>
            </div>
          </div>
        </section>

        <Achievements />
        <CallToAction />
        <Footer/>

        {/* VirusTotal Scanner Modal */}
        {showVirusTotalScanner && (
          <VirusTotalScanner onClose={() => setShowVirusTotalScanner(false)} />
        )}
    </>
  );
};

export default HomePage;
