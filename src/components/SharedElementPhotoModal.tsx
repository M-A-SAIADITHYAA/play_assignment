"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/listingData";

export interface OriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius?: number | string;
}

interface SharedElementPhotoModalProps {
  photo: Photo;
  photos: Photo[];
  originRect: OriginRect;
  onClose: () => void;
  onNavigate: (photoId: number) => void;
}

export function SharedElementPhotoModal({
  photo,
  photos,
  originRect,
  onClose,
  onNavigate,
}: SharedElementPhotoModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentPhoto = photos[activeIndex];
  const totalPhotos = photos.length;

  // Compute dynamic target dimensions centered in the viewport
  const [targetBounds, setTargetBounds] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const computeBounds = () => {
      if (typeof window === "undefined") return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Leave room for top header (64px) and bottom padding (40px)
      const topOffset = 64;
      const maxAvailableWidth = Math.min(1080, vw - 80);
      const maxAvailableHeight = vh - topOffset - 48;

      // 3:2 landscape aspect ratio
      let targetW = maxAvailableWidth;
      let targetH = targetW * (2 / 3);

      if (targetH > maxAvailableHeight) {
        targetH = maxAvailableHeight;
        targetW = targetH * (3 / 2);
      }

      const targetL = (vw - targetW) / 2;
      const targetT = topOffset + (maxAvailableHeight - targetH) / 2;

      setTargetBounds({
        top: Math.round(targetT),
        left: Math.round(targetL),
        width: Math.round(targetW),
        height: Math.round(targetH),
      });
    };

    computeBounds();
    window.addEventListener("resize", computeBounds);
    return () => window.removeEventListener("resize", computeBounds);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      onNavigate(photos[activeIndex - 1].id);
    }
  }, [activeIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    if (activeIndex < totalPhotos - 1) {
      onNavigate(photos[activeIndex + 1].id);
    }
  }, [activeIndex, totalPhotos, photos, onNavigate]);

  // Lock body scroll and set up keyboard navigation & escape handling
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${currentPhoto.room} photo viewer`}
      className="fixed inset-0 z-[60]"
    >
      {/* 1. Backdrop Overlay: Smoothly fades in and out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-white"
      />

      {/* 2. Top Controls Header: Fades in slightly delayed */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-between border-b border-[#ebebeb] bg-white px-6 py-4"
      >
        <button
          onClick={onClose}
          aria-label="Close photo viewer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7] active:scale-95 cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-semibold text-[#222222]">
          {currentPhoto.room}
        </h2>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#717171]">
            {activeIndex + 1} of {totalPhotos}
          </span>
        </div>
      </motion.div>

      {/* 3. Left / Right Navigation Chevrons */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.22, delay: 0.12 }}
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        disabled={activeIndex === 0}
        aria-label="Previous photo"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.22, delay: 0.12 }}
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        disabled={activeIndex === totalPhotos - 1}
        aria-label="Next photo"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 cursor-pointer"
      >
        <ChevronRight size={20} />
      </motion.button>

      {/* 4. The Expanding Image: Physically scales and translates from the origin thumbnail into destination */}
      {targetBounds && (
        <motion.div
          key={`shared-expanded-image-${currentPhoto.id}`}
          initial={{
            top: originRect.top,
            left: originRect.left,
            width: originRect.width,
            height: originRect.height,
            borderRadius: originRect.borderRadius ?? 16,
          }}
          animate={{
            top: targetBounds.top,
            left: targetBounds.left,
            width: targetBounds.width,
            height: targetBounds.height,
            borderRadius: 12,
          }}
          exit={{
            top: originRect.top,
            left: originRect.left,
            width: originRect.width,
            height: originRect.height,
            borderRadius: originRect.borderRadius ?? 16,
          }}
          transition={{
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1], // Fluid cubic-bezier expansion curve
          }}
          className="fixed z-[65] overflow-hidden bg-gray-100 shadow-2xl"
          style={{
            position: "fixed",
            willChange: "top, left, width, height, transform",
          }}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1080px"
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
