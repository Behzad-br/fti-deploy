import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Shield, Award, Users, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ParticlesBackground from '@/components/shared/ParticlesBackground';
import { useCMS } from '@/context/CMSContext';

const Spline = lazy(() => import('@splinetool/react-spline'));

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const { cmsData } = useCMS();

  const heroTexts = [
    "YOUR GATEWAY TO GLOBAL EDUCATION",
    "EXPERT VISA & CAREER COUNSELLING",
    "TRUSTED BY 11,000+ STUDENTS"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('open-whatsapp-selector'));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "anticipate",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-20">
      {/* Dynamic Background with Particles */}
      <ParticlesBackground />

      {/* Premium Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Glass Shapes & Reflections */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/20 blur-[80px] mix-blend-screen hidden md:block"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] left-[2%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen hidden md:block"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-400/10 to-primary/10 blur-[80px] hidden md:block"
        />

        {/* Subtle SVG shapes */}
        <div className="absolute top-1/4 right-1/4 opacity-[0.05] rotate-12 scale-150">
          <Shield className="w-64 h-64 text-primary" />
        </div>
      </div>

      {/* Full Screen Skyline Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url('${cmsData.homeHeroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          margin: 0,
          padding: 0
        }}
      />

      <div className="container mx-auto px-4 relative z-10 scale-95 md:scale-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/40 rounded-full px-6 py-2.5 shadow-soft mb-10 hover:bg-white/60 transition-all duration-500 cursor-default group"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_12px_rgba(249,115,22,0.6)] group-hover:bg-primary-dark transition-colors"></span>
            </span>

            <div className="h-[32px] md:h-[40px] flex items-center overflow-hidden relative min-w-[280px] xs:min-w-[320px] md:min-w-[450px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "anticipate" }}
                  className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-extrabold text-foreground tracking-[0.15em] uppercase whitespace-nowrap"
                >
                  {heroTexts[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="relative mb-8">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.85] tracking-tighter"
            >
              Pakistan's Trusted Partner for <br />
              <span className="text-gradient drop-shadow-md inline-block mt-2 text-glow">Study Abroad & Visa Guidance</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-muted-foreground/80 mb-12 max-w-2xl leading-relaxed font-medium mx-auto"
          >
            Empowering students to achieve their dreams with expert guidance for <span className="text-foreground font-bold border-b-2 border-primary/20 pb-0.5">Australia, Canada, Europe, UK, USA, etc.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-16 w-full"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button size="xl" className="rounded-full px-16 h-16 text-lg font-bold shadow-button hover:shadow-hover hover:-translate-y-1 active:scale-95 transition-all duration-300 group reflection-sweep overflow-hidden" asChild>
                <Link to="/free-consultation">
                  Free Consultation
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2"
          >
            {[
              { icon: Clock,        text: "20+ Years of Excellence",       color: "text-blue-500",   bg: "bg-blue-50" },
              { icon: Users,        text: "11,000+ Success Stories",           color: "text-green-500", bg: "bg-green-50" },
              { icon: GraduationCap, text: "Official University Rep",   color: "text-purple-500",bg: "bg-purple-50" },
              { icon: BookOpen,     text: "Authorized IELTS Test Centre",      color: "text-orange-500",bg: "bg-orange-50" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group flex flex-col items-center gap-2 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-4 shadow-soft hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <span className="text-[11px] md:text-sm font-bold text-foreground/80 tracking-tight text-center leading-tight">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* No bottom wave for a clean straight transition */}
    </section>
  );
};

export default HeroSection;
