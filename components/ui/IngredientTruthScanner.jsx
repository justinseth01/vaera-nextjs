'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Search, Check, AlertTriangle } from 'lucide-react'

const competitorIngredients = [
  { name: 'Aqua', flagged: false },
  { name: 'Glycerin', flagged: false },
  { name: 'Parfum', flagged: true, reason: 'Fragrance irritant' },
  { name: 'Sodium Hyaluronate', flagged: false },
  { name: 'Phenoxyethanol', flagged: true, reason: 'Potential sensitizer' },
  { name: 'Tocopheryl Acetate', flagged: true, reason: 'Marketing filler' },
  { name: 'CI 19140', flagged: true, reason: 'Synthetic colorant' },
]

const vaeraIngredients = [
  { name: 'Hyaluronic Acid', benefit: 'Clinically proven hydration' },
  { name: 'Niacinamide 5%', benefit: 'Barrier repair & tone' },
  { name: 'Peptide Complex', benefit: 'Collagen synthesis support' },
]

export default function IngredientTruthScanner() {
  const [phase, setPhase] = useState('idle') // idle, scanning, flagged, vaera
  const containerRef = useRef(null)
  const scanLineRef = useRef(null)
  const competitorRef = useRef(null)
  const vaeraRef = useRef(null)

  useEffect(() => {
    const runAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setPhase('idle')
            gsap.set([competitorRef.current, vaeraRef.current, scanLineRef.current], { clearProps: 'all' })
            setTimeout(runAnimation, 1000)
          }, 3000)
        }
      })

      // Phase 1: Show competitor label
      setPhase('scanning')
      tl.fromTo(competitorRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )

      // Phase 2: Scan line sweeps
      .fromTo(scanLineRef.current,
        { top: 0, opacity: 1 },
        { top: '100%', duration: 1.5, ease: 'power1.inOut' }
      )

      // Phase 3: Show flagged state
      .call(() => setPhase('flagged'))
      .to({}, { duration: 2 })

      // Phase 4: Transition to Vaera
      .to(competitorRef.current, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.in' })
      .call(() => setPhase('vaera'))
      .fromTo(vaeraRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }

    const timeout = setTimeout(runAnimation, 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-vaera-ice" />
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-wider">Transparency</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">Transparency First</h3>
      <p className="font-poppins font-light text-vaera-navy/70 text-sm mb-6">
        We analyze what others hide. See the difference for yourself.
      </p>

      {/* Scanner display */}
      <div ref={containerRef} className="flex-1 relative bg-vaera-navy/5 rounded-2xl p-4 overflow-hidden min-h-[200px]">
        {/* Scan line */}
        <div
          ref={scanLineRef}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-vaera-ice to-transparent z-10 opacity-0"
          style={{ boxShadow: '0 0 20px 2px rgba(220, 239, 246, 0.8)' }}
        />

        {/* Competitor ingredients */}
        <div
          ref={competitorRef}
          className={`absolute inset-4 ${phase === 'vaera' ? 'opacity-0' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-vaera-navy/40">Competitor Label</span>
            {phase === 'flagged' && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-500">4 Issues Found</span>
            )}
          </div>
          <div className="space-y-1.5">
            {competitorIngredients.map((ingredient, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-1 px-2 rounded text-xs transition-all duration-300 ${
                  phase === 'flagged' && ingredient.flagged
                    ? 'bg-amber-500/20 border border-amber-500/40'
                    : 'bg-white/50'
                }`}
              >
                <span className={`font-mono ${
                  phase === 'scanning' ? 'blur-[2px] text-vaera-navy/30' :
                  phase === 'flagged' && ingredient.flagged ? 'text-amber-700' : 'text-vaera-navy/60'
                } transition-all duration-300`}>
                  {ingredient.name}
                </span>
                {phase === 'flagged' && ingredient.flagged && (
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-amber-600 font-mono">{ingredient.reason}</span>
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vaera ingredients */}
        <div
          ref={vaeraRef}
          className={`absolute inset-4 ${phase !== 'vaera' ? 'opacity-0' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-vaera-navy/40">Vaera Formula</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600">Clean & Effective</span>
          </div>
          <div className="space-y-2">
            {vaeraIngredients.map((ingredient, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-sm text-vaera-navy">{ingredient.name}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono">{ingredient.benefit}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[10px] text-vaera-navy/50">
            Only what your skin needs. Nothing it doesn&apos;t.
          </p>
        </div>
      </div>
    </div>
  )
}
