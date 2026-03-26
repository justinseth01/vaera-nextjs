'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {

  return (
    <section className="relative md:min-h-screen overflow-hidden bg-gradient-to-br from-white via-vaera-gray to-vaera-ice/20">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-vaera-ice/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vaera-ice/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main container */}
      <div className="relative md:min-h-screen flex items-center justify-center pt-20 md:pt-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center">

          {/* Content - Text side */}
          <div className="order-2 md:order-1 md:w-1/2 px-6 md:pl-12 lg:pl-16 md:pr-8 pb-12 md:pb-0">
            {/* Line */}
            <div className="w-12 md:w-16 h-px bg-vaera-navy/30 mb-4 md:mb-6" />

            {/* Tagline */}
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-vaera-navy/50 mb-3 md:mb-4">
              Precision Skincare Technology
            </p>

            <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-vaera-navy leading-[0.95] mb-6 md:mb-8">
              Professional
              <br />
              Results.
              <br />
              <span className="text-vaera-navy">At Home.</span>
            </h1>

            <p className="font-poppins font-light text-base md:text-lg lg:text-xl text-vaera-navy/60 max-w-md mb-8 md:mb-10 leading-relaxed">
              The world&apos;s most advanced at-home microneedling device. Backed by dermatological science, designed for real results.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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

          {/* Image side */}
          <div className="order-1 md:order-2 md:w-1/2 flex items-center justify-center px-6 md:px-8 lg:px-12 pt-6 pb-16 md:py-0">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square overflow-hidden shadow-2xl shadow-vaera-navy/20">
              {/* Soft glow behind device */}
              <div className="absolute inset-0 bg-gradient-radial from-vaera-ice/50 via-transparent to-transparent scale-110 blur-2xl" />
              <Image
                src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/AI2_20-_20Aesthetic_2025-08-31_02_24_37_557137_png.png?v=1756607115"
                alt="Vaera microneedling device"
                fill
                className="object-cover scale-150 drop-shadow-2xl"
                style={{ transformOrigin: '50% 65%' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
