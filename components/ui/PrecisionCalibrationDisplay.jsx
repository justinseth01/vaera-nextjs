'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Crosshair } from 'lucide-react'

const concerns = [
  { id: 'fine-lines', label: 'Fine Lines', depth: 0.5, speed: 'FAST' },
  { id: 'acne-scars', label: 'Acne Scars', depth: 1.5, speed: 'MED' },
  { id: 'hair-loss', label: 'Hair Loss', depth: 1.0, speed: 'FAST' },
]

export default function PrecisionCalibrationDisplay() {
  const [activeConcern, setActiveConcern] = useState(concerns[0])
  const [displayDepth, setDisplayDepth] = useState(0.5)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const depthRef = useRef(null)

  // Animate depth value when concern changes
  useEffect(() => {
    const obj = { value: displayDepth }
    gsap.to(obj, {
      value: activeConcern.depth,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => setDisplayDepth(parseFloat(obj.value.toFixed(2)))
    })
  }, [activeConcern])

  // Timer animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev >= 60) return 0
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleConcernClick = (concern) => {
    if (concern.id !== activeConcern.id) {
      setActiveConcern(concern)
      setTimer(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Crosshair className="w-5 h-5 text-vaera-ice" />
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-wider">Science-Backed</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">Clinical Technology</h3>
      <p className="font-poppins font-light text-vaera-navy/70 text-sm mb-6">
        Precision-calibrated for every skin concern. Select a treatment to see optimal settings.
      </p>

      {/* Device Screen Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* OLED Screen */}
        <div className="relative mb-6">
          {/* Screen bezel */}
          <div className="bg-gray-100 rounded-2xl p-3 shadow-lg">
            {/* Screen */}
            <div className="bg-black rounded-xl px-6 py-5 min-w-[160px] shadow-inner">
              {/* VAERA Logo */}
              <div className="text-white font-italiana text-lg tracking-wider mb-4 text-center border-b border-white/20 pb-3">
                VAERA
              </div>

              {/* Depth */}
              <div className="mb-3">
                <span className="text-white/60 font-mono text-[10px] tracking-wider">Depth:</span>
                <div ref={depthRef} className="text-white font-mono text-2xl font-light tracking-wide">
                  {displayDepth.toFixed(2)} <span className="text-base">mm</span>
                </div>
              </div>

              {/* Speed */}
              <div className="mb-3">
                <span className="text-white/60 font-mono text-[10px] tracking-wider">Speed:</span>
                <div className="text-white font-mono text-lg font-medium tracking-wider">
                  {activeConcern.speed}
                </div>
              </div>

              {/* Time */}
              <div>
                <span className="text-white/60 font-mono text-[10px] tracking-wider">Time:</span>
                <div className="text-white font-mono text-lg tracking-wider">
                  {formatTime(timer)} <span className="text-sm text-white/60">s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons on side (decorative) */}
          <div className="absolute right-[-8px] top-1/3 w-2 h-8 bg-gray-200 rounded-r-sm shadow" />
          <div className="absolute right-[-8px] top-1/2 w-2 h-4 bg-gray-200 rounded-r-sm shadow" />
        </div>

        {/* Concern buttons */}
        <div className="flex gap-2 w-full">
          {concerns.map((concern) => (
            <button
              key={concern.id}
              onClick={() => handleConcernClick(concern)}
              className={`flex-1 px-3 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                activeConcern.id === concern.id
                  ? 'bg-vaera-navy text-white'
                  : 'bg-vaera-navy/10 text-vaera-navy/60 hover:bg-vaera-navy/20'
              }`}
            >
              {concern.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
