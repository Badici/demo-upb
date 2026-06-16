import type { CSSProperties } from "react";

function safeId(label: string) {
  return label.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24) || "banner";
}

export function SvgPlaceholder({
  label,
  width = 900,
  height = 450,
  style,
}: {
  label: string;
  width?: number;
  height?: number;
  tone?: "blue" | "navy";
  style?: CSSProperties;
}) {
  const uid = safeId(label);
  const navy = "#0a1a33";
  const navyMid = "#132c50";
  const accent = "#3b82f6";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={navy} />
          <stop offset="55%" stopColor={navyMid} />
          <stop offset="100%" stopColor={navy} />
        </linearGradient>
        <pattern
          id={`grid-${uid}`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={accent}
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={navy} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={`url(#bg-${uid})`} />
      <rect width={width} height={height} fill={`url(#grid-${uid})`} />
      <rect width={width} height={height} fill={`url(#glow-${uid})`} />

      <rect
        x="24"
        y="24"
        width={width - 48}
        height={height - 48}
        rx="16"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />

      <text
        x={width / 2}
        y={height / 2 - 8}
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="#f8fafc"
        fillOpacity="0.92"
      >
        {label}
      </text>

      <text
        x={width / 2}
        y={height / 2 + 28}
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        fill="#93c5fd"
        fillOpacity="0.7"
      >
        Banner placeholder
      </text>
    </svg>
  );
}
