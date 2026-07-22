import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import LottieIcon from '@/components/shared/LottieIcon';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Events', path: '/events' },
  { name: 'IELTS Preparation', path: '/ielts' },
  { name: 'PTE Preparation', path: '/pte' },
  { name: 'Success Stories', path: '/success' },
  { name: 'Student Portal', path: 'https://fti.portal.alfapte.com/v1/wc/login' },
];

const destinations = [
  { name: 'United Kingdom', path: '/destinations/uk' },
  { name: 'Canada', path: '/destinations/canada' },
  { name: 'Australia', path: '/destinations/australia' },
  { name: 'Ireland', path: '/destinations/ireland' },
  { name: 'USA', path: '/destinations/usa' },
  { name: 'Europe', path: '/destinations/europe' },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto gap-8">
          {/* Logo on Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-block group mb-0">
              <div className="bg-white p-3 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-primary/20 inline-block border border-white/10 rounded-none">
                <img
                  src="/fti_logo_transparent.png"
                  alt="FTI Consultants"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Social Icons on Right */}
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-md text-white/80">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Glass Bottom Bar */}
      <div className="border-t border-white/5 bg-white/5 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} FTI Consultants. Engineered for Excellence.
            </p>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="https://www.instagram.com/behzad_rehan?igsh=NWRqN2VjZWl6OXZ1" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">Developer Behzad Rehan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
