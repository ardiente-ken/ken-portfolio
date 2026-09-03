"use client";

import type { Project, TechStackItem } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default function Projects({
  projects,
  techStacks,
}: {
  projects: Project[];
  techStacks: TechStackItem[];
}) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="scroll-mt-10 px-6 lg:px-16 py-20 lg:py-28">
      <div className="flex items-baseline justify-between mb-12 gap-6">
        <h2 className="font-display font-semibold text-2xl">Featured work</h2>
      </div>

      {sorted.length === 0 ? (
        <p className="text-ink-soft text-sm">No projects added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-8">
          {sorted.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              techStacks={techStacks}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}