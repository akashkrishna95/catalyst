'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Phone, MessageCircle, ArrowRight, Check, Loader2 } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const achievementData = [
  { name: 'Arun K.', rank: 'AIR 42', exam: 'NEET 2024' },
  { name: 'Sneha M.', rank: 'AIR 156', exam: 'JEE Advanced 2024' },
  { name: 'Vishnu R.', rank: 'State 8', exam: 'KEAM 2024' },
  { name: 'Priya S.', rank: 'AIR 89', exam: 'NEET 2024' },
]

export function AdmissionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    standard: '',
    school: '',
    subject: '',
  })
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Achievement card flip
  const [achievementIndex, setAchievementIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setAchievementIndex((prev) => (prev + 1) % achievementData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Typewriter placeholder
  const placeholders = ['Physics', 'Chemistry', 'Both', 'NEET', 'JEE']
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const currentAchievement = achievementData[achievementIndex]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-[#f3faf9] overflow-hidden grain-overlay"
    >
      {/* Ambient Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ade2d9]/20 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0d2626] tracking-tighter mb-4">
            Your Legacy Starts Here
          </h2>
          <p className="text-lg text-[#224d4b]/70 max-w-2xl mx-auto">
            Enrollment for the upcoming batch is closing soon. Secure your seat and join the Top 1%.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Application Form (Cols 1-7) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-3xl border border-[#ade2d9]/30 rounded-[2.5rem] p-8 lg:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-[#ade2d9] focus:border-[#38948c] text-[#0d2626] placeholder:text-[#38948c]/40 outline-none transition-colors peer"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-3 text-[#38948c]/60 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#38948c]/40 peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#38948c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm">
                    Full Name
                  </label>
                </div>

                {/* Row 2: Phone & Standard */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      pattern="[0-9+\s]+"
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[#ade2d9] focus:border-[#38948c] text-[#0d2626] placeholder:text-[#38948c]/40 outline-none transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[#38948c]/60 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#38948c]/40 peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#38948c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm">
                      Phone Number
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.standard}
                      onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[#ade2d9] focus:border-[#38948c] text-[#0d2626] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Current Standard</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                      <option value="repeater">Repeater</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#38948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: School & Subject */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[#ade2d9] focus:border-[#38948c] text-[#0d2626] placeholder:text-[#38948c]/40 outline-none transition-colors peer"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[#38948c]/60 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#38948c]/40 peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#38948c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm">
                      School Name
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-[#ade2d9] focus:border-[#38948c] text-[#0d2626] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Target Subject</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="both">Both</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[#38948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setConsent(!consent)}
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      consent
                        ? 'bg-[#38948c] border-[#38948c]'
                        : 'bg-transparent border-2 border-[#ade2d9]'
                    }`}
                  >
                    {consent && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-xs text-[#38948c]/60 leading-relaxed">
                    I agree to the Privacy Policy and consent to the use of cookies for a personalized experience.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!consent || isSubmitting || isSubmitted}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all relative overflow-hidden ${
                    isSubmitted
                      ? 'bg-[#38948c]'
                      : 'bg-[#224d4b] hover:bg-[#255e5b] disabled:opacity-60 disabled:cursor-not-allowed'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </motion.div>
                    ) : isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Application Submitted
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Submit Application
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Conversion Cells (Cols 8-12) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Cell A: Batch Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
              className="col-span-2 bg-[#0d2626] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#7dcbc1] text-sm font-medium mb-1">June 2026 Batch</p>
                  <p className="text-white text-3xl font-bold">14 Seats</p>
                  <p className="text-[#7dcbc1]/60 text-sm">remaining</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-sm font-medium">Filling Fast</span>
                </div>
              </div>
            </motion.div>

            {/* Cell B: Google Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.3 }}
              className="bg-white border border-[#ade2d9]/30 rounded-2xl p-5"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[#224d4b] font-bold text-xl">4.9</p>
              <p className="text-[#38948c]/60 text-xs">320 Google reviews</p>
            </motion.div>

            {/* Cell C: WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20CATALYST%20courses"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.35 }}
              className="bg-green-500 hover:bg-green-600 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-colors"
            >
              <MessageCircle className="w-8 h-8 text-white mb-2" />
              <p className="text-white font-semibold text-sm">Chat with us</p>
              <p className="text-white/70 text-xs">Instant reply</p>
            </motion.a>

            {/* Cell D: Achievement Flip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
              className="bg-gradient-to-br from-[#255e5b] to-[#38948c] rounded-2xl p-5 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={achievementIndex}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[#ade2d9]/60 text-xs mb-1">{currentAchievement.exam}</p>
                  <p className="text-white font-bold text-lg">{currentAchievement.name}</p>
                  <p className="text-[#ade2d9] font-semibold">{currentAchievement.rank}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Cell E: Campus Quick Link */}
            <motion.a
              href="https://maps.google.com/?q=CATALYST+Academy+Kollam"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.45 }}
              className="bg-white border border-[#ade2d9]/30 rounded-2xl p-5 hover:-translate-y-1 transition-transform"
            >
              <MapPin className="w-6 h-6 text-[#38948c] mb-2" />
              <p className="text-[#224d4b] font-semibold text-sm">Kadappakada</p>
              <p className="text-[#38948c]/60 text-xs">View on Maps →</p>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] bg-[#0d2626] text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#38948c] flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Application Received!</p>
                <p className="text-[#7dcbc1] text-sm">{"We'll"} call you within 24 hours.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
