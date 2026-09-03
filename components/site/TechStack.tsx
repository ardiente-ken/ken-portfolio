import type { TechStackItem } from "@/lib/types";
import type { CSSProperties } from "react";
import TechPill from "./TechPill";

export default function TechStack({ items = [] }: { items?: TechStackItem[] }) {
  if (!items || items.length === 0) return null;

  // Duplicated so the track can loop seamlessly at -50%.
  const track = [...items, ...items];
  // Roughly 2.5s per pill keeps the pace readable regardless of stack size.
  const duration = `${Math.max(items.length * 2.5, 12)}s`;

  return (
    <section id="stack" className="scroll-mt-10 px-6 lg:px-16 py-10 lg:py-14 border-b border-line">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg text-ink">Tech Stack</h2>
        <span className="font-mono text-[11px] text-ink-soft">{items.length} items</span>
      </div>

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
    </section>
  );
}
