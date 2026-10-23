import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  ChevronLeft, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Sun, 
  Sparkles,
  MapPin,
  Radio
} from "lucide-react";
import { APPS_CONFIG } from "../config/apps";
import { playClick, playBgAudio, pauseBgAudio, bgAudio, setBgAudioVolume } from "../utils/audio";
import ishaanPhoto from "../assets/ishaan.jpg";
import type { ReactNode } from "react";

interface IPhoneViewProps {
  onOpenApp: (id: string) => void;
  activeAppId: string | null;
  onCloseApp: (id: string) => void;
  appsMap: Record<string, { title: string; component: ReactNode }>;
}

export default function IPhoneView({
  onOpenApp,
  activeAppId,
  onCloseApp,
  appsMap
}: IPhoneViewProps) {
  const [timeStr, setTimeStr] = useState("9:41");
  const [dateStr, setDateStr] = useState("");
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [brightness, setBrightness] = useState(90);

  // Audio Sync
  useEffect(() => {
    if (!bgAudio) return;
    const audio = bgAudio;
    const updatePlayState = () => setIsPlaying(!audio.paused);
    const updateVol = () => setVolume(Math.round(audio.volume * 100));

    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("volumechange", updateVol);

    setIsPlaying(!audio.paused);
    setVolume(Math.round(audio.volume * 100));

    return () => {
      audio.removeEventListener("play", updatePlayState);
      audio.removeEventListener("pause", updatePlayState);
      audio.removeEventListener("volumechange", updateVol);
    };
  }, []);

  const toggleMusic = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClick();
    if (!bgAudio) return;
    if (bgAudio.paused) {
      playBgAudio();
    } else {
      pauseBgAudio();
    }
  };

  // Clock Update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }).replace(/\s*(AM|PM)/i, "")
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter dock apps and grid apps
  const dockApps = APPS_CONFIG.slice(0, 4); // 4 apps in dock: About, Photos, Terminal, Safari
  const homeGridApps = APPS_CONFIG; // All apps displayed cleanly on iOS home grid

  const handleAppClick = (id: string) => {
    playClick();
    onOpenApp(id);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#000] text-white flex flex-col justify-between select-none">
      {/* Background iOS Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: "radial-gradient(ellipse at top, #1e1b4b 0%, #09090b 70%, #000000 100%)",
        }}
      >
        {/* Subtle Apple Glow Accents */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ----------------- IPHONE STATUS BAR (TOP) ----------------- */}
      <div className="relative z-50 w-full h-12 pt-2 px-6 flex items-center justify-between text-xs font-semibold shrink-0">
        {/* Left: Time */}
        <div className="w-16 flex items-center">
          <span className="text-[15px] font-bold tracking-tight">{timeStr}</span>
        </div>

        {/* Center: Dynamic Island */}
        <div className="flex justify-center">
          <motion.div
            layout
            onClick={() => setIsDynamicIslandExpanded(!isDynamicIslandExpanded)}
            animate={{
              width: isDynamicIslandExpanded ? 240 : 120,
              height: isDynamicIslandExpanded ? 58 : 28,
              borderRadius: isDynamicIslandExpanded ? 26 : 20
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-black border border-neutral-800 shadow-2xl flex items-center justify-between px-3 cursor-pointer z-50 overflow-hidden"
          >
            {!isDynamicIslandExpanded ? (
              <>
                {/* Selfie Camera Cutout & Sensor */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] ring-1 ring-[#2c2c2e] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                  </div>
                  {isPlaying && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-green-500" 
                    />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-full bg-green-400 animate-pulse" />
                      <span className="w-0.5 h-2 bg-green-400 animate-pulse" />
                      <span className="w-0.5 h-3 bg-green-400 animate-pulse" />
                    </div>
                  ) : (
                    <span className="text-[11px] font-medium text-white/70">Ishaan Jha</span>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <img src={ishaanPhoto} alt="Ishaan" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-white">Ishaan Jha</span>
                    <span className="text-[10px] text-cyan-300">IIM-B · IIT-M</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleMusic}
                    className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsDynamicIslandExpanded(false); }}
                    className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: Cellular, 5G, Wifi, Battery */}
        <div 
          className="w-16 flex items-center justify-end gap-1.5 cursor-pointer"
          onClick={() => setShowControlCenter(!showControlCenter)}
        >
          {/* Signal Bars */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-white rounded-sm" />
            <div className="w-0.5 h-1.5 bg-white rounded-sm" />
            <div className="w-0.5 h-2.5 bg-white rounded-sm" />
            <div className="w-0.5 h-3 bg-white rounded-sm" />
          </div>
          <span className="text-[10px] font-bold">5G</span>
          <Wifi size={13} className="text-white" />
          {/* Battery Pill */}
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
              <div className="h-full w-full bg-green-500 rounded-[1px]" />
            </div>
            <div className="w-0.5 h-1 bg-white/80 rounded-r-xs" />
          </div>
        </div>
      </div>

      {/* ----------------- IPHONE HOME SCREEN CONTENT ----------------- */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-2 pb-2 custom-scrollbar flex flex-col justify-between">
        
        {/* Top iOS Smart Widget */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-4 shadow-2xl mb-4 flex items-center justify-between cursor-pointer group"
          onClick={() => handleAppClick("finder")}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md ring-2 ring-blue-500/30 shrink-0">
              <img src={ishaanPhoto} alt="Ishaan Jha" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">Ishaan Jha</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              </div>
              <span className="text-xs text-blue-300 font-medium">Founder Office @ Ecofone</span>
              <span className="text-[11px] text-white/60 mt-0.5">IIM-B ('28) · IIT-M ('28) · Setu</span>
            </div>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Sparkles size={11} /> Active
            </span>
            <span className="text-[10px] text-white/50 flex items-center gap-0.5 mt-1">
              <MapPin size={10} /> Bengaluru
            </span>
            <span className="text-[10px] text-white/40 mt-0.5">{dateStr}</span>
          </div>
        </motion.div>

        {/* iOS 4-Column App Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 content-start flex-1 py-1">
          {homeGridApps.map((app) => (
            <motion.div
              key={app.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => handleAppClick(app.id)}
              className="flex flex-col items-center justify-center cursor-pointer group select-none"
            >
              {/* iOS Squircle App Icon */}
              <div 
                className={`w-[3.6rem] h-[3.6rem] rounded-[1.3rem] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 relative overflow-hidden ${app.bgClass}`}
              >
                {/* Subtle top gloss shine */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                <div className="relative z-10">{app.icon}</div>
              </div>

              {/* iOS App Label */}
              <span className="text-white text-[11px] font-medium text-center mt-1.5 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-[4rem]">
                {app.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Page Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
      </div>

      {/* ----------------- IPHONE FROSTED DOCK (BOTTOM) ----------------- */}
      <div className="relative z-20 px-4 pb-2">
        <div className="bg-white/15 backdrop-blur-3xl border border-white/25 rounded-[2.3rem] p-3 shadow-2xl flex items-center justify-around">
          {dockApps.map((app) => (
            <motion.div
              key={`dock-${app.id}`}
              whileTap={{ scale: 0.86 }}
              onClick={() => handleAppClick(app.id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-[1.3rem] flex items-center justify-center shadow-md relative overflow-hidden ${app.bgClass}`}>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                <div className="relative z-10">{app.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* iPhone Home Indicator Capsule Bar */}
        <div className="w-36 h-1 bg-white/70 rounded-full mx-auto mt-3 mb-1" />
      </div>

      {/* ----------------- IPHONE FULL-SCREEN APP MODAL ----------------- */}
      <AnimatePresence>
        {activeAppId && appsMap[activeAppId] && (
          <motion.div
            key={activeAppId}
            initial={{ opacity: 0, y: "100%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-[100] bg-[#0c0c0e] flex flex-col overflow-hidden"
          >
            {/* Top iOS App Navigation Bar */}
            <div className="h-14 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-3 flex items-center justify-between shrink-0 select-none">
              <button
                onClick={() => {
                  playClick();
                  onCloseApp(activeAppId);
                }}
                className="flex items-center gap-1 text-blue-400 font-semibold text-sm active:opacity-60 transition-opacity"
              >
                <ChevronLeft size={20} />
                <span>Home</span>
              </button>

              <div className="text-center font-bold text-sm text-white truncate max-w-[200px]">
                {appsMap[activeAppId].title}
              </div>

              <button
                onClick={() => {
                  playClick();
                  onCloseApp(activeAppId);
                }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* App Body Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/50">
              {appsMap[activeAppId].component}
            </div>

            {/* Bottom iOS Home Indicator (tap to close app) */}
            <div 
              onClick={() => {
                playClick();
                onCloseApp(activeAppId);
              }}
              className="h-7 w-full flex items-center justify-center cursor-pointer bg-black shrink-0 active:bg-white/5"
            >
              <div className="w-36 h-1 bg-white/70 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- IPHONE CONTROL CENTER OVERLAY ----------------- */}
      <AnimatePresence>
        {showControlCenter && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-3xl p-5 flex flex-col justify-between"
          >
            {/* Top Bar with Close */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-base text-white">Control Center</span>
              <button 
                onClick={() => setShowControlCenter(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Toggles */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Connectivity Box */}
              <div className="bg-white/10 rounded-3xl p-4 flex flex-col gap-3 border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Wifi size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Wi-Fi</div>
                    <div className="text-[10px] text-white/60">ishaanjha-5G</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Radio size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold">5G Network</div>
                    <div className="text-[10px] text-white/60">Connected</div>
                  </div>
                </div>
              </div>

              {/* Music Player Box */}
              <div className="bg-white/10 rounded-3xl p-4 flex flex-col justify-between border border-white/15">
                <div>
                  <span className="text-[11px] font-semibold text-white/60 uppercase">Now Playing</span>
                  <div className="text-xs font-bold text-white mt-1 truncate">Ambient OS Flow</div>
                  <div className="text-[10px] text-blue-300">Ishaan Jha Portfolio</div>
                </div>
                <div className="flex items-center justify-center pt-2">
                  <button 
                    onClick={toggleMusic}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Volume & Brightness Vertical Sliders */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-3xl p-4 flex flex-col gap-3 border border-white/15">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><Sun size={15} /> Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-white/10 rounded-3xl p-4 flex flex-col gap-3 border border-white/15">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><Volume2 size={15} /> Volume</span>
                  <span>{volume}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    setBgAudioVolume(val / 100);
                  }}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Close swipe bar at bottom */}
            <div 
              onClick={() => setShowControlCenter(false)}
              className="w-36 h-1 bg-white/60 rounded-full mx-auto cursor-pointer" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
