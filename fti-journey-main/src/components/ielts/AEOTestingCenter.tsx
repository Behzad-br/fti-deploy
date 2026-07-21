import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building, ShieldCheck, Clock, Award, Sparkles, Zap } from 'lucide-react';

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

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Same Venue Testing",
                            desc: "Practice where you test. Familiar surroundings significantly reduce stress and improve overall performance on test day.",
                            icon: Building,
                            color: "from-orange-400 to-amber-500",
                            num: "01"
                        },
                        {
                            title: "Authentic Equipment",
                            desc: "Train with the exact same high-quality audio equipment and official Cambridge testing materials used by AEO examiners.",
                            icon: ShieldCheck,
                            color: "from-amber-400 to-yellow-500",
                            num: "02"
                        },
                        {
                            title: "Priority Booking",
                            desc: "As our student, enjoy priority slot booking and exclusive fast-track registration for your final IELTS exam.",
                            icon: Clock,
                            color: "from-orange-500 to-red-500",
                            num: "03"
                        }
                    ].map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                            className="relative group h-full"
                        >
                            {/* Animated background glow on hover */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.color} rounded-[2.5rem] blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                            
                            <div className="relative h-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col justify-between z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                
                                {/* Large faint number in background */}
                                <div className="absolute -right-6 -bottom-6 text-9xl font-black text-slate-50/80 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">
                                    {feature.num}
                                </div>

                                <div className="relative z-10">
                                    {/* Icon Container */}
                                    <div className="mb-8 relative inline-flex">
                                        <div className={`absolute inset-0 bg-gradient-to-tr ${feature.color} rounded-2xl blur-md opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500`} />
                                        <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-500`}>
                                            <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </div>
                                
                                {/* Decorative line */}
                                <div className="w-0 h-1 mt-8 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full group-hover:w-full transition-all duration-700 ease-in-out" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-500/20 max-w-6xl mx-auto overflow-hidden relative"
                >
                    {/* Background glows for the bar */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                    <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
                            <Award className="w-8 h-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white drop-shadow-sm leading-none mb-1">20+</div>
                            <div className="text-xs sm:text-sm font-bold text-orange-100 tracking-wider uppercase">Years of Excellence</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
                            <Sparkles className="w-8 h-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white drop-shadow-sm leading-none mb-1">OFFICIAL</div>
                            <div className="text-xs sm:text-sm font-bold text-orange-100 tracking-wider uppercase">IELTS Testing Center</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
                            <Zap className="w-8 h-8 text-white drop-shadow-sm" />
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-white drop-shadow-sm leading-none mb-1">20,000+</div>
                            <div className="text-xs sm:text-sm font-bold text-orange-100 tracking-wider uppercase">Students</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AEOTestingCenter;
