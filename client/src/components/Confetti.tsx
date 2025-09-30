import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  containerId?: string;
}

const Confetti = ({
  active,
  duration = 3000,
  particleCount = 50,
  containerId
}: ConfettiProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active) return;
    
    const container = containerId 
      ? document.getElementById(containerId) 
      : containerRef.current;
      
    if (!container) return;
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#A78BFA', '#F9A8D4'];
    const confettiPieces: HTMLDivElement[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2.5 h-2.5 opacity-0 z-50';
      
      // Random styles
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 360;
      const x = (Math.random() - 0.5) * 500;
      const y = Math.random() * 500;
      
      confetti.style.backgroundColor = color;
      confetti.style.transform = `rotate(${rotation}deg) translate3d(0, 0, 0)`;
      
      // Position randomly
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '0';
      
      // Animation
      confetti.animate([
        { opacity: 1, transform: `rotate(${rotation}deg) translate3d(0, 0, 0)` },
        { opacity: 0, transform: `rotate(${rotation + 90}deg) translate3d(${x}px, ${y}px, 0)` }
      ], {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards'
      });
      
      container.appendChild(confetti);
      confettiPieces.push(confetti);
    }
    
    // Cleanup
    const timeoutId = setTimeout(() => {
      confettiPieces.forEach(piece => {
        if (piece.parentNode) {
          piece.parentNode.removeChild(piece);
        }
      });
    }, duration);
    
    return () => {
      clearTimeout(timeoutId);
      confettiPieces.forEach(piece => {
        if (piece.parentNode) {
          piece.parentNode.removeChild(piece);
        }
      });
    };
  }, [active, duration, particleCount, containerId]);
  
  return <div ref={containerRef} className="relative overflow-hidden" />;
};

export default Confetti;
