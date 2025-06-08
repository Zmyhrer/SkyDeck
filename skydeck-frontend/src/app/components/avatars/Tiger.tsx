export function TigerAvatar({
  size = 80,
  primary = "#FF8C00",
  secondary = "#000000",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill={primary} />
      <path
        d="M30 30 Q50 20 70 30"
        stroke={secondary}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M40 40 L45 35 M60 40 L55 35"
        stroke={secondary}
        strokeWidth="2"
      />
      <circle cx="40" cy="50" r="5" fill={secondary} />
      <circle cx="60" cy="50" r="5" fill={secondary} />
      <path d="M45 65 Q50 70 55 65" stroke={secondary} strokeWidth="3" />
      <path
        d="M30 70 L40 65 M70 70 L60 65"
        stroke={secondary}
        strokeWidth="2"
      />
    </svg>
  );
}
