import { useState, useEffect, useRef } from "react";
import { Apple, Wifi, Battery, Search, Command, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ControlCenter from "./ControlCenter";

export default function TopBar() {
  const [time, setTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      <div className="w-full h-8 bg-black/40 backdrop-blur-md text-white flex items-center justify-between px-4 text-xs font-medium z-50 fixed top-0 select-none border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Apple size={14} className="hover:text-white cursor-pointer" onClick={() => toggleMenu("apple")} />
            {activeMenu === "apple" && (
              <div ref={menuRef} className="absolute top-full left-0 mt-1 w-48 glass bg-black/80 rounded-md py-1 border border-white/20 shadow-xl">
                <div className="px-4 py-1 hover:bg-blue-500 cursor-pointer">About This Mac</div>
                <div className="h-px bg-white/20 my-1"></div>
                <div className="px-4 py-1 hover:bg-blue-500 cursor-pointer">System Settings...</div>
                <div className="h-px bg-white/20 my-1"></div>
                <div className="px-4 py-1 hover:bg-blue-500 cursor-pointer">Sleep</div>
                <div className="px-4 py-1 hover:bg-blue-500 cursor-pointer">Restart...</div>
                <div className="px-4 py-1 hover:bg-blue-500 cursor-pointer">Shut Down...</div>
              </div>
            )}
          </div>
          <span className="font-bold hover:text-white cursor-pointer">Finder</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">File</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">Edit</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">View</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">Go</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">Window</span>
          <span className="hover:text-white cursor-pointer hidden sm:block">Help</span>
        </div>
        
        <div className="flex items-center gap-4 relative">
          {/* Spotlight Search Toggle */}
          <Search size={14} className="cursor-pointer hover:text-white" onClick={() => setShowSpotlight(!showSpotlight)} />
          
          {/* Wifi Menu */}
          <div className="relative">
            <Wifi size={14} className="cursor-pointer hover:text-white" onClick={() => toggleMenu("wifi")} />
            {activeMenu === "wifi" && (
              <div ref={menuRef} className="absolute top-full right-0 mt-1 w-64 glass bg-black/80 rounded-md py-2 px-3 border border-white/20 shadow-xl">
                <div className="font-semibold mb-2">Wi-Fi</div>
                <div className="flex items-center justify-between px-2 py-1 bg-blue-500 rounded text-white">
                  <div className="flex items-center gap-2"><Wifi size={14} /> ishaanjha-5G</div>
                </div>
                <div className="h-px bg-white/20 my-2"></div>
                <div className="font-semibold mb-1 opacity-70">Known Networks</div>
                <div className="px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white/80">Campus-Guest</div>
                <div className="px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white/80">IIM-B_Student</div>
              </div>
            )}
          </div>

          {/* Battery Menu */}
          <div className="relative">
            <Battery size={14} className="cursor-pointer hover:text-white" onClick={() => toggleMenu("battery")} />
            {activeMenu === "battery" && (
              <div ref={menuRef} className="absolute top-full right-0 mt-1 w-48 glass bg-black/80 rounded-md py-2 border border-white/20 shadow-xl">
                <div className="px-4 py-1 font-semibold border-b border-white/10 pb-2 mb-1">
                  Battery: 100%
                </div>
                <div className="px-4 py-1 text-white/70">Power Source: Power Adapter</div>
              </div>
            )}
          </div>
          
          {/* Control Center Toggle */}
          <div className="relative">
            <SlidersHorizontal size={14} className={`cursor-pointer ${showControlCenter ? 'text-white' : 'hover:text-white'}`} onClick={() => setShowControlCenter(!showControlCenter)} />
          </div>

          <span>{time}</span>
        </div>
      </div>
      
      <ControlCenter isOpen={showControlCenter} onClose={() => setShowControlCenter(false)} />

      {/* Spotlight Search Overlay */}
      <AnimatePresence>
        {showSpotlight && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-32 pointer-events-none"
          >
            <div className="w-[600px] glass bg-black/60 rounded-xl border border-white/20 shadow-2xl p-2 pointer-events-auto flex items-center">
              <Search size={24} className="text-white/50 ml-2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Spotlight Search" 
                className="w-full bg-transparent border-none outline-none text-white text-2xl px-4 py-2 placeholder-white/30"
                onBlur={() => setShowSpotlight(false)}
                onKeyDown={(e) => e.key === 'Escape' && setShowSpotlight(false)}
              />
              <div className="text-white/30 flex items-center gap-1 pr-2">
                <Command size={16} /> space
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
