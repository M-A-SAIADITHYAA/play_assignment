"use client";

import React, { useState } from "react";
import {
  Utensils,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  PawPrint,
  Video,
  AlertTriangle,
  Flame,
  X,
} from "lucide-react";
import { Amenity, LISTING_DATA } from "@/data/listingData";

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [showAllModal, setShowAllModal] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return Utensils;
      case "Wifi":
        return Wifi;
      case "Laptop":
        return Laptop;
      case "Car":
        return Car;
      case "Waves":
        return Waves;
      case "Bath":
        return Bath;
      case "PawPrint":
        return PawPrint;
      case "Camera":
        return Video;
      case "AlertTriangle":
        return AlertTriangle;
      case "Flame":
        return Flame;
      default:
        return Utensils;
    }
  };

  return (
    <div id="amenities" className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl font-semibold text-[#222222]">
        What this place offers
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
        {amenities.map((item, idx) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={idx} className="flex items-center gap-4 text-[#222222]">
              <Icon size={24} strokeWidth={1.5} className="shrink-0" />
              <span
                className={`text-base ${
                  !item.available ? "line-through text-[#717171]" : ""
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowAllModal(true)}
          className="rounded-lg border border-[#222222] px-6 py-3 text-base font-semibold text-[#222222] transition hover:bg-[#f7f7f7] active:scale-[0.98]"
        >
          Show all 50 amenities
        </button>
      </div>

      {/* Show all 50 amenities modal */}
      {showAllModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowAllModal(false)}
              aria-label="Close amenities modal"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-[#f7f7f7]"
            >
              <X size={20} />
            </button>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#222222]">
                What this place offers
              </h3>

              <div className="mt-6 divide-y divide-[#ebebeb]">
                {LISTING_DATA.allAmenitiesModal.map((group, gIdx) => (
                  <div key={gIdx} className="py-6">
                    <h4 className="text-lg font-semibold text-[#222222]">
                      {group.category}
                    </h4>
                    <ul className="mt-4 space-y-4">
                      {group.items.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-center gap-4 text-base text-[#222222]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#222222]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
