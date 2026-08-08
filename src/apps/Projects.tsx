export default function Projects() {
  const projects = [
    {
      title: "Nova Unplugged - Event Management Platform",
      stack: "Next.js · Node.js · PostgreSQL · Tailwind · QR Auth",
      desc: "Co-built from scratch to production in under 48 hours using AI-Assisted tools (Antigravity, Claude, Cursor, GLM). Features secure auth, event registration, QR-code gate entry, and full admin panel.",
      link: "nova-unplugged.dbeos.in",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "DBE-OS - Gamified Platform for IIM Bangalore",
      stack: "Full-Stack · Multi-Tool Dashboard · Gamification",
      desc: "Co-built a gamified platform for IIM Bangalore BBA DBE cohort. Features 6+ tools including CGPA Calculator, AI Resume Forge, and MatchForge Network delivered at full velocity using AI workflows.",
      link: "dbeos.in",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="h-40 w-full overflow-hidden">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{proj.title}</h3>
              <p className="text-xs text-blue-300 mb-3 font-mono">{proj.stack}</p>
              <p className="text-sm text-white/70 leading-relaxed mb-4">{proj.desc}</p>
              <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium backdrop-blur-sm transition-colors border border-white/10">
                Visit {proj.link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
