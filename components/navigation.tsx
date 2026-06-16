'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, BookOpen, ChevronDown, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'

// --- DATA ---
const navLinks = [
  {
    href: '/',
    label: 'Home',
    sections: [
      { label: 'Start Here', href: '/#hero' },
      { label: 'Faculty', href: '/#faculty' },
      { label: 'Results', href: '/#results' },
      { label: 'Why Choose Us', href: '/#why-choose-us' },
    ],
  },
  {
    href: '/about',
    label: 'About',
    sections: [
      { label: 'Our Story', href: '/about#story' },
      { label: 'Mission', href: '/about#mission' },
      { label: 'Team', href: '/about#team' },
    ],
  },
  {
    href: '/courses',
    label: 'Courses',
    sections: [
      { label: 'NEET', href: '/courses#neet' },
      { label: 'JEE', href: '/courses#jee' },
      { label: 'KEAM', href: '/courses#keam' },
      { label: 'Foundation', href: '/courses#foundation' },
    ],
  },
  {
    href: '/#contact',
    label: 'Contact',
    sections: [],
  },
]

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

const easePremium = [0.16, 1, 0.3, 1]

type ContactMode = 'whatsapp' | 'phone' | null

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const [hasPurchasedCourse] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTutor] = useState(false)
  
  const [contactMode, setContactMode] = useState<ContactMode>(null)
  
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
      setActiveDropdown(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || contactMode) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen, contactMode])

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const getHref = (phone: string) => {
    if (contactMode === 'whatsapp') {
      const cleanPhone = phone.replace('+', '')
      return `https://wa.me/${cleanPhone}?text=Hi%2C%20I%27m%20interested%20in%20CATALYST%20courses`
    }
    return `tel:${phone}`
  }

  return (
    <>
      {/* ── PILL NAVBAR ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easePremium }}
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${
          isScrolled
            ? 'bg-white/60 shadow-[0_8px_32px_rgba(13,38,38,0.12),inset_0_0_0_1px_rgba(255,255,255,0.5)]'
            : 'bg-white/40 shadow-[0_4px_24px_rgba(13,38,38,0.08),inset_0_0_0_1px_rgba(255,255,255,0.3)]'
        } backdrop-blur-2xl border border-white/30 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3`}
      >
        <div className="flex items-center justify-between">
          <button onClick={handleLogoClick} className="flex items-center group cursor-pointer">
            <img 
              src="https://res.cloudinary.com/dp2r068c8/image/upload/v1781361635/CATALYST_STUDY_CENTRE_logo_qoaqxh.svg" 
              alt="Catalyst Logo" 
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.sections.length > 0 && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  onClick={link.href === '/#contact' ? handleContactClick : undefined}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all rounded-full font-[family-name:var(--font-display)] ${
                    pathname === link.href
                      ? 'text-[#38948c] bg-[#ade2d9]/30'
                      : 'text-[#224d4b] hover:text-[#38948c] hover:bg-[#ade2d9]/20'
                  }`}
                >
                  {link.label}
                  {link.sections.length > 0 && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                <AnimatePresence>
                  {activeDropdown === link.label && link.sections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 rounded-2xl overflow-hidden border border-white/40 shadow-xl bg-white/90 backdrop-blur-xl p-1.5"
                    >
                      {link.sections.map((section) => (
                        <Link
                          key={section.href}
                          href={section.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-medium text-[#224d4b] hover:text-[#38948c] hover:bg-[#ade2d9]/20 rounded-xl transition-colors font-[family-name:var(--font-display)]"
                        >
                          {section.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setIsUserMenuOpen(!isUserMenuOpen); }}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0d2626] text-white hover:bg-[#224d4b] transition-all"
              >
                <User className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#224d4b] hover:bg-[#ade2d9]/20 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0d2626]/40 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.4, ease: easePremium }}
              className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-2xl border-b border-[#ade2d9]/40 shadow-2xl rounded-b-3xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <img src="https://res.cloudinary.com/dp2r068c8/image/upload/v1781361635/CATALYST_STUDY_CENTRE_logo_qoaqxh.svg" alt="Catalyst Logo" className="h-9 w-auto" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full text-[#224d4b] hover:bg-[#ade2d9]/20"><X className="w-5 h-5" /></button>
              </div>
              <div className="mx-5 h-px bg-[#ade2d9]/40" />
              <nav className="flex flex-col gap-1 px-5 pt-4 pb-2">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link
                      href={link.href}
                      onClick={(e) => { if (link.href === '/#contact') handleContactClick(e); else setIsMenuOpen(false); }}
                      className={`block w-full px-4 py-3.5 rounded-2xl text-[17px] font-bold font-[family-name:var(--font-display)] ${pathname === link.href ? 'text-[#38948c] bg-[#ade2d9]/25' : 'text-[#224d4b]'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-5 pt-2 pb-8 grid grid-cols-2 gap-3">
                <button onClick={() => { setContactMode('phone'); setIsMenuOpen(false); }} className="flex items-center justify-center gap-2 py-3.5 bg-[#f3faf9] border border-[#ade2d9] text-[#255e5b] font-bold rounded-2xl font-[family-name:var(--font-display)] text-sm">
                  <Phone className="w-4 h-4" /> Call
                </button>
                <button onClick={() => { setContactMode('whatsapp'); setIsMenuOpen(false); }} className="flex items-center justify-center gap-2 py-3.5 bg-[#255e5b] text-white font-bold rounded-2xl shadow-lg font-[family-name:var(--font-display)] text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── COMPACT CONTACT MODAL (Smaller for Mobile) ── */}
      <AnimatePresence>
        {contactMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-5 antialiased"
          >
            <div className="absolute inset-0 bg-[#0d2626]/70 backdrop-blur-md" onClick={() => setContactMode(null)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative bg-white rounded-[2rem] max-w-sm sm:max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden"
            >
              {/* Tightened Header */}
              <div className="p-5 sm:p-8 pb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0d2626] font-[family-name:var(--font-display)] leading-tight">
                    {contactMode === 'whatsapp' ? 'WhatsApp Faculty' : 'Call Faculty'}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-[#224d4b]/60 font-medium mt-1">Select a director below</p>
                </div>
                <button onClick={() => setContactMode(null)} className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-black transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Compact Grid */}
              <div className="p-4 sm:p-8 pt-2 grid grid-cols-2 gap-3 sm:gap-4 bg-[#fcfdfd]">
                {contacts.map((contact, index) => (
                  <a 
                    key={index} href={getHref(contact.phone)} target={contactMode === 'whatsapp' ? '_blank' : undefined} rel="noreferrer"
                    onClick={() => setContactMode(null)}
                    className="relative bg-white border border-[#ade2d9]/40 rounded-2xl p-4 sm:p-5 hover:border-[#38948c]/60 transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#f3faf9] border border-[#ade2d9]/50 rounded-full flex items-center justify-center text-[#38948c] group-hover:bg-[#255e5b] group-hover:text-white transition-all mb-2 sm:mb-3">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <p className="font-bold text-[#0d2626] text-[13px] sm:text-[15px] font-[family-name:var(--font-display)] leading-tight">{contact.name}</p>
                    <div className="hidden sm:flex items-center gap-1.5 mt-1.5 text-[#224d4b]/60 text-xs">
                       <p>{contact.displayPhone}</p>
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