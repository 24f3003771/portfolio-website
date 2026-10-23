import { Mail, Phone, CheckCircle2, Award, GraduationCap, Sparkles, Briefcase, ExternalLink } from "lucide-react";
import ishaanPhoto from "../assets/ishaan.jpg";

export default function AboutMe() {
  return (
    <div className="flex flex-col items-center justify-start min-h-full p-4 sm:p-7 text-center space-y-6 overflow-y-auto custom-scrollbar">
      {/* Profile Avatar with Apple-style Ring */}
      <div className="relative group pt-2">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl relative z-10 ring-4 ring-blue-500/30">
          <img 
            src={ishaanPhoto} 
            alt="Ishaan Jha" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute bottom-0 right-1 z-20 bg-blue-500 text-white rounded-full p-1 shadow-lg border-2 border-black flex items-center justify-center" title="Verified Profile">
          <CheckCircle2 size={18} className="fill-blue-500 text-white" />
        </div>
      </div>

      {/* Name and Tagline */}
      <div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ishaan Jha</h1>
          <Sparkles size={18} className="text-amber-400" />
        </div>
        <p className="text-sm sm:text-base text-cyan-300 font-medium mt-1">
          Founder Office @ Ecofone · Project Associate @ Setu
        </p>
        <p className="text-xs sm:text-sm text-white/70 mt-0.5">
          Student @ IIM Bangalore (2025–28) & IIT Madras (2024–28)
        </p>
      </div>

      {/* Quick Education & Leadership Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <GraduationCap size={13} /> IIM Bangalore (BBA DBE '28)
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <GraduationCap size={13} /> IIT Madras (BS Data Science '28)
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          <Briefcase size={13} /> Founder Office @ Ecofone
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Award size={13} /> Founder @ DBE-OS
        </span>
      </div>

      {/* Bio Summary Card */}
      <div className="bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 w-full max-w-lg text-xs sm:text-sm text-white/90 leading-relaxed shadow-xl text-left space-y-3">
        <p>
          I lead cross-functional operations and business modeling at <span className="text-white font-semibold">Ecofone</span> (on-site, managing a 30-member team across Tech, Sales & Marketing), while driving product direction remotely as Project Associate at <span className="text-white font-semibold">Setu (Hundred Plus)</span>.
        </p>
        <p className="text-white/70 text-xs">
          Passionate about <span className="text-cyan-300 font-medium">AI-Directed Development</span>, cost-optimization, data science, and rapidly shipping 0→1 products (co-built Nova Unplugged in &lt;48h, DBE-OS for 3,000+ students, and enterprise billing systems).
        </p>
      </div>

      {/* Contact Cards (Phone, Email, LinkedIn) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
        <a 
          href="tel:+918299147213"
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
            <Phone size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] text-white/50 uppercase font-semibold">Phone</div>
            <div className="text-xs text-white font-medium truncate">+91 82991 47213</div>
          </div>
        </a>

        <a 
          href="mailto:ishaanjha.in@gmail.com"
          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
            <Mail size={16} />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] text-white/50 uppercase font-semibold">Email</div>
            <div className="text-xs text-white font-medium truncate">ishaanjha.in@gmail.com</div>
          </div>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center pt-1 w-full max-w-lg">
        <a 
          href="https://linkedin.com/in/ishaanjha-2b6977340" 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 min-w-[130px] px-4 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all shadow-md flex items-center justify-center gap-1.5"
        >
          LinkedIn <ExternalLink size={13} />
        </a>
        <a 
          href="https://github.com/24f3003771" 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1 min-w-[130px] px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all border border-white/10 flex items-center justify-center gap-1.5"
        >
          GitHub <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
