"use client";

import React from "react";
import { Bed, Armchair } from "lucide-react";

export function WhereYouSleep() {
  const sleepingArrangements = [
    {
      room: "Bedroom",
      beds: "1 double bed",
      icon: Bed,
    },
    {
      room: "Living room",
      beds: "1 sofa",
      icon: Armchair,
    },
  ];

  return (
    <div className="py-8 border-b border-[#ebebeb]">
      <h3 className="text-xl font-semibold text-[#222222]">Where you&apos;ll sleep</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sleepingArrangements.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col rounded-xl border border-[#dddddd] p-6"
            >
              <Icon size={24} className="text-[#222222]" />
              <h4 className="mt-4 text-base font-semibold text-[#222222]">
                {item.room}
              </h4>
              <p className="mt-1 text-sm text-[#717171]">{item.beds}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
