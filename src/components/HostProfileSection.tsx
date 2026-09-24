"use client";

import React, { useState } from "react";
import { Star, ShieldAlert, Award, MessageCircle } from "lucide-react";

interface CoHost {
  name: string;
  avatarColor?: string;
}

interface HostProfileSectionProps {
  name: string;
  avatarColor: string;
  reviewCount: number;
  rating: number;
  yearsHosting: number;
  bornDecade?: string;
  responseRate?: number;
  responseTime?: string;
  coHosts: CoHost[];
}

export function HostProfileSection({
  name,
  avatarColor,
  reviewCount,
  rating,
  yearsHosting,
  bornDecade = "80s",
  responseRate = 100,
  responseTime = "an hour",
  coHosts,
}: HostProfileSectionProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl font-semibold text-[#222222]">Meet your host</h3>

      {/* Host Large Profile Card */}
      <div className="mt-6 rounded-3xl bg-[#f0efe9] p-8 max-w-sm shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white shadow-md"
              style={{ backgroundColor: avatarColor }}
            >
              {name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff385c] text-white shadow">
              <Award size={16} />
            </div>
          </div>

          <h4 className="mt-4 text-2xl font-bold text-[#222222]">{name}</h4>
          <span className="text-sm font-semibold text-[#717171]">Host</span>

          {/* Key Metrics */}
          <div className="mt-6 flex w-full justify-around divide-x divide-[#dddddd] border-t border-b border-[#dddddd] py-4 text-center">
            <div>
              <div className="text-lg font-bold text-[#222222]">
                {reviewCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#717171]">Reviews</div>
            </div>
            <div className="pl-4">
              <div className="flex items-center justify-center gap-0.5 text-lg font-bold text-[#222222]">
                <span>{rating.toFixed(2)}</span>
                <Star size={12} className="fill-[#222222]" />
              </div>
              <div className="text-[11px] text-[#717171]">Rating</div>
            </div>
            <div className="pl-4">
              <div className="text-lg font-bold text-[#222222]">
                {yearsHosting}
              </div>
              <div className="text-[11px] text-[#717171]">Years hosting</div>
            </div>
          </div>
        </div>

        {/* Bio details */}
        <div className="mt-6 space-y-3 text-sm text-[#222222]">
          <div className="flex items-center gap-3">
            <span>🎂</span>
            <span>Born in the {bornDecade}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🎓</span>
            <span>Where I went to school: NICMAR GOA</span>
          </div>
        </div>
      </div>

      {/* Co-Hosts Section */}
      <div className="mt-8">
        <h4 className="text-base font-semibold text-[#222222]">Co-Hosts</h4>
        <div className="mt-4 flex flex-wrap gap-4">
          {coHosts.map((coHost, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: coHost.avatarColor || "#717171" }}
              >
                {coHost.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-[#222222]">
                {coHost.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Host Details & Actions */}
      <div className="mt-8 space-y-4">
        <h4 className="text-base font-semibold text-[#222222]">Host details</h4>
        <p className="text-sm text-[#222222]">
          Response rate: <span className="font-semibold">{responseRate}%</span>
        </p>
        <p className="text-sm text-[#222222]">
          Responds within <span className="font-semibold">{responseTime}</span>
        </p>

        <button
          onClick={() => setShowMessageModal(true)}
          className="rounded-xl border border-[#222222] px-6 py-3 text-sm font-semibold text-[#222222] transition hover:bg-[#f7f7f7] active:scale-[0.98]"
        >
          Message host
        </button>

        <div className="mt-6 flex items-start gap-3 text-xs text-[#717171]">
          <ShieldAlert size={18} className="shrink-0 text-[#ff385c]" />
          <p>
            To help protect your payment, always use Airbnb to send money and
            communicate with hosts.
          </p>
        </div>
      </div>

      {/* Message Host Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-[#222222]">Message {name}</h4>
            {messageSent ? (
              <div className="mt-4 text-center py-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                  <MessageCircle size={24} />
                </div>
                <p className="text-sm font-semibold text-[#222222]">Message sent!</p>
                <p className="text-xs text-[#717171] mt-1">Mirashya Homes typically replies within an hour.</p>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessageSent(false);
                    setMessageText("");
                  }}
                  className="mt-6 w-full rounded-xl bg-[#222222] py-2.5 text-sm font-semibold text-white"
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
                  placeholder="Hi Mirashya Homes, I had a question about the jacuzzi and check-in time..."
                  className="mt-4 w-full rounded-xl border border-[#dddddd] p-3 text-sm focus:border-black focus:outline-none"
                />
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 rounded-xl border border-[#dddddd] py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#f7f7f7]"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!messageText.trim()}
                    onClick={() => setMessageSent(true)}
                    className="flex-1 rounded-xl bg-[#ff385c] py-2.5 text-sm font-semibold text-white disabled:opacity-40"
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
