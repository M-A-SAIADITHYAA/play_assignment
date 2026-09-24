"use client";

import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="py-6 border-b border-[#ebebeb]">
      <div className="mb-4 text-xs text-[#717171]">
        Some info has been automatically translated.{" "}
        <span className="font-semibold underline cursor-pointer text-[#222222]">
          Show original
        </span>
      </div>

      <p className="text-base text-[#222222] leading-relaxed line-clamp-4">
        {description}
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 flex items-center gap-1 text-base font-semibold text-[#222222] underline underline-offset-4 hover:opacity-80"
      >
        <span>Show more</span>
        <ChevronRight size={16} />
      </button>

      {/* Full Description Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-[#f7f7f7]"
            >
              <X size={20} />
            </button>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#222222]">About this space</h3>
              <div className="mt-6 whitespace-pre-line text-base text-[#222222] leading-relaxed">
                {description}
                {"\n\n"}
                The apartment is thoroughly cleaned and sanitized before every arrival. Our dedicated property manager and housekeeping team are available on-call throughout your stay to ensure maximum comfort and peace of mind.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
