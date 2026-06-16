'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, MapPin, Phone, Clock, ArrowRight } from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const easePremium = [0.16, 1, 0.3, 1]

const faqData = [
  {
    question: 'What are the fees for the NEET preparation course?',
    answer: 'Our NEET preparation course ranges from ₹24,999 to ₹34,999 depending on the batch and duration. We also offer EMI options and scholarships for meritorious students. Contact us for a detailed fee breakdown.',
  },
  {
    question: 'Do you provide transportation facilities?',
    answer: 'Yes, we have tie-ups with local transport providers covering major areas in and around Kollam. Pick-up and drop facilities are available for both Kadappakada and Chinnakada campuses at nominal charges.',
  },
  {
    question: 'What is the batch size at CATALYST?',
    answer: 'We strictly maintain a batch size of 25-30 students to ensure personalized attention. Our faculty to student ratio is 1:15, one of the best in the region.',
  },
  {
    question: 'Is there a trial period before enrollment?',
    answer: 'Absolutely! We offer a free 3-day trial where you can attend regular classes, meet our faculty, and experience our teaching methodology before making your decision.',
  },
  {
    question: 'What is the success rate of CATALYST students?',
    answer: 'Over 98% of our students score above distinction in board exams. In competitive exams, 85% of our NEET students clear the cutoff, with 42 students securing Top 100 AIRs in the past 5 years.',
  },
]

// DYNAMIC MAP DATA: Just change the "mapQuery" and it instantly updates the map view.
const campusData = [
  {
    id: 1,
    name: 'Kadappakada Campus',
    address: '2nd Floor, Reliance Tower, Kadappakada Junction, Kollam - 691008',
    phone: '+91 98765 43210',
    hours: 'Mon-Sat: 8AM - 8PM',
    mapUrl: 'https://maps.google.com/?q=Kadappakada+Junction,Kollam',
    mapQuery: 'Kadappakada Junction, Kollam, Kerala', // Change this to any location globally
  },
  {
    id: 2,
    name: 'Chinnakada Campus',
    address: '3rd Floor, Skyline Complex, Chinnakada Main Road, Kollam - 691001',
    phone: '+91 98765 43211',
    hours: 'Mon-Sat: 8AM - 8PM',
    mapUrl: 'https://maps.google.com/?q=Chinnakada,Kollam',
    mapQuery: 'Chinnakada, Kollam, Kerala', // Change this to any location globally
  },
]

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-[#ade2d9]/30 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group outline-none"
      >
        <span className="font-[family-name:var(--font-display)] text-sm lg:text-base font-semibold text-white pr-4 group-hover:text-white/90 transition-colors leading-snug">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easePremium }}
          className="flex-shrink-0 transform-gpu"
        >
          <ChevronDown className="w-5 h-5 text-white/80" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easePremium }}
        className="overflow-hidden transform-gpu will-change-[height,opacity]"
      >
        <p className="pb-4 text-white/70 leading-relaxed text-sm">
          {item.answer}
        </p>
      </motion.div>
    </div>
  )
}

export function FAQCampusesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const leftColumnFAQs = faqData

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-gradient-to-br from-[#255e5b] to-[#38948c] overflow-hidden z-10 mb-[-60px] pb-[80px] rounded-b-[48px] shadow-[0_30px_100px_-20px_rgba(13,38,38,0.12)] contain-paint antialiased"
    >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none transform-gpu"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fcfdfd 1px, transparent 1px),
              linear-gradient(to bottom, #fcfdfd 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremium }}
          className="mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[#fcfdfd] tracking-tight mb-8 text-center lg:text-left">
            Frequently Asked Questions
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left: FAQ accordion */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg transform-gpu">
              {leftColumnFAQs.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>

            {/* Right: Parent-to-Parent Trust Card */}
            <div className="h-full">
              <div className="relative bg-[#f3faf9] h-full w-full rounded-[2.5rem] shadow-[0_20px_50px_rgba(13,38,38,0.1)] p-8 lg:p-10 flex flex-col justify-between overflow-hidden border border-[#ade2d9]/30">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ade2d9]/20 blur-[80px] pointer-events-none rounded-full transform-gpu" />

                <div className="relative z-10 flex-1">
                  <div className="w-full h-auto mb-6 flex items-center justify-center min-h-[200px] md:min-h-[180px]">
                    <DotLottieReact
                      src="https://lottie.host/53a64915-0c67-4ff0-b702-e31187d92486/hOyx65rI9L.lottie"
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%', minHeight: '200px' }}
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-[#224d4b]/80 text-sm mb-5 font-medium leading-relaxed">
                    Join thousands of students who have transformed their academic journey with CATALYST.
                  </p>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-[#255e5b] hover:bg-[#38948c] text-white py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,94,91,0.25)] flex items-center justify-center gap-2 transform-gpu will-change-transform"
                  >
                    Join Now To Score UP
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Campuses Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremium, delay: 0.2 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[#fcfdfd] tracking-tight mb-8 text-center lg:text-left">
            Our Campuses
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {campusData.map((campus) => (
              <a
                key={campus.id}
                href={campus.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group outline-none"
              >
                <div className="relative bg-white hover:-translate-y-1.5 border border-[#ade2d9]/30 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 ease-out transform-gpu will-change-transform">
                  
                  {/* Clean Dark-Mode Map Preview */}
                  <div className="relative aspect-[21/9] sm:aspect-video bg-[#0d2626] overflow-hidden">
                    
                    {/* CSS CROPPING TRICK: 
                      w-[calc(100%+150px)] h-[calc(100%+150px)] with negative top/left margins
                      forces the top-left info box completely outside of the visible container frame.
                    */}
                    <iframe 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(campus.mapQuery)}&t=m&z=15&output=embed&iwloc=near`}
                      className="absolute w-[calc(100%+150px)] h-[calc(100%+150px)] -top-[75px] -left-[75px] border-0 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ 
                        filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%) opacity(0.85)'
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2626]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[#38948c]/10 mix-blend-color pointer-events-none" />

                    {/* Animated Pinging Map Pin - Centered perfectly */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                      <div className="relative">
                        <div className="absolute inset-0 w-10 h-10 bg-[#50b1a8] rounded-full animate-ping opacity-60" />
                        <div className="relative w-10 h-10 bg-[#255e5b] border-2 border-white rounded-full flex items-center justify-center shadow-xl transform-gpu transition-transform group-hover:scale-110 duration-300">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Call-to-action Badge */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-xs font-bold text-[#255e5b] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform-gpu z-20">
                      Open in Maps
                    </div>
                  </div>

                  {/* Campus Info */}
                  <div className="p-5 lg:p-6 bg-white relative z-10">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#224d4b] mb-4">
                      {campus.name}
                    </h3>
                    <div className="space-y-3 text-sm font-medium">
                      <div className="flex items-start gap-3 text-[#224d4b]/70">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#38948c] flex-shrink-0" />
                        <span className="leading-snug">{campus.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#224d4b]/70">
                        <Phone className="w-4 h-4 text-[#38948c] flex-shrink-0" />
                        <span>{campus.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#224d4b]/70">
                        <Clock className="w-4 h-4 text-[#38948c] flex-shrink-0" />
                        <span>{campus.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}