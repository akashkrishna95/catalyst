'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowUp, Phone } from 'lucide-react'

const easePremuim = [0.16, 1, 0.3, 1]

const sitemapLinks = [
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/catalyst-academy' },
  { label: 'Instagram', href: 'https://instagram.com/catalyst.kollam' },
  { label: 'YouTube', href: 'https://youtube.com/@catalystacademy' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-[#0d2626] text-white overflow-hidden"
    >
      {/* Optical Color Bleed from light section above */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#ade2d9]/10 via-transparent to-transparent blur-[80px] pointer-events-none z-0" />

      {/* Main Footer Content - Increased padding to make the section area bigger */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Sitemap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim }}
          >
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[#7dcbc1] uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {sitemapLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#d6f1ec]/70 hover:text-white transition-colors text-sm lg:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 2: Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.1 }}
          >
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[#7dcbc1] uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d6f1ec]/70 hover:text-white transition-colors text-sm lg:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.2 }}
            className="col-span-2 md:col-span-1"
          >
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[#7dcbc1] uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:admissions@catalyst.edu"
                className="group block"
              >
                <span className="text-base lg:text-lg text-white relative">
                  admissions@catalyst.edu
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </span>
              </a>
              <div className="flex items-center gap-2 text-[#d6f1ec]/70 text-sm lg:text-base">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-[#d6f1ec]/70 text-sm lg:text-base">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43211</span>
              </div>
            </div>
          </motion.div>

          {/* Col 4: Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easePremuim, delay: 0.3 }}
            className="col-span-2 md:col-span-1 flex justify-start md:justify-end md:items-start"
          >
            <button
              onClick={scrollToTop}
              className="group w-12 h-12 bg-white text-[#0d2626] rounded-full flex items-center justify-center hover:bg-[#f3faf9] transition-colors shadow-lg"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 lg:my-16 h-px bg-[#38948c]/20" />

        {/* Legal Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremuim, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-xs text-[#7dcbc1]/60">
            <span>© 2026 CATALYST Academy</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-[#7dcbc1] transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-[#7dcbc1] transition-colors">
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/cookies" className="hover:text-[#7dcbc1] transition-colors">
              Cookies
            </Link>
          </div>
          <div className="text-xs text-[#7dcbc1]/40">
            Designed by{' '}
            <a 
              href="https://akashkrishna.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#7dcbc1] transition-colors font-medium text-[#7dcbc1]/70"
            >
              Akash Krishna
            </a>
          </div>
        </motion.div>
      </div>

      {/* Massive Brand Anchor - Full Width Stretched tightly edge-to-edge across all devices */}
      <div className="relative w-full overflow-hidden pb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easePremuim, delay: 0.5 }}
          className="w-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span 
            className="font-[family-name:var(--font-display)] font-black text-[#d6f1ec] text-center tracking-tighter w-full block scale-x-[1.05]"
            style={{
              fontSize: 'clamp(3.5rem, 21vw, 21rem)',
              lineHeight: '0.75',
              letterSpacing: '-0.04em',
            }}
          >
            CATALYST
          </span>
        </motion.div>
      </div>
    </footer>
  )
}