"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import type { Project, TechStackItem } from "@/lib/types";
import ImageUploader from "./ImageUploader";

type Draft = Omit<Project, "id"> & { id?: string };

export default function ProjectForm({
  project,
  techStacks,
  onSave,
  onDelete,
  submitLabel,
}: {
  project: Draft;
  techStacks: TechStackItem[];
  onSave: (draft: Draft) => Promise<void>;
  onDelete?: () => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState<Draft>(project);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleTech(id: string) {
    const has = form.techStack.includes(id);
    set("techStack", has ? form.techStack.filter((t) => t !== id) : [...form.techStack, id]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line p-5 flex flex-col gap-5">
      <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
        <div>
          <label className="block font-mono text-[11px] text-ink-soft mb-1.5">Title</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className="input" required />
        </div>
        <div>
          <label className="block font-mono text-[11px] text-ink-soft mb-1.5">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] text-ink-soft mb-1.5">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className="input resize-y"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[11px] text-ink-soft mb-1.5">Live URL</label>
          <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} className="input" />
        </div>
        <div>
          <label className="block font-mono text-[11px] text-ink-soft mb-1.5">GitHub URL</label>
          <input value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] text-ink-soft mb-2">Tech stack used</label>
        {techStacks.length === 0 ? (
          <p className="text-xs text-ink-soft">Add tech stack items first.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {techStacks.map((t) => {
              const active = form.techStack.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTech(t.id)}
                  className={`px-2.5 py-1 text-[13px] border transition-colors ${
                    active ? "bg-ink text-paper border-ink" : "border-line text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <label className="block font-mono text-[11px] text-ink-soft mb-2">Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map((img, i) => (
            <div key={img} className="relative h-20 w-28 border border-line group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                className="absolute -top-2 -right-2 h-5 w-5 bg-ink text-paper flex items-center justify-center"
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <ImageUploader label="Add image" onUploaded={(url) => set("images", [...form.images, url])} />
      </div>

      <div className="flex items-center gap-4 pt-1">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving..." : submitLabel}
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft hover:text-rust"
          >
            <Trash2 size={13} /> Delete project
          </button>
        )}
      </div>
    </form>
  );
}
