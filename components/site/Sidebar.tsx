"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { id: "intro", label: "Intro", num: "01" },
  { id: "projects", label: "Projects", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
];

export default function Sidebar({ name }: { name: string }) {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-56 shrink-0 flex lg:flex-col justify-between lg:py-14 py-6 px-6 lg:px-8 border-b lg:border-b-0 lg:border-r border-line">
      <div className="flex items-center justify-between lg:block">
        <div>
          <p className="font-display font-semibold text-lg leading-none">{name}</p>
          <p className="font-mono text-[11px] text-ink-soft mt-1.5">
            <span className="code-punct">{"//"}</span> developer index
          </p>
        </div>
        <ThemeToggle className="lg:hidden" />
      </div>

      <nav className="hidden lg:flex flex-col gap-1 mt-10">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-baseline gap-3 py-2 transition-colors ${
              active === s.id ? "text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            <span className="font-mono text-[11px]">{s.num}</span>
            <span
              className={`font-display text-base relative ${
                active === s.id ? "after:w-full" : "after:w-0"
              } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-ink after:transition-all`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="hidden lg:flex items-center justify-between">
        <p className="font-mono text-[11px] text-ink-soft">rev. {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
