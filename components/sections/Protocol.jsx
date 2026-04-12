'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Protocol() {
  const protocolRef = useRef(null)
  const cardsRef = useRef([])

  const steps = [
    {
      number: '01',
      title: 'Prepare Your Skin',
      description: 'Cleanse your skin of any oils, makeup, or dirt before microneedling.',
      image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/washing_face.jpg?v=1774794433',
    },
    {
      number: '02',
      title: 'Needle',
      description: 'Nearly painless microneedling experience due to our patentable motor technology.',
      image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/image.jpg?v=1774794689',
    },
    {
      number: '03',
      title: 'Recovery',
      description: 'Let your skin recover and enjoy rejuvenated skin.',
      image: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/morning-after_glow.jpg?v=1774794462',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < cardsRef.current.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 20%',
            end: 'bottom 20%',
            onEnter: () => {
              gsap.to(card, {
                scale: 0.92,
                filter: 'blur(4px)',
                opacity: 0.6,
                duration: 0.5,
              })
            },
            onLeaveBack: () => {
              gsap.to(card, {
                scale: 1,
                filter: 'blur(0px)',
                opacity: 1,
                duration: 0.5,
              })
            },
          })
        }
      })
    }, protocolRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={protocolRef} id="technology" className="bg-vaera-gray">
      <div className="px-6 md:px-12 lg:px-24 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">The Protocol</span>
            <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy">
              How It Works
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-8 pb-16 md:pb-20">
        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => (cardsRef.current[i] = el)}
            className="sticky top-24 mx-6 md:mx-12 lg:mx-24"
          >
            <div className="max-w-7xl mx-auto bg-white rounded-4xl p-8 md:p-10 lg:p-12 shadow-xl border border-vaera-navy/5">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <span className="font-mono text-6xl md:text-7xl lg:text-8xl font-bold text-vaera-navy/20 mb-2 block leading-none">{step.number}</span>
                  <h3 className="font-italiana text-3xl md:text-4xl text-vaera-navy mb-4">{step.title}</h3>
                  <p className="font-poppins font-light text-vaera-navy/70">{step.description}</p>
                </div>
                <div className="relative h-48 md:h-56 bg-vaera-gray rounded-3xl overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
