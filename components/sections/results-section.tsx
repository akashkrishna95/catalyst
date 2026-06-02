'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const easePremium = [0.16, 1, 0.3, 1]

const resultsData = [
  {
    id: 1,
    name: 'Sneha M.',
    exam: 'JEE Advanced 2024',
    rank: 'AIR 156',
    context: 'From struggling with Physics to cracking IIT Bombay - a transformation story.',
    image: '/results/student-2.jpg',
  },
  {
    id: 2,
    name: 'Vishnu R.',
    exam: 'KEAM 2024',
    rank: 'State Rank 8',
    context: 'Topped Kerala Engineering entrance with highest Chemistry score in the state.',
    image: '/results/student-3.jpg',
  },
  {
    id: 3,
    name: 'Anjali S.',
    exam: 'NEET 2024',
    rank: 'AIR 89',
    context: 'Dreams of becoming a surgeon now one step closer with admission to CMC Vellore.',
    image: '/results/student-4.jpg',
  },
  {
    id: 4,
    name: 'Rahul P.',
    exam: 'JEE Main 2024',
    rank: 'AIR 234',
    context: 'Consistent hard work and CATALYST methodology helped achieve this dream rank.',
    image: '/results/student-5.jpg',
  },
]

const kpiStats = [
  { value: 42, suffix: '', label: 'Highest AIR' },
  { value: 8, suffix: '+', label: 'Awards & Honors' },
  { value: 98, suffix: '%', label: 'Distinction' },
  { value: 75, suffix: 'K+', label: 'Grants Secured' },
]

export function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right')

  // Auto-flip every 5 seconds - right to left
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return
    const interval = setInterval(() => {
      setFlipDirection('right')
      setActiveIndex((prev) => (prev + 1) % resultsData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isInView])

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false)
    setFlipDirection(direction === 'prev' ? 'left' : 'right')
    setActiveIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? resultsData.length - 1 : prev - 1
      }
      return (prev + 1) % resultsData.length
    })
  }

  const currentStudent = resultsData[activeIndex]

  // Animation variants for card flip based on direction
  const cardVariants = {
    enter: (direction: 'left' | 'right') => ({
      opacity: 0,
      rotateY: direction === 'right' ? -90 : 90,
      scale: 0.9,
      x: direction === 'right' ? 100 : -100,
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
    },
    exit: (direction: 'left' | 'right') => ({
      opacity: 0,
      rotateY: direction === 'right' ? 90 : -90,
      scale: 0.9,
      x: direction === 'right' ? -100 : 100,
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0d2626] to-[#204140] overflow-x-hidden"
    >
      {/* Optical Color Bleed from light section above */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#ade2d9]/15 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Command Center */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            {/* Header */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremium }}
              className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Results That Speak for Themselves
            </motion.h2>

            {/* KPI Stats - Inline layout with simple divider rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremium, delay: 0.2 }}
              className="flex gap-6 flex-wrap items-center"
            >
              {kpiStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-garet), system-ui' }}>
                      {isInView && (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          delay={0.5 + i * 0.1}
                        />
                      )}
                      {stat.suffix}
                    </p>
                    <p className="text-xs text-white/40 mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                      {stat.label}
                    </p>
                  </div>
                  {i < kpiStats.length - 1 && (
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Dynamic Glass Text Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremium, delay: 0.3 }}
              className="bg-[#f3faf9] backdrop-blur-2xl border border-[#38948c]/20 p-8 rounded-[2rem] shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-[#255e5b] rounded-full animate-pulse" />
                    <span className="text-[#255e5b] text-sm font-medium uppercase tracking-wider">
                      {currentStudent.exam}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#0d2626] mb-2">
                    {currentStudent.name}
                  </h3>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#255e5b] to-[#38948c] mb-4">
                    {currentStudent.rank}
                  </p>
                  <p className="text-[#224d4b]/70 leading-relaxed">
                    {currentStudent.context}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column - Flip Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: easePremium, delay: 0.2 }}
              className="relative aspect-[4/5] w-full max-w-[420px] mx-auto"
              style={{ perspective: '1000px' }}
            >
              {/* Flip Card */}
              <AnimatePresence mode="wait" custom={flipDirection}>
                <motion.div
                  key={activeIndex}
                  custom={flipDirection}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: easePremium }}
                  className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#255e5b] to-[#38948c] shadow-2xl overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Student Photo Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-5xl font-bold text-white/80">
                          {currentStudent.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-xl">{currentStudent.name}</p>
                      <p className="text-[#ade2d9] text-lg">{currentStudent.rank}</p>
                      <p className="text-white/60 mt-2">{currentStudent.exam}</p>
                    </div>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={() => handleNavigation('prev')}
                  className="w-12 h-12 flex items-center justify-center bg-[#204140] hover:bg-[#255e5b] border border-[#38948c]/30 rounded-full text-[#ade2d9] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {resultsData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setFlipDirection(i > activeIndex ? 'right' : 'left')
                        setActiveIndex(i)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeIndex
                          ? 'w-8 bg-[#7dcbc1] shadow-[0_0_10px_#7dcbc1]'
                          : 'bg-[#38948c]/50 hover:bg-[#38948c]'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleNavigation('next')}
                  className="w-12 h-12 flex items-center justify-center bg-[#204140] hover:bg-[#255e5b] border border-[#38948c]/30 rounded-full text-[#ade2d9] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6 md:space-y-8">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremium }}
            className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight text-center"
          >
            Results That Speak for Themselves
          </motion.h2>

          {/* Mobile KPI Stats - Tight 2x2 grid, smaller font sizes, left-aligned layout */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-1 max-w-[280px] mx-auto text-left pl-1">
            {kpiStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-start justify-start">
                <p 
                  className="text-xl font-bold text-white leading-tight" 
                  style={{ fontFamily: 'var(--font-garet), system-ui' }}
                >
                  {isInView && (
                    <CountUp end={stat.value} duration={2} delay={0.5 + i * 0.1} />
                  )}
                  {stat.suffix}
                </p>
                <p 
                  className="text-[10px] text-white/40 mt-0.5 font-medium tracking-wide" 
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Unified Glass Box */}
          <div className="bg-[#f3faf9] backdrop-blur-xl border border-[#38948c]/30 rounded-3xl p-6">
            {/* Flip Card */}
            <div
              className="aspect-[4/5] w-full max-w-xs mx-auto mb-6 rounded-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <AnimatePresence mode="wait" custom={flipDirection}>
                <motion.div
                  key={activeIndex}
                  custom={flipDirection}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: easePremium }}
                  className="w-full h-full bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center rounded-2xl"
                >
                  <div className="text-center p-4">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/80">
                        {currentStudent.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-white font-semibold">{currentStudent.name}</p>
                    <p className="text-[#ade2d9]">{currentStudent.rank}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium text-[#255e5b] bg-[#ade2d9]/30 rounded-full mb-3">
                  {currentStudent.exam}
                </span>
                <p className="text-[#224d4b]/70 text-sm">{currentStudent.context}</p>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => handleNavigation('prev')}
                className="w-10 h-10 flex items-center justify-center bg-[#204140] hover:bg-[#255e5b] border border-[#38948c]/30 rounded-full text-[#ade2d9] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {resultsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setFlipDirection(i > activeIndex ? 'right' : 'left')
                      setActiveIndex(i)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeIndex
                        ? 'w-6 bg-[#7dcbc1]'
                        : 'bg-[#38948c]/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleNavigation('next')}
                className="w-10 h-10 flex items-center justify-center bg-[#204140] hover:bg-[#255e5b] border border-[#38948c]/30 rounded-full text-[#ade2d9] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}