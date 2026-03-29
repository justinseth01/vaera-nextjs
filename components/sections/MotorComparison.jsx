'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const vaeraPoints = [
  'Ultra-fast actuation creates clean, vertical microchannels with zero lateral tearing',
  'Virtually painless — most users treat without numbing cream',
  'Minimal redness — typically resolves within 2–4 hours',
  'Precision depth control eliminates the risk of accidental overtreating',
  'Consistent ±0.05mm penetration on every single pass',
]

const genericPoints = [
  'Slow, inconsistent motor causes needle drag and micro-tears in skin tissue',
  'Often painful — most users require numbing cream or skip treatments entirely',
  'Significant redness and irritation lasting 24–48 hours',
  'Downtime forces you to plan around treatment days',
  'Easy to overtreat sensitive areas without knowing',
]

export default function MotorComparison() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo('.motor-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Animate comparison cards
      gsap.fromTo('.motor-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.motor-cards-container',
            start: 'top 80%',
          }
        }
      )

      // Animate bullet points
      gsap.fromTo('.motor-point',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.motor-cards-container',
            start: 'top 70%',
          }
        }
      )

      // Animate callout
      gsap.fromTo('.motor-callout',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.motor-callout',
            start: 'top 90%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="motor-header text-center mb-16">
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy leading-tight mb-6">
            Engineered Different.
            <br />
            Not Just Another Pen.
          </h2>
          <p className="font-poppins text-lg md:text-xl text-vaera-navy/70 max-w-3xl mx-auto">
            Most at-home microneedling pens share the same off-the-shelf motor.
            Vaera was built from scratch — and your skin can feel the difference.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="motor-cards-container relative">
          <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide items-center pl-4 lg:pl-0 -mx-4 lg:mx-0 px-4 lg:px-0">
            {/* Vaera Column */}
            <div className="motor-card flex-shrink-0 w-[75vw] max-w-[340px] lg:w-auto lg:max-w-none snap-start">
              <div className="rounded-[2rem] border border-vaera-navy/10 bg-white overflow-hidden h-full">
                {/* Split image - Vaera device and diagram */}
                <div className="flex border-b border-vaera-navy/5 aspect-[3/2]">
                  <div className="relative w-1/2 bg-vaera-gray/30">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Hero_Square.png?v=1754273251"
                      alt="Vaera device"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-1/2 bg-white">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/vaera_diagram.jpg?v=1774549753"
                      alt="Vaera precision needle penetration diagram"
                      fill
                      className="object-cover"
                    />
                    {/* Green label for clean punctures */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-green-500 rounded-full shadow-lg">
                      <span className="font-poppins text-xs font-medium text-white whitespace-nowrap">Clean Punctures</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-6 pb-4 border-b border-vaera-navy/10">
                  <h3 className="font-poppins font-medium text-xl md:text-2xl text-vaera-navy">
                    Vaera Precision Motor
                  </h3>
                </div>

                {/* Points */}
                <div className="p-6 space-y-4">
                  {vaeraPoints.map((point, i) => (
                    <div key={i} className="motor-point flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#7A9FB5] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-poppins text-sm text-vaera-navy leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VS Badge - Between cards */}
            <div className="flex-shrink-0 flex items-center justify-center self-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-vaera-gray border-2 border-vaera-navy/10 flex items-center justify-center">
                <span className="font-poppins font-semibold text-vaera-navy text-xs lg:text-sm">VS</span>
              </div>
            </div>

            {/* Generic Column */}
            <div className="motor-card flex-shrink-0 w-[75vw] max-w-[340px] lg:w-auto lg:max-w-none snap-start">
              <div className="rounded-[2rem] border border-vaera-navy/10 bg-white overflow-hidden h-full">
                {/* Split image - Generic pen and diagram */}
                <div className="flex border-b border-vaera-navy/5 aspect-[3/2]">
                  <div className="relative w-1/2 bg-vaera-gray/30">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/SORA-2000x2000-img2.webp?v=1774549832"
                      alt="Generic at-home pen device"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-1/2 bg-white">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/dr._pen_diagram_2.jpg?v=1774549753"
                      alt="Generic pen needle diagram"
                      fill
                      className="object-cover"
                    />
                    {/* Red label for tearing */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-500 rounded-full shadow-lg">
                      <span className="font-poppins text-xs font-medium text-white whitespace-nowrap">Skin Tearing</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-6 pb-4 border-b border-vaera-navy/10">
                  <h3 className="font-poppins font-medium text-xl md:text-2xl text-vaera-navy">
                    Generic At-Home Pen
                  </h3>
                </div>

                {/* Points */}
                <div className="p-6 space-y-4">
                  {genericPoints.map((point, i) => (
                    <div key={i} className="motor-point flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-vaera-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-vaera-navy/30" />
                      </div>
                      <span className="font-poppins text-sm text-vaera-navy leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile swipe indicator */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-vaera-navy/40">
            <span className="font-poppins text-sm">Swipe to compare</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Callout */}
        <div className="motor-callout mt-12 text-center">
          <p className="font-poppins text-base md:text-lg text-vaera-navy/80 italic">
            "Same needle count. Same depth setting. The difference is entirely in the motor."
          </p>
        </div>
      </div>
    </section>
  )
}
