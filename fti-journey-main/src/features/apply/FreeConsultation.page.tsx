import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Phone, Mail, Clock, ShieldCheck, UserCheck, GraduationCap, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const COUNTRIES = [
    'UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', 
    'Turkey', 'Hungary', 'Sweden', 'Malaysia', 'Cyprus', 'New Zealand'
];

export default function FreeConsultation() {
  const [whatsappSettings, setWhatsappSettings] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', currentQualification: '', targetCountry: '', message: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/whatsapp`)
      .then(res => res.json())
      .then(data => setWhatsappSettings(data))
      .catch(err => console.error('Failed to load WhatsApp settings', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.targetCountry) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast({ title: 'Application submitted!', description: 'Redirecting to WhatsApp...' });

        // WhatsApp Redirect
        const targetNumber = whatsappSettings[formData.targetCountry];
        if (targetNumber) {
            const message = `Hello, I would like a free consultation!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || '-'}\nTarget Country: ${formData.targetCountry}\nQualification: ${formData.currentQualification || '-'}\nAddress: ${formData.address || '-'}\nMessage: ${formData.message || '-'}`;
            const encodedMessage = encodeURIComponent(message);
            
            // Open WhatsApp in new tab
            window.open(`https://wa.me/${targetNumber.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');
        } else {
            toast({ title: 'Application submitted!', description: 'Our counsellor will contact you within 24 hours.' });
        }
        
        // Clear the form
        setFormData({ name: '', phone: '', email: '', address: '', currentQualification: '', targetCountry: '', message: '' });
      } else {
        const errorData = await response.json();
        toast({ title: 'Submission failed', description: errorData.message || 'Something went wrong.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to connect to the server.', variant: 'destructive' });
    }
  };

  return (
    <Layout>
      <div className="page-transition">
        {/* Hero Section */}
        <section className="gradient-primary py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Book Your Free Consultation
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Take the first step towards your international education journey. Discuss your future with our expert education counselors today.
            </motion.p>
          </div>
        </section>

        {/* Main Form & Info Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
              
              {/* Left Info Column */}
              <div className="w-full lg:w-5/12 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Let's build your future together</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Fill out the form with your details, and one of our senior counselors will get back to you shortly. We are here to answer all your queries regarding study destinations, universities, courses, and the visa process.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl"><Phone className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Call Us</h4>
                      <p className="text-gray-600">+92 300 1234567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl"><Mail className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Email Us</h4>
                      <p className="text-gray-600">info@fticonsultant.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl"><Clock className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Working Hours</h4>
                      <p className="text-gray-600">Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="w-full lg:w-7/12">
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit} 
                  className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 space-y-6 relative -mt-32 z-20"
                >
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Consultation Form</h3>
                  <p className="text-gray-500 mb-6 text-sm">Fields marked with * are required.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone / WhatsApp *</label>
                      <Input placeholder="+92 300 0000000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Physical Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Your City/Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="pl-9 bg-gray-50" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Current Qualification *</label>
                      <Select value={formData.currentQualification} onValueChange={(v) => setFormData({...formData, currentQualification: v})}>
                        <SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {["Matriculation", "Intermediate", "Bachelor's", "Master's", "Other"].map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Preferred Destination *</label>
                      <Select value={formData.targetCountry} onValueChange={(v) => setFormData({...formData, targetCountry: v})}>
                        <SelectTrigger className="bg-gray-50">
                          <SelectValue placeholder="Target Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Any specific question or message?</label>
                    <Input placeholder="Tell us about your study goals..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-gray-50 h-16" />
                  </div>
                  
                  <Button type="submit" variant="hero" size="lg" className="w-full text-lg mt-4 shadow-lg shadow-primary/30">Submit Application</Button>
                </motion.form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};


