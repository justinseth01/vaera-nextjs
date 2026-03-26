'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Zap, Droplets, Clock, Shield, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Benefits() {
  const benefitsRef = useRef(null)

  const benefits = [
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Adjustable needle depth from 0.25mm to 2.0mm lets you customize treatment for different skin concerns and facial zones.'
    },
    {
      icon: Zap,
      title: 'Stimulates Collagen',
      description: 'Controlled micro-injuries trigger your skin\'s natural healing response, boosting collagen and elastin production.'
    },
    {
      icon: Droplets,
      title: 'Enhanced Absorption',
      description: 'Microchannels created during treatment increase serum absorption by up to 300%, maximizing your skincare routine.'
    },
    {
      icon: Clock,
      title: 'Visible Results',
      description: 'See noticeable improvements in skin texture, fine lines, and tone within 4-6 weeks of consistent use.'
    },
    {
      icon: Shield,
      title: 'Safe & Sterile',
      description: 'Medical-grade titanium needles and disposable cartridges ensure clinical-level hygiene at home.'
    },
    {
      icon: Award,
      title: 'Professional Grade',
      description: 'The same technology used in dermatology clinics, engineered for safe and effective at-home use.'
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefit-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 80%',
          }
        }
      )
    }, benefitsRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={benefitsRef} id="benefits" className="section-padding bg-vaera-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">Benefits</span>
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            Why Microneedling Works
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            Backed by decades of dermatological research, microneedling is proven to rejuvenate skin at the cellular level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="benefit-card bg-white rounded-4xl p-8 border border-vaera-navy/5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-vaera-ice rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-vaera-navy" />
              </div>
              <h3 className="font-italiana text-2xl text-vaera-navy mb-3">{benefit.title}</h3>
              <p className="font-poppins font-light text-vaera-navy/70 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
