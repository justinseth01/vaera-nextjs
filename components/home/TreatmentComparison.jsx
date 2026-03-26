'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const comparisonData = [
  {
    label: 'Results in',
    vaera: { text: 'As little as 1-2 days', positive: true },
    clinic: { text: 'As little as 1-2 days', positive: true },
    dermaRoller: { text: 'A few days', positive: false },
  },
  {
    label: 'Precision',
    vaera: { text: '±0.05mm needle accuracy', positive: true },
    clinic: { text: 'Professional precision', positive: true },
    dermaRoller: { text: 'Inconsistent pressure', positive: false },
  },
  {
    label: 'Skin Safe',
    highlight: true,
    vaera: { text: 'Minimal downtime & virtually painless', positive: true },
    clinic: { text: 'Minimal downtime', positive: true },
    dermaRoller: { text: 'Potential side effects', positive: false },
  },
  {
    label: 'Cost',
    vaera: { text: '$249 one-time purchase', positive: true },
    clinic: { text: '$300+ per treatment', positive: false },
    dermaRoller: { text: '< $20 per roller', positive: true },
  },
]

export default function TreatmentComparison() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.comparison-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const StatusIcon = ({ positive }) => (
    positive ? (
      <div className="w-5 h-5 rounded-full bg-[#7A9FB5] flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-white" />
      </div>
    ) : (
      <div className="w-5 h-5 rounded-full bg-vaera-navy/10 flex items-center justify-center flex-shrink-0">
        <X className="w-3 h-3 text-vaera-navy/20" />
      </div>
    )
  )

  return (
    <section ref={sectionRef} className="section-padding bg-vaera-gray">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy leading-tight mb-4">
            Get professional results from home
            <br />
            without the clinic visit
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="relative">
          {/* Mobile scroll hint */}
          <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-16 h-full bg-gradient-to-l from-vaera-gray to-transparent pointer-events-none z-10" />

          <div className="flex md:grid md:grid-cols-[200px_1fr_1fr_1fr] gap-4 md:gap-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            {/* Row Labels Column - Hidden on mobile */}
            <div className="hidden md:flex flex-col">
              {/* Empty header cell - matches column headers */}
              <div className="h-[220px]" />
              {/* Row labels */}
              {comparisonData.map((row, i) => (
                <div
                  key={row.label}
                  className="py-5 pr-6 border-t border-vaera-navy/10 flex items-center"
                >
                  {row.highlight ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-vaera-ice text-vaera-navy font-poppins font-medium text-sm">
                      {row.label}
                    </span>
                  ) : (
                    <span className="font-poppins font-medium text-sm text-vaera-navy/70">{row.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Vaera Column - Highlighted */}
            <div className="comparison-card relative flex-shrink-0 w-[280px] md:w-auto snap-start rounded-[2rem] border-[3px] border-vaera-ice bg-white md:mr-6" style={{ boxShadow: '0 8px 40px rgba(184,217,232,0.5), 0 0 0 1px rgba(184,217,232,0.3)' }}>
              <div className="p-6">
                {/* Product Image & Title */}
                <div className="text-center h-[220px] flex flex-col items-center justify-end pb-4">
                  <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden bg-white border-2 border-vaera-ice">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/AI2_20-_20Aesthetic_2025-08-31_02_24_37_557137_png.png?v=1756607115"
                      alt="Vaera Device"
                      fill
                      className="object-contain scale-[1.8]"
                      style={{ transformOrigin: '50% 55%' }}
                    />
                  </div>
                  <h3 className="font-poppins font-medium text-xl md:text-2xl text-vaera-navy leading-tight">
                    Vaera
                    <br />
                    At-Home Device
                  </h3>
                </div>

                {/* Data Rows */}
                <div className="space-y-0">
                  {comparisonData.map((row, i) => (
                    <div
                      key={row.label}
                      className="py-5 border-t border-vaera-navy/10"
                    >
                      {/* Mobile label */}
                      {row.highlight ? (
                        <span className="md:hidden inline-block px-2 py-0.5 rounded-full bg-vaera-ice text-vaera-navy font-poppins font-medium text-xs mb-2">
                          {row.label}
                        </span>
                      ) : (
                        <span className="md:hidden font-poppins font-medium text-xs text-vaera-navy/50 uppercase tracking-wider mb-2 block">
                          {row.label}
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <StatusIcon positive={row.vaera.positive} />
                        <span className="font-poppins text-sm text-vaera-navy leading-snug">
                          {row.vaera.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinic Column */}
            <div className="comparison-card relative flex-shrink-0 w-[280px] md:w-auto snap-start">
              {/* Mobile card styling */}
              <div className="md:hidden absolute inset-0 bg-white rounded-3xl -z-10" />

              <div className="p-6 md:p-0">
                {/* Product Image & Title */}
                <div className="text-center h-[220px] flex flex-col items-center justify-end pb-4">
                  <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden bg-vaera-gray">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop"
                      alt="Clinic Treatment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-poppins font-normal text-xl md:text-2xl text-vaera-navy/80 leading-tight">
                    In-Person
                    <br />
                    Clinic Treatment
                  </h3>
                </div>

                {/* Data Rows */}
                <div className="space-y-0">
                  {comparisonData.map((row, i) => (
                    <div
                      key={row.label}
                      className="py-5 border-t border-vaera-navy/10"
                    >
                      {/* Mobile label */}
                      {row.highlight ? (
                        <span className="md:hidden inline-block px-2 py-0.5 rounded-full bg-vaera-ice text-vaera-navy font-poppins font-medium text-xs mb-2">
                          {row.label}
                        </span>
                      ) : (
                        <span className="md:hidden font-poppins font-medium text-xs text-vaera-navy/50 uppercase tracking-wider mb-2 block">
                          {row.label}
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <StatusIcon positive={row.clinic.positive} />
                        <span className="font-poppins text-sm text-vaera-navy/70 leading-snug">
                          {row.clinic.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Derma Roller Column */}
            <div className="comparison-card relative flex-shrink-0 w-[280px] md:w-auto snap-start">
              {/* Mobile card styling */}
              <div className="md:hidden absolute inset-0 bg-white rounded-3xl -z-10" />

              <div className="p-6 md:p-0">
                {/* Product Image & Title */}
                <div className="text-center h-[220px] flex flex-col items-center justify-end pb-4">
                  <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden bg-white">
                    <Image
                      src="https://www.projectebeauty.com/cdn/shop/files/20250424_Derma_Roller_Hero.png?v=1745480824&width=2048"
                      alt="Derma Roller"
                      fill
                      className="object-contain scale-125"
                    />
                  </div>
                  <h3 className="font-poppins font-normal text-xl md:text-2xl text-vaera-navy/80 leading-tight">
                    Derma Roller
                    <br />
                    At-Home Treatment
                  </h3>
                </div>

                {/* Data Rows */}
                <div className="space-y-0">
                  {comparisonData.map((row, i) => (
                    <div
                      key={row.label}
                      className="py-5 border-t border-vaera-navy/10"
                    >
                      {/* Mobile label */}
                      {row.highlight ? (
                        <span className="md:hidden inline-block px-2 py-0.5 rounded-full bg-vaera-ice text-vaera-navy font-poppins font-medium text-xs mb-2">
                          {row.label}
                        </span>
                      ) : (
                        <span className="md:hidden font-poppins font-medium text-xs text-vaera-navy/50 uppercase tracking-wider mb-2 block">
                          {row.label}
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <StatusIcon positive={row.dermaRoller.positive} />
                        <span className="font-poppins text-sm text-vaera-navy/70 leading-snug">
                          {row.dermaRoller.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center font-poppins text-xs text-vaera-navy/40 mt-12">
          Based on publicly available information. For general comparison only.
        </p>
      </div>
    </section>
  )
}
