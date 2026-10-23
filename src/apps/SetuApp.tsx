import { useState, useRef } from "react";
import { ExternalLink, RotateCw, Globe, ArrowLeft, ArrowRight } from "lucide-react";

export default function SetuApp() {
  const url = "https://setustartupschool.com";
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleBack = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.history.back();
      }
    } catch {
      handleReload();
    }
  };

  const handleForward = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.history.forward();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0B1120] text-white overflow-hidden select-none">
      {/* Top Safari-style Address Bar */}
      <div className="w-full h-11 bg-[#131b2e] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 shrink-0 text-xs">
        {/* Navigation & Control Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <button 
            onClick={handleBack}
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="Back"
          >
            <ArrowLeft size={13} />
          </button>
          <button 
            onClick={handleForward}
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="Forward"
          >
            <ArrowRight size={13} />
          </button>
          <button 
            onClick={handleReload}
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="Reload"
          >
            <RotateCw size={12} className={isLoading ? "animate-spin text-purple-400" : ""} />
          </button>
        </div>

        {/* Address pill */}
        <div className="flex-1 max-w-lg mx-3 sm:mx-6 bg-black/40 border border-white/10 rounded-full px-4 py-1.5 flex items-center justify-between text-white/80 font-mono text-[11px] shadow-inner">
          <div className="flex items-center gap-2 truncate">
            <span className="text-emerald-400">🔒</span>
            <span className="truncate">{url}</span>
          </div>
          <span className="text-[10px] text-purple-400 font-sans font-semibold hidden md:inline-block px-1.5 py-0.5 rounded bg-purple-500/10">
            Live Platform
          </span>
        </div>

        {/* Open in real browser button */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-white font-semibold text-xs transition-all shadow-md active:scale-95 shrink-0"
          title="Open official website in new browser tab"
        >
          <Globe size={12} className="hidden sm:inline" />
          <span>Open Web</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Main Original Platform Live View */}
      <div className="flex-1 w-full h-full relative bg-[#0B1120] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B1120] text-white/70 gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center animate-pulse">
              <img src="/setu-icon.png" alt="Setu" className="w-6 h-6 object-contain" />
            </div>
            <div className="text-xs font-medium text-white/60">Loading Setu Startup School...</div>
          </div>
        )}

        <iframe
          key={iframeKey}
          ref={iframeRef}
          src="/setu.html"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-none bg-[#0B1120]"
          title="Setu Startup School - Original Platform"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
}
