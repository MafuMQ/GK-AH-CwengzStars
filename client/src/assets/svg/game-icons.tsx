import { SVGProps } from "react";


export const NumberBlastIcon = ({
  size = 500,
  ...props
}: { size?: number } & React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://www.shecodes.io/assets/separators/separator--left-rounded-acdcd3213ef448e4dbfde458ffee57070c35d04435b2c6bceeb04a450df1fa53.png" // <- Replace this with your image path or URL
    width={size}
    height={size}
    alt="Number Blast Icon"
    {...props}
  />
);


export const CodeWizardsIcon = ({
  size = 128,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    width={size}
    height={size}
    {...props}
  >
    {/* Monitor frame */}
    <rect
      x="15"
      y="20"
      width="60"
      height="40"
      rx="4"
      fill="#1A1A2E"
      stroke="#0F3460"
      strokeWidth="3"
    />

    {/* Screen content - code lines */}
    <rect x="25" y="30" width="40" height="6" rx="1" fill="#00FFAB" />
    <rect x="25" y="40" width="30" height="6" rx="1" fill="#008F7A" />
    <rect x="25" y="50" width="45" height="6" rx="1" fill="#00FFAB" />

    {/* Curly braces on sides */}
    <path
      d="M18 30 L22 35 L18 40 L22 45 L18 50"
      stroke="#00FFAB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M72 30 L68 35 L72 40 L68 45 L72 50"
      stroke="#00FFAB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Circuit lines below monitor */}
    <line
      x1="30"
      y1="65"
      x2="60"
      y2="65"
      stroke="#008F7A"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="30" cy="65" r="3" fill="#00FFAB" />
    <circle cx="60" cy="65" r="3" fill="#00FFAB" />

    {/* Binary code digits floating */}
    <text
      x="20"
      y="15"
      fontFamily="'Courier New', monospace"
      fontWeight="bold"
      fontSize="14"
      fill="#00FFAB"
    >
      1010
    </text>
    <text
      x="55"
      y="15"
      fontFamily="'Courier New', monospace"
      fontWeight="bold"
      fontSize="14"
      fill="#008F7A"
    >
      0110
    </text>
  </svg>
);

export const WordHeroesIcon = ({
  size = 128,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    {...props}
  >
    {/* Hero emblem shape */}
    <path
      d="M32 12L50 32L32 52L14 32Z"
      fill="#F9A8D4"
      stroke="#2A2D7E"
      strokeWidth="2"
    />

    {/* Bold "WORD" text */}
    <text
      x="32"
      y="36"
      textAnchor="middle"
      fontFamily="'Bangers', cursive"
      fontWeight="bold"
      fontSize="20"
      fill="#2A2D7E"
    >
      WORD
    </text>

    {/* Heroic underline */}
    <path
      d="M20 40L44 40"
      stroke="#EF476F"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Shining effects */}
    <path
      d="M32 12L32 6"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M50 32L56 32"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M32 52L32 58"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M14 32L8 32"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Subtle wings */}
    <path
      d="M12 20L6 12"
      stroke="#4285F4"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M52 20L58 12"
      stroke="#4285F4"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const HappyPaintingIcon = ({
  size = 128,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    {...props}
  >
  
    <rect x="12" y="8" width="40" height="8" rx="4" fill="#795548" />{" "}
   
    <path d="M52 12L64 20L52 28Z" fill="#FFD700" /> 
    <rect x="50" y="12" width="4" height="8" fill="#FF9800" />{" "}
 
    <path d="M20 40Q24 30 32 36Q40 30 44 40Z" fill="#EF476F" />{" "}

    <circle cx="28" cy="44" r="6" fill="#4285F4" /> 
    <path
      d="M36 48Q40 38 48 44"
      stroke="#34A853"
      strokeWidth="8"
      strokeLinecap="round"
    />{" "}

    <circle
      cx="24"
      cy="24"
      r="16"
      fill="#FFD166"
      stroke="#2A2D7E"
      strokeWidth="2"
    />
    <circle cx="18" cy="18" r="4" fill="#EF476F" />
    <circle cx="24" cy="14" r="4" fill="#4285F4" />
    <circle cx="30" cy="18" r="4" fill="#34A853" />

    <path
      d="M16 48L20 64"
      stroke="#9C27B0"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M32 52L30 64"
      stroke="#FF9800"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const GameIcons = {
  academics: NumberBlastIcon,
  technology: CodeWizardsIcon,
  communication: WordHeroesIcon,
  creativity: HappyPaintingIcon,
};
