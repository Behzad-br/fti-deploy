import { API_BASE_URL } from '../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useCMS } from '@/store/CMSContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', country: '', message: '' });
  const [whatsappSettings, setWhatsappSettings] = useState<Record<string, string>>({});
  const { cmsData } = useCMS();

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/whatsapp`)
      .then(res => res.json())
      .then(data => setWhatsappSettings(data))
      .catch(err => console.error("Failed to load whatsapp settings:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message sent!', description: 'We will get back to you soon.' });
    setFormData({ name: '', phone: '', email: '', country: '', message: '' });
  };

  return (
    <Layout>
      <div className="page-transition">
        <section className="gradient-hero py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{cmsData.contactHeroTitle}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{cmsData.contactHeroDescription}</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
                  <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input placeholder="Your Name *" className="bg-slate-50 border-none h-14" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <Input placeholder="Phone / WhatsApp *" className="bg-slate-50 border-none h-14" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <Input type="email" placeholder="Email Address" className="bg-slate-50 border-none h-14" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                    <SelectTrigger className="bg-slate-50 border-none h-14 text-slate-500"><SelectValue placeholder="Interested Country" /></SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="How can we help you?" className="bg-slate-50 border-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} />
                  <Button type="submit" variant="hero" className="w-full h-14 text-lg shadow-xl shadow-primary/20"><Send className="h-5 w-5 mr-2" /> Send Message</Button>
                </form>
              </div>

              {/* Contact Quick Info */}
              <div className="space-y-8 lg:pl-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Contact Us?</h2>
                  <ul className="space-y-6">
                    {[
                      { title: 'Free Consultation', desc: 'Get a free 15-minute briefing from our senior experts.' },
                      { title: '98% Visa Success', desc: 'Our track record speaks for itself. We guide, you succeed.' },
                      { title: 'Direct University Links', desc: 'Official partners with 500+ top universities worldwide.' },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xl">{i + 1}</div>
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/30 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Urgent Inquiry?</h3>
                    <p className="text-white/80 mb-6">Call our official UAN for immediate assistance from our head office.</p>
                    <a href="tel:03000450025" className="text-3xl font-black hover:underline">+92 3000 4500 25</a>
                  </div>
                  <Phone className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            {/* Global Branch Network - Full Width Rows */}
            <div className="mt-32 space-y-16">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Global Opportunities</h2>
                <p className="text-slate-500 text-lg">Visit any of our 5 official branches for a one-on-one counseling session with our expert consultants.</p>
              </div>

              {[
                {
                  city: 'Gujranwala',
                  title: 'Head Office',
                  country: 'Pakistan',
                  flag: '🇵🇰',
                  address: 'Opposite Punjab Group of Colleges, Sialkot Bypass Road, Near Garden Town, Gujranwala',
                  phones: whatsappSettings['branch_gujranwala'] ? [whatsappSettings['branch_gujranwala']] : ['+92 (0) 300 744 2732', '+92 (0) 3000 4500 25', '+92 (0) 3000 4500 60'],
                  email: 'info@fti4success.com',
                  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.1475734363294!2d74.2089456!3d32.1813197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2a33fd372379%3A0xe539f379f67a6d89!2sFTI%20Consultants!5e0!3m2!1sen!2spk!4v1709477000000!5m2!1sen!2spk"
                },
                {
                  city: 'London',
                  title: 'UK Office',
                  country: 'United Kingdom',
                  flag: '🇬🇧',
                  address: 'Barking Enterprise Centre, IG11 8FG, London',
                  phones: whatsappSettings['branch_london'] ? [whatsappSettings['branch_london']] : ['+44 74 2995 0775', '+44 20 2786 3030'],
                  email: 'london@fti4success.com',
                  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.594777!2d0.0768!3d51.5385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a6666666666f%3A0x6666666666666666!2sBarking%20Enterprise%20Centre!5e0!3m2!1sen!2suk!4v1709477100000!5m2!1sen!2suk"
                },
                {
                  city: 'Ali Pur Chatta',
                  title: 'Regional Office',
                  country: 'Pakistan',
                  flag: '🇵🇰',
                  address: 'Opposite Faysal Bank, Gujranwala Road, Ali Pur Chatta',
                  phones: whatsappSettings['branch_alipurchatta'] ? [whatsappSettings['branch_alipurchatta']] : ['+92 (0) 309 9111 400', '+92 (0) 55 6821 400'],
                  email: 'alipur@fti4success.com',
                  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13546.066468!2d73.8116718!3d32.2658122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f472f4ccbe03d%3A0x50f81ad2f0514ae2!2sFaysal%20Bank!5e0!3m2!1sen!2spk!4v1709476300000!5m2!1sen!2spk"
                },
                {
                  city: 'Bahawalpur',
                  title: 'Regional Office',
                  country: 'Pakistan',
                  flag: '🇵🇰',
                  address: '29-A Model Town, Sarwar Shaheed Road, Bahawalpur',
                  phones: whatsappSettings['branch_bahawalpur'] ? [whatsappSettings['branch_bahawalpur']] : ['+92 (0) 300 680 99 89', '+92 (0) 62 28 88 022'],
                  email: 'bahawalpur@fti4success.com',
                  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.353456!2d71.6700!3d29.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b906666666667%3A0x6666666666666668!2sModel%20Town%2C%20Bahawalpur!5e0!3m2!1sen!2spk!4v1709477200000!5m2!1sen!2spk"
                },
                {
                  city: 'Wazirabad',
                  title: 'Regional Office',
                  country: 'Pakistan',
                  flag: '🇵🇰',
                  address: 'Shuja Avenue, Opposite Nadra Office, GT Road, Wazirabad',
                  phones: whatsappSettings['branch_wazirabad'] ? [whatsappSettings['branch_wazirabad']] : ['+92 (0) 345 660 4949', '+92 (0) 55 660 4949'],
                  email: 'wazirabad@fti4success.com',
                  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.147573!2d74.1200!3d32.4400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f166666666667%3A0x6666666666666668!2sGT%20Road%2C%20Wazirabad!5e0!3m2!1sen!2spk!4v1709477300000!5m2!1sen!2spk"
                },
              ].map((office, index) => (
                <div key={office.city} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-[1.5rem] overflow-hidden shadow-lg border border-slate-100 min-h-[320px]`}>
                  <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-slate-50/20">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{office.flag}</span>
                      <div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-1">{office.city}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">{office.title}</span>
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">{office.country}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-slate-600 font-medium text-sm leading-relaxed">{office.address}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {office.phones.map((phone, idx) => (
                          <a key={idx} href={`tel:${phone}`} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-100 hover:border-primary/30 transition-all hover:shadow-sm group">
                            <Phone className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-slate-700 font-bold text-xs">{phone.split(' (0) ').join(' ')}</span>
                          </a>
                        ))}
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-100">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          <span className="text-slate-700 font-bold text-xs truncate">{office.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button
                        size="sm"
                        className="rounded-full px-6 h-10 text-sm font-bold shadow-md shadow-primary/10 hover:scale-105 transition-all"
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${office.city}+FTI+Consultants`, '_blank')}
                      >
                        <MapPin className="mr-2 h-4 w-4" /> Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-6 h-10 text-sm font-bold border-2 hover:bg-slate-50 transition-all"
                        onClick={() => window.open(`https://wa.me/${office.phones[0].replace(/\D/g, '')}`, '_blank')}
                      >
                        <MessageCircle className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
                      </Button>
                    </div>
                  </div>

                  <div className="lg:w-1/2 min-h-[250px] relative">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                      title={`${office.city} Office Map`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
