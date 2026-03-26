'use client'

import { useState, useEffect } from 'react'

export default function TelemetryTypewriter() {
  const [displayText, setDisplayText] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const messages = [
    'Penetration depth: 0.25mm - optimal for serum absorption',
    'Needle frequency: 120 Hz - clinical-grade precision',
    'Treatment zone: dermis layer activated',
    'Collagen synthesis pathway: stimulated',
  ]

  useEffect(() => {
    let charIndex = 0
    const currentMessage = messages[messageIndex]

    const typeInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [messageIndex])

  return (
    <div className="card h-full flex flex-col bg-vaera-navy text-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-2 h-2 bg-green-400 rounded-full pulse-ring" />
        <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Live Feed</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-white mb-3">Transparency First</h3>
      <p className="font-poppins font-light text-white/70 text-sm mb-8">
        Clear information about how our technology works. No fluff, no filler.
      </p>

      <div className="flex-1 bg-vaera-light-navy/50 rounded-2xl p-4 font-mono text-sm">
        <div className="flex items-start gap-2">
          <span className="text-vaera-ice">&gt;</span>
          <span className="text-white/90">
            {displayText}
            <span className="inline-block w-2 h-4 bg-vaera-ice ml-1 cursor-blink" />
          </span>
        </div>
      </div>
    </div>
  )
}
