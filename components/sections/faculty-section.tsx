'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const easePremuim = [0.16, 1, 0.3, 1]

const facultyData = [
  {
    id: 1,
    name: 'Arun Nath',
    role: 'HEAD OF PHYSICS',
    experience: '18+ Years Exp',
    image: '/faculty/physics-professor.jpg',
    philosophy: '"True understanding comes from questioning, not memorizing."',
    methodology: 'Feynman Technique • Problem-First Learning',
    achievements: '150+ IIT selections • 200+ NEET Top 100',
  },
  {
    id: 2,
    name: 'Hasheersha',
    role: 'HEAD OF CHEMISTRY',
    experience: '15+ Years Exp',
    image: '/faculty/chemistry-professor.jpg',
    philosophy: '"Chemistry is the language of transformation."',
    methodology: 'Visual Learning • Conceptual Mapping',
    achievements: '180+ Medical selections • State Topper 2023',
  },
]

export function FacultySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f3faf9] overflow-hidden"
    >
      {/* Engineering Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ade2d9 1px, transparent 1px),
            linear-gradient(to bottom, #ade2d9 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient Backlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ade2d9]/30 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#224d4b] tracking-tight mb-4">
            Learn from the Experts
          </h2>
          <p className="text-lg text-[#224d4b]/70 max-w-2xl mx-auto leading-relaxed">
            Guided by {"Kollam's"} premier minds with a combined 30+ years of producing top IIT and NEET ranks.
          </p>
        </motion.div>

        {/* V-Formation Cards */}
        <div 
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12"
          style={{ perspective: '1200px' }}
        >
          {facultyData.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                rotateY: index === 0 ? 15 : -15,
                rotateZ: index === 0 ? -2 : 2,
              } : {}}
              whileHover={{ 
                rotateY: 0, 
                rotateZ: 0, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, ease: easePremuim, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(faculty.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative w-full max-w-xs lg:max-w-[340px] rounded-2xl lg:rounded-[2rem] shadow-lg lg:shadow-xl overflow-hidden cursor-pointer group lg:perspective"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card with dynamic height */}
              <div className={`relative transition-all duration-200 ease-out ${
                hoveredCard === faculty.id ? 'h-[460px]' : 'h-[400px]'
              } lg:${hoveredCard === faculty.id ? 'h-[500px]' : 'h-[460px]'}`}>
                {/* Portrait Background */}
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#255e5b] to-[#38948c]">
                  {/* Placeholder for actual faculty images */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-[200px] font-bold text-white/20">
                      {faculty.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Glass Overlay - Bottom 1/4 */}
                <div className="absolute bottom-0 left-0 w-full z-20 bg-white/40 backdrop-blur-2xl border-t border-white/50 shadow-[0_-10px_40px_rgba(34,77,75,0.1)]">
                  <div className="p-6">
                    {/* Experience Badge */}
                    <div className="absolute -top-4 right-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#224d4b] bg-white/80 backdrop-blur-sm border border-[#224d4b]/20 rounded-full">
                        {faculty.experience}
                      </span>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#224d4b] mb-1">
                      {faculty.name}
                    </h3>
                    <p className="text-sm font-medium text-[#255e5b] uppercase tracking-widest mb-3">
                      {faculty.role}
                    </p>

                    {/* Expanded Content on Hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={hoveredCard === faculty.id ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: easePremuim }}
                      className="overflow-hidden"
                    >
                      {/* Philosophy Quote */}
                      <p className="font-[family-name:var(--font-accent)] italic text-[#224d4b]/80 text-sm mb-3">
                        {faculty.philosophy}
                      </p>

                      {/* Methodology Badge */}
                      <div className="inline-block px-3 py-1.5 text-xs font-medium text-[#255e5b] bg-[#ade2d9]/30 rounded-full mb-3">
                        {faculty.methodology}
                      </div>

                      {/* Achievement Ticker */}
                      <div className="flex items-center gap-2 text-xs text-[#38948c]">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-[#38948c] rounded-full animate-pulse" />
                        {faculty.achievements}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Note */}
        <p className="md:hidden text-center text-sm text-[#38948c]/60 mt-8">
          Tap cards to learn more
        </p>
      </div>
    </section>
  )
}
