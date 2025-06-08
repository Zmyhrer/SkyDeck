export function PenguinAvatar({
  size = 80,
  primary = "#000000",
  secondary = "#FFFFFF",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 20 Q70 30 70 50 Q70 80 50 90 Q30 80 30 50 Q30 30 50 20"
        fill={primary}
      />
      <circle cx="40" cy="45" r="5" fill={secondary} />
      <circle cx="60" cy="45" r="5" fill={secondary} />
      <circle cx="40" cy="45" r="2" fill={primary} />
      <circle cx="60" cy="45" r="2" fill={primary} />
      <path d="M50 60 Q45 70 50 75 Q55 70 50 60" fill={secondary} />
    </svg>
  );
}
