import { motion } from 'framer-motion';
import { Check, Monitor, Cpu, User, Cloud, ArrowRight, Star, Bot, Network, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { useCMS } from '@/store/CMSContext';


const features = [
  { icon: Monitor, text: 'Technology-based classrooms' },
  { icon: Cpu, text: 'All-in-one practice systems' },
  { icon: User, text: 'Pearson PTE Registration Center' },
  { icon: Cloud, text: 'Individual online portal access' },
];

const advantages = [
  'Computer-based test simulation',
  'AI-powered scoring for instant feedback',
  'Unlimited practice tests',
  'Individual progress tracking',
  'Flexible scheduling',
  'Fast score delivery (typically 2-5 days)',
];



import PromoBoard from '@/components/shared/PromoBoard';

const PTE = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { cmsData } = useCMS();


  return (
    <Layout>
      <SEO 
        title="Top PTE Preparation Center in Pakistan | FTI Consultant" 
        description="Ace your PTE exam with FTI Consultant. We offer technology-based classrooms, Pearson PTE registration, computer-based mock tests, and expert language trainers."
        keywords="PTE preparation center, PTE classes pakistan, Pearson PTE registration, computer based english test, fti consultant pte, PTE mock tests"
        url="https://fticonsultants.com/pte"
      />
      <div className="page-transition">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20 md:py-32 relative overflow-hidden">

          {/* Floating AI Elements */}
          <motion.div 
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] md:left-[15%] bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(255,255,255,0.1)] z-0"
          >
            <Cpu className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [20, -20, 20], x: [10, -10, 10], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[5%] md:left-[20%] bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-[0_10px_30px_rgba(255,255,255,0.1)] z-0"
          >
            <Bot className="w-6 h-6 md:w-10 md:h-10 text-white" />
          </motion.div>

          <motion.div 
            animate={{ y: [-15, 15, -15], scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[20%] right-[10%] md:right-[15%] bg-white/10 backdrop-blur-md p-5 rounded-full border border-white/20 shadow-[0_10px_30px_rgba(255,255,255,0.1)] z-0"
          >
            <Network className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </motion.div>

          <motion.div 
            animate={{ y: [15, -15, 15], scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[15%] right-[5%] md:right-[20%] bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-[0_10px_30px_rgba(255,255,255,0.1)] z-0"
          >
            <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-white" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/30 rounded-[3rem] px-16 py-10 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300">
                <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter drop-shadow-2xl leading-none">
                  PTE
                </h1>
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {cmsData.pteHeroDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-orange-500 bg-transparent backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href="https://fti.portal.alfapte.com/v1/wc/login" target="_blank" rel="noopener noreferrer">
                    Access Your Portal
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>





        {/* Features */}
        <section className="py-20 bg-white" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                  whileHover={{ scale: 1.05, y: -15, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 bg-orange-50 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(255,165,0,0.05)] hover:shadow-[0_20px_40px_rgba(255,165,0,0.15)] border border-orange-100/50 hover:border-orange-200 transition-colors group cursor-default relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-colors" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-slate-800 leading-tight relative z-10 group-hover:text-primary transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Why PTE */}
            <div className="grid md:grid-cols-2 gap-16 items-center mt-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 relative z-10 tracking-tight">
                  Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">PTE?</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
                  {advantages.map((adv, index) => {
                    const cardImages = [
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
                      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
                      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
                      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&h=300&fit=crop",
                      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=500&h=300&fit=crop"
                    ];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 }}
                        className="flex flex-col bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] hover:border-orange-200 transition-all duration-500 cursor-default relative overflow-hidden group"
                      >
                        <div className="h-48 w-full overflow-hidden relative">
                          <img src={cardImages[index]} alt={adv} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                            <Check className="h-6 w-6 text-white" strokeWidth={3} />
                          </div>
                        </div>
                        <div className="p-6 relative bg-white">
                          <span className="text-slate-800 font-bold text-xl leading-snug group-hover:text-orange-600 transition-colors duration-300 block">{adv}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative perspective-1000 mt-20"
              >
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 lg:p-16 overflow-hidden relative shadow-2xl border border-slate-700">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl" />
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex items-center justify-center lg:justify-start">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        <Button
                          size="xl"
                          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(255,165,0,0.4)] border border-orange-400 h-16 px-8 group"
                          asChild
                        >
                          <Link to="/apply-pte" className="flex items-center justify-center">
                            Book Now
                            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    <div className="relative h-[350px] w-full flex items-center justify-center mt-10 lg:mt-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-full blur-2xl animate-pulse" />
                      
                      <motion.div 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-20 bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-600 shadow-2xl"
                      >
                        <Monitor className="w-24 h-24 text-orange-400" strokeWidth={1.5} />
                      </motion.div>
                      
                      <motion.div 
                        animate={{ y: [-20, 20, -20], x: [10, -10, 10], rotate: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-10 left-10 z-10 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl"
                      >
                        <Bot className="w-8 h-8 text-amber-300" />
                      </motion.div>

                      <motion.div 
                        animate={{ y: [20, -20, 20], x: [-15, 15, -15], rotate: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-10 right-10 z-10 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl"
                      >
                        <Cpu className="w-8 h-8 text-orange-500" />
                      </motion.div>

                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-20 z-10"
                      >
                        <Sparkles className="w-8 h-8 text-amber-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Success Stories / Testimonials */}
        <AnimatedSection className="py-32 overflow-hidden bg-[#f5f5f5] relative">
          
          <div className="container mx-auto px-4 mb-16 relative z-10">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-center tracking-tight text-slate-900 mb-4">Our Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Successes</span></h2>
            </div>
          </div>
          
          <div className="relative z-10 py-4">
            <div className="absolute left-0 top-0 h-full w-20 md:w-60 bg-gradient-to-r from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 md:w-60 bg-gradient-to-l from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            
            <Marquee gradient={false} speed={50} pauseOnHover={true} direction="left" className="py-8">
              {cmsData.pteSuccessImages.map((src, i) => (
                  <div key={i} className="mx-5 flex-shrink-0 group">
                      <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-72 md:w-80 h-96 md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-500 bg-white relative cursor-grab active:cursor-grabbing"
                      >
                          <img
                              src={src}
                              alt={`PTE Achiever ${i + 1}`}
                              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&fit=crop';
                              }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                              <p className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 drop-shadow-md">FTI Achiever</p>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-black text-2xl drop-shadow-lg">Verified Score</span>
                                <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                              </div>
                          </div>
                      </motion.div>
                  </div>
              ))}
            </Marquee>
          </div>
        </AnimatedSection>

      </div>
    </Layout>
  );
};

export default PTE;
