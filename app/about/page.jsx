'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Microscope, Eye, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Microscope,
    title: 'Science-Backed Technology',
    description: 'Every aspect of our design is informed by clinical research and expert insight, ensuring performance, precision, and safety at a professional level. Rooted in real dermatological science, there\'s no fluff and no filler. We focus on what actually works.',
  },
  {
    icon: Eye,
    title: 'Transparency & Clarity',
    description: 'We believe clarity is power. In a world crowded with skincare myths and confusing science, we\'re committed to cutting through the noise. We provide straightforward information about how our products work and what their capabilities are.',
  },
  {
    icon: Award,
    title: 'Quality Without Compromise',
    description: 'We provide professional-grade products designed to fit in people\'s everyday lives. Premium isn\'t about exclusivity — it\'s about raising the standard.',
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.about-hero-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )

      // Story section
      gsap.fromTo('.story-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
          }
        }
      )

      // Values cards
      gsap.fromTo('.value-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[70vh] pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-vaera-gray to-vaera-ice/20" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-vaera-ice/20 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <span className="about-hero-text text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-6 block">
                Our Story
              </span>
              <h1 className="about-hero-text font-italiana text-5xl md:text-6xl lg:text-7xl text-vaera-navy mb-8 leading-[0.95]">
                Built from
                <br />
                <span className="text-vaera-light-navy/70">Frustration.</span>
                <br />
                Driven by
                <br />
                <span className="text-vaera-light-navy/70">Science.</span>
              </h1>
              <p className="about-hero-text font-poppins font-light text-xl text-vaera-navy/60 max-w-xl leading-relaxed">
                Why should professional-grade skincare results be locked behind expensive clinic visits?
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section ref={storyRef} className="py-24 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Founder Photo */}
              <div className="story-content relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-vaera-gray">
                  <Image
                    src="https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=765&auto=format&fit=crop"
                    alt="Justin Seth, Founder of Vaera"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-vaera-ice/30 rounded-3xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-vaera-navy/10 rounded-2xl -z-10" />
              </div>

              {/* Story Content */}
              <div>
                <span className="story-content text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">
                  Meet the Founder
                </span>
                <h2 className="story-content font-italiana text-4xl md:text-5xl text-vaera-navy mb-6">
                  Justin Seth
                </h2>
                <div className="story-content w-16 h-px bg-vaera-navy/20 mb-8" />

                <div className="space-y-6 font-poppins font-light text-vaera-navy/70 leading-relaxed">
                  <p className="story-content text-lg">
                    Vaera was founded by Justin Seth, a mechanical engineer who discovered microneedling
                    as a promising hair loss treatment — but found clinical treatments too expensive and
                    at-home alternatives painful and damaging.
                  </p>
                  <p className="story-content">
                    After consulting dermatologists and reverse engineering existing solutions, he identified
                    the root cause of the problem: damage comes from slow, overlapping needle penetrations
                    that tear rather than puncture the skin.
                  </p>
                  <p className="story-content">
                    He assembled a team of engineers and skincare experts, spending over two years developing
                    a revolutionary motor with ultra-fast needle actuation that minimizes skin damage. The result
                    outperforms all competitors in the at-home microneedling market.
                  </p>
                </div>

                <div className="story-content mt-10 p-6 bg-vaera-gray rounded-2xl border-l-4 border-vaera-ice">
                  <p className="font-poppins text-vaera-navy italic">
                    "I couldn't find a device that worked without hurting. So I built one."
                  </p>
                  <p className="font-mono text-xs text-vaera-navy/50 mt-2 uppercase tracking-wider">
                    — Justin Seth, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-vaera-navy">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-mono text-vaera-ice/50 uppercase tracking-widest mb-6 block">
              Our Mission
            </span>
            <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              Making high-quality skincare
              <span className="text-vaera-ice"> accessible </span>
              and
              <span className="text-vaera-ice"> affordable </span>
              for everyone.
            </h2>
            <p className="font-poppins font-light text-white/70 text-lg max-w-2xl mx-auto">
              Today, Vaera is dedicated to democratizing professional skincare. We plan to expand our
              product lineup to become the one-stop-shop for all high-quality skincare treatments.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section ref={valuesRef} className="py-24 px-6 md:px-12 lg:px-24 bg-vaera-gray">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-widest mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-italiana text-4xl md:text-5xl text-vaera-navy">
                Core Values
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card bg-white rounded-3xl p-8 border border-vaera-navy/5 hover:shadow-xl hover:shadow-vaera-navy/5 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-vaera-ice/20 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-vaera-navy" />
                  </div>
                  <h3 className="font-italiana text-2xl text-vaera-navy mb-4">
                    {value.title}
                  </h3>
                  <p className="font-poppins font-light text-vaera-navy/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-italiana text-4xl md:text-5xl text-vaera-navy mb-6">
              Join the Movement
            </h2>
            <p className="font-poppins font-light text-vaera-navy/70 text-lg mb-10 max-w-2xl mx-auto">
              Be among the first to experience professional-grade microneedling at home.
              Join our waitlist for early access and exclusive launch pricing.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-3 bg-vaera-navy text-white px-10 py-5 rounded-full font-poppins font-medium tracking-wide transition-all duration-300 hover:bg-vaera-light-navy hover:shadow-xl hover:shadow-vaera-navy/20"
              style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Join the Waitlist
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
