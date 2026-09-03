"use client";

import { useState } from "react";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";
import type { Project, TechStackItem } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";

type View = "grid" | "carousel";

export default function Projects({
  projects,
  techStacks,
}: {
  projects: Project[];
  techStacks: TechStackItem[];
}) {
  const [view, setView] = useState<View>("grid");
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="scroll-mt-10 px-6 lg:px-16 py-20 lg:py-28">
      <div className="flex items-baseline justify-between mb-12 gap-6">
        <h2 className="font-display font-semibold text-2xl">Selected work</h2>

        <div className="flex items-center border border-line font-mono text-[11px]">
          <button
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
              view === "grid" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            <LayoutGrid size={13} /> Grid
          </button>
          <button
            onClick={() => setView("carousel")}
            aria-pressed={view === "carousel"}
            className={`flex items-center gap-1.5 px-3 py-1.5 border-l border-line transition-colors ${
              view === "carousel" ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            <GalleryHorizontal size={13} /> Carousel
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-ink-soft text-sm">No projects added yet.</p>
      ) : view === "grid" ? (
        <div className="grid sm:grid-cols-2 gap-8">
          {sorted.map((project, i) => (
            <ProjectCard key={project.id} project={project} techStacks={techStacks} index={i} />
          ))}
        </div>
      ) : (
        <ProjectCarousel projects={sorted} techStacks={techStacks} />
      )}
    </section>
  );
}
