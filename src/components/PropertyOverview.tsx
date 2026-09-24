"use client";

import React from "react";
import { Star } from "lucide-react";

interface PropertyOverviewProps {
  propertyType: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
}

export function PropertyOverview({
  propertyType,
  guests,
  bedrooms,
  beds,
  bathrooms,
  rating,
  reviewCount,
}: PropertyOverviewProps) {
  return (
    <div className="pb-6 border-b border-[#ebebeb]">
      <h2 className="text-xl font-semibold text-[#222222]">
        {propertyType}
      </h2>
      <ol className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-[#222222]">
        <li>{guests} guests</li>
        <li>·</li>
        <li>{bedrooms} bedroom</li>
        <li>·</li>
        <li>{beds} bed</li>
        <li>·</li>
        <li>{bathrooms} bathroom</li>
      </ol>

      {/* Guest Favourite Banner Card */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-[#dddddd] p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Laurel leaf badge */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold tracking-tight text-[#222222] leading-tight text-center">
              Guest
              <br />
              favourite
            </span>
          </div>

          <div className="h-10 w-[1px] bg-[#dddddd]" />

          <p className="max-w-[280px] text-sm font-medium text-[#222222] leading-snug">
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-[#222222]">
              <span>{rating.toFixed(2)}</span>
              <Star size={14} className="fill-[#222222]" />
            </div>
            <div className="text-xs text-[#717171] underline cursor-pointer">
              ★★★★★
            </div>
          </div>

          <div className="h-10 w-[1px] bg-[#dddddd]" />

          <div className="text-center">
            <div className="text-lg font-bold text-[#222222]">{reviewCount}</div>
            <div className="text-xs font-semibold text-[#222222] underline cursor-pointer">
              Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
