import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Product data - will be replaced with Shopify API data
const PRODUCTS = [
  {
    id: 'microneedling-pen',
    name: 'Vaera Microneedling Pen',
    price: '$249',
    description: 'Professional-grade precision. At-home convenience.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80',
    href: '/products/microneedling-pen',
  },
]

export const metadata = {
  title: 'All Products - Vaera',
  description: 'Shop professional-grade microneedling devices engineered for safe at-home use.',
}

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-italiana text-4xl md:text-5xl text-vaera-navy mb-4">
              All Products
            </h1>
            <p className="font-poppins text-vaera-navy/60 max-w-xl">
              Professional-grade skincare tools engineered for precision and safety.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-vaera-gray mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="font-poppins font-medium text-lg text-vaera-navy group-hover:text-vaera-light-navy transition-colors">
                  {product.name}
                </h2>
                <p className="font-poppins text-sm text-vaera-navy/60 mb-2">
                  {product.description}
                </p>
                <p className="font-mono text-vaera-navy">
                  {product.price}
                </p>
              </Link>
            ))}
          </div>

          {/* Empty state for when more products come */}
          {PRODUCTS.length === 1 && (
            <div className="mt-16 text-center py-12 border border-dashed border-vaera-navy/20 rounded-2xl">
              <p className="font-poppins text-vaera-navy/40">
                More products coming soon
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
