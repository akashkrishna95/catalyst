'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Lock, Clock, Users, CheckCircle, Star, ArrowRight, ExternalLink } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const coursesData = [
  {
    id: 'neet-physics',
    title: 'NEET Physics Mastery',
    subtitle: 'Complete NEET Physics Curriculum',
    description: 'Master all Physics concepts required for NEET with our comprehensive course covering Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics.',
    duration: '120+ Hours',
    lectures: 180,
    price: '₹24,999',
    originalPrice: '₹34,999',
    discount: '29% OFF',
    seatsLeft: 14,
    rating: 4.9,
    students: 1200,
    features: [
      'Live doubt solving sessions',
      'Comprehensive study materials',
      'Previous year papers analysis',
      'Mock tests & assessments',
      'Personal mentor support',
    ],
    modules: [
      { name: 'Kinematics Basics', free: true, duration: '8 hrs' },
      { name: 'Laws of Motion Intro', free: true, duration: '10 hrs' },
      { name: 'Advanced Mechanics', free: false, duration: '15 hrs' },
      { name: 'Thermodynamics', free: false, duration: '12 hrs' },
      { name: 'Electromagnetism', free: false, duration: '18 hrs' },
      { name: 'Optics & Waves', free: false, duration: '14 hrs' },
      { name: 'Modern Physics', free: false, duration: '12 hrs' },
      { name: 'Practice Problems', free: false, duration: '20 hrs' },
    ],
    category: 'neet',
  },
  {
    id: 'neet-chemistry',
    title: 'NEET Chemistry Complete',
    subtitle: 'Organic + Inorganic + Physical',
    description: 'Comprehensive Chemistry preparation covering all three branches with focus on NEET pattern questions and concept building.',
    duration: '140+ Hours',
    lectures: 210,
    price: '₹26,999',
    originalPrice: '₹36,999',
    discount: '27% OFF',
    seatsLeft: 8,
    rating: 4.8,
    students: 980,
    features: [
      'Branch-wise structured learning',
      'Reaction mechanism videos',
      'NCERT focused preparation',
      'Weekly tests & analysis',
      '24/7 doubt support',
    ],
    modules: [
      { name: 'Atomic Structure', free: true, duration: '6 hrs' },
      { name: 'Chemical Bonding', free: true, duration: '8 hrs' },
      { name: 'Organic Reactions', free: false, duration: '20 hrs' },
      { name: 'Coordination Compounds', free: false, duration: '10 hrs' },
      { name: 'Electrochemistry', free: false, duration: '12 hrs' },
      { name: 'Thermodynamics', free: false, duration: '14 hrs' },
      { name: 'p-Block Elements', free: false, duration: '16 hrs' },
      { name: 'Practice Sessions', free: false, duration: '25 hrs' },
    ],
    category: 'neet',
  },
  {
    id: 'jee-physics',
    title: 'JEE Advanced Physics',
    subtitle: 'For IIT Aspirants',
    description: 'Intensive Physics preparation designed for JEE Advanced with focus on problem-solving techniques and advanced concepts.',
    duration: '180+ Hours',
    lectures: 250,
    price: '₹34,999',
    originalPrice: '₹44,999',
    discount: '22% OFF',
    seatsLeft: 6,
    rating: 4.9,
    students: 650,
    features: [
      'Advanced problem solving',
      'JEE pattern questions',
      'One-on-one mentoring',
      'All India mock tests',
      'IIT toppers interaction',
    ],
    modules: [
      { name: 'Problem Solving Techniques', free: true, duration: '10 hrs' },
      { name: 'Vectors & 3D', free: true, duration: '12 hrs' },
      { name: 'Rotation Mechanics', free: false, duration: '18 hrs' },
      { name: 'Wave Optics', free: false, duration: '15 hrs' },
      { name: 'Modern Physics', free: false, duration: '20 hrs' },
      { name: 'Electrostatics', free: false, duration: '16 hrs' },
      { name: 'Magnetism', free: false, duration: '14 hrs' },
      { name: 'Advanced Problems', free: false, duration: '30 hrs' },
    ],
    category: 'jee',
  },
  {
    id: 'foundation',
    title: 'Foundation Course',
    subtitle: 'Class 11 Complete Package',
    description: 'Build a strong foundation in Physics & Chemistry for Class 11 students preparing for competitive exams.',
    duration: '200+ Hours',
    lectures: 300,
    price: '₹19,999',
    originalPrice: '₹29,999',
    discount: '33% OFF',
    seatsLeft: 22,
    rating: 4.7,
    students: 1500,
    features: [
      'Concept building focus',
      'Board + competitive prep',
      'Regular assessments',
      'Parent progress reports',
      'Flexible scheduling',
    ],
    modules: [
      { name: 'Mathematics Bridge', free: true, duration: '15 hrs' },
      { name: 'Physics Fundamentals', free: true, duration: '20 hrs' },
      { name: 'Chemistry Basics', free: false, duration: '18 hrs' },
      { name: 'Advanced Problems', free: false, duration: '25 hrs' },
      { name: 'Lab Practicals', free: false, duration: '12 hrs' },
      { name: 'Test Series', free: false, duration: '30 hrs' },
    ],
    category: 'foundation',
  },
  {
    id: 'keam-complete',
    title: 'KEAM Complete Package',
    subtitle: 'Kerala Engineering Entrance',
    description: 'Specialized preparation for KEAM covering Physics, Chemistry, and Mathematics with Kerala-specific focus.',
    duration: '160+ Hours',
    lectures: 220,
    price: '₹22,999',
    originalPrice: '₹32,999',
    discount: '30% OFF',
    seatsLeft: 18,
    rating: 4.8,
    students: 850,
    features: [
      'KEAM pattern focused',
      'Previous year analysis',
      'State rank preparation',
      'Mock tests weekly',
      'Result guarantee*',
    ],
    modules: [
      { name: 'Physics Foundation', free: true, duration: '12 hrs' },
      { name: 'Chemistry Basics', free: true, duration: '10 hrs' },
      { name: 'Mathematics Core', free: false, duration: '20 hrs' },
      { name: 'Advanced Physics', free: false, duration: '25 hrs' },
      { name: 'Organic Chemistry', free: false, duration: '18 hrs' },
      { name: 'Practice Tests', free: false, duration: '35 hrs' },
    ],
    category: 'keam',
  },
]

const categories = [
  { id: 'all', label: 'All Courses' },
  { id: 'neet', label: 'NEET' },
  { id: 'jee', label: 'JEE' },
  { id: 'keam', label: 'KEAM' },
  { id: 'foundation', label: 'Foundation' },
]

export function CoursesContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeCategory)

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 bg-[#fcfdfd] min-h-screen">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #ade2d9 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-12"
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d2626] tracking-tight mb-4">
            Our Courses
          </h1>
          <p className="text-lg lg:text-xl text-[#224d4b]/70 max-w-2xl mx-auto mb-6">
            Comprehensive preparation programs designed by experts for NEET, JEE, and KEAM aspirants.
          </p>
          {/* YouTube Link */}
          <a
            href="https://youtube.com/@catalystacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#38948c] hover:text-[#255e5b] text-sm font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Free Lectures on YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 lg:px-6 py-2 lg:py-2.5 text-sm font-medium rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-[#255e5b] text-white shadow-lg'
                  : 'bg-white text-[#224d4b] border border-[#ade2d9]/50 hover:border-[#38948c] hover:bg-[#f3faf9]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: easePremuim, delay: index * 0.05 }}
                className="bg-white rounded-2xl lg:rounded-3xl border border-[#ade2d9]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[#255e5b] to-[#38948c] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl lg:text-8xl font-bold text-white/10">
                      {course.title.charAt(0)}
                    </span>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </button>
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    {course.discount}
                  </div>
                  {/* Seats Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    {course.seatsLeft} seats left
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 lg:p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-bold text-[#224d4b] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#38948c] mb-3">{course.subtitle}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#224d4b]/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {course.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#255e5b]">{course.price}</span>
                    <span className="text-sm text-[#224d4b]/40 line-through">{course.originalPrice}</span>
                  </div>

                  {/* Features Preview */}
                  <div className="space-y-2 mb-4">
                    {course.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#224d4b]/70">
                        <CheckCircle className="w-4 h-4 text-[#38948c]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Expand/CTA */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="flex-1 py-2.5 text-sm font-medium text-[#255e5b] border border-[#ade2d9] rounded-xl hover:bg-[#f3faf9] transition-colors"
                    >
                      {expandedCourse === course.id ? 'Show Less' : 'View Modules'}
                    </button>
                    <button className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#255e5b] to-[#38948c] rounded-xl hover:shadow-lg transition-all">
                      Enroll Now
                    </button>
                  </div>

                  {/* Expanded Modules */}
                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easePremuim }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-[#ade2d9]/30 space-y-2">
                          {course.modules.map((module, i) => (
                            <div
                              key={i}
                              className={`flex items-center justify-between p-3 rounded-xl ${
                                module.free ? 'bg-[#f3faf9]' : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {module.free ? (
                                  <Play className="w-4 h-4 text-[#38948c]" />
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                )}
                                <span className={`text-sm ${module.free ? 'text-[#224d4b]' : 'text-gray-500'}`}>
                                  {module.name}
                                </span>
                                {module.free && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-medium text-[#255e5b] bg-[#ade2d9]/30 rounded">
                                    FREE
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#224d4b]/50">{module.duration}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-[#255e5b] to-[#38948c] rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold mb-4">
              Not sure which course to pick?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Book a free counseling session with our experts and get personalized guidance for your preparation journey.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#255e5b] font-semibold rounded-xl hover:bg-[#f3faf9] transition-colors shadow-lg">
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
