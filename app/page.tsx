import { readDb } from "@/lib/db";
import Sidebar from "@/components/site/Sidebar";
import Hero from "@/components/site/Hero";
import Projects from "@/components/site/Projects";

export const dynamic = "force-dynamic";

export default function Home() {
  const db = readDb();

  return (
    <div className="flex flex-col lg:flex-row flex-1">
      <Sidebar name={db.profile.name} />
      <main className="flex-1 min-w-0">
        <Hero profile={db.profile} techStacks={db.techStacks} />
        <Projects projects={db.projects} techStacks={db.techStacks} />
        <footer className="px-6 lg:px-16 py-10 flex items-center justify-between font-mono text-[11px] text-ink-soft">
          <span>&copy; {new Date().getFullYear()} {db.profile.name}</span>
        </footer>
      </main>
    </div>
  );
}