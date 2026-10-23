import { Briefcase, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Founder Office (On-site)",
      company: "Ecofone",
      date: "Mid-Sep 2026 – Present",
      badge: "Current Leadership",
      points: [
        "Lead and coordinate a 30-member team across Tech, Marketing and Sales, overseeing daily departmental operations.",
        "Defined new business models and strategic pivots to scale revenue; restructured existing roadmaps to improve execution efficiency.",
        "Cut technical costs (hosting, database and infrastructure) by ~₹3,000/month by identifying and securing AWS startup programme benefits.",
        "Helped design and build an enterprise-grade, GST-compliant billing software for the Indian market.",
        "Redesigned the company website, significantly improving its look, structure and user experience."
      ]
    },
    {
      title: "Project Associate",
      company: "Hundred Plus (Setu, Startup School Platform)",
      date: "Sep 2026 – Present",
      badge: "Remote Execution",
      points: [
        "Manage Setu’s ongoing operations remotely alongside on-site role at Ecofone, handling project coordination, execution and stakeholder communication.",
        "Own product direction and delivery for the platform, scaling the LMS and startup ecosystem tools created during internship."
      ]
    },
    {
      title: "Founder Office Intern",
      company: "Hundred Plus (Setu, Startup School Platform)",
      date: "Feb 2026 – Sep 2026",
      badge: "0 → 1 Product Launch",
      points: [
        "Co-built Setu LMS 0→1, owning product architecture, feature scoping, GTM, UI/UX and in-house development.",
        "Built the website and 5+ startup ecosystem tools end-to-end, covering product strategy, tech-stack selection, design, development and deployment.",
        "Built 2,000+ structured records across VCs, incubators, grants and events, and generated 1,000+ leads for ecosystem outreach and research.",
        "Identified and secured $1,000 in AWS credits by researching startup programmes, evaluating infrastructure options and driving onboarding.",
        "Co-organised 3 events (200+ participants each), managing outreach, logistics, stakeholder coordination and on-ground execution."
      ]
    },
    {
      title: "Social Media & Marketing Intern",
      company: "Feeding Trends",
      date: "Nov 2025 – Jan 2026",
      badge: "Growth Analytics",
      points: [
        "Managed social media for Indian Golf Premier League (IGLP) and major players, growing engagement through data-driven content strategy and optimised posting schedules."
      ]
    },
    {
      title: "Growth & Marketing Intern",
      company: "TradeVed",
      date: "Aug 2025 – Oct 2025",
      badge: "Campaign Strategy",
      points: [
        "Designed and ran a 30-day multi-platform campaign (Instagram, Reddit, Ghost, LinkedIn, publications) that drove 20,000+ interactions.",
        "Built brand presence through creator collaborations, influencer outreach and offline activations."
      ]
    }
  ];

  const positionsOfResponsibility = [
    {
      role: "Head, Documentation, Research & Design",
      org: "Tesseract Club, IIT Madras",
      year: "2025",
      desc: "Led 1 major flagship event end-to-end, drafted sponsorship proposals and execution flows for 5+ events, and owned research, the design lifecycle and all club documentation."
    },
    {
      role: "Documentation Coordinator",
      org: "Boundless Travel Society, IIT Madras",
      year: "2025 – 2026",
      desc: "Managed 12+ events (May 2025–26), covering itinerary design, pre/post-event drafting, on-ground management, planning and official record maintenance."
    }
  ];

  return (
    <div className="p-4 sm:p-7 font-mono text-emerald-400 h-full overflow-y-auto custom-scrollbar space-y-8 select-text">
      {/* Terminal Command Header */}
      <div className="border-b border-emerald-500/20 pb-4">
        <p className="text-xs sm:text-sm text-emerald-300/80 flex items-center gap-2">
          <TerminalIcon size={14} className="text-purple-400" />
          <span className="text-purple-400 font-bold">ishaan@macbook-pro</span>:~$ cat experience.txt
        </p>
        <p className="text-xs text-white/50 mt-1 font-sans">
          Founder Office @ Ecofone · Project Associate @ Setu · IIM-B & IIT-M
        </p>
      </div>

      {/* Professional Experience List */}
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="border-l-2 border-emerald-500/40 pl-4 sm:pl-5 relative group">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
            
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {exp.title}
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans">
                {exp.badge}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-cyan-300 mb-3 flex flex-wrap justify-between items-center gap-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase size={13} /> {exp.company}
              </span>
              <span className="text-white/60 text-xs font-mono">{exp.date}</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-sans">
              {exp.points.map((point, j) => (
                <li key={j} className="leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-400 mt-1 text-xs">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Positions of Responsibility Section */}
      <div className="pt-6 border-t border-emerald-500/20">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck size={18} className="text-cyan-400" />
          <span>Positions of Responsibility (IIT Madras)</span>
        </h3>

        <div className="space-y-4">
          {positionsOfResponsibility.map((pos, k) => (
            <div key={k} className="bg-black/40 border border-white/10 rounded-xl p-4 font-sans space-y-1.5">
              <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm">
                <h4 className="font-bold text-white">{pos.role}</h4>
                <span className="text-emerald-400 font-mono text-xs">{pos.year}</span>
              </div>
              <p className="text-xs text-blue-300 font-medium">{pos.org}</p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-1">{pos.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Prompt Footer */}
      <div className="pt-4 flex items-center animate-pulse text-xs text-emerald-300/70">
        <span>ishaan@macbook-pro:~ $</span>
        <div className="w-2 h-4 bg-emerald-400 ml-2" />
      </div>
    </div>
  );
}
