"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/listingData";

interface LightboxModalProps {
  photos: Photo[];
  currentId: number;
  onClose: () => void;
  onNavigate: (id: number) => void;
  onBackToTour: () => void;
}

export function LightboxModal({
  photos,
  currentId,
  onClose,
  onNavigate,
  onBackToTour,
}: LightboxModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const currentIndex = photos.findIndex((p) => p.id === currentId);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentPhoto = photos[activeIndex];
  const totalPhotos = photos.length;

  const handlePrev = React.useCallback(() => {
    if (activeIndex > 0) {
      onNavigate(photos[activeIndex - 1].id);
    }
  }, [activeIndex, photos, onNavigate]);

  const handleNext = React.useCallback(() => {
    if (activeIndex < totalPhotos - 1) {
      onNavigate(photos[activeIndex + 1].id);
    }
  }, [activeIndex, totalPhotos, photos, onNavigate]);

  // Lock background scroll and setup keyboard navigation & focus trap
  useEffect(() => {
    document.body.style.overflow = "hidden";
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Tab" && containerRef.current) {
        // Focus trap
        const focusable = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [onClose, handlePrev, handleNext]);

  if (!currentPhoto) return null;

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${currentPhoto.room} photo viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col bg-white"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBackToTour}
          aria-label="Back to photo tour grid"
          className="rounded-full p-2 text-[#222222] transition hover:bg-[#f7f7f7]"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-base font-semibold text-[#222222]">
          {currentPhoto.room}
        </h2>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6a6a6a]">
            {activeIndex + 1} of {totalPhotos}
          </span>
          <button
            onClick={onClose}
            aria-label="Close photo viewer"
            className="rounded-full p-2 text-[#222222] transition hover:bg-[#f7f7f7]"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Lightbox Stage */}
      <div className="relative flex flex-1 items-center justify-center px-12 md:px-20">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous photo"
          className="absolute left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow transition hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Animated Image with Smooth Zoom and Fade Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[72vh] w-full max-w-4xl"
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 900px"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={activeIndex === totalPhotos - 1}
          aria-label="Next photo"
          className="absolute right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow transition hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
