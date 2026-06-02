import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/sections/footer'
import { WhatsAppButton } from '@/components/conversion-widgets'
import { CoursesContent } from './courses-content'

export const metadata: Metadata = {
  title: 'Courses | CATALYST Academy - NEET, JEE, KEAM Preparation',
  description: 'Explore our comprehensive Physics & Chemistry courses for NEET, JEE Advanced, and KEAM preparation. Expert faculty, proven results, flexible learning.',
}

export default function CoursesPage() {
  return (
    <main className="relative">
      <Navigation />
      <CoursesContent />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
