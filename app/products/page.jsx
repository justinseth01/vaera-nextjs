'use client'

import { useEffect } from 'react'
import ShopNavbar from '@/components/layout/ShopNavbar'
import ProductGallery from '@/components/shop/ProductGallery'
import ProductInfo from '@/components/shop/ProductInfo'
import Benefits from '@/components/shop/Benefits'
import WhyBetter from '@/components/shop/WhyBetter'
import ShopFooter from '@/components/layout/ShopFooter'

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <ShopNavbar />

      <main>
        {/* Hero Product Section with Split Scroll */}
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

        <Benefits />
        <WhyBetter />
      </main>

      <ShopFooter />
    </>
  )
}
