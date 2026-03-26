'use client'

import { useState } from 'react'
import { ArrowRight, Check, Mail, Shield, RefreshCw, Sparkles } from 'lucide-react'

export default function ProductInfo() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-vaera-ice/50 px-4 py-2 rounded-full">
        <Sparkles className="w-4 h-4 text-vaera-navy" />
        <span className="font-mono text-xs text-vaera-navy uppercase tracking-wider">Coming Soon</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-4">
          Vaera Pro
        </h1>
        <p className="font-poppins font-light text-xl text-vaera-navy/70">
          Professional Microneedling Device
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-italiana text-3xl text-vaera-navy">$299</span>
        <span className="font-poppins font-light text-vaera-navy/50 line-through">$449</span>
        <span className="bg-green-500 text-white text-xs font-poppins font-medium px-3 py-1 rounded-full">
          Save $150
        </span>
      </div>

      {/* Description */}
      <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed">
        The world&apos;s most advanced at-home microneedling device. Featuring medical-grade titanium needles,
        adjustable depth settings, and clinically-proven technology to stimulate collagen production
        and transform your skin.
      </p>

      {/* Key Features List */}
      <ul className="space-y-3">
        {[
          'Medical-grade titanium needles',
          'Adjustable depth: 0.25mm - 2.0mm',
          '120 Hz precision motor',
          'Wireless & rechargeable',
          'FDA-cleared technology',
        ].map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div className="w-5 h-5 bg-vaera-ice rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-vaera-navy" />
            </div>
            <span className="font-poppins font-light text-vaera-navy">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Waitlist Form */}
      <div id="waitlist" className="bg-vaera-gray rounded-3xl p-6 space-y-4">
        <div>
          <h3 className="font-italiana text-2xl text-vaera-navy mb-2">Join the Waitlist</h3>
          <p className="font-poppins font-light text-vaera-navy/70 text-sm">
            Be the first to know when Vaera Pro launches. Early supporters get exclusive pricing.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vaera-navy/30" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-vaera-navy/10 bg-white font-poppins font-light text-vaera-navy placeholder:text-vaera-navy/40 focus:outline-none focus:border-vaera-ice focus:ring-2 focus:ring-vaera-ice/20 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 group"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
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

        <p className="font-poppins font-light text-vaera-navy/40 text-xs text-center">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center gap-6 pt-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-vaera-navy/50" />
          <span className="font-poppins font-light text-vaera-navy/50 text-sm">2-Year Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-vaera-navy/50" />
          <span className="font-poppins font-light text-vaera-navy/50 text-sm">30-Day Returns</span>
        </div>
      </div>
    </div>
  )
}
