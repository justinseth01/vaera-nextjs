import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SECTIONS, SECTION_COMPONENTS } from '@/lib/sections'
import { HOME_SECTIONS } from '@/lib/pages/home'

export default function HomePage() {
  // Get active sections in order, merged with global registry data
  const activeSections = HOME_SECTIONS
    .filter(s => s.active)
    .map(pageSection => {
      const globalSection = SECTIONS.find(g => g.id === pageSection.id)
      return { ...globalSection, ...pageSection }
    })
    .filter(Boolean)

  return (
    <>
      <Navbar isHomepage={true} />
      <main>
        {activeSections.map(section => {
          const Component = SECTION_COMPONENTS[section.component]
          return <Component key={section.id} />
        })}
      </main>
      <Footer />
    </>
  )
}
