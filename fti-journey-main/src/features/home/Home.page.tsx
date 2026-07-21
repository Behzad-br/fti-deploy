import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import HeroSection from './components/HeroSection';

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
      <SEO 
        title="FTI Consultant | Best Study Abroad & Visa Consultants in Pakistan" 
        description="FTI Consultant is Pakistan's best study abroad agency. We provide expert student visa processing, university admissions, scholarships, & IELTS/PTE prep. Apply now!"
        keywords="fti consultant, best study abroad consultants in pakistan, student visa consultants, overseas education consultants, top visa consultancy pakistan, fti consultants gujranwala"
        url="https://fticonsultants.com/"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "FTI Consultant",
          "url": "https://fticonsultants.com/",
          "logo": "https://fticonsultants.com/fti_logo.jpg",
          "description": "Pakistan's best study abroad agency providing expert student visa processing, university admissions, scholarships, and test prep.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gujranwala",
            "addressCountry": "PK"
          }
        })}
      />
      <div className="page-transition">
        <HeroSection />

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
