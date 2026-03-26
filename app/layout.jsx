import { Italiana, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'
import NoiseOverlay from '@/components/layout/NoiseOverlay'

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Vaera | Professional Microneedling, At Home',
  description: 'The world\'s greatest at-home microneedling device. Science-backed technology, professional-grade results.',
  openGraph: {
    title: 'Vaera | Professional Microneedling, At Home',
    description: 'The world\'s greatest at-home microneedling device. Science-backed technology, professional-grade results.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Vaera',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaera | Professional Microneedling, At Home',
    description: 'The world\'s greatest at-home microneedling device. Science-backed technology, professional-grade results.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${italiana.variable} ${poppins.variable} ${robotoMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body>
        <NoiseOverlay />
        {children}
      </body>
    </html>
  )
}
