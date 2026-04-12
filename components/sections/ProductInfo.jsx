'use client'

import { useState } from 'react'
import { ArrowRight, Check, Crosshair, SlidersHorizontal, Zap, Plug, ShieldCheck, RotateCcw, MapPin } from 'lucide-react'

export default function ProductInfo() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email && emailRegex.test(email)) {
      setSubmitted(true)
    } else {
      alert('Please enter a valid email address')
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-italiana text-4xl md:text-5xl lg:text-5xl text-vaera-navy mb-4">
          Vaera Microneedling Pen
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-poppins font-semibold text-2xl text-vaera-navy">$249</span>
        <span className="font-poppins font-light text-vaera-navy/50 line-through">$400</span>
        <span className="font-poppins font-light text-vaera-navy/50 text-sm">
          · Free shipping on orders above $200
        </span>
      </div>

      {/* Waitlist Form */}
      <div id="waitlist" className="rounded-xl bg-vaera-navy p-6 space-y-4">
        <div>
          <h3 className="font-italiana text-2xl text-white mb-2">Reserve Early Access</h3>
          <p className="font-poppins font-light text-white/70 text-sm">
            Limited supply available at launch, be the first to know when we launch. 
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Connected pill unit */}
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 border border-white/10 rounded-full p-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-transparent font-poppins font-light text-white placeholder:text-white/40 focus:outline-none rounded-full"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-vaera-navy rounded-full font-poppins font-semibold text-sm hover:bg-[#F5EDE6] transition-all duration-200 flex-shrink-0 flex items-center justify-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-italiana text-xl text-vaera-navy mb-1">You&apos;re on the list!</h4>
            <p className="font-poppins font-light text-vaera-navy/70 text-sm">
              We&apos;ll notify you when Vaera Pro is ready.
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      {/* <div className="h-px bg-vaera-ice/40" /> */}

      {/* Development Notice */}
      <div className="bg-vaera-ice/20 rounded-2xl p-4 border border-vaera-ice/40">
        <p className="font-poppins font-light text-sm text-vaera-navy/80 leading-relaxed">
          Vaera is currently in development and getting ready to release our first devices. Reserve your spot to be among the first to experience professional-grade microneedling at home.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-vaera-ice/40" />

      {/* Description */}
      <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed">
        The world&apos;s most advanced at-home microneedling device. Featuring medical-grade titanium needles,
        adjustable depth settings, and clinically-proven technology to stimulate collagen production
        and transform your skin.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Crosshair, label: 'Titanium needles' },
          { icon: SlidersHorizontal, label: 'Adjustable depth' },
          { icon: Zap, label: 'USB-C powered' },
          { icon: Plug, label: '120Hz motor' },
        ].map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.label}
              className="flex items-center gap-3 bg-vaera-gray/50 rounded-2xl px-4 py-3"
            >
              <div className="w-8 h-8 bg-vaera-ice/50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-vaera-navy" />
              </div>
              <span className="font-poppins font-light text-sm text-vaera-navy">
                {feature.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-vaera-ice/40" />

      {/* Trust Badges */}
      <div className="flex items-center gap-6 pt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-vaera-navy/50" />
          <span className="font-poppins font-light text-vaera-navy/50 text-sm">
            Secure checkout
          </span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-vaera-navy/50" />
          <span className="font-poppins font-light text-vaera-navy/50 text-sm">
            30-day returns
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-vaera-navy/50" />
          <span className="font-poppins font-light text-vaera-navy/50 text-sm">
            Designed in Pittsburgh
          </span>
        </div>
      </div>
    </div>
  )
}
