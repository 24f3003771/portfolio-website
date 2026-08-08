export default function IframeApp({ url, fallbackText }: { url: string, fallbackText?: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full h-8 bg-gray-100 border-b border-gray-300 flex items-center px-4 text-xs text-gray-500">
        <span className="bg-gray-200 px-3 py-1 rounded-md w-full max-w-lg overflow-hidden text-ellipsis whitespace-nowrap">
          {url}
        </span>
      </div>
      <div className="flex-1 w-full h-full relative group">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Browser Window"
        />
        {fallbackText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-8 text-center backdrop-blur-sm z-50">
            <p className="mb-4 text-lg">{fallbackText}</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
            >
              Open in New Tab
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
