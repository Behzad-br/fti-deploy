import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Filter, Users, Globe, Award, Play, ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react';
import AnimatedSection from '@/components/animations/AnimatedSection';
import StaggerContainer from '@/components/animations/StaggerContainer';
import { ParticlesBackground } from '@/components/shared/ParticlesBackground';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/shared/SEO';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import ReactPlayer from 'react-player';
import { useCMS } from '@/store/CMSContext';

const Events = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [activeMedia, setActiveMedia] = useState<any>(null);
    const { cmsData } = useCMS();

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        dragFree: false
    });

    useEffect(() => {
        if (emblaApi) {
            const intervalId = setInterval(() => {
                emblaApi.scrollNext();
            }, 2000); // 2 seconds interval

            return () => clearInterval(intervalId);
        }
    }, [emblaApi]);

    const categories = ['All', 'Seminar', 'Webinar', 'Roadshow', 'Workshop'];

    const filteredEvents = (cmsData.eventsList || []).filter(event => {
        const categoryMatch = activeCategory === 'All' || event.category === activeCategory;
        return event.status === 'upcoming' && categoryMatch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <Layout>
            <SEO 
                title="Events & Webinars | FTI Consultants" 
                description="Join our upcoming study abroad events, seminars, and webinars. Meet university delegates directly and explore your international education options."
                keywords="study abroad events, education seminars, university webinars, FTI consultants events"
                url="https://fticonsultants.com/events"
            />
            <div className="min-h-screen pt-20 relative overflow-hidden bg-slate-50/30">
                <ParticlesBackground />
                
                {/* Cinematic Background Glows */}
                <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* --- Hero Section --- */}
                <section className="relative py-20 overflow-hidden bg-[#1a0f05]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f05] via-[#1a0f05]/90 to-[#1a0f05]/40 z-10" />
                        <motion.div 
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
                                alt="Events Hero"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    <div className="container mx-auto px-4 relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary-foreground font-bold text-xs uppercase tracking-widest mb-6 border border-primary/30">
                                FTI Exclusive Events
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                {cmsData.eventsHeroTitle.includes('Through') ? (
                                  <>{cmsData.eventsHeroTitle.split('Through')[0]}Through <span className="text-primary">{cmsData.eventsHeroTitle.split('Through')[1].trim()}</span></>
                                ) : cmsData.eventsHeroTitle}
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                                {cmsData.eventsHeroDescription}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="hero" size="lg" onClick={() => {
                                    const el = document.getElementById('next-event');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    Explore Events
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- Featured Upcoming Events (Admin Posts) --- */}
                {filteredEvents.length > 0 && (
                    <section id="next-event" className="py-24 bg-white relative overflow-hidden">
                        <div className="container mx-auto px-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-12"
                            >
                                <div className="w-12 h-[2px] bg-primary" />
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em]">Featured Announcements</h2>
                            </motion.div>

                            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredEvents.slice(0, 2).map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        className="relative group rounded-[3rem] overflow-hidden bg-[#1a0f05] shadow-2xl h-[500px]"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <img 
                                                src={event.image} 
                                                alt={event.title}
                                                className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f05] via-[#1a0f05]/60 to-transparent" />
                                        </div>
                                        
                                        <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-foreground font-bold text-[10px] uppercase tracking-widest border border-primary/30">
                                                    {event.category}
                                                </span>
                                                <span className="text-white/50 font-bold text-[10px] uppercase tracking-widest">{event.date}</span>
                                            </div>
                                            
                                            <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            
                                            <p className="text-gray-300 text-sm mb-8 line-clamp-2 leading-relaxed">
                                                {event.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-3 text-white/70 text-xs font-bold">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <span>{event.location.split(',')[0]}</span>
                                                </div>
                                                
                                                <Button size="sm" className="rounded-xl px-6 font-bold group/btn" asChild>
                                                    <Link to={event.registrationLink || '/apply'}>
                                                        Register <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/* Premium Decorative Element */}
                                        <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <Zap className="w-6 h-6 text-primary" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                <AnimatedSection className="py-32 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-400/5 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >

                                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                                    Moments from Our <br /> <span className="text-primary italic">Past Events</span>
                                </h2>
                            </motion.div>
                            
                            <motion.div 
                                className="flex gap-4"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-14 h-14 border-2 border-slate-200 bg-white text-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 group"
                                    onClick={() => emblaApi?.scrollPrev()}
                                >
                                    <ChevronLeft className="w-8 h-8 group-active:scale-90 transition-transform" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-14 h-14 border-2 border-slate-200 bg-white text-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 group"
                                    onClick={() => emblaApi?.scrollNext()}
                                >
                                    <ChevronRight className="w-8 h-8 group-active:scale-90 transition-transform" />
                                </Button>
                            </motion.div>
                        </div>

                        <div className="embla overflow-visible" ref={emblaRef}>
                            <div className="embla__container flex">
                                {(cmsData.eventGalleryList || []).map((item, index) => (
                                    <motion.div 
                                        key={item.id} 
                                        className="embla__slide flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_28%] pl-6 first:pl-0"
                                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <motion.div 
                                            className="group relative h-[420px] rounded-[2.5rem] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] bg-white border border-slate-100"
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        >
                                            {item.type === 'video' ? (
                                                <div className="w-full h-full relative cursor-pointer" onClick={() => setActiveMedia(item)}>
                                                    <img
                                                        src={item.thumbnail || item.url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75 group-hover:brightness-90"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:animate-pulse">
                                                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full relative">
                                                    <img
                                                        src={item.url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-100"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                                                </div>
                                            )}

                                            {/* Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="h-[2px] w-8 bg-primary" />
                                                        <span className="text-primary font-black text-xs uppercase tracking-[0.2em]">{item.date}</span>
                                                    </div>
                                                    <h4 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </motion.div>
                                            </div>
                                            
                                            {/* Interactive Shine Effect */}
                                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                    {/* Media Modal */}
                    <AnimatePresence>
                        {activeMedia && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                            >
                                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setActiveMedia(null)} />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,107,44,0.3)]"
                                >
                                    <button
                                        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all font-bold text-xl"
                                        onClick={() => setActiveMedia(null)}
                                    >
                                        ✕
                                    </button>

                                    {activeMedia.type === 'video' ? (
                                        <div className="w-full h-full">
                                            <ReactPlayer
                                                // @ts-ignore
                                                url={activeMedia.url}
                                                width="100%"
                                                height="100%"
                                                controls
                                                playing={true}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={activeMedia.url}
                                            alt={activeMedia.title}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                {/* --- Newsletter --- */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="max-w-2xl mx-auto relative z-10"
                            >

                                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-grow px-6 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <Button variant="hero" size="lg" className="whitespace-nowrap h-auto py-4">
                                        Notify Me
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Events;
