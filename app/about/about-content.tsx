'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, Users, BookOpen, Target, Heart } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const milestones = [
  { year: '2006', event: 'CATALYST founded in Kollam with 15 students', icon: GraduationCap },
  { year: '2010', event: 'First batch of IIT selections achieved', icon: Award },
  { year: '2015', event: 'Expanded to second campus at Chinnakada', icon: Users },
  { year: '2019', event: 'Launched digital learning platform', icon: BookOpen },
  { year: '2022', event: 'Crossed 5000+ alumni milestone', icon: Target },
  { year: '2024', event: 'AIR 42 NEET - highest rank in institute history', icon: Award },
]

const values = [
  {
    title: 'Conceptual Clarity',
    description: 'We believe in building strong foundations. Every concept is taught with the "why" before the "how".',
    icon: BookOpen,
  },
  {
    title: 'Individual Attention',
    description: 'With strict batch sizes of 25-30, we ensure every student gets personalized guidance.',
    icon: Users,
  },
  {
    title: 'Result Orientation',
    description: 'Our teaching methodology is reverse-engineered from exam patterns to maximize success rates.',
    icon: Target,
  },
  {
    title: 'Student Wellbeing',
    description: 'Academic pressure is balanced with mental health support and stress management sessions.',
    icon: Heart,
  },
]

export function AboutContent() {
  const heroRef = useRef<HTMLElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const timelineRef = useRef<HTMLElement>(null)
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 })
  const valuesRef = useRef<HTMLElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 })

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] bg-[#fcfdfd] pt-32 pb-24 overflow-hidden grain-overlay"
      >
        <div className="absolute inset-0 academic-grid opacity-20" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim }}
            className="inline-block px-4 py-2 text-xs font-medium tracking-widest uppercase bg-[#ade2d9]/20 border border-[#ade2d9] text-[#255e5b] rounded-full mb-6"
          >
            Est. 2006 · Kollam, Kerala
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d2626] tracking-tight leading-[1.1] mb-6"
          >
            Transforming Effort into{' '}
            <span className="font-[family-name:var(--font-accent)] italic text-transparent bg-clip-text bg-gradient-to-r from-[#255e5b] to-[#38948c]">
              Excellence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
            className="text-lg text-[#224d4b]/70 max-w-3xl mx-auto leading-relaxed"
          >
            For nearly two decades, CATALYST has been the launchpad for {"Kerala's"} brightest minds. 
            We {"don't"} just teach Physics and Chemistry – we ignite a passion for understanding 
            the fundamental laws that govern our universe.
          </motion.p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-[#f3faf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easePremuim }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[#0d2626] tracking-tight mb-6">
                The Vision Behind CATALYST
              </h2>
              <div className="space-y-4 text-[#224d4b]/70 leading-relaxed">
                <p>
                  CATALYST was born from a simple observation: students {"weren't"} struggling because 
                  they {"weren't"} smart enough. They were struggling because traditional coaching 
                  prioritized rote learning over genuine understanding.
                </p>
                <p>
                  Our founders, both decorated educators with decades of experience, set out to 
                  create something different – an institution where curiosity is celebrated, 
                  questions are encouraged, and every student is guided to discover their own 
                  path to academic excellence.
                </p>
                <p>
                  Today, with two state-of-the-art campuses and a digital platform reaching 
                  students across Kerala, we continue to honor that founding vision: to be 
                  the catalyst that transforms hard work into remarkable results.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#255e5b] to-[#38948c] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Since 2006</p>
                    <p className="text-white text-4xl font-bold">6000+</p>
                    <p className="text-white/70">Students Mentored</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        ref={timelineRef}
        className="py-24 bg-[#0d2626]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim }}
            className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-white text-center mb-16"
          >
            Our Journey
          </motion.h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-[#38948c]/30" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: easePremuim, delay: index * 0.1 }}
                    className={`relative flex items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 lg:left-1/2 w-3 h-3 -translate-x-1/2 bg-[#7dcbc1] rounded-full shadow-[0_0_10px_#7dcbc1]" />
                    
                    {/* Content */}
                    <div className={`flex-1 pl-12 lg:pl-0 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                      <span className="text-[#7dcbc1] font-bold text-xl">{milestone.year}</span>
                      <p className="text-white/70 mt-1">{milestone.event}</p>
                    </div>
                    
                    <div className="hidden lg:flex w-12 h-12 rounded-xl bg-[#38948c]/20 items-center justify-center">
                      <Icon className="w-6 h-6 text-[#7dcbc1]" />
                    </div>
                    
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        ref={valuesRef}
        className="py-24 bg-[#fcfdfd] grain-overlay"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim }}
            className="text-center mb-16"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[#0d2626] tracking-tight mb-4">
              What We Stand For
            </h2>
            <p className="text-[#224d4b]/70 max-w-2xl mx-auto">
              Our core values guide every decision we make, from curriculum design to student interaction.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: easePremuim, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl border border-[#ade2d9]/30 rounded-2xl p-6 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#255e5b] to-[#38948c] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#224d4b] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#224d4b]/60 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
