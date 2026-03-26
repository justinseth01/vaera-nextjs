'use client'

import { useState, useEffect } from 'react'

export default function ScannerAnimation() {
  const [lineY, setLineY] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineY((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-48 h-48">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
        {[...Array(64)].map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-vaera-navy/10 transition-all duration-200"
            style={{
              backgroundColor: Math.floor(i / 8) * 12.5 < lineY && Math.floor(i / 8) * 12.5 > lineY - 20
                ? '#DCEFF6'
                : undefined,
            }}
          />
        ))}
      </div>
      <div
        className="absolute left-0 right-0 h-px bg-vaera-ice shadow-lg"
        style={{
          top: `${lineY}%`,
          boxShadow: '0 0 20px 4px rgba(220, 239, 246, 0.6)',
        }}
      />
    </div>
  )
}
