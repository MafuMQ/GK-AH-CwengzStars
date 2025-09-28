import { SVGProps } from "react";

export const MathBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#FFD166" />
    <circle cx="32" cy="32" r="25" fill="#FFDA85" />
    <path d="M22 22L42 42" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
    <path d="M42 22L22 42" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
    <path d="M32 16V48" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
    <path d="M16 32H48" stroke="#2A2D7E" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="32" r="7" fill="white" />
    <circle cx="32" cy="32" r="5" fill="#FF6B6B" />
  </svg>
);

export const ScienceBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#7ED6DF" />
    <circle cx="32" cy="32" r="25" fill="#A5E9EF" />
    <path d="M28 20V38C28 41.3137 25.3137 44 22 44V44" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" />
    <path d="M36 20V38C36 41.3137 38.6863 44 42 44V44" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" />
    <rect x="25" y="15" width="14" height="5" rx="2.5" fill="#2A2D7E" />
    <circle cx="28" cy="32" r="3" fill="#FF6B6B" />
    <circle cx="36" cy="26" r="2" fill="#A78BFA" />
    <circle cx="32" cy="36" r="2" fill="#F9A8D4" />
  </svg>
);

export const ReadingBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#F9A8D4" />
    <circle cx="32" cy="32" r="25" fill="#FBC7E3" />
    <rect x="18" y="18" width="28" height="28" rx="4" fill="white" />
    <path d="M22 26H42" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 32H42" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 38H35" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15L22 22" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
    <path d="M49 15L42 22" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
    <path d="M15 49L22 42" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
    <path d="M49 49L42 42" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const HistoryBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#A78BFA" />
    <circle cx="32" cy="32" r="25" fill="#BDA7F5" />
    <circle cx="32" cy="32" r="15" fill="white" />
    <path d="M32 20V32L38 38" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="2" fill="#FF6B6B" />
    <path d="M18 15L25 20" stroke="#6BD475" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 15L39 20" stroke="#6BD475" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 49L25 44" stroke="#6BD475" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 49L39 44" stroke="#6BD475" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ArtBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#6BD475" />
    <circle cx="32" cy="32" r="25" fill="#97E19E" />
    <circle cx="32" cy="32" r="12" fill="white" />
    <path d="M22 12L27 22" stroke="#F9A8D4" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 12L37 22" stroke="#7ED6DF" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 32L22 32" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 32L52 32" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 52L27 42" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
    <path d="M42 52L37 42" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="32" r="3" fill="#2A2D7E" />
  </svg>
);

export const MusicBadge = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#4ECDC4" />
    <circle cx="32" cy="32" r="25" fill="#81E4DE" />
    <path d="M20 42C20 44.2091 22.0147 46 24.5 46C26.9853 46 29 44.2091 29 42C29 39.7909 26.9853 38 24.5 38C22.0147 38 20 39.7909 20 42Z" fill="#2A2D7E" />
    <path d="M29 42V22L42 18V38" stroke="#2A2D7E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 42C33 44.2091 35.0147 46 37.5 46C39.9853 46 42 44.2091 42 42C42 39.7909 39.9853 38 37.5 38C35.0147 38 33 39.7909 33 42Z" fill="#2A2D7E" />
    <path d="M29 26L42 22" stroke="#2A2D7E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BadgeIcons = {
  "math-master": <MathBadge />,
  "science-explorer": <ScienceBadge />,
  "word-wizard": <ReadingBadge />,
  "history-hero": <HistoryBadge />,
  "art-master": <ArtBadge />,
  "music-maestro": <MusicBadge />
};
