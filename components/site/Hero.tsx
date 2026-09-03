import type { Profile } from "@/lib/types";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="intro" className="scroll-mt-10 px-6 lg:px-16 py-20 lg:py-28 border-b border-line">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          {profile.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-14 w-14 object-cover border border-line"
            />
          )}
          <p className="font-mono text-[13px] text-ink-soft">
            {"//"} {profile.location || "location unset"}
            <span className="code-punct">,</span> <span className="code-string">available for work</span>
          </p>
        </div>

        <h1 className="font-display font-semibold text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1]">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-base sm:text-lg text-blue">{profile.role}</p>

        <p className="mt-8 text-lg leading-relaxed max-w-xl text-ink">
          {profile.tagline}
        </p>

        <p className="mt-5 leading-relaxed max-w-xl text-[15px] text-ink-soft">
          {profile.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[13px]">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="border-b border-ink pb-0.5 hover:text-blue hover:border-blue transition-colors">
              {profile.email}
            </a>
          )}
          {profile.socials?.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-blue transition-colors"
            >
              {s.label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-blue transition-colors"
            >
              Résumé
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
