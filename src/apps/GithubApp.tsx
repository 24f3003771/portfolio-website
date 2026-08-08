import { MapPin, Users, Building, Link as LinkIcon, Star, GitBranch } from "lucide-react";

export default function GithubApp() {
  return (
    <div className="w-full h-full bg-[#0d1117] text-[#c9d1d9] overflow-y-auto">
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8">
        
        {/* Sidebar */}
        <div className="flex flex-col gap-4 md:w-1/4">
          <img 
            src="https://avatars.githubusercontent.com/u/12345678?v=4" // Placeholder, maybe user doesn't have a specific avatar URL mapped yet, I'll use a generic or Github's default
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
            }}
            alt="Ishaan Jha"
            className="w-48 h-48 rounded-full border border-[#30363d]"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Ishaan Jha</h1>
            <h2 className="text-xl text-[#8b949e] font-light">ishaanjha</h2>
          </div>
          <button className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] rounded-md py-1 font-medium transition-colors">
            Follow
          </button>
          <div className="flex flex-col gap-1 text-sm mt-4">
            <div className="flex items-center gap-2"><Users size={16} className="text-[#8b949e]" /> <span className="text-white font-bold">12</span> followers · <span className="text-white font-bold">15</span> following</div>
            <div className="flex items-center gap-2 mt-2"><Building size={16} className="text-[#8b949e]" /> Indian Institute of Management</div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-[#8b949e]" /> Bengaluru, India</div>
            <div className="flex items-center gap-2"><LinkIcon size={16} className="text-[#8b949e]" /> <a href="https://dbeos.in" className="hover:text-blue-400 hover:underline">dbeos.in</a></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="border-b border-[#21262d] pb-2 flex gap-4 text-sm">
            <div className="pb-2 border-b-2 border-[#f78166] font-semibold text-white">Overview</div>
            <div className="pb-2 text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer transition-colors">Repositories <span className="bg-[#21262d] text-xs px-2 py-0.5 rounded-full ml-1">24</span></div>
            <div className="pb-2 text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer transition-colors">Projects</div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Pinned</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="border border-[#30363d] rounded-md p-4 flex flex-col gap-2 bg-[#0d1117]">
                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold">
                  <GitBranch size={16} /> DBE-OS
                </div>
                <p className="text-sm text-[#8b949e]">The core operating system interface built for DBE.</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-auto">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> JavaScript</div>
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><Star size={14} /> 12</div>
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><GitBranch size={14} /> 2</div>
                </div>
              </div>

              <div className="border border-[#30363d] rounded-md p-4 flex flex-col gap-2 bg-[#0d1117]">
                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold">
                  <GitBranch size={16} /> Nova-Unplugged
                </div>
                <p className="text-sm text-[#8b949e]">Event management and scheduling application.</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-auto">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> TypeScript</div>
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><Star size={14} /> 8</div>
                  <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><GitBranch size={14} /> 1</div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-center p-10 border border-[#30363d] rounded-xl border-dashed">
             <p className="mb-4">Want to see the real GitHub profile?</p>
             <a 
              href="https://github.com/24f3003771" 
              target="_blank"
              rel="noreferrer"
              className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              View on GitHub.com
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}
