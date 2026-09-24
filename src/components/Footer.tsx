"use client";

import React from "react";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#ebebeb] bg-[#f7f7f7] text-[#222222]">
      <div className="mx-auto max-w-[1120px] px-6 py-12 lg:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-sm">
          <div>
            <h5 className="font-semibold text-[#222222]">Support</h5>
            <ul className="mt-4 space-y-3 text-[#717171]">
              <li className="hover:underline cursor-pointer">Help Centre</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li className="hover:underline cursor-pointer">Disability support</li>
              <li className="hover:underline cursor-pointer">Cancellation options</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#222222]">Hosting</h5>
            <ul className="mt-4 space-y-3 text-[#717171]">
              <li className="hover:underline cursor-pointer">Airbnb your home</li>
              <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li className="hover:underline cursor-pointer">Hosting resources</li>
              <li className="hover:underline cursor-pointer">Community forum</li>
              <li className="hover:underline cursor-pointer">Hosting responsibly</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#222222]">Airbnb</h5>
            <ul className="mt-4 space-y-3 text-[#717171]">
              <li className="hover:underline cursor-pointer">Newsroom</li>
              <li className="hover:underline cursor-pointer">New features</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Investors</li>
              <li className="hover:underline cursor-pointer">Emergency stays</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#dddddd] pt-8 text-sm text-[#717171] md:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Company details</span>
          </div>

          <div className="mt-4 flex items-center gap-6 font-semibold text-[#222222] md:mt-0">
            <div className="flex items-center gap-2 hover:underline cursor-pointer">
              <Globe size={16} />
              <span>English (IN)</span>
            </div>
            <div className="hover:underline cursor-pointer">₹ INR</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
