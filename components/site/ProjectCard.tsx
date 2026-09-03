import type { Project, TechStackItem } from "@/lib/types";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProjectCard({
  project,
  techStacks,
  index,
}: {
  project: Project;
  techStacks: TechStackItem[];
  index: number;
}) {
  const tags = project.techStack
    .map((id) => techStacks.find((t) => t.id === id))
    .filter(Boolean) as TechStackItem[];

  const image = project.images?.[0];

  return (
    <article className="flex flex-col h-full border border-line">
      <div className="relative aspect-[16/10] w-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder label={`fig. ${String(index + 1).padStart(2, "0")}`} />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-semibold text-lg">{project.title}</h3>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">
          {project.description}
        </p>

        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li
                key={t.id}
                className="font-mono text-[11px] px-2 py-1 border border-line text-ink-soft bg-paper-raised"
              >
                {t.name}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center gap-5 font-mono text-[13px]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-ink pb-0.5 hover:text-blue hover:border-blue transition-colors"
            >
              View live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-blue transition-colors"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
