"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { NearbyListing } from "@/data/listingData";

interface NearbyListingsSectionProps {
  listings: NearbyListing[];
}

export function NearbyListingsSection({
  listings,
}: NearbyListingsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [likedListings, setLikedListings] = useState<Record<string, boolean>>({});

  const itemsPerPage = 4;
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedListings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleListings = listings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="py-12">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#222222]">
          More stays nearby
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#717171]">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              aria-label="Previous stays"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] disabled:opacity-30 hover:bg-[#f7f7f7]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next stays"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] disabled:opacity-30 hover:bg-[#f7f7f7]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleListings.map((stay) => {
          const isLiked = likedListings[stay.id] || false;
          return (
            <div
              key={stay.id}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={stay.photoSrc}
                  alt={stay.title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={(e) => toggleLike(stay.id, e)}
                  aria-label="Save this stay"
                  className="absolute right-3 top-3 p-1 text-white drop-shadow transition hover:scale-110"
                >
                  <Heart
                    size={22}
                    className={
                      isLiked ? "fill-[#ff385c] text-[#ff385c]" : "stroke-white"
                    }
                  />
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline justify-between text-sm">
                  <h4 className="font-semibold text-[#222222] truncate max-w-[200px]">
                    {stay.title}
                  </h4>
                  <div className="flex items-center gap-1 font-medium text-[#222222]">
                    <Star size={12} className="fill-[#222222]" />
                    <span>{stay.rating.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-1 text-sm font-semibold text-[#222222]">
                  ₹{stay.price.toLocaleString("en-IN")}{" "}
                  <span className="font-normal text-[#717171]">total</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
