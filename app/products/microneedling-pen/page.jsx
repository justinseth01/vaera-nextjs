'use client'

import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import ShopFooter from '@/components/layout/ShopFooter'
import { SECTIONS, SECTION_COMPONENTS } from '@/lib/sections'
import { PRODUCTS_SECTIONS } from '@/lib/pages/products'

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Separate product hero sections from standard sections
  const heroSections = PRODUCTS_SECTIONS
    .filter(s => s.active && s.layout === 'product-hero')
    .map(pageSection => {
      const globalSection = SECTIONS.find(g => g.id === pageSection.id)
      return { ...globalSection, ...pageSection }
    })
    .filter(Boolean)

  const standardSections = PRODUCTS_SECTIONS
    .filter(s => s.active && s.layout !== 'product-hero')
    .map(pageSection => {
      const globalSection = SECTIONS.find(g => g.id === pageSection.id)
      return { ...globalSection, ...pageSection }
    })
    .filter(Boolean)

  // Get components for product hero
  const ProductGallery = SECTION_COMPONENTS['ProductGallery']
  const ProductInfo = SECTION_COMPONENTS['ProductInfo']

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Product Section with Split Scroll */}
        {heroSections.length > 0 && (
          <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Sticky Image Gallery */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <ProductGallery />
                </div>
                {/* Scrollable Product Info */}
                <div>
                  <ProductInfo />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Standard stacked sections */}
        {standardSections.map(section => {
          const Component = SECTION_COMPONENTS[section.component]
          return <Component key={section.id} />
        })}
      </main>

      <ShopFooter />
    </>
  )
}
