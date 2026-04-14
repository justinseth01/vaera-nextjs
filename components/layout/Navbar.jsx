'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, Search, ShoppingBag } from 'lucide-react'

export default function Navbar({ isHomepage = false }) {
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

  // Determine styling based on homepage and scroll state
  const isTransparent = isHomepage && !isScrolled
  const bgClass = isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-xl shadow-sm'
  const textClass = isTransparent ? 'text-white' : 'text-vaera-navy'
  const textLightClass = isTransparent ? 'text-white/80' : 'text-vaera-navy/70'
  const borderClass = isTransparent ? 'border-white/10' : 'border-vaera-navy/10'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>
        <div className="max-w-[1920px] mx-auto px-8 md:px-20 py-5">
          <div className="flex items-center justify-between">
            {/* Left: Navigation Links (Desktop) */}
            <div className="hidden xl:flex items-center gap-12">
              <Link
                href="/products/microneedling-pen"
                className={`text-base font-poppins font-light ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
              >
                Shop
              </Link>
              <Link
                href="/pages/about-us"
                className={`text-base font-poppins font-light ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover whitespace-nowrap`}
              >
                About Us
              </Link>
              <Link
                href="/pages/faq"
                className={`text-base font-poppins font-light ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className={`text-base font-poppins font-light ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
              >
                Blog
              </Link>
              <Link
                href="/pages/contact"
                className={`text-base font-poppins font-light ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile: Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`xl:hidden flex items-center justify-center w-10 h-10 ${textClass}`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: VAERA Logo */}
            <Link
              href="/"
              className={`absolute left-1/2 -translate-x-1/2 font-italiana text-5xl tracking-wide ${textLightClass} hover:${textClass} transition-colors duration-500`}
            >
              VAERA
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-8">
              <button
                className={`hidden xl:block ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                className={`hidden xl:block ${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                className={`${textLightClass} hover:${textClass} transition-all duration-300 magnetic-hover`}
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 xl:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] transform transition-transform duration-300 ease-out xl:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-vaera-navy/10">
            <button
              className="text-vaera-navy/70 hover:text-vaera-navy transition-colors"
              aria-label="Account"
            >
              <User className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-vaera-navy/70 hover:text-vaera-navy transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-6 border-b border-vaera-navy/10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 pr-10 bg-vaera-gray rounded-xl text-vaera-navy placeholder:text-vaera-navy/40 font-poppins font-light text-sm focus:outline-none focus:ring-2 focus:ring-vaera-navy/20 transition-all"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-vaera-navy/70 hover:text-vaera-navy transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
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
              href="/pages/contact"
              onClick={closeMobileMenu}
              className="text-lg font-poppins font-light text-vaera-navy/70 hover:text-vaera-navy hover:bg-vaera-gray py-3 px-4 rounded-xl transition-all duration-300"
            >
              Contact
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
          </div>
        </div>
      </div>
    </>
  )
}
