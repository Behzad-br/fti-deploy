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
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                        Official IELTS <br/>
                        <span className="relative inline-block px-1">
                             <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full" />
                             <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 font-black">Registration Center</span>
                        </span>
                        <br />
                        of <span className="text-slate-900 border-b-4 border-orange-500 pb-1">AEO & British Council</span>
                    </h2>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
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
                        
                        <div className="h-20 md:h-24 flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-500">
                            <img 
                                src="/british-council-logo.png" 
                                alt="British Council" 
                                className="h-full w-auto object-contain drop-shadow-sm rounded-lg scale-[1.7]" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/British_Council_logo.svg/512px-British_Council_logo.svg.png';
                                }}
                            />
                        </div>
                        
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-orange-200 shadow-sm">Platinum Partner</span>
                        </div>
                    </motion.div>

                    {/* AEO Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,165,0,0.08)] border-2 border-orange-50 flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="h-20 md:h-24 flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-500">
                            <img 
                                src="/aeo-logo.png" 
                                alt="AEO Pakistan" 
                                className="h-full w-auto object-contain drop-shadow-sm rounded-lg scale-[1.2]" 
                            />
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-orange-200 shadow-sm">Official Center</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Animated Student Registry */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 max-w-5xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">Live Student Registry</h3>
                    </div>
                    
                    <div className="relative overflow-hidden h-20 md:h-24 bg-white/50 backdrop-blur-sm rounded-[2rem] shadow-[0_10px_30px_rgba(255,165,0,0.05)] border border-orange-100 flex items-center">
                        <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
                        
                        <motion.div 
                            className="flex whitespace-nowrap items-center gap-6 px-4"
                            animate={{ x: [0, -1500] }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        >
                            {/* Duplicate array to create seamless loop */}
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex gap-6 items-center">
                                    {[
                                        { name: "Ali R.", center: "British Council", date: "Just now" },
                                        { name: "Sarah K.", center: "AEO Pakistan", date: "2 mins ago" },
                                        { name: "Usman A.", center: "British Council", date: "5 mins ago" },
                                        { name: "Fatima Z.", center: "AEO Pakistan", date: "8 mins ago" },
                                        { name: "Bilal M.", center: "British Council", date: "12 mins ago" },
                                        { name: "Ayesha S.", center: "AEO Pakistan", date: "15 mins ago" },
                                        { name: "Zainab N.", center: "British Council", date: "20 mins ago" },
                                        { name: "Omar F.", center: "AEO Pakistan", date: "25 mins ago" },
                                    ].map((student, idx) => (
                                        <div key={idx} className="flex flex-col justify-center bg-white px-6 py-3 md:py-4 rounded-2xl border border-orange-50 shadow-sm hover:border-orange-200 transition-colors">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-slate-800">{student.name}</span>
                                                <span className="text-slate-400 text-xs md:text-sm">registered for</span>
                                                <span className="font-black text-orange-500 text-sm md:text-base">{student.center}</span>
                                            </div>
                                            <span className="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-wider">{student.date}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PartnershipSection;
