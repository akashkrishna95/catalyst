'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, BookOpen, ChevronDown } from 'lucide-react'

const navLinks = [
  {
    href: '/',
    label: 'Home',
    sections: [
      { label: 'Hero', href: '/#hero' },
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

const easePremium = [0.16, 1, 0.3, 1]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasPurchasedCourse] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTutor] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close overlays on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
      setActiveDropdown(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

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

  return (
    <>
      {/* ── Pill Navbar ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easePremium }}
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${
          isScrolled
            ? 'bg-white/60 shadow-[0_8px_32px_rgba(13,38,38,0.12),inset_0_0_0_1px_rgba(255,255,255,0.5)]'
            : 'bg-white/40 shadow-[0_4px_24px_rgba(13,38,38,0.08),inset_0_0_0_1px_rgba(255,255,255,0.3)]'
        } backdrop-blur-2xl backdrop-saturate-150 border border-white/30 rounded-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3`}
        style={{
          background: isScrolled
            ? 'linear-gradient(135deg,rgba(255,255,255,0.7) 0%,rgba(243,250,249,0.6) 100%)'
            : 'linear-gradient(135deg,rgba(255,255,255,0.5) 0%,rgba(243,250,249,0.4) 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Custom SVG Logo */}
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
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all rounded-full ${
                    pathname === link.href
                      ? 'text-[#38948c] bg-[#ade2d9]/30'
                      : 'text-[#224d4b] hover:text-[#38948c] hover:bg-[#ade2d9]/20'
                  }`}
                >
                  {link.label}
                  {link.sections.length > 0 && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {activeDropdown === link.label && link.sections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: easePremium }}
                      className="absolute top-full left-0 mt-2 w-48"
                      style={{
                        background:
                          'linear-gradient(135deg,rgba(255,255,255,0.85) 0%,rgba(243,250,249,0.8) 100%)',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="backdrop-blur-2xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(13,38,38,0.15),inset_0_0_0_1px_rgba(255,255,255,0.3)] p-2">
                        {link.sections.map((section) => (
                          <Link
                            key={section.href}
                            href={section.href}
                            className="block px-4 py-2.5 text-sm text-[#224d4b] hover:text-[#38948c] hover:bg-[#ade2d9]/20 rounded-xl transition-colors"
                          >
                            {section.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {hasPurchasedCourse && (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-[#255e5b] bg-[#ade2d9]/30 rounded-full border border-[#ade2d9] shadow-[0_0_10px_rgba(125,203,193,0.3)] hover:shadow-[0_0_15px_rgba(125,203,193,0.5)] transition-shadow"
              >
                Learning Hub
              </Link>
            )}
          </div>

          {/* Right: Auth + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auth Button */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsUserMenuOpen(!isUserMenuOpen)
                }}
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all ${
                  isLoggedIn
                    ? isTutor
                      ? 'bg-[#255e5b] text-white'
                      : 'bg-gradient-to-br from-[#255e5b] to-[#38948c] text-white font-semibold text-sm'
                    : 'bg-[#0d2626] text-white text-sm font-medium hover:bg-[#224d4b]'
                }`}
              >
                {isLoggedIn ? (
                  isTutor ? (
                    '👨‍🏫'
                  ) : (
                    'AK'
                  )
                ) : (
                  <User className="w-4 h-4" />
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: easePremium }}
                    className="absolute right-0 top-14 w-48"
                    style={{
                      background:
                        'linear-gradient(135deg,rgba(255,255,255,0.9) 0%,rgba(243,250,249,0.85) 100%)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="backdrop-blur-2xl backdrop-saturate-150 border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(13,38,38,0.15),inset_0_0_0_1px_rgba(255,255,255,0.3)] overflow-hidden">
                      {isLoggedIn ? (
                        <>
                          {isTutor ? (
                            <Link
                              href="/tutor-portal"
                              className="flex items-center gap-3 px-4 py-3 text-sm text-[#224d4b] hover:bg-[#f3faf9] transition-colors"
                            >
                              <BookOpen className="w-4 h-4" />
                              Portal Dashboard
                            </Link>
                          ) : (
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-4 py-3 text-sm text-[#224d4b] hover:bg-[#f3faf9] transition-colors"
                            >
                              <BookOpen className="w-4 h-4" />
                              My Learning
                            </Link>
                          )}
                          <button
                            onClick={() => setIsLoggedIn(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-3 text-sm text-[#224d4b] hover:bg-[#f3faf9] transition-colors"
                          >
                            Student Sign In
                          </Link>
                          <Link
                            href="/tutor-portal"
                            className="block px-4 py-3 text-sm text-[#224d4b] hover:bg-[#f3faf9] transition-colors border-t border-[#ade2d9]/30"
                          >
                            Tutor Portal
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 text-[#224d4b] hover:bg-[#ade2d9]/20 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-[#0d2626]/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sheet panel — slides down from top */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: easePremium }}
              className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-2xl border-b border-[#ade2d9]/40 shadow-2xl rounded-b-3xl overflow-hidden"
            >
              {/* Top bar inside sheet — mirrors navbar alignment */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                {/* Custom SVG Logo in Mobile Menu */}
                <button
                  onClick={handleLogoClick}
                  className="flex items-center"
                >
                  <img 
                    src="https://res.cloudinary.com/dp2r068c8/image/upload/v1781361635/CATALYST_STUDY_CENTRE_logo_qoaqxh.svg" 
                    alt="Catalyst Logo" 
                    className="h-9 w-auto object-contain"
                  />
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full text-[#224d4b] hover:bg-[#ade2d9]/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-[#ade2d9]/40" />

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 px-5 pt-5 pb-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, ease: easePremium }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === '/#contact') handleContactClick(e)
                        else setIsMenuOpen(false)
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors ${
                        pathname === link.href
                          ? 'text-[#38948c] bg-[#ade2d9]/25'
                          : 'text-[#224d4b] hover:bg-[#f3faf9]'
                      }`}
                    >
                      {link.label}
                      {link.sections.length > 0 && (
                        <ChevronDown className="w-4 h-4 text-[#38948c]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, ease: easePremium }}
                className="px-5 pt-4 pb-8"
              >
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20CATALYST%20courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#255e5b] hover:bg-[#38948c] text-white font-bold text-base rounded-2xl transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Chat with us on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}