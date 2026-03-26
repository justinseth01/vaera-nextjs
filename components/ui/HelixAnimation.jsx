export default function HelixAnimation() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 animate-spin" style={{ animationDuration: '20s' }}>
      <defs>
        <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DCEFF6" />
          <stop offset="100%" stopColor="#1F2A37" />
        </linearGradient>
      </defs>
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          cx={100 + Math.cos((i * 30 * Math.PI) / 180) * 60}
          cy={100 + Math.sin((i * 30 * Math.PI) / 180) * 60}
          r={8 - i * 0.3}
          fill="url(#helixGrad)"
          opacity={1 - i * 0.06}
        />
      ))}
      <circle cx="100" cy="100" r="20" fill="none" stroke="#1F2A37" strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#1F2A37" strokeWidth="1" opacity="0.15" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#1F2A37" strokeWidth="1" opacity="0.1" />
    </svg>
  )
}
