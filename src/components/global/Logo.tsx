interface LogoProps {
  className?: string;
  goldColor?: string;
}

export function Logo({ className, goldColor = "#B98A5E" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 210 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Spring Village"
    >
      {/* Ground line */}
      <line x1="1" y1="112" x2="209" y2="112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pine tree — stepped silhouette */}
      {/* Trunk */}
      <path d="M36 98 L36 112 L46 112 L46 98" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      {/* Bottom tier */}
      <path d="M14 98 L41 62 L68 98 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Middle tier */}
      <path d="M21 78 L41 46 L61 78 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Top tier */}
      <path d="M30 60 L41 38 L52 60 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />

      {/* Deciduous / cloud tree — gold */}
      {/* Trunk */}
      <line x1="103" y1="100" x2="103" y2="112" stroke={goldColor} strokeWidth="2.2" strokeLinecap="round" />
      {/* Rounded cloud top */}
      <path
        d="M89 90 C87 82 90 73 98 71 C99 64 107 61 113 65 C120 60 128 67 126 76 C131 80 130 90 124 93 C120 98 110 100 103 98 C96 100 87 97 89 90 Z"
        stroke={goldColor}
        strokeWidth="2.2"
        fill="none"
      />

      {/* A-frame — triangle + crossing ridge poles */}
      {/* Main triangle */}
      <path d="M138 112 L174 32 L210 112" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      {/* Ridge poles crossing */}
      <line x1="152" y1="48" x2="209" y2="92" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="196" y1="48" x2="139" y2="92" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
