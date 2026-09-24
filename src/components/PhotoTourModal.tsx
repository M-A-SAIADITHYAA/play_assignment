"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Share, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Photo, RoomCategory } from "@/data/listingData";

interface PhotoTourModalProps {
  rooms: RoomCategory[];
  photos: Photo[];
  onClose: () => void;
  onOpenLightbox: (photoId: number) => void;
}

export function PhotoTourModal({
  rooms,
  photos,
  onClose,
  onOpenLightbox,
}: PhotoTourModalProps) {
  // Lock background scroll when open & handle Escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const getPhotoById = (id: number) => {
    return photos.find((p) => p.id === id) || photos[0];
  };

  const scrollToRoom = (roomName: string) => {
    const elementId = `tour-${roomName.replace(/\s+/g, "-")}`;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#dddddd] bg-white px-6 py-4 lg:px-12">
        <button
          onClick={onClose}
          aria-label="Close photo tour"
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#f7f7f7]"
        >
          <ArrowLeft size={22} className="text-[#222222]" />
        </button>

        <h2 className="text-lg font-semibold text-[#222222]">Photo tour</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "Photo Tour", url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            aria-label="Share"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]"
          >
            <Share size={18} />
          </button>
          <button
            aria-label="Save"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-[1120px] px-6 py-8">
        {/* Room Thumbnails Jump Strip */}
        <div className="mb-12 flex flex-wrap gap-6">
          {rooms.map((roomCat) => {
            const firstPhoto = getPhotoById(roomCat.photoIds[0]);
            return (
              <button
                key={roomCat.room}
                onClick={() => scrollToRoom(roomCat.room)}
                className="flex w-24 flex-col items-center gap-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff385c]"
              >
                <div className="relative h-20 w-24 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                  <Image
                    src={firstPhoto.src}
                    alt={firstPhoto.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <span className="text-center text-xs font-medium text-[#6a6a6a]">
                  {roomCat.room}
                </span>
              </button>
            );
          })}
        </div>

        {/* Room Sections */}
        <div className="flex flex-col gap-16">
          {rooms.map((roomCat) => (
            <div
              key={roomCat.room}
              id={`tour-${roomCat.room.replace(/\s+/g, "-")}`}
              className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
            >
              {/* Left Column: Room Name and Tags */}
              <div>
                <h3 className="text-3xl font-semibold text-[#222222]">
                  {roomCat.room}
                </h3>
                {roomCat.tags.length > 0 && (
                  <p className="mt-2 text-sm text-[#6a6a6a]">
                    {roomCat.tags.join(" · ")}
                  </p>
                )}
              </div>

              {/* Right Column: Room Photos */}
              <div className="flex flex-col gap-4">
                {roomCat.photoIds.map((photoId) => {
                  const photo = getPhotoById(photoId);
                  return (
                    <motion.button
                      key={photoId}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      onClick={() => onOpenLightbox(photoId)}
                      aria-label={`Open ${photo.alt} in full view`}
                      className="group relative h-80 w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff385c]"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="560px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
