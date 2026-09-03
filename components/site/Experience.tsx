import type { ExperienceItem } from "@/lib/types";

export default function Experience({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  return (
    <section id="experience" className="scroll-mt-10 py-16 lg:py-24 border-b border-line">
      <div className="max-w-5xl px-6 lg:px-16">
        <p className="font-mono text-[13px] text-ink-soft mb-3">
          {"//"} career history
        </p>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-12">
          Experience
        </h2>

        <div className="relative border-l border-line ml-3 md:ml-4 pl-6 md:pl-10 space-y-12">
          {experiences.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot accent */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-3 w-3 rounded-full border border-line bg-surface group-hover:border-blue group-hover:bg-blue transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.role}{" "}
                  <span className="text-blue font-mono text-base font-normal">
                    @ {item.company}
                  </span>
                </h3>
                <span className="font-mono text-xs text-ink-soft shrink-0">
                  {item.period}
                </span>
              </div>

              {item.location && (
                <p className="font-mono text-xs text-ink-soft mt-1">
                  {item.location}
                </p>
              )}

              <ul className="mt-4 space-y-2 text-[15px] text-ink-soft leading-relaxed list-disc list-inside">
                {item.description.map((bullet, i) => (
                  <li key={i} className="marker:text-blue">
                    <span className="text-ink-soft">{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.techStack && item.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 rounded border border-line text-ink-soft bg-surface"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}