export function RabbitAvatar({ size = 80, primary = "#DDA0DD" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M50 30 Q60 10 80 20 Q90 40 70 60 Q60 80 50 70 Q40 80 30 60 Q10 40 20 20 Q40 10 50 30"
        fill={primary}
      />
      <path d="M30 15 L20 5" stroke="#333" strokeWidth="3" />
      <path d="M70 15 L80 5" stroke="#333" strokeWidth="3" />
      <circle cx="40" cy="50" r="3" fill="#333" />
      <circle cx="60" cy="50" r="3" fill="#333" />
      <path d="M45 65 Q50 70 55 65" stroke="#333" strokeWidth="2" />
    </svg>
  );
}
