'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Check } from 'lucide-react'

export default function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, label: 'Collagen Stimulation', color: 'bg-vaera-ice' },
    { id: 2, label: 'Skin Texture', color: 'bg-white' },
    { id: 3, label: 'Product Absorption', color: 'bg-vaera-gray' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev]
        newCards.unshift(newCards.pop())
        return newCards
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-vaera-ice" />
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-wider">Science-Backed</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">Clinical Technology</h3>
      <p className="font-poppins font-light text-vaera-navy/70 text-sm mb-8">
        Every aspect informed by clinical research and dermatological science.
      </p>

      <div className="relative flex-1 min-h-[180px]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`absolute left-0 right-0 ${card.color} rounded-2xl p-4 border border-vaera-navy/10 shadow-sm`}
            style={{
              top: `${index * 16}px`,
              zIndex: 3 - index,
              transform: `scale(${1 - index * 0.03})`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: 1 - index * 0.2,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-poppins font-medium text-vaera-navy text-sm">{card.label}</span>
              <Check className="w-4 h-4 text-vaera-navy/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
