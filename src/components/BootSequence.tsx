import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, Command } from "lucide-react";
import { playBootChime, playClick, playBgAudio } from "../utils/audio";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState<'power' | 'booting'>('power');
  const [progress, setProgress] = useState(0);

  const handlePowerClick = () => {
    playBootChime();
    playClick();
    playBgAudio();
    setStep('booting');
  };

  useEffect(() => {
    if (step === 'booting') {
      const duration = 2500; // 2.5 seconds boot
      const intervalTime = 20;
      const steps = duration / intervalTime;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        setProgress(Math.min((currentStep / steps) * 100, 100));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400); // slight pause after 100%
        }
      }, intervalTime);
      
      return () => clearInterval(timer);
    }
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        key="boot-sequence"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {step === 'power' && (
            <motion.div
              key="power-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center cursor-pointer group"
              onClick={handlePowerClick}
            >
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                <Power size={48} className="text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-6 text-white/50 text-sm tracking-widest uppercase font-medium"
              >
                Tap to Start
              </motion.span>
            </motion.div>
          )}

          {step === 'booting' && (
            <motion.div
              key="booting-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center w-full max-w-xs"
            >
              {/* Custom Logo instead of Apple */}
              <div className="mb-16">
                <Command size={72} className="text-white" strokeWidth={1.5} />
              </div>
              
              {/* Progress Bar */}
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
