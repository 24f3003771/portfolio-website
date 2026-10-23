import { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  FolderDown, 
  Info 
} from "lucide-react";
import ishaanPhoto from "../assets/ishaan.jpg";

export interface PhotoItem {
  id: string;
  title: string;
  location: string;
  date: string;
  category: "all" | "campus" | "portrait" | "custom";
  src: string;
  desc: string;
  cameraInfo: string;
  isCustom?: boolean;
}

// Automatically load all image files placed in src/assets/gallery/
const autoImportedGallery = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}",
  { eager: true, import: "default" }
) as Record<string, string>;

export default function PhotosApp() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "campus" | "portrait" | "custom">("all");
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);
  const [showFolderInfo, setShowFolderInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize photos from folder auto-imports + localStorage + manifest
  useEffect(() => {
    const list: PhotoItem[] = [];

    // 1. Process files from src/assets/gallery/
    Object.entries(autoImportedGallery).forEach(([path, url], index) => {
      const filenameWithExt = path.split("/").pop() || `photo_${index}`;
      const nameOnly = filenameWithExt.replace(/\.[^/.]+$/, "");
      const cleanTitle = nameOnly
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      list.push({
        id: `folder-${index}-${nameOnly}`,
        title: cleanTitle || "Campus Moment",
        location: "IIM Bangalore",
        date: "October 2026",
        category: nameOnly.toLowerCase().includes("portrait") ? "portrait" : "campus",
        src: url,
        desc: `Image loaded directly from folder: src/assets/gallery/${filenameWithExt}`,
        cameraInfo: "Shot on iPhone · High Resolution"
      });
    });

    // Fallback if gallery folder was empty
    if (list.length === 0) {
      list.push({
        id: "default-1",
        title: "IIM Bangalore Stone Architecture & Gallery",
        location: "Indian Institute of Management Bangalore",
        date: "October 2026",
        category: "campus",
        src: ishaanPhoto,
        desc: "Captured in front of the historic stone pillars and student achievement frames at IIM Bangalore.",
        cameraInfo: "iPhone 15 Pro · 24mm f/1.78 · ISO 50"
      });
    }

    // 2. Load custom user-added photos from localStorage
    try {
      const stored = localStorage.getItem("ishaan_gallery_custom_photos");
      if (stored) {
        const customPhotos: PhotoItem[] = JSON.parse(stored);
        list.push(...customPhotos);
      }
    } catch (e) {
      console.warn("Could not read custom photos from localStorage:", e);
    }

    setPhotos(list);
    if (list.length > 0) {
      setLikedPhotos([list[0].id]);
    }
  }, []);

  // Handle uploading photos from device directly into app
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: PhotoItem[] = [];
    const readPromises: Promise<void>[] = [];

    Array.from(files).forEach((file) => {
      const promise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            const cleanTitle = file.name
              .replace(/\.[^/.]+$/, "")
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            newPhotos.push({
              id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              title: cleanTitle || "Imported Photo",
              location: "My Uploads",
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              category: "custom",
              src: result,
              desc: `Added via Photos upload on ${new Date().toLocaleDateString()}`,
              cameraInfo: "Custom Upload",
              isCustom: true
            });
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
      readPromises.push(promise);
    });

    Promise.all(readPromises).then(() => {
      setPhotos((prev) => {
        const updated = [...newPhotos, ...prev];
        // Persist custom photos in localStorage
        const customOnly = updated.filter((p) => p.isCustom);
        try {
          localStorage.setItem("ishaan_gallery_custom_photos", JSON.stringify(customOnly));
        } catch (err) {
          console.warn("Storage quota warning:", err);
        }
        return updated;
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  };

  const deletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      const customOnly = updated.filter((p) => p.isCustom);
      try {
        localStorage.setItem("ishaan_gallery_custom_photos", JSON.stringify(customOnly));
      } catch (err) {
        console.warn(err);
      }
      return updated;
    });
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const filteredPhotos = activeTab === "all" 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (likedPhotos.includes(id)) {
      setLikedPhotos(likedPhotos.filter(pId => pId !== id));
    } else {
      setLikedPhotos([...likedPhotos, id]);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || photos.length === 0) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || photos.length === 0) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div className="w-full h-full bg-[#121214] text-white flex flex-col overflow-hidden select-none">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        multiple 
        accept="image/*" 
        className="hidden" 
      />

      {/* Apple Photos Header Navigation */}
      <div className="h-12 border-b border-white/10 px-3 sm:px-4 flex items-center justify-between shrink-0 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-cyan-400" />
          <span className="font-bold text-sm sm:text-base text-white">Photos</span>
          <span className="text-xs text-white/40 hidden md:inline">({photos.length} items)</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Segmented Filter Control */}
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2.5 py-1 rounded-md transition-all ${activeTab === "all" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("campus")}
              className={`px-2.5 py-1 rounded-md transition-all ${activeTab === "campus" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
            >
              IIM-B
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-2.5 py-1 rounded-md transition-all ${activeTab === "custom" ? "bg-white/20 text-white font-semibold shadow-sm" : "text-white/60 hover:text-white"}`}
            >
              Uploads
            </button>
          </div>

          {/* Add Photo Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            title="Upload Photo to Gallery"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add Photos</span>
          </button>

          {/* Folder Guide Toggle */}
          <button
            onClick={() => setShowFolderInfo(!showFolderInfo)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            title="Gallery Folder Info"
          >
            <Info size={14} />
          </button>
        </div>
      </div>

      {/* Folder Info Dropdown Banner */}
      {showFolderInfo && (
        <div className="bg-blue-950/70 border-b border-blue-500/30 px-4 py-2.5 text-xs text-blue-200 flex items-center justify-between animate-fadeIn shrink-0">
          <div className="flex items-center gap-2">
            <FolderDown size={16} className="text-blue-400 shrink-0" />
            <span>
              <strong>Auto-Sync Folder:</strong> Put any photos into <code className="bg-black/40 px-1.5 py-0.5 rounded text-white font-mono">src/assets/gallery/</code> or <code className="bg-black/40 px-1.5 py-0.5 rounded text-white font-mono">public/gallery/</code> to show them here automatically!
            </span>
          </div>
          <button onClick={() => setShowFolderInfo(false)} className="text-white/60 hover:text-white p-1">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Photos Grid */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar">
        {/* Memories Header Banner */}
        <div className="mb-5 relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20 shadow-md shrink-0 bg-black">
              <img src={photos[0]?.src || ishaanPhoto} alt="Memory" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1">
                <Sparkles size={12} /> Live Gallery Library
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">Ishaan Jha Photo Collection</h3>
              <p className="text-xs text-white/70">IIM Bangalore · Ecofone · IIT Madras Journey</p>
            </div>
          </div>
          <div className="text-[11px] text-white/70 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
            <span>📁 Folder Linked</span> · <span>{photos.length} Photos</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 shadow-lg flex flex-col p-2.5 hover:bg-white/[0.08]"
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
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  <Heart 
                    size={14} 
                    className={likedPhotos.includes(photo.id) ? "fill-rose-500 text-rose-500" : "text-white"} 
                  />
                </button>

                {/* Delete button if uploaded */}
                {photo.isCustom && (
                  <button
                    onClick={(e) => deletePhoto(photo.id, e)}
                    className="absolute top-2 left-2 w-7 h-7 rounded-full bg-red-600/80 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-red-600 transition-colors"
                    title="Remove from custom uploads"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              {/* Clean Footer below Photo */}
              <div className="pt-2 pb-0.5 px-1 flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                  {photo.title}
                </span>
                <div className="flex items-center justify-between text-[10px] text-white/50 mt-1">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin size={10} className="text-cyan-400 shrink-0" /> {photo.location}
                  </span>
                  <span className="shrink-0">{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="py-16 text-center text-white/50 space-y-3">
            <ImageIcon size={40} className="mx-auto text-white/20" />
            <p className="text-sm">No photos found in this category.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Upload First Photo
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
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

            <div className="max-w-md sm:max-w-xl max-h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[62vh]"
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
