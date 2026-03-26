'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const waitlistRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.waitlist-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: waitlistRef.current,
            start: 'top 80%',
          }
        }
      )
    }, waitlistRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section ref={waitlistRef} id="waitlist" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto text-center waitlist-content">
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">Be First</span>
        <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
          Join the Waitlist
        </h2>
        <p className="font-poppins font-light text-vaera-navy/70 max-w-xl mx-auto mb-12">
          Get early access to the world&apos;s most advanced at-home microneedling device. Limited availability for our launch.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vaera-navy/30" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-vaera-navy/10 font-poppins font-light text-vaera-navy placeholder:text-vaera-navy/40 focus:outline-none focus:border-vaera-ice focus:ring-2 focus:ring-vaera-ice/20 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Get Early Access
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        ) : (
          <div className="bg-vaera-ice/30 rounded-4xl p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-italiana text-2xl text-vaera-navy mb-2">You&apos;re on the list!</h3>
            <p className="font-poppins font-light text-vaera-navy/70 text-sm">
              We&apos;ll notify you when Vaera is ready. Get ready for professional-grade results at home.
            </p>
          </div>
        )}

        <p className="font-poppins font-light text-vaera-navy/40 text-xs mt-6">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
