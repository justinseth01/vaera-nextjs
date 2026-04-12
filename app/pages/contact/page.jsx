'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroCTA from '@/components/sections/HeroCTA'
import { Mail, MessageSquare, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder - would integrate with backend
    setIsSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy mb-4">
              Contact
            </h1>
            <p className="font-poppins font-light text-vaera-navy/70 text-lg mb-12 max-w-2xl">
              Have a question about Vaera? Want to learn more about our technology?
              We would love to hear from you.
            </p>

            {isSubmitted ? (
              <div className="p-12 bg-vaera-gray rounded-3xl text-center">
                <div className="w-16 h-16 bg-vaera-ice/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-vaera-navy" />
                </div>
                <h2 className="font-italiana text-3xl text-vaera-navy mb-3">
                  Message Sent
                </h2>
                <p className="font-poppins font-light text-vaera-navy/70">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-poppins text-sm text-vaera-navy mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-vaera-navy/10 bg-white font-poppins text-vaera-navy placeholder:text-vaera-navy/40 focus:outline-none focus:border-vaera-ice transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-poppins text-sm text-vaera-navy mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-vaera-navy/10 bg-white font-poppins text-vaera-navy placeholder:text-vaera-navy/40 focus:outline-none focus:border-vaera-ice transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-poppins text-sm text-vaera-navy mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-vaera-navy/10 bg-white font-poppins text-vaera-navy placeholder:text-vaera-navy/40 focus:outline-none focus:border-vaera-ice transition-colors resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-vaera-navy text-white px-8 py-4 rounded-full font-poppins font-medium text-sm tracking-wide transition-all duration-300 hover:bg-vaera-light-navy hover:shadow-lg hover:shadow-vaera-navy/20"
                  style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
        <HeroCTA />
      </main>
      <Footer />
    </>
  )
}
