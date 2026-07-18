import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, PenTool, Headphones, MonitorPlay, FileText } from 'lucide-react';

const services = [
    {
        title: "Mock Tests",
        description: "Full-length, timed mock tests every week to simulate the real exam environment and track your progress.",
        icon: FileText
    },
    {
        title: "Speaking Sessions",
        description: "One-on-one speaking interviews with expert trainers featuring detailed feedback and band prediction.",
        icon: Mic
    },
    {
        title: "Writing Evaluation",
        description: "Comprehensive daily assessment of Task 1 and Task 2 with vocabulary enhancement suggestions.",
        icon: PenTool
    },
    {
        title: "Listening Labs",
        description: "State-of-the-art audio labs equipped with high-quality headsets for crystal clear listening practice.",
        icon: Headphones
    },
    {
        title: "Reading Strategies",
        description: "Master skimming, scanning, and time management techniques to tackle complex academic texts.",
        icon: BookOpen
    },
    {
        title: "Masterclasses",
        description: "Specialized workshops focusing on advanced grammar, complex sentence structures, and lexical resource.",
        icon: MonitorPlay
    }
];

const IELTSServices = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
                    >
                        IELTS <span className="text-orange-500">Preparation</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600"
                    >
                        We offer a complete ecosystem of tools, training, and resources designed to help you achieve your target band score in the first attempt.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, y: -5 }}
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                    y: {
                                        duration: 4 + (index % 3),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="bg-gradient-to-br from-orange-500 to-amber-500 h-full p-8 rounded-3xl shadow-lg shadow-orange-500/30 border border-orange-400 group cursor-default relative overflow-hidden"
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/20 text-white backdrop-blur-sm shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                                    <service.icon className="w-7 h-7 drop-shadow-md" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-orange-50 leading-relaxed">
                                    {service.description}
                                </p>
                                
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IELTSServices;
