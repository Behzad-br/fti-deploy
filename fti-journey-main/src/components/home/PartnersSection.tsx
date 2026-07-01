import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';

const COUNTRY_ORDER = ['Australia', 'Canada', 'Europe', 'USA', 'UK'] as const;
const COUNTRY_SPEEDS: Record<string, number> = {
    Australia: 25, Canada: 20, Europe: 22, USA: 28, UK: 24,
};

const PartnersSection = () => {
    const { cmsData } = useCMS();

    // Group universities by country using CMS data
    const partnersByCountry = COUNTRY_ORDER.map(country => ({
        country,
        speed: COUNTRY_SPEEDS[country],
        universities: cmsData.homeUniversityPartners.filter(u => u.country === country),
    })).filter(g => g.universities.length > 0);

    return (
        <section className="relative py-24 bg-gray-50 border-y border-border/50 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center p-2 px-5 mb-6 bg-white rounded-full shadow-sm border border-primary/10">
                        <span className="relative flex h-3 w-3 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">
                            Partnerships
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 drop-shadow-sm pb-2">
                        Global Opportunity
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                        We are officially representing the most prestigious universities across the globe.
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full py-4 mt-4 z-10">
                {/* Gradient Fades */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none xl:hidden" />
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none xl:hidden" />

                <div className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar justify-start xl:justify-center gap-6 md:gap-10 px-8 h-[600px] relative">
                    {partnersByCountry.map((group, idx) => {
                        const isUp = idx % 2 === 0;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                key={group.country}
                                className="flex flex-col flex-none w-40 md:w-56 h-full snap-center pt-2"
                            >
                                {/* Column Header */}
                                <div className="pb-2 text-center z-30 flex-none h-[60px] flex items-center justify-center">
                                    <div className="inline-block px-6 py-2 rounded-full bg-white shadow-md border border-gray-100">
                                        <span className="text-xs md:text-sm font-black text-primary uppercase tracking-widest">
                                            {group.country}
                                        </span>
                                    </div>
                                </div>

                                {/* Vertical Animated Marquee */}
                                <div className="flex-1 relative w-full overflow-hidden rounded-xl mt-2 bg-transparent">
                                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-transparent z-20 pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-20 pointer-events-none" />

                                    <motion.div
                                        animate={{ y: isUp ? ['0%', '-50%'] : ['-50%', '0%'] }}
                                        transition={{ repeat: Infinity, ease: 'linear', duration: group.speed }}
                                        className="flex flex-col gap-6 w-full pt-4"
                                    >
                                        {[...group.universities, ...group.universities].map((partner, index) => (
                                            <div
                                                key={`${partner.id}-${index}`}
                                                className="relative flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 w-full mx-auto gap-2"
                                            >
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="h-12 md:h-16 w-auto object-contain max-w-[110px]"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                                <span className="text-[10px] font-semibold text-gray-500 text-center leading-tight line-clamp-2">
                                                    {partner.name}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
