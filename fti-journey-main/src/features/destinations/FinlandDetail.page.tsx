import { motion, useScroll, useTransform } from 'framer-motion';
import { Info, ArrowRight, 
  CheckCircle, 
  GraduationCap, 
  DollarSign, 
  FileCheck, 
  MapPin, 
  BookOpen, 
  Briefcase, 
  Globe, 
  Percent, 
  Home, 
  Lightbulb,
  Building,
  Award,
  Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useRef } from 'react';

// Refined Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const FinlandDetail = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <Layout>
      <div className="page-transition bg-[#FAFAFA] min-h-screen">
        
        {/* HERO SECTION - Parallax with floating elements */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden rounded-b-[3rem] shadow-2xl">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200"
              alt="Study in Finland"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </motion.div>
          
          <div className="container relative z-10 mx-auto px-4 text-center mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <span className="text-xl">🇫🇮</span>
              <span className="text-white font-medium tracking-wide text-sm uppercase">Innovation & Excellence</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl mb-6 tracking-tight"
            >
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Finland</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
            >
              Quality Education. Sustainable Future. Exceptional Student Life.
            </motion.p>
          </div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-10 left-0 right-0 hidden md:flex justify-center gap-6 z-20 px-4"
          >
            {[
              { icon: Building, label: 'Education Quality', value: 'World-Class' },
              { icon: Leaf, label: 'Society', value: 'Sustainable' },
              { icon: Award, label: 'Wellbeing', value: 'Top Ranked' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white shadow-2xl w-64 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="py-24 relative" ref={ref}>
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] translate-x-1/3" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN - Main Content */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* 1. Bento Box Photo Grid & Intro */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                    <span className="h-1 w-12 bg-primary rounded-full"></span>
                    <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Discover Finland</h2>
                  </motion.div>
                  
                  <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Finland is internationally recognised for its exceptional education system, innovative teaching methods, and commitment to academic excellence. Consistently ranked among the world's leading countries for education, Finland offers internationally recognised qualifications, modern learning environments, and strong collaboration between universities and industry.
                  </motion.p>
                  <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10">
                    With a focus on creativity, research, technology, and student wellbeing, Finland provides an ideal destination for students seeking high-quality education and excellent career prospects in Europe and beyond.
                  </motion.p>
                  
                  {/* Modern Editorial Bento Grid */}
                  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
                    <div className="md:col-span-2 h-full rounded-3xl overflow-hidden group relative shadow-lg">
                      <img src="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200" alt="Helsinki" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-xl drop-shadow-md">Beautiful Helsinki</span>
                      </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4 h-full">
                      <div className="rounded-3xl overflow-hidden group relative shadow-lg">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="rounded-3xl overflow-hidden group relative shadow-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center p-6 text-center">
                        <div>
                          <p className="text-4xl font-black text-white mb-2">UAS</p>
                          <p className="text-white/80 text-sm font-medium">Applied Sciences</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* 2. Key Benefits - Glass Cards */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Why Study in Finland?</h2>
                  </motion.div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Globally recognised qualifications',
                      'World-class education system',
                      'Innovative and student-centred learning',
                      'Research-driven universities',
                      'Strong industry collaboration',
                      'Safe and sustainable society',
                      'English-taught degree programmes',
                      'Excellent graduate employability',
                      'Opportunities to work while studying'
                    ].map((benefit, i) => (
                      <motion.div 
                        key={i} 
                        variants={fadeUp}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(234,88,12,0.1)] transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 3. Study Levels & Education System */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary/10 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Finland Education System</h2>
                      <p className="text-muted-foreground mt-1 text-sm">Supervised by the Finnish Ministry of Education and FINEEC.</p>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-10 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-primary" /> Study Levels
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Foundation Programmes', 'Bachelor\'s Degrees', 'UAS Degrees', 'Master\'s Degrees', 'Professional Master\'s', 'Doctoral (PhD)'].map((level, i) => (
                          <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-default">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <ArrowRight className="h-5 w-5 text-primary" /> Institutions Focus On:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          'Student-centred learning',
                          'Innovation and entrepreneurship',
                          'Critical thinking',
                          'Practical problem-solving',
                          'Research excellence',
                          'Sustainability & Industry collaboration'
                        ].map((prog, i) => (
                          <li key={i} className="flex items-center gap-3 text-muted-foreground group">
                            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                              <CheckCircle className="h-3 w-3 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="font-medium text-sm group-hover:text-foreground transition-colors">{prog}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* All Popular Programs */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Popular Study Programmes</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Business & Management',
                        icon: Briefcase,
                        items: ['Business Admin', 'Intl Business', 'Accounting', 'Finance', 'Marketing', 'Entrepreneurship', 'Supply Chain']
                      },
                      {
                        title: 'Information Technology',
                        icon: Lightbulb,
                        items: ['Computer Science', 'AI', 'Cyber Security', 'Software Eng', 'Data Science', 'Game Development']
                      },
                      {
                        title: 'Engineering',
                        icon: Building,
                        items: ['Mechanical', 'Civil', 'Electrical', 'Automation', 'Environmental', 'Renewable Energy']
                      },
                      {
                        title: 'Health Sciences',
                        icon: CheckCircle,
                        items: ['Nursing', 'Public Health', 'Biomedical Sciences', 'Healthcare Management', 'Physiotherapy']
                      },
                      {
                        title: 'Environmental & Sustainable',
                        icon: Leaf,
                        items: ['Environmental Science', 'Sustainable Development', 'Climate Studies', 'Circular Economy']
                      },
                      {
                        title: 'Design & Social Sciences',
                        icon: Home,
                        items: ['Industrial Design', 'Digital Media', 'Animation', 'Education', 'Psychology', 'Tourism Management']
                      }
                    ].map((category, i) => (
                      <motion.div 
                        key={i}
                        variants={fadeUp}
                        className="p-6 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all"
                      >
                        <h3 className="text-lg font-bold text-foreground mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                          <category.icon className="w-5 h-5 text-primary" /> {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((item, j) => (
                            <span key={j} className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 4. Admission & Language Requirements */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Admission Requirements</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <motion.div variants={fadeUp} className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 rounded-t-3xl" />
                      <h3 className="text-2xl font-bold text-foreground mb-6">Undergraduate</h3>
                      <ul className="space-y-4">
                        {[
                          'Higher Secondary School Certificate (HSSC/A Levels or equivalent)', 
                          'Academic transcripts', 
                          'Valid passport', 
                          'English language proficiency',
                          'Statement of Purpose (where applicable)',
                          'Entrance examinations/online assessments (where applicable)'
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-muted-foreground font-medium text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={fadeUp} className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:from-primary group-hover:to-orange-500 transition-all duration-500 rounded-t-3xl" />
                      <h3 className="text-2xl font-bold text-foreground mb-6">Postgraduate</h3>
                      <ul className="space-y-4">
                        {[
                          'Bachelor\'s degree in a relevant discipline', 
                          'Academic transcripts', 
                          'Curriculum Vitae (CV)', 
                          'Statement of Purpose or Motivation Letter', 
                          'English language proficiency',
                          'Letters of Recommendation',
                          'Relevant work experience (required for some UAS Master\'s)'
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-muted-foreground font-medium text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* English Requirements */}
                  <motion.div variants={fadeUp} className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-[2rem] p-8 md:p-10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">English Language Requirements</h3>
                    <p className="text-muted-foreground mb-6">
                      Accepted tests: IELTS Academic, TOEFL iBT, PTE Academic, Cambridge English, Duolingo English Test (selected institutions).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { level: 'Bachelor\'s Degree', score: '6.0 IELTS' },
                        { level: 'UAS Degree', score: '6.0 IELTS' },
                        { level: 'Master\'s Degree', score: '6.5 IELTS' },
                        { level: 'Doctoral (PhD)', score: '6.5–7.0 IELTS' }
                      ].map((req, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5 }}
                          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative z-10"
                        >
                          <span className="block text-sm text-muted-foreground mb-2">{req.level}</span>
                          <span className="block font-black text-primary text-xl">{req.score}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* 5. Work and Career */}
                <motion.div
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Work & Career Opportunities</h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" /> Part-Time Work
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Eligible students with a residence permit may work subject to regulations.</p>
                      <ul className="space-y-4">
                        {[
                          'Up to 30 hours/week during academic terms.',
                          'Full-time during official breaks.',
                          'Sectors: Retail, IT, Hospitality, Research Assistantships.'
                        ].map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                            <span className="text-sm text-muted-foreground">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div variants={fadeUp} className="bg-gray-900 p-8 rounded-3xl shadow-xl text-white">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" /> Post-Study Career
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Finland offers excellent opportunities to remain in the country after studies.
                      </p>
                      <ul className="space-y-4">
                        {[
                          'Apply for a residence permit to seek employment or start a business.',
                          'Gain professional work experience in a highly innovative market.',
                          'Transition to a work-based residence permit.',
                          'Explore long-term residence opportunities where eligible.'
                        ].map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                            <span className="text-sm text-gray-300">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>

              </div>

              {/* RIGHT COLUMN - Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                  
                  {/* Financial Guide */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                      <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Cost Overview</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-3">Tuition Fees (Yearly EUR)</p>
                        <div className="space-y-3">
                          {[
                            { level: 'Bachelor\'s Degrees', fee: '€6k–€18k' },
                            { level: 'UAS Degrees', fee: '€6k–€15k' },
                            { level: 'Master\'s Degrees', fee: '€8k–€20k' },
                            { level: 'Doctoral (PhD)', fee: 'Free at Public*' }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <span className="text-sm font-medium">{item.level}</span>
                              <span className="font-bold text-primary">{item.fee}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-3">Living Cost (Yearly EUR)</p>
                        <div className="space-y-3">
                          {[
                            { item: 'Accommodation', cost: '€4,500–€8,000' },
                            { item: 'Food', cost: '€2,500–€4,000' },
                            { item: 'Transportation', cost: '€500–€1,200' },
                            { item: 'Utilities & Internet', cost: '€800–€1,500' },
                            { item: 'Personal Expenses', cost: '€2,000–€3,500' }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <span className="text-sm font-medium">{item.item}</span>
                              <span className="font-bold text-green-600">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Scholarships */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                      <Percent className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Award className="h-6 w-6 text-amber-400" /> Scholarships & Aid
                      </h3>
                      <ul className="space-y-4">
                        {[
                          'University Merit Scholarships',
                          'Tuition Fee Waivers (50-100%)',
                          'Early Acceptance Scholarships',
                          'Academic Excellence Awards',
                          'Doctoral Funding & Research',
                          'Partner & Alumni Discounts'
                        ].map((sch, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-medium text-sm">{sch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Ultimate CTA */}
                  <div className="sticky top-24 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="gradient-primary rounded-3xl p-8 text-white text-center shadow-2xl shadow-primary/30 relative overflow-hidden"
                    >
                    <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <h3 className="text-2xl font-black mb-3 relative z-10 text-glow">Why Choose FTI?</h3>
                    <p className="text-white/90 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                      We provide personalised guidance to help you achieve your study abroad aspirations in Finland.
                    </p>
                    <ul className="text-sm text-white/90 space-y-2 mb-8 text-left bg-black/20 p-4 rounded-xl relative z-10">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> University & Programme Selection</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Residence Permit Guidance</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Scholarship Assistance</li>
                    </ul>
                    <Button 
                      className="w-full bg-white text-primary hover:bg-gray-50 rounded-2xl py-7 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] relative z-10"
                      asChild
                    >
                      <Link to="/free-consultation">Get Free Consultation</Link>
                    </Button>

                  </motion.div>

                  {/* Disclaimer Card */}
                  <div className="mt-6 bg-orange-50/50 border border-orange-100 rounded-xl p-4 dark:bg-orange-950/20 dark:border-orange-900/50 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed font-medium">
                        Information may vary over time. Contact our team for the most up-to-date details.
                      </p>
                    </div>
                  </div>
                  </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FinlandDetail;
