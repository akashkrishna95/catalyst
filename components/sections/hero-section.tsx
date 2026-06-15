'use client'

import { useRef, useEffect, Suspense } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import DotField from '@/components/dot-field'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
})

const easePremuim = [0.16, 1, 0.3, 1]

const trustItems = [
  '42 AIR NEET',
  '6000+ Alumni',
  '18 Years Excellence',
  '98% Distinction Rate',
  'Top 100 AIRs',
  '75K+ Grants Secured',
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const scrollToCourses = () =>
    document.getElementById('digital-academy')?.scrollIntoView({ behavior: 'smooth' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremuim } },
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col min-h-[100svh] w-full bg-[#ade2d9] overflow-x-hidden overflow-y-hidden z-10 mb-[-60px] pb-[60px] rounded-b-[48px] shadow-[0_30px_100px_-20px_rgba(13,38,38,0.12)]"
    >
      {/* ── DotField: behind everything ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={0}
          glowRadius={0}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(56, 148, 140, 0.5)"
          gradientTo="rgba(37, 94, 91, 0.3)"
        />
      </div>

      {/* ── Mobile: Spline as full-cover absolute background ── */}
      <div
        className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150%',
            height: '150%',
            opacity: 0.45,
          }}
        >
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/2xWDt7YiiKCA5uTT/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-50 lg:mt-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full py-8 lg:py-0">

          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-7 relative z-20 w-full min-w-0"
          >
            {/* REMOVED overflow-hidden from this div so the shadow stops clipping */}
            <div className="w-full min-w-0 lg:backdrop-blur-none lg:bg-transparent lg:border-transparent space-y-5 lg:space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">

              {/* H1 */}
              <motion.h1
                variants={itemVariants}
                className="font-[family-name:var(--font-display)] text-4xl leading-[1.2] xs:text-5xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d2626] tracking-tight break-words"
              >
                Are your Results <span className="underline decoration-[#e7173c] decoration-[px] underline-offset-[8px]">matching</span> your{' '}
                <span className="font-[family-name:var(--font-accent)] italic text-transparent bg-clip-text bg-gradient-to-r from-[#e7173c] to-[#c30d32]">
                  effort?
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg lg:text-xl text-[#0d2626]/80 leading-relaxed max-w-2xl"
              >
                18+ Years of Excellence in Physics &amp; Chemistry Coaching, Kollam.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex gap-2 sm:gap-4 w-full justify-center lg:justify-start pt-8 md:pt-16 sm:flex-row"
              >
                <button
                  onClick={scrollToContact}
                  className="relative group px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#255e5b] to-[#2b7671] hover:from-[#2b7671] hover:to-[#38948c] text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-[0_8px_20px_rgba(37,94,91,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 overflow-hidden text-xs sm:text-sm whitespace-nowrap z-10"
                >
                  <span className="relative z-10">Secure Your Batch</span>
                  {/* Clean sweeping shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none" />
                </button>

                <button
                  onClick={scrollToCourses}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-[#255e5b] text-[#255e5b] font-medium rounded-lg sm:rounded-xl hover:bg-[#255e5b]/10 transition-colors text-xs sm:text-sm whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  Watch Lecture
                </button>
              </motion.div>

              {/* Trust Ticker */}
              <motion.div variants={itemVariants} className="relative w-full overflow-hidden py-1">
                <div className="flex gap-8 marquee-track">
                  {[...trustItems, ...trustItems].map((item, i) => (
                    <span
                      key={i}
                      className="flex-shrink-0 text-xs sm:text-sm font-medium text-[#255e5b]/80 whitespace-nowrap"
                    >
                      {item} •
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column — Spline (desktop only) */}
          <div
            className="lg:col-span-5 hidden lg:block"
            style={{
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1.6 } : {}}
              transition={{ duration: 0.8, ease: easePremuim, delay: 0.3 }}
              className="relative aspect-square lg:aspect-[4/5] w-full max-w-xl mx-auto"
            >
              <Suspense fallback={null}>
                <Spline
                  scene="https://prod.spline.design/2xWDt7YiiKCA5uTT/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}