import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "./components/TopBar";
import Dock from "./components/Dock";
import Window from "./components/Window";
import Widgets from "./components/Widgets";
import DesktopIcons from "./components/DesktopIcons";
import BootSequence from "./components/BootSequence";

// Apps Content
import AboutMe from "./apps/AboutMe";
import Experience from "./apps/Experience";
import Projects from "./apps/Projects";
import Skills from "./apps/Skills";
import WelcomeTerminal from "./apps/WelcomeTerminal";
import IframeApp from "./apps/IframeApp";
import GithubApp from "./apps/GithubApp";
import LinkedinApp from "./apps/LinkedinApp";

import type { ReactNode } from "react";

interface AppWindow {
  id: string;
  title: string;
  component: ReactNode;
}

const APPS: Record<string, { title: string; component: ReactNode }> = {
  terminal: { title: "Terminal - zsh", component: <WelcomeTerminal /> },
  finder: { title: "About Me - Ishaan Jha", component: <AboutMe /> },
  notes: { title: "Experience.txt", component: <Experience /> },
  safari: { title: "Projects", component: <Projects /> },
  skills: { title: "Skills & Tech", component: <Skills /> },
  github: { 
    title: "GitHub - ishaanjha", 
    component: <GithubApp /> 
  },
  linkedin: { 
    title: "LinkedIn - Ishaan Jha", 
    component: <LinkedinApp /> 
  },
  dbeos: { title: "DBE-OS", component: <IframeApp url="https://dbeos.in" /> },
  nova: { title: "Nova Unplugged", component: <IframeApp url="https://nova-unplugged.dbeos.in" /> },
  cosmologia: { title: "Cosmologia - 3D Explorer", component: <IframeApp url="/cosmos.html" fallbackText="3D WebGL context initializing..." /> },
  mail: { 
    title: "Mail", 
    component: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/50 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
        <p className="text-gray-300 mb-6">Drop me an email at:</p>
        <a href="mailto:ishaanjha.in@gmail.com" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-medium transition-colors">
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

  const openApp = (id: string) => {
    if (!openWindows.find((w) => w.id === id)) {
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

  // Auto open Welcome Terminal and start ambient music when user arrives on landing page
  useEffect(() => {
    if (hasBooted) {
      openApp("terminal");
      playBgAudio();
    }
  }, [hasBooted]);

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
      }}
    >
      <AnimatePresence>
        {!hasBooted && (
          <BootSequence onComplete={() => setHasBooted(true)} />
        )}
      </AnimatePresence>

      <TopBar />
      
      <div className="relative w-full h-full pt-7 pb-16">
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
  );
}

export default App;
