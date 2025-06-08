export function CatAvatar({ size = 80, primary = "#FFD700" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M50 20 L30 50 L40 80 L60 80 L70 50 Z" fill={primary} />
      <circle cx="40" cy="50" r="5" fill="#333" />
      <circle cx="60" cy="50" r="5" fill="#333" />
      <path d="M45 65 L55 65" stroke="#333" strokeWidth="2" />
      <path d="M30 30 L20 20" stroke="#333" strokeWidth="3" />
      <path d="M70 30 L80 20" stroke="#333" strokeWidth="3" />
    </svg>
  );
}
