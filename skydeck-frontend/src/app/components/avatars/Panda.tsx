export function PandaAvatar({
  size = 80,
  primary = "#FFFFFF",
  secondary = "#000000",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill={primary}
        stroke={secondary}
        strokeWidth="2"
      />
      <circle cx="35" cy="40" r="8" fill={secondary} />
      <circle cx="65" cy="40" r="8" fill={secondary} />
      <circle cx="50" cy="60" r="6" fill={secondary} />
      <path
        d="M40 65 Q50 70 60 65"
        stroke={secondary}
        strokeWidth="2"
        fill="none"
      />
      <circle cx="30" cy="30" r="5" fill={secondary} />
      <circle cx="70" cy="30" r="5" fill={secondary} />
    </svg>
  );
}
