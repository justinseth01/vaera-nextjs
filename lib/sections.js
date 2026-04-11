/**
 * Global Section Registry
 *
 * Central registry of ALL reusable page sections.
 * Page-specific configs (lib/pages/*.js) reference these by ID.
 */

// Section component imports
import Hero from '@/components/sections/Hero'
import HeroSplit from '@/components/sections/HeroSplit'
import HeroCTA from '@/components/sections/HeroCTA'
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider'
import Testimonials from '@/components/sections/Testimonials'
import MotorComparison from '@/components/sections/MotorComparison'
import TreatsConcerns from '@/components/sections/TreatsConcerns'
import TreatmentComparison from '@/components/sections/TreatmentComparison'
import Waitlist from '@/components/sections/Waitlist'
import SkinSense from '@/components/sections/SkinSense'
import Features from '@/components/sections/Features'
import Protocol from '@/components/sections/Protocol'
import WhyUs from '@/components/sections/WhyUs'
import Philosophy from '@/components/sections/Philosophy'
import ProductGallery from '@/components/sections/ProductGallery'
import ProductInfo from '@/components/sections/ProductInfo'
import Benefits from '@/components/sections/Benefits'
import WhyBetter from '@/components/sections/WhyBetter'

/**
 * Component lookup map
 */
export const SECTION_COMPONENTS = {
  Hero,
  HeroSplit,
  HeroCTA,
  BeforeAfterSlider,
  Testimonials,
  MotorComparison,
  TreatsConcerns,
  TreatmentComparison,
  Waitlist,
  SkinSense,
  Features,
  Protocol,
  WhyUs,
  Philosophy,
  ProductGallery,
  ProductInfo,
  Benefits,
  WhyBetter,
}

/**
 * Global section registry
 *
 * Fields:
 * - id: Unique identifier
 * - name: Display name
 * - component: Key in SECTION_COMPONENTS
 * - usableOn: Array of page IDs where this section can be used
 * - description: Brief description for dev viewer
 * - readyWhen: (optional) What needs to happen before this can go live
 */
export const SECTIONS = [
  // Homepage sections
  {
    id: 'hero',
    name: 'Hero Banner',
    component: 'Hero',
    usableOn: ['home'],
    description: 'Main hero with product pitch, stats, and CTA',
  },
  {
    id: 'hero-split',
    name: 'Hero Split (Asymmetric)',
    component: 'HeroSplit',
    usableOn: ['home'],
    description: 'Asymmetric split hero - 55/45 dark/light with measurement line',
  },
  {
    id: 'hero-cta',
    name: 'Hero CTA (Full-Bleed)',
    component: 'HeroCTA',
    usableOn: ['home'],
    description: 'Full-bleed cinematic email capture with background image',
  },
  {
    id: 'before-after',
    name: 'Before/After Slider',
    component: 'BeforeAfterSlider',
    usableOn: ['home', 'products'],
    description: 'Interactive before/after comparison slider',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    component: 'Testimonials',
    usableOn: ['home', 'products'],
    description: 'Customer testimonial carousel with photos',
    readyWhen: 'Real before/after photos from beta study complete',
  },
  {
    id: 'motor-comparison',
    name: 'Motor Comparison',
    component: 'MotorComparison',
    usableOn: ['home', 'products'],
    description: 'Vaera vs generic motor side-by-side',
  },
  {
    id: 'treats-concerns',
    name: 'Treats Concerns',
    component: 'TreatsConcerns',
    usableOn: ['home'],
    description: 'Interactive skin concern selector with before/after',
  },
  {
    id: 'treatment-comparison',
    name: 'Treatment Comparison',
    component: 'TreatmentComparison',
    usableOn: ['home', 'products'],
    description: 'Vaera vs Clinic vs Derma Roller pricing comparison',
  },
  {
    id: 'waitlist',
    name: 'Waitlist',
    component: 'Waitlist',
    usableOn: ['home', 'products', 'about'],
    description: 'Email capture form with launch benefits',
  },
  {
    id: 'skin-sense',
    name: 'SkinSense',
    component: 'SkinSense',
    usableOn: ['home', 'products'],
    description: 'Interactive motor power meter for skin types',
  },
  {
    id: 'features',
    name: 'Features',
    component: 'Features',
    usableOn: ['home'],
    description: '3 feature cards with interactive UI components',
    readyWhen: 'Feature card designs finalized',
  },
  {
    id: 'protocol',
    name: 'Protocol',
    component: 'Protocol',
    usableOn: ['home', 'products'],
    description: '3-step how it works guide',
  },
  {
    id: 'why-us',
    name: 'Why Us',
    component: 'WhyUs',
    usableOn: ['home', 'products'],
    description: '8-row comparison table (Vaera vs Clinic vs Others)',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    component: 'Philosophy',
    usableOn: ['home', 'about'],
    description: 'Brand philosophy statement with background image',
    readyWhen: 'Brand photography complete',
  },

  // Products page sections
  {
    id: 'product-gallery',
    name: 'Product Gallery',
    component: 'ProductGallery',
    usableOn: ['products'],
    description: 'Product image gallery with thumbnails',
  },
  {
    id: 'product-info',
    name: 'Product Info',
    component: 'ProductInfo',
    usableOn: ['products'],
    description: 'Product details, pricing, and add to cart',
  },
  {
    id: 'benefits',
    name: 'Benefits',
    component: 'Benefits',
    usableOn: ['products', 'home'],
    description: 'Product benefits grid',
  },
  {
    id: 'why-better',
    name: 'Why Better',
    component: 'WhyBetter',
    usableOn: ['products'],
    description: 'Why Vaera is better than alternatives',
  },
]

/**
 * Get a section by ID
 */
export function getSection(id) {
  return SECTIONS.find(s => s.id === id)
}

/**
 * Get all sections usable on a specific page
 */
export function getSectionsForPage(pageId) {
  return SECTIONS.filter(s => s.usableOn.includes(pageId))
}
