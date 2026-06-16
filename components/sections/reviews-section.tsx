'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react'

// Premium buttery-smooth easing curve
const easePremium = [0.16, 1, 0.3, 1]

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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')

  // Auto-play every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return
    const interval = setInterval(() => {
      setSlideDirection('right')
      setActiveIndex((prev) => (prev + 1) % reviewsData.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isInView])

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false)
    setSlideDirection(direction === 'prev' ? 'left' : 'right')
    setActiveIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? reviewsData.length - 1 : prev - 1
      }
      return (prev + 1) % reviewsData.length
    })
  }

  const currentReview = reviewsData[activeIndex]

  // Highly optimized hardware-accelerated slide transition
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? 30 : -30,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? -30 : 30,
      scale: 0.98,
    }),
  }

  return (
    <section
      ref={sectionRef}
      // FIX: -mt-[1px] removes mobile line gap, pt adjusted for seamless flow
      className="relative pt-8 sm:pt-12 lg:pt-20 pb-16 lg:pb-24 bg-[#0d2626] overflow-hidden -mt-[1px] antialiased contain-paint"
    >
      {/* Ambient Glow - Heavily optimized for mobile */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] blur-[80px] lg:w-[600px] lg:h-[600px] lg:blur-[120px] bg-[#50b1a8]/15 rounded-full pointer-events-none z-0 transform-gpu" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremium }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
            Voices of Success
          </h2>
        </motion.div>

        {/* Main Review Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easePremium, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Card Wrapper - Min-height locks aspect ratio to prevent layout jumping */}
          <div className="relative bg-[#f3faf9] backdrop-blur-xl lg:backdrop-blur-3xl border border-[#38948c]/20 rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 shadow-[0_20px_50px_rgba(13,38,38,0.15)] min-h-[420px] sm:min-h-[380px] lg:min-h-[400px] flex flex-col justify-between overflow-hidden">
            
            {/* Decorative Quote */}
            <div className="absolute top-4 lg:top-8 left-4 lg:left-8 text-6xl lg:text-8xl font-serif text-[#38948c]/15 pointer-events-none select-none leading-none">
              &ldquo;
            </div>

            {/* Review Content Wrapper */}
            <div className="relative flex-1 flex flex-col justify-center w-full z-10 mt-6 sm:mt-4 lg:mt-0">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={activeIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easePremium }}
                  className="flex flex-col h-full w-full justify-between transform-gpu will-change-transform"
                >
                  {/* Review Text */}
                  <div className="flex-1 flex items-center justify-center">
                    <p className="font-sans text-lg sm:text-xl lg:text-2xl text-[#0d2626] leading-relaxed text-center px-2 sm:px-6 lg:px-12">
                      &ldquo;{currentReview.review}&rdquo;
                    </p>
                  </div>

                  {/* Credential Dock */}
                  <div className="flex flex-col items-center gap-4 pt-6 mt-6 border-t border-[#255e5b]/20 shrink-0">
                    {/* Portrait */}
                    <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center border-2 border-[#ade2d9] shadow-[0_0_15px_rgba(173,226,217,0.3)]">
                      <span className="text-lg lg:text-2xl font-bold text-white font-sans">
                        {currentReview.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>

                    {/* Name & Achievement */}
                    <div className="text-center">
                      <h4 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold text-[#0d2626] mb-0.5">
                        {currentReview.name}
                      </h4>
                      <p className="text-[#255e5b] font-medium text-xs lg:text-base tracking-wide">
                        {currentReview.achievement}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#38948c]/10 border border-[#38948c]/30 rounded-full">
                        <Star className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[#255e5b] text-[11px] lg:text-sm font-semibold">4.9</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#255e5b]/10 border border-[#255e5b]/30 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#38948c]" />
                        <span className="text-[#38948c] text-[11px] lg:text-sm font-bold tracking-wide">Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dock */}
          <div className="flex items-center justify-center gap-3 lg:gap-4 mt-8 lg:mt-10">
            <button
              onClick={() => handleNavigation('prev')}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-[#50b1a8] transition-all hover:scale-105 active:scale-95 transform-gpu"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>

            {/* Pagination Dots - Elongated #50b1a8 active state */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 lg:py-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full transform-gpu">
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setSlideDirection(i > activeIndex ? 'right' : 'left')
                    setActiveIndex(i)
                  }}
                  className={`h-2 rounded-full transition-all duration-400 ease-out ${
                    i === activeIndex
                      ? 'w-8 bg-[#50b1a8] shadow-[0_0_10px_rgba(80,177,168,0.8)]'
                      : 'w-2 bg-[#50b1a8]/30 hover:bg-[#50b1a8]/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleNavigation('next')}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-[#50b1a8] transition-all hover:scale-105 active:scale-95 transform-gpu"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}