import { useState } from "react";

interface JuniorAgentGameProps {
  onClose: () => void;
}

const agentMessages = [
  {
    text: "From: support@paypall.com\nSubject: Urgent! Your account will be suspended. Click here to verify your password: http://paypall-security.com",
    elements: [
      { label: "Misspelled sender (paypall.com)", isFraud: true },
      { label: "Urgent threat", isFraud: true },
      { label: "Request for password", isFraud: true },
      { label: "Unusual link URL", isFraud: true },
      { label: "Legitimate message", isFraud: false }
    ]
  },
  {
    text: "From: teacher@school.edu\nSubject: Homework Reminder. Please submit your assignment by Friday.",
    elements: [
      { label: "Legitimate sender (school.edu)", isFraud: false },
      { label: "No urgent threat", isFraud: false },
      { label: "No password request", isFraud: false },
      { label: "No suspicious link", isFraud: false }
    ]
  },
  {
    text: "From: admin@gamezone.com\nSubject: Free coins! Click here: http://gamezone-prizes.ru",
    elements: [
      { label: "Unusual link URL (.ru)", isFraud: true },
      { label: "Free prize offer", isFraud: true },
      { label: "Legitimate sender (gamezone.com)", isFraud: false }
    ]
  },
  {
    text: "From: info@banksecure.com\nSubject: Account Alert! Please confirm your PIN at http://banksecure-check.com",
    elements: [
      { label: "Request for PIN", isFraud: true },
      { label: "Suspicious link URL", isFraud: true },
      { label: "Legitimate sender (banksecure.com)", isFraud: false }
    ]
  },
  {
    text: "From: friend@gmail.com\nSubject: Check out this cool video! https://youtube.com/coolvideo",
    elements: [
      { label: "Legitimate sender (gmail.com)", isFraud: false },
      { label: "No request for personal info", isFraud: false },
      { label: "Safe link (youtube.com)", isFraud: false }
    ]
  },
  {
    text: "From: contest@winbig.com\nSubject: You won! Send your address to claim your prize.",
    elements: [
      { label: "Request for address", isFraud: true },
      { label: "Too good to be true offer", isFraud: true },
      { label: "Unknown sender (winbig.com)", isFraud: true }
    ]
  },
  {
    text: "From: admin@school.edu\nSubject: School Event Reminder. Join us for the annual fair!",
    elements: [
      { label: "Legitimate sender (school.edu)", isFraud: false },
      { label: "No suspicious link", isFraud: false },
      { label: "No request for sensitive info", isFraud: false }
    ]
  },
  {
    text: "From: support@apple.com\nSubject: Your Apple ID has been locked. Click here to unlock: http://appleid-unlock.com",
    elements: [
      { label: "Suspicious link URL", isFraud: true },
      { label: "Urgent threat", isFraud: true },
      { label: "Legitimate sender (apple.com)", isFraud: false }
    ]
  },
  {
    text: "From: coach@sportsclub.org\nSubject: Practice Update. See you at 5pm tomorrow!",
    elements: [
      { label: "Legitimate sender (sportsclub.org)", isFraud: false },
      { label: "No suspicious link", isFraud: false },
      { label: "No request for personal info", isFraud: false }
    ]
  },
  {
    text: "From: security@instagram.com\nSubject: Confirm your password to keep your account safe: http://insta-security.net",
    elements: [
      { label: "Request for password", isFraud: true },
      { label: "Suspicious link URL", isFraud: true },
      { label: "Legitimate sender (instagram.com)", isFraud: false }
    ]
  }
];

const JuniorAgentGame = ({ onClose }: JuniorAgentGameProps) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const message = agentMessages[current];

  function handleElementClick(idx: number) {
    let newSelected: number[];
    if (selected.includes(idx)) {
      newSelected = selected.filter(i => i !== idx);
      if (message.elements[idx].isFraud) {
        setScore(score - 1);
      } else {
        setScore(score + 1);
      }
    } else {
      newSelected = [...selected, idx];
      if (message.elements[idx].isFraud) {
        setScore(score + 1);
      } else {
        setScore(score - 1);
      }
    }
    setSelected(newSelected);
  }

  function handleNext() {
    if (current < agentMessages.length - 1) {
      setCurrent(current + 1);
      setSelected([]);
    } else {
      setShowResult(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setScore(0);
    setSelected([]);
    setShowResult(false);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="quiz-modal-scroll relative max-w-xl w-full mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold"
          aria-label="Close Game"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">Junior Agent: Spot the Scam!</h2>
        <div className="mb-4 text-gray-700 text-center">Analyze each message and click to highlight suspicious elements. Earn Trust Score by flagging scams and approving legit messages.</div>
        {!showResult ? (
          <div>
            <div className="mb-2 text-sm text-gray-500">Message {current + 1} of {agentMessages.length}</div>
            <pre className="font-semibold mb-4 text-gray-700 whitespace-pre-wrap">{message.text}</pre>
            <div className="space-y-2 mb-6">
              {message.elements.map((el: any, idx: number) => (
                <label key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${selected.includes(idx) ? (el.isFraud ? "bg-red-200" : "bg-green-200") : "hover:bg-purple-100"}`}>
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => handleElementClick(idx)}
                    className={el.isFraud ? "accent-red-500" : "accent-green-500"}
                  />
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {el.label}
                </label>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selected.length === 0}
              className="w-full bg-yellow-500 text-white font-bold py-3 rounded-full mt-6 hover:bg-yellow-600 transition-all disabled:opacity-50"
            >
              {current < agentMessages.length - 1 ? "Next" : "See Results"}
            </button>
            <div className="text-lg font-bold mt-4">Trust Score: {score}</div>
          </div>
        ) : (
          <div className="text-center relative">
            <div className="text-2xl font-bold mb-4 text-yellow-700">Game Complete!</div>
            <div className="text-lg mb-2">Your Trust Score: <span className="font-bold">{score}</span></div>
            {score >= 5 && (
              <div className="text-green-700 font-bold text-xl mb-4">🎉 Excellent! You're a cyber detective!</div>
            )}
            {score < 5 && (
              <div className="text-red-700 font-bold text-xl mb-4">😔 Keep practicing to improve your skills!</div>
            )}
            <button
              className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-full mt-4 hover:bg-yellow-600 transition-all"
              onClick={handleRestart}
            >
              Play Again
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
  );
};

export default JuniorAgentGame;