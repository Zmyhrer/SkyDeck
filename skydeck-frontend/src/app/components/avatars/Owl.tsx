export function OwlAvatar({ size = 80, primary = "#4682B4" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 20 Q70 30 70 50 Q70 70 50 80 Q30 70 30 50 Q30 30 50 20"
        fill={primary}
      />
      <circle cx="40" cy="50" r="8" fill="#333" />
      <circle cx="60" cy="50" r="8" fill="#333" />
      <circle cx="40" cy="50" r="3" fill="#FFF" />
      <circle cx="60" cy="50" r="3" fill="#FFF" />
      <path d="M45 70 Q50 75 55 70" stroke="#333" strokeWidth="2" />
    </svg>
  );
}
