'use client'

import { useState, useEffect } from 'react'

const ANIMATION_DURATION = 3000
const PHASES = {
  IDLE: 'idle',
  DESCENDING: 'descending',
  IMPACT: 'impact',
  RETRACTING: 'retracting',
}

export default function VerticalImpactAnimation() {
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [needleY, setNeedleY] = useState(0)
  const [competitorWobble, setCompetitorWobble] = useState(0)
  const [damageMarks, setDamageMarks] = useState([])
  const [cleanChannel, setCleanChannel] = useState(false)

  useEffect(() => {
    let animationFrame = 0
    const totalFrames = 60

    const runAnimation = () => {
      // Phase 1: Descending (0-20 frames)
      if (animationFrame < 20) {
        const progress = animationFrame / 20
        setNeedleY(progress * 60)
        setCompetitorWobble(Math.sin(animationFrame * 0.8) * 4)
        setPhase(PHASES.DESCENDING)
      }
      // Phase 2: Impact (20-35 frames)
      else if (animationFrame < 35) {
        setNeedleY(60)
        setPhase(PHASES.IMPACT)
        setCleanChannel(true)

        // Add damage marks for competitor side
        if (animationFrame === 22) {
          setDamageMarks([
            { x: -6, y: 58, rotation: -25 },
            { x: 4, y: 55, rotation: 20 },
            { x: -3, y: 62, rotation: -15 },
          ])
        }
      }
      // Phase 3: Retracting (35-50 frames)
      else if (animationFrame < 50) {
        const progress = (animationFrame - 35) / 15
        setNeedleY(60 - progress * 60)
        setPhase(PHASES.RETRACTING)
      }
      // Phase 4: Reset (50-60 frames)
      else {
        setNeedleY(0)
        setPhase(PHASES.IDLE)
        if (animationFrame === 55) {
          setDamageMarks([])
          setCleanChannel(false)
        }
      }

      animationFrame++
      if (animationFrame >= totalFrames) {
        animationFrame = 0
      }
    }

    const interval = setInterval(runAnimation, ANIMATION_DURATION / 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex gap-8">
        {/* Competitor Side */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 mb-3">
            Competitor
          </span>
          <div className="relative w-24 h-40 bg-gradient-to-b from-vaera-gray to-vaera-ice/30 rounded-xl overflow-hidden border border-vaera-navy/10">
            {/* Skin layers */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f5d0c5] to-[#e8b4a8] rounded-b-xl">
              {/* Epidermis line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#d4a090]" />

              {/* Damage marks */}
              {damageMarks.map((mark, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-1 bg-red-400/80 rounded-full"
                  style={{
                    left: `calc(50% + ${mark.x}px)`,
                    top: `${mark.y - 40}px`,
                    transform: `rotate(${mark.rotation}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Needle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 transition-none"
              style={{ top: `${needleY}px` }}
            >
              {/* Needle body */}
              <div
                className="w-full h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-sm"
                style={{
                  transform: `translateX(${competitorWobble}px) rotate(${competitorWobble * 0.5}deg)`,
                }}
              />
              {/* Needle tip */}
              <div
                className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-500 mx-auto"
                style={{
                  transform: `translateX(${competitorWobble}px)`,
                }}
              />
            </div>

            {/* Lateral tear indicator */}
            {phase === PHASES.IMPACT && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <svg width="30" height="20" viewBox="0 0 30 20">
                  <path
                    d="M5 10 L15 10 M25 10 L15 10"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path
                    d="M8 7 L5 10 L8 13 M22 7 L25 10 L22 13"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="font-mono text-[9px] text-red-400/70 mt-2">Lateral Tearing</span>
        </div>

        {/* Vaera Side */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 mb-3">
            Vaera
          </span>
          <div className="relative w-24 h-40 bg-gradient-to-b from-vaera-gray to-vaera-ice/30 rounded-xl overflow-hidden border border-vaera-navy/10">
            {/* Skin layers */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f5d0c5] to-[#e8b4a8] rounded-b-xl">
              {/* Epidermis line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#d4a090]" />

              {/* Clean channel */}
              {cleanChannel && (
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-8 bg-emerald-400/40 rounded-b-full" />
              )}
            </div>

            {/* Needle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 transition-none"
              style={{ top: `${needleY}px` }}
            >
              {/* Needle body - perfectly straight */}
              <div className="w-full h-12 bg-gradient-to-b from-vaera-navy to-vaera-light-navy rounded-t-sm" />
              {/* Needle tip */}
              <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[8px] border-l-transparent border-r-transparent border-t-vaera-light-navy mx-auto" />
            </div>

            {/* Clean impact indicator */}
            {phase === PHASES.IMPACT && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle
                    cx="10"
                    cy="10"
                    r="6"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="animate-ping"
                    style={{ animationDuration: '0.5s' }}
                  />
                  <path
                    d="M7 10 L9 12 L13 8"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="font-mono text-[9px] text-emerald-500/70 mt-2">Clean Channels</span>
        </div>
      </div>
    </div>
  )
}
