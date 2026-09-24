"use client";

import React from "react";
import Image from "next/image";
import { Grid } from "lucide-react";
import { motion } from "framer-motion";
import { Photo } from "@/data/listingData";

interface HeroPhotoGridProps {
  photos: Photo[];
  onOpenPhotoTour: (photoId?: number) => void;
}

export function HeroPhotoGrid({ photos, onOpenPhotoTour }: HeroPhotoGridProps) {
  // 5 photos for the hero mosaic
  const heroPhotos = photos.slice(0, 5);

  return (
    <div id="photos" className="relative mb-6">
      <div className="grid h-[440px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        {/* Main Large Photo (Left 50% - col-span-2 row-span-2) */}
        {heroPhotos[0] && (
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={() => onOpenPhotoTour(heroPhotos[0].id)}
            aria-label={`View photo: ${heroPhotos[0].alt}`}
            className="group relative col-span-2 row-span-2 h-full w-full cursor-pointer overflow-hidden bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff385c]"
          >
            <Image
              src={heroPhotos[0].src}
              alt={heroPhotos[0].alt}
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 560px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.button>
        )}

        {/* Right 4 Photos (2x2 grid) */}
        {heroPhotos.slice(1, 5).map((photo) => (
          <motion.button
            key={photo.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={() => onOpenPhotoTour(photo.id)}
            aria-label={`View photo: ${photo.alt}`}
            className="group relative col-span-1 row-span-1 h-full w-full cursor-pointer overflow-hidden bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff385c]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1120px) 50vw, 280px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {/* "Show all photos" floating button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        onClick={() => onOpenPhotoTour()}
        aria-label="Show all photos"
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-[#222222] bg-white px-4 py-2 text-sm font-semibold text-[#222222] shadow-md transition-shadow hover:shadow-lg cursor-pointer"
      >
        <Grid size={16} />
        <span>Show all photos</span>
      </motion.button>
    </div>
  );
}
