import { Check, ArrowRight, BookOpen, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ieltsFeatures = [
  'Biggest campus in Gujranwala Division',
  'State-of-the-art classrooms',
  'AEO/British Council trained faculty',
  'Mock tests & feedback sessions',
];

const pteFeatures = [
  'Technology-based classrooms',
  'All-in-one practice systems',
  'Pearson-certified training methods',
  'Individual online portal access',
  'AI-powered scoring practice',
];

const TestPrepSection = () => {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="animate-section text-center mb-16">

          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-[#f15a24]">IELTS</span> & <span className="text-[#f59218]">PTE</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* IELTS Card */}
          <div className="feature-card bg-white rounded-[2rem] shadow-card overflow-hidden h-full group hover:shadow-2xl transition-all duration-500">
            <div className="gradient-primary p-6 md:p-8 flex justify-between items-center overflow-hidden relative">
              <div className="relative z-10 w-2/3">
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  IELTS Preparation
                </h3>
                <p className="text-white/90 text-sm font-medium">International English Language Testing System</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <BookOpen className="w-8 h-8 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="p-6 md:p-8">
              <ul className="grid grid-cols-1 gap-3 mb-8">
                {ieltsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 group/item">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300 shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-foreground text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="w-full group rounded-full h-12 text-base font-bold shadow-md" asChild>
                <Link to="/apply-ielts">
                  Book Demo Class
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* PTE Card */}
          <div className="feature-card bg-white rounded-[2rem] shadow-card overflow-hidden h-full group hover:shadow-2xl transition-all duration-500">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 md:p-8 flex justify-between items-center overflow-hidden relative">
              <div className="relative z-10 w-2/3">
                <h3 className="text-2xl font-bold text-white mb-1">
                  PTE
                </h3>
                <p className="text-white/90 text-sm font-medium">Pearson Test of English</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <Laptop className="w-8 h-8 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="p-6 md:p-8">
              <ul className="grid grid-cols-1 gap-3 mb-8">
                {pteFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 group/item">
                    <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors duration-300 shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-foreground text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white group rounded-full h-12 text-base font-bold shadow-md border-none" asChild>
                <Link to="/apply-pte">
                  Book Demo Class
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestPrepSection;
