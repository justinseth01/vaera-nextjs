'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Award, TrendingDown, TrendingUp } from 'lucide-react'

const CLINIC_COST_PER_SESSION = 300
const VAERA_COST = 249
const MAX_SESSIONS = 8

export default function AtHomeClinicComparison() {
  const [sessions, setSessions] = useState(1)
  const [clinicTotal, setClinicTotal] = useState(CLINIC_COST_PER_SESSION)
  const [isRunning, setIsRunning] = useState(false)
  const clinicRef = useRef(null)
  const vaeraRef = useRef(null)
  const savingsRef = useRef(null)

  const costPerSession = sessions > 0 ? Math.round(VAERA_COST / sessions) : VAERA_COST
  const savings = clinicTotal - VAERA_COST

  useEffect(() => {
    const startAnimation = () => {
      setIsRunning(true)
      setSessions(1)
      setClinicTotal(CLINIC_COST_PER_SESSION)

      let currentSession = 1
      const interval = setInterval(() => {
        currentSession++
        if (currentSession > MAX_SESSIONS) {
          clearInterval(interval)
          setIsRunning(false)
          // Reset after delay
          setTimeout(() => {
            startAnimation()
          }, 4000)
          return
        }

        setSessions(currentSession)
        setClinicTotal(currentSession * CLINIC_COST_PER_SESSION)
      }, 600)

      return () => clearInterval(interval)
    }

    const timeout = setTimeout(startAnimation, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    // Animate the clinic total with a slight bump
    if (clinicRef.current && sessions > 1) {
      gsap.fromTo(clinicRef.current,
        { scale: 1.1, color: '#ef4444' },
        { scale: 1, color: '#1F2A37', duration: 0.3, ease: 'power2.out' }
      )
    }

    // Animate the cost per session dropping
    if (vaeraRef.current && sessions > 1) {
      gsap.fromTo(vaeraRef.current,
        { scale: 1.1, color: '#10b981' },
        { scale: 1, color: '#1F2A37', duration: 0.3, ease: 'power2.out' }
      )
    }

    // Animate savings
    if (savingsRef.current && savings > 0) {
      gsap.fromTo(savingsRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: 'power2.out' }
      )
    }
  }, [sessions, savings])

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-vaera-ice" />
        <span className="text-xs font-mono text-vaera-navy/50 uppercase tracking-wider">Value</span>
      </div>
      <h3 className="font-italiana text-2xl md:text-3xl text-vaera-navy mb-3">Professional Grade</h3>
      <p className="font-poppins font-light text-vaera-navy/70 text-sm mb-6">
        Clinical results without clinical prices. Watch the value add up.
      </p>

      {/* Comparison display */}
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Clinic side */}
          <div className="bg-red-50 rounded-xl p-4 flex flex-col border border-red-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp className="w-3 h-3 text-red-400" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-red-400">Dermatologist</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p ref={clinicRef} className="font-mono text-2xl font-bold text-vaera-navy mb-1">
                ${clinicTotal.toLocaleString()}
              </p>
              <p className="font-mono text-[10px] text-vaera-navy/50">
                {sessions} session{sessions > 1 ? 's' : ''} × ${CLINIC_COST_PER_SESSION}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-red-200">
              <p className="font-mono text-[10px] text-red-500">
                ${CLINIC_COST_PER_SESSION}/session
              </p>
            </div>
          </div>

          {/* Vaera side */}
          <div className="bg-emerald-50 rounded-xl p-4 flex flex-col border border-emerald-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingDown className="w-3 h-3 text-emerald-500" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500">Vaera at Home</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="font-mono text-2xl font-bold text-vaera-navy mb-1">
                ${VAERA_COST}
              </p>
              <p className="font-mono text-[10px] text-vaera-navy/50">
                {sessions} session{sessions > 1 ? 's' : ''} completed
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-emerald-200">
              <p ref={vaeraRef} className="font-mono text-[10px] text-emerald-600 font-medium">
                ${costPerSession}/session
              </p>
            </div>
          </div>
        </div>

        {/* Savings banner */}
        <div
          ref={savingsRef}
          className={`mt-3 py-2 px-4 rounded-lg text-center transition-all duration-300 ${
            savings > 0
              ? 'bg-vaera-navy text-white'
              : 'bg-vaera-navy/10 text-vaera-navy/50'
          }`}
        >
          <p className="font-mono text-xs">
            {savings > 0 ? (
              <>You&apos;ve saved <span className="font-bold text-vaera-ice">${savings.toLocaleString()}</span> so far</>
            ) : (
              <>Break-even after 2 sessions</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
