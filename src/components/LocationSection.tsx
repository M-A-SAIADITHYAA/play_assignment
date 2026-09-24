"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";

interface LocationSectionProps {
  location: string;
  neighbourhoodHighlight: string;
}

export function LocationSection({
  location,
  neighbourhoodHighlight,
}: LocationSectionProps) {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div id="location" className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl sm:text-[22px] font-semibold text-[#222222]">
        Where you’ll be
      </h3>
      <p className="mt-2 text-base text-[#222222]">{location}</p>

      {/* Map Graphic Preview matching reference */}
      <div className="relative mt-6 w-full overflow-hidden rounded-2xl aspect-[937/402]">
        <Image
          src="/location-map.png"
          alt="Map showing Candolim, Goa, India"
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover"
          priority
        />
      </div>

      <p className="mt-6 text-sm text-[#222222]">
        Exact location will be provided after booking.
      </p>

      <div className="mt-8">
        <h4 className="text-base font-semibold text-[#222222]">
          Neighbourhood highlights
        </h4>
        <p className="mt-2 text-sm sm:text-[15px] text-[#222222] leading-relaxed max-w-3xl">
          {neighbourhoodHighlight}
        </p>

        <button
          type="button"
          onClick={() => setShowLocationModal(true)}
          className="mt-3 inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-[#222222] underline underline-offset-2 hover:opacity-80 cursor-pointer"
        >
          <span>Show more</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {showLocationModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowLocationModal(false)}
              aria-label="Close location modal"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-[#f7f7f7] cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#222222]">Where you’ll be</h3>
              <p className="mt-4 text-base text-[#222222] leading-relaxed">
                Candolim is known for its pristine beaches, water sports, and tranquil coastal charm. Located just 10 minutes away from Candolim beach, you have immediate access to world-class dining, boutique shopping, and vibrant Goan culture.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
