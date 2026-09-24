"use client";

import React, { useState } from "react";
import { Flag, ChevronDown, Plus, Minus, Tag, Check } from "lucide-react";

interface ReservationCardProps {
  pricePerStay: number;
  nights: number;
  rating: number;
  reviewCount: number;
  checkIn: string;
  checkOut: string;
  cancellationDate: string;
  guests: number;
}

export function ReservationCard({
  pricePerStay,
  nights,
  cancellationDate,
}: ReservationCardProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [discountClaimed, setDiscountClaimed] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const totalGuests = adults + children;
  const currentPrice = discountClaimed ? Math.round(pricePerStay * 0.9) : pricePerStay;
  const pricePerNight = Math.round(currentPrice / nights);

  return (
    <div
      id="reservation-card"
      className="sticky top-28 rounded-2xl border border-[#dddddd] bg-white p-6 shadow-xl"
    >
      {/* 10% Off Banner */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-[#f7f7f7] p-3 text-xs">
        <div className="flex items-center gap-2 text-[#222222]">
          <Tag size={16} className="text-[#ff385c]" />
          <div>
            <span className="font-bold">Get 10% off</span> your next stay.{" "}
            <span className="text-[#717171] underline cursor-pointer">Terms apply</span>
          </div>
        </div>
        <button
          onClick={() => setDiscountClaimed(!discountClaimed)}
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
            discountClaimed
              ? "bg-green-600 text-white"
              : "bg-[#222222] text-white hover:bg-black"
          }`}
        >
          {discountClaimed ? "Applied ✓" : "Claim"}
        </button>
      </div>

      {/* Price Header */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-[#222222]">
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-base text-[#717171]">for {nights} nights</span>
        </div>
      </div>

      {/* Booking Input Grid */}
      <div className="mt-6 rounded-xl border border-[#b0b0b0]">
        <div className="grid grid-cols-2 divide-x divide-[#b0b0b0] border-b border-[#b0b0b0]">
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#222222]">
              CHECK-IN
            </label>
            <input
              type="text"
              readOnly
              value="10/18/2026"
              className="w-full bg-transparent text-sm text-[#222222] focus:outline-none"
            />
          </div>

          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#222222]">
              CHECKOUT
            </label>
            <input
              type="text"
              readOnly
              value="10/23/2026"
              className="w-full bg-transparent text-sm text-[#222222] focus:outline-none"
            />
          </div>
        </div>

        {/* Guests selector */}
        <div className="relative p-3">
          <div
            onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#222222]">
                GUESTS
              </label>
              <div className="text-sm text-[#222222]">
                {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                {infants > 0 ? `, ${infants} infant${infants > 1 ? "s" : ""}` : ""}
                {pets > 0 ? `, ${pets} pet${pets > 1 ? "s" : ""}` : ""}
              </div>
            </div>
            <ChevronDown size={18} className="text-[#222222]" />
          </div>

          {/* Guest dropdown popup */}
          {isGuestPickerOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-[#ebebeb] bg-white p-4 shadow-xl z-30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#222222]">Adults</div>
                  <div className="text-xs text-[#717171]">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={adults <= 1}
                    onClick={() => setAdults(adults - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{adults}</span>
                  <button
                    disabled={totalGuests >= 3}
                    onClick={() => setAdults(adults + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#222222]">Children</div>
                  <div className="text-xs text-[#717171]">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={children <= 0}
                    onClick={() => setChildren(children - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{children}</span>
                  <button
                    disabled={totalGuests >= 3}
                    onClick={() => setChildren(children + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#222222]">Infants</div>
                  <div className="text-xs text-[#717171]">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={infants <= 0}
                    onClick={() => setInfants(infants - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{infants}</span>
                  <button
                    disabled={infants >= 2}
                    onClick={() => setInfants(infants + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#222222]">Pets</div>
                  <div className="text-xs text-[#717171]">Service animals allowed</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={pets <= 0}
                    onClick={() => setPets(pets - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{pets}</span>
                  <button
                    disabled={pets >= 2}
                    onClick={() => setPets(pets + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setIsGuestPickerOpen(false)}
                  className="text-xs font-bold text-[#222222] underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 text-xs text-[#717171]">
        Free cancellation before {cancellationDate}
      </div>

      {/* Reserve CTA */}
      <button
        onClick={() => setIsBooked(true)}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466] py-3.5 text-center text-base font-semibold text-white shadow transition hover:opacity-95 active:scale-[0.98]"
      >
        {isBooked ? "Reserved! (Dates Held)" : "Reserve"}
      </button>

      <p className="mt-2 text-center text-xs text-[#717171]">
        You won&apos;t be charged yet
      </p>

      {/* Fee Breakdown */}
      <div className="mt-6 space-y-3 text-sm text-[#222222]">
        <div className="flex justify-between">
          <span className="underline">₹{pricePerNight.toLocaleString("en-IN")} x {nights} nights</span>
          <span>₹{currentPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span className="text-green-600 font-medium">₹0</span>
        </div>
        <div className="my-3 border-t border-[#ebebeb]" />
        <div className="flex justify-between font-bold text-base">
          <span>Total before taxes</span>
          <span>₹{currentPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Check size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#222222]">Reservation Request Received</h4>
            <p className="mt-2 text-sm text-[#717171]">
              Your dates from 18 Oct 2026 to 23 Oct 2026 are reserved for {totalGuests} guests. The host will confirm your booking shortly.
            </p>
            <button
              onClick={() => setIsBooked(false)}
              className="mt-6 w-full rounded-xl bg-[#222222] py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Report this listing */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#717171] underline cursor-pointer hover:text-[#222222]">
        <Flag size={14} />
        <span>Report this listing</span>
      </div>
    </div>
  );
}
