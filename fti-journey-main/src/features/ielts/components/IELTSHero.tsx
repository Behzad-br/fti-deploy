import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, BookOpen, Headphones, PenTool, Mic, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingIcons = [
    { Icon: BookOpen, top: '15%', left: '10%', delay: 0 },
    { Icon: Headphones, top: '65%', left: '15%', delay: 1.2 },
    { Icon: PenTool, top: '25%', right: '12%', delay: 0.5 },
    { Icon: Mic, top: '70%', right: '8%', delay: 1.8 },
    { Icon: Globe, top: '45%', left: '80%', delay: 2.5 }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 } 
    }
};

const IELTSHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-20">

            {/* Ambient Animated Glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse duration-[4000ms] mix-blend-multiply hidden md:block" />
            <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] mix-blend-multiply hidden md:block" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.08] mix-blend-overlay z-0" />

            {/* Floating Energy Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
                {Array.from({ length: 35 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full shadow-[0_0_15px_rgba(255,140,0,0.6)] mix-blend-screen"
                        style={{
                            backgroundColor: i % 2 === 0 ? '#f97316' : '#fbbf24', // orange-500 or amber-400
                            width: Math.random() * 5 + 3,
                            height: Math.random() * 5 + 3,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -80, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.8, 0.5],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 10,
                        }}
                    />
                ))}
            </div>

            {/* Floating Elements layer */}
            {mounted && floatingIcons.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute z-20 hidden lg:flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-white/70 border border-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(255,165,0,0.15)] hover:shadow-[0_20px_50px_rgba(255,140,0,0.4)] transition-all duration-300 hover:-translate-y-2 group"
                    style={{ top: item.top, left: item.left, right: item.right }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        y: [0, -25, 0],
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                        y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay },
                        rotate: { duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay },
                        opacity: { duration: 1.2, delay: item.delay },
                        scale: { duration: 1.2, delay: item.delay, type: 'spring' }
                    }}
                    whileHover={{ scale: 1.15, rotate: 0 }}
                >
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                    <item.Icon className="w-12 h-12 text-orange-500 drop-shadow-[0_0_15px_rgba(255,140,0,0.6)] group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
            ))}

            <motion.div 
                className="container mx-auto px-4 relative z-30"
                style={{ y: y1 }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-10">

                    {/* Trust Badge */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-2xl px-8 py-3.5 rounded-full border-2 border-orange-100 shadow-[0_12px_40px_rgba(255,140,0,0.15)] group hover:bg-white transition-all cursor-pointer hover:border-orange-200"
                    >

                        <span className="text-sm md:text-base font-bold text-slate-800 tracking-wide group-hover:text-primary transition-colors">
                            The #1 IELTS Institute in Gujranwala
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-4 md:space-y-6 relative"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.2] md:leading-[1.25] drop-shadow-sm">
                            <span className="font-extrabold text-slate-700">Unlock Your</span> <br className="hidden md:block" />
                            <span className="relative inline-block font-black italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500 pb-2 mt-1 md:mt-4 pr-2 md:pr-4">
                                Global Potential
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary to-amber-400 rounded-full blur-sm opacity-50" 
                                />
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                                    className="absolute bottom-0 left-0 h-1.5 flex bg-gradient-to-r from-orange-300 to-primary rounded-full relative"
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,165,0,0.8)]" />
                                </motion.div>
                            </span>
                        </h1>
                    </motion.div>



                    {/* Call to Actions */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5 pt-8 w-full sm:w-auto"
                    >
                        <Link to="/apply-ielts" className="w-full sm:w-auto">
                          <button className="w-full h-14 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] border-none transition-all duration-300 flex items-center justify-center">
                            Apply for IELTS
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                        

                    </motion.div>

                </div>
            </motion.div>
            
            {/* Base cinematic fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
};

export default IELTSHero;

