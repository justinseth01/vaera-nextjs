'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop',
      alt: 'Vaera Microneedling Device - Front View'
    },
    {
      src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
      alt: 'Vaera Microneedling Device - Side View'
    },
    {
      src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2035&auto=format&fit=crop',
      alt: 'Vaera Microneedling Device - Detail'
    },
    {
      src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070&auto=format&fit=crop',
      alt: 'Vaera Microneedling Device - In Use'
    },
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-vaera-gray rounded-4xl overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={images[currentImage].src}
          alt={images[currentImage].alt}
          fill
          className={`object-cover transition-transform duration-500 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
        />

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group"
        >
          <ChevronLeft className="w-5 h-5 text-vaera-navy group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group"
        >
          <ChevronRight className="w-5 h-5 text-vaera-navy group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-mono text-sm text-vaera-navy">
            {currentImage + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
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
    </div>
  )
}
