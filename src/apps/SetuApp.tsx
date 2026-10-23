import { ExternalLink, Award, Users, ArrowRight, Rocket } from "lucide-react";

export default function SetuApp() {
  const url = "https://setustartupschool.com";

  const mentors = [
    { name: "Vaibhav Bhargava", role: "Salesforce Architect, JLL | Ex-PwC" },
    { name: "Vikram Anand Bhushan", role: "Co-Founder, Hypermine | Web3 Expert" },
    { name: "Pavan Agarwal", role: "Founder, DD Cinemas" },
    { name: "CA Moon Goel", role: "Co-Founder, Vitt Kushal | Tax & Compliance" }
  ];

  const tools = [
    { title: "Setu LMS 0→1", desc: "Interactive founder curriculum & curriculum playback engine" },
    { title: "VC & Grant Directory", desc: "2,000+ structured records of investors, incubators & government grants" },
    { title: "Founder Network", desc: "Private ecosystem community for cohort members" },
    { title: "Fundraising Suite", desc: "Pitch deck reviews, financial modeling & cap table tools" }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0B1120] text-white overflow-hidden select-text">
      {/* Top Safari-style Address Bar */}
      <div className="w-full h-11 bg-[#131b2e] border-b border-white/10 flex items-center justify-between px-4 shrink-0 text-xs">
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>

        {/* Address pill */}
        <div className="flex-1 max-w-md mx-4 bg-black/40 border border-white/10 rounded-full px-4 py-1 flex items-center justify-center gap-2 text-white/80 font-mono text-[11px]">
          <span className="text-emerald-400">🔒</span>
          <span className="truncate">{url}</span>
        </div>

        {/* Open in real browser button */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-white font-semibold text-xs transition-all shadow-md active:scale-95"
        >
          <span>Open Web</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Main Setu Platform Showcase View */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-950/60 to-[#0B1120] border border-purple-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg">
                  <img src="/setu-icon.png" alt="Setu" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
                    Startup School Platform
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">Setu Startup School</h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Turn your startup idea into a real business with expert mentorship, hands-on learning, fundraising guidance, and founder networking.
              </p>

              <p className="text-xs text-purple-300 font-mono">
                "Stop Ideating. Start Building. The 0-1 Bridge where Founders are Built."
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:brightness-110 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 transition-transform active:scale-95"
              >
                <span>Launch Live Platform</span>
                <ArrowRight size={16} />
              </a>
              <span className="text-[11px] text-white/50 text-center font-mono">setustartupschool.com</span>
            </div>
          </div>
        </div>

        {/* Ishaan Jha's Role & Impact Banner */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award size={18} />
              <span>Ishaan Jha — Product Associate & Founder Office</span>
            </div>
            <span className="text-xs text-white/50 font-mono">Feb 2026 – Present</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
              <div className="text-lg font-black text-purple-400">0 → 1 Launch</div>
              <div className="text-xs text-white/70 mt-1">Co-built Setu LMS and platform infrastructure end-to-end.</div>
            </div>

            <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
              <div className="text-lg font-black text-indigo-400">2,000+ Records</div>
              <div className="text-xs text-white/70 mt-1">Structured database of VCs, incubators, grants and accelerators.</div>
            </div>

            <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
              <div className="text-lg font-black text-emerald-400">$1,000 Credits</div>
              <div className="text-xs text-white/70 mt-1">Secured AWS startup benefits to minimize cloud overhead.</div>
            </div>

            <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
              <div className="text-lg font-black text-cyan-400">600+ Attendees</div>
              <div className="text-xs text-white/70 mt-1">Co-organised 3 major flagship on-ground startup summits.</div>
            </div>
          </div>
        </div>

        {/* Platform Modules & Tools Built */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Rocket size={18} className="text-cyan-400" /> Platform Architecture & Tools Built
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{tool.title}</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors on the Platform */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-purple-400" /> Titans & Mentors on Setu
            </h3>
            <a 
              href="https://setustartupschool.com/mentors" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View all mentors <ExternalLink size={11} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {mentors.map((m, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <div className="text-xs font-bold text-white">{m.name}</div>
                <div className="text-[11px] text-white/60 mt-0.5">{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 pb-6 flex flex-col items-center justify-center gap-2 text-center">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl active:scale-95"
          >
            <span>Visit setustartupschool.com</span>
            <ExternalLink size={14} />
          </a>
          <span className="text-[11px] text-white/40">Opens official website in high-speed browser tab</span>
        </div>
      </div>
    </div>
  );
}
