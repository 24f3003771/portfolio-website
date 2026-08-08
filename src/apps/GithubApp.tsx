import { MapPin, Users, Building, Link as LinkIcon, Star, GitBranch, BookOpen } from "lucide-react";

export default function GithubApp() {
  return (
    <div className="w-full h-full bg-[#0d1117] text-[#c9d1d9] overflow-y-auto">
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 max-w-[1200px] mx-auto">
        
        {/* Sidebar */}
        <div className="flex flex-col gap-4 md:w-1/4 shrink-0">
          <img 
            src="https://github.com/24f3003771.png" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
            }}
            alt="Ishaan Jha"
            className="w-48 h-48 rounded-full border border-[#30363d] z-10 relative object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Ishaan Jha</h1>
            <h2 className="text-xl text-[#8b949e] font-light">24f3003771</h2>
          </div>
          <button className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] rounded-md py-1.5 font-medium transition-colors text-sm">
            Follow
          </button>
          
          <div className="flex flex-col gap-1 text-sm mt-2">
            <div className="flex items-center gap-2"><Users size={16} className="text-[#8b949e]" /> <span className="text-white font-bold">7</span> followers · <span className="text-white font-bold">3</span> following</div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#21262d]">
            <h3 className="text-sm font-semibold text-white mb-2">Achievements</h3>
            <div className="flex gap-2">
              <img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" alt="Pull Shark" className="w-14 h-14" />
              <img src="https://github.githubassets.com/assets/yolo-default-be03fd961922.png" alt="YOLO" className="w-14 h-14" />
              <img src="https://github.githubassets.com/assets/quickdraw-default-39c6aec83c31.png" alt="Quickdraw" className="w-14 h-14" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#21262d]">
            <h3 className="text-sm font-semibold text-white mb-2">Highlights</h3>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-[#8b949e]" />
              <span className="border border-purple-500 text-purple-400 text-xs px-2 py-0.5 rounded-full font-semibold">PRO</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="border-b border-[#21262d] pb-2 flex gap-4 text-sm overflow-x-auto whitespace-nowrap">
            <div className="pb-2 border-b-2 border-[#f78166] font-semibold text-white flex items-center gap-2">
              <BookOpen size={16} /> Overview
            </div>
            <div className="pb-2 text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer transition-colors flex items-center gap-2">
              <GitBranch size={16} /> Repositories <span className="bg-[#21262d] text-xs px-2 py-0.5 rounded-full">24</span>
            </div>
            <div className="pb-2 text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer transition-colors">Projects</div>
          </div>

          {/* README Section */}
          <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117] prose prose-invert max-w-none">
            <h2 className="text-white border-b border-[#21262d] pb-2 text-xl font-bold flex items-center justify-between">
              <span>24f3003771 / README.md</span>
              <img src="https://komarev.com/ghpvc/?username=24f3003771&icon=0&color=0" alt="Profile Views" className="h-5" />
            </h2>
            
            <div className="mt-4 flex flex-col gap-8">
              
              {/* Trophies & Stats */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">🏆 GitHub Trophies & Stats</h3>
                <div className="overflow-hidden mb-4">
                  <img src="https://github-profile-trophy.vercel.app/?username=24f3003771&theme=transparent&no-frame=false&no-bg=false&margin-w=4" alt="Trophies" className="max-w-full" />
                </div>
                
                <div className="flex flex-wrap gap-4 items-start">
                  <img src="https://github-readme-stats.shion.dev/api?username=24f3003771&theme=dark&hide_border=false&include_all_commits=true&count_private=true" alt="Stats" className="max-w-full" />
                  <img src="https://streak-stats.demolab.com/?user=24f3003771&theme=dark&hide_border=false" alt="Streak" className="max-w-full" />
                  <img src="https://github-readme-stats.shion.dev/api/top-langs/?username=24f3003771&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact" alt="Languages" className="max-w-full" />
                  <img src="https://github-contributor-stats.vercel.app/api?username=24f3003771&limit=5&theme=dark&combine_all_yearly_contributions=true" alt="Top Contributed" className="max-w-full" />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">💻 Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white",
                    "PowerShell-%235391FE.svg?style=flat&logo=powershell&logoColor=white",
                    "python-3670A0?style=flat&logo=python&logoColor=ffdd54",
                    "typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white",
                    "AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white",
                    "netlify-%23000000.svg?style=flat&logo=netlify&logoColor=#00C7B7",
                    "vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white",
                    "flask-%23000.svg?style=flat&logo=flask&logoColor=white",
                    "Flutter-%2302569B.svg?style=flat&logo=Flutter&logoColor=white",
                    "jinja-white.svg?style=flat&logo=jinja&logoColor=black",
                    "Next-black?style=flat&logo=next.js&logoColor=white",
                    "react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB",
                    "react_native-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB",
                    "tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white",
                    "WordPress-%23117AC9.svg?style=flat&logo=WordPress&logoColor=white",
                    "vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white",
                    "Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white",
                    "sqlite-%2307405e.svg?style=flat&logo=sqlite&logoColor=white",
                    "MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white",
                    "mysql-4479A1.svg?style=flat&logo=mysql&logoColor=white",
                    "Prisma-3982CE?style=flat&logo=Prisma&logoColor=white",
                    "Git-%23F05033.svg?style=flat&logo=git&logoColor=white",
                    "Postman-FF6C37?style=flat&logo=postman&logoColor=white"
                  ].map((badge, i) => (
                    <img key={i} src={`https://img.shields.io/badge/${badge}`} alt="tech badge" className="h-6" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Pinned</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              
              <a href="https://github.com/24f3003771/DBE-OS" target="_blank" rel="noreferrer" className="border border-[#30363d] rounded-md p-4 flex flex-col gap-2 bg-[#0d1117] hover:border-[#8b949e] transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold group-hover:underline">
                  <GitBranch size={16} /> DBE-OS
                </div>
                <p className="text-sm text-[#8b949e]">The core operating system interface built for DBE.</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-auto">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> JavaScript</div>
                  <div className="flex items-center gap-1"><Star size={14} /> 12</div>
                  <div className="flex items-center gap-1"><GitBranch size={14} /> 2</div>
                </div>
              </a>

              <a href="https://github.com/24f3003771/Nova-Unplugged" target="_blank" rel="noreferrer" className="border border-[#30363d] rounded-md p-4 flex flex-col gap-2 bg-[#0d1117] hover:border-[#8b949e] transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold group-hover:underline">
                  <GitBranch size={16} /> Nova-Unplugged
                </div>
                <p className="text-sm text-[#8b949e]">Event management and scheduling application.</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-auto">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> TypeScript</div>
                  <div className="flex items-center gap-1"><Star size={14} /> 8</div>
                  <div className="flex items-center gap-1"><GitBranch size={14} /> 1</div>
                </div>
              </a>

            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-center p-10 border border-[#30363d] rounded-xl border-dashed">
             <a 
              href="https://github.com/24f3003771" 
              target="_blank"
              rel="noreferrer"
              className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              View Full Profile on GitHub.com
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}
