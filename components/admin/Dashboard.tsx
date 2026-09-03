"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/types";
import ProfileEditor from "./ProfileEditor";
import TechStackEditor from "./TechStackEditor";
import ProjectsEditor from "./ProjectsEditor";

type Tab = "profile" | "stack" | "projects";

export default function Dashboard({ initialData }: { initialData: Database }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [data, setData] = useState<Database>(initialData);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "stack", label: "Tech stack" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between px-6 lg:px-16 py-6 border-b border-line">
        <div>
          <p className="font-mono text-[11px] text-ink-soft">admin</p>
          <h1 className="font-display font-semibold text-2xl">Dashboard</h1>
        </div>
        <div className="flex items-center gap-5 font-mono text-[13px]">
          <a href="/" target="_blank" rel="noreferrer" className="text-ink-soft hover:text-blue transition-colors">
            View site
          </a>
          <button onClick={handleLogout} className="text-ink-soft hover:text-rust transition-colors">
            Log out
          </button>
        </div>
      </header>

      <nav className="flex items-center gap-1 px-6 lg:px-16 border-b border-line font-mono text-[13px]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-blue text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="px-6 lg:px-16 py-10">
        {tab === "profile" && (
          <ProfileEditor profile={data.profile} onSaved={(profile) => setData((d) => ({ ...d, profile }))} />
        )}
        {tab === "stack" && (
          <TechStackEditor
            items={data.techStacks}
            onChange={(techStacks) => setData((d) => ({ ...d, techStacks }))}
          />
        )}
        {tab === "projects" && (
          <ProjectsEditor
            projects={data.projects}
            techStacks={data.techStacks}
            onChange={(projects) => setData((d) => ({ ...d, projects }))}
          />
        )}
      </div>
    </div>
  );
}
