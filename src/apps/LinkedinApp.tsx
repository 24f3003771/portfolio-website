import { MapPin, Building, Briefcase, ExternalLink, Award, GraduationCap, ShieldCheck } from "lucide-react";
import ishaanPhoto from "../assets/ishaan.jpg";

export default function LinkedinApp() {
  return (
    <div className="w-full h-full bg-[#f3f2ef] text-black overflow-y-auto custom-scrollbar select-text">
      <div className="max-w-4xl mx-auto py-6 sm:py-8 px-3 sm:px-4 flex flex-col gap-4">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 relative p-4 flex items-end justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-white/90 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              IIM Bangalore '28 · IIT Madras '28
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full backdrop-blur-md border border-emerald-500/30">
              Open to Collaborative Ventures
            </span>
          </div>
          <div className="px-4 sm:px-6 pb-6 relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-white absolute -top-14 sm:-top-18 shadow-md overflow-hidden">
              <img 
                src={ishaanPhoto} 
                alt="Ishaan Jha" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-end pt-3 sm:pt-4 gap-2">
              <a 
                href="https://linkedin.com/in/ishaanjha-2b6977340"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#0a66c2] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#004182] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Connect on LinkedIn <ExternalLink size={13} />
              </a>
            </div>

            <div className="mt-6 sm:mt-7">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Ishaan Jha</h1>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">1st</span>
              </div>
              <p className="text-sm sm:text-base text-gray-800 mt-1 font-medium">
                Founder Office @ Ecofone (On-site) | Project Associate @ Setu (Hundred Plus)
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                BBA @ Indian Institute of Management Bangalore · BS @ Indian Institute of Technology Madras
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2.5">
                <span className="flex items-center gap-1"><MapPin size={13} /> Bengaluru, Karnataka, India</span>
                <span>• 500+ connections</span>
                <span className="text-[#0a66c2] font-semibold cursor-pointer">Contact info: ishaanjha.in@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase size={20} className="text-[#0a66c2]" /> Experience
          </h2>
          
          {/* Ecofone */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border border-emerald-200">
              ECO
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Founder Office (On-site)</h3>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Ecofone · Full-time</p>
              <p className="text-xs text-gray-500">Mid-Sep 2026 – Present · Bengaluru, India</p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 pt-1 list-disc list-inside">
                <li>Lead and coordinate a 30-member team across Tech, Marketing and Sales, overseeing daily operations of each department.</li>
                <li>Defined new business models and strategic changes to scale revenue, and restructured existing plans to improve efficiency and execution.</li>
                <li>Cut technical costs (hosting, database and infrastructure) by ~₹3,000/month by identifying and securing AWS startup programme benefits.</li>
                <li>Helped design and build an enterprise-grade, GST-compliant billing software for the Indian market.</li>
                <li>Redesigned the company website, improving its look, structure and user experience.</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Setu Project Associate */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border border-blue-200">
              SETU
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Project Associate</h3>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Hundred Plus (Setu, Startup School Platform) · Part-time</p>
              <p className="text-xs text-gray-500">Sep 2026 – Present · Remote</p>
              <p className="text-xs sm:text-sm text-gray-700">
                Manage Setu’s ongoing operations remotely alongside my on-site role at Ecofone, handling project coordination, execution and stakeholder communication. Own product direction and delivery for the platform, building on the LMS and ecosystem tools created during my internship.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Setu Founder Office Intern */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border border-blue-200">
              SETU
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Founder Office Intern</h3>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Hundred Plus (Setu, Startup School Platform)</p>
              <p className="text-xs text-gray-500">Feb 2026 – Sep 2026 · 8 mos · Bengaluru</p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 pt-1 list-disc list-inside">
                <li>Co-built Setu LMS 0→1, owning product architecture, feature scoping, GTM, UI/UX and in-house development.</li>
                <li>Built the website and 5+ startup ecosystem tools end-to-end, covering product strategy, tech-stack selection, design, development and deployment.</li>
                <li>Built 2,000+ structured records across VCs, incubators, grants and events, and generated 1,000+ leads for ecosystem outreach and research.</li>
                <li>Identified and secured $1,000 in AWS credits by researching startup programmes, evaluating infrastructure options and driving onboarding.</li>
                <li>Co-organised 3 events (200+ participants each), managing outreach, logistics, stakeholder coordination and on-ground execution.</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Feeding Trends */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border border-purple-200">
              FT
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Intern</h3>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Feeding Trends</p>
              <p className="text-xs text-gray-500">Nov 2025 – Jan 2026 · 3 mos</p>
              <p className="text-xs sm:text-sm text-gray-700">
                Managed social media for Indian Golf Premier League (IGLP) and major players, growing engagement through data-driven content strategy and optimised posting schedules.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* TradeVed */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border border-amber-200">
              TV
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Growth & Marketing Intern</h3>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">TradeVed</p>
              <p className="text-xs text-gray-500">Aug 2025 – Oct 2025 · 3 mos</p>
              <p className="text-xs sm:text-sm text-gray-700">
                Designed and ran a 30-day multi-platform campaign (Instagram, Reddit, Ghost, LinkedIn, publications) that drove 20,000+ interactions. Built brand presence through creator collaborations, influencer outreach and offline activations.
              </p>
            </div>
          </div>
        </div>

        {/* Education Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap size={20} className="text-[#0a66c2]" /> Education
          </h2>
          
          {/* IIMB */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden p-1 shadow-sm">
              <img src="/iimb-logo.png" alt="IIM Bangalore" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Indian Institute of Management Bangalore (IIM-B)</h3>
              <p className="text-gray-800 text-xs sm:text-sm">BBA in Digital Business & Entrepreneurship</p>
              <p className="text-xs text-gray-500">2025 – 2028</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* IITM */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden p-1 shadow-sm">
              <img src="/iitm-logo.png" alt="IIT Madras" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Indian Institute of Technology Madras (IIT-M)</h3>
              <p className="text-gray-800 text-xs sm:text-sm">BS in Data Science & Applications</p>
              <p className="text-xs text-gray-500">2024 – 2028</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* High School */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-200">
              <Building size={22} className="text-slate-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">SR Global School</h3>
              <p className="text-gray-800 text-xs sm:text-sm">Class XII, CBSE Science (PCMB)</p>
              <p className="text-xs text-gray-500">2024</p>
            </div>
          </div>
        </div>

        {/* Honors & Awards */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award size={20} className="text-amber-500" /> Honors & Awards
          </h2>
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <span className="text-amber-500 font-bold text-base">🥇</span>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Winner — Big Bull (Finance Simulation)</h4>
                <p className="text-xs text-gray-600">Nova '25, IIM Bangalore</p>
                <p className="text-xs text-gray-700 mt-0.5">Outperformed all peers in a stock-trading simulation through data-driven market analysis and positioning.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold text-base">🥉</span>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">2nd Runner-Up — Illusion Inc (Deceptive Strategy)</h4>
                <p className="text-xs text-gray-600">Nova '25, IIM Bangalore</p>
                <p className="text-xs text-gray-700 mt-0.5">Designed a convincing pseudo-business model and demonstrated persuasive marketing and loophole strategy.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-base">🏆</span>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Winner — Money Matrix Case Competition</h4>
                <p className="text-xs text-gray-600">Saavan '25, IIT Madras</p>
                <p className="text-xs text-gray-700 mt-0.5">1st place in a rigorous financial case competition, demonstrating sharp analytical problem-solving under pressure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Positions of Responsibility */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-600" /> Positions of Responsibility
          </h2>
          <div className="space-y-3.5">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Head, Documentation, Research & Design — Tesseract Club, IIT Madras</h4>
              <p className="text-xs text-gray-500 font-medium">2025</p>
              <p className="text-xs text-gray-700 mt-1">Led 1 major flagship event end-to-end, drafted sponsorship proposals and full execution flows for 5+ events, and owned research, the design lifecycle and all club documentation.</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Documentation Coordinator — Boundless Travel Society, IIT Madras</h4>
              <p className="text-xs text-gray-500 font-medium">2025 – 2026</p>
              <p className="text-xs text-gray-700 mt-1">Managed 12+ events (May 2025–26), covering itinerary design, pre/post-event drafting, on-ground management, planning and official record maintenance.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
