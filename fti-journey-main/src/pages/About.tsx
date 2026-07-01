import { motion, useScroll } from 'framer-motion';
import { Users, GraduationCap, Award, Plane, BookOpen, Clock, HeartHandshake, Briefcase, CheckCircle2, Building2, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useState, useEffect, useRef } from 'react';
import LottieIcon from '@/components/shared/LottieIcon';
import ResponsiveVideo from '@/components/media/ResponsiveVideo';
import { useCMS } from '@/context/CMSContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const defaultTeam = [
  {
    id: '1',
    name: 'Zahoor Ilahi',
    role: 'Founder & CEO',
    image: '/ceo.jpg',
  },
  {
    id: '2',
    name: 'Sarah Khan',
    role: 'Head of Admissions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Ali Hassan',
    role: 'Visa Specialist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Fatima Noor',
    role: 'IELTS Head Trainer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
  },
];

const journeyEvents = [
  { year: '2012', title: 'Founding Year', description: 'FTI Consultants founded in Gujranwala with a vision to democratize international education.' },
  { year: '2015', title: 'IELTS Academy Launch', description: 'Launched dedicated IELTS Academy with state-of-the-art language labs.' },
  { year: '2018', title: 'Regional Expansion', description: 'Expanded to Lahore and Islamabad to serve students across wider Punjab.' },
  { year: '2022', title: '10,000 Milestone', description: 'Celebrated 10,000+ successful student placements since our inception.' },
  { year: '2024', title: 'Global Grid', description: 'Added 50+ new university partnerships across Europe and North America.' },
  { year: '2026', title: 'Digital Transformation', description: 'Leading the region with a comprehensive digital Study Abroad platform.' },
];

// Elements removed as per user request

const values = [
  {
    image: 'C:\\Users\\behzad\\.gemini\\antigravity\\brain\\822ccb1a-ca12-427f-b105-eee5b0585b56\\excellence_value_cinematic_1773140503430.png',
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide, setting global benchmarks.',
  },
  {
    image: 'C:\\Users\\behzad\\.gemini\\antigravity\\brain\\822ccb1a-ca12-427f-b105-eee5b0585b56\\student_first_value_cinematic_1773140519664.png',
    title: 'Student-First',
    description: 'Your success and satisfaction are our top priorities, guiding every decision.',
  },
  {
    image: 'C:\\Users\\behzad\\.gemini\\antigravity\\brain\\822ccb1a-ca12-427f-b105-eee5b0585b56\\integrity_value_cinematic_1773140707767.png',
    title: 'Integrity',
    description: 'We maintain absolute transparency and honesty in all our academic dealings.',
  },
];

const About = () => {
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollReveal(0.1);
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal(0.1);
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const { cmsData } = useCMS();

  useEffect(() => {
    const savedTeam = localStorage.getItem('fti_team');
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  return (
    <Layout>
      <div className="page-transition">
        {/* Profile Hero Section */}
        {/* Profile Hero Section - High Fidelity 'Ayar' Powered Design */}
        <section className="min-h-[75vh] flex items-center relative overflow-hidden bg-slate-900 py-16 px-4">

          {/* Layer 1: Intense Animated Orange Vortex Background */}
          <div className="absolute inset-0 bg-[#0F172A]">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-amber-500/10" />

            {/* Moving Light Rays */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,transparent_70%)] opacity-50 hidden md:block"
            />
          </div>

          {/* Layer 2: Kinetic Floating Branded Elements (Ayar Experience) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  y: [null, (Math.random() * 200 - 100) + "px"],
                  x: [null, (Math.random() * 200 - 100) + "px"],
                  rotate: [0, 360],
                  opacity: [0, 0.15, 0]
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute text-orange-400"
              >
                {i % 3 === 0 ? <GraduationCap className="w-32 h-32" strokeWidth={0.5} /> :
                  i % 3 === 1 ? <Plane className="w-24 h-24" strokeWidth={0.5} /> :
                    <Award className="w-28 h-28" strokeWidth={0.5} />}
              </motion.div>
            ))}
          </div>

          {/* Layer 3: Dynamic Liquid Orbs (High Depth) - hidden on mobile for performance */}
          <div className="absolute inset-0 overflow-hidden hidden md:block">
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                x: [0, 150, 0],
                y: [0, -100, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] -left-[5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 0.8, 1.2],
                x: [0, -150, 0],
                y: [0, 100, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[110px]"
            />
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              {/* Glassmorphic Ultra-Premium Card Container */}
              <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 shadow-[0_50px_150px_-50px_rgba(251,146,60,0.4)] text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/5 opacity-40 pointer-events-none" />

                {/* Visual Accent - Top Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] md:leading-[1] tracking-tighter relative z-10"
                >
                  {cmsData.aboutHeroTitle.includes('Since') ? (
                    <>{cmsData.aboutHeroTitle.split('Since')[0]}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 drop-shadow-2xl italic tracking-tightest">Since{cmsData.aboutHeroTitle.split('Since')[1]}</span></>
                  ) : cmsData.aboutHeroTitle}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 relative z-10 font-normal px-2 md:px-8"
                >
                  {cmsData.aboutHeroDescription}
                </motion.p>

                <div className="flex flex-wrap justify-center gap-6 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="rounded-full px-12 h-16 text-lg font-black shadow-[0_30px_60px_-15px_rgba(249,115,22,0.6)] bg-primary hover:bg-orange-600 border-2 border-white/20 transition-all duration-500 group overflow-hidden relative" asChild>
                      <Link to="/free-consultation" className="flex items-center gap-4">
                        <span className="relative z-10 flex items-center gap-4 text-white">
                          Start Strategy Session
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-700" />
                        </span>
                        {/* Light sweep animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Internal Layer Decorative Elements */}
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-screen opacity-60 animate-pulse" />
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none mix-blend-screen opacity-60 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </section>



        {/* CEO Message Section - Enhanced with Warm Orange Shade & Floating Elements */}
        <section className="py-20 md:py-28 bg-[#1a0f04] relative overflow-hidden">
          {/* Intense Orange Glows for the "Orange Shade" request */}
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/25 rounded-full blur-[180px] -z-0 hidden md:block" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-amber-600/20 rounded-full blur-[150px] -z-0 hidden md:block" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.08),transparent_70%)]" />

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ y: [0, -40, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[15%] opacity-15 text-primary z-0"
          >
            <CheckCircle2 className="w-56 h-56" strokeWidth={0.3} />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-8 bg-primary/15 rounded-[4rem] -z-10 blur-3xl opacity-50 animate-pulse" />
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] relative group border border-white/5 max-w-lg mx-auto lg:mx-0"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    src="/ceo.jpg"
                    alt="Zahoor Ilahi"
                    className="w-full h-[500px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <p className="font-black text-2xl md:text-3xl text-white mb-1 md:mb-2 tracking-tight">Zahoor Ilahi</p>
                    <div className="flex items-center gap-3">
                      <p className="text-primary font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">Founder & CEO</p>
                      <div className="h-0.5 w-6 md:w-10 bg-primary/40 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 md:space-y-10"
              >
                <div className="relative inline-block">
                  <span className="text-primary font-black text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block">Director's Message</span>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
                </div>

                <motion.h2 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl md:text-6xl font-black text-white leading-[1.2] md:leading-[1.1] tracking-tighter"
                >
                  From One Student <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">To Every Dreamer</span>
                </motion.h2>

                <div className="space-y-8">
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 0.5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                    <p className="italic font-bold text-xl md:text-2xl text-slate-200 leading-relaxed relative z-10">
                      "Excellence is not an act, but a habit. At FTI, we've made it our habit to put student success at the epicenter of our operations."
                    </p>
                  </motion.div>

                  <motion.p 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
                  >
                    "We don't just process applications; we architect careers. Our journey started in 2012 with a simple mission: to provide honest, ethical, and world-class guidance to Pakistani students seeking global education."
                  </motion.p>

                  <motion.div
                    animate={{ y: [0, -20, 0], scale: [1, 1.01, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    whileHover={{ scale: 1.02, y: -25 }}
                    className="font-black text-white border border-primary/20 rounded-[3rem] p-10 bg-gradient-to-br from-primary/10 to-transparent shadow-2xl relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-xl md:text-2xl leading-relaxed relative z-10">
                      Today, with a network of 300+ universities, we remain committed to that same integrity. Your dreams are our responsibility.
                    </p>
                    <div className="mt-10 flex items-center justify-between relative z-10">
                      <div className="flex flex-col">
                        <span className="text-primary font-black text-2xl italic tracking-tighter">Zahoor Ilahi</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">Official Seal of Commitment</span>
                      </div>
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section - Enhanced with Motion */}
        <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden" ref={journeyRef}>
          {/* Section Background Decoration & Snow Animation */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-60 z-10" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-60 z-10" />

          {/* Premium Multi-color Snow Layer - hidden on mobile for performance */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: -20,
                  opacity: 0,
                  scale: Math.random() * 0.4 + 0.2
                }}
                animate={{
                  y: "120%",
                  x: (Math.random() * 20 - 10) + "%",
                  opacity: [0, 0.6, 0.6, 0],
                  rotate: 360
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 15
                }}
                className="absolute w-2 h-2 rounded-full blur-[1px]"
                style={{
                  background: `radial-gradient(circle, ${['#ff6b2b', '#3b82f6', '#f59e0b', '#ffffff'][i % 4]} 0%, transparent 80%)`
                }}
              />
            ))}
          </div>

          {/* Floating Decorative Elements - hidden on mobile for performance */}
          <div className="hidden md:block">
            <motion.div
              animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-10 opacity-[0.2] text-orange-950"
            >
              <Plane className="w-64 h-64" strokeWidth={0.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 50, 0], x: [0, -30, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 -right-16 opacity-[0.15] text-slate-950"
            >
              <Briefcase className="w-80 h-80" strokeWidth={0.3} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -60, 0], rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/3 left-1/4 opacity-[0.12] text-slate-950 pointer-events-none"
            >
              <GraduationCap className="w-72 h-72" strokeWidth={0.3} />
            </motion.div>
            <motion.div
              animate={{ rotate: 360, y: [0, 30, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 right-[15%] opacity-[0.08] text-primary pointer-events-none"
            >
              <BookOpen className="w-64 h-64" strokeWidth={0.3} />
            </motion.div>
            <motion.div
              animate={{ x: [-100, 100], y: [-10, 10, -10] }}
              transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-1/2 left-0 w-full opacity-[0.12] pointer-events-none"
            >
              <Plane className="w-96 h-96 mx-auto -translate-y-1/2 text-orange-950" strokeWidth={0.2} />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-[0.3em] uppercase mb-2 block underline decoration-4 underline-offset-8">Our Heritage</span>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mt-4">The FTI Journey Timeline</h2>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 md:px-0">
              {/* Vertical Progress Line Container */}
              <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2 overflow-hidden rounded-full">
                {/* Filling Progress Line */}
                <motion.div
                  style={{
                    scaleY: useScroll({
                      target: journeyRef,
                      offset: ["start center", "end center"]
                    }).scrollYProgress
                  }}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-primary origin-top"
                />
              </div>

              <div className="space-y-8 md:space-y-16">
                {journeyEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="flex-1 w-full pl-16 md:pl-0">
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? -0.5 : 0.5 }}
                        className={`p-6 md:p-8 rounded-[2rem] bg-white shadow-soft hover:shadow-hover border border-slate-50 group transition-all duration-500 relative ${idx % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}
                      >
                        <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-t border-l border-slate-50 rotate-45 hidden md:block ${idx % 2 === 0 ? 'left-full -translate-x-3 border-l-0 border-b-0 border-r border-t rotate-45' : 'right-full translate-x-3'}`} />

                        <div className="text-primary font-black text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">{event.year}</div>
                        <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">{event.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-base">{event.description}</p>
                      </motion.div>
                    </div>

                    {/* Node with Moving "Journey Car" */}
                    <div className="absolute left-[30px] md:left-1/2 top-[30px] md:top-auto z-20 w-8 h-8 -translate-x-1/2 flex items-center justify-center">
                      <motion.div
                        whileInView={{ scale: [0, 1.2, 1], backgroundColor: ["#ffffff", "#ff6b2b"] }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="w-10 h-10 rounded-full border-4 border-white shadow-2xl flex items-center justify-center relative bg-white"
                      >
                        <div className="w-3 h-3 rounded-full bg-primary relative z-10" />

                        {/* Interactive Travel Indicator (Floating Car-like motion) */}
                        <motion.div
                          animate={{
                            y: [0, -15, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -top-10 text-primary opacity-40"
                        >
                          <Plane className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values and Mission Cards - Redesigned to be Compact */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-2 block">Our Foundation</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter mt-2">Mission & Vision</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-[#2d1a0a] border border-orange-500/20 hover:border-orange-500/40 transition-all duration-700 relative overflow-hidden text-orange-50 shadow-2xl min-h-[350px] md:min-h-[450px] flex flex-col justify-center"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <GraduationCap className="w-6 h-6 md:w-10 md:h-10 text-white" />
                </div>
                
                <h3 className="text-xl md:text-4xl font-black text-orange-400 mb-4 md:mb-6 tracking-tight">Our Mission</h3>
                <p className="text-orange-100/80 text-base md:text-xl leading-relaxed">
                  To empower global careers through <span className="text-orange-400 font-bold">ethical advocacy</span> and personalized education mapping. We bridge the gap between brilliant minds and world-class academic institutions.
                </p>
                
                <div className="mt-6 md:mt-8 w-16 h-1 bg-orange-500/30 rounded-full group-hover:w-32 transition-all duration-700" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-[#1a0f04] border border-orange-500/30 hover:border-orange-500/50 transition-all duration-700 relative overflow-hidden text-orange-50 shadow-2xl min-h-[350px] md:min-h-[450px] flex flex-col justify-center"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.6)] flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <Award className="w-6 h-6 md:w-10 md:h-10 text-white" />
                </div>
                
                <h3 className="text-xl md:text-4xl font-black text-amber-500 mb-4 md:mb-6 tracking-tight">Our Vision</h3>
                <p className="text-orange-100/70 text-base md:text-xl leading-relaxed">
                  To be the <span className="text-orange-400 font-bold">most trusted name</span> in global education, recognized for integrity, student success, and our commitment to architectural career planning.
                </p>
                
                <div className="mt-6 md:mt-8 w-16 h-1 bg-amber-500/30 rounded-full group-hover:w-32 transition-all duration-700" />
              </motion.div>
            </div>
          </div>
        </section>







        {/* Final CTA - Refined & Compact */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          {/* Animated Background Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 hidden md:block"
          />

          <div className="container mx-auto px-4">
            <div className="gradient-primary rounded-[4rem] p-10 md:p-20 text-center relative overflow-hidden shadow-[0_30px_70px_-15px_rgba(255,107,44,0.25)]">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[120px] -z-10 translate-y-1/2 -translate-x-1/2" />

              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight tracking-tight"
              >
                Architect Your <br className="hidden md:block" /> Global Future.
              </motion.h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-10 text-base md:text-lg relative z-10 font-medium tracking-tight">
                Join 12,000+ success stories. Book an elite-level strategy session with our world-class team.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 inline-block"
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-slate-100 rounded-full px-12 h-16 text-lg font-black shadow-xl group transition-all"
                  asChild
                >
                  <Link to="/free-consultation" className="flex items-center gap-3">
                    Get Free Strategy Session
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;

