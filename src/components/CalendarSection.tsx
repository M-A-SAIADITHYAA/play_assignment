"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarSectionProps {
  initialNights?: number;
  location?: string;
}

export function CalendarSection({
  initialNights = 5,
  location = "Candolim",
}: CalendarSectionProps) {
  const [hasSelection, setHasSelection] = useState(true);

  const octDays = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ];

  const novDays = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30,
  ];

  // Strikethrough unavailable days in November matching Airbnb reference
  const novDisabledDays = new Set([18, 19, 20, 21, 22, 23, 24, 29, 30]);

  return (
    <div id="calendar" className="py-8 border-b border-[#ebebeb]">
      {/* Title & Date Range */}
      <div>
        <h3 className="text-[22px] font-semibold text-[#222222]">
          {hasSelection ? `${initialNights} nights in ${location}` : `Select check-in date`}
        </h3>
        <p className="mt-1 text-sm text-[#717171]">
          {hasSelection
            ? "18 Oct 2026 - 23 Oct 2026"
            : "Add your travel dates for exact pricing"}
        </p>
      </div>

      {/* 2-Month Calendar Grid */}
      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* October 2026 */}
        <div>
          {/* Month Header with Left Chevron */}
          <div className="flex items-center justify-between mb-4">
            <button
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <h4 className="text-base font-semibold text-[#222222] text-center">
              October 2026
            </h4>
            <div className="h-8 w-8" />
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#222222] mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 text-center text-sm">
            {octDays.map((day, idx) => {
              if (day === null) {
                return <div key={`oct-empty-${idx}`} className="h-10 w-full" />;
              }

              const isStart = hasSelection && day === 18;
              const isEnd = hasSelection && day === 23;
              const isInRange = hasSelection && day > 18 && day < 23;

              if (isStart) {
                return (
                  <div key={`oct-${day}`} className="relative h-10 w-full flex items-center justify-center">
                    {/* Gray track extending to right */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#f2f2f2] z-0" />
                    {/* Circle */}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#222222] text-sm font-semibold text-white">
                      {day}
                    </div>
                  </div>
                );
              }

              if (isEnd) {
                return (
                  <div key={`oct-${day}`} className="relative h-10 w-full flex items-center justify-center">
                    {/* Gray track extending from left */}
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#f2f2f2] z-0" />
                    {/* Circle */}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#222222] text-sm font-semibold text-white">
                      {day}
                    </div>
                  </div>
                );
              }

              if (isInRange) {
                return (
                  <div
                    key={`oct-${day}`}
                    className="h-10 w-full bg-[#f2f2f2] flex items-center justify-center text-sm font-medium text-[#222222]"
                  >
                    {day}
                  </div>
                );
              }

              return (
                <div
                  key={`oct-${day}`}
                  className="flex h-10 w-full items-center justify-center text-sm font-medium text-[#222222] hover:rounded-full hover:border hover:border-black cursor-pointer"
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* November 2026 */}
        <div>
          {/* Month Header with Right Chevron */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 w-8" />
            <h4 className="text-base font-semibold text-[#222222] text-center">
              November 2026
            </h4>
            <button
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#222222] mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 text-center text-sm">
            {novDays.map((day) => {
              const isDisabled = novDisabledDays.has(day);

              if (isDisabled) {
                return (
                  <div
                    key={`nov-${day}`}
                    className="flex h-10 w-full items-center justify-center text-sm text-[#d5d5d5] line-through select-none cursor-default"
                  >
                    {day}
                  </div>
                );
              }

              return (
                <div
                  key={`nov-${day}`}
                  className="flex h-10 w-full items-center justify-center text-sm font-medium text-[#222222] hover:rounded-full hover:border hover:border-black cursor-pointer"
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Keyboard Shortcuts Icon + Clear dates button */}
      <div className="mt-8 flex items-center justify-between">
        <button
          aria-label="Keyboard shortcuts"
          className="flex items-center justify-center rounded-lg border border-[#222222] p-1.5 transition hover:bg-[#f7f7f7]"
        >
          <svg
            width="24"
            height="16"
            viewBox="0 0 28 20"
            fill="none"
            stroke="#222222"
            strokeWidth="1.75"
            className="text-[#222222]"
          >
            <rect x="2" y="2" width="24" height="16" rx="4" />
            <line x1="8" y1="14" x2="20" y2="14" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <button
          onClick={() => setHasSelection(!hasSelection)}
          className="text-sm font-semibold underline text-[#222222] hover:text-black cursor-pointer"
        >
          {hasSelection ? "Clear dates" : "Reset dates"}
        </button>
      </div>
    </div>
  );
}
