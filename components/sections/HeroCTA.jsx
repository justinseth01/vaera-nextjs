'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { CheckCircle2 } from 'lucide-react'

export default function HeroCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-up animation
      gsap.fromTo('.hero-cta-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (submitted) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.success-reveal',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubmitted(true)
    }
  }

  return (
    <section ref={sectionRef} id="waitlist" className="relative h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/beauty-natural-4-middle.jpg?v=1751045184"
          alt="Vaera background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Black overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="hero-cta-reveal font-italiana text-6xl md:text-8xl leading-none text-white mb-6">
          The future of
          <br />
          skin is here.
        </h1>

        {/* Subhead */}
        <p className="hero-cta-reveal font-poppins font-light text-white/65 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Not yet available. Reserve your spot to be among the first to experience Vaera when we launch.
        </p>

        {/* Email Form or Success State */}
        {!submitted ? (
          <>
            {/* Connected pill form */}
            <form onSubmit={handleSubmit} className="hero-cta-reveal">
              <div className="flex flex-col sm:flex-row overflow-hidden rounded-full border border-white/20 backdrop-blur-sm bg-white/10 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/40 px-6 py-4 outline-none text-base"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-vaera-navy font-medium px-8 py-4 hover:bg-[#F5EDE6] transition-colors duration-200 whitespace-nowrap font-poppins"
                >
                  Reserve Early Access
                </button>
              </div>
            </form>

            {/* Counter below form */}
            <p className="hero-cta-reveal font-mono text-xs text-white/40 tracking-wider mt-4">
              Launching Q4 2026 · Limited first run
            </p>
          </>
        ) : (
          <div className="success-reveal">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-vaera-ice mb-4" />
              <h3 className="font-italiana text-2xl text-white mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-white/60 text-sm">
                We&apos;ll be in touch before launch.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
