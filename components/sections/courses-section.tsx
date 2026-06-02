'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, PanInfo } from 'framer-motion'
import Link from 'next/link'
import { Play, Lock, Users, ArrowRight, ExternalLink } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const coursesData = [
  {
    id: 1,
    title: 'NEET Physics Mastery',
    subtitle: 'Complete NEET Physics Curriculum',
    thumbnail: '/courses/physics-thumb.jpg',
    duration: '120+ Hours',
    freeModules: ['Kinematics Basics', 'Laws of Motion Intro'],
    lockedModules: ['Advanced Mechanics', 'Thermodynamics', 'Electromagnetism'],
    seatsLeft: 14,
    price: '₹24,999',
  },
  {
    id: 2,
    title: 'NEET Chemistry Complete',
    subtitle: 'Organic + Inorganic + Physical',
    thumbnail: '/courses/chemistry-thumb.jpg',
    duration: '140+ Hours',
    freeModules: ['Atomic Structure', 'Chemical Bonding'],
    lockedModules: ['Organic Reactions', 'Coordination Compounds', 'Electrochemistry'],
    seatsLeft: 8,
    price: '₹26,999',
  },
  {
    id: 3,
    title: 'JEE Advanced Physics',
    subtitle: 'For IIT Aspirants',
    thumbnail: '/courses/jee-thumb.jpg',
    duration: '180+ Hours',
    freeModules: ['Problem Solving Techniques', 'Vectors & 3D'],
    lockedModules: ['Rotation Mechanics', 'Wave Optics', 'Modern Physics'],
    seatsLeft: 6,
    price: '₹34,999',
  },
  {
    id: 4,
    title: 'Foundation Course',
    subtitle: 'Class 11 Complete Package',
    thumbnail: '/courses/foundation-thumb.jpg',
    duration: '200+ Hours',
    freeModules: ['Mathematics Bridge', 'Physics Fundamentals'],
    lockedModules: ['Advanced Problems', 'Lab Practicals', 'Test Series'],
    seatsLeft: 22,
    price: '₹19,999',
  },
]

const avatars = [
  { initials: 'AK', color: 'bg-[#255e5b]' },
  { initials: 'SM', color: 'bg-[#38948c]' },
  { initials: 'VR', color: 'bg-[#7dcbc1]' },
  { initials: 'AS', color: 'bg-[#2b7671]' },
]

export function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragX = useMotionValue(0)

  // Auto-scroll
  useEffect(() => {
    if (isDragging || !isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coursesData.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isDragging, isInView])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => Math.min(prev + 1, coursesData.length - 1))
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
    setIsDragging(false)
  }

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-20 lg:py-28 bg-[#0d2626] overflow-hidden"
    >
      {/* Optical Color Bleed */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#ade2d9]/10 via-transparent to-transparent blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            The Digital Academy
          </h2>
          <p className="text-[#7dcbc1] text-base lg:text-lg max-w-2xl mx-auto mb-4">
            Master Physics and Chemistry from anywhere. Stream our complete curriculum.
          </p>
          {/* YouTube Link */}
          <a
            href="https://youtube.com/@catalystacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#ade2d9] hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Free Lectures on YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Verified Avatar Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="flex -space-x-3">
            {avatars.map((avatar, i) => (
              <div
                key={i}
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full ${avatar.color} border-2 border-[#0d2626] flex items-center justify-center text-white text-xs font-semibold`}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#7dcbc1]" />
            <span className="text-[#d6f1ec] text-sm">
              Trusted by <span className="font-semibold">500+</span> Top 100 AIRs
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -((coursesData.length - 1) * 320), right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            animate={{ x: -activeIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 340) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-4 lg:gap-5 cursor-grab active:cursor-grabbing"
          >
            {coursesData.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: easePremuim, delay: index * 0.1 }}
                className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[500px] lg:w-[600px]"
              >
                {/* Skeuomorphic Card */}
                <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden border-4 lg:border-[6px] border-[#204140]/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#204140] to-[#0d2626]">
                  {/* Video Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#255e5b]/80 to-[#38948c]/60 flex items-center justify-center">
                    <span className="text-6xl lg:text-8xl font-bold text-white/10">
                      {course.title.charAt(0)}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-colors">
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-[#ade2d9] fill-[#ade2d9] ml-1 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Scarcity Badge */}
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 flex items-center gap-2 px-2.5 lg:px-3 py-1 lg:py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">
                      {course.seatsLeft} Seats Left
                    </span>
                  </div>

                  {/* Info Dock */}
                  <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-bold text-white mb-0.5 lg:mb-1">
                          {course.title}
                        </h3>
                        <p className="text-[#ade2d9]/70 text-xs lg:text-sm">{course.subtitle}</p>
                        <p className="text-[#7dcbc1] text-xs mt-0.5 lg:mt-1">{course.duration}</p>
                      </div>
                      <Link
                        href="/courses"
                        className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-[#38948c] hover:bg-[#2b7671] text-white text-xs lg:text-sm font-medium rounded-lg lg:rounded-xl transition-colors"
                      >
                        Start
                        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Module Preview */}
                <div className="mt-3 lg:mt-4 grid grid-cols-2 gap-2">
                  {course.freeModules.map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2.5 lg:px-3 py-1.5 lg:py-2 bg-[#204140]/50 rounded-lg"
                    >
                      <Play className="w-3 h-3 text-[#7dcbc1]" />
                      <span className="text-xs text-[#d6f1ec] truncate">{module}</span>
                    </div>
                  ))}
                  {course.lockedModules.slice(0, 2).map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2.5 lg:px-3 py-1.5 lg:py-2 bg-[#204140]/30 rounded-lg opacity-60"
                    >
                      <Lock className="w-3 h-3 text-[#7dcbc1]" />
                      <span className="text-xs text-[#d6f1ec] truncate">{module}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Elastic Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 lg:mt-8">
          {coursesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsDragging(false)
                setActiveIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-500 pagination-pill ${
                index === activeIndex
                  ? 'w-8 lg:w-10 bg-[#7dcbc1] shadow-[0_0_10px_#7dcbc1]'
                  : 'w-2 bg-[#38948c]/50 hover:bg-[#38948c]'
              }`}
            />
          ))}
        </div>

        {/* Explore CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
          className="text-center mt-10 lg:mt-12"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#255e5b] to-[#2b7671] hover:from-[#2b7671] hover:to-[#38948c] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Explore All Courses
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
