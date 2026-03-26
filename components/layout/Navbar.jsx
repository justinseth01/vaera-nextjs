'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-xl border border-vaera-navy/10 shadow-lg opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-full pointer-events-none'
    } rounded-full px-8 py-4`}>
      <div className="flex items-center gap-12">
        <Link href="/" className="font-italiana text-2xl tracking-wide text-vaera-navy transition-colors duration-300">
          VAERA
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
          >
            Contact
          </Link>
        </div>
        <a
          href="#waitlist"
          className="text-sm font-poppins font-medium px-6 py-2 rounded-full bg-vaera-navy text-white hover:bg-vaera-light-navy transition-all duration-300"
          style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  )
}
