import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/sections/footer'
import { WhatsAppButton } from '@/components/conversion-widgets'
import { AboutContent } from './about-content'

export const metadata: Metadata = {
  title: 'About CATALYST | Our Story & Philosophy',
  description: 'Discover the story behind CATALYST Academy - 18+ years of academic excellence in Physics & Chemistry coaching, Kollam. Meet our founders and learn our teaching philosophy.',
}

export default function AboutPage() {
  return (
    <main className="relative">
      <Navigation />
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
