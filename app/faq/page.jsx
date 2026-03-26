'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqCategories = [
  {
    id: 'treatment-protocol',
    label: 'Treatment Protocol',
    faqs: [
      {
        question: 'How often should I use microneedle?',
        answer: 'We recommend needling once every two weeks to allow proper healing of the skin.',
      },
      {
        question: 'What depth should I use?',
        answer: 'For all purposes, we recommend using a standard 0.5mm depth, which has shown to produce the best results in the shortest time. If there is bleeding or excessive irritation, we recommend reducing the depth by 0.1mm until the issues stop.',
      },
      {
        question: 'Is Vaera safe to use?',
        answer: 'Yes, Vaera is designed to be significantly safer than traditional at-home devices because it reduces excessive skin damage caused by slow, weak motors. Our precise needle actuation creates clean punctures, making the process nearly painless with minimal downtime.',
      },
      {
        question: 'When is the best time to microneedle?',
        answer: 'We recommend doing the treatment at night right before bed. Avoid being in the sun and using makeup for 24 hours after the treatment.',
      },
      {
        question: 'What does microneedling feel like? Does it hurt?',
        answer: 'Unlike other at-home options, Vaera is almost completely painless. Other at-home products have slow motors that drag through the skin, causing excessive skin damage. Because of Vaera\'s unique motor technology, this damage is minimized making the treatment nearly painless.',
      },
    ],
  },
  {
    id: 'how-it-works',
    label: 'How It Works',
    faqs: [
      {
        question: 'How does it work?',
        answer: 'Vaera creates controlled micro-injuries in your skin using extremely precise vertical needle punctures. This triggers your body\'s natural healing response to produce new collagen and elastin, healthier and smoother.',
      },
      {
        question: 'What concerns does microneedling help?',
        answer: 'Although microneedling helps with many skin concerns, we find that it best helps fine lines & wrinkles, hair loss, and enlarged pores/skin texture.',
      },
      {
        question: 'How does it help hair loss specifically?',
        answer: 'Microneedling stimulates hair growth through several biological mechanisms that address the root causes of hair thinning and loss. The controlled micro-injuries trigger your scalp\'s natural healing processes in multiple ways:\n\n• Improves blood flow to hair follicles, delivering more nutrients and oxygen\n• Enhances absorption of topical treatments like minoxidil by creating micro-channels\n• Releases growth factors that stimulate hair follicle activity and increase hair thickness\n• Activates healing responses that can wake up dormant or weakened hair follicles\n• Stimulates cellular regeneration in the scalp tissue supporting healthy hair growth',
      },
      {
        question: 'How does Vaera differ from traditional at-home microneedling devices?',
        answer: 'The magic lies in our motor. Other at-home devices use slow motors which causes the needles to linger in the skin and drag/tear during treatment. These motors also don\'t allow enough spacing between actuations so punctures overlap and cause overtreatment. Vaera eliminates all these problems with our unique motor design that creates clean penetrations every time, making our treatment virtually painless with minimum downtime.',
      },
    ],
  },
  {
    id: 'company-availability',
    label: 'Company & Availability',
    faqs: [
      {
        question: 'When will the Vaera Pen be available for purchase?',
        answer: 'Vaera is currently in final development and testing phases, with plans to launch in mid-2026. We\'re working to ensure our device meets the highest quality and safety standards before bringing it to market.',
      },
      {
        question: 'I\'m interested in investing, how can I get involved?',
        answer: 'We\'re currently seeking strategic investors and partners who share our vision of revolutionizing at-home skincare. Please visit our contact page to discuss investment opportunities and learn more about our business plans.',
      },
      {
        question: 'Will Vaera be available internationally?',
        answer: 'We plan to launch initially in the United States, with international expansion following shortly after based on regulatory approvals and market demand. Sign up for our newsletter to be notified when we become available in your region.',
      },
    ],
  },
]

function FAQItem({ faq, isOpen, onToggle, index }) {
  const contentRef = useRef(null)
  const answerRef = useRef(null)

  useEffect(() => {
    if (contentRef.current && answerRef.current) {
      const height = isOpen ? answerRef.current.scrollHeight : 0
      gsap.to(contentRef.current, {
        height,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }
  }, [isOpen])

  return (
    <div className="border border-vaera-navy/10 rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:border-vaera-navy/20">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between text-left group transition-colors duration-300 hover:bg-vaera-gray/30"
      >
        <span className="font-poppins font-medium text-vaera-navy pr-6 text-lg">
          {faq.question}
        </span>
        <div className={`w-10 h-10 rounded-full bg-vaera-gray flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-vaera-ice/50 ${isOpen ? 'bg-vaera-ice' : ''}`}>
          <ChevronDown
            className={`w-5 h-5 text-vaera-navy transition-transform duration-400 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div ref={answerRef} className="px-8 pb-6">
          <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed whitespace-pre-line">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQCategory({ category, openIndex, setOpenIndex, categoryIndex }) {
  const categoryRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(categoryRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, categoryRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={categoryRef} className="mb-16 last:mb-0">
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs text-vaera-navy/40 uppercase tracking-widest">
          {String(categoryIndex + 1).padStart(2, '0')}
        </span>
        <h2 className="font-italiana text-3xl md:text-4xl text-vaera-navy">
          {category.label}
        </h2>
      </div>
      <div className="space-y-4">
        {category.faqs.map((faq, index) => {
          const globalIndex = `${categoryIndex}-${index}`
          return (
            <FAQItem
              key={globalIndex}
              faq={faq}
              index={index}
              isOpen={openIndex === globalIndex}
              onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const heroRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const tl = gsap.timeline()
      tl.from('.faq-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      tl.from('.faq-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      tl.from('.faq-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main ref={heroRef}>
        <section className="min-h-screen pt-32 pb-20 section-padding bg-vaera-gray">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-20">
              <span className="faq-label text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">
                Support
              </span>
              <h1 className="faq-title font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy mb-6">
                Frequently Asked Questions
              </h1>
              <p className="faq-subtitle font-poppins font-light text-vaera-navy/60 text-lg max-w-2xl mx-auto">
                Everything you need to know about Vaera and at-home microneedling.
              </p>
            </div>

            {/* FAQ Categories */}
            {faqCategories.map((category, index) => (
              <FAQCategory
                key={category.id}
                category={category}
                categoryIndex={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}

            {/* CTA */}
            <div
              ref={ctaRef}
              className="mt-20 p-10 md:p-12 bg-white rounded-4xl text-center border border-vaera-navy/5 shadow-sm"
            >
              <p className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">
                Still have questions?
              </p>
              <p className="font-poppins font-light text-vaera-navy/60 mb-8 max-w-md mx-auto">
                Our team is here to help. Reach out anytime and we will get back to you within 24 hours.
              </p>
              <a
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
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
