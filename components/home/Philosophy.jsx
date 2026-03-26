'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const philosophyRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.word')
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 70%',
          }
        }
      )
    }, philosophyRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={philosophyRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Our Philosophy</span>
          </div>

          <div ref={textRef} className="space-y-8">
            <p className="font-poppins font-light text-xl md:text-2xl text-white/60 leading-relaxed">
              <span className="word inline-block">Most</span>{' '}
              <span className="word inline-block">skincare</span>{' '}
              <span className="word inline-block">focuses</span>{' '}
              <span className="word inline-block">on</span>{' '}
              <span className="word inline-block">hype,</span>{' '}
              <span className="word inline-block">unnecessary</span>{' '}
              <span className="word inline-block">additives,</span>{' '}
              <span className="word inline-block">and</span>{' '}
              <span className="word inline-block">confusing</span>{' '}
              <span className="word inline-block">science.</span>
            </p>

            <p className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              <span className="word inline-block">We</span>{' '}
              <span className="word inline-block">focus</span>{' '}
              <span className="word inline-block">on</span>{' '}
              <span className="word inline-block text-vaera-ice">what</span>{' '}
              <span className="word inline-block text-vaera-ice">actually</span>{' '}
              <span className="word inline-block text-vaera-ice">works.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
