export function LionAvatar({
  size = 80,
  primary = "#FFD700",
  secondary = "#8B4513",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="35" fill={primary} />
      <path
        d="M50 30 Q60 15 70 30 Q75 40 70 50 Q65 60 50 65 Q35 60 30 50 Q25 40 30 30 Q40 15 50 30"
        fill={secondary}
        opacity="0.3"
      />
      <circle cx="40" cy="45" r="5" fill="#333" />
      <circle cx="60" cy="45" r="5" fill="#333" />
      <path d="M45 60 Q50 65 55 60" stroke="#333" strokeWidth="2" />
    </svg>
  );
}
