'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef(null)
  const taglineRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut' }
      )
      .fromTo(taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=0.6'
      )
      .fromTo(subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(imageRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=1.5'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-vaera-gray to-vaera-ice/20" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-vaera-ice/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vaera-ice/20 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Layout */}
      <div className="hidden md:flex relative min-h-[100dvh] items-center">
        {/* Left content */}
        <div className="w-1/2 pl-12 lg:pl-24 pr-8">
          {/* Animated line */}
          <div ref={lineRef} className="w-16 h-px bg-vaera-navy/30 mb-6 origin-left" />

          {/* Tagline */}
          <p ref={taglineRef} className="font-mono text-xs tracking-[0.2em] uppercase text-vaera-navy/50 mb-4">
            Precision Skincare Technology
          </p>

          <h1 ref={headingRef} className="font-italiana text-6xl lg:text-7xl xl:text-8xl text-vaera-navy leading-[0.95] mb-8">
            Professional
            <br />
            Results.
            <br />
            <span className="text-vaera-light-navy/70">At Home.</span>
          </h1>

          <p ref={subRef} className="font-poppins font-light text-lg lg:text-xl text-vaera-navy/60 max-w-md mb-10 leading-relaxed">
            The world&apos;s most advanced at-home microneedling device. Backed by dermatological science, designed for real results.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-3 bg-vaera-navy text-white px-8 py-4 rounded-full font-poppins font-medium text-sm tracking-wide transition-all duration-300 hover:bg-vaera-light-navy hover:shadow-lg hover:shadow-vaera-navy/20 group"
              style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <span className="text-vaera-navy/40 text-sm font-poppins">$249 at launch</span>
          </div>
        </div>

        {/* Right image */}
        <div className="w-1/2 h-[100dvh] flex items-center justify-center pr-8 lg:pr-16">
          <div ref={imageRef} className="relative w-full max-w-2xl aspect-square">
            {/* Soft glow behind device */}
            <div className="absolute inset-0 bg-gradient-radial from-vaera-ice/50 via-transparent to-transparent scale-110 blur-2xl" />
            <Image
              src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Hero_Square.png?v=1754273251"
              alt="Vaera microneedling device"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-[100dvh] relative">
        {/* Image section */}
        <div className="relative w-full pt-24 pb-4 px-4">
          <div ref={imageRef} className="relative aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-radial from-vaera-ice/50 via-transparent to-transparent scale-125 blur-2xl" />
            <Image
              src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Hero_Square.png?v=1754273251"
              alt="Vaera microneedling device"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Text section */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-28">
          {/* Animated line */}
          <div className="w-12 h-px bg-vaera-navy/30 mb-4" />

          <p className="font-mono text-xs tracking-[0.2em] uppercase text-vaera-navy/50 mb-3">
            Precision Skincare
          </p>

          <h1 className="font-italiana text-5xl text-vaera-navy leading-[0.95] mb-6">
            Professional
            <br />
            Results.
            <br />
            <span className="text-vaera-light-navy/70">At Home.</span>
          </h1>

          <p className="font-poppins font-light text-base text-vaera-navy/60 max-w-md mb-8 leading-relaxed">
            The world&apos;s most advanced at-home microneedling device. Backed by dermatological science.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-3 bg-vaera-navy text-white px-8 py-4 rounded-full font-poppins font-medium text-sm tracking-wide transition-all duration-300 hover:bg-vaera-light-navy group w-fit"
              style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <span className="text-vaera-navy/40 text-sm font-poppins">$249 at launch</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-vaera-navy/40 text-xs font-poppins font-light tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-vaera-navy/30 to-transparent" />
      </div>
    </section>
  )
}
