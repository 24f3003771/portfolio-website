import { Award, ShieldCheck, Sparkles, TrendingUp, Cpu } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Business & Strategy",
      icon: <TrendingUp size={18} className="text-cyan-400" />,
      skills: [
        "Team Leadership",
        "Cross-Functional Operations",
        "Business Modelling",
        "Revenue Strategy",
        "Digital Marketing",
        "SEO",
        "Social Media Analytics",
        "Content Strategy",
        "Copywriting",
        "Cold Email & Lead Generation",
        "Sales Automation",
        "Apollo.io",
        "LinkedIn Sales Navigator",
        "Canva (Advanced)",
        "Scriptwriting",
        "AI-Assisted Content Creation"
      ]
    },
    {
      title: "Data & Technology",
      icon: <Cpu size={18} className="text-emerald-400" />,
      skills: [
        "Python",
        "SQL",
        "CLI",
        "Google Workspace",
        "Supabase",
        "AWS (Cost Optimisation)",
        "AWS (Startup Credits)",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "REST APIs",
        "AI-Directed Dev (Claude)",
        "AI-Directed Dev (Cursor)",
        "AI-Directed Dev (Antigravity)",
        "AI-Directed Dev (OpenClaw)",
        "GLM"
      ]
    }
  ];

  const awards = [
    {
      emoji: "🥇",
      title: "Winner — Big Bull (Finance Simulation)",
      event: "Nova '25, IIM Bangalore",
      desc: "Outperformed all peers in a stock-trading simulation through data-driven market analysis and positioning."
    },
    {
      emoji: "🥉",
      title: "2nd Runner-Up — Illusion Inc (Deceptive Strategy)",
      event: "Nova '25, IIM Bangalore",
      desc: "Designed a convincing pseudo-business model and demonstrated persuasive marketing and loophole strategy."
    },
    {
      emoji: "🏆",
      title: "Winner — Money Matrix Case Competition",
      event: "Saavan '25, IIT Madras",
      desc: "1st place in a rigorous financial case competition, showing sharp analytical problem-solving under pressure."
    }
  ];

  const responsibilities = [
    {
      role: "Head, Documentation, Research & Design",
      club: "Tesseract Club, IIT Madras · 2025",
      desc: "Led 1 major flagship event end-to-end, drafted sponsorship proposals for 5+ events, and owned research, design & club documentation."
    },
    {
      role: "Documentation Coordinator",
      club: "Boundless Travel Society, IIT Madras · 2025–26",
      desc: "Managed 12+ events end-to-end, covering itinerary design, planning, on-ground management and official records."
    }
  ];

  return (
    <div className="p-4 sm:p-7 h-full overflow-y-auto custom-scrollbar flex flex-col gap-6 select-text">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          Skills & Core Competencies <Sparkles size={18} className="text-amber-400" />
        </h2>
        <p className="text-xs sm:text-sm text-white/60">
          Cross-functional mastery spanning Business Strategy, Technical Architecture, and AI-Directed Execution
        </p>
      </div>

      {/* Skills Grids */}
      {skillCategories.map((cat, i) => (
        <div key={i} className="bg-black/30 rounded-2xl p-5 border border-white/10 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3.5 flex items-center gap-2">
            {cat.icon}
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, j) => (
              <span 
                key={j} 
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white/90 hover:bg-white/15 transition-all hover:text-white cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Awards & Honors */}
      <div className="bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-5 border border-amber-500/20 shadow-lg space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Award size={18} className="text-amber-400" />
          <span>Key Achievements & Awards</span>
        </h3>
        <div className="space-y-3 pt-1">
          {awards.map((a, k) => (
            <div key={k} className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-white/5">
              <span className="text-lg">{a.emoji}</span>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">{a.title}</h4>
                <p className="text-[11px] text-amber-300 font-medium">{a.event}</p>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positions of Responsibility */}
      <div className="bg-black/30 rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-blue-400" />
          <span>Positions of Responsibility</span>
        </h3>
        <div className="space-y-3 pt-1">
          {responsibilities.map((r, m) => (
            <div key={m} className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
              <h4 className="font-bold text-white text-xs sm:text-sm">{r.role}</h4>
              <p className="text-xs text-cyan-300 font-medium">{r.club}</p>
              <p className="text-xs text-white/70 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
