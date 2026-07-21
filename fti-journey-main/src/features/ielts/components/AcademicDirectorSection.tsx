import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Quote } from 'lucide-react';

const AcademicDirectorSection = () => {
    return (
        <section className="pt-32 pb-4 relative overflow-hidden bg-slate-950 text-white">
            {/* Dark Mode Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group"
                    >
                        <div className="absolute -inset-10 bg-gradient-to-tr from-orange-500/20 via-primary/10 to-transparent rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-slate-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] bg-slate-900">
                            <motion.img 
                                src="/academic-director-profile.png" 
                                alt="Academic Director" 
                                className="w-full h-full object-cover object-top aspect-square brightness-110 contrast-105"
                                initial={{ scale: 1.15 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 2 }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                                }}
                            />
                        </div>
                        {/* Caption below the photo */}
                        <div className="mt-8 px-6">
                            <p className="text-white font-black text-3xl md:text-5xl mb-2 leading-none tracking-tight">Director Academics</p>
                            <p className="text-orange-400 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Shaista Zahoor</p>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="mb-10 lg:mb-14">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", delay: 0.3 }}
                                className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-orange-500/10 text-orange-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-10 shadow-sm border border-orange-500/20"
                            >
                                <GraduationCap className="w-5 h-5" /> Message from Directorate
                            </motion.div>
                            
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter">
                                Empowering <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 italic drop-shadow-sm">Excellence</span>
                            </h2>

                            <div className="relative mb-14 pl-8 border-l-4 border-orange-500">
                                <Quote className="absolute -top-10 -left-6 w-20 h-20 text-orange-500/10 -z-10" />
                                <p className="text-xl md:text-3xl text-slate-300 font-medium leading-relaxed italic">
                                    "We bridge the gap between global potential and realized success by providing a structured, quality-driven environment for every student."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                                <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white text-lg mb-2 uppercase tracking-tight">Standardized Prep</h4>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Curriculum designed by global testing experts.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                        <Award className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white text-lg mb-2 uppercase tracking-tight">Result Oriented</h4>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Focused strategies to hit target band scores.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AcademicDirectorSection;
