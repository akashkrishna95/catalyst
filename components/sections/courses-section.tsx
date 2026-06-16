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
    youtubeId: 'JHNbWp6qWcM', 
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
    youtubeId: 'JHNbWp6qWcM', 
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
    youtubeId: 'JHNbWp6qWcM', 
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
    youtubeId: 'JHNbWp6qWcM', 
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
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null)
  const [dragDistance, setDragDistance] = useState(340) 
  
  const dragX = useMotionValue(0)

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) { 
        setDragDistance(Number(((window.innerWidth * 0.85) + 16).toFixed(2)))
      } else if (window.innerWidth < 768) { 
        setDragDistance(416) 
      } else if (window.innerWidth < 1024) { 
        setDragDistance(516) 
      } else { 
        setDragDistance(620) 
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (isDragging || !isInView || playingVideoId !== null) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coursesData.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isDragging, isInView, playingVideoId])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 30; 
    const velocityThreshold = 300; 
    
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setActiveIndex((prev) => Math.min(prev + 1, coursesData.length - 1))
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    if (playingVideoId !== null) {
      setPlayingVideoId(null)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-20 lg:py-28 bg-[#0d2626] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#ade2d9]/10 via-transparent to-transparent blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* FIX: Increased horizontal padding (px-8 lg:px-12) to give the shadow room to bleed without clipping */}
        <div className="relative overflow-visible py-12 -my-12 px-8 -mx-8 lg:px-12 lg:-mx-12">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragConstraints={{ left: -((coursesData.length - 1) * dragDistance), right: 0 }}
            dragElastic={0.15} 
            dragMomentum={false} 
            style={{ touchAction: 'pan-y' }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={{ x: -activeIndex * dragDistance }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
            className="flex gap-4 lg:gap-5 cursor-grab active:cursor-grabbing w-max px-2" // Added slight px-2 here for inner track buffer
          >
            {coursesData.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: easePremuim, delay: index * 0.1 }}
                className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[500px] lg:w-[600px] will-change-transform"
              >
                {/* OUTER SHADOW WRAPPER */}
                <div className="relative w-full rounded-2xl lg:rounded-3xl shadow-[0_16px_40px_-10px_rgba(0,0,0,0.6)] lg:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)]">
                  
                  {/* INNER OVERFLOW WRAPPER */}
                  <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden border-4 lg:border-[6px] border-[#204140]/50 bg-[#0d2626]">
                    
                    {playingVideoId === course.id && course.youtubeId ? (
                      <div 
                        className="absolute inset-0 z-30 bg-black"
                        onPointerDownCapture={(e) => e.stopPropagation()} 
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${course.youtubeId}?autoplay=1&rel=0`}
                          title={`${course.title} Video Preview`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[#153130]">
                          <img 
                            src={course.youtubeId ? `https://img.youtube.com/vi/${course.youtubeId}/hqdefault.jpg` : course.thumbnail}
                            alt={`${course.title} thumbnail`}
                            className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                          <div className="absolute inset-0 bg-[#255e5b]/10 mix-blend-color pointer-events-none" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <button 
                            onClick={() => course.youtubeId && setPlayingVideoId(course.id)}
                            className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center group transition-colors ${course.youtubeId ? 'bg-black/30 hover:bg-black/50 cursor-pointer shadow-lg' : 'bg-black/10 opacity-50 cursor-not-allowed'}`}
                          >
                            <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white fill-white ml-1 group-hover:scale-110 transition-transform drop-shadow-md" />
                          </button>
                        </div>

                        <div className="absolute top-3 lg:top-4 right-3 lg:right-4 flex items-center gap-2 px-2.5 lg:px-3 py-1 lg:py-1.5 bg-black/70 backdrop-blur-md rounded-full z-20 shadow-lg">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                          <span className="text-white text-xs font-semibold tracking-wide">
                            {course.seatsLeft} Seats Left
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4 z-20 pointer-events-none">
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-bold text-white mb-0.5 lg:mb-1 drop-shadow-lg">
                                {course.title}
                              </h3>
                              <p className="text-[#d6f1ec] font-medium text-xs lg:text-sm drop-shadow-md">{course.subtitle}</p>
                              <p className="text-[#7dcbc1] font-semibold text-xs mt-0.5 lg:mt-1 drop-shadow-md">{course.duration}</p>
                            </div>
                            <Link
                              href="/courses"
                              className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-[#38948c] hover:bg-[#2b7671] text-white text-xs lg:text-sm font-semibold rounded-lg lg:rounded-xl transition-all shadow-lg pointer-events-auto hover:shadow-xl hover:-translate-y-0.5"
                            >
                              Start
                              <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-3 lg:mt-4 grid grid-cols-2 gap-2">
                  {course.freeModules.map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 bg-[#204140]/50 rounded-lg overflow-hidden"
                    >
                      <Play className="w-3 h-3 text-[#7dcbc1] flex-shrink-0" />
                      <span className="text-[11px] lg:text-xs text-[#d6f1ec] truncate font-medium">{module}</span>
                    </div>
                  ))}
                  {course.lockedModules.slice(0, 2).map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 bg-[#204140]/30 rounded-lg opacity-60 overflow-hidden"
                    >
                      <Lock className="w-3 h-3 text-[#7dcbc1] flex-shrink-0" />
                      <span className="text-[11px] lg:text-xs text-[#d6f1ec] truncate font-medium">{module}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 lg:mt-8">
          {coursesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsDragging(false)
                setActiveIndex(index)
                setPlayingVideoId(null)
              }}
              className={`h-2 rounded-full transition-all duration-500 pagination-pill ${
                index === activeIndex
                  ? 'w-8 lg:w-10 bg-[#7dcbc1] shadow-[0_0_10px_#7dcbc1]'
                  : 'w-2 bg-[#38948c]/50 hover:bg-[#38948c]'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
          className="text-center mt-10 lg:mt-12"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#255e5b] to-[#2b7671] hover:from-[#2b7671] hover:to-[#38948c] text-white font-semibold rounded-xl shadow-[0_8px_30px_rgba(37,94,91,0.3)] hover:shadow-[0_8px_30px_rgba(37,94,91,0.5)] transition-all hover:-translate-y-1"
          >
            Explore All Courses
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}