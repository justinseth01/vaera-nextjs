'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function WhyBetter() {
  const whyRef = useRef(null)

  const reasons = [
    {
      number: '01',
      title: 'Clinical-Grade Technology',
      description: 'Unlike consumer-grade rollers, Vaera Pro uses the same precision motor technology found in professional dermatology devices. Each puncture is controlled, consistent, and optimized for results.',
      highlight: '120 Hz precision'
    },
    {
      number: '02',
      title: 'Adjustable Depth Control',
      description: 'Other devices offer one-size-fits-all depth. Vaera Pro lets you adjust from 0.25mm for sensitive areas to 2.0mm for stubborn scars—the same range dermatologists use.',
      highlight: '0.25 - 2.0mm range'
    },
    {
      number: '03',
      title: 'Medical-Grade Materials',
      description: 'Cheap devices use stainless steel that dulls after a few uses. Vaera Pro features titanium needles that maintain sharpness 3x longer, reducing skin trauma and improving results.',
      highlight: 'Titanium needles'
    },
    {
      number: '04',
      title: 'Dermatologist-Designed Protocols',
      description: 'We don\'t just sell a device—we provide science-backed treatment protocols developed with board-certified dermatologists for every skin concern.',
      highlight: 'Expert guidance'
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 70%',
          }
        }
      )
    }, whyRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={whyRef} id="features" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">The Difference</span>
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            Why Vaera is Better
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            Not all microneedling devices are created equal. Here&apos;s what sets Vaera Pro apart from the competition.
          </p>
        </div>

        <div className="space-y-6">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="why-card bg-vaera-gray rounded-4xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-shrink-0">
                <span className="font-mono text-vaera-ice text-6xl font-light">{reason.number}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-4">{reason.title}</h3>
                <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed mb-4">
                  {reason.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-vaera-ice/50 px-4 py-2 rounded-full">
                  <Check className="w-4 h-4 text-vaera-navy" />
                  <span className="font-mono text-sm text-vaera-navy">{reason.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 btn-primary text-lg px-10 py-5 group"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="font-poppins font-light text-vaera-navy/50 text-sm mt-4">
            Be first in line when we launch
          </p>
        </div>
      </div>
    </section>
  )
}
