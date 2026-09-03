"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import type { Profile } from "@/lib/types";
import ImageUploader from "./ImageUploader";

export default function ProfileEditor({
  profile,
  onSaved,
}: {
  profile: Profile;
  onSaved: (p: Profile) => void;
}) {
  const [form, setForm] = useState<Profile>(profile);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setSocial(i: number, key: "label" | "url", value: string) {
    const socials = [...form.socials];
    socials[i] = { ...socials[i], [key]: value };
    set("socials", socials);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    const saved = await res.json();
    onSaved(saved);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Name">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className="input" />
        </Field>
        <Field label="Role">
          <input value={form.role} onChange={(e) => set("role", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Tagline" className="mt-6">
        <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="input" />
      </Field>

      <Field label="Bio" className="mt-6">
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          rows={5}
          className="input resize-y"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-6 mt-6">
        <Field label="Location">
          <input value={form.location} onChange={(e) => set("location", e.target.value)} className="input" />
        </Field>
        <Field label="Email">
          <input value={form.email} onChange={(e) => set("email", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Résumé URL" className="mt-6">
        <input value={form.resumeUrl} onChange={(e) => set("resumeUrl", e.target.value)} className="input" />
      </Field>

      <Field label="Avatar" className="mt-6">
        <div className="flex items-center gap-4">
          {form.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.avatar} alt="Avatar" className="h-14 w-14 object-cover border border-line" />
          )}
          <ImageUploader label="Upload avatar" onUploaded={(url) => set("avatar", url)} />
        </div>
      </Field>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[11px] text-ink-soft">Social links</p>
          <button
            type="button"
            onClick={() => set("socials", [...form.socials, { label: "", url: "" }])}
            className="flex items-center gap-1 font-mono text-[11px] text-ink-soft hover:text-blue"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {form.socials.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                placeholder="Label"
                value={s.label}
                onChange={(e) => setSocial(i, "label", e.target.value)}
                className="input w-32"
              />
              <input
                placeholder="https://"
                value={s.url}
                onChange={(e) => setSocial(i, "url", e.target.value)}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => set("socials", form.socials.filter((_, idx) => idx !== i))}
                className="text-ink-soft hover:text-rust"
                aria-label="Remove social link"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button type="submit" disabled={status === "saving"} className="btn-primary">
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
        {status === "saved" && <span className="font-mono text-[11px] text-blue">Saved</span>}
        {status === "error" && <span className="font-mono text-[11px] text-rust">Save failed</span>}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-[11px] text-ink-soft mb-1.5">{label}</label>
      {children}
    </div>
  );
}
