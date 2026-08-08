import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: (id: string) => void;
  isActive: boolean;
  onClick: () => void;
}

export default function Window({ id, title, children, onClose, isActive, onClick }: WindowProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: typeof window !== 'undefined' ? window.innerWidth - 600 : 0, top: 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 400 : 0 }}
      dragElastic={0}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, zIndex: isActive ? 50 : 10 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={onClick}
      className={`absolute flex flex-col bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 sm:w-[800px] sm:h-[500px] w-full h-[calc(100%-1rem)] top-0 sm:top-10 left-0 sm:left-20 ${isActive ? 'ring-1 ring-blue-500/50' : ''}`}
      style={{
        boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="h-8 w-full bg-white/10 backdrop-blur-md flex items-center px-3 border-b border-white/10 cursor-grab active:cursor-grabbing">
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center group"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group">
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group">
            <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
          </button>
        </div>
        <div className="flex-1 text-center text-xs font-semibold text-white/80 select-none">
          {title}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-black/40 text-white p-4 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}
