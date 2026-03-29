'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export default function CompactWaitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="bg-vaera-navy rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-italiana text-xl text-white mb-1">
            Want results like this?
          </h3>
          <p className="font-poppins text-sm text-white/60">
            Reserve early access to the Vaera microneedling pen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:w-64 pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-vaera-ice/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'success'}
            className="px-6 py-3 bg-white text-vaera-navy font-poppins font-medium text-sm rounded-full hover:bg-vaera-ice transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {status === 'success' ? (
              'Joined!'
            ) : (
              <>
                Join <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
