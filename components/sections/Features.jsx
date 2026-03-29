'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrecisionCalibrationDisplay from '@/components/ui/PrecisionCalibrationDisplay'
import IngredientTruthScanner from '@/components/ui/IngredientTruthScanner'
import AtHomeClinicComparison from '@/components/ui/AtHomeClinicComparison'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const featuresRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          }
        }
      )
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={featuresRef} id="science" className="section-padding bg-vaera-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">Core Values</span>
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            What Sets Us Apart
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            In a world crowded with skincare myths and confusing science, we&apos;re committed to cutting through the noise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="feature-card">
            <PrecisionCalibrationDisplay />
          </div>
          <div className="feature-card">
            <IngredientTruthScanner />
          </div>
          <div className="feature-card">
            <AtHomeClinicComparison />
          </div>
        </div>
      </div>
    </section>
  )
}
