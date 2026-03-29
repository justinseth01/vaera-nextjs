'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CATEGORIES = [
  { name: 'Science & Technology', slug: 'science-technology' },
  { name: 'Guides', slug: 'guides' },
  { name: 'Results & Recovery', slug: 'results-recovery' },
  { name: 'Skin Concerns', slug: 'skin-concerns' },
  { name: 'Vaera', slug: 'vaera' },
]

export default function CategoryFilter({ currentCategory }) {
  const pathname = usePathname()
  const isAll = pathname === '/blog' || !currentCategory

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full font-poppins text-sm whitespace-nowrap transition-all duration-300 ${
          isAll
            ? 'bg-vaera-navy text-white'
            : 'bg-transparent border border-vaera-navy/20 text-vaera-navy hover:border-vaera-navy/40'
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog/category/${cat.slug}`}
          className={`px-4 py-2 rounded-full font-poppins text-sm whitespace-nowrap transition-all duration-300 ${
            currentCategory === cat.slug
              ? 'bg-vaera-navy text-white'
              : 'bg-transparent border border-vaera-navy/20 text-vaera-navy hover:border-vaera-navy/40'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}
