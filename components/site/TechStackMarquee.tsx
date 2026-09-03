import type { TechStackItem } from "@/lib/types";
import type { CSSProperties } from "react";
import TechPill from "./TechPill";

export default function TechStackMarquee({ items = [] }: { items?: TechStackItem[] }) {
  if (!items || items.length === 0) return null;

  // Duplicated so the track can loop seamlessly at -50%.
  const track = [...items, ...items];
  // Roughly 2.5s per pill keeps the pace readable regardless of stack size.
  const duration = `${Math.max(items.length * 2.5, 12)}s`;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max gap-2"
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {track.map((item, i) => (
          <TechPill key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}