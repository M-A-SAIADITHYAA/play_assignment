"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

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
    <section className="py-12 border-b border-[#ebebeb]">
      <h2 className="text-[22px] font-semibold text-[#222222] tracking-tight mb-6">
        Things to know
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {/* Cancellation policy */}
        <div className="flex flex-col">
          <div className="mb-4 flex h-6 items-center">
            <svg
              className="h-6 w-6 text-[#222222]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="17" rx="3" />
              <line x1="16" y1="2" x2="16" y2="5" />
              <line x1="8" y1="2" x2="8" y2="5" />
              <line x1="3" y1="9.5" x2="21" y2="9.5" />
              <line x1="9.5" y1="13.5" x2="14.5" y2="18.5" />
              <line x1="14.5" y1="13.5" x2="9.5" y2="18.5" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#222222] mb-3">
            Cancellation policy
          </h3>
          <p className="text-sm text-[#222222] leading-relaxed mb-3">
            {thingsToKnow.cancellationPolicy}
          </p>
          <p className="text-sm text-[#222222] leading-relaxed">
            Review this host’s full policy for details.
          </p>
          <button
            type="button"
            onClick={() => setModalTitle("Cancellation policy")}
            className="mt-4 self-start text-sm font-semibold text-[#222222] underline underline-offset-2 hover:text-black cursor-pointer"
          >
            Learn more
          </button>
        </div>

        {/* House rules */}
        <div className="flex flex-col">
          <div className="mb-4 flex h-6 items-center">
            <svg
              className="h-6 w-6 text-[#222222]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="4.5" />
              <circle cx="8" cy="8" r="1.5" strokeWidth="1.3" />
              <line x1="11.5" y1="11.5" x2="19.5" y2="19.5" strokeWidth="2.4" />
              <line x1="15.5" y1="15.5" x2="13.5" y2="17.5" strokeWidth="2.4" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#222222] mb-3">
            House rules
          </h3>
          <ul className="space-y-3 text-sm text-[#222222]">
            {thingsToKnow.houseRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setModalTitle("House rules")}
            className="mt-4 self-start text-sm font-semibold text-[#222222] underline underline-offset-2 hover:text-black cursor-pointer"
          >
            Learn more
          </button>
        </div>

        {/* Safety & property */}
        <div className="flex flex-col">
          <div className="mb-4 flex h-6 items-center">
            <svg
              className="h-6 w-6 text-[#222222]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s7-4.5 7-11.5V4.5L12 2.5 5 4.5v5C5 16.5 12 21 12 21z" />
              <line x1="12" y1="2.5" x2="12" y2="21" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#222222] mb-3">
            Safety &amp; property
          </h3>
          <ul className="space-y-3 text-sm text-[#222222]">
            {thingsToKnow.safety.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setModalTitle("Safety & property")}
            className="mt-4 self-start text-sm font-semibold text-[#222222] underline underline-offset-2 hover:text-black cursor-pointer"
          >
            Learn more
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
    </section>
  );
}
