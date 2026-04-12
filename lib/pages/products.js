/**
 * Products Page Section Config
 *
 * Defines which sections appear on the products page and in what order.
 * Toggle sections by changing `active: true/false`.
 *
 * Note: 'product-gallery' and 'product-info' are rendered together
 * in a special split layout at the top of the page.
 */

export const PRODUCTS_SECTIONS = [
  // These two render in a combined hero layout
  { id: 'product-gallery', active: true, layout: 'product-hero' },
  { id: 'product-info', active: true, layout: 'product-hero' },

  // Standard stacked sections
  { id: 'benefits', active: false },
  { id: 'why-better', active: false },

  // Available sections from homepage (uncomment to add)
  // { id: 'testimonials', active: false },
  // { id: 'motor-comparison', active: false },
  // { id: 'treatment-comparison', active: false },
  // { id: 'waitlist', active: false },
  // { id: 'protocol', active: false },
]
