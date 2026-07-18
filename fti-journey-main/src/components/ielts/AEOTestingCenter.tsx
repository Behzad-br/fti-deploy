import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building, ShieldCheck, Clock } from 'lucide-react';

const AEOTestingCenter = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
                    >
                        Proud to be an Official <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">AEO IELTS Testing Center</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Card 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_-10px_rgba(255,165,0,0.15)] hover:border-orange-200 transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-orange-500">
                            <Building className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Same Venue Testing</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Practice where you test. Familiar surroundings significantly reduce stress and improve overall performance on test day.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_-10px_rgba(255,165,0,0.15)] hover:border-orange-200 transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-orange-500">
                            <ShieldCheck className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Authentic Equipment</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Train with the exact same high-quality audio equipment and testing materials used by AEO examiners.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_-10px_rgba(255,165,0,0.15)] hover:border-orange-200 transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-orange-500">
                            <Clock className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Priority Booking</h3>
                        <p className="text-slate-600 leading-relaxed">
                            As our student, enjoy priority slot booking and exclusive fast-track registration for your final IELTS exam.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AEOTestingCenter;
