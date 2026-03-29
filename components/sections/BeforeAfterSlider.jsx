'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX)
  }
  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="results" className="section-padding pb-8 md:pb-12 bg-vaera-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy mb-6">
            See the Difference
          </h2>
          <p className="font-poppins font-light text-vaera-navy/70 max-w-2xl mx-auto">
            Slow, overlapping penetrations from competitors tear the skin — Vaera&apos;s ultra-fast actuation creates clean, precise micro-channels.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto rounded-4xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <div className="relative w-full">
            {/* Vaera Image (Bottom Layer) */}
            <Image
              src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/DSC_5013_74d02664-fe85-4772-8ce0-7458d2fc583f.jpg?v=1754449461"
              alt="Vaera device precision"
              width={1920}
              height={1280}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
              className="w-full h-auto"
              draggable="false"
              priority
            />

            {/* Competitor Image (Top Layer with clip) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="https://cdn.shopify.com/s/files/1/0710/2313/2772/files/DSC_5000_24c75828-8774-4985-9cba-b86365dbda27.jpg?v=1754449374"
                alt="Competitor device damage"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
                className="object-cover"
                draggable="false"
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-vaera-navy/10">
                <div className="flex items-center gap-1">
                  <ChevronRight className="w-4 h-4 text-vaera-navy rotate-180" />
                  <ChevronRight className="w-4 h-4 text-vaera-navy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center font-poppins font-light text-vaera-navy/50 text-sm mt-8">
          *Same pressure, same duration, same needle count. The difference is in the motor.
        </p>
      </div>
    </section>
  )
}
