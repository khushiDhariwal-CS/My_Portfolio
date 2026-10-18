"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { ProjectImage } from "@/data/projects";

interface ScreenshotSwipeGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export function ScreenshotSwipeGallery({ images, projectTitle }: ScreenshotSwipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const total = images.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isLightboxOpen]);

  // Touch swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Swipe Display */}
      <div
        className="relative group w-full bg-white rounded-[24px] overflow-hidden border border-[#E7DFD2] shadow-warm aspect-[16/9.5] sm:aspect-[16/9]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 1200px) 100vw, 1120px"
          className="object-contain sm:object-cover transition-opacity duration-300"
        />

        {/* Hover / Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-[#2B2823] shadow-md flex items-center justify-center transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-[#2B2823] shadow-md flex items-center justify-center transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute right-4 top-4 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#2B2823] shadow-sm flex items-center gap-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
          aria-label="View screenshot in fullscreen mode"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Enlarge</span>
        </button>

        {/* Counter Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#2B2823]/80 backdrop-blur-sm text-white text-xs font-medium tracking-wider">
          {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Caption & Navigation Pill Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
        <p className="text-sm text-[#6E675D] leading-relaxed max-w-2xl">
          {currentImage.caption || currentImage.alt}
        </p>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 self-center sm:self-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#B89B7A] ${
                idx === currentIndex
                  ? "w-8 bg-[#2B2823]"
                  : "w-2 bg-[#E7DFD2] hover:bg-[#B89B7A]/60"
              }`}
              aria-label={`Go to screenshot ${idx + 1}`}
              aria-current={idx === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setCurrentIndex(idx)}
            className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#B89B7A] ${
              idx === currentIndex
                ? "border-[#2B2823] shadow-sm scale-[1.02]"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`Thumbnail ${idx + 1}: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B2823]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} screenshot viewer`}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Lightbox Image Container */}
          <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />
          </div>

          {/* Lightbox Caption */}
          <div className="mt-4 text-center text-white/80 text-sm max-w-2xl px-4">
            <span className="text-white font-medium mr-2">
              [{currentIndex + 1} / {total}]
            </span>
            {currentImage.caption || currentImage.alt}
          </div>
        </div>
      )}
    </div>
  );
}
