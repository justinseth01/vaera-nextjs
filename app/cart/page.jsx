'use client'

import { useEffect } from 'react'

/**
 * Cart Page - Redirects to Shopify Checkout
 *
 * In a headless setup, the cart drawer handles cart management.
 * This page exists for users who navigate directly to /cart.
 * It redirects to the Shopify checkout using the stored cart ID.
 */
export default function CartPage() {
  useEffect(() => {
    // Get cart ID from localStorage
    const cartId = localStorage.getItem('vaera-cart-id')

    if (cartId) {
      // TODO: Fetch checkout URL from Shopify Storefront API using cart ID
      // For now, redirect to the main product page
      // Replace this with actual Shopify checkout redirect when API is connected
      window.location.href = '/products/microneedling-pen'
    } else {
      // No cart exists, redirect to products
      window.location.href = '/collections/all'
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-vaera-navy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-poppins text-vaera-navy/60">
          Redirecting to checkout...
        </p>
      </div>
    </div>
  )
}
