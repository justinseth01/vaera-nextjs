/**
 * DEV ONLY — never import this in production pages.
 *
 * This barrel file aggregates all page configs for the dev section viewer.
 * Production pages must import their specific config directly:
 *   import { HOME_SECTIONS } from '@/lib/pages/home'
 *
 * To add a new page:
 * 1. Create lib/pages/your-page.js with YOUR_PAGE_SECTIONS export
 * 2. Add the import and entry to PAGE_CONFIGS below
 */

import { HOME_SECTIONS } from './home'
import { PRODUCTS_SECTIONS } from './products'

/**
 * All page configs keyed by page ID.
 * Add new pages here as you create them.
 */
export const PAGE_CONFIGS = {
  home: HOME_SECTIONS,
  products: PRODUCTS_SECTIONS,
}

/**
 * Get all page IDs
 */
export const PAGE_IDS = Object.keys(PAGE_CONFIGS)

/**
 * Get config for a specific page
 */
export function getPageConfig(pageId) {
  return PAGE_CONFIGS[pageId]
}

/**
 * Get section status across all pages
 */
export function getSectionPageStatus(sectionId) {
  const status = {}
  for (const [pageId, sections] of Object.entries(PAGE_CONFIGS)) {
    const pageSection = sections.find(s => s.id === sectionId)
    if (pageSection) {
      status[pageId] = pageSection.active
    }
  }
  return status
}
