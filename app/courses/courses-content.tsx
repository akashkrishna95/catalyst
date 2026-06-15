'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles, Instagram, Twitter, Youtube } from 'lucide-react'

// --- Premium Easing Curve ---
const easePremium = [0.16, 1, 0.3, 1]

// --- Text Reveal Component ---
const AnimatedLetters = ({ text }: { text: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 16, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
      transition: { type: "spring", damping: 16, stiffness: 100 },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center overflow-hidden"
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[2vw]">
          {word.split("").map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

// --- Main Page Component ---
export function CoursesContent() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Inject the Lottie Web Component Script safely
  useEffect(() => {
    const scriptId = 'lottie-wc-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js'
      script.type = 'module'
      document.body.appendChild(script)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setIsSubmitted(true)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#f3faf9] text-[#0d2626] overflow-hidden flex flex-col justify-between selection:bg-[#38948c] selection:text-white">
      
      {/* Empty Header space for visual balance since logo/badges were removed */}
      <header className="relative z-10 w-full p-6 sm:p-10 h-20" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-6xl mx-auto">
        
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easePremium }}
          className="flex justify-center items-center -mb-8 sm:-mb-12 pointer-events-none"
          dangerouslySetInnerHTML={{
            __html: `<dotlottie-wc src="https://lottie.host/829d8b53-8bb0-4c7d-a6b4-d37f0898d3f8/Beka2vnsFg.lottie" style="width: 300px; height: 300px;" autoplay loop></dotlottie-wc>`
          }}
        />

        {/* Giant Kinetic Typography */}
        <div className="mb-10 text-center cursor-default z-10 relative">
          <h1 className="font-[family-name:var(--font-display)] text-[12vw] sm:text-[8vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter text-[#0d2626]">
            <AnimatedLetters text="COMING SOON" />
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: easePremium }}
          className="text-lg sm:text-xl text-[#224d4b]/70 text-center max-w-2xl mx-auto mb-10 font-medium"
        >
          We are engineering a completely new, elite preparation ecosystem for NEET, JEE, and KEAM aspirants.
        </motion.p>

        {/* Minimalist Email Capture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: easePremium }}
          className="w-full max-w-md relative z-20"
        >
          <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ade2d9]/30">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#38948c]/50" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-transparent border-none rounded-xl text-[#0d2626] placeholder-[#224d4b]/40 focus:outline-none focus:ring-0 sm:text-sm font-medium"
                    placeholder="Enter your email address"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#255e5b] hover:bg-[#1a3838] transition-colors gap-2 group"
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="px-6 py-4 flex items-center justify-center gap-2 text-[#255e5b]"
              >
                <Sparkles className="w-5 h-5" />
                <p className="font-bold">You're on the list. We'll be in touch.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer with Centered Socials */}
      <footer className="relative z-10 w-full p-6 sm:p-10 flex justify-center items-center gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-8"
        >
          <a href="#" className="text-[#224d4b]/40 hover:text-[#38948c] transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-[#224d4b]/40 hover:text-[#38948c] transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-[#224d4b]/40 hover:text-[#38948c] transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        </motion.div>
      </footer>
    </div>
  )
}













// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView, AnimatePresence } from 'framer-motion'
// import { Play, Lock, Clock, Users, CheckCircle, Star, ArrowRight, ExternalLink } from 'lucide-react'

// const easePremuim = [0.16, 1, 0.3, 1]

// const coursesData = [
//   {
//     id: 'neet-physics',
//     title: 'NEET Physics Mastery',
//     subtitle: 'Complete NEET Physics Curriculum',
//     description: 'Master all Physics concepts required for NEET with our comprehensive course covering Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics.',
//     duration: '120+ Hours',
//     lectures: 180,
//     price: '₹24,999',
//     originalPrice: '₹34,999',
//     discount: '29% OFF',
//     seatsLeft: 14,
//     rating: 4.9,
//     students: 1200,
//     features: [
//       'Live doubt solving sessions',
//       'Comprehensive study materials',
//       'Previous year papers analysis',
//       'Mock tests & assessments',
//       'Personal mentor support',
//     ],
//     modules: [
//       { name: 'Kinematics Basics', free: true, duration: '8 hrs' },
//       { name: 'Laws of Motion Intro', free: true, duration: '10 hrs' },
//       { name: 'Advanced Mechanics', free: false, duration: '15 hrs' },
//       { name: 'Thermodynamics', free: false, duration: '12 hrs' },
//       { name: 'Electromagnetism', free: false, duration: '18 hrs' },
//       { name: 'Optics & Waves', free: false, duration: '14 hrs' },
//       { name: 'Modern Physics', free: false, duration: '12 hrs' },
//       { name: 'Practice Problems', free: false, duration: '20 hrs' },
//     ],
//     category: 'neet',
//   },
//   {
//     id: 'neet-chemistry',
//     title: 'NEET Chemistry Complete',
//     subtitle: 'Organic + Inorganic + Physical',
//     description: 'Comprehensive Chemistry preparation covering all three branches with focus on NEET pattern questions and concept building.',
//     duration: '140+ Hours',
//     lectures: 210,
//     price: '₹26,999',
//     originalPrice: '₹36,999',
//     discount: '27% OFF',
//     seatsLeft: 8,
//     rating: 4.8,
//     students: 980,
//     features: [
//       'Branch-wise structured learning',
//       'Reaction mechanism videos',
//       'NCERT focused preparation',
//       'Weekly tests & analysis',
//       '24/7 doubt support',
//     ],
//     modules: [
//       { name: 'Atomic Structure', free: true, duration: '6 hrs' },
//       { name: 'Chemical Bonding', free: true, duration: '8 hrs' },
//       { name: 'Organic Reactions', free: false, duration: '20 hrs' },
//       { name: 'Coordination Compounds', free: false, duration: '10 hrs' },
//       { name: 'Electrochemistry', free: false, duration: '12 hrs' },
//       { name: 'Thermodynamics', free: false, duration: '14 hrs' },
//       { name: 'p-Block Elements', free: false, duration: '16 hrs' },
//       { name: 'Practice Sessions', free: false, duration: '25 hrs' },
//     ],
//     category: 'neet',
//   },
//   {
//     id: 'jee-physics',
//     title: 'JEE Advanced Physics',
//     subtitle: 'For IIT Aspirants',
//     description: 'Intensive Physics preparation designed for JEE Advanced with focus on problem-solving techniques and advanced concepts.',
//     duration: '180+ Hours',
//     lectures: 250,
//     price: '₹34,999',
//     originalPrice: '₹44,999',
//     discount: '22% OFF',
//     seatsLeft: 6,
//     rating: 4.9,
//     students: 650,
//     features: [
//       'Advanced problem solving',
//       'JEE pattern questions',
//       'One-on-one mentoring',
//       'All India mock tests',
//       'IIT toppers interaction',
//     ],
//     modules: [
//       { name: 'Problem Solving Techniques', free: true, duration: '10 hrs' },
//       { name: 'Vectors & 3D', free: true, duration: '12 hrs' },
//       { name: 'Rotation Mechanics', free: false, duration: '18 hrs' },
//       { name: 'Wave Optics', free: false, duration: '15 hrs' },
//       { name: 'Modern Physics', free: false, duration: '20 hrs' },
//       { name: 'Electrostatics', free: false, duration: '16 hrs' },
//       { name: 'Magnetism', free: false, duration: '14 hrs' },
//       { name: 'Advanced Problems', free: false, duration: '30 hrs' },
//     ],
//     category: 'jee',
//   },
//   {
//     id: 'foundation',
//     title: 'Foundation Course',
//     subtitle: 'Class 11 Complete Package',
//     description: 'Build a strong foundation in Physics & Chemistry for Class 11 students preparing for competitive exams.',
//     duration: '200+ Hours',
//     lectures: 300,
//     price: '₹19,999',
//     originalPrice: '₹29,999',
//     discount: '33% OFF',
//     seatsLeft: 22,
//     rating: 4.7,
//     students: 1500,
//     features: [
//       'Concept building focus',
//       'Board + competitive prep',
//       'Regular assessments',
//       'Parent progress reports',
//       'Flexible scheduling',
//     ],
//     modules: [
//       { name: 'Mathematics Bridge', free: true, duration: '15 hrs' },
//       { name: 'Physics Fundamentals', free: true, duration: '20 hrs' },
//       { name: 'Chemistry Basics', free: false, duration: '18 hrs' },
//       { name: 'Advanced Problems', free: false, duration: '25 hrs' },
//       { name: 'Lab Practicals', free: false, duration: '12 hrs' },
//       { name: 'Test Series', free: false, duration: '30 hrs' },
//     ],
//     category: 'foundation',
//   },
//   {
//     id: 'keam-complete',
//     title: 'KEAM Complete Package',
//     subtitle: 'Kerala Engineering Entrance',
//     description: 'Specialized preparation for KEAM covering Physics, Chemistry, and Mathematics with Kerala-specific focus.',
//     duration: '160+ Hours',
//     lectures: 220,
//     price: '₹22,999',
//     originalPrice: '₹32,999',
//     discount: '30% OFF',
//     seatsLeft: 18,
//     rating: 4.8,
//     students: 850,
//     features: [
//       'KEAM pattern focused',
//       'Previous year analysis',
//       'State rank preparation',
//       'Mock tests weekly',
//       'Result guarantee*',
//     ],
//     modules: [
//       { name: 'Physics Foundation', free: true, duration: '12 hrs' },
//       { name: 'Chemistry Basics', free: true, duration: '10 hrs' },
//       { name: 'Mathematics Core', free: false, duration: '20 hrs' },
//       { name: 'Advanced Physics', free: false, duration: '25 hrs' },
//       { name: 'Organic Chemistry', free: false, duration: '18 hrs' },
//       { name: 'Practice Tests', free: false, duration: '35 hrs' },
//     ],
//     category: 'keam',
//   },
// ]

// const categories = [
//   { id: 'all', label: 'All Courses' },
//   { id: 'neet', label: 'NEET' },
//   { id: 'jee', label: 'JEE' },
//   { id: 'keam', label: 'KEAM' },
//   { id: 'foundation', label: 'Foundation' },
// ]

// export function CoursesContent() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
//   const [activeCategory, setActiveCategory] = useState('all')
//   const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

//   const filteredCourses = activeCategory === 'all' 
//     ? coursesData 
//     : coursesData.filter(course => course.category === activeCategory)

//   // Container variants for staggered entrance
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05
//       }
//     },
//     exit: {
//       opacity: 0,
//       transition: { duration: 0.2 }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4, ease: easePremuim }
//     }
//   }

//   return (
//     <section ref={sectionRef} className="relative pt-32 pb-20 bg-[#fcfdfd] min-h-screen">
//       {/* Background Pattern */}
//       <div 
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: 'radial-gradient(circle, #ade2d9 1px, transparent 1px)',
//           backgroundSize: '24px 24px',
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: easePremuim }}
//           className="text-center mb-12"
//         >
//           <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d2626] tracking-tight mb-4">
//             Our Courses
//           </h1>
//           <p className="text-lg lg:text-xl text-[#224d4b]/70 max-w-2xl mx-auto mb-6">
//             Comprehensive preparation programs designed by experts for NEET, JEE, and KEAM aspirants.
//           </p>
//           <a
//             href="https://youtube.com/@catalystacademy"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 text-[#38948c] hover:text-[#255e5b] text-sm font-medium transition-colors"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//             </svg>
//             Watch Free Lectures on YouTube
//             <ExternalLink className="w-3 h-3" />
//           </a>
//         </motion.div>

//         {/* Category Filter */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
//           className="flex flex-wrap justify-center gap-2 mb-12"
//         >
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => {
//                 setActiveCategory(category.id);
//                 setExpandedCourse(null);
//               }}
//               className={`px-4 lg:px-6 py-2 lg:py-2.5 text-sm font-medium rounded-full transition-all ${
//                 activeCategory === category.id
//                   ? 'bg-[#255e5b] text-white shadow-lg'
//                   : 'bg-white text-[#224d4b] border border-[#ade2d9]/50 hover:border-[#38948c] hover:bg-[#f3faf9]'
//               }`}
//             >
//               {category.label}
//             </button>
//           ))}
//         </motion.div>

//         {/* Courses Grid - Wrapped entirely in AnimatePresence with mode="wait" */}
//         <AnimatePresence mode="wait">
//           <motion.div 
//             key={activeCategory}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
//           >
//             {filteredCourses.map((course) => (
//               <motion.div
//                 key={course.id}
//                 variants={itemVariants}
//                 className={`bg-white rounded-2xl lg:rounded-3xl border border-[#ade2d9]/30 shadow-sm hover:shadow-xl transition-all group relative flex flex-col h-full ${
//                   expandedCourse === course.id ? 'z-50' : 'z-10'
//                 }`}
//               >
//                 {/* Thumbnail */}
//                 <div className="relative aspect-video bg-gradient-to-br from-[#255e5b] to-[#38948c] overflow-hidden rounded-t-2xl lg:rounded-t-3xl shrink-0">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white/10">
//                       {course.title.charAt(0)}
//                     </span>
//                   </div>
//                   <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                       <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white ml-1" />
//                     </div>
//                   </button>
//                   <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
//                     {course.discount}
//                   </div>
//                   <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs rounded-full">
//                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
//                     <span className="hidden sm:inline">{course.seatsLeft} seats left</span>
//                     <span className="sm:hidden">{course.seatsLeft} left</span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-1">
//                   <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg lg:text-xl font-bold text-[#224d4b] mb-1 line-clamp-2">
//                     {course.title}
//                   </h3>
//                   <p className="text-[10px] sm:text-sm text-[#38948c] mb-2 sm:mb-3 line-clamp-1">{course.subtitle}</p>

//                   {/* Stats */}
//                   <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-[#224d4b]/60 mb-3 sm:mb-4">
//                     <span className="flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       {course.duration}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Users className="w-3 h-3" />
//                       {course.students}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
//                       {course.rating}
//                     </span>
//                   </div>

//                   {/* Price */}
//                   <div className="flex flex-wrap items-end gap-1 sm:gap-2 mb-3 sm:mb-4">
//                     <span className="text-lg sm:text-2xl font-bold text-[#255e5b]">{course.price}</span>
//                     <span className="text-[10px] sm:text-sm text-[#224d4b]/40 line-through mb-0.5">{course.originalPrice}</span>
//                   </div>

//                   {/* Features */}
//                   <div className="space-y-1.5 sm:space-y-2 mb-4 hidden sm:block">
//                     {course.features.slice(0, 3).map((feature, i) => (
//                       <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-[#224d4b]/70">
//                         <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#38948c] flex-shrink-0" />
//                         <span className="truncate">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="space-y-1.5 mb-3 sm:hidden">
//                     {course.features.slice(0, 2).map((feature, i) => (
//                       <div key={i} className="flex items-center gap-1 text-[10px] text-[#224d4b]/70">
//                         <CheckCircle className="w-3 h-3 text-[#38948c] flex-shrink-0" />
//                         <span className="truncate">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2">
//                     <button
//                       onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
//                       className="w-full py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium text-[#255e5b] border border-[#ade2d9] rounded-lg sm:rounded-xl hover:bg-[#f3faf9] transition-colors"
//                     >
//                       {expandedCourse === course.id ? 'Close' : 'Modules'}
//                     </button>
//                     <button className="w-full py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium text-white bg-gradient-to-r from-[#255e5b] to-[#38948c] rounded-lg sm:rounded-xl hover:shadow-lg transition-all">
//                       Enroll
//                     </button>
//                   </div>

//                   {/* Expanded Dropdown - Added origin-top and scaleY for smooth unfolding */}
//                   <AnimatePresence>
//                     {expandedCourse === course.id && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scaleY: 1 }}
//                         exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
//                         transition={{ duration: 0.2, ease: "easeOut" }}
//                         className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl sm:rounded-2xl border border-[#ade2d9]/30 shadow-2xl z-50 overflow-hidden origin-top"
//                       >
//                         <div className="p-2 sm:p-4 space-y-1.5 sm:space-y-2 max-h-[200px] sm:max-h-[320px] overflow-y-auto">
//                           {course.modules.map((module, i) => (
//                             <div
//                               key={i}
//                               className={`flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-md sm:rounded-xl gap-1 sm:gap-0 ${
//                                 module.free ? 'bg-[#f3faf9]' : 'bg-gray-50'
//                               }`}
//                             >
//                               <div className="flex items-center gap-1.5 sm:gap-2">
//                                 {module.free ? (
//                                   <Play className="w-3 h-3 sm:w-4 sm:h-4 text-[#38948c] flex-shrink-0" />
//                                 ) : (
//                                   <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
//                                 )}
//                                 <span className={`text-[9px] sm:text-sm ${module.free ? 'text-[#224d4b]' : 'text-gray-500'} line-clamp-1`}>
//                                   {module.name}
//                                 </span>
//                               </div>
//                               <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pl-4 sm:pl-0">
//                                 {module.free ? (
//                                   <span className="px-1.5 py-0.5 text-[8px] sm:text-[10px] font-medium text-[#255e5b] bg-[#ade2d9]/30 rounded">
//                                     FREE
//                                   </span>
//                                 ) : <div />}
//                                 <span className="text-[9px] sm:text-xs text-[#224d4b]/50">{module.duration}</span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
//           className="text-center mt-16"
//         >
//           <div className="bg-gradient-to-br from-[#255e5b] to-[#38948c] rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
//             <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
//               Not sure which course to pick?
//             </h3>
//             <p className="text-sm sm:text-base text-white/80 mb-5 sm:mb-6 max-w-xl mx-auto">
//               Book a free counseling session with our experts and get personalized guidance for your preparation journey.
//             </p>
//             <button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#255e5b] text-sm sm:text-base font-semibold rounded-xl hover:bg-[#f3faf9] transition-colors shadow-lg">
//               Book Free Consultation
//               <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }