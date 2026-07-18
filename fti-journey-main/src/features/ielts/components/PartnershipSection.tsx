import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star, Sparkles, Zap, Building2, Globe2 } from 'lucide-react';

const PartnershipSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        }
    };

    return (
        <section className="py-32 relative overflow-hidden bg-white">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-orange-50 rounded-full blur-[100px] opacity-70 animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] bg-orange-100/50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    className="text-center max-w-4xl mx-auto mb-20 md:mb-24"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-orange-600 font-extrabold text-xs uppercase tracking-[0.2em] mb-8 shadow-[0_8px_30px_rgba(255,165,0,0.15)] border border-orange-100"
                    >
                        <ShieldCheck className="w-4 h-4" /> Global Recognition
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                        Proud to be{' '}
                        <span className="relative inline-block px-1">
                             <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full" />
                             <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 font-black">OFFICIAL</span>
                        </span>
                        <br />
                        Testing Center of <span className="text-slate-900 border-b-4 border-orange-500 pb-1">AeU</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                        FTI is officially recognized and awarded by top international testing bodies and universities for our excellence in education and global mobility.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* British Council Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,165,0,0.08)] border-2 border-orange-50 flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="h-16 md:h-20 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-105 transition-all duration-500">
                            <img 
                                src="/british-council-logo.png" 
                                alt="British Council" 
                                className="h-full w-auto object-contain drop-shadow-sm rounded-lg scale-150 md:scale-[1.7]" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/British_Council_logo.svg/512px-British_Council_logo.svg.png';
                                }}
                            />
                        </div>
                        <p className="text-slate-500 text-center mb-6 md:mb-8 font-medium text-sm md:text-base">Official Testing Centre & Platinum Partner for IELTS examinations.</p>
                        
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-orange-200 shadow-sm">Platinum Status</span>
                            <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />)}
                            </div>
                        </div>
                    </motion.div>

                    {/* AeU Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,165,0,0.08)] border-2 border-orange-50 flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="h-16 md:h-20 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-105 transition-all duration-500">
                            <img 
                                src="https://aeu.edu.my/wp-content/uploads/2021/04/aeu-logo.png" 
                                alt="AeU - Asia e University" 
                                className="h-full w-auto object-contain drop-shadow-sm rounded-lg" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?sz=128&domain=aeu.edu.my';
                                }}
                            />
                        </div>
                        <p className="text-slate-500 text-center mb-6 md:mb-8 font-medium text-sm md:text-base">Official Testing Centre for Asia e University (AeU) international programs.</p>

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-orange-200 shadow-sm">Official Center</span>
                            <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />)}
                            </div>
                        </div>
                    </motion.div>

                    {/* IDP Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,165,0,0.08)] border-2 border-orange-50 flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="h-16 md:h-20 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-105 transition-all duration-500">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/IDP_Education_logo.svg/512px-IDP_Education_logo.svg.png" 
                                alt="IDP Education" 
                                className="h-full w-auto object-contain drop-shadow-sm rounded-lg" 
                            />
                        </div>
                        <p className="text-slate-500 text-center mb-6 md:mb-8 font-medium text-sm md:text-base">Authorized Registration and Preparation Partner for global mobility.</p>

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-orange-200 shadow-sm">Authorized Partner</span>
                            <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />)}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Counter/Status Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-12 md:mt-20 max-w-5xl mx-auto flex flex-row flex-nowrap justify-between md:justify-between items-center gap-2 md:gap-8 p-4 md:p-14 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 shadow-[0_20px_40px_rgba(255,165,0,0.3)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
                    
                    {/* Decorative wave background inside the banner */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                    {[
                        { label: "Years of Excellence", value: "12+", icon: Award },
                        { label: "Testing Center", value: "OFFICIAL", icon: Sparkles },
                        { label: "Students Empowered", value: "20,000+", icon: Zap }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left group relative z-10 w-1/3 md:w-auto">
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl group-hover:bg-white group-hover:text-orange-500 text-white shrink-0">
                                <stat.icon className="w-5 h-5 md:w-8 md:h-8 opacity-100 transition-colors" />
                            </div>
                            <div>
                                <p className="text-xl md:text-4xl font-black text-white mb-0 md:mb-1 tracking-tighter drop-shadow-md whitespace-nowrap">{stat.value}</p>
                                <p className="text-[8px] md:text-sm font-bold uppercase tracking-wider md:tracking-widest text-orange-100 leading-tight">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PartnershipSection;
