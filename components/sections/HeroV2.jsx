'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function HeroV2() {
  const scrollToWaitlist = (e) => {
    e.preventDefault()
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Dark Navy Content - 55% */}
      <div className="relative lg:w-[55%] bg-vaera-navy flex items-center justify-center px-6 py-20 lg:py-0">
        <div className="max-w-xl w-full" style={{ paddingTop: '5vh' }}>
          {/* Eyebrow */}
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-vaera-ice mb-10">
            PRECISION MICRONEEDLING — ENGINEERED FROM SCRATCH
          </div>

          {/* Headline */}
          <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
            Professional
            <br />
            skin. At home.
          </h1>

          {/* Subhead */}
          <p className="font-poppins text-base lg:text-lg text-white/60 mb-10 leading-relaxed">
            Built by a mechanical engineer. Validated by 200+ users. ±0.05mm precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={scrollToWaitlist}
              className="group relative overflow-hidden bg-white text-vaera-navy px-8 py-4 rounded-full font-poppins font-medium text-sm transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Reserve Early Access
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <button
              className="group font-poppins font-medium text-sm text-vaera-ice hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              See the Science
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-8 font-mono text-xs text-white/60">
            <span className="text-white">±0.05mm variance</span>
            <span className="text-white/30">·</span>
            <span className="text-white">25Hz motor</span>
            <span className="text-white/30">·</span>
            <span className="text-white">$249 at launch</span>
          </div>
        </div>
      </div>

      {/* Right Side - Light Ice-Blue Product Display - 45% */}
      <div className="relative lg:w-[45%] bg-[#EEF6FA] flex items-center justify-center px-6 py-20 lg:py-0 min-h-[600px] lg:min-h-0">
        {/* Radial gradient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #FFFFFF 0%, #EEF6FA 70%)'
          }}
        />

        {/* Product Image */}
        <div className="relative z-10 w-full max-w-md aspect-square">
          <div className="relative w-full h-full">
            <Image
              src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/AI2_20-_20Aesthetic_2025-08-31_02_24_37_557137_png.png?v=1756607115"
              alt="Vaera microneedling device"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-6 py-4 shadow-lg border-l-2 border-vaera-ice">
            <div className="flex items-start gap-2">
              <span className="text-lg">★</span>
              <div className="font-mono text-xs">
                <div className="text-vaera-navy font-semibold mb-1">4.9 Beta tester rating</div>
                <div className="text-vaera-navy/60">"Nearly painless"</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Measurement Line */}
      <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-vaera-ice/40 pointer-events-none" />

      {/* Mobile Stats Bar */}
      <div className="lg:hidden w-full overflow-x-auto bg-vaera-navy border-t border-white/10 px-6 py-4">
        <div className="flex items-center gap-8 font-mono text-xs text-white/60 whitespace-nowrap">
          <span className="text-white">±0.05mm variance</span>
          <span className="text-white/30">·</span>
          <span className="text-white">25Hz motor</span>
          <span className="text-white/30">·</span>
          <span className="text-white">$249 at launch</span>
        </div>
      </div>
    </section>
  )
}
