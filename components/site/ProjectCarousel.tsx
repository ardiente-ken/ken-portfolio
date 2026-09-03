"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project, TechStackItem } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({
  projects,
  techStacks,
}: {
  projects: Project[];
  techStacks: TechStackItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("init", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {projects.map((project, i) => (
            <div key={project.id} className="pl-6 min-w-0 shrink-0 basis-full sm:basis-[70%] lg:basis-[46%]">
              <ProjectCard project={project} techStacks={techStacks} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="font-mono text-[11px] text-ink-soft">
          {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous project"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="h-9 w-9 flex items-center justify-center border border-line disabled:opacity-30 hover:border-blue hover:text-blue transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            aria-label="Next project"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="h-9 w-9 flex items-center justify-center border border-line disabled:opacity-30 hover:border-blue hover:text-blue transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
