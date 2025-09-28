import React, { Children, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const AboutUsPage = () => {
  
  return (
    <>
        <Header />
        <section className="py-16 bg-white">
            <div className="container p-10 mx-auto px-4">
                <div className='bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8'>
                    <h1 className='text-4xl text-center text-primary font-bold p-4'>What we are working on?</h1>
                    <p className='p-4'>We working on Cyber Quest, an interactive, game-based platform designed to teach children how to navigate the digital world safely and responsibly. With online platforms becoming central to learning, entertainment, and social interaction, many young users remain unaware of the risks of unsafe internet behavior and the long-term impact of their digital footprints.

                    Cyber Quest transforms online safety lessons into engaging challenges and quests, making learning both fun and impactful. By blending play with practical knowledge, the project empowers children to become confident, informed, and responsible digital citizens who can thrive in a connected world while protecting their well-being.</p>
                </div><br/>
                <div className='bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8'>
                    <h1 className='text-4xl text-center text-primary font-bold p-4'>What inspired the project?</h1>
                    <p className='p-4'>The inspiration for Cyber Quest arose from the urgent need to address children's growing exposure to the digital world without adequate guidance on safe practices. With online platforms becoming central to education, entertainment, and social interaction, many young users remain unaware of the long-term consequences of their digital footprints and the risks of unsafe internet behavior. 
                    This project was motivated by the desire to bridge that gap through an engaging, game-based solution that not only entertains but also equips children with essential knowledge and skills to navigate the internet responsibly. By transforming online safety lessons into interactive challenges, Cyber Quest seeks to empower the next generation to become confident, informed, and responsible digital citizens.</p>
                </div>
            </div>
        </section>
        <Footer />
    </>
  );
};

export default AboutUsPage;