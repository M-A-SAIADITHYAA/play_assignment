"use client";

import React from "react";
import { Sun, Wind, Key } from "lucide-react";

export function Highlights() {
  const highlights = [
    {
      title: "Outdoor entertainment",
      description: "The pool and alfresco dining are great for summer trips.",
      icon: Sun,
    },
    {
      title: "Designed for staying cool",
      description: "Beat the heat with the A/C and ceiling fan.",
      icon: Wind,
    },
    {
      title: "Self check-in",
      description: "You can check in with the building staff.",
      icon: Key,
    },
  ];

  return (
    <div className="py-6 border-b border-[#ebebeb] space-y-6">
      {highlights.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-start gap-6">
            <div className="mt-1 text-[#222222]">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#222222]">
                {item.title}
              </h4>
              <p className="text-sm text-[#717171] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
