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

    </svg>
  );
}
