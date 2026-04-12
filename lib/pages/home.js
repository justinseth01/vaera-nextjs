/**
 * Homepage Section Config
 *
 * Defines which sections appear on the homepage and in what order.
 * Toggle sections by changing `active: true/false`.
 */

export const HOME_SECTIONS = [
  { id: 'hero', active: false }, // Disabled - using hero-vertical-split instead
  { id: 'hero-vertical-split', active: true }, // New vertical split hero for comparison
  { id: 'before-after', active: true },
  { id: 'treats-concerns', active: true },
  { id: 'motor-comparison', active: true },
  { id: 'testimonials', active: false }, // Disabled - can be re-enabled later
  { id: 'treatment-comparison', active: true },
  { id: 'waitlist', active: false }, // Disabled - replaced with hero-cta
  { id: 'hero-cta', active: true }, // Full-bleed cinematic email capture
  { id: 'skin-sense', active: true },
  { id: 'features', active: false },
  { id: 'protocol', active: true },
  { id: 'why-us', active: false }, // Disabled - can be re-enabled later
  // { id: 'philosophy', active: false },
]
