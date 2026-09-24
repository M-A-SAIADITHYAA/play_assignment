"use client";

import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";

interface ThingsToKnowSectionProps {
  thingsToKnow: {
    cancellationPolicy: string;
    houseRules: string[];
    safety: string[];
  };
}

export function ThingsToKnowSection({
  thingsToKnow,
}: ThingsToKnowSectionProps) {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  return (
    <div className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl font-semibold text-[#222222]">Things to know</h3>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cancellation policy */}
        <div>
          <h4 className="text-base font-semibold text-[#222222]">
            Cancellation policy
          </h4>
          <p className="mt-2 text-sm text-[#222222] leading-relaxed">
            {thingsToKnow.cancellationPolicy}
          </p>
          <button
            onClick={() => setModalTitle("Cancellation policy")}
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#222222] underline underline-offset-4 hover:opacity-80"
          >
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* House rules */}
        <div>
          <h4 className="text-base font-semibold text-[#222222]">
            House rules
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-[#222222]">
            {thingsToKnow.houseRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
          <button
            onClick={() => setModalTitle("House rules")}
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#222222] underline underline-offset-4 hover:opacity-80"
          >
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Safety & property */}
        <div>
          <h4 className="text-base font-semibold text-[#222222]">
            Safety &amp; property
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-[#222222]">
            {thingsToKnow.safety.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button
            onClick={() => setModalTitle("Safety & property")}
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#222222] underline underline-offset-4 hover:opacity-80"
          >
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {modalTitle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        >
          <div className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setModalTitle(null)}
              aria-label="Close modal"
              className="absolute left-6 top-6 rounded-full p-2 hover:bg-[#f7f7f7]"
            >
              <X size={20} />
            </button>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#222222]">{modalTitle}</h3>
              <p className="mt-4 text-base text-[#717171] leading-relaxed">
                Detailed policy specifications and host guidelines are enforced to ensure guest safety and seamless stays. For special accommodations, please message the host directly prior to booking.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
