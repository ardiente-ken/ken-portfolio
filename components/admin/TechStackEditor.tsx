"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import type { TechStackItem } from "@/lib/types";

const EMPTY = { name: "", category: "", level: 70 };

export default function TechStackEditor({
  items,
  onChange,
}: {
  items: TechStackItem[];
  onChange: (items: TechStackItem[]) => void;
}) {
  const [draft, setDraft] = useState(EMPTY);
  const [saving, setSaving] = useState<string | null>(null);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name || !draft.category) return;
    setSaving("new");
    const res = await fetch("/api/admin/techstacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    setSaving(null);
    if (res.ok) {
      onChange(await res.json());
      setDraft(EMPTY);
    }
  }

  async function updateItem(id: string, patch: Partial<TechStackItem>) {
    setSaving(id);
    const res = await fetch(`/api/admin/techstacks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setSaving(null);
    if (res.ok) onChange(await res.json());
  }

  async function deleteItem(id: string) {
    setSaving(id);
    const res = await fetch(`/api/admin/techstacks/${id}`, { method: "DELETE" });
    setSaving(null);
    if (res.ok) onChange(await res.json());
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center gap-3 border border-line p-3">
            <input
              defaultValue={item.name}
              onBlur={(e) => e.target.value !== item.name && updateItem(item.id, { name: e.target.value })}
              className="input flex-1 min-w-[8rem]"
            />
            <input
              defaultValue={item.category}
              onBlur={(e) =>
                e.target.value !== item.category && updateItem(item.id, { category: e.target.value })
              }
              className="input flex-1 min-w-[8rem]"
            />
            <div className="flex items-center gap-2 w-40">
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={item.level}
                onMouseUp={(e) => updateItem(item.id, { level: Number((e.target as HTMLInputElement).value) })}
                onTouchEnd={(e) => updateItem(item.id, { level: Number((e.target as HTMLInputElement).value) })}
                className="flex-1 accent-[color:var(--blue)]"
              />
              <span className="font-mono text-[11px] text-ink-soft w-7">{item.level}</span>
            </div>
            <button
              type="button"
              onClick={() => deleteItem(item.id)}
              disabled={saving === item.id}
              className="text-ink-soft hover:text-rust"
              aria-label="Delete tech stack item"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-ink-soft">Nothing added yet.</p>}
      </div>

      <form onSubmit={addItem} className="flex flex-wrap items-center gap-3 mt-6 border-t border-line pt-6">
        <input
          placeholder="Name (e.g. Rust)"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="input flex-1 min-w-[8rem]"
        />
        <input
          placeholder="Category (e.g. Language)"
          value={draft.category}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
          className="input flex-1 min-w-[8rem]"
        />
        <div className="flex items-center gap-2 w-40">
          <input
            type="range"
            min={0}
            max={100}
            value={draft.level}
            onChange={(e) => setDraft({ ...draft, level: Number(e.target.value) })}
            className="flex-1 accent-[color:var(--blue)]"
          />
          <span className="font-mono text-[11px] text-ink-soft w-7">{draft.level}</span>
        </div>
        <button type="submit" disabled={saving === "new"} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Add
        </button>
      </form>
    </div>
  );
}
