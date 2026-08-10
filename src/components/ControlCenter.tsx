import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bgAudio, playClick, playBgAudio } from "../App";
import { 
  Wifi, 
  Bluetooth, 
  Radio, 
  Moon, 
  Sun, 
  Volume2, 
  Play, 
  SkipBack, 
  SkipForward,
  Monitor,
  Copy
} from "lucide-react";

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [display, setDisplay] = useState(80);
  const [sound, setSound] = useState(40);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!bgAudio) return;
    const audio = bgAudio;
    const updatePlayState = () => setIsPlaying(!audio.paused);
    const updateVolume = () => setSound(Math.round(audio.volume * 100));

    audio.addEventListener('play', updatePlayState);
    audio.addEventListener('pause', updatePlayState);
    audio.addEventListener('volumechange', updateVolume);

    setIsPlaying(!audio.paused);
    setSound(Math.round(audio.volume * 100));

    return () => {
      audio.removeEventListener('play', updatePlayState);
      audio.removeEventListener('pause', updatePlayState);
      audio.removeEventListener('volumechange', updateVolume);
    };
  }, []);

  const togglePlay = () => {
    playClick();
    if (!bgAudio) return;
    if (bgAudio.paused) {
      playBgAudio();
    } else {
      bgAudio.pause();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setSound(vol);
    if (bgAudio) {
      bgAudio.volume = vol / 100;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible backdrop to catch clicks outside */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(10px)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            className="fixed top-9 right-2 w-[320px] p-4 glass bg-black/40 border border-white/20 rounded-3xl shadow-2xl z-50 text-white select-none backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              {/* Top Section: Connectivity & Now Playing */}
              <div className="flex gap-3 h-32">
                {/* Connectivity */}
                <div className="flex-1 glass bg-white/10 rounded-2xl p-3 flex flex-col gap-2 shadow-inner">
                  {/* Wifi */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setWifi(!wifi)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${wifi ? 'bg-blue-500' : 'bg-white/20 group-hover:bg-white/30'}`}>
                      <Wifi size={16} className={wifi ? 'text-white' : 'text-white/70'} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">Wi-Fi</span>
                      <span className="text-[10px] text-white/60 leading-tight">{wifi ? 'ishaanjha-5G' : 'Off'}</span>
                    </div>
                  </div>
                  {/* Bluetooth */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setBluetooth(!bluetooth)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${bluetooth ? 'bg-blue-500' : 'bg-white/20 group-hover:bg-white/30'}`}>
                      <Bluetooth size={16} className={bluetooth ? 'text-white' : 'text-white/70'} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">Bluetooth</span>
                      <span className="text-[10px] text-white/60 leading-tight">{bluetooth ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                  {/* AirDrop */}
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setAirdrop(!airdrop)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${airdrop ? 'bg-blue-500' : 'bg-white/20 group-hover:bg-white/30'}`}>
                      <Radio size={16} className={airdrop ? 'text-white' : 'text-white/70'} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">AirDrop</span>
                      <span className="text-[10px] text-white/60 leading-tight">{airdrop ? 'Contacts Only' : 'Off'}</span>
                    </div>
                  </div>
                </div>

                {/* Now Playing */}
                <div className="flex-1 glass bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-50"></div>
                  <span className="text-xs font-semibold z-10 mb-2">{isPlaying ? "Ambient Music" : "Not Playing"}</span>
                  <div className="flex gap-4 z-10 text-white/80">
                    <SkipBack size={20} className="hover:text-white transition-colors cursor-pointer" onClick={playClick} />
                    <div onClick={togglePlay} className="cursor-pointer hover:text-white transition-colors">
                      {isPlaying ? <span className="font-bold text-sm leading-none flex items-center justify-center w-5 h-5">II</span> : <Play size={20} />}
                    </div>
                    <SkipForward size={20} className="hover:text-white transition-colors cursor-pointer" onClick={playClick} />
                  </div>
                </div>
              </div>

              {/* Middle Section: Display, Screen Mirroring, DND */}
              <div className="flex gap-3">
                <div 
                  className={`flex-1 glass rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-inner ${dnd ? 'bg-blue-500/80 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                  onClick={() => setDnd(!dnd)}
                >
                  <Moon size={18} className={dnd ? 'fill-current' : ''} />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold leading-tight">Do Not Disturb</span>
                    <span className="text-[10px] leading-tight opacity-70">{dnd ? 'On' : 'Off'}</span>
                  </div>
                </div>
                <div className="w-16 glass bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/20 shadow-inner">
                  <Monitor size={18} className="text-white/80" />
                </div>
                <div className="w-16 glass bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/20 shadow-inner">
                  <Copy size={18} className="text-white/80" />
                </div>
              </div>

              {/* Sliders: Display & Sound */}
              <div className="flex flex-col gap-3">
                <div className="glass bg-white/10 rounded-2xl p-3 flex flex-col gap-2 shadow-inner">
                  <span className="text-xs font-semibold pl-1">Display</span>
                  <div className="flex items-center gap-2 bg-black/40 rounded-full px-2 py-1 h-8">
                    <Sun size={14} className="text-white/60" />
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={display}
                      onChange={(e) => setDisplay(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                </div>
                <div className="glass bg-white/10 rounded-2xl p-3 flex flex-col gap-2 shadow-inner">
                  <span className="text-xs font-semibold pl-1">Sound</span>
                  <div className="flex items-center gap-2 bg-black/40 rounded-full px-2 py-1 h-8">
                    <Volume2 size={14} className="text-white/60" />
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={sound}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
