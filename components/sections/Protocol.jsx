'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DensityHeatmapAnimation from '@/components/ui/DensityHeatmapAnimation'
import VerticalImpactAnimation from '@/components/ui/VerticalImpactAnimation'
import HeartPulseAnimation from '@/components/ui/HeartPulseAnimation'

gsap.registerPlugin(ScrollTrigger)

export default function Protocol() {
  const protocolRef = useRef(null)
  const cardsRef = useRef([])

  const steps = [
    {
      number: '01',
      title: 'Surface Scan',
      description: 'Our device analyzes skin density to calibrate needle penetration automatically.',
      visual: 'density',
    },
    {
      number: '02',
      title: 'Vertical Impact = Clean Punctures',
      description: 'Patentable skin-safe technology creates precise channels without lateral tearing.',
      visual: 'impact',
    },
    {
      number: '03',
      title: 'Epidermal Recovery',
      description: 'Optimized for minimal downtime, boosting skin health while you sleep.',
      visual: 'recovery',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < cardsRef.current.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 20%',
            end: 'bottom 20%',
            onEnter: () => {
              gsap.to(card, {
                scale: 0.92,
                filter: 'blur(4px)',
                opacity: 0.6,
                duration: 0.5,
              })
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 1,
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.5,
              })
            },
          })
        }
      })
    }, protocolRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={protocolRef} id="technology" className="bg-vaera-gray">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">The Protocol</span>
            <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy">
              How It Works
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-8 pb-32">
        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => (cardsRef.current[i] = el)}
            className="sticky top-24 mx-6 md:mx-12 lg:mx-24"
          >
            <div className="max-w-7xl mx-auto bg-white rounded-4xl p-8 md:p-12 lg:p-16 shadow-xl border border-vaera-navy/5">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-mono text-6xl md:text-7xl lg:text-8xl font-bold text-vaera-navy/20 mb-2 block leading-none">{step.number}</span>
                  <h3 className="font-italiana text-3xl md:text-4xl text-vaera-navy mb-4">{step.title}</h3>
                  <p className="font-poppins font-light text-vaera-navy/70">{step.description}</p>
                </div>
                <div className="h-64 md:h-80 bg-vaera-gray rounded-3xl flex items-center justify-center overflow-hidden">
                  {step.visual === 'density' && <DensityHeatmapAnimation />}
                  {step.visual === 'impact' && <VerticalImpactAnimation />}
                  {step.visual === 'recovery' && <HeartPulseAnimation />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
