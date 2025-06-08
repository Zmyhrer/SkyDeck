export function DogAvatar({ size = 80, primary = "#FF6347" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 30 Q70 20 80 40 Q90 60 70 70 Q60 80 50 75 Q40 80 30 70 Q10 60 20 40 Q30 20 50 30"
        fill={primary}
      />
      <circle cx="40" cy="50" r="4" fill="#333" />
      <circle cx="60" cy="50" r="4" fill="#333" />
      <ellipse cx="50" cy="65" rx="5" ry="3" fill="#333" />
      <path d="M35 35 L25 25" stroke="#333" strokeWidth="2" />
      <path d="M65 35 L75 25" stroke="#333" strokeWidth="2" />
    </svg>
  );
}
