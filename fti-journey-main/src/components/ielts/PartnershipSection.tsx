import { motion } from 'framer-motion';
import { Plane, ShieldCheck, UserCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PartnershipSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#faf9f6] py-24 lg:py-32">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-orange-200/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-slate-200/50 rounded-full blur-[140px] mix-blend-multiply" />
                {/* Dotted pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    
                    {/* Left/Top Content Area */}
                    <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">


                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6"
                        >
                            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 relative">
                                IELTS Registration
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span> <br/>
                            Centre
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg sm:text-xl text-slate-600 font-medium mb-10 max-w-xl"
                        >
                            Trusted registration support through AEO Pakistan and British Council.
                        </motion.p>

                        {/* CTA & Trust Points */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start gap-6 w-full"
                        >
                            <Link to="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-[0_8px_25px_rgba(15,23,42,0.25)] overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    Register for IELTS Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-10"
                        >
                            {[
                                { icon: ShieldCheck, text: "Secure Process" },
                                { icon: UserCheck, text: "Expert Guidance" },
                                { icon: Clock, text: "Fast Support" }
                            ].map((point, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <point.icon className="w-3.5 h-3.5" />
                                    </div>
                                    {point.text}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Illustration & Cards Area */}
                    <div className="lg:col-span-6 relative w-full h-[500px] lg:h-[600px] flex items-center justify-center lg:justify-end">
                        
                        {/* Curved Path Animation */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg className="w-full h-full absolute top-10 left-10 lg:left-20 opacity-40" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                                <motion.path 
                                    d="M 50 400 C 100 300, 200 100, 400 150 S 500 50, 450 0" 
                                    fill="transparent" 
                                    stroke="url(#orangeGradient)" 
                                    strokeWidth="4" 
                                    strokeDasharray="10 10"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                />
                                <defs>
                                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#f59e0b" />
                                    </linearGradient>
                                </defs>
                                {/* Animated Airplane */}
                                <motion.g
                                    animate={{ 
                                        offsetDistance: ["0%", "100%"]
                                    }}
                                    transition={{ 
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{ 
                                        offsetPath: "path('M 50 400 C 100 300, 200 100, 400 150 S 500 50, 450 0')",
                                        offsetRotate: "auto"
                                    }}
                                >
                                    <Plane className="w-8 h-8 text-orange-500 fill-orange-100" />
                                </motion.g>
                            </svg>
                        </div>



                        {/* Partner Cards */}
                        <div className="flex flex-col gap-6 z-30 relative w-full max-w-[320px] sm:max-w-[360px] mr-4 sm:mr-0">
                            {/* British Council */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-white flex items-center gap-5 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all group -translate-y-12 lg:-translate-y-20"
                            >
                                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-slate-50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-slate-100 group-hover:border-orange-200 transition-colors">
                                    <img 
                                        src="/british-council-logo.png" 
                                        alt="British Council" 
                                        className="w-full h-full object-contain scale-[1.4]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/British_Council_logo.svg/512px-British_Council_logo.svg.png';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">British Council</h4>
                                </div>
                            </motion.div>

                            {/* AEO Pakistan */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-white flex items-center gap-5 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all lg:ml-12 group"
                            >
                                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-slate-50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-slate-100 group-hover:border-orange-200 transition-colors">
                                    <img 
                                        src="/aeo-logo.png" 
                                        alt="AEO Pakistan" 
                                        className="w-full h-full object-contain scale-[1.5]"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">AEO Pakistan</h4>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnershipSection;
