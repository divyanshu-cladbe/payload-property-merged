"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Play, X, ImageIcon, Share, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPropertyByIdAction } from "@/actions/properties";
import { motion, AnimatePresence } from "framer-motion";

// --- Interfaces ---
interface MediaObject {
  url: string;
  thumbnail?: string;
  caption?: string;
}

interface PropertyImageDetails {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  images: (string | MediaObject)[];
  videos?: (string | MediaObject)[];
  threeSixty?: (string | MediaObject)[];
}

interface MediaItem {
  type: "video" | "360" | "image" | "more";
  image: string;
  url: string;
  count?: number;
}

function PropertyImageDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "videos" | "images" | "360">("all");
  const [property, setProperty] = useState<PropertyImageDetails | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  // URL Sync
  useEffect(() => {
    const imageParam = searchParams.get("image");
    if (imageParam) setLightboxImage(decodeURIComponent(imageParam));
  }, [searchParams]);

  // Data Fetching
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!propertyId) return;
      try {
        setLoading(true);
        const prop = await getPropertyByIdAction(propertyId);
        setProperty(prop as unknown as PropertyImageDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [propertyId]);

  // Media Processing
  const allMediaItems = useMemo(() => {
    if (!property) return [];
    const items: MediaItem[] = [];
    const extract = (item: string | MediaObject, fallback: string) => {
      if (typeof item === "string") return { url: item, thumb: fallback || item };
      return { url: item.url, thumb: item.thumbnail || fallback || item.url };
    };
    const firstImg = typeof property.images?.[0] === "string" ? property.images[0] : property.images?.[0]?.url;

    property.videos?.forEach((v) => {
      const { url, thumb } = extract(v, firstImg || "");
      items.push({ type: "video", url, image: thumb });
    });
    property.threeSixty?.forEach((t) => {
      const { url, thumb } = extract(t, firstImg || "");
      items.push({ type: "360", url, image: thumb });
    });
    property.images?.forEach((img) => {
      const { url, thumb } = extract(img, "");
      items.push({ type: "image", url, image: thumb });
    });
    return items;
  }, [property]);

  const filteredItems = useMemo(() => {
    const base = activeFilter === "all" ? allMediaItems : allMediaItems.filter((i) => {
      if (activeFilter === "videos") return i.type === "video";
      if (activeFilter === "360") return i.type === "360";
      return i.type === "image";
    });
    return base;
  }, [allMediaItems, activeFilter]);

  // Handlers
  const handleMediaClick = useCallback((item: MediaItem) => {
    const idx = allMediaItems.findIndex((i) => i.url === item.url);
    setCurrentMediaIndex(idx);
    setLightboxImage(item.url);
  }, [allMediaItems]);

  const navigateMedia = (dir: "next" | "prev", e?: React.MouseEvent) => {
    e?.stopPropagation();
    let nextIdx = dir === "next" ? currentMediaIndex + 1 : currentMediaIndex - 1;
    if (nextIdx >= allMediaItems.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = allMediaItems.length - 1;

    setCurrentMediaIndex(nextIdx);
    setLightboxImage(allMediaItems[nextIdx].url);
  };

  if (loading) return <GallerySkeleton />;
  if (error || !property) return <GalleryError message={error || "Property not found"} />;

  return (
    <div className="min-h-screen p-4 md:p-8 mt-12 md:mt-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{property.title}</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-500">Media Gallery</h2>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto">
              {["all", "videos", "images", "360"].map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id as any)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                    activeFilter === id 
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-lg" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  )}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredItems.map((item, idx) => (
            <MediaCard key={idx} item={item} onClick={() => handleMediaClick(item)} />
          ))}
        </div>
      </div>

      {/* Full Airbnb Style Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)} // Click outside to close
            className="fixed inset-0 bg-black/80 z-[100] flex flex-col"
          >
            {/* Top Bar Navigation */}
            <div className="flex items-center justify-between p-4 md:p-6 text-white" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setLightboxImage(null)} className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
                <X size={20} /> <span className="hidden md:inline text-sm font-medium">Close</span>
              </button>
              <div className="text-sm font-medium tracking-widest">{currentMediaIndex + 1} / {allMediaItems.length}</div>
              
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex items-center justify-center px-4 md:px-20 overflow-hidden">
              <button 
                onClick={(e) => navigateMedia('prev', e)} 
                className="absolute left-4 md:left-10 p-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all z-20"
              >
                <ChevronLeft size={28}/>
              </button>

              <motion.div 
                key={lightboxImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()} // Click image area doesn't close
                className="relative h-full w-full flex items-center justify-center"
              >
                <img 
                  src={lightboxImage} 
                  alt="Property" 
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain shadow-2xl rounded-sm transition-all"
                />
              </motion.div>

              <button 
                onClick={(e) => navigateMedia('next', e)} 
                className="absolute right-4 md:right-10 p-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all z-20"
              >
                <ChevronRight size={28}/>
              </button>
            </div>

            {/* Bottom Gallery Strip (Restored) */}
            <div 
              className=" py-6 px-4 backdrop-blur-sm " 
              onClick={(e) => e.stopPropagation()} // Clicking thumbnails strip doesn't close
            >
              <div className="max-w-5xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide justify-center">
                 {allMediaItems.map((thumb, tIdx) => (
                   <div 
                    key={tIdx} 
                    onClick={() => {
                      setCurrentMediaIndex(tIdx);
                      setLightboxImage(thumb.url);
                    }}
                    className={cn(
                      "relative w-20 h-14 md:w-24 md:h-16 flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all duration-300 border-2",
                      currentMediaIndex === tIdx ? "border-white scale-110 opacity-100" : "border-transparent opacity-40 hover:opacity-100"
                    )}
                   >
                     <img src={thumb.image} className="w-full h-full object-cover" alt="thumbnail" />
                     {thumb.type === "video" && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play size={14} fill="white" stroke="none" /></div>}
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
const MediaCard = ({ item, onClick }: { item: MediaItem; onClick: () => void }) => (
  <div onClick={onClick} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden cursor-pointer group bg-gray-100 border border-gray-100">
    <img src={item.image} alt="Property" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
    {item.type === "video" && <Badge icon={<Play size={10} fill="white"/>} label="Video" />}
    {item.type === "360" && <Badge icon={<div className="w-1.5 h-1.5 bg-white rounded-full"/>} label="360°" />}
  </div>
);

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-tighter">
    {icon} {label}
  </div>
);

const GallerySkeleton = () => (
  <div className="max-w-7xl mx-auto p-8 mt-20 animate-pulse">
    <div className="h-10 w-1/3 bg-gray-200 rounded mb-8" />
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[...Array(10)].map((_, i) => <div key={i} className="aspect-[4/3] bg-gray-100 rounded-xl" />)}
    </div>
  </div>
);

const GalleryError = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
    <div className="bg-red-50 text-red-500 p-8 rounded-2xl border border-red-100">
      <X size={40} className="mx-auto mb-4" />
      <h2 className="text-xl font-bold text-red-700">Oops!</h2>
      <p className="text-sm">{message}</p>
      <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full font-bold">Try Again</button>
    </div>
  </div>
);

export default PropertyImageDetails;