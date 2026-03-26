'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How is Vaera different from other microneedling devices?',
    answer: 'Vaera delivers ±0.05mm penetration variance compared to ±0.15–0.25mm for competitors. This means 3× more consistent depth control and 40% less skin trauma. Our proprietary motor actuation system ensures every needle puncture is precise.',
  },
  {
    question: 'Is microneedling safe to do at home?',
    answer: 'When done correctly with a quality device, at-home microneedling is safe and effective. Vaera is designed with multiple safety features including automatic depth limiting and a precision-calibrated motor that prevents over-penetration.',
  },
  {
    question: 'How often should I use Vaera?',
    answer: 'For most skin concerns, we recommend treatments every 2-4 weeks. The optimal frequency depends on your specific goals and skin sensitivity. Our app provides personalized protocol recommendations.',
  },
  {
    question: 'When will I see results?',
    answer: 'Most users notice improved skin texture within 2-3 weeks. For concerns like acne scars or fine lines, optimal results typically appear after 3-6 treatments as collagen remodeling takes time.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 60-day satisfaction guarantee. If you are not completely satisfied with your Vaera device, return it for a full refund, no questions asked.',
  },
  {
    question: 'When will Vaera be available?',
    answer: 'We are currently in the final stages of production. Join our waitlist to be notified when we launch and receive early-bird pricing at $249.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">
              Support
            </span>
            <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy mb-4">
              FAQ
            </h1>
            <p className="font-poppins font-light text-vaera-navy/70 text-lg mb-12">
              Everything you need to know about Vaera and at-home microneedling.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-vaera-navy/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-vaera-gray/50 transition-colors duration-200"
                  >
                    <span className="font-poppins font-medium text-vaera-navy pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-vaera-navy/50 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-5 font-poppins font-light text-vaera-navy/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-vaera-gray rounded-3xl text-center">
              <p className="font-poppins font-medium text-vaera-navy mb-2">
                Still have questions?
              </p>
              <p className="font-poppins font-light text-vaera-navy/70 mb-4">
                We are here to help. Reach out to our team anytime.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-vaera-navy text-white px-6 py-3 rounded-full font-poppins font-medium text-sm transition-all duration-300 hover:bg-vaera-light-navy"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
