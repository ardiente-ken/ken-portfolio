"use client";

import type { TechStackItem } from "@/lib/types";

function getIconUrl(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

export default function TechPill({ item }: { item: TechStackItem }) {
  return (
    <div
      title={`${item.name} • ${item.category}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line/60 bg-paper-raised/50 text-xs font-mono shrink-0 hover:border-ink-soft hover:bg-paper-raised transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getIconUrl(item.name)}
        alt=""
        className="w-3.5 h-3.5 object-contain shrink-0 opacity-80"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="text-ink text-[12px]">{item.name}</span>
    </div>
  );
}
