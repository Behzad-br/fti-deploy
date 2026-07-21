import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Event, GalleryItem, events, eventGallery } from '@/data/events';
import { pageApi, uploadApi } from '@/services/api';

// Define the shape of our CMS Data
export interface University {
  id: string;
  name: string;
  logo: string; // URL or base64
  country: 'Australia' | 'Canada' | 'Europe' | 'USA' | 'UK';
}

export interface CMSData {
  // PTE Page
  pteHeroTitle: string;
  pteHeroDescription: string;
  pteSuccessImages: string[];
  
  // IELTS Page
  ieltsHeroTitle: string;
  ieltsHeroDescription: string;
  ieltsSuccessImages: string[];

  // Home Page
  homeHeroTitle: string;
  homeHeroDescription: string;
  homeHeroImage: string;
  homeSuccessImages: string[];
  homeUniversityPartners: University[];

  // Profile / About Page
  aboutHeroTitle: string;
  aboutHeroDescription: string;

  // Destinations Page
  destinationsHeroTitle: string;
  destinationsHeroDescription: string;

  // Services Page
  servicesHeroTitle: string;
  servicesHeroDescription: string;

  // Events Page
  eventsHeroTitle: string;
  eventsHeroDescription: string;

  // Contact Page
  contactHeroTitle: string;
  contactHeroDescription: string;

  // Events & Gallery
  eventsList: Event[];
  eventGalleryList: GalleryItem[];
}

const defaultCMSData: CMSData = {
  pteHeroTitle: "PTE Academic Preparation",
  pteHeroDescription: "Master the computer-based PTE test with our cutting-edge training facilities and AI-powered practice systems.",
  pteSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],

  ieltsHeroTitle: "Master IELTS with FTI",
  ieltsHeroDescription: "Join the biggest IELTS campus in Gujranwala division.",
  ieltsSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],

  homeHeroTitle: "Your Journey to Global Success",
  homeHeroDescription: "Expert consultancy for studying abroad.",
  homeHeroImage: "/skyline_generated.png",
  homeSuccessImages: [
    '/success-stories/story-1.png',
    '/success-stories/story-2.png',
    '/success-stories/story-3.png',
    '/success-stories/story-4.png',
    '/success-stories/story-5.png',
  ],
  homeUniversityPartners: [
    { id: '1', name: 'Monash University',             logo: 'https://www.google.com/s2/favicons?sz=128&domain=monash.edu',       country: 'Australia' },
    { id: '2', name: 'University of Queensland',      logo: 'https://www.google.com/s2/favicons?sz=128&domain=uq.edu.au',         country: 'Australia' },
    { id: '3', name: 'University of Western Australia', logo: 'https://www.google.com/s2/favicons?sz=128&domain=uwa.edu.au',    country: 'Australia' },
    { id: '4', name: 'University of Technology Sydney', logo: 'https://www.google.com/s2/favicons?sz=128&domain=uts.edu.au',   country: 'Australia' },
    { id: '5', name: 'Curtin University',             logo: 'https://www.google.com/s2/favicons?sz=128&domain=curtin.edu.au',    country: 'Australia' },
    { id: '6', name: 'Deakin University',             logo: 'https://www.google.com/s2/favicons?sz=128&domain=deakin.edu.au',    country: 'Australia' },
    { id: '7', name: 'University of Alberta',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=ualberta.ca',      country: 'Canada' },
    { id: '8', name: 'University of Waterloo',        logo: 'https://www.google.com/s2/favicons?sz=128&domain=uwaterloo.ca',     country: 'Canada' },
    { id: '9', name: 'University of Victoria',        logo: 'https://www.google.com/s2/favicons?sz=128&domain=uvic.ca',          country: 'Canada' },
    { id: '10', name: 'University of Manitoba',       logo: 'https://www.google.com/s2/favicons?sz=128&domain=umanitoba.ca',    country: 'Canada' },
    { id: '11', name: 'Thompson Rivers University',   logo: 'https://www.google.com/s2/favicons?sz=128&domain=tru.ca',           country: 'Canada' },
    { id: '12', name: 'University of Amsterdam',      logo: 'https://www.google.com/s2/favicons?sz=128&domain=uva.nl',           country: 'Europe' },
    { id: '13', name: 'Trinity College Dublin',       logo: 'https://www.google.com/s2/favicons?sz=128&domain=tcd.ie',           country: 'Europe' },
    { id: '14', name: 'Technical University of Munich', logo: 'https://www.google.com/s2/favicons?sz=128&domain=tum.de',       country: 'Europe' },
    { id: '15', name: 'KU Leuven',                    logo: 'https://www.google.com/s2/favicons?sz=128&domain=kuleuven.be',      country: 'Europe' },
    { id: '16', name: 'Arizona State University',     logo: 'https://www.google.com/s2/favicons?sz=128&domain=asu.edu',          country: 'USA' },
    { id: '17', name: 'Colorado State University',    logo: 'https://www.google.com/s2/favicons?sz=128&domain=colostate.edu',   country: 'USA' },
    { id: '18', name: 'DePaul University',            logo: 'https://www.google.com/s2/favicons?sz=128&domain=depaul.edu',       country: 'USA' },
    { id: '19', name: 'Pace University',              logo: 'https://www.google.com/s2/favicons?sz=128&domain=pace.edu',         country: 'USA' },
    { id: '20', name: 'University of Sussex',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=sussex.ac.uk',    country: 'UK' },
    { id: '21', name: 'University of Nottingham',     logo: 'https://www.google.com/s2/favicons?sz=128&domain=nottingham.ac.uk',country: 'UK' },
    { id: '22', name: 'Queen Mary University of London', logo: 'https://www.google.com/s2/favicons?sz=128&domain=qmul.ac.uk', country: 'UK' },
    { id: '23', name: 'University of Exeter',         logo: 'https://www.google.com/s2/favicons?sz=128&domain=exeter.ac.uk',    country: 'UK' },
    { id: '24', name: 'University of Bath',           logo: 'https://www.google.com/s2/favicons?sz=128&domain=bath.ac.uk',      country: 'UK' },
    { id: '25', name: "Queen's University Belfast",   logo: 'https://www.google.com/s2/favicons?sz=128&domain=qub.ac.uk',       country: 'UK' },
  ],

  aboutHeroTitle: "Nurturing Careers Since 2006.",
  aboutHeroDescription: "FTI Consultants is a leading overseas education consultancy with a strong presence in Pakistan and the UK. With over 20 years of experience, we guide students in choosing the right program and institution for a successful academic journey.",

  destinationsHeroTitle: "Choose Your Dream Destination",
  destinationsHeroDescription: "Explore top study destinations worldwide. We help you find the perfect country based on your goals, budget, and career aspirations.",

  servicesHeroTitle: "Comprehensive Education Solutions.",
  servicesHeroDescription: "From initial counselling to landing in your dream country, we architect your entire global journey with elite-level precision.",

  eventsHeroTitle: "Empowering Your Future Through Global Events",
  eventsHeroDescription: "Stay updated with our latest seminars, webinars, and roadshows. Connect with university experts and take the first step towards your international education.",

  contactHeroTitle: "Contact Us",
  contactHeroDescription: "Get in touch with our team for any inquiries or to book a free counselling session.",

  eventsList: events,
  eventGalleryList: eventGallery,
};

interface CMSContextType {
  cmsData: CMSData;
  updateCMSData: (newData: Partial<CMSData>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  isSyncing: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    // Start with localStorage data instantly (no flicker)
    const savedData = localStorage.getItem('fti_cms_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        return {
          ...defaultCMSData,
          ...parsed,
          homeUniversityPartners: parsed.homeUniversityPartners ?? defaultCMSData.homeUniversityPartners,
          eventsList: parsed.eventsList ?? defaultCMSData.eventsList,
          eventGalleryList: parsed.eventGalleryList ?? defaultCMSData.eventGalleryList,
        };
      } catch (e) {
        console.error("Failed to parse CMS data from localStorage", e);
      }
    }
    return defaultCMSData;
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // ── On mount: fetch live CMS data from backend ──────────────────────────
  useEffect(() => {
    const fetchFromBackend = async () => {
      try {
        const [home, about, ielts, pte, destinations, services, events, contact] = await Promise.all([
          pageApi.get('home'),
          pageApi.get('about'),
          pageApi.get('ielts'),
          pageApi.get('pte'),
          pageApi.get('destinations'),
          pageApi.get('services'),
          pageApi.get('events'),
          pageApi.get('contact'),
        ]);

        const merged: CMSData = {
          ...defaultCMSData,
          
          homeHeroTitle: home.heroTitle ?? defaultCMSData.homeHeroTitle,
          homeHeroDescription: home.heroDescription ?? defaultCMSData.homeHeroDescription,
          homeHeroImage: home.heroImage ?? defaultCMSData.homeHeroImage,
          homeSuccessImages: home.successImages ?? defaultCMSData.homeSuccessImages,
          homeUniversityPartners: home.universityPartners?.length ? home.universityPartners : defaultCMSData.homeUniversityPartners,

          aboutHeroTitle: about.heroTitle ?? defaultCMSData.aboutHeroTitle,
          aboutHeroDescription: about.heroDescription ?? defaultCMSData.aboutHeroDescription,

          ieltsHeroTitle: ielts.heroTitle ?? defaultCMSData.ieltsHeroTitle,
          ieltsHeroDescription: ielts.heroDescription ?? defaultCMSData.ieltsHeroDescription,
          ieltsSuccessImages: ielts.successImages ?? defaultCMSData.ieltsSuccessImages,

          pteHeroTitle: pte.heroTitle ?? defaultCMSData.pteHeroTitle,
          pteHeroDescription: pte.heroDescription ?? defaultCMSData.pteHeroDescription,
          pteSuccessImages: pte.successImages ?? defaultCMSData.pteSuccessImages,

          destinationsHeroTitle: destinations.heroTitle ?? defaultCMSData.destinationsHeroTitle,
          destinationsHeroDescription: destinations.heroDescription ?? defaultCMSData.destinationsHeroDescription,

          servicesHeroTitle: services.heroTitle ?? defaultCMSData.servicesHeroTitle,
          servicesHeroDescription: services.heroDescription ?? defaultCMSData.servicesHeroDescription,

          eventsHeroTitle: events.heroTitle ?? defaultCMSData.eventsHeroTitle,
          eventsHeroDescription: events.heroDescription ?? defaultCMSData.eventsHeroDescription,
          eventsList: events.eventsList?.length ? events.eventsList : defaultCMSData.eventsList,
          eventGalleryList: events.eventGalleryList?.length ? events.eventGalleryList : defaultCMSData.eventGalleryList,

          contactHeroTitle: contact.heroTitle ?? defaultCMSData.contactHeroTitle,
          contactHeroDescription: contact.heroDescription ?? defaultCMSData.contactHeroDescription,
        };

        setCmsData(merged);
        localStorage.setItem('fti_cms_data', JSON.stringify(merged));
      } catch (err) {
        console.warn('[CMS] Backend unavailable, using localStorage fallback.', err);
      }
    };

    fetchFromBackend();
  }, []);

  // ── Persist to localStorage whenever data changes ───────────────────────
  useEffect(() => {
    localStorage.setItem('fti_cms_data', JSON.stringify(cmsData));
  }, [cmsData]);

  // ── updateCMSData: update state, localStorage AND backend ──────────────
  const updateCMSData = useCallback(async (newData: Partial<CMSData>) => {
    // Optimistic local update first (instant UI feedback)
    setCmsData(prev => ({ ...prev, ...newData }));

    // Then persist to backend (fire and forget with error handling)
    setIsSyncing(true);
    try {
      const updates = [];
      
      // Determine which pages need updating based on keys
      const hasHome = Object.keys(newData).some(k => k.startsWith('home'));
      if (hasHome) {
        updates.push(pageApi.update('home', {
          heroTitle: newData.homeHeroTitle,
          heroDescription: newData.homeHeroDescription,
          heroImage: newData.homeHeroImage,
          successImages: newData.homeSuccessImages,
          universityPartners: newData.homeUniversityPartners
        }));
      }

      const hasAbout = Object.keys(newData).some(k => k.startsWith('about'));
      if (hasAbout) {
        updates.push(pageApi.update('about', {
          heroTitle: newData.aboutHeroTitle,
          heroDescription: newData.aboutHeroDescription
        }));
      }

      const hasIelts = Object.keys(newData).some(k => k.startsWith('ielts'));
      if (hasIelts) {
        updates.push(pageApi.update('ielts', {
          heroTitle: newData.ieltsHeroTitle,
          heroDescription: newData.ieltsHeroDescription,
          successImages: newData.ieltsSuccessImages
        }));
      }

      const hasPte = Object.keys(newData).some(k => k.startsWith('pte'));
      if (hasPte) {
        updates.push(pageApi.update('pte', {
          heroTitle: newData.pteHeroTitle,
          heroDescription: newData.pteHeroDescription,
          successImages: newData.pteSuccessImages
        }));
      }

      const hasDestinations = Object.keys(newData).some(k => k.startsWith('destinations'));
      if (hasDestinations) {
        updates.push(pageApi.update('destinations', {
          heroTitle: newData.destinationsHeroTitle,
          heroDescription: newData.destinationsHeroDescription
        }));
      }

      const hasServices = Object.keys(newData).some(k => k.startsWith('services'));
      if (hasServices) {
        updates.push(pageApi.update('services', {
          heroTitle: newData.servicesHeroTitle,
          heroDescription: newData.servicesHeroDescription
        }));
      }

      const hasEvents = Object.keys(newData).some(k => k.startsWith('event'));
      if (hasEvents) {
        updates.push(pageApi.update('events', {
          heroTitle: newData.eventsHeroTitle,
          heroDescription: newData.eventsHeroDescription,
          eventsList: newData.eventsList,
          eventGalleryList: newData.eventGalleryList
        }));
      }

      const hasContact = Object.keys(newData).some(k => k.startsWith('contact'));
      if (hasContact) {
        updates.push(pageApi.update('contact', {
          heroTitle: newData.contactHeroTitle,
          heroDescription: newData.contactHeroDescription
        }));
      }

      await Promise.all(updates);
    } catch (err) {
      console.warn('[CMS] Failed to sync to backend, saved locally only.', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // ── uploadImage: upload via API ─────────────────────────
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const res = await uploadApi.uploadImage(file);
      // Ensure it uses the API url if relative
      const baseURL = API_BASE_URL;
      // The backend returns /uploads/... so we just prepend the host
      const host = baseURL.replace('/api', '');
      return `${host}${res.url}`;
    } catch (err) {
      console.error('Upload failed', err);
      throw err;
    }
  };

  return (
    <CMSContext.Provider value={{ cmsData, updateCMSData, uploadImage, isSyncing }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
