'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, User, Phone, ArrowUpRight } from 'lucide-react'

const easePremium = [0.16, 1, 0.3, 1]

type ContactMode = 'whatsapp' | 'phone' | null

const contacts = [
  {
    name: 'Mr. Arun Nath R.',
    phone: '+919895668184',
    displayPhone: '+91 98956 68184',
  },
  {
    name: 'Mr. Hasheersha S.',
    phone: '+919895875221',
    displayPhone: '+91 98958 75221',
  },
]

// WhatsApp Floating Button
export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasWobbled, setHasWobbled] = useState(false)
  const [contactMode, setContactMode] = useState<ContactMode>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setHasWobbled(true)
    }, 5000) // Lowered to 5 seconds so you can see it

    return () => clearTimeout(timer)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = contactMode ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [contactMode])

  const getHref = (phone: string) => {
    if (contactMode === 'whatsapp') {
      const cleanPhone = phone.replace('+', '')
      return `https://wa.me/${cleanPhone}?text=Hi%2C%20I%27m%20interested%20in%20CATALYST%20courses`
    }
    return `tel:${phone}`
  }

  return (
    <>
      {/* Original Floating Button UI (Untouched visual design) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 z-40 sm:z-30">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-14 sm:bottom-16 right-0 bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-[#224d4b] whitespace-nowrap border border-[#ade2d9]/30"
            >
              Need help choosing? Chat now
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(false)
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-[#0d2626] text-white rounded-full flex items-center justify-center text-xs hover:bg-[#255e5b] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Changed from <motion.a> to <motion.button> to trigger the popup */}
        <motion.button
          onClick={() => {
            setContactMode('whatsapp')
            setShowTooltip(false)
          }}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all outline-none ${
            hasWobbled ? 'animate-none' : ''
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={hasWobbled ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.062-1.11l-.29-.178-3.012.79.805-2.935-.195-.31A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
        </motion.button>
      </div>

      {/* ── NEW CONTACT SELECTION MODAL ── */}
      <AnimatePresence>
        {contactMode && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-5 antialiased"
          >
            <div 
              className="absolute inset-0 bg-[#0d2626]/70 backdrop-blur-md cursor-pointer" 
              onClick={() => setContactMode(null)} 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative bg-white rounded-[2rem] max-w-sm sm:max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden z-10"
            >
              {/* Tightened Header */}
              <div className="p-5 sm:p-8 pb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0d2626] font-[family-name:var(--font-display)] leading-tight">
                    {contactMode === 'whatsapp' ? 'WhatsApp Faculty' : 'Call Faculty'}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-[#224d4b]/60 font-medium mt-1">Select a director below</p>
                </div>
                <button 
                  onClick={() => setContactMode(null)} 
                  className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Compact Grid */}
              <div className="p-4 sm:p-8 pt-2 grid grid-cols-2 gap-3 sm:gap-4 bg-[#fcfdfd]">
                {contacts.map((contact, index) => (
                  <a 
                    key={index} 
                    href={getHref(contact.phone)} 
                    target={contactMode === 'whatsapp' ? '_blank' : undefined} 
                    rel={contactMode === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    onClick={() => setContactMode(null)}
                    className="relative bg-white border border-[#ade2d9]/40 rounded-2xl p-4 sm:p-5 hover:border-[#38948c]/60 hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#f3faf9] border border-[#ade2d9]/50 rounded-full flex items-center justify-center text-[#38948c] group-hover:bg-[#255e5b] group-hover:text-white transition-all mb-2 sm:mb-3">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <p className="font-bold text-[#0d2626] text-[13px] sm:text-[15px] font-[family-name:var(--font-display)] leading-tight">
                      {contact.name}
                    </p>
                    <div className="hidden sm:flex items-center gap-1.5 mt-1.5 text-[#224d4b]/60 text-xs group-hover:text-[#255e5b] transition-colors">
                      {contactMode === 'whatsapp' ? (
                        <MessageCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Phone className="w-3.5 h-3.5" />
                      )}
                      <p className="font-semibold tracking-wide">{contact.displayPhone}</p>
                    </div>
                    <ArrowUpRight className="absolute top-2 right-2 w-3.5 h-3.5 text-[#ade2d9] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Exit Intent Popup - Mobile Responsive
export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasClosed, setHasClosed] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (hasClosed) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasClosed) {
        setIsVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasClosed])

  const handleClose = () => {
    setIsVisible(false)
    setHasClosed(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    handleClose()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 100 }}
            transition={{ ease: easePremium }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-none"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 flex items-center justify-center text-[#224d4b]/60 hover:text-[#224d4b] hover:bg-[#f3faf9] rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Drag Handle for Mobile */}
            <div className="sm:hidden flex justify-center pt-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="bg-gradient-to-br from-[#255e5b] to-[#38948c] p-6 sm:p-8 text-white">
              <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold mb-2">
                Before you go...
              </h3>
              <p className="text-white/80 text-sm">
                Download our 2024 Result Report and see why 6000+ students trust CATALYST
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-[#f3faf9] border-2 border-transparent focus:border-[#38948c] rounded-xl text-[#224d4b] placeholder:text-[#38948c]/50 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#255e5b] to-[#2b7671] hover:from-[#2b7671] hover:to-[#38948c] text-white font-semibold rounded-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Get Free Report'}
                </button>
              </div>
              <p className="text-center text-xs text-[#38948c]/60 mt-4">
                No spam. We respect your privacy.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Sticky Enquiry Widget (Appears in Courses Section) - Mobile Responsive
export function StickyEnquiryWidget({ isVisible }: { isVisible: boolean }) {
  const [isOpen, setIsOpen] = useState(true)
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isVisible || !isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setTimeout(() => setIsOpen(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ ease: easePremium }}
        className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-6 z-50 sm:w-80 bg-[#ade2d9] rounded-t-2xl sm:rounded-t-2xl sm:rounded-b-none shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-[#0d2626]/60 hover:text-[#0d2626] hover:bg-white/30 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4 sm:p-5">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-[#255e5b] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#0d2626] font-medium">{"We'll call you soon!"}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-[#0d2626]" />
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[#0d2626]">
                  Quick Enquiry?
                </h4>
              </div>
              <p className="text-sm text-[#0d2626]/70 mb-4">
                Drop your number and {"we'll"} call you back
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  pattern="[0-9+\s]+"
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-transparent focus:border-[#255e5b] rounded-xl text-[#0d2626] placeholder:text-[#0d2626]/40 outline-none transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-12 h-12 bg-[#0d2626] hover:bg-[#224d4b] text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}