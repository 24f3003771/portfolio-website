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
                  <span className="text-purple-400 font-bold">🎓 Education:</span> BBA @ IIM Bangalore | BS @ IIT Madras
                </div>
                <div>
                  <span className="text-blue-400 font-bold">💼 Focus:</span> Business Strategy, Data Science & Tech
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
            <p>Student entrepreneur & builder pursuing BBA at IIM Bangalore and BS in Data Science at IIT Madras.</p>
            <p className="text-gray-400">Passionate about AI-directed development, growth strategy, and digital business creation.</p>
          </div>
        );
        break;

      case "skills":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-emerald-400 font-bold">🛠️ Skills & Expertise:</p>
            <p><span className="text-purple-300">Business & Strategy:</span> Digital Marketing, SEO, Social Media Analytics, Cold Email & Lead Gen, Apollo.io, Sales Automation</p>
            <p><span className="text-blue-300">Data & Tech:</span> Python (Pandas/NumPy), SQL, Advanced Excel, Next.js, Node.js, PostgreSQL, REST APIs</p>
          </div>
        );
        break;

      case "experience":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-yellow-300 font-bold">🏆 Key Achievements & Milestones:</p>
            <p>• Shipped <span className="text-white font-semibold">Nova Unplugged 0</span> to production in &lt;48 hours</p>
            <p>• <span className="text-emerald-400">Winner</span> - Big Bull (Finance Simulation, IIM Bangalore)</p>
            <p>• <span className="text-emerald-400">Winner</span> - Money Matrix Case Competition (IIT Madras)</p>
          </div>
        );
        break;

      case "projects":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-2 py-1">
            <p className="text-cyan-300 font-bold">🚀 Featured Projects:</p>
            <p>1. <span className="text-yellow-300 font-bold">DBE-OS</span> - Digital Business Ecosystem (dbeos.in)</p>
            <p>2. <span className="text-yellow-300 font-bold">Nova Unplugged</span> - Live Event Platform (nova-unplugged.dbeos.in)</p>
            <p className="text-gray-400 text-xs">Tip: Click their desktop or dock icons to open live preview windows!</p>
          </div>
        );
        break;

      case "contact":
        responseContent = (
          <div className="text-xs sm:text-sm font-mono text-gray-200 space-y-1 py-1">
            <p className="text-purple-300 font-bold">📬 Get in Touch:</p>
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
