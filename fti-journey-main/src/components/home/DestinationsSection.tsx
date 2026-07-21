import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Banknote, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const destinations = [
  {
    name: 'United Kingdom',
    image: '/uk-banner.jpg',
    path: '/destinations/uk',
    universities: '160+ Universities',
    fees: '£15000-25000 Annual',
    visa: '02 Years Post Study Visa',
  },
  {
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/canada',
    universities: '100+ Universities',
    fees: '$15000-30000 Annual',
    visa: 'Up to 3 Years PGWP',
  },
  {
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/australia',
    universities: '40+ Universities',
    fees: '$20000-35000 Annual',
    visa: '02-04 Years Post Study Visa',
  },
  {
    name: 'Ireland',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/ireland',
    universities: '30+ Universities',
    fees: '€10000-25000 Annual',
    visa: 'Up to 2 Years Post Study',
  },
  {
    name: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/usa',
    universities: '4000+ Universities',
    fees: '$20000-50000 Annual',
    visa: 'Up to 3 Years OPT',
  },
  {
    name: 'Hungary',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/hungary',
    universities: '65+ Universities',
    fees: '€3000-8000 Annual',
    visa: 'Up to 3 Years Post Study',
  },
  {
    name: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/turkey',
    universities: '200+ Universities',
    fees: '$3000-10000 Annual',
    visa: 'Up to 2 Years Residence',
  },
  {
    name: 'Finland',
    image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/finland',
    universities: '40+ Universities',
    fees: '€8000-18000 Annual',
    visa: 'Up to 2 Years Post Study',
  },
  {
    name: 'Cyprus',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
    path: '/destinations/cyprus',
    universities: '25+ Universities',
    fees: '€5000-12000 Annual',
    visa: 'Up to 2 Years Post Study',
  },
  {
    name: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/malaysia',
    universities: '100+ Universities',
    fees: '$4000-12000 Annual',
    visa: 'Up to 1 Year Post Study',
  },
  {
    name: 'Sweden',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/sweden',
    universities: '50+ Universities',
    fees: '€10000-20000 Annual',
    visa: 'Up to 1 Year Job Search',
  },
  {
    name: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    path: '/destinations/new-zealand',
    universities: '30+ Universities',
    fees: '$18000-28000 Annual',
    visa: 'Up to 3 Years Post Study',
  },
];

const DestinationsSection = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  return (
    <section className="py-24 bg-background relative overflow-hidden flex flex-col items-center z-10">
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4 mb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center justify-center mb-12 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4 border border-primary/20"
          >
            Global Destinations
          </motion.span>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 max-w-3xl leading-tight">
            Study Destinations <span className="text-gradient">We Cover</span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
            FTI helps students to secure admission to leading universities across the world's most popular study destinations.
          </p>

          {/* Navigation Buttons - Smaller and Centered */}
          <div className="flex gap-4 relative z-20">
            <button
              onClick={() => setDirection('right')}
              className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${direction === 'right' ? 'bg-primary text-white border-primary shadow-hover' : 'bg-white border-border/50 hover:bg-primary/10 text-foreground'}`}
              aria-label="Scroll Right"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDirection('left')}
              className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${direction === 'left' ? 'bg-primary text-white border-primary shadow-hover' : 'bg-white border-border/50 hover:bg-primary/10 text-foreground'}`}
              aria-label="Scroll Left"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="w-full overflow-visible py-4 -my-4 relative z-0">
        <Marquee
          speed={40}
          pauseOnHover={true}
          gradient={false}
          direction={direction}
          className="overflow-visible"
        >
          <div className="flex gap-6 pr-6 py-4">
            {destinations.map((dest, index) => (
              <motion.div
                key={`${dest.name}-${index}`}
                className="w-[280px] md:w-[320px] lg:w-[350px] shrink-0"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  to={dest.path}
                  className="group relative block h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 bg-black cursor-pointer"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />

                  {/* Default Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Hover Details Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-0 transform group-hover:-translate-y-4 group-hover:mb-4 transition-all duration-500 shadow-sm">
                      {dest.name}
                    </h3>

                    {/* Hidden Details that slide up on hover */}
                    <div className="overflow-hidden">
                      <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-3">
                        <div className="h-[1px] w-full bg-white/30 mb-2" />
                        <div className="flex items-center gap-3 text-sm text-gray-200">
                          <GraduationCap className="w-5 h-5 opacity-80" />
                          <span>{dest.universities}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-200">
                          <Banknote className="w-5 h-5 opacity-80" />
                          <span>{dest.fees}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-200">
                          <Briefcase className="w-5 h-5 opacity-80" />
                          <span>{dest.visa}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Red Arrow Button */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-xl flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 z-20">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default DestinationsSection;
