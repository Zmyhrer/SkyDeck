export function MonkeyAvatar({
  size = 80,
  primary = "#8B4513",
  secondary = "#F5DEB3",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="35" fill={primary} />
      <circle cx="40" cy="45" r="5" fill="#333" />
      <circle cx="60" cy="45" r="5" fill="#333" />
      <path
        d="M45 60 Q50 65 55 60"
        stroke={secondary}
        strokeWidth="2"
        fill="none"
      />
      <circle cx="50" cy="30" r="15" fill={primary} />
      <circle cx="50" cy="25" r="10" fill={secondary} />
    </svg>
  );
}
