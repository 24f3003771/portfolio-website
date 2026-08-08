import type { ReactNode } from "react";
import { Smile, FileText, Compass, Terminal, GitBranch, Briefcase, Mail, Globe, Calendar } from "lucide-react";

export interface AppConfig {
  id: string;
  name: string;
  icon: ReactNode;
  bgClass: string;
  inDock: boolean; // true = keep in dock on mobile, false = show on desktop
}

export const APPS_CONFIG: AppConfig[] = [
  { 
    id: "finder", 
    name: "About Me", 
    icon: <Smile size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-blue-400 to-blue-600",
    inDock: true
  },
  { 
    id: "safari", 
    name: "Projects", 
    icon: <Compass size={28} className="text-blue-500" />,
    bgClass: "bg-gradient-to-br from-gray-50 to-gray-200",
    inDock: true
  },
  { 
    id: "terminal", 
    name: "Skills", 
    icon: <Terminal size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-gray-800 to-black border border-gray-700",
    inDock: true
  },
  {
    id: "mail",
    name: "Mail",
    icon: <Mail size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-cyan-400 to-blue-500",
    inDock: true
  },
  { 
    id: "notes", 
    name: "Experience", 
    icon: <FileText size={28} className="text-yellow-600" />,
    bgClass: "bg-gradient-to-br from-yellow-100 to-yellow-300",
    inDock: false
  },
  {
    id: "github",
    name: "GitHub",
    icon: <GitBranch size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-gray-800 to-black border border-gray-700",
    inDock: false
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Briefcase size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-blue-500 to-blue-700",
    inDock: false
  },
  {
    id: "dbeos",
    name: "DBE-OS",
    icon: <Globe size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-purple-500 to-indigo-600",
    inDock: false
  },
  {
    id: "nova",
    name: "Nova Unplugged",
    icon: <Calendar size={28} className="text-white" />,
    bgClass: "bg-gradient-to-br from-orange-400 to-red-500",
    inDock: false
  }
];
