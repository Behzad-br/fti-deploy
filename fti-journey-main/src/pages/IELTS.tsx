import { motion } from 'framer-motion';
import {
  Check, Users, Clock, Award, BookOpen, Mic, PenTool,
  Headphones, ArrowRight, Star, Target, GraduationCap,
  Trophy, Zap, Sparkles, ChevronRight, Globe, Phone, MessageCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCMS } from '@/context/CMSContext';

import Marquee from 'react-fast-marquee';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import PromoBoard from '@/components/shared/PromoBoard';
import FacultyGrid from '@/components/common/FacultyGrid';
import IELTSHero from '@/components/ielts/IELTSHero';
import PartnershipSection from '@/components/ielts/PartnershipSection';
import AcademicDirectorSection from '@/components/ielts/AcademicDirectorSection';
import AEOTestingCenter from '@/components/ielts/AEOTestingCenter';
import IELTSServices from '@/components/ielts/IELTSServices';
import IELTSBooks from '@/components/ielts/IELTSBooks';
import { ParticlesBackground } from '@/components/shared/ParticlesBackground';
import AnimatedSection from '@/components/animations/AnimatedSection';
import StaggerContainer from '@/components/animations/StaggerContainer';




const IELTS = () => {
  const { cmsData } = useCMS();


  // Staggered generic variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Layout>
      <div className="page-transition min-h-screen bg-orange-50/10 font-sans relative overflow-x-hidden">
        <ParticlesBackground />
        
        {/* Ayar-style Background Glows */}
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />
        <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />
        <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />

        <IELTSHero />

        <div className="relative z-10">
          <PartnershipSection />
          <AEOTestingCenter />
          <AcademicDirectorSection />
          <IELTSServices />
        </div>


        {/* Success Stories / Testimonials */}
        <AnimatedSection className="py-32 overflow-hidden bg-[#f5f5f5] relative">
          
          <div className="container mx-auto px-4 mb-16 relative z-10">
            <div className="text-center">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">Wall of Fame</span>
              <h2 className="text-4xl md:text-6xl font-black text-center tracking-tight text-slate-900 mb-4">Our Recent Successes</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Real students, real bands. Browse through our top achievers.</p>
            </div>
          </div>
          
          <div className="relative z-10 py-4">
            <div className="absolute left-0 top-0 h-full w-20 md:w-60 bg-gradient-to-r from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 md:w-60 bg-gradient-to-l from-[#f5f5f5] to-transparent z-20 pointer-events-none" />
            
            <Marquee gradient={false} speed={50} pauseOnHover={true} direction="left" className="py-8">
              {cmsData.ieltsSuccessImages.map((src, i) => (
                  <div key={i} className="mx-5 flex-shrink-0 group">
                      <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-72 md:w-80 h-96 md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white hover:border-orange-200 transition-all duration-500 bg-white relative cursor-grab active:cursor-grabbing"
                      >
                          <img
                              src={src}
                              alt={`IELTS Achiever ${i + 1}`}
                              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                              onError={(e) => {
                                // Fallback just in case they don't have images in public folder
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





        {/* Contact / Consultation Section */}
        <AnimatedSection className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-[3rem] p-8 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-1000 hidden md:block" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-1000 hidden md:block" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none hidden md:block" />

              <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Ready to Book Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400 italic">Free Consultation?</span>
                  </h2>
                  <p className="text-lg text-slate-300 mb-0 leading-relaxed font-medium">
                    Online & In-Person Classes Available. Join the biggest IELTS campus in Gujranwala division and start your journey today.
                  </p>
                </div>

                <StaggerContainer className="flex flex-col gap-4 mt-8 md:mt-0">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full h-16 text-lg font-black rounded-2xl shadow-[0_10px_30px_rgba(255,165,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,165,0,0.5)] transition-all duration-300 bg-gradient-to-r from-primary to-orange-500 text-white border-none" asChild>
                      <Link to="/free-consultation">Book Free Consultation <ArrowRight className="ml-3 w-5 h-5" /></Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full h-16 text-lg font-black rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3" onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-selector'))}>
                      <MessageCircle className="w-6 h-6 text-[#25D366] drop-shadow-[0_0_10px_rgba(37,211,102,0.8)] group-hover:scale-110 transition-transform" />
                      Chat on WhatsApp
                    </Button>
                  </motion.div>
                </StaggerContainer>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Sticky CTA for Mobile */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-50 flex justify-center"
        >
          <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary to-orange-500 text-white shadow-[0_20px_40px_rgba(255,165,0,0.4)] text-lg font-black border-none active:scale-95 transition-transform" asChild>
            <Link to="/apply-ielts">Book Demo Class Now</Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default IELTS;
