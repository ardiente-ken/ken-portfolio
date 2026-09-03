"use client";

import type { Project, TechStackItem } from "@/lib/types";
import ProjectForm from "./ProjectForm";

const BLANK: Omit<Project, "id"> = {
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  images: [],
  order: 0,
};

export default function ProjectsEditor({
  projects,
  techStacks,
  onChange,
}: {
  projects: Project[];
  techStacks: TechStackItem[];
  onChange: (projects: Project[]) => void;
}) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  async function saveExisting(id: string, draft: Omit<Project, "id">) {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (res.ok) onChange(await res.json());
  }

  async function createNew(draft: Omit<Project, "id">) {
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (res.ok) onChange(await res.json());
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) onChange(await res.json());
  }

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {sorted.map((project) => (
        <ProjectForm
          key={project.id}
          project={project}
          techStacks={techStacks}
          submitLabel="Save changes"
          onSave={(draft) => saveExisting(project.id, draft)}
          onDelete={() => deleteProject(project.id)}
        />
      ))}

      <div>
        <p className="font-mono text-[11px] text-ink-soft mb-3 pt-6 border-t border-line">
          Add a new project
        </p>
        <ProjectForm
          key={sorted.length}
          project={{ ...BLANK, order: sorted.length + 1 }}
          techStacks={techStacks}
          submitLabel="Add project"
          onSave={createNew}
        />
      </div>
    </div>
  );
}
