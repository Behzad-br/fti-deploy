import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';

const destinations = [
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    path: '/destinations/uk',
    image: '/uk-banner.jpg',
    description: 'World-renowned universities, rich culture, and excellent post-study work opportunities.',
    highlights: ['2-year PSW visa', 'Russell Group', 'September & January'],
    color: 'from-blue-900 to-indigo-800',
    accent: '#3B82F6',
    students: '600K+',
    universities: '160+',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    path: '/destinations/canada',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
    description: 'Affordable education, clear PR pathway, and a welcoming multicultural environment.',
    highlights: ['3-year PGWP', 'Co-op programs', 'PR pathway'],
    color: 'from-red-800 to-red-600',
    accent: '#EF4444',
    students: '800K+',
    universities: '100+',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    path: '/destinations/australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=500&fit=crop',
    description: 'High quality of life, work while studying, and post-study work visas up to 6 years.',
    highlights: ['Up to 6yr PSW visa', 'Work 48hrs/fortnight', 'Feb & July intakes'],
    color: 'from-yellow-700 to-orange-600',
    accent: '#F59E0B',
    students: '700K+',
    universities: '40+',
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    path: '/destinations/ireland',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&h=500&fit=crop',
    description: 'Europe\'s tech hub, home to Google & Apple HQs, with excellent stay-back options.',
    highlights: ['2-year stay back', 'Tech companies HQ', 'English-speaking'],
    color: 'from-green-800 to-emerald-600',
    accent: '#10B981',
    students: '35K+',
    universities: '30+',
  },
  {
    name: 'USA',
    flag: '🇺🇸',
    path: '/destinations/usa',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop',
    description: 'World\'s best universities with unmatched diversity in programs and OPT opportunities.',
    highlights: ['OPT 3yr STEM', 'Ivy League options', 'Fall & Spring'],
    color: 'from-blue-800 to-blue-600',
    accent: '#2563EB',
    students: '1M+',
    universities: '4000+',
  },
  {
    name: 'Hungary',
    flag: '🇭🇺',
    path: '/destinations/hungary',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=500&fit=crop',
    description: 'Affordable European education in the heart of Europe with Schengen zone access.',
    highlights: ['Low tuition fees', '65+ Universities', 'Schengen access'],
    color: 'from-red-700 to-green-700',
    accent: '#DC2626',
    students: '25K+',
    universities: '65+',
  },
  {
    name: 'Turkey',
    flag: '🇹🇷',
    path: '/destinations/turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
    description: 'Rapidly growing education hub with 200+ universities, affordable fees and scholarships.',
    highlights: ['200+ Universities', 'Affordable fees', 'Scholarships available'],
    color: 'from-red-800 to-red-500',
    accent: '#DC2626',
    students: '200K+',
    universities: '200+',
  },
  {
    name: 'Finland',
    flag: '🇫🇮',
    path: '/destinations/finland',
    image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&h=500&fit=crop',
    description: 'World\'s top education system, innovative research, and exceptional quality of life.',
    highlights: ['Top education system', 'Research excellence', 'Post-study permit'],
    color: 'from-blue-700 to-sky-500',
    accent: '#0EA5E9',
    students: '20K+',
    universities: '40+',
  },
  {
    name: 'Cyprus',
    flag: '🇨🇾',
    path: '/destinations/cyprus',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
    description: 'EU-recognised degrees in English in a stunning Mediterranean island setting.',
    highlights: ['EU recognised degrees', 'English programs', 'Mediterranean life'],
    color: 'from-orange-700 to-amber-500',
    accent: '#F59E0B',
    students: '10K+',
    universities: '25+',
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    path: '/destinations/malaysia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=500&fit=crop',
    description: 'Affordable Asian education hub with branch campuses of top global universities.',
    highlights: ['Low cost of living', '100+ Universities', 'Multicultural'],
    color: 'from-blue-900 to-red-700',
    accent: '#EF4444',
    students: '150K+',
    universities: '100+',
  },
  {
    name: 'Sweden',
    flag: '🇸🇪',
    path: '/destinations/sweden',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=500&fit=crop',
    description: 'World leader in innovation, sustainability, and cutting-edge research programs.',
    highlights: ['Innovation focused', 'English-taught', 'High quality of life'],
    color: 'from-blue-800 to-yellow-600',
    accent: '#FBBF24',
    students: '45K+',
    universities: '50+',
  },
  {
    name: 'New Zealand',
    flag: '🇳🇿',
    path: '/destinations/new-zealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=500&fit=crop',
    description: 'Safe, welcoming country with 3-year post-study work visa and breathtaking nature.',
    highlights: ['3-year Post Study Visa', 'Safe environment', 'Work while studying'],
    color: 'from-black to-red-700',
    accent: '#EF4444',
    students: '50K+',
    universities: '30+',
  },
];



const Destinations = () => {
  return (
    <Layout>
      <SEO 
        title="Study Abroad Destinations: UK, USA, Canada & More | FTI Consultant" 
        description="Explore top study destinations with FTI Consultant. Study in the UK, USA, Canada, Australia, and Europe. Find the best universities & scholarships for your future."
        keywords="study in uk from pakistan, study in canada consultants, study in usa consultants pakistan, study in australia, study abroad destinations, fti consultant countries"
        url="https://fticonsultants.com/destinations"
      />
      <div className="page-transition">

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background image collage */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5">
            {[
              '/uk-banner.jpg',
              'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=500&fit=crop',
            ].map((img, i) => (
              <div key={i} className="overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover scale-110" />
              </div>
            ))}
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />

          {/* Floating glowing orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >


              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                Choose Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Dream Destination
                </span>
              </h1>



              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link
                  to="/free-consultation"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2"
                >
                  Get Free Counselling <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#destinations"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
                >
                  Explore Countries
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
            <p className="text-xs uppercase tracking-widest">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1"
            >
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </motion.div>
          </div>
        </section>


        {/* ── DESTINATIONS GRID ── */}
        <section id="destinations" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">



            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...destinations].sort((a, b) => a.name.localeCompare(b.name)).map((dest, index) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link to={dest.path} className="block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark gradient overlay - no color tint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />

                      {/* Flag + name on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl drop-shadow-lg">{dest.flag}</span>
                          <div>
                            <h3 className="text-white text-xl font-black leading-tight drop-shadow-md">{dest.name}</h3>
                            <p className="text-white/75 text-xs">{dest.students} international students</p>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-white text-xs font-bold">
                          {dest.universities} Uni
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {dest.description}
                      </p>



                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-bold" style={{ color: dest.accent }}>
                          Explore {dest.name}
                        </span>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                          style={{ backgroundColor: `${dest.accent}20` }}
                        >
                          <ArrowRight className="w-4 h-4" style={{ color: dest.accent }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </Layout>
  );
};

export default Destinations;
