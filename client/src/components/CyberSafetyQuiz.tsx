import { useState } from "react";

interface CyberSafetyQuizProps {
  onClose: () => void;
}

const quizData = [
  {
    category: "Reality River: Don't Fall for Fake",
    questions: [
      { difficulty: "Easy", question: "A pop-up ad says you won a prize, and all you have to do is click the button to claim it. What should you do?", choices: ["Click the button—it's a prize!", "Close the pop-up window without clicking anything.", "Reply to the ad with your email address."], answer: 1 },
      { difficulty: "Easy", question: "What is the best way to know if an online offer for a free item is probably a trick?", choices: ["If it's a brand you like.", "If it offers a prize that sounds too good to be true.", "If it includes a picture."], answer: 1 },
      { difficulty: "Easy", question: "What does a 'phisher' want from you?", choices: ["To invite you to their private party.", "To give you a free coupon.", "To trick you into giving them personal information like passwords."], answer: 2 },
      { difficulty: "Easy", question: "If a website asks for your password to see a funny video, what should you do?", choices: ["Enter your password.", "Ignore the request and leave the site.", "Share the link with friends."], answer: 1 },
      { difficulty: "Medium", question: "You see a news headline that says something unbelievable. What is the most reliable way to check if it's true?", choices: ["Ask a friend if they saw the same news.", "Look for the same story on two or three well-known, reputable news sites.", "Read the comments on the social media post."], answer: 1 },
      { difficulty: "Medium", question: "A friend sends you a link to a 'funny video,' but the link looks weird. How should you be sure it is safe to open?", choices: ["Click it and see what happens.", "Text your friend separately to ask if they really sent the link.", "Assume it's fine because your friend sent it."], answer: 1 },
      { difficulty: "Medium", question: "An online quiz asks you to enter your birthday and mother's maiden name to find out which animal you are. Why is this a bad idea?", choices: ["The results might be inaccurate.", "That information can be used to guess your passwords.", "The quiz might not be fun."], answer: 1 },
      { difficulty: "Medium", question: "You get an email from a company you don't know asking for your address to send a free gift. What should you do?", choices: ["Give your address.", "Ignore the email.", "Forward it to your friends."], answer: 1 },
      { difficulty: "Hard", question: "A social media post from an account you follow uses a stolen photo and claims to have an emotional story to get likes and shares. What is this tactic called?", choices: ["Catfishing.", "Clickbaiting.", "Content farming."], answer: 2 },
      { difficulty: "Hard", question: "A friend sends you a message with a dramatic story and a plea to share it immediately. You're not sure if it's true. What should you do?", choices: ["Share it with everyone, because it's better to be safe than sorry.", "Politely ask your friend to verify the story before sharing it further.", "Use a search engine or a fact-checking site to confirm the story before sharing."], answer: 2 },
      { difficulty: "Hard", question: "You see a political ad that shows a clip of a politician saying something shocking. What is the best way to verify if the video is real or a 'deepfake'?", choices: ["Believe it, because seeing is believing.", "Check the source and look for other reports on the same event from trusted news outlets.", "Show it to your friends and get their opinion."], answer: 1 },
      { difficulty: "Hard", question: "You see a post that uses a manipulated photo to create a false story. What is the most effective way to identify the photo as fake?", choices: ["Wait and see if it appears on the news.", "Use a reverse image search to find the original source of the photo.", "Look for similar stories that use different pictures."], answer: 1 },
      { difficulty: "Hard", question: "A website asks for your credit card info to claim a free prize. What should you do?", choices: ["Enter your info.", "Leave the site immediately.", "Share the site with friends."], answer: 1 },
    ]
  },
  {
    category: "Mindful Mountain: Share with Care",
    questions: [
      { difficulty: "Easy", question: "You and your friends are taking pictures together. Your friend doesn't want their picture posted online. What should you do?", choices: ["Post it anyway, and tag your friend later.", "Post it, but hide your friend's face with an emoji.", "Respect your friend's privacy and don't post the picture."], answer: 2 },
      { difficulty: "Easy", question: "Before you post something online, what should you do?", choices: ["Post it quickly, before you change your mind.", "Think about how it might make you or others feel.", "Tag all your friends so they can see it."], answer: 1 },
      { difficulty: "Easy", question: "What information should you never share publicly online?", choices: ["Your favorite video game.", "Your email password.", "Your favorite food."], answer: 1 },
      { difficulty: "Easy", question: "If you want to share a funny story, what should you check first?", choices: ["If it could embarrass someone.", "If it will get lots of likes.", "If it is about you only."], answer: 0 },
      { difficulty: "Medium", question: "Your friend shares an embarrassing story about you in a group chat, and it gets forwarded to other people. What is the best way to handle this?", choices: ["Share an embarrassing story about your friend to get even.", "Talk to your friend privately and ask them to delete the post.", "Leave the group chat and don't talk to anyone."], answer: 1 },
      { difficulty: "Medium", question: "You create a new profile for a game. What is the best kind of information to use for your username?", choices: ["Your full name and birthday.", "The name of your school.", "A creative name that doesn't reveal your identity."], answer: 2 },
      { difficulty: "Medium", question: "You are tagging a friend in a photo. Your friend's profile has very private settings. What will likely happen when you tag them?", choices: ["The photo will automatically be public.", "The photo will only be visible to your friend.", "Your friend will get a notification and can approve or deny the tag."], answer: 2 },
      { difficulty: "Medium", question: "You want to share a meme, but it contains personal info about someone else. What should you do?", choices: ["Share it anyway.", "Edit out the personal info before sharing.", "Ask the person for permission first."], answer: 2 },
      { difficulty: "Hard", question: "A social media app asks for permission to access your phone's camera, microphone, and contacts. What should you do before giving permission?", choices: ["Always say yes so the app works perfectly.", "Just say yes, because all apps do this.", "Read the app's privacy policy to understand why it needs that access."], answer: 2 },
      { difficulty: "Hard", question: "You see that your parents have posted a photo of you without your permission. What is the most respectful way to talk to them about it?", choices: ["Delete the photo without telling them.", "Leave an angry comment on the photo.", "Talk to them privately and calmly about your feelings and ask them to take it down."], answer: 2 },
      { difficulty: "Hard", question: "The internet has a 'long memory.' What does this mean for the things you post online?", choices: ["Deleting a post permanently erases it from the internet.", "A post might be saved or shared by others and could resurface years later.", "Your account will automatically remember all your posts."], answer: 1 },
      { difficulty: "Hard", question: "What is a 'digital footprint'?", choices: ["The tracking data from your phone's location services.", "All the photos and videos you share online.", "The trail of data you leave behind from your online activity."], answer: 2 },
      { difficulty: "Hard", question: "You want to share a friend's accomplishment online. What should you do first?", choices: ["Share it immediately.", "Ask your friend for permission.", "Tag everyone you know."], answer: 1 },
    ]
  },
  {
    category: "Kind Kingdom: It's Cool to be Kind",
    questions: [
      { difficulty: "Easy", question: "What should you do if someone is being mean to you in an online game?", choices: ["Be mean back to them.", "Block them and report their behavior.", "Try to argue with them until they stop."], answer: 1 },
      { difficulty: "Easy", question: "You see someone getting bullied online. What should you do?", choices: ["Ignore it, it's not your problem.", "Send the person being bullied a kind, supportive private message.", "Tell everyone to report the bully."], answer: 1 },
      { difficulty: "Easy", question: "What is the best way to spread kindness online?", choices: ["Send friend requests to strangers.", "Say supportive and positive things to your friends.", "Post a lot of emojis."], answer: 1 },
      { difficulty: "Easy", question: "If you see a mean comment, what is a good first step?", choices: ["Reply with a mean comment.", "Report or block the user.", "Share the comment with others."], answer: 1 },
      { difficulty: "Medium", question: "What does it mean to be an 'upstander' online?", choices: ["You are watching what's happening but not getting involved.", "You are defending someone who is being bullied.", "You are being a leader in your online community."], answer: 1 },
      { difficulty: "Medium", question: "A friend is having a public online disagreement with someone. What is the best way to help?", choices: ["Take a side and leave a comment to support your friend.", "Privately message your friend and suggest they step away from the argument.", "Leave a comment telling them both to stop arguing."], answer: 1 },
      { difficulty: "Medium", question: "What is a good way to use your online voice for good?", choices: ["Start an argument to make a point.", "Create a post celebrating someone's accomplishments.", "Share a post without checking if it's true."], answer: 1 },
      { difficulty: "Medium", question: "If you see someone being left out in a group chat, what can you do?", choices: ["Invite them to join in.", "Ignore it.", "Make a joke about it."], answer: 0 },
      { difficulty: "Hard", question: "What's the main difference between a constructive disagreement and online bullying?", choices: ["Constructive disagreement is always done in private.", "Constructive disagreement is respectful and focuses on ideas, while bullying is personal and attacks the person.", "Constructive disagreement is between two people; bullying is between many people."], answer: 1 },
      { difficulty: "Hard", question: "You see a friend posting negative or hateful comments. What is the best and most impactful way to respond?", choices: ["Confront them in the comments and call them out.", "Ignore it and hope they stop.", "Talk to them privately about why their behavior is hurtful and encourage them to stop."], answer: 2 },
      { difficulty: "Hard", question: "A friend is sending you mean messages, but you feel like you can handle it. What is the best action to take for your own well-being?", choices: ["Report the messages to a trusted adult, even if you don't feel in immediate danger.", "Respond with a mean message to make them stop.", "Continue to talk to them, hoping they'll change."], answer: 0 },
      { difficulty: "Hard", question: "A friend is being bullied online and asks for help. What should you do?", choices: ["Tell them to ignore it.", "Help them report the bullying and offer support.", "Share the bullying post to raise awareness."], answer: 1 },
      { difficulty: "Hard", question: "What is the most important lesson from Kind Kingdom?", choices: ["The internet is a place to get back at people.", "There are consequences for online actions, just like in real life.", "All online arguments can be solved easily."], answer: 1 },
    ]
  },
  {
    category: "Tower of Treasure: Secure Your Secrets",
    questions: [
      { difficulty: "Easy", question: "What makes a password strong?", choices: ["It's your name or pet's name.", "It uses a mix of different types of characters.", "It's a single, easy-to-remember word."], answer: 1 },
      { difficulty: "Easy", question: "Should you ever share your password with your best friend or anyone else?", choices: ["Yes, if you trust them.", "No, you should never share your password.", "Yes, but only for a little while."], answer: 1 },
      { difficulty: "Easy", question: "Why is it a bad idea to use your birthday as part of your password?", choices: ["It makes the password too long.", "It's easy for people to find and guess.", "It doesn't use numbers."], answer: 1 },
      { difficulty: "Easy", question: "If a website asks for your password to see a funny video, what should you do?", choices: ["Enter your password.", "Ignore the request and leave the site.", "Share the link with friends."], answer: 1 },
      { difficulty: "Medium", question: "You get an email from a social media site saying your password has been compromised. It asks you to click a link to 'verify your account.' What should you do?", choices: ["Click the link immediately to protect your account.", "Ignore the email.", "Go directly to the social media site (not using the email link) and change your password from there."], answer: 2 },
      { difficulty: "Medium", question: "Why is it a good practice to use different passwords for different websites?", choices: ["It's easier to remember.", "If one account is hacked, your other accounts will still be safe.", "All websites require different passwords anyway."], answer: 1 },
      { difficulty: "Medium", question: "You create a new password. Which of these is the most secure?", choices: ["Supergirl24", "LuvMyCat", "!Pa$$w0rd3"], answer: 2 },
      { difficulty: "Medium", question: "You get a text message from your bank asking for your PIN. What should you do?", choices: ["Reply with your PIN.", "Ignore the message and contact your bank directly.", "Forward the message to your friends."], answer: 1 },
      { difficulty: "Hard", question: "What is 'two-factor authentication,' and why is it so secure?", choices: ["You have to enter your password twice.", "It requires two separate steps to log in, like a password and a code sent to your phone, making it harder for hackers to get in.", "It sends you a confirmation email every time you log in."], answer: 1 },
      { difficulty: "Hard", question: "You log into an online service using public Wi-Fi at a cafe. What is the biggest security risk?", choices: ["The website might crash.", "Your login information could be intercepted by someone else on the same network.", "The cafe owner will see your screen."], answer: 1 },
      { difficulty: "Hard", question: "What does a 'phishing' scam email most commonly use to deceive you?", choices: ["Bright colors and pictures.", "Emotional language and a fake sense of urgency.", "An old logo from a well-known company."], answer: 1 },
      { difficulty: "Hard", question: "How does a password manager help keep you secure?", choices: ["It automatically chooses your passwords for you.", "It saves all your passwords so you don't have to remember them and can create complex, unique ones for each site.", "It tells you when a website is unsafe."], answer: 1 },
      { difficulty: "Hard", question: "A website asks for your credit card info to claim a free prize. What should you do?", choices: ["Enter your info.", "Leave the site immediately.", "Share the site with friends."], answer: 1 }
    ]
  },
];

function shuffleArray(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CyberSafetyQuiz = ({ onClose }: CyberSafetyQuizProps) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [questions, setQuestions] = useState(() => shuffleArray(quizData[0].questions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setQuestions(shuffleArray(quizData[idx].questions));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[current] = selected;
    setUserAnswers(updatedAnswers);
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  return (
    <>
      <style>{`
        .quiz-modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .quiz-modal-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 8px;
        }
        .quiz-modal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .quiz-modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="quiz-modal-scroll relative max-w-xl w-full mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold"
            aria-label="Close Quiz"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Cyber Safety Quiz</h2>
          <div className="flex flex-wrap justify-center mb-8 gap-2 w-full">
            {quizData.map((cat: any, idx: number) => {
              const colors = [
                { active: "bg-red-600 text-white border-red-600", inactive: "bg-white text-red-700 hover:bg-red-100 border-red-300" },
                { active: "bg-green-600 text-white border-green-600", inactive: "bg-white text-green-700 hover:bg-green-100 border-green-300" },
                { active: "bg-blue-600 text-white border-blue-600", inactive: "bg-white text-blue-700 hover:bg-blue-100 border-blue-300" },
                { active: "bg-yellow-500 text-white border-yellow-500", inactive: "bg-white text-yellow-700 hover:bg-yellow-100 border-yellow-300" }
              ];
              const color = colors[idx % colors.length];
              return (
                <button
                  key={cat.category}
                  onClick={() => handleCategoryChange(idx)}
                  className={`min-w-[140px] max-w-full px-2 py-2 text-sm rounded-full font-semibold transition-all border-2 whitespace-normal break-words ${activeCategory === idx ? color.active : color.inactive}`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {cat.category.split(":")[0]}
                </button>
              );
            })}
          </div>
          {!showResult ? (
            <div>
              <div className="mb-2 text-sm text-gray-500">{quizData[activeCategory].category} - {questions[current].difficulty}</div>
              <div className="font-semibold mb-4 text-gray-700">{current + 1}. {questions[current].question}</div>
              <div className="space-y-2 mb-6">
                {questions[current].choices.map((choice: string, idx: number) => (
                  <label key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${selected === idx ? "bg-purple-200" : "hover:bg-purple-100"}`}>
                    <input
                      type="radio"
                      name="answer"
                      checked={selected === idx}
                      onChange={() => handleSelect(idx)}
                      className="accent-purple-500"
                    />
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {choice}
                  </label>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={selected === null}
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 hover:bg-purple-700 transition-all disabled:opacity-50"
              >
                {current < questions.length - 1 ? "Next" : "See Results"}
              </button>
            </div>
          ) : (
            <div className="text-center relative">
              {score / questions.length >= 0.8 && <div className="absolute inset-0 pointer-events-none"><img src="/confetti.gif" alt="Confetti" /></div>}
              <div className="text-2xl font-bold mb-4 text-purple-700">Quiz Complete!</div>
              <div className="text-lg mb-2">Your Score: <span className="font-bold">{score} / {questions.length}</span></div>
              {score / questions.length >= 0.8 && (
                <div className="text-green-700 font-bold text-xl mb-4">🎉 Amazing! You're a cyber safety star!</div>
              )}
              {score / questions.length < 0.5 && (
                <div className="text-red-700 font-bold text-xl mb-4">😔 Oops! Keep practicing and you'll get better!</div>
              )}
              <div className="mt-6 text-left">
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Your Answers:</h3>
                <ul className="space-y-4">
                  {questions.map((q: any, idx: number) => {
                    const userAnswer = userAnswers[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <li key={idx} className={`p-4 rounded-xl ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                        <div className="font-semibold">{idx + 1}. {q.question}</div>
                        <div className="mt-1">Your answer: <span className="font-bold">{userAnswer !== undefined && userAnswer !== null ? `${String.fromCharCode(65 + userAnswer)}. ${q.choices[userAnswer]}` : "No answer"}</span></div>
                        <div className="mt-1">{isCorrect ? "✅ Correct!" : <>❌ Correct answer: <span className="font-bold">{`${String.fromCharCode(65 + q.answer)}. ${q.choices[q.answer]}`}</span></>}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                onClick={handleRestart}
                className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full mt-4 hover:bg-purple-700 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-full mt-4 hover:bg-gray-400 transition-all ml-2"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CyberSafetyQuiz;