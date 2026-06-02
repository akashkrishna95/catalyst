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
    title: 'Ranks That Speak for Themselves',
    text: 'Our students have consistently achieved outstanding results in board examinations, NEET, KEAM, and other competitive entrance tests.',
    icon: Target,
    microUI: 'chart',
  },
  {
    id: 3,
    title: 'Learn from Proven Mentors',
    text: 'Dr. Rajesh Kumar and Dr. Priya Menon bring years of teaching expertise, guiding students beyond memorization toward true understanding.',
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
    <div className="relative py-4">
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: easePremuim }}
        className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-[#38948c] to-[#ade2d9]/40" 
      />
      <div className="space-y-4 pl-10">
        {milestones.map((milestone, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: easePremuim }}
            className="relative flex items-center gap-3"
          >
            <div className="absolute -left-8 w-3 h-3 rounded-full bg-[#38948c] border-2 border-[#38948c] shadow-[0_0_8px_#7dcbc1]" />
            <span className="text-sm font-medium text-[#224d4b]/80">{milestone}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ChartMicroUI() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isLineInView = useInView(containerRef, { once: true, amount: 0.6 })

  // Perfectly mapped path climbing from bottom-left up to the top-right
  const climbingLinePath = "M 10,75 C 50,70 80,40 130,30 L 190,10"

  return (
    <div ref={containerRef} className="py-4 w-full">
      <div className="relative w-full h-20 bg-white/40 rounded-xl border border-[#ade2d9]/40 p-2 overflow-hidden">
        <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
          
          {/* Clean background guides */}
          <line x1="10" y1="75" x2="190" y2="75" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="10" y1="40" x2="190" y2="40" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="10" y1="10" x2="190" y2="10" stroke="#ade2d9" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

          {/* Smooth isolated drawing path */}
          <motion.path
            d={climbingLinePath}
            fill="none"
            stroke="url(#chartGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isLineInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: 'drop-shadow(0px 4px 6px rgba(56, 148, 140, 0.25))' }}
          />
        </svg>
      </div>

      {/* Synchronized Year Badges */}
      <div className="flex justify-between mt-4 gap-1">
        {['2019', '2021', '2023', '2024'].map((year, i) => (
          <motion.span 
            key={year} 
            initial={{ opacity: 0, y: 10 }}
            animate={isLineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.4 + (i * 0.1), ease: easePremuim }}
            className="text-xs font-semibold text-[#38948c] bg-[#ade2d9]/30 px-3 py-1 rounded-full"
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
    <div className="grid grid-cols-2 gap-3 py-4">
      {slots.map((slot, i) => (
        <motion.div
          key={slot}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
          className="px-3 py-2.5 bg-white shadow-sm border border-[#ade2d9]/60 rounded-xl text-xs text-[#224d4b] text-center font-semibold"
        >
          {slot}
        </motion.div>
      ))}
    </div>
  )
}

// Global gradient template definition for safe reference inside SVGs
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
    <div className="py-4 flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-full h-24 overflow-visible">
        <motion.circle 
          cx="100" cy="50" r="20" fill="#255e5b" 
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, type: 'spring' }}
        />
        <motion.text 
          x="100" y="53" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
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
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
            />
            <motion.circle 
              cx={node.x} cy={node.y} r="12" fill="#f3faf9" stroke="#38948c" strokeWidth="2" 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1, type: 'spring' }}
            />
            <motion.text 
              x={node.x} y={node.y + 2.5} textAnchor="middle" fill="#255e5b" fontSize="6" fontWeight="700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
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
  return (
    <div className="py-4">
      <div className="relative h-4 bg-[#ade2d9]/30 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: '88%' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#255e5b] to-[#7dcbc1] rounded-full"
        />
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="text-xs font-medium text-[#224d4b]/70">Mastery Progress</span>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-sm font-black text-[#255e5b]"
        >
          88%
        </motion.span>
      </div>
    </div>
  )
}

function ProgressTracker({ total, active }: { total: number; active: number }) {
  return (
    <div className="sticky top-32 flex flex-col gap-2 items-start">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })
  const [activeCard, setActiveCard] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f3faf9] overflow-hidden grain-overlay mt-[-48px] rounded-t-[48px] z-20 pb-12 md:pb-20"
    >
      {/* Global gradient setup injected safely into the section tree */}
      <SvgGradients />

      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#ade2d9]/15 via-transparent to-transparent blur-[120px] z-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ade2d9]/20 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#7dcbc1]/15 rounded-full blur-[100px] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-extrabold text-[#0d2626] tracking-tight mb-4 text-balance">
            The Architecture of Top 1% Ranks
          </h2>
        </motion.div>

        <div className="flex gap-8 lg:gap-16">
          <div className="hidden lg:block w-16 flex-shrink-0">
            <ProgressTracker total={scrollStackData.length} active={activeCard} />
          </div>

          <div className="flex-1 w-full max-w-full">
            
            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col gap-6 pb-16">
              {scrollStackData.map((card, index) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: easePremuim, delay: index * 0.08 }}
                    className="bg-white border border-[#ade2d9]/30 shadow-xl rounded-[40px] p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center shadow-md flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#224d4b]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[#224d4b]/70 leading-relaxed mb-6">{card.text}</p>
                    
                    <div className="bg-[#f3faf9]/50 rounded-2xl p-4 border border-[#ade2d9]/20">
                      {card.microUI === 'timeline' && <TimelineMicroUI milestones={card.milestones || []} />}
                      {card.microUI === 'chart' && <ChartMicroUI />}
                      {card.microUI === 'calendar' && <CalendarMicroUI slots={card.slots || []} />}
                      {card.microUI === 'matrix' && <MatrixMicroUI />}
                      {card.microUI === 'progress' && <ProgressMicroUI />}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block" style={{ height: `auto` }}>
              <ScrollStack
                useWindowScroll={true}
                itemDistance={30}
                baseScale={0.85}
                blurAmount={0}
                itemStackDistance={30}
                stackPosition="15%"
              >
                {scrollStackData.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <ScrollStackItem
                      key={card.id}
                      itemClassName="bg-white border border-[#ade2d9]/30 shadow-2xl"
                    >
                      <div
                        className="flex flex-row items-center gap-10 h-full"
                        onMouseEnter={() => setActiveCard(index)}
                      >
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center shadow-md flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#224d4b]">
                              {card.title}
                            </h3>
                          </div>
                          <p className="text-[#224d4b]/80 leading-relaxed text-lg">{card.text}</p>
                        </div>

                        <div className="w-1/2 max-w-[320px] flex-shrink-0 bg-[#f3faf9]/50 rounded-3xl p-6 border border-[#ade2d9]/20">
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
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}