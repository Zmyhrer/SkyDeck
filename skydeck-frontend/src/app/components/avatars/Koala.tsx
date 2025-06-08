export function KoalaAvatar({
  size = 80,
  primary = "#A9A9A9",
  secondary = "#FFFFFF",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="35" fill={primary} />
      <circle cx="40" cy="45" r="5" fill="#333" />
      <circle cx="60" cy="45" r="5" fill="#333" />
      <circle cx="40" cy="45" r="2" fill={secondary} />
      <circle cx="60" cy="45" r="2" fill={secondary} />
      <path d="M45 60 Q50 65 55 60" stroke="#333" strokeWidth="2" fill="none" />
      <circle cx="50" cy="30" r="10" fill={primary} />
      <circle cx="50" cy="25" r="5" fill={secondary} />
    </svg>
  );
}
