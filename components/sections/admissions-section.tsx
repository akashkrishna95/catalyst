'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, MapPin, MessageCircle, ArrowRight, Check, Loader2, ChevronDown, X } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const achievementData = [
  { name: 'Arun K.', rank: 'AIR 42', exam: 'NEET 2024' },
  { name: 'Sneha M.', rank: 'AIR 156', exam: 'JEE Advanced 2024' },
  { name: 'Vishnu R.', rank: 'State 8', exam: 'KEAM 2024' },
  { name: 'Priya S.', rank: 'AIR 89', exam: 'NEET 2024' },
]

const locationData = [
  {
    name: 'Kadappakada',
    url: 'https://maps.google.com/?q=Kadappakada,+Kollam',
    bg: 'bg-white',
    border: 'border-[#ade2d9]/30',
    text: 'text-[#224d4b]',
    icon: 'text-[#38948c]',
    sub: 'text-[#38948c]/70',
  },
  {
    name: 'Chinnakada',
    url: 'https://maps.google.com/?q=Chinnakada,+Kollam',
    bg: 'bg-gradient-to-br from-[#255e5b] to-[#38948c]',
    border: 'border-transparent',
    text: 'text-white',
    icon: 'text-[#ade2d9]',
    sub: 'text-[#ade2d9]/80',
  },
]

const subjectOptions = ['Physics', 'Chemistry', 'Maths', 'Biology', 'Social Science', 'English', 'Science']
const entranceOptions = ['NEET', 'JEE', 'IIT', 'IISER', 'CUET', 'KEAM', 'NDA']

const countryCodes = [
  { code: '+91', flag: '🇮🇳' },
  { code: '+971', flag: '🇦🇪' },
  { code: '+966', flag: '🇸🇦' },
  { code: '+1', flag: '🇺🇸' },
  { code: 'Other', flag: '🌍' },
]

// ── Custom Country Select Component ─────────────
function CountrySelectDropdown({ 
  value, 
  onChange, 
  options,
  hasError
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: { code: string; flag: string }[];
  hasError?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOpt = options.find(o => o.code === value) || options[0]

  return (
    <div ref={selectRef} className={`relative z-40 flex items-center justify-between w-[4.8rem] pr-2 mr-2 border-r cursor-pointer ${hasError ? 'border-red-400' : 'border-[#ade2d9]'}`} onClick={() => setIsOpen(!isOpen)}>
      <span className="text-sm font-medium text-[#0d2626] flex items-center gap-1.5">
        <span>{selectedOpt.flag}</span>
        <span>{selectedOpt.code}</span>
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown className={`w-3.5 h-3.5 ${hasError ? 'text-red-400' : 'text-[#38948c]'}`} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[130%] left-0 w-[110px] bg-white/95 backdrop-blur-3xl border border-[#ade2d9]/50 rounded-xl shadow-[0_10px_30px_-10px_rgba(13,38,38,0.2)] overflow-hidden z-50 py-1"
          >
            {options.map((opt) => (
              <div
                key={opt.code}
                onClick={(e) => { e.stopPropagation(); onChange(opt.code); setIsOpen(false); }}
                className={`px-3 py-2 cursor-pointer transition-colors text-xs font-medium m-1 rounded-lg flex items-center gap-2 ${
                  value === opt.code ? 'bg-[#ade2d9]/40 text-[#255e5b]' : 'text-[#224d4b] hover:bg-[#f3faf9]'
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.code}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Single Select Component ─────────────
function PremiumSelect({ 
  value, 
  onChange, 
  options, 
  label,
  error
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: { label: string; value: string }[]; 
  label: string;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={selectRef} className="relative w-full z-30">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          value || isOpen 
            ? `top-0 text-[11px] font-semibold tracking-wide ${error ? 'text-red-500' : 'text-[#38948c]'}` 
            : `top-2.5 text-sm ${error ? 'text-red-400' : 'text-[#38948c]/60'}`
        }`}
      >
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-0 pt-4 pb-1.5 bg-transparent border-b-2 text-[#0d2626] text-sm outline-none transition-colors cursor-pointer flex justify-between items-center min-h-[2.5rem]"
        style={{ borderColor: error ? '#f87171' : (isOpen ? '#38948c' : '#ade2d9') }}
      >
        <span className="truncate h-5 block text-[#0d2626]">
          {value ? options.find(o => o.value === value)?.label : "\u00A0"}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className={`w-4 h-4 flex-shrink-0 ${error ? 'text-red-400' : 'text-[#38948c]'}`} />
        </motion.div>
      </div>

      {error && <span className="absolute left-0 -bottom-4 text-[10px] font-medium text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[105%] left-0 w-full bg-white/95 backdrop-blur-3xl border border-[#ade2d9]/50 rounded-xl shadow-[0_10px_30px_-10px_rgba(13,38,38,0.2)] overflow-y-auto max-h-48 z-50 py-1"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`px-3 py-2 cursor-pointer transition-colors text-xs font-medium m-1 rounded-lg ${
                  value === opt.value ? 'bg-[#ade2d9]/40 text-[#255e5b]' : 'text-[#224d4b] hover:bg-[#f3faf9]'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Multi-Select Component ─────────────
function MultiSelectDropdown({ 
  label, 
  options, 
  selected, 
  toggleOption,
  error
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  toggleOption: (val: string) => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={selectRef} className="relative w-full z-20">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          selected.length > 0 || isOpen 
            ? `top-0 text-[11px] font-semibold tracking-wide ${error ? 'text-red-500' : 'text-[#38948c]'}` 
            : `top-2.5 text-sm ${error ? 'text-red-400' : 'text-[#38948c]/60'}`
        }`}
      >
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-0 pt-4 pb-2 bg-transparent border-b-2 text-[#0d2626] outline-none transition-colors cursor-pointer flex justify-between items-end min-h-[2.5rem]"
        style={{ borderColor: error ? '#f87171' : (isOpen ? '#38948c' : '#ade2d9') }}
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1 pr-3">
          {selected.length === 0 && <span className="h-4 block select-none">&nbsp;</span>}
          {selected.map((item) => (
            <span 
              key={item} 
              onClick={(e) => { e.stopPropagation(); toggleOption(item); }}
              className="flex items-center gap-1 px-2 py-0.5 bg-[#255e5b] text-white text-[10px] font-medium rounded-full shadow-sm hover:bg-[#e7173c] transition-colors"
            >
              {item}
              <X className="w-2.5 h-2.5" />
            </span>
          ))}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="mb-0.5">
          <ChevronDown className={`w-4 h-4 flex-shrink-0 ${error ? 'text-red-400' : 'text-[#38948c]'}`} />
        </motion.div>
      </div>

      {error && <span className="absolute left-0 -bottom-4 text-[10px] font-medium text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[105%] left-0 w-full bg-white/95 backdrop-blur-3xl border border-[#ade2d9]/50 rounded-xl shadow-[0_10px_30px_-10px_rgba(13,38,38,0.2)] overflow-y-auto max-h-48 z-50 py-1"
          >
            {options.map((opt) => {
              const isSelected = selected.includes(opt)
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors text-xs font-medium m-1 rounded-lg ${
                    isSelected ? 'bg-[#ade2d9]/40 text-[#255e5b]' : 'text-[#224d4b] hover:bg-[#f3faf9]'
                  }`}
                >
                  {opt}
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Section Component ────────────────────────────────────────────────────────
export function AdmissionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const [formData, setFormData] = useState<{
    name: string;
    countryCode: string;
    phone: string;
    standard: string;
    school: string;
    subjects: string[];
    entrances: string[];
  }>({
    name: '',
    countryCode: '+91',
    phone: '',
    standard: '',
    school: '',
    subjects: [],
    entrances: [],
  })

  // State to track inline validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    standard?: string;
    school?: string;
    courses?: string;
  }>({})
  
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const [achievementIndex, setAchievementIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setAchievementIndex((prev) => (prev + 1) % achievementData.length), 4000)
    return () => clearInterval(interval)
  }, [])

  const [locationIndex, setLocationIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setLocationIndex((prev) => (prev + 1) % locationData.length), 5000) 
    return () => clearInterval(interval)
  }, [])

  const toggleArrayItem = (field: 'subjects' | 'entrances', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter((i) => i !== item) 
        : [...prev[field], item]
    }))
    if (errors.courses) setErrors(prev => ({ ...prev, courses: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return

    // ── Inline Validation Logic ──
    const newErrors: any = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.phone.trim() || formData.phone.length < 5) newErrors.phone = "Valid phone is required"
    if (!formData.standard) newErrors.standard = "Standard is required"
    if (!formData.school.trim()) newErrors.school = "School name is required"
    
    if (formData.subjects.length === 0 && formData.entrances.length === 0) {
      newErrors.courses = "Select at least one option"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const combinedCourses = [...formData.subjects, ...formData.entrances].join(', ')
    const fullPhone = `${formData.countryCode} ${formData.phone}`

    const submitData = {
      type: 'admissions',
      name: formData.name,
      phone: fullPhone,
      standard: formData.standard,
      school: formData.school,
      subject: combinedCourses
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Submitting to backend:", submitData)
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setShowToast(true)
    setErrors({})
    setTimeout(() => setShowToast(false), 5000)
  }

  const currentAchievement = achievementData[achievementIndex]
  const currentLocation = locationData[locationIndex]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-24 bg-[#f3faf9] overflow-hidden grain-overlay"
    >
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ade2d9]/20 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim }}
          className="text-center mb-10 lg:mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2626] tracking-tight mb-3">
            Your Legacy Starts Here
          </h2>
          <p className="text-base text-[#224d4b]/70 max-w-2xl mx-auto">
            Enrollment for the upcoming batch is closing soon. Secure your seat and join the Top 1%.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* Left Column - Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white/80 backdrop-blur-3xl border border-[#ade2d9]/30 rounded-[2rem] p-6 lg:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                
                {/* Row 1: Name */}
                <div className="relative w-full z-10">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                    }}
                    className={`w-full px-0 pt-4 pb-1.5 bg-transparent border-b-2 text-[#0d2626] text-sm placeholder:text-transparent outline-none transition-colors peer ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#ade2d9] focus:border-[#38948c]'
                    }`}
                    placeholder=" "
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-semibold ${
                    formData.name || errors.name 
                      ? `top-0 text-[11px] font-semibold ${errors.name ? 'text-red-500' : 'text-[#38948c]'}` 
                      : `top-2.5 text-sm ${errors.name ? 'text-red-400' : 'text-[#38948c]/60'}`
                  }`}>
                    Full Name *
                  </label>
                  {errors.name && <span className="absolute left-0 -bottom-4 text-[10px] font-medium text-red-500">{errors.name}</span>}
                </div>

                {/* Row 2: Phone & Standard */}
                <div className="grid sm:grid-cols-2 gap-4 relative z-30">
                  
                  {/* Phone Input */}
                  <div className="relative w-full z-30">
                    <label className={`absolute left-[5.8rem] transition-all duration-300 pointer-events-none z-10 peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-semibold ${
                      formData.phone || errors.phone
                        ? `top-0 text-[11px] font-semibold ${errors.phone ? 'text-red-500' : 'text-[#38948c]'}` 
                        : `top-2.5 text-sm ${errors.phone ? 'text-red-400' : 'text-[#38948c]/60'}`
                    }`}>
                      Phone Number *
                    </label>
                    <div className={`w-full px-0 pt-4 pb-1.5 bg-transparent border-b-2 transition-colors flex items-center min-h-[2.5rem] ${
                      errors.phone ? 'border-red-400 focus-within:border-red-500' : 'border-[#ade2d9] focus-within:border-[#38948c]'
                    }`}>
                      <CountrySelectDropdown
                        value={formData.countryCode}
                        onChange={(val) => setFormData({ ...formData, countryCode: val })}
                        options={countryCodes}
                        hasError={!!errors.phone}
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                        }}
                        className="flex-1 w-full bg-transparent text-[#0d2626] text-sm outline-none peer"
                        placeholder=" "
                      />
                    </div>
                    {errors.phone && <span className="absolute left-0 -bottom-4 text-[10px] font-medium text-red-500">{errors.phone}</span>}
                  </div>
                  
                  {/* Standard Dropdown */}
                  <PremiumSelect
                    label="Current Standard *"
                    value={formData.standard}
                    error={errors.standard}
                    onChange={(val) => {
                      setFormData({ ...formData, standard: val })
                      if (errors.standard) setErrors(prev => ({ ...prev, standard: undefined }))
                    }}
                    options={[
                      { label: 'Class 11', value: '11' },
                      { label: 'Class 12', value: '12' },
                      { label: 'Entrance Aspirant', value: 'entrance_aspirant' },
                      { label: 'Repeater', value: 'repeater' },
                    ]}
                  />
                </div>

                {/* Row 3: School Name */}
                <div className="relative w-full z-10">
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => {
                      setFormData({ ...formData, school: e.target.value })
                      if (errors.school) setErrors(prev => ({ ...prev, school: undefined }))
                    }}
                    className={`w-full px-0 pt-4 pb-1.5 bg-transparent border-b-2 text-[#0d2626] text-sm placeholder:text-transparent outline-none transition-colors peer ${
                      errors.school ? 'border-red-400 focus:border-red-500' : 'border-[#ade2d9] focus:border-[#38948c]'
                    }`}
                    placeholder=" "
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-semibold ${
                    formData.school || errors.school 
                      ? `top-0 text-[11px] font-semibold ${errors.school ? 'text-red-500' : 'text-[#38948c]'}` 
                      : `top-2.5 text-sm ${errors.school ? 'text-red-400' : 'text-[#38948c]/60'}`
                  }`}>
                    School Name *
                  </label>
                  {errors.school && <span className="absolute left-0 -bottom-4 text-[10px] font-medium text-red-500">{errors.school}</span>}
                </div>

                {/* Row 4: Multi-Select Grids */}
                <div className="grid sm:grid-cols-2 gap-4 relative z-20">
                  <MultiSelectDropdown
                    label="Target Subject(s) *"
                    options={subjectOptions}
                    selected={formData.subjects}
                    error={errors.courses}
                    toggleOption={(val) => toggleArrayItem('subjects', val)}
                  />
                  <MultiSelectDropdown
                    label="Entrance Exams (Optional)"
                    options={entranceOptions}
                    selected={formData.entrances}
                    toggleOption={(val) => toggleArrayItem('entrances', val)}
                  />
                </div>

                {/* Tightened Submit Area */}
                <div>
                  <div className="flex items-start gap-3 pt-3 pb-4 border-t border-[#ade2d9]/30">
                    <button
                      type="button"
                      onClick={() => setConsent(!consent)}
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        consent ? 'bg-[#38948c] border-[#38948c]' : 'bg-transparent border-2 border-[#ade2d9]'
                      }`}
                    >
                      {consent && <Check className="w-2.5 h-2.5 text-white" />}
                    </button>
                    <p className="text-[11px] text-[#38948c]/80 leading-relaxed">
                      I agree to the <a href="/privacy" target="_blank" className="font-semibold text-[#255e5b] hover:text-[#38948c] underline underline-offset-2 transition-colors">Privacy Policy</a> and consent to the use of <a href="/cookies" target="_blank" className="font-semibold text-[#255e5b] hover:text-[#38948c] underline underline-offset-2 transition-colors">cookies</a>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!consent || isSubmitting || isSubmitted}
                    className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all relative overflow-hidden ${
                      isSubmitted ? 'bg-[#38948c]' : 'bg-[#224d4b] hover:bg-[#255e5b] disabled:opacity-60 disabled:cursor-not-allowed'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </motion.div>
                      ) : isSubmitted ? (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Application Submitted
                        </motion.div>
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                          Submit Application <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Column - NATURAL SIZING */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Cell A */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
              className="col-span-2 bg-[#0d2626] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#7dcbc1] text-sm font-medium mb-1">June 2026 Batch</p>
                  <p className="text-white text-3xl sm:text-4xl font-bold">14 Seats</p>
                  <p className="text-[#7dcbc1]/60 text-sm mt-0.5">remaining</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-sm font-medium">Filling Fast</span>
                </div>
              </div>
            </motion.div>

            {/* Cell B */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.3 }}
              className="col-span-1 bg-white border border-[#ade2d9]/30 rounded-2xl p-5"
            >
              <div className="flex items-center gap-1 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[#224d4b] font-bold text-2xl">4.9</p>
              <p className="text-[#38948c]/60 text-xs mt-0.5">320 Google reviews</p>
            </motion.div>

            {/* Cell C */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.35 }}
              className="col-span-1 bg-green-500 hover:bg-green-600 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-colors"
            >
              <MessageCircle className="w-8 h-8 text-white mb-2" />
              <p className="text-white font-semibold text-sm">Chat with us</p>
            </motion.a>

            {/* Cell D */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
              className="col-span-1 bg-gradient-to-br from-[#255e5b] to-[#38948c] rounded-2xl p-5 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div key={achievementIndex} initial={{ opacity: 0, rotateX: -90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 90 }} transition={{ duration: 0.4 }}>
                  <p className="text-[#ade2d9]/60 text-xs mb-1">{currentAchievement.exam}</p>
                  <p className="text-white font-bold text-lg">{currentAchievement.name}</p>
                  <p className="text-[#ade2d9] font-semibold text-sm mt-0.5">{currentAchievement.rank}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Cell E */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremuim, delay: 0.45 }}
              className="col-span-1 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              onClick={() => setLocationIndex((prev) => (prev + 1) % locationData.length)}
              style={{ perspective: 1000 }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={locationIndex} initial={{ opacity: 0, rotateX: -90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 90 }} transition={{ duration: 0.4 }} className={`h-full border flex flex-col justify-center rounded-2xl p-5 transition-colors duration-300 ${currentLocation.bg} ${currentLocation.border}`}>
                  <MapPin className={`w-6 h-6 mb-2 transition-colors duration-300 ${currentLocation.icon}`} />
                  <p className={`font-semibold text-sm transition-colors duration-300 ${currentLocation.text}`}>{currentLocation.name}</p>
                  <a href={currentLocation.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`block mt-1 text-xs hover:underline transition-colors duration-300 relative z-10 ${currentLocation.sub}`}>
                    View on Maps →
                  </a>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 50, x: '-50%' }} className="fixed bottom-8 left-1/2 z-[100] bg-[#0d2626] text-white px-5 py-3 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#38948c] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Application Received!</p>
                <p className="text-[#7dcbc1] text-xs">We'll call you within 24 hours.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}