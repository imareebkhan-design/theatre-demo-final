"use client";

import { Info } from 'lucide-react';
import CurtainReveal from '../components/CurtainReveal';
import ScratchOffCanvas from '../components/ScratchOffCanvas';
import FlockingBirds from '../components/FlockingBirds';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─────────────── Countdown Component ─────────────── */
function Countdown() {
  const target = new Date('2027-09-10T16:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, min: 0, sec: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        min: Math.floor((diff / (1000 * 60)) % 60),
        sec: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex gap-3 sm:gap-6 justify-center mt-4">
      {[
        { label: 'DAYS', value: String(timeLeft.days) },
        { label: 'HOURS', value: pad(timeLeft.hours) },
        { label: 'MIN', value: pad(timeLeft.min) },
        { label: 'SEC', value: pad(timeLeft.sec) },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-28 sm:h-28 border border-brand-red-dark/40 flex items-center justify-center">
            <span className="font-serif text-3xl sm:text-4xl text-brand-red-dark">{item.value}</span>
          </div>
          <span className="text-[9px] font-sans tracking-[0.2em] mt-2 uppercase text-brand-red-dark/70">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Venue Illustration SVG ─────────────── */
const VenueIllustration = () => (
  <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto" stroke="#5C1010" strokeWidth="1.2" fill="none">
    {/* Sky / ground */}
    <line x1="20" y1="290" x2="580" y2="290" strokeWidth="1.5" />
    {/* Central block */}
    <rect x="200" y="150" width="200" height="140" strokeWidth="1.5" />
    {/* Central pediment */}
    <polyline points="185,150 300,105 415,150" />
    {/* Central door */}
    <rect x="271" y="220" width="58" height="70" rx="28" ry="0" />
    {/* Central windows top row */}
    <rect x="220" y="165" width="30" height="40" rx="12" />
    <rect x="350" y="165" width="30" height="40" rx="12" />
    {/* Central columns */}
    <line x1="240" y1="290" x2="240" y2="150" />
    <line x1="260" y1="290" x2="260" y2="150" />
    <line x1="340" y1="290" x2="340" y2="150" />
    <line x1="360" y1="290" x2="360" y2="150" />
    {/* Left wing */}
    <rect x="80" y="175" width="120" height="115" strokeWidth="1.2" />
    <polyline points="65,175 140,140 200,175" />
    <rect x="95" y="190" width="22" height="30" rx="10" />
    <rect x="140" y="190" width="22" height="30" rx="10" />
    <rect x="112" y="245" width="38" height="45" />
    {/* Left columns */}
    <line x1="105" y1="290" x2="105" y2="175" />
    <line x1="120" y1="290" x2="120" y2="175" />
    <line x1="175" y1="290" x2="175" y2="175" />
    <line x1="190" y1="290" x2="190" y2="175" />
    {/* Right wing */}
    <rect x="400" y="175" width="120" height="115" strokeWidth="1.2" />
    <polyline points="400,175 460,140 535,175" />
    <rect x="415" y="190" width="22" height="30" rx="10" />
    <rect x="460" y="190" width="22" height="30" rx="10" />
    <rect x="450" y="245" width="38" height="45" />
    {/* Right columns */}
    <line x1="410" y1="290" x2="410" y2="175" />
    <line x1="425" y1="290" x2="425" y2="175" />
    <line x1="480" y1="290" x2="480" y2="175" />
    <line x1="495" y1="290" x2="495" y2="175" />
    {/* Trees left */}
    <ellipse cx="45" cy="210" rx="22" ry="55" strokeWidth="1" />
    <line x1="45" y1="265" x2="45" y2="290" />
    <ellipse cx="70" cy="225" rx="16" ry="40" strokeWidth="1" />
    <line x1="70" y1="265" x2="70" y2="290" />
    {/* Trees right */}
    <ellipse cx="555" cy="210" rx="22" ry="55" strokeWidth="1" />
    <line x1="555" y1="265" x2="555" y2="290" />
    <ellipse cx="530" cy="225" rx="16" ry="40" strokeWidth="1" />
    <line x1="530" y1="265" x2="530" y2="290" />
    {/* Fountain */}
    <ellipse cx="300" cy="305" rx="45" ry="10" strokeWidth="1" />
    <line x1="300" y1="290" x2="300" y2="295" />
    <path d="M285,295 Q300,275 315,295" strokeWidth="1" />
    {/* Hatching on pediment for texture */}
    <line x1="265" y1="130" x2="275" y2="150" strokeWidth="0.5" opacity="0.5" />
    <line x1="285" y1="115" x2="295" y2="150" strokeWidth="0.5" opacity="0.5" />
    <line x1="305" y1="110" x2="310" y2="150" strokeWidth="0.5" opacity="0.5" />
    <line x1="320" y1="115" x2="325" y2="150" strokeWidth="0.5" opacity="0.5" />
    <line x1="335" y1="125" x2="345" y2="150" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

/* ─────────────── Menu Ribbon Frame SVG ─────────────── */
const MenuRibbonFrame = () => (
  <svg viewBox="0 0 480 60" className="w-full max-w-lg mx-auto" stroke="#5C1010" strokeWidth="1.5" fill="none">
    {/* Bow at top center */}
    <path d="M215,30 C200,20 185,10 175,20 C165,30 180,38 215,30 Z" />
    <path d="M265,30 C280,20 295,10 305,20 C315,30 300,38 265,30 Z" />
    <circle cx="240" cy="30" r="5" fill="#5C1010" opacity="0.6" />
    {/* Wavy ribbon extending left */}
    <path d="M215,30 C195,26 175,34 155,28 C135,22 115,32 95,26 C75,20 55,30 35,24" />
    {/* Wavy ribbon extending right */}
    <path d="M265,30 C285,34 305,26 325,32 C345,38 365,28 385,34 C405,40 425,30 445,36" />
  </svg>
);

const MenuRibbonBottom = () => (
  <svg viewBox="0 0 480 60" className="w-full max-w-lg mx-auto" stroke="#5C1010" strokeWidth="1.5" fill="none">
    <path d="M35,30 C55,24 75,34 95,28 C115,22 135,32 155,26 C175,20 195,30 215,30" />
    <path d="M265,30 C285,30 305,20 325,26 C345,32 365,22 385,28 C405,34 425,24 445,30" />
  </svg>
);

/* ─────────────── Dinner Table Illustration ─────────────── */
const DinnerTableIllustration = () => (
  <svg viewBox="0 0 340 200" className="w-64 mx-auto" stroke="#5C1010" strokeWidth="1.2" fill="none">
    {/* Table */}
    <ellipse cx="170" cy="110" rx="120" ry="40" />
    {/* Table cloth drape */}
    <path d="M50,110 Q80,155 115,160 Q170,170 225,160 Q260,155 290,110" />
    {/* Candles */}
    <rect x="110" y="65" width="8" height="35" />
    <rect x="162" y="55" width="8" height="45" />
    <rect x="220" y="65" width="8" height="35" />
    {/* Flames */}
    <path d="M111,63 Q114,55 117,63" strokeWidth="0.8" opacity="0.7" />
    <path d="M163,53 Q166,45 169,53" strokeWidth="0.8" opacity="0.7" />
    <path d="M221,63 Q224,55 227,63" strokeWidth="0.8" opacity="0.7" />
    {/* Candle holders */}
    <line x1="107" y1="100" x2="121" y2="100" />
    <line x1="159" y1="100" x2="173" y2="100" />
    <line x1="217" y1="100" x2="231" y2="100" />
    {/* Flower vase center */}
    <path d="M155,80 Q170,65 185,80" strokeWidth="1.4" />
    <line x1="170" y1="80" x2="170" y2="105" />
    <ellipse cx="170" cy="107" rx="14" ry="6" />
    {/* Plates */}
    <ellipse cx="115" cy="118" rx="20" ry="7" />
    <ellipse cx="170" cy="125" rx="20" ry="7" />
    <ellipse cx="225" cy="118" rx="20" ry="7" />
    {/* Wine glasses */}
    <path d="M95,100 Q100,112 105,116 L90,116 Q95,112 100,100" />
    <line x1="97.5" y1="116" x2="97.5" y2="125" />
    <line x1="92" y1="125" x2="103" y2="125" />
    <path d="M240,100 Q245,112 250,116 L235,116 Q240,112 245,100" />
    <line x1="242.5" y1="116" x2="242.5" y2="125" />
    <line x1="237" y1="125" x2="248" y2="125" />
    {/* Chairs */}
    <path d="M50,105 Q40,90 50,80 L65,80 L65,105" />
    <line x1="42" y1="80" x2="42" y2="105" />
    <path d="M290,105 Q300,90 290,80 L275,80 L275,105" />
    <line x1="298" y1="80" x2="298" y2="105" />
  </svg>
);

/* ─────────────── Dress Code Figures Illustration ─────────────── */
const DressCodeFigures = () => (
  <svg viewBox="0 0 400 180" className="w-full max-w-sm mx-auto" stroke="#5C1010" strokeWidth="1.3" fill="none">
    {/* 5 dancing figures */}
    {/* Figure 1 - Man in tux, left */}
    <circle cx="50" cy="35" r="12" />
    <path d="M38,47 L38,100 M62,47 L62,100" />
    <path d="M38,100 L32,140 M62,100 L68,140" />
    <path d="M38,60 L22,80 M62,60 L75,74" />
    <path d="M40,47 Q50,52 60,47 L64,75 L36,75 Z" fill="#5C1010" opacity="0.2" />
    {/* Figure 2 - Woman, green dress */}
    <circle cx="115" cy="32" r="11" />
    <path d="M104,43 Q115,50 126,43 L135,90 Q115,100 95,90 Z" fill="#5C1010" opacity="0.15" />
    <path d="M115,100 L108,140 M115,100 L122,140" />
    <path d="M104,55 L92,72 M126,55 L140,68" />
    {/* Figure 3 - Man, center */}
    <circle cx="190" cy="28" r="12" />
    <path d="M178,40 L178,95 M202,40 L202,95" />
    <path d="M178,95 L172,140 M202,95 L208,140" />
    <path d="M178,55 L162,70 M202,55 L218,62" />
    <path d="M180,40 Q190,46 200,40 L204,72 L176,72 Z" fill="#5C1010" opacity="0.2" />
    {/* Figure 4 - Woman, red dress raised arm */}
    <circle cx="265" cy="30" r="11" />
    <path d="M254,41 Q265,48 276,41 L284,92 Q265,102 246,92 Z" fill="#5C1010" opacity="0.2" />
    <path d="M265,102 L258,140 M265,102 L274,140" />
    <path d="M254,53 L240,38 M276,53 L290,72" />
    {/* Figure 5 - Woman, gold dress */}
    <circle cx="340" cy="35" r="11" />
    <path d="M329,46 Q340,53 351,46 L358,92 Q340,102 322,92 Z" fill="#5C1010" opacity="0.12" />
    <path d="M340,102 L334,140 M340,102 L348,140" />
    <path d="M329,56 L316,70 M351,56 L365,68" />
  </svg>
);

/* ─────────────── Wedding Car Illustration ─────────────── */
const WeddingCarIllustration = () => (
  <svg viewBox="0 0 300 160" className="w-64 mx-auto" stroke="#5C1010" strokeWidth="1.3" fill="none">
    {/* Car body */}
    <path d="M30,100 L30,70 Q50,40 100,35 L200,35 Q250,40 270,70 L270,100 Z" />
    {/* Roof curve */}
    <path d="M80,35 Q100,15 140,12 Q180,10 220,35" />
    {/* Windows */}
    <path d="M90,35 L85,70 L145,70 L145,35" />
    <path d="M155,35 L155,70 L215,70 L210,35" />
    {/* Wheels */}
    <circle cx="80" cy="105" r="22" />
    <circle cx="80" cy="105" r="12" />
    <circle cx="220" cy="105" r="22" />
    <circle cx="220" cy="105" r="12" />
    {/* Bumpers */}
    <path d="M25,90 L15,90 L15,100 L25,100" />
    <path d="M275,90 L285,90 L285,100 L275,100" />
    {/* Headlights */}
    <ellipse cx="268" cy="80" rx="6" ry="10" />
    {/* Cans on strings */}
    <line x1="280" y1="100" x2="280" y2="140" />
    <line x1="285" y1="100" x2="290" y2="145" />
    <line x1="275" y1="100" x2="270" y2="142" />
    <rect x="275" y="140" width="10" height="12" rx="2" />
    <rect x="285" y="144" width="10" height="12" rx="2" />
    <rect x="264" y="141" width="10" height="12" rx="2" />
    {/* Just Married sign */}
    <rect x="220" y="92" width="55" height="18" rx="3" />
    <text x="247" y="105" textAnchor="middle" fontSize="7" fontFamily="serif" stroke="none" fill="#5C1010">Just Married</text>
    {/* Flowers on top */}
    <circle cx="120" cy="28" r="6" fill="#5C1010" opacity="0.2" />
    <circle cx="140" cy="22" r="5" fill="#5C1010" opacity="0.2" />
    <circle cx="160" cy="25" r="6" fill="#5C1010" opacity="0.2" />
    <circle cx="180" cy="22" r="5" fill="#5C1010" opacity="0.2" />
    {/* Flower stems */}
    <line x1="120" y1="28" x2="120" y2="35" strokeWidth="0.8" />
    <line x1="140" y1="22" x2="140" y2="35" strokeWidth="0.8" />
    <line x1="160" y1="25" x2="160" y2="35" strokeWidth="0.8" />
    <line x1="180" y1="22" x2="180" y2="35" strokeWidth="0.8" />
  </svg>
);

/* ─────────────── Thank You Card (deckled edge) ─────────────── */
const ThankYouCard = () => (
  <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <mask id="deckle-mask">
          <path d="
            M20,20
            L380,20
            L380,380
            L20,380
            Z
          " fill="white" />
        </mask>
        <filter id="deckle">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="5" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <rect
        x="20" y="20"
        width="360" height="360"
        fill="white"
        filter="url(#deckle)"
        rx="6"
      />
      <rect
        x="20" y="20"
        width="360" height="360"
        fill="none"
        stroke="#5C1010"
        strokeWidth="28"
        filter="url(#deckle)"
        rx="6"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
      <h2 className="font-script text-5xl text-brand-red-dark mb-4">Thank You</h2>
      <p className="font-serif text-sm text-brand-red-dark/80 leading-relaxed mb-6">
        For joining us on this special day.<br />Your presence is the best gift we could receive.
      </p>
      <p className="font-script text-3xl text-brand-red-dark">Sam &amp; Sofia</p>
    </div>
  </div>
);

/* ─────────────── Section wrapper ─────────────── */
const Section = ({ children, className = '', dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
    className={`w-full py-24 px-6 flex flex-col items-center text-center ${dark ? 'bg-[#EDEAE6]' : 'bg-[#F4EDE4]'} ${className}`}
  >
    {children}
  </motion.section>
);

/* ─────────────── Main Page ─────────────── */
export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpChoice, setRsvpChoice] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="relative min-h-screen bg-[#F4EDE4] text-brand-dark overflow-hidden font-sans">
      <FlockingBirds />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex items-center justify-between z-[110] pointer-events-none">
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-full pl-2 pr-6 py-2 shadow-sm pointer-events-auto cursor-pointer border border-brand-accent/10">
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden bg-[#F4EDE4]">
            <span className="text-xs">🕊️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-semibold tracking-widest text-brand-red-dark leading-tight">Teatro Demo</span>
            <span className="text-[9px] font-sans text-brand-red-dark/60 leading-tight">Buy now</span>
          </div>
        </div>

        <button className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center pointer-events-auto border border-brand-accent/10">
          <Info size={16} className="text-brand-red-dark" />
        </button>

        <div className="flex bg-white/70 backdrop-blur-md rounded-full shadow-sm p-1 ml-4 pointer-events-auto border border-brand-accent/10">
          <button className="px-4 py-1.5 rounded-full text-[10px] font-semibold bg-brand-red-dark text-white shadow">EN</button>
          <button className="px-4 py-1.5 rounded-full text-[10px] font-semibold text-brand-red-dark hover:bg-gray-50 transition-colors">IT</button>
        </div>
      </header>

      <CurtainReveal>
        {/* ── SECTION 1: HERO INVITATION ── */}
        <Section className="min-h-screen justify-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="font-serif tracking-[0.18em] uppercase text-[10px] text-brand-red-dark/70">
              You are cordially invited to celebrate the wedding of
            </p>
            <div className="flex flex-col items-center -space-y-3">
              <h1 className="font-script text-[9rem] sm:text-[11rem] text-brand-red-dark leading-none">Sam</h1>
              <span className="font-script text-5xl text-brand-red-dark/60">&amp;</span>
              <h1 className="font-script text-[9rem] sm:text-[11rem] text-brand-red-dark leading-none">Sofia</h1>
            </div>
            <p className="font-serif text-[10px] tracking-[0.18em] uppercase text-brand-red-dark/70 max-w-lg mx-auto leading-relaxed">
              We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.
            </p>
            <div className="flex flex-col items-center pt-8 opacity-50 animate-bounce">
              <span className="font-serif text-[9px] tracking-[0.3em] uppercase text-brand-red-dark">Scroll</span>
              <span className="text-brand-red-dark text-lg">↓</span>
            </div>
          </div>
        </Section>

        {/* ── SECTION 2: SCRATCH TO REVEAL ── */}
        <Section dark>
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="space-y-2">
              <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-brand-red-dark/50">Scratch all three circles to continue</p>
              <h2 className="font-script text-7xl sm:text-8xl text-brand-red-dark">Reveal</h2>
              <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/70 font-semibold">Scratch to discover the date</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4">
              <ScratchOffCanvas width={200} height={200} revealText="10" />
              <ScratchOffCanvas width={200} height={200} revealText="Sept" />
              <ScratchOffCanvas width={200} height={200} revealText="2027" />
            </div>
          </div>
        </Section>

        {/* ── SECTION 3: COUNTDOWN + VENUE ── */}
        <Section>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-script text-6xl sm:text-7xl text-brand-red-dark">Countdown</h2>
            <Countdown />
            <p className="font-serif italic text-brand-red-dark/50 text-sm pt-2">until the big day</p>

            <div className="pt-16 space-y-6">
              <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-brand-red-dark/60">The celebration will take place at</p>
              <VenueIllustration />
              <div className="space-y-1 pt-2">
                <h3 className="font-serif text-4xl sm:text-5xl text-brand-red-dark">Villa Medicea di Artimino</h3>
                <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-brand-red-dark/60 pt-2">
                  Via di Papa Leone X, 28 · Artimino, Florencia
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-brand-red-dark pt-4">September 10, 2027</p>
                <p className="font-script text-4xl text-brand-red-dark/70 pt-2">Reception to Follow</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── SECTION 4: MENU ── */}
        <Section dark>
          <div className="max-w-lg mx-auto space-y-0 w-full">
            <MenuRibbonFrame />
            {/* Wavy border card */}
            <div className="border border-brand-red-dark/25 px-10 py-12 space-y-8 -mt-2">
              {[
                { course: 'APERITIVO', line1: 'Selección de antipasti toscanos', line2: 'Bruschetta, crostini & affettati misti' },
                { course: 'PRIMO', line1: 'Risotto al tartufo nero di Norcia', line2: 'con parmigiano reggiano 24 mesi' },
                { course: 'SECONDO', line1: 'Filetto di manzo alla griglia', line2: 'con salsa al vino rosso e verdure di stagione' },
                { course: 'DOLCE', line1: 'Torta nuziale con crema di mascarpone', line2: 'e frutti di bosco freschi' },
              ].map((item) => (
                <div key={item.course} className="space-y-1">
                  <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark">{item.course}</p>
                  <p className="font-serif text-sm text-brand-red-dark/80">{item.line1}</p>
                  <p className="font-serif italic text-sm text-brand-red-dark/60">{item.line2}</p>
                </div>
              ))}
            </div>
            <MenuRibbonBottom />
            <div className="pt-4 space-y-4">
              <DinnerTableIllustration />
              <p className="font-script text-3xl text-brand-red-dark italic">Vini della Tenuta</p>
            </div>
          </div>
        </Section>

        {/* ── SECTION 5: DRESS CODE ── */}
        <Section>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-script text-6xl sm:text-7xl text-brand-red-dark">Dress Code</h2>
            <DressCodeFigures />
            <p className="font-serif text-sm text-brand-red-dark/70 max-w-md mx-auto leading-relaxed">
              We invite you to dress elegantly and formally to celebrate this special day with us.
            </p>
            <h3 className="font-serif text-4xl sm:text-5xl text-brand-red-dark pt-2">Formal Attire</h3>
            <p className="font-script text-3xl text-brand-red-dark/60 italic">Please avoid wearing white</p>
          </div>
        </Section>

        {/* ── SECTION 6: GIFTS ── */}
        <Section dark>
          <div className="max-w-lg mx-auto space-y-6">
            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Wedding Registry</p>
            <WeddingCarIllustration />
            <h2 className="font-serif text-5xl sm:text-6xl text-brand-red-dark">Gifts</h2>
            <p className="font-serif text-sm text-brand-red-dark/70 max-w-md mx-auto leading-relaxed">
              Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.
            </p>
            <p className="font-script text-3xl text-brand-red-dark italic pt-2">With all our love</p>

            <div className="pt-4 space-y-3">
              <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Bank Details</p>
              <div className="border border-brand-red-dark/30 rounded-sm px-8 py-6 text-left space-y-2">
                <p className="font-serif text-xs text-brand-red-dark tracking-widest uppercase">Account Holder: Sam &amp; Sofia</p>
                <p className="font-serif text-xs text-brand-red-dark tracking-wider">IBAN: IT60 X054 2811 1010 0000 0123 456</p>
                <p className="font-serif text-xs text-brand-red-dark tracking-wider">BIC/SWIFT: BLOPIT22</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── SECTION 7: TRANSPORT ── */}
        <Section>
          <div className="max-w-lg mx-auto space-y-6">
            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Getting There</p>
            <h2 className="font-serif text-5xl sm:text-6xl text-brand-red-dark">Transport</h2>
            <div className="space-y-4 text-sm text-brand-red-dark/80 font-serif">
              <p>A private bus will be available for guests departing from <strong>Piazza della Signoria, Florence</strong>.</p>
              <div className="border-t border-brand-red-dark/15 pt-4 space-y-2">
                <p className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/50">Departure</p>
                <p>Saturday, September 10 · <span className="font-semibold">2:30 PM</span></p>
              </div>
              <div className="border-t border-brand-red-dark/15 pt-4 space-y-2">
                <p className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/50">Return</p>
                <p>Saturday, September 10 · <span className="font-semibold">1:00 AM</span></p>
              </div>
            </div>
            <p className="font-serif italic text-brand-red-dark/50 text-xs pt-4">
              Please indicate in your RSVP if you need transport.
            </p>
          </div>
        </Section>

        {/* ── SECTION 8: RSVP ── */}
        <Section dark>
          <div className="max-w-xl w-full mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/70 border border-brand-red-dark/20 rounded-full px-4 py-2">
              <Info size={12} className="text-brand-red-dark/60" />
              <span className="font-serif text-[10px] tracking-wide text-brand-red-dark/70">This form is fully customizable to your needs</span>
            </div>

            <h2 className="font-script text-5xl sm:text-6xl text-brand-red-dark">Confirm your attendance</h2>

            {/* Form card */}
            <div className="bg-white/60 backdrop-blur-sm border border-brand-red-dark/15 rounded-sm p-8 w-full text-left space-y-6">
              <div className="space-y-1">
                <label className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/70">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-brand-red-dark/20 rounded-none bg-transparent px-4 py-3 font-serif text-sm text-brand-red-dark placeholder:text-brand-red-dark/30 focus:outline-none focus:border-brand-red-dark/50"
                />
              </div>
              <div className="space-y-1">
                <label className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/70">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-brand-red-dark/20 rounded-none bg-transparent px-4 py-3 font-serif text-sm text-brand-red-dark placeholder:text-brand-red-dark/30 focus:outline-none focus:border-brand-red-dark/50"
                />
              </div>
              <div className="space-y-2">
                <label className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/70">Will you attend? *</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setRsvpChoice('yes')}
                    className={`flex-1 py-3 border rounded-none font-serif text-sm transition-all ${rsvpChoice === 'yes'
                        ? 'bg-brand-red-dark text-white border-brand-red-dark'
                        : 'border-brand-red-dark/25 text-brand-red-dark hover:border-brand-red-dark/60'
                      }`}
                  >
                    Yes, I&apos;ll be there!
                  </button>
                  <button
                    onClick={() => setRsvpChoice('no')}
                    className={`flex-1 py-3 border rounded-none font-serif text-sm transition-all ${rsvpChoice === 'no'
                        ? 'bg-brand-red-dark text-white border-brand-red-dark'
                        : 'border-brand-red-dark/25 text-brand-red-dark hover:border-brand-red-dark/60'
                      }`}
                  >
                    No, I can&apos;t make it
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/70">Message For The Couple (Optional)</label>
                <textarea
                  placeholder="Write us a few words..."
                  rows={4}
                  className="w-full border border-brand-red-dark/20 rounded-none bg-transparent px-4 py-3 font-serif text-sm text-brand-red-dark placeholder:text-brand-red-dark/30 focus:outline-none focus:border-brand-red-dark/50 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-[#8B6060]/80 hover:bg-brand-red-dark text-white font-serif text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                Confirm
              </button>
            </div>
          </div>
        </Section>

        {/* ── SECTION 9: FOOTER – THANK YOU CARD ── */}
        <section className="w-full py-24 px-8 flex flex-col items-center bg-[#F4EDE4]">
          <div className="max-w-md w-full">
            <ThankYouCard />
          </div>
        </section>

        {/* Floating Sound Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center z-[60] transition-colors border border-brand-red-dark/20 text-brand-red-dark hover:bg-white"
        >
          <span className="sr-only">Toggle Sound</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isPlaying ? (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            ) : (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            )}
          </svg>
        </button>
      </CurtainReveal>
    </div>
  );
}
