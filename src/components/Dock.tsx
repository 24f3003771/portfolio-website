import { motion } from "framer-motion";
import { APPS_CONFIG } from "../config/apps";

export default function Dock({ onOpen, openWindows = [] }: { onOpen: (id: string) => void, openWindows?: string[] }) {
  const dockApps = APPS_CONFIG.filter((app) => app.inDock);

  const handleClick = (id: string) => {
    onOpen(id);
  };

  return (
    <div className="fixed bottom-3 w-full flex justify-center z-50 pointer-events-none px-2">
      <div className="glass px-4 py-3 rounded-full flex items-end gap-3 sm:gap-4 bg-white/20 border-white/20 backdrop-blur-2xl shadow-2xl pointer-events-auto overflow-x-auto max-w-full">
        {dockApps.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(app.id)}
            className="relative group flex flex-col items-center justify-end cursor-pointer flex-shrink-0"
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[1.2rem] flex items-center justify-center shadow-lg transition-all duration-300 ${app.bgClass}`}>
              {app.icon}
            </div>
            {openWindows.includes(app.id) && (
              <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#34c759]" />
            )}
            <span className="absolute -top-10 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20 shadow-xl hidden sm:block">
              {app.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
