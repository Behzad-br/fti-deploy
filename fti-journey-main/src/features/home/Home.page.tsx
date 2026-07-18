import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from './components/HeroSection';
import AeoTestingCenterHome from './components/AeoTestingCenterHome';
import ServicesSection from './components/ServicesSection';
import DestinationsSection from './components/DestinationsSection';
import WhyChooseUs from './components/WhyChooseUs';
import PartnersSection from './components/PartnersSection';
import TestPrepSection from './components/TestPrepSection';
import TestimonialsSection from './components/TestimonialsSection';
import SuccessStudentsSection from './components/SuccessStudentsSection';
import OfficesSection from './components/OfficesSection';

import { initAllAnimations, cleanupAnimations, animateCardGrid } from '@/utils/gsapAnimations';

const Index = () => {
  useEffect(() => {
    // Initialize premium animations
    initAllAnimations();

    // Explicitly animate destination cards as a staggered grid
    // Logic: wait a bit for layout
    const timer = setTimeout(() => {
      animateCardGrid('.destination-card', 0.1);
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupAnimations();
    };
  }, []);

  return (
    <Layout>
      <div className="page-transition">
        <HeroSection />
        <AeoTestingCenterHome />
        <PartnersSection />
        <ServicesSection />
        <DestinationsSection />
        <WhyChooseUs />
        <SuccessStudentsSection />
        <TestPrepSection />

      </div>
    </Layout>
  );
};

export default Index;
