'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 bg-white/90 backdrop-blur-xl border border-vaera-navy/10 shadow-lg rounded-full px-6 md:px-8 py-4">
        <div className="flex items-center gap-6 md:gap-12">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-vaera-navy"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="font-italiana text-2xl tracking-wide text-vaera-navy transition-colors duration-300">
            VAERA
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/products/microneedling-pen"
              className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
            >
              Shop
            </Link>
            <Link
              href="/pages/about-us"
              className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover whitespace-nowrap"
            >
              About Us
            </Link>
            <Link
              href="/pages/faq"
              className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
            >
              Blog
            </Link>
            <Link
              href="/pages/contact"
              className="text-sm font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy transition-all duration-300 magnetic-hover"
            >
              Contact
            </Link>
          </div>

          <a
            href="#waitlist"
            className="text-sm font-poppins font-medium px-6 py-2 rounded-full bg-vaera-navy text-white hover:bg-vaera-light-navy transition-all duration-300 whitespace-nowrap"
            style={{ transform: 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-vaera-navy/10">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-italiana text-2xl tracking-wide text-vaera-navy"
            >
              VAERA
            </Link>
            <button
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-vaera-navy"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar links */}
          <div className="flex flex-col p-6 gap-2">
            <Link
              href="/products/microneedling-pen"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              Shop
            </Link>
            <Link
              href="/pages/about-us"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              href="/pages/faq"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              Blog
            </Link>
            <Link
              href="/pages/contact"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Sidebar CTA */}
          <div className="mt-auto p-6 border-t border-vaera-navy/10">
            <a
              href="#waitlist"
              onClick={closeMobileMenu}
              className="block text-center font-poppins font-medium px-6 py-3 rounded-full bg-vaera-navy text-white hover:bg-vaera-light-navy transition-all duration-300"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
