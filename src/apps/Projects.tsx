import { useState } from "react";
import { ExternalLink, Sparkles, Rocket, FileSpreadsheet } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "live" | "enterprise" | "interactive";
  stack: string;
  badge: string;
  desc: string;
  link: string;
  gradient: string;
  icon: React.ReactNode;
  highlights: string[];
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "live" | "enterprise" | "interactive">("all");

  const projects: ProjectItem[] = [
    {
      id: "setu",
      title: "Setu Startup School",
      subtitle: "Alternate B-School Platform & LMS for Aspiring Founders",
      category: "live",
      stack: "Next.js · Node.js · AWS Cloud · LMS Architecture · PostgreSQL · Tailwind",
      badge: "Co-Built 0→1 · 2,000+ Ecosystem Records · $1,000 AWS",
      desc: "Co-built the Setu LMS platform from 0 to 1 as Project Associate / Founder Office Intern. Owned product architecture, feature scoping, UI/UX, and in-house engineering. Built 5+ startup ecosystem tools, curated 2,000+ verified VC & incubator records, generated 1,000+ leads, and secured $1,000 in AWS credits.",
      link: "https://setustartupschool.com/",
      gradient: "from-purple-600 via-indigo-700 to-slate-900",
      icon: <img src="/setu-icon.png" alt="Setu Startup School" className="w-8 h-8 object-contain drop-shadow" />,
      highlights: ["LMS Architecture 0→1", "2,000+ VC / Incubator Database", "$1,000 AWS Credits Secured", "3 On-Ground Startup Summits"]
    },
    {
      id: "nova",
      title: "Nova Unplugged ('26)",
      subtitle: "Annual Campus Immersion & College Fest Platform · IIM Bangalore",
      category: "live",
      stack: "Next.js · Node.js · PostgreSQL · Tailwind · QR Gate Scanning · Admin Portal",
      badge: "Shipped in <48 Hours · 500+ Attendees · #1 on Google",
      desc: "Co-built from 0 to production in under 48 hours via AI-directed engineering (Antigravity, Claude, Cursor, GLM), handling 500+ users on zero-cost infrastructure with 0ms downtime. Delivered authentication, ticketing, instant QR entry scanners, dynamic admin dashboard, and full attendee flow.",
      link: "https://nova-unplugged.dbeos.in/",
      gradient: "from-orange-500 via-amber-600 to-red-600",
      icon: <img src="/nova-logo.png" alt="Nova Unplugged" className="w-8 h-8 object-contain drop-shadow" />,
      highlights: ["Shipped 0→1 in <48h", "500+ Real-Time QR Gate Check-ins", "Zero-Cost Serverless Setup", "Top Google Search Ranking"]
    },
    {
      id: "dbeos",
      title: "DBE-OS",
      subtitle: "Gamified Academic Platform & Operating System for IIM Bangalore DBE",
      category: "live",
      stack: "Full-Stack · Web Scraping Engine · Career Portals Pipeline · Analytics",
      badge: "Built for 3,000+ Users · 500+ Live Internships",
      desc: "Co-founded and engineered the premier student platform for the IIM Bangalore BBA DBE cohort. Features 'Internship Hunter' with 500+ scraped career links and 100+ live opportunity data points, CGPA & attendance calculators, curated peer notes, and study tools built on zero budget.",
      link: "https://dbeos.in/",
      gradient: "from-blue-600 via-indigo-600 to-cyan-700",
      icon: <img src="/dbeos-logo.png" alt="DBE-OS" className="w-8 h-8 object-contain rounded-md drop-shadow" />,
      highlights: ["3,000+ Student Target Cohort", "500+ Live Career Portal Links", "Gamified Study Utilities", "Community Forum & Notes"]
    },
    {
      id: "ecofone",
      title: "Ecofone Enterprise Billing & ERP",
      subtitle: "GST-Compliant Invoicing Software & Cloud Modernization",
      category: "enterprise",
      stack: "AWS Cloud · Web Development · GST Compliance · Infrastructure Optimization",
      badge: "Cut Tech Costs ~₹3,000/mo · 30-Member Team Coordination",
      desc: "Leading 30-member team across Tech, Marketing, and Sales in Founder Office. Architected enterprise-grade, GST-compliant billing software for Indian B2B markets. Slashed hosting and database overhead by ~₹3,000/month through AWS startup benefits, and redesigned the customer-facing web platform.",
      link: "https://ishaanjha.mybuildspace.in",
      gradient: "from-emerald-600 via-teal-700 to-cyan-800",
      icon: <FileSpreadsheet size={28} className="text-white" />,
      highlights: ["GST-Compliant Invoicing Engine", "₹36,000/yr AWS Cost Savings", "30-Member Operations Oversight", "Complete UX Overhaul"]
    },
    {
      id: "cosmologia",
      title: "Cosmologia 3D Observatory",
      subtitle: "Interactive Celestial Observatory & Exoplanet Simulation",
      category: "interactive",
      stack: "WebGL 2 · Three.js r160 · Procedural Shaders · WebXR · AR Camera Projection",
      badge: "Deep Space 3D + Live AR Hologram Mode",
      desc: "Interactive 3D space observatory featuring procedural celestial rendering, dynamic Keplerian orbital mechanics, atmospheric Rayleigh scattering shaders, multi-planet telemetry (Jupiter, Saturn, Mars), and an augmented reality camera mode to project planetary holograms into real space.",
      link: "/cosmos.html",
      gradient: "from-cyan-500 via-blue-600 to-indigo-950",
      icon: <Rocket size={28} className="text-white" />,
      highlights: ["Real-Time Procedural Shaders", "60 FPS WebGL 2 Engine", "Augmented Reality Projection", "Interactive Planetary Physics"]
    }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="p-4 sm:p-7 h-full overflow-y-auto custom-scrollbar select-text bg-[#0c0d10] text-white">
      {/* Header with Title & Metrics Ribbon */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Projects & Engineering Builds <Sparkles size={20} className="text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Verified production deployments, live platforms, and full-stack software systems
            </p>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Active Cohort Reach</span>
            <span className="text-lg font-black text-white mt-0.5">3,500+ Users</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Fastest 0→1 Launch</span>
            <span className="text-lg font-black text-amber-400 mt-0.5">&lt;48 Hours</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">AWS Cost Savings</span>
            <span className="text-lg font-black text-emerald-400 mt-0.5">~₹36k/yr</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Uptime & Reliability</span>
            <span className="text-lg font-black text-cyan-400 mt-0.5">0ms Downtime</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 custom-scrollbar">
          {[
            { id: "all", label: `All Projects (${projects.length})` },
            { id: "live", label: "Live Platforms (3)" },
            { id: "enterprise", label: "Enterprise Software (1)" },
            { id: "interactive", label: "3D & Simulation (1)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400"
                  : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id} 
            className="bg-[#14151a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 group flex flex-col shadow-2xl"
          >
            {/* Visual Header Banner */}
            <div className={`h-40 sm:h-44 w-full bg-gradient-to-br ${proj.gradient} p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group-hover:brightness-105 transition-all`}>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[11px] font-semibold text-white/95 border border-white/20">
                  {proj.badge}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                  {proj.icon}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white tracking-wide">{proj.title}</h3>
                <p className="text-xs text-white/90 font-medium line-clamp-1">{proj.subtitle}</p>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-[11px] text-cyan-300 mb-2 font-mono leading-tight">{proj.stack}</p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{proj.desc}</p>
              </div>

              {/* Highlights Pill Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.highlights.map((h, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <a 
                  href={proj.link.startsWith("http") ? proj.link : proj.link.startsWith("/") ? proj.link : `https://${proj.link}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white shadow-md transition-colors group-hover:shadow-blue-500/25"
                >
                  Launch Project <ExternalLink size={12} />
                </a>

                <span className="text-[10px] text-white/40 font-mono">
                  {proj.link.replace("https://", "").replace("http://", "").replace(/\/$/, "")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
