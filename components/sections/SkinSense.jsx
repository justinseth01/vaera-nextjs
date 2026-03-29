'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MAX_WATTS = 6.75 // 9V × 0.75A

const skinProfiles = [
  {
    id: 'sensitive',
    label: 'Thin / Sensitive',
    area: 'Forehead, Under-eyes',
    motorPower: 35,
    color: '#7A9FB5',
  },
  {
    id: 'normal',
    label: 'Normal',
    area: 'Cheeks, Chin',
    motorPower: 60,
    color: '#5B8A9A',
  },
  {
    id: 'dense',
    label: 'Dense / Callused',
    area: 'Callused areas, Thick skin',
    motorPower: 90,
    color: '#1F2A37',
  },
]

function MotorPowerMeter({ percentage, watts, color }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <span className="font-mono text-xs text-vaera-navy/50 uppercase tracking-wider block mb-1">Motor Power</span>
          <span className="font-mono text-3xl text-vaera-navy font-medium">{watts}W</span>
        </div>
        <span className="font-mono text-lg text-vaera-navy/60">{percentage}%</span>
      </div>
      <div className="h-4 bg-vaera-gray rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function SkinProfileSelector({ profiles, activeId, onSelect }) {
  return (
    <div className="flex gap-2 p-1 bg-vaera-gray rounded-full">
      {profiles.map((profile) => (
        <button
          key={profile.id}
          onClick={() => onSelect(profile.id)}
          className={`flex-1 px-4 py-2.5 rounded-full font-poppins text-sm font-medium transition-all duration-300 ${
            activeId === profile.id
              ? 'bg-white text-vaera-navy shadow-md'
              : 'text-vaera-navy/50 hover:text-vaera-navy/70'
          }`}
        >
          {profile.label}
        </button>
      ))}
    </div>
  )
}

export default function SkinSense() {
  const sectionRef = useRef(null)
  const [activeProfile, setActiveProfile] = useState('normal')

  const currentProfile = skinProfiles.find((p) => p.id === activeProfile)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skinsense-header',
        { y: 30, opacity: 0 },
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
        '.skinsense-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-cycle through profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfile((current) => {
        const currentIndex = skinProfiles.findIndex((p) => p.id === current)
        const nextIndex = (currentIndex + 1) % skinProfiles.length
        return skinProfiles[nextIndex].id
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-vaera-gray">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="skinsense-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-vaera-ice/50 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#7A9FB5] animate-pulse" />
            <span className="font-mono text-xs text-vaera-navy uppercase tracking-wider">Powered by SkinSense™</span>
          </div>
          <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-vaera-navy leading-tight mb-6">
            Adaptive Motor Technology
          </h2>
          <p className="font-poppins text-lg md:text-xl text-vaera-navy/70 max-w-3xl mx-auto">
            Forehead skin is 30% thinner than cheek skin. Scar tissue is 3× denser than healthy dermis.
            A fixed-power device treats them all the same. <span className="text-vaera-navy font-medium">SkinSense doesn't.</span>
          </p>
        </div>

        {/* Interactive Display */}
        <div className="skinsense-content">
          <div className="bg-white rounded-[2rem] border border-vaera-navy/10 overflow-hidden shadow-lg">
            {/* Top bar - system status */}
            <div className="px-6 py-4 bg-vaera-navy flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-sm text-white/80">SkinSense™ Active</span>
              </div>
              <span className="font-mono text-xs text-white/50">v2.1.0</span>
            </div>

            <div className="p-6 md:p-10">
              {/* Profile Selector */}
              <div className="mb-10">
                <SkinProfileSelector
                  profiles={skinProfiles}
                  activeId={activeProfile}
                  onSelect={setActiveProfile}
                />
              </div>

              {/* Main Display Grid */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left - Skin Profile Info */}
                <div className="space-y-6">
                  <div className="p-6 bg-vaera-gray/50 rounded-2xl">
                    <div className="mb-4">
                      <h3 className="font-poppins font-semibold text-xl text-vaera-navy mb-1">
                        {currentProfile.label}
                      </h3>
                      <p className="font-poppins text-sm text-vaera-navy/60">{currentProfile.area}</p>
                    </div>

                    {/* Skin visualization */}
                    <div className="relative h-32 bg-[#E8D4C4] rounded-xl overflow-hidden">
                      {/* Epidermis layer - thickness changes based on skin type */}
                      <div
                        className="absolute top-0 left-0 right-0 bg-[#F5E6D3] transition-all duration-700"
                        style={{ height: activeProfile === 'sensitive' ? '15%' : activeProfile === 'normal' ? '25%' : '40%' }}
                      />
                      {/* Needle penetration indicator */}
                      <div className="absolute left-1/2 top-0 w-0.5 bg-vaera-navy/60 transition-all duration-700"
                        style={{
                          height: activeProfile === 'sensitive' ? '40%' : activeProfile === 'normal' ? '60%' : '80%',
                          transform: 'translateX(-50%)'
                        }}
                      />
                      <div
                        className="absolute left-1/2 w-3 h-3 rounded-full transition-all duration-700"
                        style={{
                          top: activeProfile === 'sensitive' ? '38%' : activeProfile === 'normal' ? '58%' : '78%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: currentProfile.color
                        }}
                      />
                    </div>
                  </div>

                </div>

                {/* Right - Motor Power */}
                <div className="flex items-center">
                  <div className="w-full p-6 bg-vaera-navy/5 rounded-2xl border border-vaera-navy/10">
                    <MotorPowerMeter
                      percentage={currentProfile.motorPower}
                      watts={((currentProfile.motorPower / 100) * MAX_WATTS).toFixed(1)}
                      color={currentProfile.color}
                    />

                    {/* Adjustment indicator */}
                    <div className="mt-6 pt-4 border-t border-vaera-navy/10">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-mono text-xs text-vaera-navy/60">
                          Auto-adjusted for {currentProfile.label.toLowerCase()} skin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <p className="text-center font-poppins text-sm text-vaera-navy/50 mt-8 italic">
            SkinSense™ technology continuously monitors tissue resistance and adjusts motor output in real-time.
          </p>
        </div>
      </div>
    </section>
  )
}
