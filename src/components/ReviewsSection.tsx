"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Review, LISTING_DATA } from "@/data/listingData";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

/* Vector Icons matching Airbnb listing breakdown */
function SprayBottleIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="28" cy="8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="30" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="27" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <path d="M14 7h10v3h-3l-1.5 4" />
      <path d="M14 7c-2.5 0-4 1.5-4 4v1h5" />
      <path d="M13 12v3l-4 4v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9l-4-4v-3" />
      <path d="M9 24c3-2 6-2 9 1s3 1 5 0" />
    </svg>
  );
}

function AccuracyIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="16" cy="16" r="11" />
      <path d="m11 16 3.5 3.5 7.5-7.5" />
    </svg>
  );
}

function KeyIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M15.5 15.5l9 9" />
      <path d="M21 21l2.5-2.5" />
      <path d="M23.5 23.5l2.5-2.5" />
    </svg>
  );
}

function CommunicationIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 8h18a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9l-6 4v-4H7a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" />
    </svg>
  );
}

function LocationMapIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 8.5l7.5-3 7 3 7.5-3v18l-7.5 3-7-3-7.5 3v-18z" />
      <path d="M12.5 5.5v18" />
      <path d="M19.5 8.5v18" />
    </svg>
  );
}

function ValueTagIcon({ className = "w-7 h-7 text-[#222222]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18.5 6.5l8 8a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0l-8-8a2 2 0 0 1-.6-1.4V8a2 2 0 0 1 2-2h7.1a2 2 0 0 1 1.5.5z" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReviewsSection({
  rating,
  reviewCount,
  reviews,
}: ReviewsSectionProps) {
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleReview = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Overflow scroll state for Aspect Highlight Pills
  const pillsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkPillsScroll = () => {
    if (pillsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkPillsScroll();
    window.addEventListener("resize", checkPillsScroll);
    return () => window.removeEventListener("resize", checkPillsScroll);
  }, []);

  const scrollPills = (direction: "left" | "right") => {
    if (pillsScrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      pillsScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const filteredReviews = activeFilterTag
    ? reviews.filter((r) =>
        r.text.toLowerCase().includes(activeFilterTag.toLowerCase())
      )
    : reviews;

  return (
    <div id="reviews" className="py-12 border-b border-[#ebebeb]">
      {/* 1. Header Banner: Laurel Leaf + Rating + Guest favourite */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="relative h-20 w-10 sm:h-24 sm:w-12">
            <Image
              src="/laurel-left.png"
              alt="Guest Favourite Laurel"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-7xl sm:text-8xl md:text-[92px] font-extrabold tracking-tight text-[#222222] leading-none select-none">
            {rating.toFixed(2)}
          </span>
          <div className="relative h-20 w-10 sm:h-24 sm:w-12">
            <Image
              src="/laurel-right.png"
              alt="Guest Favourite Laurel"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#222222]">
          Guest favourite
        </h3>
        <p className="mt-1 text-sm sm:text-base text-[#717171] max-w-lg leading-normal">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          type="button"
          className="mt-2 text-sm font-semibold underline text-[#222222] hover:text-black cursor-pointer"
        >
          How reviews work
        </button>
      </div>

      {/* 2. Rating Breakdown & 6 Categories Row (Gracefully handles horizontal overflow) */}
      <div className="mt-10 w-full overflow-x-auto no-scrollbar pb-2">
        <div className="flex min-w-[840px] divide-x divide-[#ebebeb] py-2">
          {/* Column 1: Overall rating */}
          <div className="w-[180px] flex-shrink-0 pr-6 flex flex-col justify-between">
            <h4 className="text-sm font-semibold text-[#222222] mb-3">Overall rating</h4>
            <div className="space-y-1.5 w-full">
              {/* 5 stars */}
              <div className="flex items-center gap-3 text-xs text-[#222222]">
                <span className="w-2.5 font-medium">5</span>
                <div className="h-1 flex-1 rounded-full bg-[#ebebeb] overflow-hidden">
                  <div className="h-full bg-[#222222] rounded-full w-[94%]" />
                </div>
              </div>
              {/* 4 stars */}
              <div className="flex items-center gap-3 text-xs text-[#222222]">
                <span className="w-2.5 font-medium">4</span>
                <div className="h-1 flex-1 rounded-full bg-[#ebebeb] overflow-hidden">
                  <div className="h-full bg-[#222222] rounded-full w-[6%]" />
                </div>
              </div>
              {/* 3 stars */}
              <div className="flex items-center gap-3 text-xs text-[#222222]">
                <span className="w-2.5 font-medium">3</span>
                <div className="h-1 flex-1 rounded-full bg-[#ebebeb] overflow-hidden" />
              </div>
              {/* 2 stars */}
              <div className="flex items-center gap-3 text-xs text-[#222222]">
                <span className="w-2.5 font-medium">2</span>
                <div className="h-1 flex-1 rounded-full bg-[#ebebeb] overflow-hidden" />
              </div>
              {/* 1 star */}
              <div className="flex items-center gap-3 text-xs text-[#222222]">
                <span className="w-2.5 font-medium">1</span>
                <div className="h-1 flex-1 rounded-full bg-[#ebebeb] overflow-hidden" />
              </div>
            </div>
          </div>

          {/* Column 2: Cleanliness */}
          <div className="flex-1 min-w-[105px] px-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Cleanliness</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">5.0</span>
            </div>
            <div className="mt-6 flex items-end">
              <SprayBottleIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>

          {/* Column 3: Accuracy */}
          <div className="flex-1 min-w-[105px] px-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Accuracy</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">5.0</span>
            </div>
            <div className="mt-6 flex items-end">
              <AccuracyIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>

          {/* Column 4: Check-in */}
          <div className="flex-1 min-w-[105px] px-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Check-in</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">5.0</span>
            </div>
            <div className="mt-6 flex items-end">
              <KeyIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>

          {/* Column 5: Communication */}
          <div className="flex-1 min-w-[105px] px-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Communication</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">5.0</span>
            </div>
            <div className="mt-6 flex items-end">
              <CommunicationIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>

          {/* Column 6: Location */}
          <div className="flex-1 min-w-[105px] px-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Location</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">4.8</span>
            </div>
            <div className="mt-6 flex items-end">
              <LocationMapIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>

          {/* Column 7: Value */}
          <div className="flex-1 min-w-[105px] pl-6 flex flex-col justify-between">
            <div>
              <span className="text-sm font-semibold text-[#222222] block">Value</span>
              <span className="text-base font-bold text-[#222222] mt-1 block">4.8</span>
            </div>
            <div className="mt-6 flex items-end">
              <ValueTagIcon className="w-7 h-7 text-[#222222]" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Aspect Highlight Pills (Gracefully handles overflow with carousel navigation) */}
      <div className="relative mt-8 w-full group">
        {/* Left Scroll Navigation Button & Gradient Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-6 bg-gradient-to-r from-white via-white/90 to-transparent">
            <button
              onClick={() => scrollPills("left")}
              aria-label="Scroll reviews tags left"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow-md transition hover:scale-105 hover:border-[#222222] active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        )}

        {/* Right Scroll Navigation Button & Gradient Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-6 bg-gradient-to-l from-white via-white/90 to-transparent">
            <button
              onClick={() => scrollPills("right")}
              aria-label="Scroll reviews tags right"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] shadow-md transition hover:scale-105 hover:border-[#222222] active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Scrollable Tags Container */}
        <div
          ref={pillsScrollRef}
          onScroll={checkPillsScroll}
          className="flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar py-1"
        >
          {LISTING_DATA.highlightTags.map((tag, idx) => {
            const isSelected = activeFilterTag === tag.label;
            return (
              <button
                key={idx}
                onClick={() => setActiveFilterTag(isSelected ? null : tag.label)}
                className={`flex-shrink-0 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "border-[#222222] bg-[#f7f7f7] shadow-sm font-semibold text-[#222222]"
                    : "border-[#dddddd] bg-white text-[#222222] hover:border-[#222222]"
                }`}
              >
                <span className="text-base leading-none select-none">{tag.emoji}</span>
                <span>{tag.label}</span>
                <span className="text-[#717171] font-normal">{tag.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilterTag && (
        <div className="mt-4 flex items-center gap-2 text-xs text-[#717171]">
          <span>Filtering by &quot;{activeFilterTag}&quot;</span>
          <button
            onClick={() => setActiveFilterTag(null)}
            className="font-semibold text-[#222222] underline cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* 4. Reviews Grid */}
      <div className="mt-8 grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
        {(filteredReviews.length > 0 ? filteredReviews : reviews).map((review) => {
          const isLong = review.text.length > 180;
          const isExpanded = !!expandedReviews[review.id];
          let displayText = review.text;
          if (isLong && !isExpanded) {
            if (review.id === "vedant") {
              displayText = "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....";
            } else if (review.text.length > 270) {
              displayText = review.text.slice(0, 270) + "...";
            }
          }

          return (
            <div key={review.id} className="flex flex-col justify-between">
              <div>
                {/* Author info */}
                <div className="flex items-center gap-3">
                  {review.avatarUrl ? (
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={review.avatarUrl}
                        alt={review.author}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-sm"
                      style={{ backgroundColor: review.avatarColor }}
                    >
                      {review.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="text-base font-semibold text-[#222222]">
                      {review.author}
                    </h5>
                    <p className="text-sm text-[#717171]">{review.membership}</p>
                  </div>
                </div>

                {/* Star rating & date */}
                <div className="mt-3 flex items-center gap-2 text-xs text-[#222222]">
                  <div className="flex items-center text-[#222222]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={11} className="fill-[#222222]" />
                    ))}
                  </div>
                  <span>·</span>
                  <span className="font-semibold">{review.date}</span>
                </div>

                {/* Review text */}
                <p className="mt-2 text-sm text-[#222222] leading-relaxed">
                  {displayText}
                </p>

                {/* Show more toggle */}
                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggleReview(review.id)}
                    className="mt-1 text-sm font-semibold underline text-[#222222] hover:text-black cursor-pointer inline-block"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Show all reviews CTA */}
      <div className="mt-8">
        <button
          type="button"
          className="rounded-lg border border-[#222222] px-6 py-3 text-base font-semibold text-[#222222] transition hover:bg-[#f7f7f7] active:scale-[0.98] cursor-pointer"
        >
          Show all {reviewCount} reviews
        </button>
      </div>
    </div>
  );
}
