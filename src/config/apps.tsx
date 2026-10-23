import type { ReactNode } from "react";

export interface AppConfig {
  id: string;
  name: string;
  icon: ReactNode;
  bgClass: string;
  inDock: boolean; // true = show in dock on desktop/mobile
}

export const APPS_CONFIG: AppConfig[] = [
  { 
    id: "finder", 
    name: "About Me", 
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-sm select-none">
        <defs>
          <linearGradient id="finderLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4eb8ff" />
            <stop offset="100%" stopColor="#086cd5" />
          </linearGradient>
          <linearGradient id="finderRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87d1ff" />
            <stop offset="100%" stopColor="#2589f0" />
          </linearGradient>
        </defs>
        {/* Left Face Half */}
        <path d="M 50 14 C 30 14, 16 26, 16 50 C 16 74, 30 86, 50 86 Z" fill="url(#finderLeftGrad)" />
        {/* Right Face Half */}
        <path d="M 50 14 C 70 14, 84 26, 84 50 C 84 74, 70 86, 50 86 Z" fill="url(#finderRightGrad)" />
        {/* Dividing Nose Line */}
        <path d="M 50 14 L 50 48 Q 50 62 62 62" fill="none" stroke="#003566" strokeWidth="4.5" strokeLinecap="round" />
        {/* Happy Smile Mouth */}
        <path d="M 28 64 Q 50 84 72 64" fill="none" stroke="#003566" strokeWidth="5.5" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="34" cy="42" r="4.5" fill="#003566" />
        <circle cx="66" cy="42" r="4.5" fill="#003566" />
      </svg>
    ),
    bgClass: "bg-white/95 border border-white/40 shadow-md",
    inDock: true
  },
  {
    id: "photos",
    name: "Photos",
    icon: (
      <svg viewBox="0 0 100 100" width="32" height="32" className="drop-shadow-sm select-none">
        <circle cx="50" cy="50" r="14" fill="#FFCC00" />
        <ellipse cx="50" cy="24" rx="9" ry="17" fill="#FF3B30" opacity="0.9" />
        <ellipse cx="68" cy="32" rx="9" ry="17" fill="#FF9500" opacity="0.9" transform="rotate(45 68 32)" />
        <ellipse cx="76" cy="50" rx="9" ry="17" fill="#FFCC00" opacity="0.9" transform="rotate(90 76 50)" />
        <ellipse cx="68" cy="68" rx="9" ry="17" fill="#34C759" opacity="0.9" transform="rotate(135 68 68)" />
        <ellipse cx="50" cy="76" rx="9" ry="17" fill="#007AFF" opacity="0.9" />
        <ellipse cx="32" cy="68" rx="9" ry="17" fill="#5856D6" opacity="0.9" transform="rotate(45 32 68)" />
        <ellipse cx="24" cy="50" rx="9" ry="17" fill="#AF52DE" opacity="0.9" transform="rotate(90 24 50)" />
        <ellipse cx="32" cy="32" rx="9" ry="17" fill="#FF2D55" opacity="0.9" transform="rotate(135 32 32)" />
      </svg>
    ),
    bgClass: "bg-white shadow-md border border-gray-100",
    inDock: true
  },
  { 
    id: "terminal", 
    name: "Terminal", 
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        <rect x="8" y="12" width="84" height="76" rx="16" fill="#1c1c1e" stroke="#3a3a3c" strokeWidth="2.5" />
        {/* Terminal Top Window Bar Line */}
        <line x1="8" y1="26" x2="92" y2="26" stroke="#2c2c2e" strokeWidth="1.5" />
        {/* 3 mini window dots */}
        <circle cx="20" cy="19" r="2.5" fill="#ff5f56" />
        <circle cx="28" cy="19" r="2.5" fill="#ffbd2e" />
        <circle cx="36" cy="19" r="2.5" fill="#27c93f" />
        {/* Prompt >_ */}
        <path d="M 24 44 L 40 56 L 24 68" fill="none" stroke="#34c759" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="48" y1="68" x2="68" y2="68" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
    bgClass: "bg-gradient-to-br from-neutral-900 to-black border border-neutral-700 shadow-lg",
    inDock: true
  },
  { 
    id: "safari", 
    name: "Projects", 
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        <defs>
          <linearGradient id="safariBlueDial" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#007aff" />
            <stop offset="100%" stopColor="#0051d5" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#e5e5ea" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" fill="url(#safariBlueDial)" />
        {/* Compass markings */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line 
            key={deg} 
            x1="50" 
            y1="13" 
            x2="50" 
            y2={deg % 90 === 0 ? "19" : "16"} 
            stroke="#ffffff" 
            strokeWidth={deg % 90 === 0 ? "2.5" : "1.5"} 
            opacity={deg % 90 === 0 ? "0.95" : "0.6"} 
            transform={`rotate(${deg} 50 50)`} 
          />
        ))}
        {/* 3D Magnetic Needle */}
        <polygon points="50,14 43,50 50,47" fill="#ff3b30" />
        <polygon points="50,14 57,50 50,47" fill="#ff6961" />
        <polygon points="50,86 43,50 50,53" fill="#d1d1d6" />
        <polygon points="50,86 57,50 50,53" fill="#ffffff" />
        <circle cx="50" cy="50" r="3" fill="#ffffff" />
      </svg>
    ),
    bgClass: "bg-white shadow-md border border-neutral-100",
    inDock: true
  },
  {
    id: "mail",
    name: "Mail",
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        <defs>
          <linearGradient id="mailBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38a5fe" />
            <stop offset="100%" stopColor="#0066eb" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="84" height="68" rx="16" fill="url(#mailBlueGrad)" />
        {/* White flying postage envelope */}
        <path d="M 16 30 L 50 56 L 84 30" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="30" width="68" height="42" rx="4" fill="none" stroke="#ffffff" strokeWidth="4" />
      </svg>
    ),
    bgClass: "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md",
    inDock: false
  },
  {
    id: "skills",
    name: "Skills",
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        <defs>
          <linearGradient id="xcodeBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e88e5" />
            <stop offset="100%" stopColor="#0d47a1" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="84" height="84" rx="18" fill="url(#xcodeBlue)" />
        {/* Blueprint background grid */}
        <line x1="28" y1="8" x2="28" y2="92" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
        <line x1="72" y1="8" x2="72" y2="92" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
        <line x1="8" y1="32" x2="92" y2="32" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
        <line x1="8" y1="68" x2="92" y2="68" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
        {/* Steel Hammer & Tool */}
        <path d="M 30 74 L 66 38" stroke="#cfd8dc" strokeWidth="8" strokeLinecap="round" />
        <path d="M 58 30 L 76 48 L 84 40 L 66 22 Z" fill="#eceff1" stroke="#b0bec5" strokeWidth="1.5" />
      </svg>
    ),
    bgClass: "bg-blue-600 shadow-md",
    inDock: false
  },
  { 
    id: "notes", 
    name: "Experience", 
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        {/* Notepad Paper */}
        <rect x="12" y="10" width="76" height="80" rx="14" fill="#fffefc" stroke="#e5e5ea" strokeWidth="1.5" />
        {/* Yellow Header Band */}
        <path d="M 12 10 L 88 10 L 88 28 L 12 28 Z" fill="#ffcc00" />
        <line x1="12" y1="28" x2="88" y2="28" stroke="#e0b000" strokeWidth="1.5" />
        {/* Ruled Notebook Lines */}
        <line x1="22" y1="42" x2="78" y2="42" stroke="#d1d1d6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="54" x2="78" y2="54" stroke="#d1d1d6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="66" x2="78" y2="66" stroke="#d1d1d6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="78" x2="56" y2="78" stroke="#d1d1d6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    bgClass: "bg-white shadow-md border border-neutral-200",
    inDock: false
  },
  {
    id: "github",
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="white" className="select-none">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    bgClass: "bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 shadow-md",
    inDock: false
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="white" className="select-none">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bgClass: "bg-[#0a66c2] shadow-md",
    inDock: false
  },
  {
    id: "dbeos",
    name: "DBE-OS",
    icon: (
      <img 
        src="/dbeos-logo.png" 
        alt="DBE-OS" 
        className="w-full h-full object-contain p-1 rounded-[1.1rem] select-none" 
      />
    ),
    bgClass: "bg-white p-0.5 shadow-md border border-neutral-100",
    inDock: false
  },
  {
    id: "nova",
    name: "Nova Unplugged",
    icon: (
      <img 
        src="/nova-logo.png" 
        alt="Nova Unplugged" 
        className="w-full h-full object-contain p-1.5 rounded-[1.1rem] select-none" 
      />
    ),
    bgClass: "bg-[#0c0d10] p-0.5 shadow-md border border-amber-500/30",
    inDock: false
  },
  {
    id: "cosmologia",
    name: "Cosmologia",
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" className="drop-shadow-md select-none">
        <defs>
          <radialGradient id="saturnGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="45%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
        </defs>
        {/* Planet sphere */}
        <circle cx="50" cy="50" r="28" fill="url(#saturnGlow)" />
        {/* Back of ring */}
        <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#a5f3fc" strokeWidth="4" opacity="0.85" transform="rotate(-25 50 50)" />
        {/* Front highlight of ring */}
        <path d="M 12 62 A 42 14 0 0 0 88 38" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" transform="rotate(-25 50 50)" />
      </svg>
    ),
    bgClass: "bg-gradient-to-br from-indigo-950 via-slate-900 to-black border border-cyan-500/30 shadow-md",
    inDock: false
  },
  {
    id: "setu",
    name: "Setu School",
    icon: (
      <img 
        src="/setu-icon.png" 
        alt="Setu Startup School" 
        className="w-full h-full object-contain p-1 rounded-[1.1rem] select-none" 
      />
    ),
    bgClass: "bg-[#0B1120] p-0.5 shadow-md border border-purple-500/30",
    inDock: false
  }
];
