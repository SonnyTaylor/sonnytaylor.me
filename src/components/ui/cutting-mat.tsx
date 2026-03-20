"use client";

export function CuttingMat({
  width = 720,
  height = 500,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const pad = 24; // outer border padding
  const rulerH = 14; // ruler strip height
  const innerX = pad + rulerH;
  const innerY = pad + rulerH;
  const innerW = width - 2 * (pad + rulerH);
  const innerH = height - 2 * (pad + rulerH);
  const gridStep = 20; // px per "cm"
  const subStep = gridStep / 5;

  // Ruler tick marks
  const hTicks: React.ReactNode[] = [];
  const vTicks: React.ReactNode[] = [];

  const cmCountH = Math.floor(innerW / gridStep);
  const cmCountV = Math.floor(innerH / gridStep);

  // Horizontal ruler (top & bottom)
  for (let i = 0; i <= cmCountH; i++) {
    const x = innerX + i * gridStep;
    const isMajor = i % 5 === 0;
    const tickLen = isMajor ? 8 : 4;
    // top ruler
    hTicks.push(
      <line key={`ht-${i}`} x1={x} y1={innerY - 1} x2={x} y2={innerY - 1 - tickLen} stroke="rgba(180,230,210,0.5)" strokeWidth={0.5} />,
    );
    // bottom ruler
    hTicks.push(
      <line key={`hb-${i}`} x1={x} y1={height - innerY + 1} x2={x} y2={height - innerY + 1 + tickLen} stroke="rgba(180,230,210,0.5)" strokeWidth={0.5} />,
    );
    if (isMajor && i > 0) {
      hTicks.push(
        <text key={`htl-${i}`} x={x} y={pad + 10} textAnchor="middle" fill="rgba(180,230,210,0.45)" fontSize={6} fontFamily="monospace">{i}</text>,
      );
      hTicks.push(
        <text key={`hbl-${i}`} x={x} y={height - pad - 3} textAnchor="middle" fill="rgba(180,230,210,0.45)" fontSize={6} fontFamily="monospace">{i}</text>,
      );
    }
  }

  // Vertical ruler (left & right)
  for (let i = 0; i <= cmCountV; i++) {
    const y = innerY + i * gridStep;
    const isMajor = i % 5 === 0;
    const tickLen = isMajor ? 8 : 4;
    // left ruler
    vTicks.push(
      <line key={`vl-${i}`} x1={innerX - 1} y1={y} x2={innerX - 1 - tickLen} y2={y} stroke="rgba(180,230,210,0.5)" strokeWidth={0.5} />,
    );
    // right ruler
    vTicks.push(
      <line key={`vr-${i}`} x1={width - innerX + 1} y1={y} x2={width - innerX + 1 + tickLen} y2={y} stroke="rgba(180,230,210,0.5)" strokeWidth={0.5} />,
    );
    if (isMajor && i > 0) {
      vTicks.push(
        <text key={`vll-${i}`} x={pad + 5} y={y + 2} textAnchor="middle" fill="rgba(180,230,210,0.45)" fontSize={6} fontFamily="monospace">{i}</text>,
      );
      vTicks.push(
        <text key={`vrl-${i}`} x={width - pad - 5} y={y + 2} textAnchor="middle" fill="rgba(180,230,210,0.45)" fontSize={6} fontFamily="monospace">{i}</text>,
      );
    }
  }

  // Diagonal angle lines from bottom-left corner
  const angles = [10, 20, 30, 45, 60, 80];
  const originX = innerX;
  const originY = innerY + innerH;
  const diagonals = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const maxLen = Math.max(innerW, innerH) * 1.5;
    const endX = originX + Math.cos(rad) * maxLen;
    const endY = originY - Math.sin(rad) * maxLen;
    // label position
    const labelDist = 60 + deg * 0.5;
    const lx = originX + Math.cos(rad) * labelDist;
    const ly = originY - Math.sin(rad) * labelDist;
    return (
      <g key={`diag-${deg}`}>
        <line
          x1={originX} y1={originY} x2={endX} y2={endY}
          stroke="rgba(180,230,210,0.18)" strokeWidth={0.6}
          clipPath="url(#innerClip)"
        />
        <text
          x={lx} y={ly}
          fill="rgba(180,230,210,0.3)" fontSize={6} fontFamily="monospace"
          transform={`rotate(${-deg}, ${lx}, ${ly})`}
          textAnchor="middle"
        >
          {deg}°
        </text>
      </g>
    );
  });

  // Circle templates (bottom-right)
  const circleArea = { x: width - innerX - 120, y: height - innerY - 50 };
  const circles = [3, 5, 7, 9, 11, 14, 18].map((r, i) => (
    <circle
      key={`circ-${i}`}
      cx={circleArea.x + i * 17}
      cy={circleArea.y + 20}
      r={r / 2}
      fill="none"
      stroke="rgba(180,230,210,0.25)"
      strokeWidth={0.5}
    />
  ));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="innerClip">
          <rect x={innerX} y={innerY} width={innerW} height={innerH} />
        </clipPath>
      </defs>

      {/* Outer mat body */}
      <rect x={0} y={0} width={width} height={height} rx={6} fill="#1a5c3a" />

      {/* Slightly lighter inner border */}
      <rect x={pad} y={pad} width={width - 2 * pad} height={height - 2 * pad} rx={2} fill="none" stroke="rgba(180,230,210,0.2)" strokeWidth={0.5} />

      {/* Inner grid area border */}
      <rect x={innerX} y={innerY} width={innerW} height={innerH} fill="none" stroke="rgba(180,230,210,0.12)" strokeWidth={0.5} />

      {/* Sub-grid (fine lines) */}
      <g clipPath="url(#innerClip)">
        {Array.from({ length: Math.ceil(innerW / subStep) + 1 }, (_, i) => (
          <line key={`sg-v-${i}`} x1={innerX + i * subStep} y1={innerY} x2={innerX + i * subStep} y2={innerY + innerH} stroke="rgba(180,230,210,0.06)" strokeWidth={0.3} />
        ))}
        {Array.from({ length: Math.ceil(innerH / subStep) + 1 }, (_, i) => (
          <line key={`sg-h-${i}`} x1={innerX} y1={innerY + i * subStep} x2={innerX + innerW} y2={innerY + i * subStep} stroke="rgba(180,230,210,0.06)" strokeWidth={0.3} />
        ))}
      </g>

      {/* Major grid (cm lines) */}
      <g clipPath="url(#innerClip)">
        {Array.from({ length: cmCountH + 1 }, (_, i) => (
          <line key={`mg-v-${i}`} x1={innerX + i * gridStep} y1={innerY} x2={innerX + i * gridStep} y2={innerY + innerH} stroke="rgba(180,230,210,0.15)" strokeWidth={0.5} />
        ))}
        {Array.from({ length: cmCountV + 1 }, (_, i) => (
          <line key={`mg-h-${i}`} x1={innerX} y1={innerY + i * gridStep} x2={innerX + innerW} y2={innerY + i * gridStep} stroke="rgba(180,230,210,0.15)" strokeWidth={0.5} />
        ))}
      </g>

      {/* Ruler ticks & labels */}
      {hTicks}
      {vTicks}

      {/* Diagonal angle lines */}
      <g clipPath="url(#innerClip)">
        {diagonals}
      </g>

      {/* "Cutting Mat" label */}
      <text x={innerX + 8} y={innerY + 14} fill="rgba(180,230,210,0.35)" fontSize={8} fontFamily="monospace" fontWeight="bold">
        Cutting Mat
      </text>

      {/* "A3" label */}
      <text x={innerX + 8} y={innerY + 28} fill="rgba(180,230,210,0.3)" fontSize={14} fontFamily="monospace" fontWeight="bold">
        A3
      </text>

      {/* Circle templates */}
      {circles}

      {/* ── Wear & tear ── */}
      <g clipPath="url(#innerClip)">
        {/* Cut / scoring lines — the signature look of a used mat */}
        {/* Long horizontal cuts — deep scores, clearly visible */}
        <line x1={innerX + 40} y1={innerY + 160} x2={innerX + 300} y2={innerY + 163} stroke="rgba(160,220,190,0.35)" strokeWidth={0.8} />
        <line x1={innerX + 150} y1={innerY + 300} x2={innerX + 460} y2={innerY + 296} stroke="rgba(160,220,190,0.28)" strokeWidth={0.7} />
        <line x1={innerX + 80} y1={innerY + 240} x2={innerX + 220} y2={innerY + 242} stroke="rgba(160,220,190,0.30)" strokeWidth={0.7} />
        <line x1={innerX + 320} y1={innerY + 180} x2={innerX + 500} y2={innerY + 176} stroke="rgba(160,220,190,0.22)" strokeWidth={0.6} />
        {/* Diagonal cuts — blade dragged at angles */}
        <line x1={innerX + 180} y1={innerY + 80} x2={innerX + 330} y2={innerY + 210} stroke="rgba(160,220,190,0.32)" strokeWidth={0.8} />
        <line x1={innerX + 340} y1={innerY + 130} x2={innerX + 470} y2={innerY + 300} stroke="rgba(160,220,190,0.25)" strokeWidth={0.7} />
        <line x1={innerX + 60} y1={innerY + 320} x2={innerX + 200} y2={innerY + 420} stroke="rgba(160,220,190,0.28)" strokeWidth={0.7} />
        <line x1={innerX + 400} y1={innerY + 60} x2={innerX + 500} y2={innerY + 180} stroke="rgba(160,220,190,0.20)" strokeWidth={0.6} />
        {/* Short nicks — where blade poked through */}
        <line x1={innerX + 290} y1={innerY + 220} x2={innerX + 310} y2={innerY + 224} stroke="rgba(160,220,190,0.40)" strokeWidth={1.0} />
        <line x1={innerX + 140} y1={innerY + 390} x2={innerX + 155} y2={innerY + 386} stroke="rgba(160,220,190,0.38)" strokeWidth={0.9} />
        <line x1={innerX + 410} y1={innerY + 90} x2={innerX + 425} y2={innerY + 94} stroke="rgba(160,220,190,0.35)" strokeWidth={0.8} />
        <line x1={innerX + 240} y1={innerY + 45} x2={innerX + 250} y2={innerY + 42} stroke="rgba(160,220,190,0.32)" strokeWidth={0.8} />
        <line x1={innerX + 480} y1={innerY + 350} x2={innerX + 492} y2={innerY + 346} stroke="rgba(160,220,190,0.30)" strokeWidth={0.7} />
        {/* Cross-hatch area — where someone made multiple cuts in one spot */}
        <line x1={innerX + 260} y1={innerY + 280} x2={innerX + 360} y2={innerY + 288} stroke="rgba(160,220,190,0.26)" strokeWidth={0.7} />
        <line x1={innerX + 275} y1={innerY + 268} x2={innerX + 345} y2={innerY + 305} stroke="rgba(160,220,190,0.24)" strokeWidth={0.6} />
        <line x1={innerX + 270} y1={innerY + 300} x2={innerX + 350} y2={innerY + 275} stroke="rgba(160,220,190,0.22)" strokeWidth={0.6} />
        <line x1={innerX + 255} y1={innerY + 290} x2={innerX + 365} y2={innerY + 295} stroke="rgba(160,220,190,0.20)" strokeWidth={0.5} />

        {/* Faded / worn patches — lighter areas from heavy use */}
        <rect x={innerX + 100} y={innerY + 130} width={180} height={130} rx={25} fill="rgba(180,230,210,0.06)" />
        <rect x={innerX + 280} y={innerY + 230} width={140} height={100} rx={20} fill="rgba(180,230,210,0.05)" />
        <ellipse cx={innerX + 230} cy={innerY + 380} rx={100} ry={50} fill="rgba(180,230,210,0.045)" />

        {/* Corner wear — bottom-left corner is most used, noticeably lighter */}
        <rect x={innerX} y={innerY + innerH - 100} width={150} height={100} fill="rgba(180,230,210,0.07)" />
        {/* Top-center wear — where ruler/straight-edge gets placed */}
        <rect x={innerX + 100} y={innerY} width={350} height={30} fill="rgba(180,230,210,0.035)" />
      </g>

    </svg>
  );
}
