import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Quizz = () => {
  
    return (
        <>
            <Header />
            <section className="py-16 bg-white">
                <div className="container p-10 mx-auto px-4">
                    <div className="max-w-xl mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Cyber Safety Quiz</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">1. What should you do if you get a message from a stranger online?</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q1" value="a" className="accent-purple-500" /> Reply and share your info
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q1" value="b" className="accent-purple-500" /> Ignore or tell a trusted adult
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">2. What is a strong password?</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q2" value="a" className="accent-purple-500" /> 123456
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q2" value="b" className="accent-purple-500" /> Mix of letters, numbers, and symbols
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">3. Why should you think before posting online?</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q3" value="a" className="accent-purple-500" /> Because posts can be permanent
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="q3" value="b" className="accent-purple-500" /> It doesn't matter what you post
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 hover:bg-purple-700 transition-all">Submit Answers</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Quizz;