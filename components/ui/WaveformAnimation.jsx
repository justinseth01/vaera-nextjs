'use client'

import { useState, useEffect } from 'react'

export default function WaveformAnimation() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 2)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const generatePath = () => {
    let d = 'M 0 50'
    for (let x = 0; x <= 200; x += 5) {
      const y = 50 + Math.sin((x + offset) * 0.05) * 30 * Math.sin((x + offset) * 0.02)
      d += ` L ${x} ${y}`
    }
    return d
  }

  return (
    <svg viewBox="0 0 200 100" className="w-48 h-24">
      <path
        d={generatePath()}
        fill="none"
        stroke="#1F2A37"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={generatePath()}
        fill="none"
        stroke="#DCEFF6"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
        style={{ filter: 'blur(4px)' }}
      />
    </svg>
  )
}
