'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const concerns = [
  {
    id: 'wrinkles',
    label: 'Fine Lines',
    title: 'Fine Lines & Wrinkles',
    tagline: 'Reveal skin that looks plumper, smoother, and refreshed.',
    mechanism: 'Microneedling supports the skin\'s natural renewal process, helping to improve the appearance of fine lines while leaving skin looking firmer and more youthful.',
    timeline: '4–6 weeks',
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_6.jpg?v=1774630568',
  },
  {
    id: 'hair',
    label: 'Scalp Health',
    title: 'Scalp Health & Hair Appearance',
    tagline: 'Support a healthier-looking scalp and the appearance of thicker hair.',
    mechanism: 'Microneedling helps enhance the absorption of your favorite scalp serums while supporting overall scalp health. Many users notice hair that looks fuller and more voluminous over time.',
    timeline: '8–12 weeks',
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_hair_loss_1.jpg?v=1774630564',
  },
  {
    id: 'scarring',
    label: 'Skin Texture',
    title: 'Uneven Skin Texture',
    tagline: 'Help minimize the appearance of textured skin and past blemishes.',
    mechanism: 'Regular use supports the skin\'s natural renewal process, helping to smooth the appearance of uneven texture and leaving skin looking more refined and even.',
    timeline: '6–8 weeks',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
  },
  {
    id: 'pigmentation',
    label: 'Dark Spots',
    title: 'Uneven Skin Tone',
    tagline: 'Reveal a brighter, more even-looking complexion.',
    mechanism: 'Microneedling enhances the absorption of your brightening serums while supporting natural skin renewal. The result is skin that looks more luminous and evenly toned.',
    timeline: '6–10 weeks',
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_dark_spots_1.jpg?v=1774630562',
  },
  {
    id: 'texture',
    label: 'Pores',
    title: 'Pores & Skin Smoothness',
    tagline: 'Help minimize the look of pores for smoother-looking skin.',
    mechanism: 'With consistent use, skin appears more refined and smooth. Pores look less visible as overall skin texture improves.',
    timeline: '3–5 weeks',
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_pores_1.jpg?v=1774630573',
  },
]

export default function TreatsConcerns() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  const activeConcern = concerns[activeIndex]

  const handleSelect = (index) => {
    if (index === activeIndex || isAnimating) return

    setIsAnimating(true)

    // Fade out current content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index)
        // Fade in new content
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        )
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.treats-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="treats-reveal font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            How Vaera Can Help
          </h2>

          <p className="treats-reveal font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            One device. Five of the most common skin concerns. All supported through consistent, precision microneedling.
          </p>
        </div>

        {/* Concern Selector Pills */}
        <div className="treats-reveal flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {concerns.map((concern, index) => (
            <button
              key={concern.id}
              onClick={() => handleSelect(index)}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full font-poppins text-sm md:text-base transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-vaera-navy text-white shadow-lg shadow-vaera-navy/20'
                  : 'bg-vaera-gray text-vaera-navy/70 hover:bg-vaera-navy/10 hover:text-vaera-navy'
              }`}
            >
              {concern.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="treats-reveal">
          <div
            ref={contentRef}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-vaera-gray rounded-[2rem] p-6 md:p-10 lg:p-12"
          >
            {/* Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={activeConcern.image}
                alt={activeConcern.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-vaera-navy/20 to-transparent" />
              {/* Before/After labels */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="font-mono text-xs uppercase tracking-wider text-vaera-navy/70">Before</span>
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="font-mono text-xs uppercase tracking-wider text-vaera-navy/70">After</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-italiana text-3xl md:text-4xl lg:text-5xl text-vaera-navy mb-4">
                {activeConcern.title}
              </h3>

              <p className="font-poppins text-lg md:text-xl text-vaera-navy/80 italic mb-6">
                &ldquo;{activeConcern.tagline}&rdquo;
              </p>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#D4A574]">✦</span>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-vaera-navy/50">
                    How It Works
                  </span>
                </div>
                <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed">
                  {activeConcern.mechanism}
                </p>
              </div>

              {/* Timeline Indicator */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
                <div className="w-12 h-12 bg-vaera-navy/5 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-vaera-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-vaera-navy/50 mb-0.5">
                    First Results
                  </div>
                  <div className="font-poppins font-semibold text-vaera-navy text-lg">
                    {activeConcern.timeline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
