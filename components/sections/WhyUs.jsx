'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function WhyUs() {
  const whyUsRef = useRef(null)

  const comparisonData = [
    {
      feature: 'Professional-Grade Results',
      vaera: true,
      clinic: true,
      others: false,
    },
    {
      feature: 'At-Home Convenience',
      vaera: true,
      clinic: false,
      others: true,
    },
    {
      feature: 'Science-Backed Technology',
      vaera: true,
      clinic: true,
      others: false,
    },
    {
      feature: 'Dermatologist-Informed Design',
      vaera: true,
      clinic: true,
      others: false,
    },
    {
      feature: 'Adjustable Needle Depth',
      vaera: true,
      clinic: true,
      others: false,
    },
    {
      feature: 'No Recurring Appointments',
      vaera: true,
      clinic: false,
      others: true,
    },
    {
      feature: 'Affordable Long-Term',
      vaera: true,
      clinic: false,
      others: true,
    },
    {
      feature: 'Medical-Grade Sterility',
      vaera: true,
      clinic: true,
      others: false,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.comparison-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: whyUsRef.current,
            start: 'top 70%',
          }
        }
      )
    }, whyUsRef)
    return () => ctx.revert()
  }, [])

  const CheckIcon = () => (
    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
      <Check className="w-4 h-4 text-white" />
    </div>
  )

  const XIcon = () => (
    <div className="w-6 h-6 bg-vaera-navy/10 rounded-full flex items-center justify-center">
      <span className="text-vaera-navy/30 text-sm font-medium">—</span>
    </div>
  )

  return (
    <section ref={whyUsRef} className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">The Comparison</span>
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            Why Vaera?
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            The best of both worlds: clinical-grade technology with at-home convenience.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-4xl overflow-hidden border border-vaera-navy/10">
          {/* Header */}
          <div className="grid grid-cols-4 bg-vaera-gray">
            <div className="p-6 font-poppins font-medium text-vaera-navy/50 text-sm">
              Features
            </div>
            <div className="p-6 text-center bg-vaera-navy">
              <span className="font-italiana text-xl text-white">VAERA</span>
              <p className="font-poppins font-light text-white/60 text-xs mt-1">At-Home Device</p>
            </div>
            <div className="p-6 text-center">
              <span className="font-poppins font-medium text-vaera-navy text-sm">Clinic Visits</span>
              <p className="font-poppins font-light text-vaera-navy/50 text-xs mt-1">$300-500/session</p>
            </div>
            <div className="p-6 text-center">
              <span className="font-poppins font-medium text-vaera-navy text-sm">Other Devices</span>
              <p className="font-poppins font-light text-vaera-navy/50 text-xs mt-1">Consumer-grade</p>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={row.feature}
              className={`comparison-row grid grid-cols-4 ${
                index % 2 === 0 ? 'bg-white' : 'bg-vaera-gray/30'
              } ${index === comparisonData.length - 1 ? '' : 'border-b border-vaera-navy/5'}`}
            >
              <div className="p-5 font-poppins font-light text-vaera-navy text-sm flex items-center">
                {row.feature}
              </div>
              <div className="p-5 flex items-center justify-center bg-vaera-ice/20">
                {row.vaera ? <CheckIcon /> : <XIcon />}
              </div>
              <div className="p-5 flex items-center justify-center">
                {row.clinic ? <CheckIcon /> : <XIcon />}
              </div>
              <div className="p-5 flex items-center justify-center">
                {row.others ? <CheckIcon /> : <XIcon />}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 btn-primary group"
          >
            Get Professional Results at Home
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
