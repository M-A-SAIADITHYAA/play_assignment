"use client";

import React, { useState } from "react";
import { ChevronRight, MapPin, X } from "lucide-react";

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
      <h3 className="text-xl font-semibold text-[#222222]">Where you’ll be</h3>
      <p className="mt-1 text-sm text-[#717171]">{location}</p>

      {/* Styled Interactive Map Preview */}
      <div className="relative mt-6 h-80 w-full overflow-hidden rounded-2xl border border-[#dddddd] shadow-inner bg-[#e5e3df]">
        <iframe
          title="Listing Location Map"
          className="h-full w-full border-0"
          loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=73.7500%2C15.5000%2C73.7800%2C15.5300&amp;layer=mapnik&amp;marker=15.5186%2C73.7667"
        />

        {/* Custom Marker Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff385c] text-white shadow-xl ring-4 ring-white/80 animate-bounce">
            <MapPin size={24} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-base font-semibold text-[#222222]">
          Candolim, Goa, India
        </h4>
        <p className="mt-1 text-sm text-[#717171]">
          Exact location will be provided after booking.
        </p>

        <div className="mt-4">
          <h5 className="text-sm font-semibold text-[#222222]">
            Neighbourhood highlights
          </h5>
          <p className="mt-1 text-sm text-[#222222] leading-relaxed">
            {neighbourhoodHighlight}
          </p>

          <button
            onClick={() => setShowLocationModal(true)}
            className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#222222] underline underline-offset-4 hover:opacity-80"
          >
            <span>Show more</span>
            <ChevronRight size={16} />
          </button>
        </div>
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
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-[#f7f7f7]"
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
