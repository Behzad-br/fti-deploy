import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle, ArrowRight, Building2, Globe2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useCMS } from '@/store/CMSContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', country: '', message: '' });
  const [whatsappSettings, setWhatsappSettings] = useState<Record<string, string>>({});
  const { cmsData } = useCMS();
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/whatsapp`)
      .then(res => res.json())
      .then(data => setWhatsappSettings(data))
      .catch(err => console.error("Failed to load whatsapp settings:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: '✅ Message Sent!', description: 'We will get back to you within 24 hours.' });
        setFormData({ name: '', phone: '', email: '', country: '', message: '' });
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.message || 'Something went wrong.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Network Error', description: 'Please check your connection.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const branches = [
    {
      city: 'Gujranwala',
      title: 'Head Office',
      country: 'Pakistan',
      flagCode: 'pk',
      address: 'Opposite Punjab Group of Colleges, Sialkot Bypass Road, Near Garden Town, Gujranwala',
      phones: whatsappSettings['branch_gujranwala'] ? [whatsappSettings['branch_gujranwala']] : ['+92 (0) 300 744 2732'],
      email: 'info@fti4success.com',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.1475734363294!2d74.2089456!3d32.1813197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2a33fd372379%3A0xe539f379f67a6d89!2sFTI%20Consultants!5e0!3m2!1sen!2spk!4v1709477000000!5m2!1sen!2spk"
    },
    {
      city: 'London',
      title: 'UK Office',
      country: 'United Kingdom',
      flagCode: 'gb',
      address: 'Barking Enterprise Centre, IG11 8FG, London',
      phones: whatsappSettings['branch_london'] ? [whatsappSettings['branch_london']] : ['+44 74 2995 0775'],
      email: 'london@fti4success.com',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.594777!2d0.0768!3d51.5385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a6666666666f%3A0x6666666666666666!2sBarking%20Enterprise%20Centre!5e0!3m2!1sen!2suk!4v1709477100000!5m2!1sen!2suk"
    },
    {
      city: 'Ali Pur Chatta',
      title: 'Regional Office',
      country: 'Pakistan',
      flagCode: 'pk',
      address: 'Opposite Faysal Bank, Gujranwala Road, Ali Pur Chatta',
      phones: whatsappSettings['branch_alipurchatta'] ? [whatsappSettings['branch_alipurchatta']] : ['+92 (0) 309 9111 400'],
      email: 'alipur@fti4success.com',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13546.066468!2d73.8116718!3d32.2658122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f472f4ccbe03d%3A0x50f81ad2f0514ae2!2sFaysal%20Bank!5e0!3m2!1sen!2spk!4v1709476300000!5m2!1sen!2spk"
    },
    {
      city: 'Bahawalpur',
      title: 'Regional Office',
      country: 'Pakistan',
      flagCode: 'pk',
      address: '29-A Model Town, Sarwar Shaheed Road, Bahawalpur',
      phones: whatsappSettings['branch_bahawalpur'] ? [whatsappSettings['branch_bahawalpur']] : ['+92 (0) 300 680 99 89'],
      email: 'bahawalpur@fti4success.com',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.353456!2d71.6700!3d29.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b906666666667%3A0x6666666666666668!2sModel%20Town%2C%20Bahawalpur!5e0!3m2!1sen!2spk!4v1709477200000!5m2!1sen!2spk"
    },
    {
      city: 'Wazirabad',
      title: 'Regional Office',
      country: 'Pakistan',
      flagCode: 'pk',
      address: 'Shuja Avenue, Opposite Nadra Office, GT Road, Wazirabad',
      phones: whatsappSettings['branch_wazirabad'] ? [whatsappSettings['branch_wazirabad']] : ['+92 (0) 345 660 4949'],
      email: 'wazirabad@fti4success.com',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.147573!2d74.1200!3d32.4400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f166666666667%3A0x6666666666666668!2sGT%20Road%2C%20Wazirabad!5e0!3m2!1sen!2spk!4v1709477300000!5m2!1sen!2spk"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Contact FTI Consultant | Study Abroad Experts in Pakistan" 
        description="Get in touch with FTI Consultant for expert study abroad advice. Visit our offices in Gujranwala, London & across Pakistan, or book a free consultation online."
        keywords="contact fti consultant, fti consultants gujranwala address, study abroad free consultation, visa consultants phone number, education consultants contact"
        url="https://fticonsultants.com/contact"
      />
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #f59e0b 100%)' }}>
        {/* Animated background orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3" style={{ background: 'rgba(251,146,60,0.15)' }}></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" style={{ background: 'rgba(168,85,247,0.1)' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(251,146,60,0.08)' }}></div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(251,146,60,0.6)', left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 py-2 px-5 rounded-full border mb-6" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-white font-bold text-sm tracking-widest uppercase">Get in Touch</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none drop-shadow-md">
              Contact Us
            </motion.h1>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── Form & Quick Info Section ── */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Premium Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #ffffff, #fff8f3)' }}>
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #ea580c, #f59e0b, #ea580c)' }}></div>

                <div className="p-8 md:p-12">
                  {/* Form header */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)' }}>
                        <Send className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Send us a message</h2>
                      </div>
                    </div>
                    <p className="text-slate-500 text-lg ml-1">We guarantee a response within <span className="font-bold text-orange-600">24 hours</span>.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                          Your Name <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          name="name"
                          placeholder="e.g. Ahmed Khan"
                          className="h-14 rounded-2xl border-2 transition-all duration-200 text-slate-800 font-medium"
                          style={{ background: '#fafafa', borderColor: formData.name ? '#ea580c' : '#e2e8f0' }}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
                          Phone / WhatsApp <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          name="phone"
                          placeholder="+92 300 0000000"
                          className="h-14 rounded-2xl border-2 transition-all duration-200 text-slate-800 font-medium"
                          style={{ background: '#fafafa', borderColor: formData.phone ? '#ea580c' : '#e2e8f0' }}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block"></span>
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="h-14 rounded-2xl border-2 border-slate-200 transition-all duration-200 text-slate-800 font-medium"
                          style={{ background: '#fafafa' }}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block"></span>
                          Interested Country
                        </label>
                        <Select name="country" value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                          <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-200 text-slate-700 font-medium" style={{ background: '#fafafa' }}>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent className="bg-white rounded-2xl shadow-2xl border-slate-100 z-50">
                            {['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe'].map(c => (
                              <SelectItem key={c} value={c} className="rounded-xl cursor-pointer font-medium">{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block"></span>
                        How can we help you?
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your goals, current qualifications, or any specific questions..."
                        className="rounded-2xl border-2 border-slate-200 transition-all duration-200 resize-none py-4 text-slate-800 font-medium"
                        style={{ background: '#fafafa', minHeight: '130px' }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-16 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl"
                      style={{ background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', boxShadow: isSubmitting ? 'none' : '0 20px 40px rgba(234,88,12,0.3)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <ArrowRight className="h-5 w-5 ml-1" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Quick Info Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6"
            >

              {/* Why FTI */}
              <div className="rounded-[2rem] p-8 border-2 border-orange-100" style={{ background: 'linear-gradient(145deg, #fff7ed, #fffbf5)' }}>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-orange-500" /> Why Choose FTI?
                </h3>
                <ul className="space-y-5">
                  {[
                    { title: 'Free Consultation', desc: 'Expert briefing tailored to your unique profile and goals.', icon: '🎯' },
                    { title: '98% Visa Success', desc: 'Flawless, proven track record of student visa approvals.', icon: '✅' },
                    { title: '500+ Universities', desc: 'Direct partnerships with top institutions worldwide.', icon: '🎓' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl shadow-sm transition-all group-hover:scale-110" style={{ background: 'white', border: '2px solid #fed7aa' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email card */}
              <div className="rounded-[2rem] p-6 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #bbf7d0' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-green-500">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-0.5">Email Us Directly</p>
                  <a href="mailto:info@fti4success.com" className="text-slate-800 font-black hover:text-green-700 transition-colors">info@fti4success.com</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Branch Network Section ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">

            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #ea580c, #f59e0b)' }}>Offices</span>
            </motion.h2>

          </div>

          <div className="max-w-7xl mx-auto">
            {/* Branch Tab Nav */}
            <div className="flex overflow-x-auto gap-3 mb-10 pb-2 justify-start lg:justify-center px-2 snap-x" style={{ scrollbarWidth: 'none' }}>
              {branches.map((branch, index) => (
                <motion.button
                  key={branch.city}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="snap-center shrink-0 flex items-center gap-3 px-6 h-14 rounded-2xl font-bold transition-all duration-300 border-2 text-sm"
                  style={activeTab === index
                    ? { background: 'linear-gradient(135deg, #ea580c, #f59e0b)', color: 'white', borderColor: 'transparent', boxShadow: '0 8px 24px rgba(234,88,12,0.3)' }
                    : { background: 'white', color: '#475569', borderColor: '#e2e8f0' }
                  }
                >
                  <img src={`https://flagcdn.com/w40/${branch.flagCode}.png`} alt={branch.country} className="w-5 h-auto rounded-sm shadow-sm" />
                  <span className="whitespace-nowrap">{branch.city}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Branch Card */}
            <div className="relative" style={{ minHeight: '480px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row absolute inset-0 w-full"
                  style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.08)' }}
                >
                  {/* Info Side */}
                  <div className="lg:w-[45%] p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-50" style={{ background: 'rgba(251,146,60,0.15)', transform: 'translate(50%,-50%)' }}></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest" style={{ background: 'rgba(234,88,12,0.1)', color: '#ea580c' }}>
                          {branches[activeTab].title}
                        </span>
                        <span className="text-slate-400 text-sm font-bold">{branches[activeTab].country}</span>
                        <img src={`https://flagcdn.com/w40/${branches[activeTab].flagCode}.png`} alt={branches[activeTab].country} className="w-7 h-auto rounded-sm shadow-sm" />
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">{branches[activeTab].city}</h3>
                      
                      <div className="space-y-5 mb-10">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(234,88,12,0.08)' }}>
                            <MapPin className="h-5 w-5 text-orange-600" />
                          </div>
                          <p className="text-slate-600 font-medium text-base leading-relaxed pt-2">{branches[activeTab].address}</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {branches[activeTab].phones.map((phone, idx) => (
                            <a key={idx} href={`tel:${phone}`} className="flex items-center gap-4 p-4 rounded-2xl transition-colors group" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <Phone className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                              </div>
                              <span className="text-slate-800 font-bold">{phone.split(' (0) ').join(' ')}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="lg"
                          className="h-13 rounded-2xl px-7 text-white font-bold"
                          style={{ background: 'linear-gradient(135deg, #ea580c, #f59e0b)', boxShadow: '0 10px 30px rgba(234,88,12,0.25)' }}
                          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${branches[activeTab].city}+FTI+Consultants`, '_blank')}
                        >
                          <MapPin className="mr-2 h-4 w-4" /> Get Directions
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-13 rounded-2xl px-7 font-bold border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-all"
                          onClick={() => window.open(`https://wa.me/${branches[activeTab].phones[0].replace(/\D/g, '')}`, '_blank')}
                        >
                          <MessageCircle className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Map Side */}
                  <div className="lg:w-[55%] min-h-[380px] relative bg-slate-100">
                    <iframe
                      src={branches[activeTab].mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'grayscale(0.1)' }}
                      allowFullScreen={true}
                      loading="lazy"
                      title={`${branches[activeTab].city} Office Map`}
                    />
                    
                    <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3" style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <Building2 className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">Official Branch</p>
                        <p className="text-[10px] font-medium text-slate-500">Verified Location ✓</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
