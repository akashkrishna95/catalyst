import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Plus_Jakarta_Sans, Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800']
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-accent',
  style: ['normal', 'italic']
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'CATALYST Academy | Premier Physics & Chemistry Coaching in Kollam',
  description: '18+ years of excellence in Physics & Chemistry coaching. Join Kerala\'s top-ranked coaching institute with 42 AIR NEET, 6000+ alumni, and proven results.',
  keywords: ['NEET coaching Kollam', 'JEE preparation Kerala', 'Physics coaching', 'Chemistry tuition', 'KEAM preparation', 'best coaching center Kollam'],
  generator: 'CATALYST Academy',
  authors: [{ name: 'CATALYST Academy' }],
  openGraph: {
    title: 'CATALYST Academy | Premier Physics & Chemistry Coaching',
    description: '18+ years of excellence. Join the Top 1% of Kerala\'s academic achievers.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CATALYST Academy',
    description: 'Premier Physics & Chemistry Coaching in Kollam',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#255e5b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className={`${geist.variable} ${geistMono.variable} ${plusJakarta.variable} ${playfair.variable} ${inter.variable} bg-[#fcfdfd]`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
