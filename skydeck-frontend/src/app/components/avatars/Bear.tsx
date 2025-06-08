export function BearAvatar({
  size = 80,
  primary = "#A05A2C",
  secondary = "#F5DEB3",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill={primary} />
      <circle cx="30" cy="30" r="12" fill={primary} />
      <circle cx="70" cy="30" r="12" fill={primary} />
      <circle cx="30" cy="30" r="6" fill={secondary} />
      <circle cx="70" cy="30" r="6" fill={secondary} />
      <circle cx="40" cy="50" r="5" fill="#333" />
      <circle cx="60" cy="50" r="5" fill="#333" />
      <ellipse cx="50" cy="65" rx="5" ry="4" fill="#333" />
      <path d="M45 70 Q50 75 55 70" stroke={secondary} strokeWidth="2" />
    </svg>
  );
}
