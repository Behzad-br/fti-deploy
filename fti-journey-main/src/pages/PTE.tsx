import { motion } from 'framer-motion';
import { Check, Monitor, Cpu, User, Cloud, ArrowRight, Star, BookOpen, Clock, Award, Target, TrendingUp, Headphones, Mic, PenTool, Eye, ChevronRight, BarChart3, Globe, Zap, Bot, Network, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { useCMS } from '@/context/CMSContext';
import PromoBoard from '@/components/shared/PromoBoard';

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

const pteSkills = [
  {
    icon: Mic,
    title: 'Speaking',
    color: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    tasks: ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Re-tell Lecture', 'Answer Short Question'],
    tips: 'Clarity and fluency are key. Practice speaking at a natural pace with correct pronunciation.',
    duration: '30–35 min',
    score: '10–90',
  },
  {
    icon: Headphones,
    title: 'Listening',
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    tasks: ['Summarize Spoken Text', 'Multiple Choice', 'Fill in the Blanks', 'Highlight Correct Summary', 'Select Missing Word', 'Highlight Incorrect Words', 'Write from Dictation'],
    tips: 'Note-taking is essential. Focus on keywords and main ideas during each audio clip.',
    duration: '45–57 min',
    score: '10–90',
  },
  {
    icon: PenTool,
    title: 'Writing',
    color: 'from-red-400 to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    tasks: ['Summarize Written Text', 'Write Essay'],
    tips: 'Structure your answers well. For essays, include introduction, body paragraphs, and a conclusion.',
    duration: '50–60 min',
    score: '10–90',
  },
  {
    icon: Eye,
    title: 'Reading',
    color: 'from-yellow-400 to-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    tasks: ['Multiple Choice (Single)', 'Multiple Choice (Multiple)', 'Re-order Paragraphs', 'Fill in the Blanks', 'Reading & Writing Fill in the Blanks'],
    tips: 'Read quickly and efficiently. Identify the main idea before answering comprehension questions.',
    duration: '29–30 min',
    score: '10–90',
  },
];

const scoreGuide = [
  { band: '85–90', level: 'Expert', equivalent: 'C2 (IELTS 8.5–9.0)', color: 'bg-green-500', textColor: 'text-green-700', bg: 'bg-green-50' },
  { band: '76–84', level: 'Advanced', equivalent: 'C1 (IELTS 7.5–8.0)', color: 'bg-blue-500', textColor: 'text-blue-700', bg: 'bg-blue-50' },
  { band: '59–75', level: 'Upper Intermediate', equivalent: 'B2 (IELTS 6.5–7.0)', color: 'bg-orange-500', textColor: 'text-orange-700', bg: 'bg-orange-50' },
  { band: '43–58', level: 'Intermediate', equivalent: 'B1 (IELTS 5.5–6.0)', color: 'bg-yellow-500', textColor: 'text-yellow-700', bg: 'bg-yellow-50' },
  { band: '30–42', level: 'Elementary', equivalent: 'A2 (IELTS 4.5–5.0)', color: 'bg-red-500', textColor: 'text-red-700', bg: 'bg-red-50' },
];

const examFacts = [
  { icon: Clock, label: 'Test Duration', value: '2–3 Hours', desc: 'All 4 skills in one sitting' },
  { icon: BarChart3, label: 'Score Range', value: '10–90', desc: 'AI-powered scoring system' },
  { icon: Zap, label: 'Results', value: '2–5 Days', desc: 'Fastest results in English testing' },
  { icon: Globe, label: 'Accepted By', value: '3,000+', desc: 'Universities & institutions globally' },
  { icon: Award, label: 'Validity', value: '2 Years', desc: 'Score valid for applications' },
  { icon: TrendingUp, label: 'Test Format', value: 'Computer-Based', desc: 'AI scored, no human bias' },
];

const ftiCourses = [
  {
    name: 'PTE Starter',
    duration: '4 Weeks',
    hours: '40 Hours',
    target: '50–60 Score',
    price: 'Contact Us',
    features: ['Basic skill introduction', 'Practice tests', 'Study materials', 'Mock exam'],
    badge: '',
  },
  {
    name: 'PTE Achiever',
    duration: '8 Weeks',
    hours: '80 Hours',
    target: '65–75 Score',
    price: 'Contact Us',
    features: ['Intensive skill training', 'AI practice sessions', 'Weekly mock tests', 'Individual feedback', 'Online portal access', 'Pearson-certified trainer'],
    badge: 'Most Popular',
  },
  {
    name: 'PTE Expert',
    duration: '12 Weeks',
    hours: '120 Hours',
    target: '79+ Score',
    price: 'Contact Us',
    features: ['Advanced score strategies', 'Unlimited practice tests', 'Daily feedback sessions', '1-on-1 mentoring', 'Score guarantee program', 'Full exam simulation'],
    badge: 'Best Results',
  },
];

const faqs = [
  {
    q: 'What is PTE Academic?',
    a: 'PTE Academic (Pearson Test of English Academic) is a computer-based English language proficiency test accepted by thousands of universities, colleges, and governments worldwide, including Australia, UK, USA, Canada, and New Zealand.',
  },
  {
    q: 'How is PTE different from IELTS?',
    a: 'PTE is entirely computer-based and AI-scored — there are no human examiners, which eliminates subjective bias. Results are also faster (2–5 days vs 13 days for IELTS). PTE is especially popular for Australian and New Zealand visa applications.',
  },
  {
    q: 'What score do I need for a student visa?',
    a: 'Requirements vary by country and institution. For Australian Student Visa (subclass 500), most universities require PTE 50–65+. UK Tier 4 Student Visa typically requires 51–65+. Always check the specific requirements of your target university.',
  },
  {
    q: 'How many times can I take the PTE exam?',
    a: 'You can take the PTE Academic test as many times as you like. There is no limit on retakes, and results are valid for 2 years from the test date.',
  },
  {
    q: 'How long does it take to prepare for PTE?',
    a: 'Most students need 4–12 weeks of focused preparation depending on their current English level. At FTI, our programs are designed to help students reach their target score efficiently.',
  },
  {
    q: 'Is PTE accepted for Australian PR and UK visa?',
    a: 'Yes! PTE Academic is officially accepted by the UK Home Office, IRCC (Canada), Australian Department of Home Affairs, and New Zealand Immigration. It is widely used for both student and immigration purposes.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const PTE = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { cmsData } = useCMS();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSkill, setActiveSkill] = useState(0);

  return (
    <Layout>
      <div className="page-transition">

        {/* ── HERO ── */}
        <section className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl" />
          </div>

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
              <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10">
                {cmsData.pteHeroDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button
                  size="xl"
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-2xl w-full sm:w-auto"
                  asChild
                >
                  <Link to="/free-consultation">Book Free Consultation</Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white hover:text-orange-500 bg-transparent w-full sm:w-auto"
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





        {/* ── EXAM FACTS ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="inline-block py-1.5 px-5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
                Quick Facts
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-800">
                PTE Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">At a Glance</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {examFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-6 text-center hover:shadow-lg hover:border-orange-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-md">
                    <fact.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{fact.label}</p>
                  <p className="text-xl font-black text-slate-800 mb-1">{fact.value}</p>
                  <p className="text-xs text-slate-500">{fact.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES GRID ── */}
        <section className="py-16 bg-orange-50/50" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                  whileHover={{ scale: 1.05, y: -15, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-orange-100 hover:border-orange-200 transition-all group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800 leading-tight">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PTE TEST SKILLS ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="inline-block py-1.5 px-5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
                Exam Structure
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                The 4 Skills of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">PTE Academic</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto text-lg">
                PTE tests all four English language skills in one integrated, computer-based exam.
              </motion.p>
            </motion.div>

            {/* Skill Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {pteSkills.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSkill(i)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all border-2 ${
                    activeSkill === i
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg scale-105'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  <skill.icon className="w-4 h-4" />
                  {skill.title}
                </button>
              ))}
            </div>

            {/* Active Skill Detail */}
            <motion.div
              key={activeSkill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`${pteSkills[activeSkill].bg} ${pteSkills[activeSkill].border} border-2 rounded-3xl p-8 md:p-12`}
            >
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pteSkills[activeSkill].color} flex items-center justify-center shadow-lg`}>
                      {(() => { const Icon = pteSkills[activeSkill].icon; return <Icon className="w-8 h-8 text-white" />; })()}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-800">{pteSkills[activeSkill].title}</h3>
                      <p className="text-slate-500 text-sm font-medium">Duration: {pteSkills[activeSkill].duration} | Score: {pteSkills[activeSkill].score}</p>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-700 uppercase text-xs tracking-widest mb-4">Task Types</h4>
                  <div className="space-y-2">
                    {pteSkills[activeSkill].tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center gap-3 bg-white/80 rounded-xl px-4 py-2.5 border border-white shadow-sm">
                        <ChevronRight className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="text-slate-700 font-medium text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-orange-500" />
                    <h4 className="font-black text-slate-800 text-lg">FTI Expert Tips</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base">{pteSkills[activeSkill].tips}</p>
                  <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <p className="text-orange-700 font-bold text-sm">💡 At FTI, our expert trainers focus on each task type individually with targeted exercises and AI practice tools to maximise your score.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SCORE GUIDE ── */}
        <section className="py-24 bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="inline-block py-1.5 px-5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">
                Score Guide
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4">
                PTE Score <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Equivalents</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 max-w-xl mx-auto text-lg">
                Understand what your PTE score means in terms of CEFR and IELTS equivalency.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto"
            >
              {scoreGuide.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-slate-800 border border-slate-700 rounded-3xl p-6 text-center hover:border-orange-500/50 transition-all"
                >
                  <div className={`w-14 h-3 rounded-full ${s.color} mx-auto mb-4`} />
                  <p className="text-3xl font-black text-white mb-1">{s.band}</p>
                  <p className="text-orange-400 font-bold text-sm mb-3">{s.level}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{s.equivalent}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FTI COURSES ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="inline-block py-1.5 px-5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
                FTI Programs
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">PTE Course</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 max-w-xl mx-auto text-lg">
                Tailored preparation programs designed to get you the score you need.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {ftiCourses.map((course, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-3xl border-2 p-8 transition-all ${
                    course.badge === 'Most Popular'
                      ? 'border-orange-400 bg-gradient-to-b from-orange-50 to-amber-50 shadow-2xl shadow-orange-200'
                      : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-xl'
                  }`}
                >
                  {course.badge && (
                    <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md ${
                      course.badge === 'Most Popular'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        : 'bg-slate-800 text-white'
                    }`}>
                      {course.badge}
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{course.name}</h3>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.hours}</span>
                    </div>
                  </div>
                  <div className="bg-orange-100 rounded-2xl px-5 py-3 mb-6 text-center">
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">Target Score</p>
                    <p className="text-3xl font-black text-orange-600">{course.target}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-orange-600" strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold" asChild>
                    <Link to="/free-consultation">Enroll Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHY PTE ── */}
        <section className="py-24 bg-orange-50/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block py-1.5 px-5 rounded-full bg-orange-100 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-6">
                  Why PTE?
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8">
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
                transition={{ duration: 0.8, type: 'spring' }}
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
                          <Link to="/free-consultation" className="flex items-center justify-center">
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

        {/* ── FAQS ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="inline-block py-1.5 px-5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
                FAQ
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Questions</span>
              </motion.h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`border-2 rounded-2xl overflow-hidden transition-all ${
                    openFaq === i ? 'border-orange-400 shadow-lg' : 'border-slate-200 hover:border-orange-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-7 py-5 flex items-center justify-between font-bold text-slate-800 text-base hover:text-orange-600 transition-colors"
                  >
                    {faq.q}
                    <motion.div animate={{ rotate: openFaq === i ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="w-5 h-5 text-orange-500 shrink-0" />
                    </motion.div>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-7 pb-6 text-slate-600 leading-relaxed border-t border-orange-100 pt-5 bg-orange-50/50"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUCCESS STORIES ── */}
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

        {/* ── CTA ── */}
        <section className="py-24 bg-gradient-to-r from-orange-500 to-amber-500 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to Achieve Your Target Score?</h2>
              <p className="text-white/85 text-xl mb-10 max-w-2xl mx-auto">
                Join hundreds of successful FTI students who achieved their dream PTE score. Book your free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button size="xl" className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg shadow-2xl" asChild>
                  <Link to="/free-consultation">Book Free Consultation</Link>
                </Button>
                <Button size="xl" variant="outline" className="border-2 border-white/40 text-white hover:bg-white hover:text-orange-500 bg-transparent font-bold text-lg" asChild>
                  <a href="https://fti.portal.alfapte.com/v1/wc/login" target="_blank" rel="noopener noreferrer">Access Portal</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default PTE;
