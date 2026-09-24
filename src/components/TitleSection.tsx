"use client";

import React, { useState } from "react";
import { Share, Heart } from "lucide-react";

interface TitleSectionProps {
  title: string;
}

export function TitleSection({ title }: TitleSectionProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            url: window.location.href,
          });
        } catch {
          // fallback
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link copied to clipboard!");
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setToastMessage(!isSaved ? "Saved to your wishlist!" : "Removed from wishlist");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-[#222222] md:text-[26px]">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-semibold text-[#222222]">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition underline hover:bg-[#f7f7f7] underline-offset-4"
          >
            <Share size={16} />
            <span>Share</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition underline hover:bg-[#f7f7f7] underline-offset-4"
          >
            <Heart
              size={16}
              className={isSaved ? "fill-[#ff385c] text-[#ff385c]" : "text-[#222222]"}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#222222] px-6 py-3 text-sm text-white shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
