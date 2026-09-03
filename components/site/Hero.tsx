import type { Profile, TechStackItem } from "@/lib/types";
import TechStackMarquee from "./TechStackMarquee";

// Helper to render platform-specific icons based on link label/URL
function SocialIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (normalized.includes("linkedin")) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.41a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
      </svg>
    );
  }

  if (normalized.includes("twitter") || normalized.includes("x")) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

// PDF Icon SVG Component
function PdfIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9.5v-2H8v2H6.5V8H9c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5h-.5v1H11v2zm-.5-5H8V9.5h1.5V11zM17.5 9.5c0-.83-.67-1.5-1.5-1.5H13v8h1.5v-3H16c.83 0 1.5-.67 1.5-1.5v-2zm-3 2V9.5H16V11.5h-1.5z" />
    </svg>
  );
}

export default function Hero({
  profile,
  techStacks,
}: {
  profile: Profile;
  techStacks: TechStackItem[];
}) {
  return (
    <section id="intro" className="relative overflow-hidden scroll-mt-10 py-20 lg:py-28 border-b border-line">
      {/* Low-Opacity Background Image Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] bg-cover bg-center bg-no-repeat dark:invert"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-5xl px-6 lg:px-16 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-2xl flex-1">
            <p className="font-mono text-[13px] text-ink-soft mb-6">
              {"//"} {profile.location || "location unset"}
              <span className="code-punct">,</span> <span className="code-string">available for work</span>
            </p>

            <h1 className="font-display font-semibold text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1]">
              {profile.name}
            </h1>
            <p className="mt-2 font-mono text-base sm:text-lg text-blue">{profile.role}</p>

            <p className="mt-8 text-lg leading-relaxed text-ink">
              {profile.tagline}
            </p>

            <p className="mt-5 leading-relaxed text-[15px] text-ink-soft">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="mt-8 w-full">
          <TechStackMarquee items={techStacks} />
        </div>

        <div className="max-w-5xl px-6 lg:px-16">
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[13px]">
            {/* Email with mail icon */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 hover:text-blue hover:border-blue transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{profile.email}</span>
              </a>
            )}

            {/* Social Links with icons */}
            {profile.socials?.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-soft hover:text-blue transition-colors"
              >
                <SocialIcon label={s.label} />
                <span>{s.label}</span>
              </a>
            ))}

            {/* Résumé link handling open/save PDF */}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-soft hover:text-blue transition-colors"
              >
                <PdfIcon />
                <span>Résumé</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}