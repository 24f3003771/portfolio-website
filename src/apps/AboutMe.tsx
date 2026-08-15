export default function AboutMe() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center space-y-6">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
        <img 
          src="https://avatars.githubusercontent.com/u/100000000?v=4" 
          alt="Ishaan Jha" 
          className="w-full h-full object-cover bg-white"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Ishaan Jha</h1>
        <p className="text-lg text-white/70">BBA @ IIM Bangalore | BS @ IIT Madras</p>
      </div>
      
      <div className="bg-black/30 p-4 rounded-xl border border-white/10 w-full max-w-md text-sm text-white/80 leading-relaxed">
        <p>
          I am a driven student entrepreneur and builder, passionate about Data Science and Business Strategy. Currently focusing on Digital Business at IIM Bangalore and Data Science at IIT Madras. 
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <a href="https://github.com/24f3003771" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors border border-white/10">
          GitHub
        </a>
        <a href="https://linkedin.com/in/ishaanjha-2b6977340" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg backdrop-blur-sm transition-colors border border-blue-500/20">
          LinkedIn
        </a>
        <a href="mailto:ishaanjha.in@gmail.com" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors border border-white/10">
          Email
        </a>
      </div>
    </div>
  );
}
