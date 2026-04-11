'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'California',
    headline: 'Shocked it actually works',
    quote: "I was skeptical. I've been burned by skincare promises before. But after a few weeks my skin is noticeably plumper and more hydrated. The fine lines around my eyes have softened and there's this glow I haven't seen in years. I'm a believer now.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_3.jpg?v=1774554211',
  },
  {
    id: 2,
    name: 'Rachel T.',
    location: 'Arizona',
    headline: 'My scarring is finally fading',
    quote: "I've had acne scarring since my twenties and nothing ever made a real difference. After using Vaera consistently for 6 weeks, I can see my skin texture smoothing out. The pitted scars are less deep and my confidence is coming back.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_scars_1.jpg?v=1774555009',
  },
  {
    id: 3,
    name: 'Jennifer L.',
    location: 'New York',
    headline: "Better than any device I've tried",
    quote: "I've owned three different microneedling pens and they all felt harsh and uneven. Vaera is completely different. The motor is so smooth and consistent. No dragging, no irritation. My skin actually heals faster and the results are finally showing.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_4.jpg?v=1774554211',
  },
  {
    id: 4,
    name: 'Amanda K.',
    location: 'Texas',
    headline: 'Finally seeing real results',
    quote: "I was spending $400 per clinic visit every month. Vaera paid for itself after the first treatment. The precision is remarkable. My acne scars are finally fading and my skin texture has improved more in 2 months than in a year of facials.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_1.jpg?v=1774554211',
  },
  {
    id: 5,
    name: 'Lisa H.',
    location: 'Colorado',
    headline: 'Smoother skin than I expected',
    quote: "The rough, bumpy texture on my cheeks always bothered me. I started seeing improvement after just three sessions. Now my makeup goes on so much smoother and I actually like how my skin looks without foundation.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_5.jpg?v=1774555027',
  },
  {
    id: 6,
    name: 'Michelle R.',
    location: 'Florida',
    headline: 'The texture improvement is real',
    quote: "Three months in and my pores look smaller, my skin texture is smoother, and the hyperpigmentation from sun damage is visibly lighter. I wish I had found this years ago instead of wasting money on products that don't work.",
    image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/before_after_wrinkles_2.jpg?v=1774554211',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [isTouching, setIsTouching] = useState(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const totalCards = testimonials.length
  const maxIndex = Math.max(0, totalCards - cardsPerView)

  // Calculate cards per view based on screen width
  const updateCardsPerView = useCallback(() => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    if (width >= 1280) {
      setCardsPerView(3)
    } else if (width >= 768) {
      setCardsPerView(2)
    } else {
      setCardsPerView(1)
    }
  }, [])

  // Handle resize
  useEffect(() => {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [updateCardsPerView])

  // Reset index if it exceeds max after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [cardsPerView, currentIndex, maxIndex])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // Lock body scroll during touch interactions
  useEffect(() => {
    if (isTouching) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isTouching])

  // GSAP scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.testimonials-carousel-container',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Touch handling for mobile swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e) => {
    setIsTouching(true)
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (!isTouching) return

    // Prevent page scrolling while dragging slider
    e.preventDefault()
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsTouching(false)

    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
    }
  }

  // Calculate the percentage to shift based on cards per view
  const cardWidthPercent = 100 / cardsPerView
  const translateX = currentIndex * cardWidthPercent

  return (
    <section ref={sectionRef} className="section-padding bg-vaera-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonials-header text-center mb-12 md:mb-16">
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            Results You&apos;ll See With Your Own Eyes
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            Join the waitlist and get the same results our beta testers are raving about.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonials-carousel-container">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${translateX}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-vaera-navy/20 flex items-center justify-center
                         hover:border-vaera-navy/40 hover:bg-white transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-vaera-navy/20 magnetic-hover"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-vaera-navy" />
            </button>

            <div className="font-mono text-sm text-vaera-navy/60">
              <span className="text-vaera-navy font-medium">{currentIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>{maxIndex + 1}</span>
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full border border-vaera-navy/20 flex items-center justify-center
                         hover:border-vaera-navy/40 hover:bg-white transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-vaera-navy/20 magnetic-hover"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-vaera-navy" />
            </button>
          </div>

          {/* Dot indicators for mobile */}
          <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-vaera-navy w-6'
                    : 'bg-vaera-navy/20 hover:bg-vaera-navy/40'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-4xl p-4 md:p-5 lg:p-6 h-full">
      {/* Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden mb-5">
        <Image
          src={testimonial.image}
          alt={`${testimonial.name} results`}
          fill
          className="object-cover"
        />
      </div>

      {/* Testimonial Content */}
      <div className="px-1">
        {/* Customer Info */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-poppins font-medium text-vaera-navy text-sm">
              {testimonial.name}
            </span>
            <span className="text-vaera-navy/40">•</span>
            <span className="font-poppins font-light text-vaera-navy/60 text-sm">
              {testimonial.location}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 rounded-full">
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-2 h-2 text-white" />
            </div>
            <span className="text-xs font-poppins font-medium text-green-700">
              Verified
            </span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-poppins font-semibold text-lg md:text-xl text-vaera-navy mb-3">
          {testimonial.headline}
        </h3>

        {/* Quote */}
        <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed text-sm line-clamp-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </div>
  )
}
