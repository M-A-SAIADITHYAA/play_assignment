"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StickySubNavProps {
  price: number;
  nights: number;
  rating: number;
  reviewCount: number;
}

export function StickySubNav({
  price,
  nights,
  rating,
  reviewCount,
}: StickySubNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("photos");

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero photo grid (~560px)
      if (window.scrollY > 560) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Track active section
      const sections = ["photos", "amenities", "reviews", "location"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-[#ebebeb] bg-white transition-all duration-200">
      <div className="mx-auto flex h-20 max-w-[1120px] items-center justify-between px-6 lg:px-0">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-[#222222]">
          {[
            { id: "photos", label: "Photos" },
            { id: "amenities", label: "Amenities" },
            { id: "reviews", label: "Reviews" },
            { id: "location", label: "Location" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`relative py-7 transition ${
                activeSection === tab.id
                  ? "text-[#222222]"
                  : "text-[#717171] hover:text-[#222222]"
              }`}
            >
              {tab.label}
              {activeSection === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#222222]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-1 text-sm font-semibold text-[#222222]">
              <span>₹{price.toLocaleString("en-IN")}</span>
              <span className="font-normal text-[#717171]">for {nights} nights</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-[#222222]">
              <Star size={11} className="fill-[#222222]" />
              <span className="font-semibold">{rating.toFixed(2)}</span>
              <span className="text-[#717171]">({reviewCount} reviews)</span>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("reservation-card")}
            className="rounded-lg bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.98]"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
