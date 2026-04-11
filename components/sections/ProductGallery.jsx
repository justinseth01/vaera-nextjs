'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

export default function ProductGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [hoverZoom, setHoverZoom] = useState({ x: 50, y: 50, isHovering: false })
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const images = [
    {
      src: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/AI2_20-_20Aesthetic_2025-08-31_02_24_37_557137_png.png?v=1756607115',
      alt: 'Vaera Microneedling Pen - Product View',
      priority: true
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Hero_Square.png?v=1754273251',
      alt: 'Vaera Microneedling Pen - Front View',
      priority: false
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Angled1.jpg?v=1754273251',
      alt: 'Vaera Microneedling Pen - Angled View',
      priority: false
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/CloseUp3.jpg?v=1754237424',
      alt: 'Vaera Microneedling Pen - Close Up Detail',
      priority: false
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0710/2313/2772/files/Needles1.jpg?v=1754273251',
      alt: 'Vaera Microneedling Pen - Needle Cartridge',
      priority: false
    },
  ]

  const switchImage = (newIndex) => {
    if (newIndex === currentImage) return
    setCurrentImage(newIndex)
  }

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length)
  }

  // Hover zoom handlers
  const handleMouseMove = (e) => {
    if (isTouchDevice) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setHoverZoom({ x, y, isHovering: true })
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    setHoverZoom({ x: 50, y: 50, isHovering: false })
  }

  // Touch/swipe handlers
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((lightboxIndex + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, lightboxIndex, images.length])

  // Body scroll lock for lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen])

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-vaera-gray rounded-4xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          setLightboxIndex(currentImage)
          setIsLightboxOpen(true)
        }}
        style={{ cursor: hoverZoom.isHovering ? 'zoom-in' : 'default' }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="object-cover"
            style={{
              opacity: currentImage === index ? 1 : 0,
              transform: hoverZoom.isHovering ? 'scale(1.8)' : 'scale(1)',
              transformOrigin: `${hoverZoom.x}% ${hoverZoom.y}%`,
              transition: 'opacity 200ms ease-in-out, transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        ))}

        {/* Expand Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setLightboxIndex(currentImage)
            setIsLightboxOpen(true)
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 z-10"
          aria-label="Expand to fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-vaera-navy" />
        </button>

        {/* Desktop Counter */}
        <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-mono text-sm text-vaera-navy">
            {currentImage + 1} / {images.length}
          </span>
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                switchImage(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentImage === index
                  ? 'bg-white w-6'
                  : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => switchImage(index)}
            className={`relative flex-1 aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
              currentImage === index
                ? 'ring-2 ring-vaera-navy ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-vaera-navy/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 z-10"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Image container */}
          <div
            className="relative w-[85vw] h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Left arrow */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right arrow */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex + 1) % images.length)
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-mono text-sm text-white">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
