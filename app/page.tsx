'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

import { Navigation } from '@/components/navigation'
import { WhatsAppButton, ExitIntentPopup, StickyEnquiryWidget } from '@/components/conversion-widgets'
import { HeroSection } from '@/components/sections/hero-section'
import { FacultySection } from '@/components/sections/faculty-section'
import { ResultsSection } from '@/components/sections/results-section'
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section'
import { CoursesSection } from '@/components/sections/courses-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { FAQCampusesSection } from '@/components/sections/faq-campuses-section'
import { AdmissionsSection } from '@/components/sections/admissions-section'
import { Footer } from '@/components/sections/footer'

export default function HomePage() {
  const coursesRef = useRef(null)
  const isCoursesInView = useInView(coursesRef, { amount: 0.1 })

  return (
    <main className="relative overflow-x-hidden">
      {/* Global Navigation */}
      <Navigation />

      {/* Section 1: Hero - Light with DotField background */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* Section 2: Faculty V-Formation - Dark */}
      <div id="faculty" className="relative">
        <FacultySection />
      </div>

      {/* Section 3: Results Flip Matrix - Dark */}
      <div id="results">
        <ResultsSection />
      </div>

      {/* Section 4: Why Choose Us Scroll Stack - Light (overlaps dark) */}
      <div id="why-choose-us">
        <WhyChooseUsSection />
      </div>

      {/* Section 5: Digital Academy Courses - Dark */}
      <div ref={coursesRef} id="digital-academy" className="relative">
        <CoursesSection />
      </div>

      {/* Section 6: Reviews / Testimonials - Dark */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      {/* Section 7: FAQ & Campuses - Light */}
      <div id="faq">
        <FAQCampusesSection />
      </div>

      {/* Section 8: Admissions Bento Form - Dark */}
      <div id="contact">
        <AdmissionsSection />
      </div>

      {/* Section 9: Cinematic Footer */}
      <Footer />

      {/* Global Conversion Widgets */}
      <WhatsAppButton />
      <ExitIntentPopup />
      <StickyEnquiryWidget isVisible={isCoursesInView} />
    </main>
  )
}
