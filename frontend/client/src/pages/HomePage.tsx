import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import GameLibrary from "@/components/GameLibrary";
import Achievements from "@/components/Achievements";
import CallToAction from "@/components/CallToAction";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const HomePage = () => {
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
        <Achievements />
        <CallToAction />
        <Footer/>
    </>
  );
};

export default HomePage;
