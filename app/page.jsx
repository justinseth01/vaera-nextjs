import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Philosophy from '@/components/home/Philosophy'
import Protocol from '@/components/home/Protocol'
import Waitlist from '@/components/home/Waitlist'
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider'
import WhyUs from '@/components/home/WhyUs'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Waitlist />
        <BeforeAfterSlider />
        <WhyUs />
      </main>
      <Footer />
    </>
  )
}
