'use client'

import { useState, useEffect } from 'react'
import { Award } from 'lucide-react'

export default function CursorScheduler() {
  const [activeDay, setActiveDay] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [savedState, setSavedState] = useState(false)
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  useEffect(() => {
    const animateCursor = async () => {
      setCursorVisible(true)
      setCursorPos({ x: 20, y: 120 })

      await new Promise(r => setTimeout(r, 500))

      const targetDay = Math.floor(Math.random() * 7)
      setCursorPos({ x: 30 + targetDay * 38, y: 180 })

      await new Promise(r => setTimeout(r, 600))
      setActiveDay(targetDay)

      await new Promise(r => setTimeout(r, 400))
      setCursorPos({ x: 220, y: 240 })

      await new Promise(r => setTimeout(r, 400))
      setSavedState(true)

      await new Promise(r => setTimeout(r, 1500))
      setCursorVisible(false)
      setSavedState(false)
      setActiveDay(null)

      await new Promise(r => setTimeout(r, 2000))
    }

    animateCursor()
    const interval = setInterval(animateCursor, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-vaera-ice" />
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-wider">Premium Quality</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">Professional Grade</h3>
      <p className="font-poppins font-light text-vaera-navy/70 text-sm mb-8">
        Premium isn&apos;t about exclusivity. It&apos;s about raising the standard.
      </p>

      <div className="flex-1 bg-vaera-gray rounded-2xl p-4">
        <div className="text-xs font-mono text-vaera-navy/50 mb-3">TREATMENT SCHEDULE</div>
        <div className="flex gap-2 mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-poppins font-medium transition-all duration-300 ${
                activeDay === i
                  ? 'bg-vaera-ice text-vaera-navy scale-95'
                  : 'bg-white text-vaera-navy/50'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <button
          className={`w-full py-2 rounded-lg text-xs font-poppins font-medium transition-all duration-300 ${
            savedState
              ? 'bg-green-500 text-white'
              : 'bg-vaera-navy/10 text-vaera-navy/70'
          }`}
        >
          {savedState ? 'Saved!' : 'Save Schedule'}
        </button>
      </div>

      {/* Animated Cursor */}
      {cursorVisible && (
        <svg
          className="absolute w-6 h-6 pointer-events-none transition-all duration-500 ease-out"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5.5 3.21V20.79L11.29 14.5H19.5L5.5 3.21Z"
            fill="#1F2A37"
            stroke="#1F2A37"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  )
}
