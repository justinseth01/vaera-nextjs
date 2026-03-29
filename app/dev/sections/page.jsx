'use client'

import { useState, useRef } from 'react'
import { SECTIONS, SECTION_COMPONENTS } from '@/lib/sections'
// DEV ONLY barrel import - auto-discovers all page configs
import { PAGE_CONFIGS, PAGE_IDS, getSectionPageStatus } from '@/lib/pages'
import { Check, Copy, Eye, EyeOff, Clock } from 'lucide-react'

export default function DevSectionsPage() {
  // Block in production
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-gray-500">Page not found</p>
        </div>
      </div>
    )
  }

  const [visibleSections, setVisibleSections] = useState(() => {
    const initial = {}
    SECTIONS.forEach(s => {
      // Default to visible if active on any page
      const pageStatus = getSectionPageStatus(s.id)
      initial[s.id] = Object.values(pageStatus).some(v => v)
    })
    return initial
  })

  const [filter, setFilter] = useState('all')
  const [pageFilter, setPageFilter] = useState('all')
  const [copied, setCopied] = useState(null)
  const sectionRefs = useRef({})

  const toggleSection = (id) => {
    setVisibleSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyImport = (section) => {
    const importLine = `import ${section.component} from '@/components/sections/${section.component}'`
    navigator.clipboard.writeText(importLine)
    setCopied(section.id)
    setTimeout(() => setCopied(null), 2000)
  }

  // Filter sections
  const filteredSections = SECTIONS.filter(s => {
    // Page filter
    if (pageFilter !== 'all' && !s.usableOn.includes(pageFilter)) {
      return false
    }

    // Active/inactive filter based on any page config
    if (filter === 'active' || filter === 'inactive') {
      const pageStatus = getSectionPageStatus(s.id)
      const isActiveAnywhere = Object.values(pageStatus).some(v => v)
      if (filter === 'active' && !isActiveAnywhere) return false
      if (filter === 'inactive' && isActiveAnywhere) return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-vaera-gray">
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 py-2 px-4 text-center text-sm font-medium">
        Dev Mode — Section Registry — Not visible in production
      </div>

      <div className="flex pt-10">
        {/* Sidebar */}
        <aside className="fixed left-0 top-10 bottom-0 w-80 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h1 className="font-poppins font-semibold text-lg mb-4 text-vaera-navy">
            Section Registry
          </h1>

          {/* Page Filter */}
          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">Filter by page</label>
            <div className="flex gap-2 flex-wrap">
              {['all', ...PAGE_IDS].map(p => (
                <button
                  key={p}
                  onClick={() => setPageFilter(p)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    pageFilter === p
                      ? 'bg-vaera-ice text-vaera-navy'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">Filter by status</label>
            <div className="flex gap-2">
              {['all', 'active', 'inactive'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    filter === f
                      ? 'bg-vaera-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Section List */}
          <div className="space-y-2">
            {filteredSections.map(section => {
              const pageStatus = getSectionPageStatus(section.id)
              const isActiveAnywhere = Object.values(pageStatus).some(v => v)

              return (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer hover:shadow-sm ${
                    visibleSections[section.id]
                      ? 'bg-vaera-ice/20 border-vaera-ice'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-vaera-navy text-left">
                      {section.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSection(section.id) }}
                      className={`p-1 rounded-md transition-colors ${
                        visibleSections[section.id]
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                      }`}
                      title={visibleSections[section.id] ? 'Hide section' : 'Show section'}
                    >
                      {visibleSections[section.id] ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mb-2">{section.description}</p>

                  {/* Usable On badges */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {section.usableOn.map(page => {
                      const isActive = pageStatus[page]
                      return (
                        <span
                          key={page}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-green-100 text-green-700'
                              : isActive === false
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {page}{isActive ? ' ✓' : isActive === false ? ' ○' : ''}
                        </span>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); copyImport(section) }}
                      className="text-gray-400 hover:text-vaera-navy transition-colors"
                      title="Copy import"
                    >
                      {copied === section.id ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>

                  {/* Ready When note */}
                  {section.readyWhen && (
                    <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-gray-100">
                      <Clock size={10} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-amber-600 italic">
                        {section.readyWhen}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {SECTIONS.length} total sections
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-80 flex-1">
          {SECTIONS.map(section => {
            const Component = SECTION_COMPONENTS[section.component]
            const isVisible = visibleSections[section.id]
            const pageStatus = getSectionPageStatus(section.id)

            return (
              <div
                key={section.id}
                ref={el => sectionRefs.current[section.id] = el}
                className="relative"
              >
                {/* Section Header */}
                <div className="sticky top-10 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-400">
                      #{section.id}
                    </span>
                    <span className="font-poppins font-medium text-vaera-navy">
                      {section.name}
                    </span>
                    {/* Page badges */}
                    <div className="flex gap-1">
                      {section.usableOn.map(page => {
                        const isActive = pageStatus[page]
                        return (
                          <span
                            key={page}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-green-100 text-green-700'
                                : isActive === false
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {page}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      isVisible
                        ? 'bg-vaera-navy text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>

                {/* Section Content */}
                <div
                  className={`relative transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-30 pointer-events-none'
                  }`}
                >
                  {!isVisible && (
                    <div className="absolute inset-0 z-30 bg-gray-900/10" />
                  )}
                  <Component />
                </div>
              </div>
            )
          })}
        </main>
      </div>
    </div>
  )
}
