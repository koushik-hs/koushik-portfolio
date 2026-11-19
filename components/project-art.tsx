type MotifProps = { index: number };

function Motif({ index }: MotifProps) {
  if (index === 0) return (
    <g fill="none">
      <path d="M30 105H290M160 19V191" stroke="currentColor" opacity=".3" />
      <ellipse cx="160" cy="105" rx="100" ry="48" transform="rotate(-23 160 105)" stroke="currentColor" />
      <ellipse cx="160" cy="105" rx="92" ry="40" transform="rotate(28 160 105)" stroke="currentColor" opacity=".52" />
      <circle cx="160" cy="105" r="56" stroke="currentColor" strokeDasharray="2 5" />
      <circle cx="160" cy="105" r="33" fill="var(--art-bg)" stroke="currentColor" />
      <path d="M146 106l10 10 20-23" stroke="currentColor" strokeWidth="3" />
      <circle cx="247" cy="69" r="5" fill="currentColor" />
    </g>
  );
  if (index === 1) return (
    <g stroke="currentColor">
      <path d="M46 117 110 56 216 45 275 112 218 162 116 169 46 117 218 162 110 56 275 112 116 169 216 45" fill="none" opacity=".66" />
      <path d="M110 56 218 162 275 112" fill="none" strokeWidth="2" />
      <g fill="var(--art-bg)">
        <circle cx="46" cy="117" r="9" /><circle cx="110" cy="56" r="14" />
        <circle cx="216" cy="45" r="10" /><circle cx="275" cy="112" r="14" />
        <circle cx="218" cy="162" r="15" /><circle cx="116" cy="169" r="9" />
      </g>
      <g fill="currentColor">
        <circle cx="110" cy="56" r="4" /><circle cx="275" cy="112" r="4" /><circle cx="218" cy="162" r="4" />
      </g>
    </g>
  );
  if (index === 2) return (
    <g fill="none" stroke="currentColor">
      <path d="M21 68H299M21 109H299M21 150H299" opacity=".45" strokeDasharray="3 6" />
      <path d="M21 117h37l14-14 11 14h25l14-43 13 72 13-29h32l13-15 13 15h18l13-60 16 101 14-41h32" strokeWidth="2.5" />
      <circle cx="238" cy="57" r="16" opacity=".55" /><circle cx="238" cy="57" r="4" fill="currentColor" />
    </g>
  );
  return (
    <g fill="none" stroke="currentColor">
      <path d="M64 130 160 63 256 130H64Z" />
      <path d="M160 63V153M40 130H280" strokeDasharray="3 5" />
      <circle cx="160" cy="63" r="29" opacity=".45" />
      <path d="M150 53h20v20h-20zM54 120h20v20H54zM246 120h20v20h-20z" fill="var(--art-bg)" />
      <circle cx="160" cy="153" r="6" fill="currentColor" />
    </g>
  );
}

export function ProjectArt({ index }: MotifProps) {
  const captions = ['Identity / permission', 'Entity / relationship', 'Activity / alert', 'Traffic / observation'];
  return (
    <div className={`project-art art-${index}`} aria-hidden="true">
      <span className="label art-index">0{index + 1} /</span>
      <svg viewBox="0 0 320 210"><Motif index={index} /></svg>
      <span className="label art-caption">{captions[index]}</span>
    </div>
  );
}
