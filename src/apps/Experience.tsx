export default function Experience() {
  const experiences = [
    {
      title: "Founder Office Intern",
      company: "Hundred Plus (Setu)",
      date: "Feb 2026 - Present",
      points: [
        "Core team member building Setu, a full-stack LMS + startup school for student entrepreneurs.",
        "Owning product architecture, feature scoping, and GTM strategy.",
        "Coordinating cross-functional delivery (design, dev, content) and running founder-community programs."
      ]
    },
    {
      title: "Operations Intern",
      company: "Feeding Trends",
      date: "Nov 2025 - Jan 2026",
      points: [
        "Managed client social media handles end-to-end.",
        "Executed data-driven engagement strategies improving community interaction and algorithmic visibility."
      ]
    },
    {
      title: "Growth & Marketing Intern",
      company: "TradeVed",
      date: "Aug 2025 - Oct 2025",
      points: [
        "Ran high-volume lead-generation campaigns via cold outreach.",
        "Authored high-conversion reel scripts and supported influencer collaboration."
      ]
    }
  ];

  return (
    <div className="p-6 font-mono text-green-400 h-full overflow-y-auto">
      <p className="mb-6 opacity-70">ishaan@macbook-pro ~ % cat experience.txt</p>
      
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div key={i} className="border-l-2 border-green-500/30 pl-4">
            <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
            <div className="text-sm text-green-300 mb-3 flex justify-between">
              <span>@ {exp.company}</span>
              <span className="opacity-70">{exp.date}</span>
            </div>
            <ul className="space-y-2 text-sm opacity-80 list-disc list-inside">
              {exp.points.map((point, j) => (
                <li key={j} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex items-center animate-pulse">
        <span className="opacity-70">ishaan@macbook-pro ~ %</span>
        <div className="w-2 h-4 bg-white ml-2"></div>
      </div>
    </div>
  );
}
