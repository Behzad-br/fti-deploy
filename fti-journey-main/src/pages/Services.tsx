import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Plane, GraduationCap, Award, BookOpen, FileCheck, ArrowRight, CheckCircle2, Sparkles, Building, Search, Mic, Home } from 'lucide-react';
import { useCMS } from '@/store/CMSContext';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'career-counseling',
    icon: GraduationCap,
    title: 'Career Counseling',
    description: 'Expert guidance to help you discover your true potential and choose a career path that aligns with your passions and global opportunities.',
    features: [
      'One-on-one personalized sessions',
      'Career path mapping',
      'Future job market analysis',
      'Skill gap assessment',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'institute-selection',
    icon: Building,
    title: 'Institute Selection',
    description: 'We help you find the perfect university or college from our extensive network of elite global educational institutions.',
    features: [
      'University ranking analysis',
      'Campus facility evaluation',
      'Budget and location matching',
      'Alumni network insights',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'course-selection',
    icon: Search,
    title: 'Course Selection',
    description: 'Navigate through thousands of programs to select the exact course that maximizes your career prospects and academic strengths.',
    features: [
      'Curriculum deep dive',
      'Credit transfer options',
      'Internship opportunities analysis',
      'Post-study work rights alignment',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'admission-processing',
    icon: FileCheck,
    title: 'Admission Processing',
    description: 'End-to-end management of your university applications, ensuring flawless documentation and a compelling presentation of your profile.',
    features: [
      'Application form assistance',
      'Statement of Purpose (SOP) guidance',
      'Document verification',
      'Direct university communication',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'scholarship-assistance',
    icon: Award,
    title: 'Scholarship Assistance',
    description: 'Maximize your chances of securing financial aid with our expert guidance on scholarship applications, essays, and criteria matching.',
    features: [
      'Scholarship opportunity research',
      'Eligibility assessment',
      'Application essay polishing',
      'Fee waiver negotiations',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'visa-application',
    icon: Plane,
    title: 'Visa Application',
    description: 'Expert visa filing support with an industry-leading success rate. We ensure all legal and financial documentation is perfectly prepared.',
    features: [
      'Visa document checklist',
      'Financial documentation guidance',
      'Embassy form filling',
      'Application tracking',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'interview-preparation',
    icon: Mic,
    title: 'Interview Preparation',
    description: 'Comprehensive mock interviews and coaching to help you confidently face university admissions and embassy visa officers.',
    features: [
      'Mock visa interviews',
      'University admission interviews',
      'Confidence building exercises',
      'Common question breakdowns',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'accommodation-arrangements',
    icon: Home,
    title: 'Accommodation Arrangements',
    description: 'Secure safe, comfortable, and budget-friendly housing options near your campus before you even fly out to your destination.',
    features: [
      'On-campus housing assistance',
      'Off-campus apartment hunting',
      'Homestay arrangements',
      'Lease agreement guidance',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    id: 'ielts-pte-preparation',
    icon: BookOpen,
    title: 'IELTS & PTE Preparation',
    description: 'Top-tier language training with certified experts, utilizing AI-powered labs and mock tests to guarantee your target score.',
    features: [
      'Certified trainers',
      'AI-powered practice portal',
      'Unlimited mock tests',
      'Score guarantee strategies',
    ],
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  }
};

const Services = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [callbackPhone, setCallbackPhone] = useState('');
  const { cmsData } = useCMS();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) {
      toast({ title: 'Please enter your phone number', variant: 'destructive' });
      return;
    }
    toast({ title: 'Callback requested!', description: 'Our counsellor will call you soon.' });
    setCallbackPhone('');
  };

  return (
    <Layout>
      <div className="page-transition bg-white overflow-hidden">

        {/* ── REDESIGNED PREMIUM HERO ── */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[50vh] flex items-center">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 z-0 bg-orange-500">
            {/* Orange Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 via-orange-500/90 to-amber-500/80"></div>
            
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-br from-orange-600/40 via-amber-500/40 to-yellow-500/40 blur-3xl -z-10"
            />
            {/* Glowing Orbs */}
            <motion.div
              animate={{ y: [-20, 20, -20], x: [-20, 20, -20], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ y: [20, -20, 20], x: [20, -20, 20], scale: [1.2, 1, 1.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-yellow-300/20 rounded-full blur-[120px]"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Text Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 text-center lg:text-left"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight"
                  variants={containerVariants}
                >
                  Comprehensive<br />
                  <span className="text-orange-900 drop-shadow-sm">
                    Education Solutions.
                  </span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="text-lg md:text-xl text-orange-50 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 font-medium"
                >
                  From initial counselling to landing in your dream country, we architect your entire global journey with elite-level precision and unmatched expertise.
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <Link
                    to="/free-consultation"
                    className="group relative inline-flex items-center justify-center bg-white text-orange-600 font-bold px-8 py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    to="#services"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-orange-900 text-white font-semibold hover:bg-orange-800 transition-colors shadow-lg"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visual Element (Glass Cards) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex-1 relative hidden lg:block"
              >
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-10 w-64 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
                  >
                    <Plane className="w-10 h-10 text-white mb-4 opacity-90" />
                    <h3 className="text-white font-bold text-xl mb-2">Visa Success</h3>
                    <p className="text-white/90 text-sm">Industry leading 98% visa approval rate across all major destinations.</p>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ y: [10, -10, 10] }} 
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-10 left-0 w-72 p-6 bg-gradient-to-br from-orange-500/90 to-amber-600/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-10"
                  >
                    <Award className="w-10 h-10 text-white mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">20+ Years of Excellence</h3>
                    <p className="text-white/80 text-sm">Over two decades of trusted experience in shaping successful global careers.</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ── REDESIGNED INTERACTIVE SERVICES GRID ── */}
        <section id="services" className="py-24 relative" ref={ref}>
          <div className="absolute inset-0 bg-white" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Our <span className="text-orange-500">Services</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const isHovered = hoveredCard === service.id;
                return (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    onHoverStart={() => setHoveredCard(service.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    custom={index}
                    className="relative group cursor-pointer h-full"
                  >
                    {/* Glowing background effect on hover */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} rounded-[2rem] blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                    
                    <div className="relative h-full bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
                      
                      {/* Top Color Bar */}
                      <div className={`h-2 w-full bg-gradient-to-r ${service.color}`} />

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-8">
                          <motion.div 
                            animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg relative`}
                          >
                            <service.icon className="h-8 w-8 text-white relative z-10" />
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md"></div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            className={`w-10 h-10 rounded-full ${service.lightBg} flex items-center justify-center`}
                          >
                            <ArrowRight className={`w-5 h-5 text-slate-700`} />
                          </motion.div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                          {service.title}
                        </h3>

                        <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                          {service.description}
                        </p>

                        <div className="mt-auto relative">
                          {/* Animated line separator */}
                          <motion.div 
                            className="h-[1px] bg-slate-100 mb-6 w-full origin-left"
                            animate={{ scaleX: isHovered ? 1 : 0.3 }}
                            transition={{ duration: 0.4 }}
                          />

                          <ul className="space-y-3">
                            <AnimatePresence>
                              {service.features.slice(0, 3).map((feature, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0.7, x: 0 }}
                                  animate={{ 
                                    opacity: isHovered ? 1 : 0.7,
                                    x: isHovered ? 4 : 0
                                  }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-start gap-3 text-sm font-medium text-slate-600"
                                >
                                  <motion.div
                                    animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.3 }}
                                  >
                                    <CheckCircle2 className={`w-5 h-5 text-orange-500 shrink-0`} />
                                  </motion.div>
                                  {feature}
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DYNAMIC CTA SECTION ── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-orange-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Dynamic CTA Background */}
              <motion.div 
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.4),_transparent_60%)]" 
              />
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]" />

              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
                >
                  Ready to Take the <span className="text-orange-400">First Step?</span>
                </motion.h2>


                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onSubmit={handleCallback} 
                  className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20"
                >
                  <Input
                    type="tel"
                    placeholder="Enter your phone number..."
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="flex-grow h-14 bg-transparent border-none text-white placeholder:text-slate-400 focus-visible:ring-0 text-lg px-6 rounded-full"
                  />
                  <Button
                    type="submit"
                    className="h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  >
                    Get a Call
                  </Button>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Services;
