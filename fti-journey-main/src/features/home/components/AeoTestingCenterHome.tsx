import React from 'react';
import { motion } from 'framer-motion';

const AeoTestingCenterHome = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 opacity-60" />
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_60px_-15px_rgba(255,165,0,0.15)] border-2 border-orange-50 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative overflow-hidden"
                >
                    {/* Decorative internal blob */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-extrabold text-xs uppercase tracking-widest mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            Official Partner
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight"
                        >
                            Proud to be an OFFICIAL <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">AEO IELTS Testing Center</span>
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto md:mx-0"
                        >
                            Experience seamless registration and test taking in the exact same authentic environment you practice in, ensuring zero test-day anxiety.
                        </motion.p>
                    </div>

                    {/* Logo Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30, rotate: -5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
                        className="w-full md:w-auto flex-shrink-0 relative z-10"
                    >
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 group hover:shadow-[0_20px_50px_-10px_rgba(255,165,0,0.2)] hover:border-orange-200 transition-all duration-500">
                            <img 
                                src="/aeo-logo.png" 
                                alt="AEO Pakistan" 
                                className="w-48 md:w-64 h-auto object-contain group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default AeoTestingCenterHome;
