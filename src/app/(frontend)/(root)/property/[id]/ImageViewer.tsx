"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Play, X, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import imgproxyLoader from "@/utils/ImgProxyURLGenerator";

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface MediaObject {
  url: string;
  thumbnail?: string;
  caption?: string;
  type?: "image" | "video" | "360";
}

interface PropertySection {
  label: string;
  items: (string | MediaObject)[];
}

interface PropertyImageDetailsData {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  sections?: PropertySection[];
  images?: (string | MediaObject)[];
  videos?: (string | MediaObject)[];
  threeSixty?: (string | MediaObject)[];
}

interface MediaItem {
  type: "image" | "video" | "360";
  url: string;
  image: string;
}

interface ViewerProps {
  propertyData: PropertyImageDetailsData;
}

type FilterType = "all" | "videos" | "images" | "360";

const img = imgproxyLoader({
  src: "s3://property-new/1764416691049-19f774af-e02e-4627-8747-a32ec285d6a2.png",
  width: 500,
  height: 1000,
  quality: 80,
});

// ─── DUMMY DATA ────────────────────────────────────────────────────────────────

export const dummyPropertyData: PropertyImageDetailsData = {
  id: "prop-001",
  title: "Luxury Villa with Private Pool",
  description: "A stunning 4-bedroom villa with panoramic views.",
  address: "12, Palm Grove Road",
  city: "Goa",
  price: 12000,
  sections: [
    {
      label: "Rooms",
      items: [
        img,
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image3.png",
        "/images/image-viewer/image4.png",
        "/images/image-viewer/image5.png",
        "/images/image-viewer/image6.png",
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image8.png",
        "/images/image-viewer/image1.png",
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image3.png",
        "/images/image-viewer/image4.png",
        "/images/image-viewer/image5.png",
        "/images/image-viewer/image6.png",
        "/images/image-viewer/image8.png",
        {
          url: "https://player.mediadelivery.net/play/620673/da8b3196-ea51-4ff6-82a0-b96ef0042b63",
          thumbnail: "https://vz-2ad8e860-cdc.b-cdn.net/da8b3196-ea51-4ff6-82a0-b96ef0042b63/thumbnail_82750e18.jpg",
          type: "video",
        },
        {
          url: "/360/rooms/room-360.html",
          thumbnail: "/images/image-viewer/image3.png",
          type: "360",
        },
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image3.png",
        "/images/image-viewer/image1.png",
        "/images/image-viewer/image5.png",
      ],
    },
    {
      label: "Interior",
      items: [
        "/images/image-viewer/image5.png",
        "/images/image-viewer/image1.png",
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image3.png",
        {
          url: "/videos/interior/interior-tour.mp4",
          thumbnail: "/images/image-viewer/image7.png",
          type: "video",
        },
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image2.png",
        {
          url: "/360/interior/interior-360.html",
          thumbnail: "/images/image-viewer/image7.png",
          type: "360",
        },
        "/images/image-viewer/image1.png",
      ],
    },
    {
      label: "Outdoors",
      items: [
        "/images/image-viewer/image5.png",
        "/images/image-viewer/image1.png",
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image5.png",
        {
          url: "/videos/outdoors/outdoor-tour.mp4",
          thumbnail: "/images/image-viewer/image7.png",
          type: "video",
        },
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image7.png",
      ],
    },
    {
      label: "Kitchen",
      items: [
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image3.png",
        "/images/image-viewer/image1.png",
        "/images/image-viewer/image4.png",
        "/images/image-viewer/image8.png",
      ],
    },
    {
      label: "Bathrooms",
      items: [
        "/images/image-viewer/image7.png",
        "/images/image-viewer/image2.png",
        "/images/image-viewer/image3.png",
        "/images/image-viewer/image1.png",
      ],
    },
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const SECTION_MAX = 5;

function toMediaItem(raw: string | MediaObject): MediaItem {
  if (typeof raw === "string") return { type: "image", url: raw, image: raw };
  return {
    type: raw.type ?? "image",
    url: raw.url,
    image: raw.thumbnail || raw.url,
  };
}

function buildSections(
  data: PropertyImageDetailsData,
): { label: string; items: MediaItem[] }[] {
  if (data.sections?.length) {
    return data.sections.map((s) => ({
      label: s.label,
      items: s.items.map(toMediaItem),
    }));
  }
  const items: MediaItem[] = [];
  const firstImg = data.images?.[0] ? toMediaItem(data.images[0]).url : "";
  data.videos?.forEach((v) =>
    items.push({
      ...toMediaItem(v),
      type: "video",
      image: toMediaItem(v).image || firstImg,
    }),
  );
  data.threeSixty?.forEach((t) =>
    items.push({
      ...toMediaItem(t),
      type: "360",
      image: toMediaItem(t).image || firstImg,
    }),
  );
  data.images?.forEach((img) => items.push(toMediaItem(img)));
  return items.length ? [{ label: "All Media", items }] : [];
}

function matchesFilter(item: MediaItem, filter: FilterType) {
  if (filter === "all") return true;
  if (filter === "videos") return item.type === "video";
  if (filter === "360") return item.type === "360";
  return item.type === "image";
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PropertyImageDetails({ propertyData }: ViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItemUrl, setLightboxItemUrl] = useState<string>("");
  const [lightboxSection, setLightboxSection] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const filmstripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = searchParams.get("type");
    setActiveFilter(
      t === "videos"
        ? "videos"
        : t === "360"
          ? "360"
          : t === "images"
            ? "images"
            : "all",
    );
  }, [searchParams]);

  const allSections = useMemo(
    () => buildSections(propertyData),
    [propertyData],
  );
  const allMediaItems = useMemo<MediaItem[]>(
    () => allSections.flatMap((s) => s.items),
    [allSections],
  );

  const counts = useMemo(
    () => ({
      all: allMediaItems.length,
      videos: allMediaItems.filter((i) => i.type === "video").length,
      images: allMediaItems.filter((i) => i.type === "image").length,
      "360": allMediaItems.filter((i) => i.type === "360").length,
    }),
    [allMediaItems],
  );

  const visibleSections = useMemo(
    () =>
      allSections
        .map((s) => ({
          ...s,
          items: s.items.filter((item) => matchesFilter(item, activeFilter)),
        }))
        .filter((s) => s.items.length > 0),
    [allSections, activeFilter],
  );

  // ── Lightbox helpers ──────────────────────────────────────────────────────

  const lightboxSectionItems = useMemo(() => {
    const sec = allSections.find((s) => s.label === lightboxSection);
    return sec ? sec.items : [];
  }, [allSections, lightboxSection]);

  const currentSectionIdx = useMemo(
    () => lightboxSectionItems.findIndex((i) => i.url === lightboxItemUrl),
    [lightboxSectionItems, lightboxItemUrl],
  );

  const openLightbox = useCallback(
    (item: MediaItem) => {
      const ownerSection = allSections.find((s) =>
        s.items.some((i) => i.url === item.url),
      );
      setLightboxSection(ownerSection?.label ?? allSections[0]?.label ?? "");
      setLightboxItemUrl(item.url);
      setLightboxOpen(true);
    },
    [allSections],
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const closeEntireGallery = useCallback(() => {
    router.back();
  }, [router]);

  const navigateLightbox = useCallback((dir: "next" | "prev", e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightboxSectionItems.length) return;
    let next = dir === "next" ? currentSectionIdx + 1 : currentSectionIdx - 1;
    if (next >= lightboxSectionItems.length) next = 0;
    if (next < 0) next = lightboxSectionItems.length - 1;
    setLightboxItemUrl(lightboxSectionItems[next].url);
  }, [currentSectionIdx, lightboxSectionItems]);

  useEffect(() => {
    if (!filmstripRef.current) return;
    const active = filmstripRef.current.querySelector(
      "[data-active='true']",
    ) as HTMLElement | null;
    active?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [lightboxItemUrl, lightboxSection]);

  // Combined Keyboard Logic: Handles Esc for both Lightbox and Entire Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          closeLightbox();
        } else {
          closeEntireGallery();
        }
      } else if (lightboxOpen) {
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, closeEntireGallery, navigateLightbox]);

  const toggleSection = (label: string) =>
    setExpandedSections((prev) => {
      const s = new Set(prev);
      s.has(label) ? s.delete(label) : s.add(label);
      return s;
    });

  const FILTERS: FilterType[] = ["all", "videos", "images", "360"];
  const filterLabels: Record<FilterType, string> = {
    all: "All",
    videos: "Videos",
    images: "Images",
    "360": "360",
  };

  const currentLightboxItem = allMediaItems.find(
    (i) => i.url === lightboxItemUrl,
  );

  return (
    /* This outer div handles clicks outside the white content cards to close the whole gallery */
    <div 
        className="h-screen flex flex-col bg-black/40 backdrop-blur-sm font-sans overflow-hidden cursor-default"
        onClick={closeEntireGallery}
    >
      <div 
        className="h-full flex flex-col bg-[#F2F2F2] overflow-hidden" 
        onClick={(e) => e.stopPropagation()} /* Prevents gallery from closing when clicking internal UI */
      >
        {/* ── Sticky header ─────────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100 shadow-sm z-40">
            <div className="max-w-[1576px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between pt-4 pb-1 gap-3">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {propertyData.title}
                </h1>
                <button
                onClick={closeEntireGallery}
                aria-label="Close"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                <X size={20} className="text-gray-500" />
                </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 mt-0.5">
                <h2 className="text-base font-semibold text-gray-500 flex-shrink-0">
                Media Gallery
                </h2>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                {FILTERS.map((id) => {
                    const active = activeFilter === id;
                    const count = counts[id];
                    const disabled = count === 0;
                    return (
                    <button
                        key={id}
                        onClick={() => !disabled && setActiveFilter(id)}
                        disabled={disabled}
                        className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-semibold transition-all border whitespace-nowrap select-none",
                        active
                            ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-md"
                            : disabled
                            ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900",
                        )}
                    >
                        {filterLabels[id]}
                    </button>
                    );
                })}
                </div>
            </div>
            </div>
        </div>

        {/* ── Scrollable content ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-[1576px] mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-5">
            {visibleSections.length === 0 ? (
                <EmptyState activeFilter={activeFilter} />
            ) : (
                visibleSections.map((section) => {
                const isExpanded = expandedSections.has(section.label);
                const showAll =
                    isExpanded || section.items.length <= SECTION_MAX + 1;
                const visibleItems = showAll
                    ? section.items
                    : section.items.slice(0, SECTION_MAX);
                const overflow = showAll ? 0 : section.items.length - SECTION_MAX;

                return (
                    <div
                    key={section.label}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 sm:px-7 pt-5 pb-7"
                    >
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-bold text-lg text-gray-900">
                        {section.label}
                        </p>
                        <span className="text-xs text-gray-400 font-medium">
                        {section.items.length} photo
                        {section.items.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {visibleItems.map((item, idx) => (
                        <MediaCard
                            key={`${section.label}-${idx}`}
                            item={item}
                            onClick={() => openLightbox(item)}
                        />
                        ))}
                        {overflow > 0 && (
                        <MoreTile
                            count={overflow}
                            coverImage={section.items[SECTION_MAX]?.image ?? ""}
                            onClick={() => toggleSection(section.label)}
                        />
                        )}
                    </div>
                    {isExpanded && (
                        <button
                        onClick={() => toggleSection(section.label)}
                        className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                        >
                        Show less
                        </button>
                    )}
                    </div>
                );
                })
            )}
            </div>
        </div>
      </div>

      {/* ── Lightbox overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox} /* Click outside the media closes only the Lightbox */
          >
            {/* ── Close button ── */}
            <div
              className=" absolute top-10 right-14 flex justify-end mb-3"
              style={{ width: "min(780px, calc(100vw - 120px))" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                <X size={20} strokeWidth={2.5} />
                <span>Close</span>
              </button>
            </div>

            {/* ── Row: left arrow + media card + right arrow ── */}
            <div
              className="flex items-center gap-6 w-full justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => navigateLightbox("prev", e)}
                className="flex-shrink-0 w-12 h-12 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={30} strokeWidth={2} />
              </button>

              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
                style={{
                  width: "min(1180px, calc(100vw - 100px))",
                  aspectRatio: "16/11",
                }}
              >
                <AnimatePresence mode="wait">
                  {currentLightboxItem.type === "video" ? (
                    <motion.div
                        key={lightboxItemUrl}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                    >
                        {lightboxItemUrl.includes("player.") || lightboxItemUrl.includes("youtube") ? (
                            <iframe
                                src={lightboxItemUrl}
                                className="w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                src={lightboxItemUrl}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        )}
                    </motion.div>
                  ) : (
                    <motion.img
                      key={lightboxItemUrl}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      src={lightboxItemUrl}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>

                <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {currentSectionIdx + 1} / {lightboxSectionItems.length}
                </div>
              </div>

              <button
                onClick={(e) => navigateLightbox("next", e)}
                className="flex-shrink-0 w-12 h-12 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={30} strokeWidth={2} />
              </button>
            </div>

            {/* ── Bottom: section tabs + filmstrip ── */}
            <div
              className="mt-14"
              style={{ width: "min(880px, calc(100vw - 120px))" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-5 mb-3 px-0.5">
                {allSections.map((sec) => {
                  const isActive = sec.label === lightboxSection;
                  return (
                    <button
                      key={sec.label}
                      onClick={() => {
                        setLightboxSection(sec.label);
                        if (sec.items.length)
                          setLightboxItemUrl(sec.items[0].url);
                      }}
                      className={cn(
                        "text-sm font-semibold transition-colors whitespace-nowrap pb-1",
                        isActive
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "text-white/40 hover:text-white/70 border-b-2 border-transparent",
                      )}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </div>

              <div
                ref={filmstripRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
              >
                {lightboxSectionItems.map((thumb, tIdx) => {
                  const isActive = thumb.url === lightboxItemUrl;
                  return (
                    <button
                      key={tIdx}
                      data-active={isActive}
                      onClick={() => setLightboxItemUrl(thumb.url)}
                      className={cn(
                        "relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none",
                        "w-[88px] h-[62px]",
                        isActive
                          ? "ring-0.5 ring-orange-500 ring-offset-1 ring-offset-transparent opacity-100"
                          : "opacity-30 hover:opacity-60",
                      )}
                    >
                      <img
                        src={thumb.image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      {thumb.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <Play size={11} fill="white" stroke="none" />
                        </div>
                      )}
                      {thumb.type === "360" && (
                        <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[7px] font-black px-1 rounded leading-none py-0.5">
                          360°
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Media Card ────────────────────────────────────────────────────────────────

const MediaCard = ({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    onClick={onClick}
    className="relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer group bg-gray-100 shadow-sm"
    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
  >
    <img
      src={item.image}
      alt="Property"
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    {item.type === "video" && (
      <>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-black/35 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/55 transition-colors duration-300">
            <Play size={18} fill="white" stroke="none" className="ml-0.5" />
          </div>
        </div>
        <Badge
          icon={<Play size={9} fill="white" stroke="none" />}
          label="Video"
        />
      </>
    )}
    {item.type === "360" && (
      <Badge
        icon={<span className="text-[8px] font-black leading-none">360</span>}
        label="360°"
      />
    )}
  </motion.div>
);

// ─── More Tile ─────────────────────────────────────────────────────────────────

const MoreTile = ({
  count,
  coverImage,
  onClick,
}: {
  count: number;
  coverImage: string;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    onClick={onClick}
    className="relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
  >
    {coverImage && (
      <img src={coverImage} alt="" className="w-full h-full object-cover" />
    )}
    <div className="absolute inset-0 bg-black/55 hover:bg-black/65 transition-colors duration-300 flex flex-col items-center justify-center gap-1">
      <span className="text-white text-2xl sm:text-3xl font-bold leading-none tracking-tight">
        +{count}
      </span>
      <span className="text-white/75 text-xs font-medium tracking-widest uppercase mt-0.5">
        Photos
      </span>
    </div>
  </motion.div>
);

// ─── Badge ─────────────────────────────────────────────────────────────────────

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wide">
    {icon} {label}
  </div>
);

// ─── Empty State ───────────────────────────────────────────────────────────────

const emptyMessages: Record<string, { title: string; subtitle: string }> = {
  all: {
    title: "No media available",
    subtitle:
      "There are no photos, videos, or 360° tours for this property yet.",
  },
  videos: {
    title: "No videos in any section",
    subtitle: "No video tours have been uploaded for this property.",
  },
  images: {
    title: "No images in any section",
    subtitle: "Photos for this property haven't been added yet.",
  },
  "360": {
    title: "No 360° tours available",
    subtitle: "Virtual 360° tours for this property aren't available yet.",
  },
};

const EmptyState = ({ activeFilter }: { activeFilter: string }) => {
  const msg = emptyMessages[activeFilter] ?? emptyMessages["all"];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-20 sm:py-28 flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5 shadow-inner">
        <ImageOff size={28} className="text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{msg.title}</h3>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        {msg.subtitle}
      </p>
    </div>
  );
};