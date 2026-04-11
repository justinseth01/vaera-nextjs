'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const scrollToWaitlist = (e) => {
    e.preventDefault()
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCFB] via-white to-[#F9F7F5]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #1F2A37 1px, transparent 1px), linear-gradient(to bottom, #1F2A37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-32 left-[10%] w-96 h-96 bg-vaera-ice/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-[#D4A574]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-[40%] w-72 h-72 bg-[#E8DDD4]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left column - Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-vaera-navy/30" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-vaera-navy/50">
                Professional-Grade Microneedling
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy leading-[0.95] mb-8">
              Clinical Precision.
              <br />
              <span className="relative inline-block">
                At Home.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1" stroke="#D4A574" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="font-poppins text-lg md:text-xl text-vaera-navy/60 leading-relaxed mb-10 max-w-lg">
              The world's first microneedling device designed to be safe for at-home use.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={scrollToWaitlist}
                className="group inline-flex items-center gap-3 btn-primary"
              >
                Join the Waitlist
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <span className="font-poppins text-sm text-vaera-navy/40">
                Launching at $249
              </span>
            </div>
          </div>

          {/* Right column - Product Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#D4A574]/20 via-[#E8DDD4]/15 to-vaera-ice/20 rounded-[3rem] blur-2xl" />

              {/* Image container - square aspect ratio */}
              <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-vaera-navy/10">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/AI2_20-_20Aesthetic_2025-08-31_02_24_37_557137_png.png?v=1756607115"
                  alt="Vaera microneedling device"
                  fill
                  className="object-cover scale-150 -translate-y-[8%]"
                  priority
                />

                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-vaera-navy/5 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
