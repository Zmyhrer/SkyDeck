export function FoxAvatar({ size = 80, primary = "#FF8C00" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 20 L30 40 L20 70 L40 80 L60 80 L80 70 L70 40 Z"
        fill={primary}
      />
      <circle cx="40" cy="50" r="4" fill="#333" />
      <circle cx="60" cy="50" r="4" fill="#333" />
      <path d="M45 65 L55 65" stroke="#333" strokeWidth="2" />
      <path d="M30 25 L20 15" stroke="#333" strokeWidth="2" />
      <path d="M70 25 L80 15" stroke="#333" strokeWidth="2" />
    </svg>
  );
}
