'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animation
      gsap.fromTo('.waitlist-v2-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section ref={sectionRef} id="waitlist" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background - cool gray */}
      <div className="absolute inset-0 bg-[#F5F7F9]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #1F2A37 1px, transparent 1px), linear-gradient(to bottom, #1F2A37 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating orbs - cool tones only */}
      <div className="absolute top-20 left-[15%] w-72 h-72 bg-vaera-ice/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-vaera-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column - Content */}
          <div>
            {/* Eyebrow */}
            <div className="waitlist-v2-reveal flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-vaera-navy/30" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-vaera-navy/50">
                Limited Availability
              </span>
            </div>

            {/* Headline */}
            <h2 className="waitlist-v2-reveal font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy leading-[0.95] mb-8">
              Reserve
              <br />
              <span className="relative inline-block">
                Early Access
                <div className="absolute -bottom-1 left-0 w-full h-px bg-vaera-ice/40" />
              </span>
            </h2>

            {/* Subhead */}
            <p className="waitlist-v2-reveal font-poppins text-lg md:text-xl text-vaera-navy/60 leading-relaxed mb-12 max-w-md">
              Be among the first to experience professional-grade microneedling at home. Early access members receive exclusive benefits.
            </p>

            {/* Benefits */}
            <div className="waitlist-v2-reveal space-y-4 mb-12">
              {[
                { icon: '✦', text: '15% off launch price', highlight: true },
                { icon: '✦', text: 'Free microneedling protocol guide ($49 value)' },
                { icon: '✦', text: 'First access before public launch' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className={`text-sm mt-0.5 ${benefit.highlight ? 'text-vaera-ice' : 'text-vaera-navy/30'}`}>
                    {benefit.icon}
                  </span>
                  <span className={`font-poppins ${benefit.highlight ? 'text-vaera-navy font-medium' : 'text-vaera-navy/70'}`}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right column - Form card */}
          <div className="waitlist-v2-reveal">
            <div className={`relative transition-all duration-500 ${isFocused ? 'scale-[1.02]' : ''}`}>
              {/* Card */}
              <div className="relative bg-vaera-navy rounded-[2rem] p-8 md:p-10 overflow-hidden">
                <div className="relative">
                  {/* Counter bar */}
                  <div className="flex items-center gap-2 mb-8">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vaera-ice opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-vaera-ice"></span>
                    </span>
                    <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
                      Early Access — Limited First Run
                    </span>
                  </div>

                  {!submitted ? (
                    <>
                      {/* Form header */}
                      <div className="mb-8">
                        <h3 className="font-italiana text-3xl text-white mb-2">
                          Reserve Your Spot
                        </h3>
                        <p className="font-poppins text-white/50 text-sm">
                          Join our growing waitlist for launch day.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl font-poppins text-white placeholder:text-white/30 focus:outline-none focus:border-vaera-ice/50 focus:bg-white/15 transition-all"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-3 bg-white text-vaera-navy py-4 rounded-2xl font-poppins font-semibold transition-all duration-300 hover:bg-[#F5EDE6] group"
                        >
                          Claim Early Access
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </form>

                      {/* Trust line */}
                      <p className="font-poppins text-white/30 text-xs text-center mt-6">
                        No spam, ever. Unsubscribe anytime.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-italiana text-3xl text-white mb-3">You&apos;re In!</h3>
                      <p className="font-poppins text-white/60 text-sm max-w-xs mx-auto">
                        Check your inbox for confirmation. We&apos;ll notify you the moment Vaera launches.
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
