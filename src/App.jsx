import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, Phone, Instagram, ArrowRight, ArrowUpRight,
  Star, Coffee, Leaf, Award, ChevronDown, Menu, X, ArrowDown,
  Heart, ShoppingBag, Minus, Plus
} from 'lucide-react'

/* ─── data ─── */
const menuItems = [
  {
    category: 'Espresso Classics',
    items: [
      { name: 'Espresso', desc: 'Single origin Ethiopia Yirgacheffe. Notes of blueberry, jasmine, and dark chocolate.', price: '3.80', tags: ['Single origin', 'Seasonal'] },
      { name: 'Flat White', desc: 'A double ristretto with silky steamed whole milk. Melbourne-style ratio 1:2.', price: '4.50', tags: ['House favourite'] },
      { name: 'Cortado', desc: 'Equal parts espresso and warm milk. Clean, bright, no frills.', price: '4.20', tags: [] },
      { name: 'Cappuccino', desc: 'Ritual-roasted blend with micro-foam textured to velvet. Classic ratio preserved.', price: '4.50', tags: [] },
    ],
  },
  {
    category: 'Slow Bar',
    items: [
      { name: 'V60 Pour Over', desc: 'Hand-poured to order. Ask your barista about today&apos;s single origin selection.', price: '6.50', tags: ['Pour over', 'Filter'] },
      { name: 'Cold Brew', desc: '20-hour cold extraction. Silky, low-acid, naturally sweet. Served over large format ice.', price: '5.80', tags: ['12h brew', 'Cold'] },
      { name: 'AeroPress', desc: 'Full immersion method producing a concentrated, rich cup. Our daily rotating origin.', price: '5.50', tags: ['Rotating'] },
    ],
  },
  {
    category: 'Drinks & More',
    items: [
      { name: 'Matcha Latte', desc: 'Ceremonial grade Japanese matcha whisked with steamed oat milk. Subtle, earthy, calming.', price: '5.20', tags: ['Vegan option'] },
      { name: 'Hojicha Tonic', desc: 'Roasted green tea over sparkling tonic with a slice of yuzu. Unexpected and refreshing.', price: '5.80', tags: ['Signature'] },
      { name: 'Seasonal Lemonade', desc: 'Fresh pressed lemon, house-made lavender syrup, still water. Changes with the harvest.', price: '4.80', tags: ['Seasonal'] },
    ],
  },
]

const testimonials = [
  { name: 'Emma S.', city: 'London', stars: 5, text: 'The V60 here completely changed my understanding of what coffee can be. That Ethiopia pour-over tasted like fruit juice. Unreal.' },
  { name: 'Jakob M.', city: 'Berlin', stars: 5, text: "Probably the best flat white I've had outside of Melbourne. The space is gorgeous — I spent three hours here without realising." },
  { name: 'Chiara R.', city: 'Milan', stars: 5, text: "I came for one coffee and left with a bag of beans, a book, and a recurring Sunday morning ritual. The team here genuinely cares." },
]

const origins = [
  { country: 'Ethiopia', region: 'Yirgacheffe', process: 'Natural', notes: 'Blueberry · Jasmine · Dark chocolate', altitude: '1,800–2,200m' },
  { country: 'Colombia', region: 'Huila', process: 'Washed', notes: 'Red apple · Caramel · Brown sugar', altitude: '1,500–1,900m' },
  { country: 'Kenya', region: 'Nyeri', process: 'Washed', notes: 'Blackcurrant · Tomato · Citrus', altitude: '1,700–2,100m' },
]

const hours = [
  { day: 'Monday – Friday', time: '07:30 – 19:00' },
  { day: 'Saturday', time: '08:00 – 20:00' },
  { day: 'Sunday', time: '09:00 – 18:00' },
]

/* ─── Coffee Cup SVG ─── */
function CoffeeCupSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="100" cy="168" rx="68" ry="10" fill="#C4843A" opacity="0.3"/>
      <ellipse cx="100" cy="165" rx="60" ry="8" fill="#4A2E23"/>
      {/* Cup body */}
      <path d="M55 100 Q52 155 100 158 Q148 155 145 100 Z" fill="#2C1810"/>
      <path d="M55 100 Q52 155 100 158 Q148 155 145 100 Z" fill="url(#cupGrad)"/>
      {/* Cup rim */}
      <ellipse cx="100" cy="100" rx="45" ry="10" fill="#4A2E23"/>
      <ellipse cx="100" cy="100" rx="43" ry="9" fill="#3D2318"/>
      {/* Coffee surface */}
      <ellipse cx="100" cy="100" rx="38" ry="7" fill="#6B3A1F"/>
      <ellipse cx="100" cy="100" rx="36" ry="6" fill="#7A4428"/>
      {/* Latte art - leaf */}
      <path d="M100 96 Q108 99 100 103 Q92 99 100 96Z" fill="rgba(245,237,214,0.6)" stroke="rgba(245,237,214,0.4)" strokeWidth="0.5"/>
      <line x1="100" y1="96" x2="100" y2="104" stroke="rgba(245,237,214,0.4)" strokeWidth="0.5"/>
      {/* Handle */}
      <path d="M145 108 Q172 108 172 128 Q172 148 145 148" stroke="#4A2E23" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M145 112 Q165 112 165 128 Q165 144 145 144" stroke="#2C1810" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Steam lines */}
      <path d="M90 85 Q88 70 90 58" stroke="#C4843A" strokeWidth="2" strokeLinecap="round" opacity="0" className="steam-1"/>
      <path d="M100 80 Q98 62 100 50" stroke="#C4843A" strokeWidth="2" strokeLinecap="round" opacity="0" className="steam-2"/>
      <path d="M110 85 Q112 68 110 56" stroke="#C4843A" strokeWidth="2" strokeLinecap="round" opacity="0" className="steam-3"/>
      {/* Defs */}
      <defs>
        <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─── Steam ─── */
function Steam({ delay = 0, x = 0 }) {
  return (
    <motion.div
      className="absolute bottom-full w-1 rounded-full bg-stone/40"
      style={{ left: `calc(50% + ${x}px)`, height: 40 }}
      animate={{ y: [-10, -50], opacity: [0.5, 0], scaleX: [1, 1.5] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const nav = ['Menu', 'Our Story', 'Origins', 'Visit']

  return (
    <>
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-parchment/95 backdrop-blur-sm shadow-sm border-b border-caramel/10 py-3' : 'py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <span className="font-display font-semibold text-espresso text-2xl leading-none tracking-tight">VOLTA</span>
            <span className="mono text-[9px] text-caramel tracking-[0.3em] uppercase">Specialty Coffee</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`}
                className="link-underline font-body text-sm text-espresso/70 hover:text-espresso transition-colors">{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <motion.a href="#visit" whileHover={{ scale: 1.02 }} className="btn-dark text-sm px-5 py-2.5">
              Find us <MapPin size={13} />
            </motion.a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-espresso">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-parchment/98 backdrop-blur-sm border-b border-caramel/15 px-6 py-6 md:hidden">
            <nav className="flex flex-col gap-5">
              {nav.map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} onClick={() => setOpen(false)}
                  className="font-display text-2xl text-espresso font-light italic">{l}</a>
              ))}
              <a href="#visit" className="btn-dark self-start mt-2">Find us <MapPin size={14} /></a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Menu Card ─── */
function MenuCard({ item, delay }) {
  const [qty, setQty] = useState(0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay }}
      className="menu-card rounded-sm p-6 relative group"
    >
      {item.tags.map(t => (
        <span key={t} className="tag mr-1 mb-3 inline-block">{t}</span>
      ))}
      <h3 className="font-display text-xl font-semibold text-espresso mb-2">{item.name}</h3>
      <p className="font-body text-sm text-stone leading-relaxed mb-5">{item.desc}</p>
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl font-light text-espresso">£{item.price}</span>
        <div className="flex items-center gap-2">
          {qty > 0 && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
              onClick={() => setQty(q => Math.max(0, q - 1))}
              className="w-7 h-7 rounded-full border border-espresso/30 flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-all">
              <Minus size={12} />
            </motion.button>
          )}
          {qty > 0 && <span className="font-mono text-sm text-espresso w-4 text-center">{qty}</span>}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setQty(q => q + 1)}
            className="px-4 py-1.5 bg-espresso text-cream text-xs font-body tracking-wide hover:bg-espresso-light transition-colors">
            {qty === 0 ? 'Add' : <Plus size={12} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── main ─── */
export default function App() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden texture-bg">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-caramel/6 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-espresso/4 blur-[100px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <span className="section-label mb-6 block">
                  <span className="divider inline-block mr-3" />
                  Est. 2018 · London, UK
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22,1,0.36,1] }}
                className="font-display font-light text-6xl sm:text-7xl xl:text-8xl text-espresso leading-[0.9] mb-8"
              >
                Coffee,<br />
                <em>crafted</em><br />
                <span className="text-caramel">with care.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="font-body font-light text-lg text-stone leading-relaxed mb-10 max-w-md"
              >
                We source, roast, and brew single-origin coffees that tell the story of the land they grew in.
                Slow bar. No rush. Every cup made to order.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.a href="#menu" whileHover={{ scale: 1.02, y: -2 }} className="btn-dark">
                  View our menu <ArrowRight size={15} />
                </motion.a>
                <motion.a href="#our-story" whileHover={{ scale: 1.02 }} className="btn-outline-dark">
                  Our story
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                className="flex items-center gap-6 mt-12 pt-8 border-t border-caramel/15"
              >
                {[['★ 4.9', 'On Google'], ['3', 'Origins roasted'], ['500+', 'Cups daily']].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display font-semibold text-espresso text-xl">{v}</p>
                    <p className="mono text-[10px] text-stone tracking-wider uppercase mt-0.5">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — animated coffee cup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.22,1,0.36,1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Circular backdrop */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-caramel/8 border border-caramel/15" />
              <div className="absolute w-[340px] h-[340px] rounded-full bg-caramel/6" />

              {/* Decorative ring text */}
              <svg className="absolute w-[460px] h-[460px] animate-spin-slow" viewBox="0 0 460 460">
                <path id="circle" d="M230,230 m-190,0 a190,190 0 1,1 380,0 a190,190 0 1,1 -380,0" fill="none"/>
                <text className="mono" fontSize="11" fill="rgba(196,132,58,0.4)" letterSpacing="14">
                  <textPath href="#circle">SPECIALTY COFFEE · SINGLE ORIGIN · SLOW BAR · CRAFTED WITH CARE · </textPath>
                </text>
              </svg>

              {/* Coffee cup */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-56 h-56 cup-saucer"
              >
                <CoffeeCupSVG />
                {/* Steam */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                  <Steam delay={0} x={-14} />
                  <Steam delay={0.8} x={0} />
                  <Steam delay={1.6} x={14} />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-12 right-8 bg-parchment border border-caramel/20 rounded-sm px-4 py-2.5 shadow-lg"
              >
                <p className="mono text-[9px] text-caramel tracking-widest uppercase">Today's special</p>
                <p className="font-display text-base text-espresso font-medium">Ethiopia Sidama</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-16 left-4 bg-espresso rounded-sm px-4 py-2.5 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Leaf size={12} className="text-caramel" />
                  <p className="mono text-[9px] text-cream/60 tracking-wider">ORIGIN</p>
                </div>
                <p className="font-body text-sm text-cream font-medium">Yirgacheffe · 1,900m</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a href="#menu"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone/50 hover:text-stone transition-colors"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.a>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="section-label mb-4 block justify-center">
              <span className="divider" />
              The menu
              <span className="divider" />
            </span>
            <h2 className="font-display font-light text-5xl md:text-6xl text-espresso mb-4">
              What we're <em>brewing</em>
            </h2>
            <p className="font-body text-stone max-w-md mx-auto text-sm leading-relaxed">
              Every drink crafted to order. Ask your barista about today&apos;s origins and seasonal specials.
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {menuItems.map((cat, i) => (
              <button key={cat.category} onClick={() => setActiveCategory(i)}
                className={`px-5 py-2 text-sm font-body transition-all duration-300 border ${
                  i === activeCategory
                    ? 'bg-espresso text-cream border-espresso'
                    : 'border-caramel/20 text-stone hover:border-caramel/50 hover:text-espresso'
                }`}>
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {menuItems[activeCategory].items.map((item, i) => (
                <MenuCard key={item.name} item={item} delay={i * 0.07} />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-10">
            <p className="mono text-xs text-stone/50 tracking-wider">
              All prices include VAT · Menu changes seasonally · Ask about allergens
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="our-story" className="py-28 px-6 bg-espresso text-cream relative overflow-hidden">
        <div className="absolute inset-0 texture-bg opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-caramel/5 blur-[150px]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left text */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="section-label mb-6 block text-caramel">
                <span className="inline-block w-6 h-px bg-caramel mr-3" />
                Our story
              </span>
              <h2 className="font-display font-light text-5xl md:text-6xl text-cream leading-[0.95] mb-8">
                Born from a<br /><em>love of the source.</em>
              </h2>
              <div className="space-y-5 font-body font-light text-cream/70 leading-relaxed text-[15px]">
                <p>
                  Volta began in 2018 with a single Moka pot and an obsession with understanding why coffee from Ethiopia
                  tasted so different from what we'd grown up with. That obsession became a pilgrimage — through Addis Ababa,
                  through cooperatives in Huila, through wet mills in Nyeri.
                </p>
                <p>
                  We came back with relationships, not just beans. Every bag we roast has a name, a farm, a story.
                  We think you deserve to know it.
                </p>
                <p>
                  Our slow bar is designed to slow everything down. No background music before 11am.
                  No takeaway cups during the rush. Just coffee, made properly, for people who have chosen to be here.
                </p>
              </div>
              <motion.a href="#origins" whileHover={{ x: 4 }} className="inline-flex items-center gap-3 mt-10 text-caramel font-body text-sm group">
                Explore our origins <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Right — values */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="space-y-6">
                {[
                  { num: '01', title: 'Traceability first', desc: 'Every bean is traceable to a specific farm, lot, and harvest. We publish full transparency reports annually.' },
                  { num: '02', title: 'Fair price, always', desc: 'We pay above Fair Trade minimums for every lot. Good coffee comes from farmers who are compensated fairly.' },
                  { num: '03', title: 'Craft, not speed', desc: 'Our baristas train for three months before serving a customer. The slow bar has no timer. It has a palate.' },
                  { num: '04', title: 'Seasonal & honest', desc: "When a harvest ends, it ends. No year-round staples. Our menu reflects what's actually tasting best right now." },
                ].map((v, i) => (
                  <motion.div key={v.num} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex gap-5 p-5 border border-cream/8 hover:border-caramel/30 transition-colors duration-300 group cursor-default">
                    <div className="num-circle border-cream/20 text-caramel flex-shrink-0 mt-1">{v.num}</div>
                    <div>
                      <h3 className="font-display font-medium text-cream text-lg mb-1.5">{v.title}</h3>
                      <p className="font-body font-light text-cream/50 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ORIGINS ── */}
      <section id="origins" className="py-28 px-6 bg-cream-light">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="section-label mb-4 block justify-center">
              <span className="divider" />
              Current rotation
              <span className="divider" />
            </span>
            <h2 className="font-display font-light text-5xl md:text-6xl text-espresso">
              Where our beans <em>come from</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {origins.map((o, i) => (
              <motion.div key={o.country} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.65 }}
                className="group cursor-default"
              >
                <div className="relative overflow-hidden mb-5">
                  {/* Abstract map/terrain illustration */}
                  <div className="h-48 bg-espresso relative overflow-hidden">
                    <div className="absolute inset-0 texture-bg opacity-20" />
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 192" preserveAspectRatio="none">
                      {/* Abstract topographic lines */}
                      {[...Array(8)].map((_, j) => (
                        <path key={j}
                          d={`M0,${96 + j*12 + Math.sin(j)*20} Q75,${60 + j*8} 150,${90 + j*10} Q225,${70 + j*12} 300,${85 + j*8}`}
                          stroke="rgba(196,132,58,0.2)" strokeWidth="1.5" fill="none"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="mono text-[10px] text-caramel/60 tracking-[0.3em] uppercase mb-2">{o.country}</p>
                      <p className="font-display font-light text-3xl text-cream">{o.region}</p>
                      <p className="mono text-[9px] text-caramel/50 mt-2 tracking-widest">{o.altitude}</p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="tag border-caramel/30 text-caramel/70">{o.process}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-espresso text-xl mb-1">
                  {o.country} <span className="font-light italic text-stone">— {o.region}</span>
                </h3>
                <p className="mono text-[11px] text-caramel tracking-wider mb-2">{o.process} process</p>
                <p className="font-body text-sm text-stone leading-relaxed">{o.notes}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="quote-mark mb-2">"</div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}>
                <p className="font-display font-light text-2xl md:text-3xl text-espresso leading-relaxed mb-8 italic">
                  {testimonials[activeTestimonial].text}
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[...Array(testimonials[activeTestimonial].stars)].map((_,i) => (
                    <Star key={i} size={13} className="text-caramel fill-caramel" />
                  ))}
                </div>
                <p className="mono text-xs text-stone tracking-wider">
                  {testimonials[activeTestimonial].name} · {testimonials[activeTestimonial].city}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_,i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-caramel w-4' : 'bg-caramel/25'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VISIT ── */}
      <section id="visit" className="py-28 px-6 bg-cream-dark/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — info */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="section-label mb-6 block">
                <span className="divider inline-block mr-3" />
                Find us
              </span>
              <h2 className="font-display font-light text-5xl text-espresso mb-8">
                Come <em>in person.</em>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-caramel/25 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-caramel" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-espresso">14 Redchurch Street</p>
                    <p className="font-body text-stone text-sm">Shoreditch, London E2 7DP</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-caramel/25 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-caramel" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-espresso">+44 20 7946 0958</p>
                    <p className="font-body text-stone text-sm">Reservations for groups of 6+</p>
                  </div>
                </div>
              </div>

              <div className="border border-caramel/20 p-6 mb-8">
                <p className="mono text-[10px] text-caramel tracking-[0.2em] uppercase mb-4">Opening Hours</p>
                <div className="space-y-3">
                  {hours.map(h => (
                    <div key={h.day} className="flex justify-between items-center">
                      <p className="font-body text-sm text-espresso">{h.day}</p>
                      <p className="mono text-xs text-stone">{h.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-stone hover:text-espresso transition-colors link-underline">
                  <Instagram size={15} /> @voltacoffee
                </a>
                <span className="text-caramel/30">·</span>
                <a href="mailto:hello@voltacoffee.com"
                  className="font-body text-sm text-stone hover:text-espresso transition-colors link-underline">
                  hello@voltacoffee.com
                </a>
              </div>
            </motion.div>

            {/* Right — map placeholder + newsletter */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6">
              {/* Abstract map */}
              <div className="relative h-64 bg-espresso overflow-hidden">
                <div className="absolute inset-0 texture-bg opacity-20" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 256">
                  {/* Street grid */}
                  <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(196,132,58,0.15)" strokeWidth="1"/>
                  <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(196,132,58,0.1)" strokeWidth="1"/>
                  <line x1="0" y1="200" x2="500" y2="200" stroke="rgba(196,132,58,0.1)" strokeWidth="1"/>
                  <line x1="100" y1="0" x2="100" y2="256" stroke="rgba(196,132,58,0.1)" strokeWidth="1"/>
                  <line x1="220" y1="0" x2="180" y2="256" stroke="rgba(196,132,58,0.15)" strokeWidth="1"/>
                  <line x1="350" y1="0" x2="350" y2="256" stroke="rgba(196,132,58,0.1)" strokeWidth="1"/>
                  <line x1="450" y1="0" x2="450" y2="256" stroke="rgba(196,132,58,0.08)" strokeWidth="1"/>
                  {/* Blocks */}
                  <rect x="110" y="88" width="60" height="44" fill="rgba(196,132,58,0.07)" />
                  <rect x="225" y="88" width="110" height="44" fill="rgba(196,132,58,0.05)" />
                  <rect x="360" y="88" width="80" height="44" fill="rgba(196,132,58,0.07)" />
                  <rect x="110" y="148" width="90" height="44" fill="rgba(196,132,58,0.05)" />
                  {/* Pin */}
                  <circle cx="200" cy="128" r="10" fill="#C4843A" opacity="0.9"/>
                  <circle cx="200" cy="128" r="5" fill="#fff"/>
                  <circle cx="200" cy="128" r="20" fill="rgba(196,132,58,0.15)" className="animate-ping" style={{animationDuration:'2s'}}/>
                  {/* Label */}
                  <rect x="215" y="116" width="90" height="26" rx="4" fill="rgba(245,237,214,0.95)"/>
                  <text x="222" y="133" fontSize="11" fill="#2C1810" fontFamily="Jost, sans-serif" fontWeight="500">Volta Coffee</text>
                </svg>
                <div className="absolute bottom-4 left-4">
                  <span className="tag border-cream/20 text-cream/60">Shoreditch · E2</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-espresso p-8">
                <p className="font-display font-light text-2xl text-cream mb-2">Stay in the loop.</p>
                <p className="font-body text-sm text-cream/50 mb-6 leading-relaxed">
                  New origins, seasonal menus, and events — delivered monthly.
                  No spam. Unsubscribe anytime.
                </p>
                <div className="flex gap-2">
                  <input type="email" placeholder="your@email.com"
                    className="flex-1 bg-cream/8 border border-cream/15 text-cream placeholder-cream/30 px-4 py-2.5 text-sm font-body outline-none focus:border-caramel/50 transition-colors" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-caramel hover:bg-caramel-light text-espresso text-sm font-body font-medium transition-colors whitespace-nowrap">
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-espresso-dark py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-cream/8 pb-8 mb-8">
            <div>
              <p className="font-display font-semibold text-cream text-2xl mb-0.5">VOLTA</p>
              <p className="mono text-[9px] text-caramel/60 tracking-[0.3em]">SPECIALTY COFFEE · LONDON</p>
            </div>
            <div className="flex gap-8 text-sm font-body text-cream/40">
              {['Menu', 'Our Story', 'Origins', 'Visit'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`}
                  className="hover:text-cream/80 transition-colors link-underline">{l}</a>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 border border-cream/10 flex items-center justify-center text-cream/40 hover:text-caramel hover:border-caramel/30 transition-all">
                <Instagram size={15} />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 text-xs text-cream/25 font-mono">
            <span>© 2026 Volta Coffee Ltd. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cream/50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cream/50 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
