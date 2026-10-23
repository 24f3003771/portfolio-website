import { useState } from "react";
import { Heart, MapPin, Calendar, Camera, X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from "lucide-react";
import ishaanPhoto from "../assets/ishaan.jpg";

interface PhotoItem {
  id: number;
  title: string;
  location: string;
  date: string;
  category: "campus" | "portrait" | "journey";
  src: string;
  desc: string;
  cameraInfo: string;
}

export default function PhotosApp() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "campus" | "portrait">("all");
  const [likedPhotos, setLikedPhotos] = useState<number[]>([1]);

  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "IIM Bangalore Stone Architecture & Gallery",
      location: "Indian Institute of Management Bangalore",
      date: "October 2026",
      category: "campus",
      src: ishaanPhoto,
      desc: "Captured in front of the historic stone pillars and student achievement frames at IIM Bangalore.",
      cameraInfo: "iPhone 15 Pro · 24mm f/1.78 · ISO 50"
    },
    {
      id: 2,
      title: "Executive Portrait · Founder of DBE-OS",
      location: "Bengaluru, India",
      date: "September 2026",
      category: "portrait",
      src: ishaanPhoto,
      desc: "Official builder portrait for DBE-OS and Nova Unplugged platforms.",
      cameraInfo: "Portrait Mode · Studio Light · 48MP"
    },
    {
      id: 3,
      title: "Student Entrepreneur @ IIM-B & IIT-M",
      location: "Academic Block, IIMB",
      date: "August 2026",
      category: "campus",
      src: ishaanPhoto,
      desc: "Balancing Digital Business & Entrepreneurship at IIMB with Data Science at IIT Madras.",
      cameraInfo: "Natural Daylight · 35mm Equivalent"
    },
    {
      id: 4,
      title: "Builder & Product Architect",
      location: "Bengaluru Tech Hub",
      date: "2026",
      category: "portrait",
      src: ishaanPhoto,
      desc: "Building production-grade web applications at lightning velocity with AI-Assisted engineering.",
      cameraInfo: "High Resolution Portrait"
    }
  ];

  const filteredPhotos = activeTab === "all" 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  const toggleLike = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (likedPhotos.includes(id)) {
      setLikedPhotos(likedPhotos.filter(pId => pId !== id));
    } else {
      setLikedPhotos([...likedPhotos, id]);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className="w-full h-full bg-[#121214] text-white flex flex-col overflow-hidden select-none">
      {/* Apple Photos Header Navigation */}
      <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between shrink-0 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-cyan-400" />
          <span className="font-bold text-sm sm:text-base text-white">Photos</span>
          <span className="text-xs text-white/40 hidden sm:inline">· Ishaan Jha Library</span>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-md transition-all ${activeTab === "all" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            All Photos
          </button>
          <button
            onClick={() => setActiveTab("campus")}
            className={`px-3 py-1 rounded-md transition-all ${activeTab === "campus" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            IIM Bangalore
          </button>
          <button
            onClick={() => setActiveTab("portrait")}
            className={`px-3 py-1 rounded-md transition-all ${activeTab === "portrait" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            Portraits
          </button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        {/* Memories Header Banner */}
        <div className="mb-6 relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900/60 via-purple-900/50 to-slate-900/80 border border-white/10 p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-md shrink-0">
              <img src={ishaanPhoto} alt="Memory" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1">
                <Sparkles size={12} /> Featured Memory
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">IIM Bangalore Journey</h3>
              <p className="text-xs text-white/70">Student Entrepreneur & Full Stack Creator</p>
            </div>
          </div>
          <div className="text-xs text-white/60 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
            {photos.length} High-Res Moments
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 shadow-lg flex flex-col p-3 hover:bg-white/[0.08]"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden relative bg-black flex items-center justify-center">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Heart Like Button */}
                <button
                  onClick={(e) => toggleLike(photo.id, e)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  <Heart 
                    size={15} 
                    className={likedPhotos.includes(photo.id) ? "fill-rose-500 text-rose-500" : "text-white"} 
                  />
                </button>
              </div>

              {/* Clean Footer below Photo */}
              <div className="pt-3 pb-1 px-1 flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                  {photo.title}
                </span>
                <div className="flex items-center justify-between text-[11px] text-white/60 mt-1">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin size={11} className="text-cyan-400 shrink-0" /> {photo.location}
                  </span>
                  <span className="text-[10px] shrink-0 text-white/40">{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Lightbox Topbar */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-white/80">
              <span className="font-semibold text-white">{selectedPhoto.title}</span> · {selectedPhoto.date}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => toggleLike(selectedPhoto.id, e)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Heart size={18} className={likedPhotos.includes(selectedPhoto.id) ? "fill-rose-500 text-rose-500" : "text-white"} />
              </button>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Center Image with Previous/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center py-4" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-6 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all shadow-xl"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="max-w-md sm:max-w-lg max-h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>

            <button 
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-6 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all shadow-xl"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Bottom Info Card */}
          <div 
            className="max-w-md mx-auto w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-xs space-y-2 z-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/90 text-sm font-medium">{selectedPhoto.desc}</p>
            <div className="grid grid-cols-2 gap-2 text-white/70 pt-1 border-t border-white/10 text-[11px]">
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-cyan-400" /> {selectedPhoto.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-amber-400" /> {selectedPhoto.date}</span>
              <span className="flex items-center gap-1.5 col-span-2"><Camera size={12} className="text-emerald-400" /> {selectedPhoto.cameraInfo}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
