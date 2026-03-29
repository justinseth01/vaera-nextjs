import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Your Privacy Choices - Vaera',
  description: 'Manage your data sharing preferences with Vaera.',
}

export default function DataSharingOptOutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-italiana text-4xl md:text-5xl text-vaera-navy mb-8">
            Your Privacy Choices
          </h1>

          <div className="prose prose-lg max-w-none font-poppins text-vaera-navy/80">
            <p>
              At Vaera, we respect your privacy and are committed to protecting your personal information.
            </p>

            <h2 className="font-italiana text-2xl text-vaera-navy mt-8 mb-4">
              Data Collection
            </h2>
            <p>
              We collect only the information necessary to provide you with the best possible experience
              and to fulfill your orders.
            </p>

            <h2 className="font-italiana text-2xl text-vaera-navy mt-8 mb-4">
              Opt-Out Options
            </h2>
            <p>
              You can manage your data sharing preferences at any time by contacting us at{' '}
              <a href="mailto:privacy@vaeraskincare.com" className="text-vaera-navy underline">
                privacy@vaeraskincare.com
              </a>
            </p>

            <h2 className="font-italiana text-2xl text-vaera-navy mt-8 mb-4">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Opt out of data sharing with third parties</li>
            </ul>

            <p className="mt-8 text-sm text-vaera-navy/60">
              For California residents: We comply with the California Consumer Privacy Act (CCPA).
              For more information, please review our full Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
