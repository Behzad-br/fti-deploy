import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const BRANCHES = [
  { key: 'branch_lahore', label: 'Lahore Branch' },
  { key: 'branch_faisalabad', label: 'Faisalabad Branch' },
  { key: 'branch_rawalpindi', label: 'Rawalpindi Branch' },
  { key: 'branch_gujranwala', label: 'Gujranwala (Head Office)' },
  { key: 'branch_london', label: 'London (UK Office)' },
  { key: 'branch_alipurchatta', label: 'Ali Pur Chatta Branch' },
  { key: 'branch_bahawalpur', label: 'Bahawalpur Branch' },
  { key: 'branch_wazirabad', label: 'Wazirabad Branch' }
];

const ApplyIELTS = () => {
  const [whatsappSettings, setWhatsappSettings] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', preferredBranch: '', qualification: '', passingYear: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/whatsapp`)
      .then(res => res.json())
      .then(data => setWhatsappSettings(data))
      .catch(err => console.error("Failed to load whatsapp settings:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.preferredBranch) {
      toast({ title: 'Please fill required fields', variant: 'destructive' });
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/test-queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, testType: 'IELTS' })
      });
    } catch (error) {
      console.error('Failed to submit query to backend', error);
    }
    
    toast({ title: 'Application submitted!', description: 'Redirecting to WhatsApp...' });

    // WhatsApp Redirect
    const targetNumber = whatsappSettings['ieltsWhatsApp'];
    if (targetNumber) {
        const message = `Hello, I would like to book an IELTS Demo/Class!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || '-'}\nLocation: ${BRANCHES.find(b => b.key === formData.preferredBranch)?.label || '-'}\nQualification: ${formData.qualification || '-'}\nPassing Year: ${formData.passingYear || '-'}`;
        const encodedMessage = encodeURIComponent(message);
        
        window.open(`https://wa.me/${targetNumber.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');
    } else {
        toast({ title: 'Application submitted!', description: 'Our counsellor will contact you within 24 hours.' });
    }

    // Clear form
    setFormData({ name: '', phone: '', email: '', preferredBranch: '', qualification: '', passingYear: '' });
  };

  return (
    <Layout>
      <div className="page-transition">
        <section className="gradient-primary py-20 md:py-32">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply for IELTS Training</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Join the biggest IELTS campus and achieve your target band.</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-5">
              <Input placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <Input placeholder="Phone / WhatsApp *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Select value={formData.preferredBranch} onValueChange={(v) => setFormData({...formData, preferredBranch: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Location (Preferred Branch) *" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {BRANCHES.map(b => <SelectItem key={b.key} value={b.key}>{b.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={formData.qualification} onValueChange={(v) => setFormData({...formData, qualification: v})}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Qualification" /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {["Matriculation", "Intermediate", "Bachelor's", "Master's", "Other"].map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Passing Year" type="number" value={formData.passingYear} onChange={(e) => setFormData({...formData, passingYear: e.target.value})} />

              <Button type="submit" variant="hero" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ApplyIELTS;
