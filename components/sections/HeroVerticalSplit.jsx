'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function HeroVerticalSplit() {
  const sectionRef = useRef(null)

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel: product image fade up
      gsap.fromTo('.hero-vs-product',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      )

      // Right panel text stagger
      gsap.fromTo('.hero-vs-text',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          delay: 0.5,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative md:h-[100dvh] flex flex-col md:flex-row-reverse">
      {/* PRODUCT PANEL - Right on desktop, first on mobile */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-full overflow-hidden">
        {/* Product image - zoomed in */}
        <div className="hero-vs-product relative w-full h-full">
          <Image
            src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/photoshopped_aesthetic_pic.png?v=1776011408"
            alt="Vaera microneedling device"
            fill
            priority
            className="object-cover scale-110"
          />
        </div>
      </div>

      {/* VERTICAL DIVIDER */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px z-10" style={{ backgroundColor: 'rgba(220,239,246,0.2)' }} />

      {/* HORIZONTAL DIVIDER - mobile only */}
      <div className="md:hidden absolute left-0 right-0 top-[400px] h-px z-10" style={{ backgroundColor: 'rgba(220,239,246,0.2)' }} />

      {/* LIFESTYLE PANEL - Left on desktop, second on mobile */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-full">
        {/* Background Image */}
        <Image
          src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/el-s-gUPznplBsLI-unsplash.jpg?v=1775933668"
          alt="Professional skin care"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Text content - centered in left panel on desktop, only over right panel on mobile */}
      <div className="absolute left-0 right-0 md:left-0 md:right-1/2 top-[400px] h-[400px] md:top-0 md:bottom-0 md:h-auto flex flex-col items-center justify-center px-6 md:px-12 text-center z-20 pointer-events-none">
        {/* Headline */}
        <h1 className="hero-vs-text font-italiana text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white leading-tight mb-3">
          Professional skin.
          <br />
          At home.
        </h1>

        {/* Subline */}
        <p className="hero-vs-text font-poppins font-light text-white/65 text-lg xl:text-xl 2xl:text-2xl mb-8 max-w-md xl:max-w-lg 2xl:max-w-xl">
          At-home microneedling engineered to be gentle for your skin.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToWaitlist}
          className="hero-vs-text border border-white/50 text-white text-xs xl:text-sm 2xl:text-base tracking-[0.2em] uppercase px-8 py-3 xl:px-10 xl:py-4 2xl:px-12 2xl:py-5 rounded-full hover:bg-white hover:text-vaera-navy transition-colors duration-300 pointer-events-auto"
        >
          Reserve Early Access →
        </button>
      </div>
    </section>
  )
}
