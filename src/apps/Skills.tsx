export default function Skills() {
  const skillCategories = [
    {
      title: "Business & Strategy",
      skills: ["Digital Marketing", "SEO", "Social Media Analytics", "Content Strategy", "Copywriting", "Cold Email & Lead Generation", "Sales Automation", "Apollo.io", "LinkedIn Sales Navigator", "Canva", "Scriptwriting"]
    },
    {
      title: "Data & Technology",
      skills: ["Python (Pandas/NumPy)", "SQL", "Excel (Advanced Pivot Tables)", "Google Workspace", "AI-Directed Development", "Next.js", "Node.js", "PostgreSQL", "REST APIs"]
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto flex flex-col gap-8">
      {skillCategories.map((cat, i) => (
        <div key={i} className="bg-black/20 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {cat.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill, j) => (
              <span 
                key={j} 
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors hover:text-white cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10 mt-auto">
        <h3 className="font-bold text-white mb-2">Key Achievements</h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li>🏆 Shipped Nova Unplugged 0 to Production in under 48 hours</li>
          <li>📈 Winner - Big Bull (Finance Simulation, IIM Bangalore)</li>
          <li>🥇 Winner - Money Matrix Case Competition (IIT Madras)</li>
        </ul>
      </div>
    </div>
  );
}
