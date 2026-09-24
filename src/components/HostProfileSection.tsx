"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

interface CoHost {
  name: string;
  avatarUrl?: string;
  avatarColor?: string;
}

interface HostProfileSectionProps {
  name: string;
  avatarUrl?: string;
  avatarColor: string;
  reviewCount: number;
  rating: number;
  yearsHosting: number;
  bornDecade?: string;
  responseRate?: number;
  responseTime?: string;
  school?: string;
  coHosts: CoHost[];
}

export function HostProfileSection({
  name,
  avatarUrl = "/mirashya-logo.png",
  avatarColor,
  reviewCount,
  rating,
  yearsHosting,
  bornDecade = "80s",
  responseRate = 100,
  responseTime = "an hour",
  school = "NICMAR GOA",
  coHosts,
}: HostProfileSectionProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div id="host" className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl sm:text-[22px] font-semibold text-[#222222]">
        Meet your host
      </h3>

      {/* 2-Column Split: Host Card & Info on Left, Co-hosts & Details on Right */}
      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[330px_1fr]">
        {/* Left Column: Host Card + Bio Icons */}
        <div>
          {/* Host White Elevation Card */}
          <div className="w-full rounded-[28px] bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#ebebeb]/80">
            <div className="flex items-center">
              {/* Left Side of Card: Avatar + Name + Host */}
              <div className="flex-1 flex flex-col items-center justify-center text-center pr-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={name}
                      fill
                      sizes="80px"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded-full text-2xl font-bold text-white shadow"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {name.charAt(0)}
                    </div>
                  )}
                </div>

                <h4 className="mt-3 text-2xl font-bold tracking-tight text-[#222222] leading-tight">
                  Mirashya<br />Homes
                </h4>
                <span className="mt-1 text-sm text-[#222222] font-normal">
                  Host
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="w-px self-stretch bg-[#ebebeb]" />

              {/* Right Side of Card: 3 Stacked Metrics */}
              <div className="flex-1 flex flex-col justify-between py-1 pl-6">
                <div>
                  <div className="text-xl font-bold text-[#222222] leading-none">
                    {reviewCount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#222222] mt-1 font-normal">
                    Reviews
                  </div>
                </div>

                <div className="h-px w-full bg-[#ebebeb] my-3.5" />

                <div>
                  <div className="flex items-center gap-0.5 text-xl font-bold text-[#222222] leading-none">
                    <span>{rating.toFixed(2)}</span>
                    <span className="text-sm select-none">★</span>
                  </div>
                  <div className="text-[11px] text-[#222222] mt-1 font-normal">
                    Rating
                  </div>
                </div>

                <div className="h-px w-full bg-[#ebebeb] my-3.5" />

                <div>
                  <div className="text-xl font-bold text-[#222222] leading-none">
                    {yearsHosting}
                  </div>
                  <div className="text-[11px] text-[#222222] mt-1 font-normal">
                    Years hosting
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Bullets below card */}
          <div className="mt-6 space-y-4 text-sm text-[#222222]">
            <div className="flex items-center gap-3.5">
              <svg
                className="w-5 h-5 text-[#222222] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="8.5" rx="5.5" ry="6.5" />
                <path d="M12 15v2" />
                <path d="M10.5 19.5h3l-1.5-2.5z" fill="currentColor" stroke="none" />
              </svg>
              <span className="font-normal">Born in the {bornDecade}</span>
            </div>

            <div className="flex items-center gap-3.5">
              <svg
                className="w-5 h-5 text-[#222222] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="font-normal">
                Where I went to school: {school}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div>
          {/* Co-Hosts Heading & 3-Column Grid */}
          <div>
            <h4 className="text-base font-semibold text-[#222222]">Co-Hosts</h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              {coHosts.map((coHost, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {coHost.avatarUrl ? (
                    <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={coHost.avatarUrl}
                        alt={coHost.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: coHost.avatarColor || "#717171" }}
                    >
                      {coHost.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-normal text-[#222222] truncate">
                    {coHost.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Host details */}
          <div className="mt-8">
            <h4 className="text-base font-semibold text-[#222222]">
              Host details
            </h4>
            <p className="mt-3 text-sm text-[#222222]">
              Response rate: {responseRate}%
            </p>
            <p className="mt-1 text-sm text-[#222222]">
              Responds within {responseTime}
            </p>

            <button
              type="button"
              onClick={() => setShowMessageModal(true)}
              className="mt-6 rounded-lg bg-[#f0f0f0] hover:bg-[#e4e4e4] px-6 py-3 text-sm font-semibold text-[#222222] transition cursor-pointer"
            >
              Message host
            </button>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#717171]">
              <svg
                className="w-5 h-5 text-[#717171] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 2v20" />
              </svg>
              <p>
                To help protect your payment, always use Airbnb to send money and
                communicate with hosts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Host Modal */}
      {showMessageModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowMessageModal(false)}
              aria-label="Close message modal"
              className="absolute right-4 top-4 rounded-full p-2 text-[#717171] hover:bg-[#f7f7f7] cursor-pointer"
            >
              <X size={18} />
            </button>
            <h4 className="text-lg font-bold text-[#222222]">Message {name}</h4>
            {messageSent ? (
              <div className="mt-4 text-center py-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                  <MessageCircle size={24} />
                </div>
                <p className="text-sm font-semibold text-[#222222]">Message sent!</p>
                <p className="text-xs text-[#717171] mt-1">Mirashya Homes typically replies within an hour.</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessageSent(false);
                    setMessageText("");
                  }}
                  className="mt-6 w-full rounded-xl bg-[#222222] py-2.5 text-sm font-semibold text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Hi Mirashya Homes, I had a question about the listing..."
                  className="mt-4 w-full rounded-xl border border-[#dddddd] p-3 text-sm focus:border-black focus:outline-none"
                />
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 rounded-xl border border-[#dddddd] py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#f7f7f7] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!messageText.trim()}
                    onClick={() => setMessageSent(true)}
                    className="flex-1 rounded-xl bg-[#ff385c] py-2.5 text-sm font-semibold text-white disabled:opacity-40 cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
