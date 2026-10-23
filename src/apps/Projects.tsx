import { ExternalLink, Sparkles, Rocket, FileSpreadsheet } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Nova Unplugged",
      subtitle: "Event Management Platform · Nova 2026",
      stack: "Next.js · Node.js · PostgreSQL · Tailwind · QR Auth · Admin Dashboard",
      badge: "Shipped in <48 Hours · 500+ Users",
      desc: "Co-built from 0 to production in under 48 hours via AI-directed development (Antigravity, OpenClaw, Claude, Cursor, GLM), handling 500+ users on zero-cost infrastructure. Delivered auth, ticketing, QR gate entry, admin panel and the full attendee flow. The site surfaces on Google for “Nova Unplugged”.",
      link: "nova-unplugged.dbeos.in",
      gradient: "from-orange-500 via-rose-500 to-purple-600",
      icon: <img src="/nova-logo.png" alt="Nova Unplugged" className="w-8 h-8 object-contain drop-shadow" />
    },
    {
      title: "DBE-OS",
      subtitle: "Gamified All-in-One Platform for IIM Bangalore DBE Students",
      stack: "Full-Stack · Multi-Tool Dashboard · Gamification System · AI-Assisted",
      badge: "Built for 3,000+ Users · Launching Soon",
      desc: "Co-built for 3,000+ users (in testing, launching soon) with 6+ tools. The Internship Hunter tool is backed by 500+ scraped career-portal links and 100+ data points on live opportunities. Delivered with zero budget and AI-assisted development.",
      link: "dbeos.in",
      gradient: "from-blue-600 via-indigo-600 to-violet-700",
      icon: <img src="/dbeos-logo.png" alt="DBE-OS" className="w-8 h-8 object-contain rounded-md drop-shadow" />
    },
    {
      title: "Ecofone Enterprise Billing",
      subtitle: "GST-Compliant Billing Software & Web Platform",
      stack: "AWS Cloud · Web Development · GST Compliance · Cost Optimization",
      badge: "Cut Tech Costs ~₹3k/mo · 30-Member Team",
      desc: "Helped design and build an enterprise-grade, GST-compliant billing software for the Indian market. Redesigned company website improving UX and structure. Identified and secured AWS startup programme benefits, slashing infrastructure costs.",
      link: "ishaanjha.mybuildspace.in",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      icon: <FileSpreadsheet size={28} className="text-white" />
    },
    {
      title: "Cosmologia 3D",
      subtitle: "Stellar Observatory & Planetary Explorer",
      stack: "WebGL 2 · Three.js r160 · Procedural Astronomy · AR Hologram",
      badge: "Interactive 3D & AR Camera Mode",
      desc: "Interactive 3D celestial physics observatory featuring procedural planetary surface rendering, real-time lighting shaders, orbital mechanics, and augmented reality camera projection.",
      link: "ishaanjha.mybuildspace.in",
      gradient: "from-cyan-500 via-blue-600 to-indigo-900",
      icon: <Rocket size={28} className="text-white" />
    }
  ];

  return (
    <div className="p-4 sm:p-7 h-full overflow-y-auto custom-scrollbar select-text">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Projects & Builds <Sparkles size={18} className="text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-white/60">
            High-velocity, AI-assisted production deployments and platforms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj, i) => (
          <div 
            key={i} 
            className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 group flex flex-col shadow-xl"
          >
            {/* Visual Header Banner */}
            <div className={`h-36 sm:h-44 w-full bg-gradient-to-br ${proj.gradient} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group-hover:brightness-105 transition-all`}>
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[11px] font-semibold text-white/95 border border-white/20">
                  {proj.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
                  {proj.icon}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white tracking-wide">{proj.title}</h3>
                <p className="text-xs text-white/90 font-medium">{proj.subtitle}</p>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <p className="text-[11px] text-cyan-300 mb-2 font-mono leading-tight">{proj.stack}</p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{proj.desc}</p>
              </div>

              <div className="pt-2">
                <a 
                  href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white backdrop-blur-sm transition-colors border border-white/10 group-hover:border-blue-500/50 group-hover:text-blue-300"
                >
                  Visit Project <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
