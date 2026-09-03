"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, TechStackItem } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default function Projects({
  projects,
  techStacks,
}: {
  projects: Project[];
  techStacks: TechStackItem[];
}) {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const visibleProjects = showAll ? sorted : sorted.slice(0, 2);

  return (
    <section id="projects" className="scroll-mt-10 px-6 lg:px-16 py-20 lg:py-28">
      <div className="flex items-center justify-between mb-12 gap-6">
        <h2 className="font-display font-semibold text-2xl">Featured work</h2>
        
        {sorted.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium hover:text-ink-soft transition-colors"
          >
            {showAll ? "Show less" : `View all (${sorted.length})`}
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="text-ink-soft text-sm">No projects added yet.</p>
      ) : (
        <motion.div 
          layout
          className="grid sm:grid-cols-2 gap-8"
        >
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ProjectCard
                  project={project}
                  techStacks={techStacks}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}