import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
// import Features from '@/components/home/Features'
import TreatmentComparison from '@/components/home/TreatmentComparison'
import MotorComparison from '@/components/home/MotorComparison'
import TreatsConcerns from '@/components/home/TreatsConcerns'
import SkinSense from '@/components/home/SkinSense'
import Protocol from '@/components/home/Protocol'
import Waitlist from '@/components/home/Waitlist'
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider'
import Testimonials from '@/components/home/Testimonials'
import WhyUs from '@/components/home/WhyUs'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BeforeAfterSlider />
        <Testimonials />
        <MotorComparison />
        <TreatsConcerns />
        <TreatmentComparison />
        <Waitlist />
        <SkinSense />
        {/* <Features /> */}
        <Protocol />
        <WhyUs />
      </main>
      <Footer />
    </>
  )
}
