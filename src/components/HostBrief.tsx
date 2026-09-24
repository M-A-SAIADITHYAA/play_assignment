"use client";

import React from "react";

interface HostBriefProps {
  name: string;
  avatarColor: string;
  yearsHosting: number;
}

export function HostBrief({ name, avatarColor, yearsHosting }: HostBriefProps) {
  const initial = name.charAt(0);

  return (
    <div className="py-6 border-b border-[#ebebeb]">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow"
          style={{ backgroundColor: avatarColor }}
        >
          {initial}
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#222222]">
            Hosted by {name}
          </h3>
          <p className="text-sm text-[#717171]">{yearsHosting} years hosting</p>
        </div>
      </div>
    </div>
  );
}
