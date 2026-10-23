import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "./components/TopBar";
import Dock from "./components/Dock";
import Window from "./components/Window";
import Widgets from "./components/Widgets";
import DesktopIcons from "./components/DesktopIcons";
import BootSequence from "./components/BootSequence";
import IPhoneView from "./components/IPhoneView";

// Apps Content
import AboutMe from "./apps/AboutMe";
import Experience from "./apps/Experience";
import Projects from "./apps/Projects";
import Skills from "./apps/Skills";
import WelcomeTerminal from "./apps/WelcomeTerminal";
import IframeApp from "./apps/IframeApp";
import GithubApp from "./apps/GithubApp";
import LinkedinApp from "./apps/LinkedinApp";
import PhotosApp from "./apps/PhotosApp";

import type { ReactNode } from "react";

interface AppWindow {
  id: string;
  title: string;
  component: ReactNode;
}

const APPS: Record<string, { title: string; component: ReactNode }> = {
  terminal: { title: "Terminal - zsh", component: <WelcomeTerminal /> },
  finder: { title: "About Me - Ishaan Jha", component: <AboutMe /> },
  photos: { title: "Photos", component: <PhotosApp /> },
  notes: { title: "Experience.txt", component: <Experience /> },
  safari: { title: "Projects", component: <Projects /> },
  skills: { title: "Skills & Tech", component: <Skills /> },
  github: { 
    title: "GitHub - 24f3003771", 
    component: <GithubApp /> 
  },
  linkedin: { 
    title: "LinkedIn - Ishaan Jha", 
    component: <LinkedinApp /> 
  },
  dbeos: { title: "DBE-OS", component: <IframeApp url="https://dbeos.in" /> },
  nova: { title: "Nova Unplugged", component: <IframeApp url="https://nova-unplugged.dbeos.in" /> },
  cosmologia: { title: "Cosmologia - 3D Explorer", component: <IframeApp url="/cosmos.html" /> },
  mail: { 
    title: "Mail", 
    component: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 text-white p-6 sm:p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Let's Connect!</h2>
        <p className="text-sm text-gray-300 max-w-sm">
          Have an exciting project, startup initiative, or collaboration in mind? Drop me an email:
        </p>
        <a 
          href="mailto:ishaanjha.in@gmail.com" 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-base font-semibold transition-colors shadow-lg shadow-blue-500/25"
        >
          ishaanjha.in@gmail.com
        </a>
      </div>
    )
  },
};

import { playClick, playBgAudio, initAudioUnlock } from "./utils/audio";

function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openApp = (id: string) => {
    if (!openWindows.find((w) => w.id === id) && APPS[id]) {
      setOpenWindows([...openWindows, { id, ...APPS[id] }]);
    }
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter(wId => wId !== id));
    }
    setActiveWindow(id);
  };

  const closeApp = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
    setMinimizedWindows(minimizedWindows.filter(wId => wId !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeApp = (id: string) => {
    if (!minimizedWindows.includes(id)) {
      setMinimizedWindows([...minimizedWindows, id]);
    }
    if (activeWindow === id) setActiveWindow(null);
  };

  useEffect(() => {
    // Attach global user gesture listener to unlock AudioContext on first click/tap/keypress
    const cleanupUnlock = initAudioUnlock();
    document.addEventListener("click", playClick);

    return () => {
      cleanupUnlock();
      document.removeEventListener("click", playClick);
    };
  }, []);

  // When booted: On desktop open terminal and play audio; on mobile play audio and show iPhone home screen
  useEffect(() => {
    if (hasBooted) {
      playBgAudio();
      if (!isMobile) {
        openApp("terminal");
      }
    }
  }, [hasBooted, isMobile]);

  return (
    <div className="w-screen h-screen overflow-hidden relative select-none">
      <AnimatePresence>
        {!hasBooted && (
          <BootSequence onComplete={() => setHasBooted(true)} />
        )}
      </AnimatePresence>

      {/* ---------------- MOBILE IPHONE VIEW (<768px) ---------------- */}
      {isMobile ? (
        <IPhoneView
          onOpenApp={openApp}
          activeAppId={activeWindow}
          onCloseApp={closeApp}
          appsMap={APPS}
        />
      ) : (
        /* ---------------- DESKTOP MACOS VIEW (>=768px) ---------------- */
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
          }}
        >
          <TopBar />
          
          <div className="relative w-full h-full pt-8 pb-16">
            <DesktopIcons onOpen={openApp} />
            <Widgets />
            <AnimatePresence>
              {openWindows.map((win) => (
                <Window
                  key={win.id}
                  id={win.id}
                  title={win.title}
                  onClose={closeApp}
                  onMinimize={minimizeApp}
                  isActive={activeWindow === win.id}
                  isMinimized={minimizedWindows.includes(win.id)}
                  onClick={() => setActiveWindow(win.id)}
                >
                  {win.component}
                </Window>
              ))}
            </AnimatePresence>
          </div>

          <Dock onOpen={openApp} openWindows={openWindows.map(w => w.id)} />
        </div>
      )}
    </div>
  );
}

export default App;
