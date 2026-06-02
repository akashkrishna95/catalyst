'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const reviewsData = [
  {
    id: 1,
    name: 'Rahul V.',
    achievement: 'AIR 42 — JEE Advanced 2024',
    review: 'The mock-tests here were harder than the actual JEE Advanced. It made exam day feel like just another practice session.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya S.',
    achievement: 'AIR 89 — NEET 2024',
    review: 'Dr. Menon\'s Chemistry classes completely changed how I approach Organic reactions. The conceptual clarity I gained here is unmatched.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Arun K.',
    achievement: 'State Rank 3 — KEAM 2024',
    review: 'CATALYST doesn\'t just teach you formulas. They teach you how to think. That\'s what makes all the difference.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha M.',
    achievement: 'AIR 156 — JEE Advanced 2024',
    review: 'The 1-on-1 doubt sessions were a game changer. No question was too small, and no concept was left unexplained.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Vishnu R.',
    achievement: 'AIR 67 — NEET 2024',
    review: 'From Class 11 basics to cracking NEET, the journey at CATALYST was transformative. Best decision of my academic life.',
    rating: 5,
  },
]

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsData.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isInView])

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? reviewsData.length - 1 : prev - 1
      }
      return (prev + 1) % reviewsData.length
    })
  }

  const currentReview = reviewsData[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-[#0d2626] overflow-hidden"
    >
      {/* DotField Background removed - using ambient glow only */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {/* Removed DotField component */}
      </div>

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[#255e5b]/30 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
            Voices of Success
          </h2>
        </motion.div>

        {/* Main Review Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easePremuim, delay: 0.2 }}
          className="relative"
        >
          {/* Card */}
          <div className="relative bg-[#f3faf9] backdrop-blur-3xl border border-[#38948c]/20 rounded-2xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(13,38,38,0.1)]">
            {/* Decorative Quote */}
            <div className="absolute top-4 lg:top-6 left-4 lg:left-8 text-5xl lg:text-7xl font-serif text-[#38948c]/20 pointer-events-none select-none">
              &ldquo;
            </div>

            {/* Review Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: easePremuim }}
                className="relative z-10"
              >
                {/* Review Text - Improved readability */}
                <p className="font-sans text-lg sm:text-xl lg:text-2xl text-[#0d2626] leading-relaxed text-center mb-6 lg:mb-8 px-2 sm:px-4 lg:px-12 pt-6 lg:pt-8">
                  &ldquo;{currentReview.review}&rdquo;
                </p>

                {/* Credential Dock */}
                <div className="flex flex-col items-center gap-4 pt-6 border-t border-[#255e5b]/20">
                  {/* Portrait */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center border-2 border-[#ade2d9] shadow-[0_0_15px_rgba(173,226,217,0.3)]">
                    <span className="text-xl lg:text-2xl font-bold text-white">
                      {currentReview.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Name & Achievement */}
                  <div className="text-center">
                    <h4 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-semibold text-[#0d2626] mb-1">
                      {currentReview.name}
                    </h4>
                    <p className="text-[#255e5b] font-medium text-sm lg:text-base">
                      {currentReview.achievement}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-3">
                    {/* Google Rating */}
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#38948c]/10 border border-[#38948c]/30 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-[#255e5b] text-sm font-medium">4.9</span>
                    </div>
                    {/* Verified */}
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#255e5b]/10 border border-[#255e5b]/30 rounded-full">
                      <CheckCircle className="w-4 h-4 text-[#38948c]" />
                      <span className="text-[#38948c] text-xs font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dock */}
          <div className="flex items-center justify-center gap-3 mt-6 lg:mt-8">
            <button
              onClick={() => handleNavigation('prev')}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#ade2d9]/10 hover:bg-[#38948c]/20 border border-[#38948c]/30 rounded-full text-[#255e5b] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-[#ade2d9]/10 backdrop-blur-md rounded-full border border-[#38948c]/20">
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(i)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? 'w-5 lg:w-6 bg-[#255e5b] shadow-[0_0_8px_rgba(37,94,91,0.4)]'
                      : 'bg-[#38948c]/40 hover:bg-[#38948c]/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleNavigation('next')}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#ade2d9]/10 hover:bg-[#38948c]/20 border border-[#38948c]/30 rounded-full text-[#255e5b] transition-colors"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
