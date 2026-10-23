import { useState, useRef, useEffect } from "react";
import { playClick } from "../utils/audio";

interface CommandLog {
  id: number;
  type: "banner" | "input" | "output";
  content: string | React.ReactNode;
}

export default function WelcomeTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome banner log
    setHistory([
      {
        id: 1,
        type: "banner",
        content: (
          <div className="space-y-4">
            <div className="text-cyan-400 font-bold tracking-wider leading-relaxed">
              <pre className="text-[10px] sm:text-xs font-mono select-none text-emerald-400">
{`  ___    _                      _ _            
 |_ _|__| |__   __ _  __ _ _ __  | | |__   __ _ 
  | |/ __| '_ \\ / _\` |/ _\` | '_ \\ | | '_ \\ / _\` |
  | |\\__ \\ | | | (_| | (_| | | | || | | | | (_| |
 |___|___/_| |_|\\__,_|\\__,_|_| |_|/ |_| |_|\\__,_|
                                |__/            `}
              </pre>
              <div className="mt-2 text-sm text-cyan-300">
                🚀 Welcome to <span className="text-yellow-300 font-bold">Ishaan Jha's Portfolio OS v2.0</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-xs sm:text-sm text-gray-300 font-mono">
              <p className="text-emerald-400 font-semibold">
                👋 Hello & Welcome! Thanks for visiting my interactive desktop portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-white/80">
                <div>
                  <span className="text-purple-400 font-bold">🎓 Education:</span> BBA @ IIM-B (2025–28) | BS @ IIT-M (2024–28)
                </div>
                <div>
                  <span className="text-blue-400 font-bold">💼 Role:</span> Founder Office @ Ecofone | Project Associate @ Setu
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs font-mono text-emerald-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-emerald-400">
                ⚡ Quick Tips:
              </p>
              <p>• Click any Desktop or Dock icon to open apps</p>
              <p>• Try live apps like <span className="text-yellow-300 font-semibold">DBE-OS</span> & <span className="text-yellow-300 font-semibold">Nova Unplugged</span></p>
              <p>• Adjust sound & system settings from the top Control Center</p>
            </div>

            <p className="text-xs text-gray-400 font-mono">
              Type <span className="text-yellow-300 font-bold">'help'</span> below to see all terminal commands!
            </p>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    playClick();

    const newLogs: CommandLog[] = [
      ...history,
      {
        id: Date.now(),
        type: "input",
        content: cmdStr
      }
    ];

    if (!trimmed) {
      setHistory(newLogs);
      setInputVal("");
      return;
    }

    let responseContent: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        responseContent = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-gray-300 py-1">
            <p className="text-yellow-300 font-bold mb-1">Available Commands:</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">about</span> - Brief bio & background</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">skills</span> - Key technical & strategy skills</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">experience</span> - Work experience & achievements</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">projects</span> - Featured projects & links</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">contact</span> - Email & social profiles</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">clear</span> - Clear terminal output</p>
          </div>
        );
        break;

      case "about":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-cyan-300 font-bold">👤 Ishaan Jha</p>
            <p>Founder Office @ Ecofone (On-site) | Project Associate @ Setu (Hundred Plus)</p>
            <p>BBA @ Indian Institute of Management Bangalore (2025–2028) | BS @ IIT Madras (2024–2028)</p>
            <p className="text-gray-400">Directing tech, sales and marketing teams while shipping 0→1 products using AI-Assisted workflows.</p>
          </div>
        );
        break;

      case "skills":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-emerald-400 font-bold">🛠️ Skills & Expertise:</p>
            <p><span className="text-purple-300">Business & Strategy:</span> Team Leadership (30-member team), Cross-Functional Ops, Business Modelling, Revenue Strategy, Digital Marketing, SEO, Social Media Analytics, Cold Email & Lead Gen, Sales Automation, Apollo.io, LinkedIn Sales Navigator, Canva (Advanced), Scriptwriting</p>
            <p><span className="text-blue-300">Data & Tech:</span> Python, SQL, CLI, Google Workspace, Supabase, AWS (Cost Optimisation & Startup Credits), Next.js, Node.js, PostgreSQL, REST APIs, AI-Directed Dev (Claude, Cursor, Antigravity, OpenClaw, GLM)</p>
          </div>
        );
        break;

      case "experience":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-yellow-300 font-bold">💼 Professional Experience:</p>
            <p>• <span className="text-white font-semibold">Ecofone:</span> Founder Office (Mid-Sep 2026 – Present) — Lead 30-member team, cut AWS costs ~₹3k/mo, built GST billing software, redesigned website.</p>
            <p>• <span className="text-white font-semibold">Hundred Plus (Setu):</span> Project Associate (Sep 2026 – Present) & Founder Office Intern (Feb 2026 – Sep 2026) — 0→1 LMS, 5+ startup tools, $1,000 AWS credits, 2k+ records, 3 events.</p>
            <p>• <span className="text-white font-semibold">Feeding Trends:</span> Social Media Intern (Nov 2025 – Jan 2026) — IGLP campaign growth.</p>
            <p>• <span className="text-white font-semibold">TradeVed:</span> Growth & Marketing Intern (Aug 2025 – Oct 2025) — 20k+ interactions.</p>
            <p className="text-yellow-300 font-bold pt-1">🏆 Awards & Recognition:</p>
            <p>• Winner — Big Bull (Finance Simulation), Nova '25, IIM Bangalore</p>
            <p>• 2nd Runner-Up — Illusion Inc (Deceptive Strategy), Nova '25, IIM Bangalore</p>
            <p>• Winner — Money Matrix Case Competition, Saavan '25, IIT Madras</p>
          </div>
        );
        break;

      case "projects":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-cyan-300 font-bold">🚀 Featured Projects:</p>
            <p>1. <span className="text-yellow-300 font-bold">Nova Unplugged:</span> Event platform shipped in &lt;48h, 500+ users, Google ranked (nova-unplugged.dbeos.in)</p>
            <p>2. <span className="text-yellow-300 font-bold">DBE-OS:</span> Gamified platform for 3,000+ IIM-B students with 6+ tools (dbeos.in)</p>
            <p>3. <span className="text-yellow-300 font-bold">Ecofone Billing Software:</span> Enterprise-grade GST-compliant invoicing system</p>
            <p>4. <span className="text-yellow-300 font-bold">Cosmologia 3D:</span> 3D celestial observatory with real-time AR holographic view</p>
          </div>
        );
        break;

      case "contact":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-1 py-1">
            <p className="text-purple-300 font-bold">📬 Get in Touch:</p>
            <p>• Phone: <a href="tel:+918299147213" className="text-emerald-400 underline">+91 82991 47213</a></p>
            <p>• Email: <a href="mailto:ishaanjha.in@gmail.com" className="text-blue-400 underline">ishaanjha.in@gmail.com</a></p>
            <p>• LinkedIn: <a href="https://linkedin.com/in/ishaanjha-2b6977340" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/ishaanjha-2b6977340</a></p>
            <p>• GitHub: <a href="https://github.com/24f3003771" target="_blank" rel="noreferrer" className="text-blue-400 underline">github.com/24f3003771</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        responseContent = (
          <p className="text-red-400 text-xs sm:text-sm font-mono">
            zsh: command not found: {trimmed}. Type <span className="text-yellow-300 font-bold">'help'</span> for a list of available commands.
          </p>
        );
    }

    newLogs.push({
      id: Date.now() + 1,
      type: "output",
      content: responseContent
    });

    setHistory(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="h-full w-full bg-[#0d1117] text-gray-100 font-mono p-4 overflow-y-auto flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <div className="space-y-4">
        {history.map((log) => (
          <div key={log.id} className="space-y-1">
            {log.type === "input" && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400">
                <span className="text-purple-400">ishaan@macbook-pro</span>
                <span className="text-gray-400">:~ $</span>
                <span className="text-white font-normal">{log.content}</span>
              </div>
            )}
            {log.type !== "input" && <div>{log.content}</div>}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono pt-2">
          <span className="text-purple-400 font-bold">ishaan@macbook-pro</span>
          <span className="text-gray-400 font-bold">:~ $</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyan-400 text-xs sm:text-sm"
            placeholder="type 'help' or command..."
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
