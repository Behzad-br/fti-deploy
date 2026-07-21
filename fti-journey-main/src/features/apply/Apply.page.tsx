import { API_BASE_URL } from '../../config/api';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', qualification: '', gpa: '', country: '', ielts: '', intake: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.country) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          targetCountry: formData.country,
          source: 'Apply Page' 
        })
      });
      
      if (res.ok) {
        setSubmitted(true);
        toast({ title: 'Application submitted!', description: 'Our counsellor will contact you within 24 hours.' });
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

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Received!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your interest. Our counsellor will contact you within 24 hours.</p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>Submit Another</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Apply Now | FTI Consultants" 
        description="Start your study abroad journey today. Apply online with FTI Consultants for free counselling and university admission assistance."
        keywords="apply study abroad, university admission application, free counselling, FTI consultants apply"
        url="https://fticonsultants.com/apply"
      />
      <div className="page-transition">
        <section className="gradient-primary py-20 md:py-32">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply Now</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Start your study abroad journey with a free counselling session.</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-5">
              <Input name="name" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <Input name="phone" placeholder="Phone / WhatsApp *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Select value={formData.qualification} onValueChange={(v) => setFormData({...formData, qualification: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Qualification" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {["Matriculation", "Intermediate", "Bachelor's", "Master's", "Other"].map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="GPA / Percentage" value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} />
              <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Preferred Country *" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {['UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', 'Other'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formData.ielts} onValueChange={(v) => setFormData({...formData, ielts: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="IELTS/PTE Status" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {['Not taken', 'Preparing', 'Score: Below 6.0', 'Score: 6.0-6.5', 'Score: 7.0+'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formData.intake} onValueChange={(v) => setFormData({...formData, intake: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Preferred Intake" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {['Sep 2025', 'Jan 2026', 'Sep 2026', 'Not sure'].map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Apply;
