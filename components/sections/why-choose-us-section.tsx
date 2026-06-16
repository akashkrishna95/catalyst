'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, BookOpen, Lightbulb, Target } from 'lucide-react'
import ScrollStack, { ScrollStackItem } from '@/components/scroll-stack'

const easePremuim = [0.16, 1, 0.3, 1]

const scrollStackData = [
  {
    id: 1,
    title: '18+ Years of Excellence',
    text: 'For nearly two decades, we\'ve helped students build strong foundations in Physics and Chemistry, creating a legacy of academic success across Kollam.',
    icon: Trophy,
    microUI: 'timeline',
    milestones: ['2006 Founded', '2012 First AIR', '2018 New Campus', '2024 6000+ Alumni'],
  },
  {
    id: 2,
    title: 'Ranks Made For Excellence',
    text: 'Our students have consistently achieved outstanding results in board examinations, NEET, KEAM, and other competitive entrance tests.',
    icon: Target,
    microUI: 'chart',
  },
  {
    id: 3,
    title: 'Learn from Proven Mentors',
    text: ' Mr. Arun Nath.R and Mr. Hasheersha.S bring years of teaching expertise, guiding students beyond memorization toward true understanding.',
    icon: Users,
    microUI: 'calendar',
    slots: ['1-on-1 Strategy', 'Doubt Clearance', 'Mock Tests', 'Performance Review'],
  },
  {
    id: 4,
    title: 'Concepts Before Shortcuts',
    text: 'We focus on deep conceptual mastery, enabling students to confidently solve unfamiliar and application-based questions.',
    icon: Lightbulb,
    microUI: 'matrix',
  },
  {
    id: 5,
    title: 'From Effort to Achievement',
    text: 'The right guidance transforms hard work into measurable results, helping students unlock their full academic potential.',
    icon: BookOpen,
    microUI: 'progress',
  },
]

function TimelineMicroUI({ milestones }: { milestones: string[] }) {
  return (
    <div className="relative py-2">
      <motion.div 
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, ease: easePremuim }}
        className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#38948c] to-[#ade2d9]/40 origin-top transform-gpu" 
      />
      <div className="space-y-4">
        {milestones.map((milestone, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: easePremuim }}
            className="relative flex items-center pl-8 transform-gpu"
          >
            <div className="absolute left-[14px] w-2.5 h-2.5 rounded-full bg-[#38948c] border-2 border-[#f3faf9] shadow-[0_0_0_3px_rgba(125,203,193,0.3)] transform -translate-x-1/2" />
            <span className="text-sm font-medium text-[#224d4b]/90">{milestone}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ChartMicroUI() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isLineInView = useInView(containerRef, { once: true, amount: 0.4 })
  const climbingLinePath = "M 10,75 C 50,70 80,40 130,30 L 190,10"

  return (
    <div ref={containerRef} className="py-2 w-full">
      <div className="relative w-full h-20 bg-white/40 rounded-xl border border-[#ade2d9]/40 p-2 overflow-hidden transform-gpu">
        <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
          <line x1="10" y1="75" x2="190" y2="75" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="10" y1="40" x2="190" y2="40" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="10" y1="10" x2="190" y2="10" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

          <motion.path
            d={climbingLinePath}
            fill="none"
            stroke="url(#chartGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isLineInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      <div className="flex justify-between mt-4 gap-1">
        {['2019', '2021', '2023', '2024'].map((year, i) => (
          <motion.span 
            key={year} 
            initial={{ opacity: 0, y: 5 }}
            animate={isLineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
            transition={{ duration: 0.3, delay: 0.2 + (i * 0.1), ease: easePremuim }}
            className="text-xs font-semibold text-[#38948c] bg-[#ade2d9]/30 px-3 py-1 rounded-full transform-gpu"
          >
            {year}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function CalendarMicroUI({ slots }: { slots: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 py-2">
      {slots.map((slot, i) => (
        <motion.div
          key={slot}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
          className="px-3 py-3 bg-white shadow-sm border border-[#ade2d9]/60 rounded-xl text-xs text-[#224d4b] text-center font-semibold flex items-center justify-center transform-gpu"
        >
          {slot}
        </motion.div>
      ))}
    </div>
  )
}

function SvgGradients() {
  return (
    <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#255e5b" />
          <stop offset="100%" stopColor="#7dcbc1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MatrixMicroUI() {
  const nodes = [
    { x: 40, y: 25, label: 'Theory' },
    { x: 40, y: 75, label: 'Practice' },
    { x: 160, y: 50, label: 'Apply' },
  ]

  return (
    <div className="py-2 flex items-center justify-center transform-gpu">
      <svg viewBox="0 0 200 100" className="w-full h-28 overflow-visible">
        <motion.circle 
          cx="100" cy="50" r="20" fill="#255e5b" 
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.text 
          x="100" y="53" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }} transition={{ delay: 0.2 }}
        >
          CONCEPT
        </motion.text>
        
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.line 
              x1="100" y1="50" x2={node.x} y2={node.y} 
              stroke="#ade2d9" strokeWidth="2" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            />
            <motion.circle 
              cx={node.x} cy={node.y} r="12" fill="#f3faf9" stroke="#38948c" strokeWidth="2" 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            />
            <motion.text 
              x={node.x} y={node.y + 2.5} textAnchor="middle" fill="#255e5b" fontSize="6" fontWeight="700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ProgressMicroUI() {
  const stats = [
    { label: "Syllabus Covered", value: 100, delay: 0 },
    { label: "Concept Mastery", value: 88, delay: 0.1 },
    { label: "Exam Readiness", value: 94, delay: 0.2 },
    { label: "Mock Test Average", value: 85, delay: 0.3 },
  ]

  return (
    <div className="py-2 flex flex-col justify-between h-full gap-3.5">
      {stats.map((stat, index) => (
        <div key={index} className="w-full">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-xs font-semibold text-[#224d4b]/80">{stat.label}</span>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: stat.delay + 0.3 }}
              className="text-xs font-black text-[#255e5b]"
            >
              {stat.value}%
            </motion.span>
          </div>
          <div className="relative h-2 bg-[#ade2d9]/30 rounded-full overflow-hidden shadow-inner transform-gpu z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: stat.value / 100 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: stat.delay, ease: "circOut" }}
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#255e5b] to-[#7dcbc1] rounded-full origin-left transform-gpu z-10"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProgressTracker({ total, active }: { total: number; active: number }) {
  return (
    <div className="sticky top-32 flex flex-col gap-2 items-start">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 transform-gpu ${
            i <= active ? 'w-10 bg-[#38948c]' : 'w-5 bg-[#ade2d9]/50'
          }`}
        />
      ))}
      <p className="text-xs text-[#38948c] mt-2 font-semibold tabular-nums">
        {active + 1}/{total}
      </p>
    </div>
  )
}

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 })
  const [activeCard, setActiveCard] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [layoutKey, setLayoutKey] = useState(0) // State to force remount after layout settles

  useEffect(() => {
    setMounted(true)
    
    let resizeTimer: NodeJS.Timeout
    
    const handleResize = () => {
      // Instantly update breakpoint state for UI adjustments
      setIsMobile(window.innerWidth < 1024)
      
      // Debounce the key update so the component recalculates math 
      // ONLY after the DOM layout (like text wrapping) has fully settled.
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setLayoutKey(prev => prev + 1)
      }, 250) // 250ms delay
    }

    // Run on initial mount
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f3faf9] overflow-hidden grain-overlay mt-[-48px] rounded-t-[48px] z-20 pb-12 md:pb-20 antialiased"
    >
      <SvgGradients />

      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#ade2d9]/15 via-transparent to-transparent blur-[120px] z-0 pointer-events-none transform-gpu" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ade2d9]/20 rounded-full blur-[120px] z-0 pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#7dcbc1]/15 rounded-full blur-[100px] z-0 pointer-events-none transform-gpu" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easePremuim }}
          className="text-center mb-12 lg:mb-16 transform-gpu"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0d2626] tracking-tight mb-4 text-balance">
            The Architecture of Top 1% Ranks
          </h2>
        </motion.div>

        <div className="flex gap-8 lg:gap-16">
          <div className="hidden lg:block w-16 flex-shrink-0">
            <ProgressTracker total={scrollStackData.length} active={activeCard} />
          </div>

          <div className="flex-1 w-full max-w-full">
            <div className="w-full" style={{ height: `auto` }}>
              {mounted && (
                <ScrollStack
                  // FIX: Changing key forces remount after resizing fully finishes
                  key={`scroll-stack-${isMobile}-${layoutKey}`}
                  useWindowScroll={true}
                  itemDistance={isMobile ? 50 : 30}
                  baseScale={isMobile ? 0.88 : 0.85}
                  blurAmount={0}
                  itemStackDistance={isMobile ? 25 : 30}
                  stackPosition={isMobile ? "15%" : "15%"}
                >
                  {scrollStackData.map((card, index) => {
                    const Icon = card.icon
                    return (
                      <ScrollStackItem
                        key={card.id}
                        itemClassName="bg-white border border-[#ade2d9]/30 shadow-md lg:shadow-xl p-5 sm:p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] transform-gpu antialiased flex flex-col"
                      >
                        <div
                          className="flex flex-col lg:flex-row items-stretch lg:items-center gap-5 lg:gap-10 h-full w-full flex-1"
                          onMouseEnter={() => !isMobile && setActiveCard(index)}
                          style={{ WebkitBackfaceVisibility: 'hidden' }}
                        >
                          <div className="flex-1 flex flex-col justify-center w-full">
                            <div className="flex items-center gap-3 lg:gap-4 mb-4">
                              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white border border-[#ade2d9]/60 flex items-center justify-center shadow-sm flex-shrink-0">
                                <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#255e5b]" />
                              </div>
                              <h3 
                                className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#224d4b] tracking-tight"
                                style={{ transform: 'translateZ(0)' }}
                              >
                                {card.title}
                              </h3>
                            </div>
                            
                            <p 
                              className="text-[#224d4b]/70 leading-relaxed text-sm sm:text-base lg:text-lg" 
                              style={{ 
                                fontFamily: 'var(--font-inter), system-ui',
                                WebkitFontSmoothing: 'antialiased',
                                transform: 'translateZ(0)'
                              }}
                            >
                              {card.text}
                            </p>
                          </div>

                          <div className="w-full lg:w-1/2 lg:max-w-[320px] flex-shrink-0 bg-[#f3faf9]/50 rounded-2xl lg:rounded-3xl p-5 border border-[#ade2d9]/20 flex flex-col justify-center">
                            {card.microUI === 'timeline' && <TimelineMicroUI milestones={card.milestones || []} />}
                            {card.microUI === 'chart' && <ChartMicroUI />}
                            {card.microUI === 'calendar' && <CalendarMicroUI slots={card.slots || []} />}
                            {card.microUI === 'matrix' && <MatrixMicroUI />}
                            {card.microUI === 'progress' && <ProgressMicroUI />}
                          </div>
                        </div>
                      </ScrollStackItem>
                    )
                  })}
                </ScrollStack>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}