import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  ChevronLeft, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Sun, 
  Sparkles, 
  MapPin, 
  Radio, 
  Flashlight, 
  Camera, 
  Lock, 
  Award, 
  PhoneCall,
  Plus,
  Power,
  Plane,
  Cast,
  Bluetooth,
  Signal,
  SkipBack,
  SkipForward,
  Heart,
  Bell,
  BellOff,
  Battery,
  Calendar,
  AlarmClock,
  Disc3,
  FileText,
  Languages,
  Watch
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
  const [fullDateStr, setFullDateStr] = useState("");
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 = Screen 1, 1 = Screen 2
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [brightness, setBrightness] = useState(82);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [airdropOn, setAirdropOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [cellularOn, setCellularOn] = useState(false);
  const [silentMode, setSilentMode] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [showPowerOffModal, setShowPowerOffModal] = useState(false);
  const [controlToast, setControlToast] = useState<string | null>(null);
  const [shazamActive, setShazamActive] = useState(false);

  const showToast = (msg: string) => {
    setControlToast(msg);
    setTimeout(() => {
      setControlToast((curr) => (curr === msg ? null : curr));
    }, 2000);
  };

  const handleSliderInteraction = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    type: "brightness" | "volume"
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const offsetY = clientY - rect.top;
    const rawPct = Math.round(100 - (offsetY / rect.height) * 100);
    const clamped = Math.max(0, Math.min(100, rawPct));

    if (type === "brightness") {
      setBrightness(Math.max(10, clamped));
    } else {
      setVolume(clamped);
      setBgAudioVolume(clamped / 100);
      setSilentMode(clamped === 0);
    }
  };

  // Touch gesture tracking for status bar pulldown
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);

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
      setFullDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Bottom dock apps (4 essential iOS dock icons)
  const dockApps = APPS_CONFIG.slice(0, 4); // About Me, Photos, Terminal, Projects

  // Page 1 apps (First 8 apps)
  const page1Apps = APPS_CONFIG.slice(0, 8);
  // Page 2 apps (Remaining apps)
  const page2Apps = APPS_CONFIG.slice(8);

  const handleAppClick = (id: string) => {
    playClick();
    onOpenApp(id);
  };

  // Touch handlers for pulldown gestures from top bar
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const startX = touchStartX.current;
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 390;

    // Pull down gesture detected from top
    if (deltaY > 40 && touchStartY.current < 80) {
      playClick();
      if (startX > screenWidth / 2) {
        // Pulled from right -> Control Center
        setShowControlCenter(true);
        setShowNotificationCenter(false);
      } else {
        // Pulled from left / center -> Notification Center
        setShowNotificationCenter(true);
        setShowControlCenter(false);
      }
    }
  };

  // Notification items
  const notifications = [
    {
      id: "notif-1",
      app: "LinkedIn",
      icon: "💼",
      color: "bg-[#0a66c2]",
      time: "10m ago",
      title: "VC & Founder Network",
      desc: "3 founders & investors from IIM Bangalore and IIT Madras network viewed your profile."
    },
    {
      id: "notif-2",
      app: "Ecofone",
      icon: "🏢",
      color: "bg-emerald-600",
      time: "1h ago",
      title: "Team Standup & AWS Credits",
      desc: "30-member departmental sync ready. AWS cost reductions tracked at ~₹3,000/mo."
    },
    {
      id: "notif-3",
      app: "DBE-OS",
      icon: "🌐",
      color: "bg-purple-600",
      time: "3h ago",
      title: "Cohort Platform Active",
      desc: "3,000+ IIM-B students active. Internship Hunter live with 500+ scraped live opportunities."
    },
    {
      id: "notif-4",
      app: "Nova Unplugged",
      icon: "⚡",
      color: "bg-orange-500",
      time: "5h ago",
      title: "QR Gate Entry Milestone",
      desc: "500+ attendees checked in with 0ms downtime on zero-cost infrastructure."
    },
    {
      id: "notif-5",
      app: "IIT Madras Saavan",
      icon: "🏆",
      color: "bg-amber-500",
      time: "Yesterday",
      title: "Money Matrix Case Competition",
      desc: "1st Place Winner in Financial Simulation & Analytical Strategy."
    }
  ];

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#000] text-white flex flex-col justify-between select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
        {/* Left: Time (Tap or swipe down -> Notification Center) */}
        <div 
          className="w-16 flex items-center cursor-pointer group active:opacity-60 transition-opacity"
          onClick={() => {
            playClick();
            setShowNotificationCenter(true);
          }}
          title="Swipe or Tap for Notifications"
        >
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

        {/* Right: Cellular, 5G, Wifi, Battery (Tap or swipe down -> Control Center) */}
        <div 
          className="w-16 flex items-center justify-end gap-1.5 cursor-pointer active:opacity-60 transition-opacity"
          onClick={() => {
            playClick();
            setShowControlCenter(true);
          }}
          title="Swipe or Tap for Control Center"
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

      {/* ----------------- MULTI-PAGE SWIPEABLE HOME SCREEN ----------------- */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col justify-between">
        
        {/* Swipe Container (Screen 1 <-> Screen 2) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = offset.x;
            const vel = velocity.x;
            if ((swipe < -40 || vel < -300) && currentPage === 0) {
              playClick();
              setCurrentPage(1);
            } else if ((swipe > 40 || vel > 300) && currentPage === 1) {
              playClick();
              setCurrentPage(0);
            }
          }}
          animate={{ x: currentPage === 0 ? "0%" : "-50%" }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
          className="flex w-[200%] h-full flex-1 touch-pan-y"
        >
          {/* ===================== PAGE 1 ===================== */}
          <div className="w-1/2 h-full px-4 pt-2 pb-2 flex flex-col justify-between">
            {/* Top iOS Smart Widget (Profile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-4 shadow-2xl mb-4 flex items-center justify-between cursor-pointer group active:scale-[0.98] transition-transform"
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

            {/* Page 1: 4x2 App Grid */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 content-start flex-1 py-1">
              {page1Apps.map((app) => (
                <motion.div
                  key={`p1-${app.id}`}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center justify-center cursor-pointer group select-none"
                >
                  <div 
                    className={`w-[3.6rem] h-[3.6rem] rounded-[1.3rem] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 relative overflow-hidden ${app.bgClass}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    <div className="relative z-10">{app.icon}</div>
                  </div>

                  <span className="text-white text-[11px] font-medium text-center mt-1.5 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-[4.2rem]">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ===================== PAGE 2 ===================== */}
          <div className="w-1/2 h-full px-4 pt-2 pb-2 flex flex-col justify-between">
            {/* Top iOS Smart Widget (Leadership & Education) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-gradient-to-r from-blue-950/80 via-purple-950/70 to-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-4 shadow-2xl mb-4 flex items-center justify-between cursor-pointer group active:scale-[0.98] transition-transform"
              onClick={() => handleAppClick("notes")}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Award size={24} />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Achievements</span>
                  </div>
                  <span className="text-xs text-amber-300 font-semibold">Winner — Big Bull (IIM-B)</span>
                  <span className="text-[11px] text-white/70 mt-0.5">Winner — Money Matrix (IIT-M)</span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] text-cyan-300 font-mono bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                  30-Member Lead
                </span>
                <span className="text-[10px] text-white/50 mt-1.5">Ecofone On-site</span>
              </div>
            </motion.div>

            {/* Page 2: App Grid */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 content-start flex-1 py-1">
              {page2Apps.map((app) => (
                <motion.div
                  key={`p2-${app.id}`}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center justify-center cursor-pointer group select-none"
                >
                  <div 
                    className={`w-[3.6rem] h-[3.6rem] rounded-[1.3rem] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 relative overflow-hidden ${app.bgClass}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    <div className="relative z-10">{app.icon}</div>
                  </div>

                  <span className="text-white text-[11px] font-medium text-center mt-1.5 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-[4.2rem]">
                    {app.name}
                  </span>
                </motion.div>
              ))}

              {/* Quick Call / WhatsApp Shortcut App */}
              <motion.a
                href="tel:+918299147213"
                whileTap={{ scale: 0.88 }}
                onClick={() => playClick()}
                className="flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <div className="w-[3.6rem] h-[3.6rem] rounded-[1.3rem] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  <PhoneCall size={26} className="text-white relative z-10" />
                </div>
                <span className="text-white text-[11px] font-medium text-center mt-1.5 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Call Ishaan
                </span>
              </motion.a>

              {/* Quick Control Center Shortcut */}
              <motion.div
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  playClick();
                  setShowControlCenter(true);
                }}
                className="flex flex-col items-center justify-center cursor-pointer group select-none"
              >
                <div className="w-[3.6rem] h-[3.6rem] rounded-[1.3rem] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 relative overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border border-white/20">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  <Radio size={26} className="text-white relative z-10" />
                </div>
                <span className="text-white text-[11px] font-medium text-center mt-1.5 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Controls
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Page Dots Indicator (Interactive Tap or Swipe) */}
        <div className="flex items-center justify-center py-2 shrink-0">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer">
            <button 
              onClick={() => {
                playClick();
                setCurrentPage(0);
              }}
              className={`transition-all duration-300 ${currentPage === 0 ? "w-4 h-1.5 bg-white rounded-full shadow-sm" : "w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/70"}`}
              title="Screen 1"
            />
            <button 
              onClick={() => {
                playClick();
                setCurrentPage(1);
              }}
              className={`transition-all duration-300 ${currentPage === 1 ? "w-4 h-1.5 bg-white rounded-full shadow-sm" : "w-1.5 h-1.5 bg-white/40 rounded-full hover:bg-white/70"}`}
              title="Screen 2"
            />
          </div>
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

      {/* ----------------- IPHONE NOTIFICATION CENTER OVERLAY ----------------- */}
      <AnimatePresence>
        {showNotificationCenter && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-[115] bg-black/80 backdrop-blur-3xl px-5 pt-7 pb-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Lock Header */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold mb-3">
                <Lock size={13} />
                <span>Notification Center</span>
              </div>
              <h2 className="text-6xl font-light tracking-tight text-white">{timeStr}</h2>
              <p className="text-sm text-white/80 font-medium mt-1">{fullDateStr}</p>
            </div>

            {/* Notification Cards List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/60 px-1">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Recent Notifications</span>
                <span className="text-[11px] text-blue-400 cursor-pointer">Clear</span>
              </div>

              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 border border-white/15 rounded-2xl p-3.5 backdrop-blur-xl shadow-lg flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="text-sm">{notif.icon}</span>
                      <span>{notif.app}</span>
                    </div>
                    <span className="text-[10px] text-white/50">{notif.time}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{notif.title}</h4>
                    <p className="text-xs text-white/80 leading-relaxed mt-0.5">{notif.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Quick Tools (Flashlight & Camera) */}
            <div className="flex items-center justify-between px-3 pt-2">
              <button
                onClick={() => {
                  playClick();
                  setFlashlightOn(!flashlightOn);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${flashlightOn ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)]" : "bg-white/15 text-white hover:bg-white/25"}`}
                title="Flashlight"
              >
                <Flashlight size={20} />
              </button>

              {/* Close notification center bar */}
              <div 
                onClick={() => {
                  playClick();
                  setShowNotificationCenter(false);
                }}
                className="w-36 h-1 bg-white/70 rounded-full cursor-pointer hover:bg-white"
                title="Swipe up to dismiss"
              />

              <button
                onClick={() => {
                  playClick();
                  setShowNotificationCenter(false);
                  onOpenApp("photos");
                }}
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                title="Open Photos"
              >
                <Camera size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- AUTHENTIC IOS 18 CONTROL CENTER OVERLAY ----------------- */}
      <AnimatePresence>
        {showControlCenter && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-3xl px-4 pt-3 pb-6 flex flex-col justify-between overflow-y-auto custom-scrollbar select-none"
          >
            {/* Top Interactive Feedback Toast */}
            <AnimatePresence>
              {controlToast && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  className="fixed top-3 inset-x-0 mx-auto w-max max-w-[85%] bg-white/20 backdrop-blur-2xl border border-white/30 text-white text-xs px-4 py-1.5 rounded-full shadow-2xl z-[135] pointer-events-none font-semibold flex items-center gap-1.5"
                >
                  <Sparkles size={13} className="text-amber-300" />
                  <span>{controlToast}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-[390px] mx-auto flex flex-col gap-3 relative">
              {/* 1. TOP HEADER (+ on left, Power on right) */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => {
                    playClick();
                    showToast("Customize Controls");
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                  title="Customize Controls"
                >
                  <Plus size={22} />
                </button>

                <button
                  onClick={() => {
                    playClick();
                    setShowPowerOffModal(true);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                  title="Power Off / Lock"
                >
                  <Power size={20} />
                </button>
              </div>

              {/* 2. SECONDARY STATUS LINE (WiFi Calling ..l & 77% battery) */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 px-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-0.5 h-3">
                    <div className="w-0.5 h-1 bg-white rounded-xs" />
                    <div className="w-0.5 h-1.5 bg-white rounded-xs" />
                    <div className="w-0.5 h-2.5 bg-white rounded-xs" />
                    <div className="w-0.5 h-3 bg-white rounded-xs" />
                  </div>
                  <span>WiFi Calling</span>
                  <Wifi size={12} className="text-white" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span>77%</span>
                  <div className="w-5 h-2.5 rounded-sm border border-white/90 p-0.5 flex items-center">
                    <div className="h-full w-3/4 bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              {/* 3. MEDIA / NOW PLAYING CARD (Top Wide 4-col widget) */}
              <div className="w-full bg-[#1c1c1e] rounded-[1.8rem] p-3 border border-white/5 flex items-center gap-3 shadow-xl">
                {/* Album artwork square */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#2c2c2e] shrink-0 border border-white/10 flex items-center justify-center relative shadow-inner">
                  <img src={ishaanPhoto} alt="Ishaan" className="w-full h-full object-cover" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 h-full bg-green-400 animate-pulse" />
                        <span className="w-1 h-2 bg-green-400 animate-pulse" />
                        <span className="w-1 h-3 bg-green-400 animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info & Media Controls */}
                <div className="flex-1 flex flex-col justify-between h-20 py-0.5">
                  {/* Title & AirPlay */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/90 truncate max-w-[150px]">
                      {isPlaying ? "Ambient OS Flow" : "Not Playing"}
                    </span>
                    <button
                      onClick={() => {
                        playClick();
                        showToast("AirPlay: Connected to Portfolio");
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                      title="AirPlay"
                    >
                      <Cast size={13} />
                    </button>
                  </div>

                  {/* Playback buttons */}
                  <div className="flex items-center justify-center gap-7 text-white">
                    <button
                      onClick={() => {
                        playClick();
                        showToast("Previous Track");
                      }}
                      className="text-white/70 hover:text-white active:scale-90 transition-transform"
                    >
                      <SkipBack size={18} fill="currentColor" />
                    </button>

                    <button
                      onClick={toggleMusic}
                      className="text-white active:scale-90 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause size={22} fill="currentColor" />
                      ) : (
                        <Play size={22} fill="currentColor" className="ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        playClick();
                        showToast("Next Track");
                      }}
                      className="text-white/70 hover:text-white active:scale-90 transition-transform"
                    >
                      <SkipForward size={18} fill="currentColor" />
                    </button>
                  </div>

                  {/* Scrubber */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40 font-mono">-:--</span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-white/80 rounded-full ${
                          isPlaying ? "w-1/2 animate-pulse" : "w-0"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">--:--</span>
                  </div>
                </div>
              </div>

              {/* 4. MAIN GRID (4 COLUMNS) */}
              <div className="grid grid-cols-4 gap-2.5">
                {/* ---------- ROW 1: CONNECTIVITY (2 cols) + BRIGHTNESS + VOLUME ---------- */}
                {/* Connectivity 2x2 Cluster */}
                <div className="col-span-2 h-[8.8rem] rounded-[1.8rem] bg-[#1c1c1e] p-2.5 grid grid-cols-2 grid-rows-2 gap-2 border border-white/5 shadow-xl">
                  {/* Airplane Mode */}
                  <button
                    onClick={() => {
                      playClick();
                      const next = !airplaneMode;
                      setAirplaneMode(next);
                      if (next) {
                        setWifiOn(false);
                        setCellularOn(false);
                        showToast("Airplane Mode On");
                      } else {
                        setWifiOn(true);
                        showToast("Airplane Mode Off");
                      }
                    }}
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all ${
                      airplaneMode
                        ? "bg-[#ff9500] text-white shadow-lg shadow-orange-500/30"
                        : "bg-[#2c2c2e] text-white hover:bg-[#38383a]"
                    }`}
                    title="Airplane Mode"
                  >
                    <Plane size={20} className={airplaneMode ? "rotate-0" : "-rotate-45"} />
                  </button>

                  {/* AirDrop */}
                  <button
                    onClick={() => {
                      playClick();
                      const next = !airdropOn;
                      setAirdropOn(next);
                      showToast(next ? "AirDrop: Everyone (10m)" : "AirDrop: Off");
                    }}
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all ${
                      airdropOn
                        ? "bg-[#007aff] text-white shadow-lg shadow-blue-500/30"
                        : "bg-[#2c2c2e] text-white hover:bg-[#38383a]"
                    }`}
                    title="AirDrop"
                  >
                    <Cast size={20} />
                  </button>

                  {/* Wi-Fi */}
                  <button
                    onClick={() => {
                      playClick();
                      const next = !wifiOn;
                      setWifiOn(next);
                      showToast(next ? "Wi-Fi: ishaanjha-5G" : "Wi-Fi Disconnected");
                    }}
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all ${
                      wifiOn
                        ? "bg-[#007aff] text-white shadow-lg shadow-blue-500/30"
                        : "bg-[#2c2c2e] text-white hover:bg-[#38383a]"
                    }`}
                    title="Wi-Fi"
                  >
                    <Wifi size={20} />
                  </button>

                  {/* 4-in-1 Sub-Cluster */}
                  <div
                    onClick={() => {
                      playClick();
                      const next = !bluetoothOn;
                      setBluetoothOn(next);
                      showToast(next ? "Bluetooth: Connected" : "Bluetooth Off");
                    }}
                    className="w-full h-full rounded-full bg-[#2c2c2e] p-1.5 grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-0.5 cursor-pointer hover:bg-[#38383a] transition-colors"
                    title="Cellular, Bluetooth, Hotspot & Satellite"
                  >
                    <Signal size={12} className={cellularOn ? "text-green-400" : "text-white/60"} />
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        bluetoothOn ? "bg-[#007aff] text-white" : "text-white/40"
                      }`}
                    >
                      <Bluetooth size={10} />
                    </div>
                    <Radio size={11} className="text-white/40" />
                    <Sparkles size={10} className="text-white/40" />
                  </div>
                </div>

                {/* Brightness Vertical Slider (1 col) */}
                <div
                  onClick={(e) => handleSliderInteraction(e, "brightness")}
                  onTouchMove={(e) => handleSliderInteraction(e, "brightness")}
                  className="col-span-1 h-[8.8rem] rounded-[1.8rem] bg-[#242426] relative overflow-hidden cursor-pointer select-none border border-white/5 shadow-xl flex flex-col justify-end"
                  title="Brightness Slider"
                >
                  {/* Fill Bar */}
                  <div
                    className="absolute bottom-0 inset-x-0 bg-white transition-all duration-75 rounded-b-[1.8rem]"
                    style={{ height: `${brightness}%` }}
                  />
                  {/* Centered Sun Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sun
                      size={22}
                      className={
                        brightness > 45 ? "text-neutral-800" : "text-amber-300 drop-shadow-md"
                      }
                    />
                  </div>
                </div>

                {/* Volume Vertical Slider (1 col) */}
                <div
                  onClick={(e) => handleSliderInteraction(e, "volume")}
                  onTouchMove={(e) => handleSliderInteraction(e, "volume")}
                  className="col-span-1 h-[8.8rem] rounded-[1.8rem] bg-[#242426] relative overflow-hidden cursor-pointer select-none border border-white/5 shadow-xl flex flex-col justify-end"
                  title="Volume Slider"
                >
                  {/* Fill Bar */}
                  <div
                    className="absolute bottom-0 inset-x-0 bg-white transition-all duration-75 rounded-b-[1.8rem]"
                    style={{ height: `${volume}%` }}
                  />
                  {/* Centered Volume / Mute Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {volume === 0 || silentMode ? (
                      <VolumeX size={22} className="text-[#007aff] drop-shadow-md" />
                    ) : (
                      <Volume2
                        size={22}
                        className={volume > 45 ? "text-neutral-800" : "text-white"}
                      />
                    )}
                  </div>
                </div>

                {/* ---------- ROW 2: CELLULAR DATA + SILENT + LOW POWER ---------- */}
                {/* Cellular Data Wide Pill (2 cols) */}
                <div
                  onClick={() => {
                    playClick();
                    const next = !cellularOn;
                    setCellularOn(next);
                    showToast(next ? "Cellular Data: 5G Active" : "Cellular Data: Off");
                  }}
                  className="col-span-2 h-14 rounded-[1.6rem] bg-[#1c1c1e] px-4 flex items-center gap-3 border border-white/5 cursor-pointer active:scale-[0.98] transition-transform shadow-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      cellularOn ? "bg-green-500 text-white" : "bg-[#2c2c2e] text-white/70"
                    }`}
                  >
                    <Signal size={16} />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-xs font-semibold text-white">Cellular Data</span>
                    <span className="text-[11px] text-white/50 mt-1">
                      {cellularOn ? "5G Active" : "Off"}
                    </span>
                  </div>
                </div>

                {/* Silent Mode Bell (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    const next = !silentMode;
                    setSilentMode(next);
                    if (next) {
                      setVolume(0);
                      setBgAudioVolume(0);
                      showToast("Silent Mode On");
                    } else {
                      setVolume(50);
                      setBgAudioVolume(0.5);
                      showToast("Silent Mode Off");
                    }
                  }}
                  className={`col-span-1 h-14 w-14 mx-auto rounded-full flex items-center justify-center border border-white/5 active:scale-90 transition-all shadow-lg ${
                    silentMode ? "bg-[#1c1c1e] text-white" : "bg-[#1c1c1e] text-red-400"
                  }`}
                  title="Silent Mode"
                >
                  {silentMode ? <Bell size={20} /> : <BellOff size={20} />}
                </button>

                {/* Low Power Mode (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    const next = !lowPowerMode;
                    setLowPowerMode(next);
                    showToast(next ? "Low Power Mode On" : "Low Power Mode Off");
                  }}
                  className={`col-span-1 h-14 w-14 mx-auto rounded-full flex items-center justify-center border border-white/5 active:scale-90 transition-all shadow-lg ${
                    lowPowerMode
                      ? "bg-[#ff9500] text-black shadow-amber-500/40"
                      : "bg-[#1c1c1e] text-white"
                  }`}
                  title="Low Power Mode"
                >
                  <Battery size={20} />
                </button>

                {/* ---------- ROW 3: RESTART + FLASHLIGHT + CAMERA ---------- */}
                {/* Restart Wide Pill (2 cols) */}
                <div
                  onClick={() => {
                    playClick();
                    showToast("Restarting OS...");
                    setTimeout(() => {
                      window.location.reload();
                    }, 600);
                  }}
                  className="col-span-2 h-14 rounded-[1.6rem] bg-[#1c1c1e] px-4 flex items-center gap-3 border border-white/5 cursor-pointer active:scale-[0.98] transition-transform shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-white shrink-0">
                    <Power size={16} />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-xs font-semibold text-white">Restart</span>
                  </div>
                </div>

                {/* Flashlight (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    const next = !flashlightOn;
                    setFlashlightOn(next);
                    showToast(next ? "Flashlight On" : "Flashlight Off");
                  }}
                  className={`col-span-1 h-14 w-14 mx-auto rounded-full flex items-center justify-center border border-white/5 active:scale-90 transition-all shadow-lg ${
                    flashlightOn
                      ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                      : "bg-[#1c1c1e] text-white"
                  }`}
                  title="Flashlight"
                >
                  <Flashlight size={20} />
                </button>

                {/* Camera / Photos (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    setShowControlCenter(false);
                    onOpenApp("photos");
                  }}
                  className="col-span-1 h-14 w-14 mx-auto rounded-full bg-[#1c1c1e] text-white flex items-center justify-center border border-white/5 cursor-pointer active:scale-90 transition-transform shadow-lg"
                  title="Camera / Photos"
                >
                  <Camera size={20} />
                </button>

                {/* ---------- ROW 4: NEW EVENT + ALARM + SHAZAM ---------- */}
                {/* New Event Wide Pill (2 cols) */}
                <div
                  onClick={() => {
                    playClick();
                    setShowControlCenter(false);
                    onOpenApp("mail");
                  }}
                  className="col-span-2 h-14 rounded-[1.6rem] bg-[#1c1c1e] px-4 flex items-center gap-3 border border-white/5 cursor-pointer active:scale-[0.98] transition-transform shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-white shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-xs font-semibold text-white">New event</span>
                  </div>
                </div>

                {/* Alarm / Timer (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    showToast("Alarm: 7:00 AM Active");
                  }}
                  className="col-span-1 h-14 w-14 mx-auto rounded-full bg-[#1c1c1e] text-white flex items-center justify-center border border-white/5 cursor-pointer active:scale-90 transition-transform shadow-lg"
                  title="Alarm"
                >
                  <AlarmClock size={20} />
                </button>

                {/* Shazam (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    setShazamActive(true);
                    showToast("Shazam: Listening...");
                    setTimeout(() => {
                      setShazamActive(false);
                      showToast("Recognized: Ishaan Portfolio OS Flow");
                    }, 1400);
                  }}
                  className={`col-span-1 h-14 w-14 mx-auto rounded-full flex items-center justify-center border border-white/5 transition-all shadow-lg ${
                    shazamActive
                      ? "bg-[#007aff] text-white animate-pulse shadow-blue-500/50"
                      : "bg-[#1c1c1e] text-white active:scale-90"
                  }`}
                  title="Shazam Music Recognition"
                >
                  <Disc3 size={20} />
                </button>

                {/* ---------- ROW 5: WIKIPEDIA + TRANSLATE + APPLE WATCH ---------- */}
                {/* Wikipedia / Bio Wide Pill (2 cols) */}
                <div
                  onClick={() => {
                    playClick();
                    setShowControlCenter(false);
                    onOpenApp("finder");
                  }}
                  className="col-span-2 h-14 rounded-[1.6rem] bg-[#1c1c1e] px-4 flex items-center gap-3 border border-white/5 cursor-pointer active:scale-[0.98] transition-transform shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-white shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-xs font-semibold text-white">Wikipedia</span>
                  </div>
                </div>

                {/* Translate (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    showToast("Language: English · Hindi");
                  }}
                  className="col-span-1 h-14 w-14 mx-auto rounded-full bg-[#1c1c1e] text-white flex items-center justify-center border border-white/5 cursor-pointer active:scale-90 transition-transform shadow-lg"
                  title="Translate"
                >
                  <Languages size={20} />
                </button>

                {/* Apple Watch (1 col) */}
                <button
                  onClick={() => {
                    playClick();
                    showToast("Pinging Apple Watch...");
                  }}
                  className="col-span-1 h-14 w-14 mx-auto rounded-full bg-[#1c1c1e] text-white flex items-center justify-center border border-white/5 cursor-pointer active:scale-90 transition-transform shadow-lg"
                  title="Ping Apple Watch"
                >
                  <Watch size={20} />
                </button>
              </div>

              {/* Right Margin iOS 18 Indicator Icons */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-5 text-white/30 pointer-events-none">
                <Heart size={13} className="text-white fill-white" />
                <Radio size={13} />
                <Disc3 size={13} />
              </div>

              {/* Bottom Dismiss Pill */}
              <div
                onClick={() => {
                  playClick();
                  setShowControlCenter(false);
                }}
                className="w-36 h-1 bg-white/70 rounded-full mx-auto mt-4 shrink-0 cursor-pointer hover:bg-white"
                title="Swipe up to dismiss"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- IOS 18 POWER OFF MODAL ----------------- */}
      <AnimatePresence>
        {showPowerOffModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-8 text-white select-none"
          >
            <div className="pt-12 flex flex-col items-center gap-6">
              {/* Slide to power off bar */}
              <div
                onClick={() => {
                  playClick();
                  setShowPowerOffModal(false);
                  setShowControlCenter(false);
                  window.location.reload();
                }}
                className="w-full max-w-xs bg-white/15 border border-white/20 rounded-full p-1.5 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
                  <Power size={22} />
                </div>
                <span className="text-sm font-medium text-white/90 pr-6">slide to power off</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pb-8">
              <button
                onClick={() => {
                  playClick();
                  setShowPowerOffModal(false);
                }}
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold active:scale-95 transition-transform text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
