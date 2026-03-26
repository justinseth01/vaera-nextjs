'use client'

import { useState, useEffect } from 'react'

export default function HeartPulseAnimation() {
  const [scale, setScale] = useState(1)
  const [ripples, setRipples] = useState([])
  const [glowIntensity, setGlowIntensity] = useState(0.3)

  useEffect(() => {
    let beatCount = 0

    const heartbeat = () => {
      beatCount++

      // Beat animation sequence
      // Quick expand
      setScale(1.15)
      setGlowIntensity(0.8)

      // Add ripple
      setRipples(prev => [...prev, { id: beatCount, scale: 1 }])

      // Contract
      setTimeout(() => {
        setScale(0.95)
        setGlowIntensity(0.4)
      }, 100)

      // Return to normal
      setTimeout(() => {
        setScale(1)
        setGlowIntensity(0.3)
      }, 200)

      // Clean up old ripples
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id > beatCount - 3))
      }, 1500)
    }

    // Initial beat
    heartbeat()

    // Heartbeat interval (~65 BPM for calming effect)
    const interval = setInterval(heartbeat, 920)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Container for heart and ripples */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-20 h-20 rounded-full border-2 border-vaera-ice/40 animate-ripple"
              style={{
                animation: 'ripple 1.5s ease-out forwards',
              }}
            />
          </div>
        ))}

        {/* Glow effect */}
        <div
          className="absolute w-28 h-28 rounded-full bg-vaera-ice/20 blur-xl transition-all duration-200"
          style={{ opacity: glowIntensity }}
        />

        {/* Heart SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-20 h-20 transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${scale})`,
            filter: `drop-shadow(0 0 ${glowIntensity * 20}px rgba(220, 239, 246, ${glowIntensity}))`,
          }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#DCEFF6"
            stroke="#1F2A37"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Status text */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-vaera-navy/60 uppercase tracking-wider">
            Recovery Active
          </span>
        </div>
        <p className="font-mono text-[10px] text-vaera-navy/40">
          Collagen synthesis in progress
        </p>
      </div>

      {/* Inline keyframes for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
