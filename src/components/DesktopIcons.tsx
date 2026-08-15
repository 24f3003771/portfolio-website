import { APPS_CONFIG } from "../config/apps";

export default function DesktopIcons({ onOpen }: { onOpen: (id: string) => void }) {
  const desktopApps = APPS_CONFIG.filter((app) => !app.inDock);

  return (
    <div className="absolute inset-0 pt-12 px-4 pb-24 grid grid-cols-4 sm:grid-cols-1 content-start gap-y-6 gap-x-2 z-0 pointer-events-none w-full sm:w-auto sm:top-10 sm:right-4 sm:left-auto sm:pt-4 sm:px-4 sm:grid-flow-col sm:grid-rows-[repeat(6,100px)]">
      {desktopApps.map((app) => (
        <div
          key={app.id}
          className="pointer-events-auto flex flex-col items-center gap-1 cursor-pointer group w-full sm:w-20 h-24"
          onClick={() => onOpen(app.id)}
        >
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 ${app.bgClass}`}>
            {app.icon}
          </div>
          <span className="text-white text-[10px] sm:text-xs text-center drop-shadow-md font-medium px-1 rounded bg-black/20 group-hover:bg-blue-500/80 line-clamp-2 w-full truncate">
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
}
