export default function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="relative w-full h-full bg-paper-raised overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id="diag" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
      <span className="absolute bottom-3 left-3 font-mono text-[11px] text-ink-soft">
        {label}
      </span>
    </div>
  );
}
