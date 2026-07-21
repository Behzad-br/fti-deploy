import { useEffect, useRef, useState } from 'react';
import { Users, Award, Clock, BookOpen, Briefcase, ListChecks, FileText, GraduationCap, Plane, HeartHandshake } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const features = [
  {
    icon: Briefcase,
    title: 'Career Counselling',
    text: 'Personalized guidance to align your career goals with the right global opportunities.',
    color: 'bg-blue-500/10 text-blue-500',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]'
  },
  {
    icon: ListChecks,
    title: 'University Selection',
    text: 'Curated list of universities based on your profile, budget, and preferences.',
    color: 'bg-emerald-500/10 text-emerald-500',
    shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]'
  },
  {
    icon: BookOpen,
    title: 'Program Selection',
    text: 'Expert advice to choose the perfect academic program for your future.',
    color: 'bg-orange-500/10 text-orange-500',
    shadow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]'
  },
  {
    icon: GraduationCap,
    title: 'Scholarship Assistance',
    text: 'Help finding and applying for scholarships to reduce your financial burden.',
    color: 'bg-purple-500/10 text-purple-500',
    shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]'
  },
  {
    icon: FileText,
    title: 'Visa Application',
    text: 'End-to-end support for visa documentation ensuring high success rates.',
    color: 'bg-rose-500/10 text-rose-500',
    shadow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]'
  },
  {
    icon: Users,
    title: 'Interview Preparation',
    text: 'Comprehensive mock sessions to prepare you for university and visa interviews.',
    color: 'bg-amber-500/10 text-amber-500',
    shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]'
  }
];

const stats = [
  { icon: Users, value: 11000, suffix: '+', label: 'Students Guided' },
  { icon: Award, value: 90, suffix: '%', label: 'Visa Success Rate' },
  { icon: Clock, value: 20, suffix: '+', label: 'Years Experience' },
  { icon: BookOpen, value: 10000, suffix: '+', label: 'Test Prep Batches' },
];

const useCountUp = (target: number, duration = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [startCounting, target, duration]);

  return count;
};

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(stat.value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted = stat.value >= 1000
    ? count.toLocaleString()
    : count.toString();

  return (
    <div ref={ref} className="text-center group hover:transform hover:scale-105 transition-all duration-500">
      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors relative">
        <div className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-white relative z-10" />
      </div>
      <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 flex justify-center items-center tracking-tight">
        {formatted}{stat.suffix}
      </div>
      <div className="text-white/80 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
    </div>
  );
};

// Component for drawing flight paths
const FlightPath = ({ pathId, d, delay }: { pathId: string, d: string, delay: number }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-orange-500" style={{ zIndex: 0 }}>
    <motion.path
      id={pathId}
      d={d}
      fill="none"
      strokeWidth="2.5"
      strokeDasharray="4 4"
      className="opacity-70"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 4, ease: "easeInOut", delay: delay }}
    />
    {/* Main animated dot moving along the path */}
    <circle r="7" fill="#FF6B2C" style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,44,1)) drop-shadow(0 0 16px rgba(255,107,44,0.8))' }}>
      <animateMotion dur="6s" repeatCount="indefinite" path={d} />
    </circle>
    {/* Glowing outer ring */}
    <circle r="12" fill="rgba(255,107,44,0.3)">
      <animateMotion dur="6s" repeatCount="indefinite" path={d} />
    </circle>
    {/* Pulsing halo */}
    <circle r="18" fill="rgba(255,107,44,0.1)">
      <animateMotion dur="6s" repeatCount="indefinite" path={d} begin="0.05s" />
    </circle>
  </svg>
)

const MapPin = ({ x, y, icon, name, delay }: { x: number, y: number, icon: string, name: string, delay: number }) => (
  <motion.div
    className="absolute flex flex-col items-center justify-center pointer-events-auto"
    style={{ left: x, top: y, x: '-50%', y: '-50%' }}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay, duration: 0.5, type: "spring" }}
  >
    <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-orange-200 flex items-center justify-center text-lg z-10 mb-1">
      {icon}
    </div>
    <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-gray-700 uppercase tracking-wider">
      {name}
    </div>
  </motion.div>
)

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      className="feature-card h-full relative z-10"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="group p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 hover:border-primary/30 transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(255,107,44,0.15)] h-full overflow-hidden relative">

        {/* Hover Background Sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Floating Icon Container */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 relative z-10`}
        >
          {/* Glowing Shadow Behind Icon */}
          <div className={`absolute inset-0 rounded-2xl bg-current opacity-10`} />
          <div className={`absolute inset-0 rounded-2xl ${feature.shadow} opacity-40 blur-lg group-hover:opacity-100 transition-opacity duration-500`} />

          <feature.icon className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed relative z-10">
          {feature.text}
        </p>
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  return (
    <section className="py-32 relative overflow-hidden bg-[#fafafa]">

      {/* --- World Map & Flight Paths Background --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden opacity-100 select-none">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full max-w-[1400px] h-[800px] mt-20"
        >
          {/* Subtle World Map Image / SVG (Using a high quality generic map pattern) */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-60 grayscale" />

          {/* Animated Connecting Flight Lines overlapping the map */}
          {/* Curved path 1: Asia to North America */}
          <FlightPath pathId="path1" d="M 1000 300 Q 800 100 300 350" delay={0.2} />
          {/* Curved path 2: Asia to Europe */}
          <FlightPath pathId="path2" d="M 950 350 Q 750 200 650 300" delay={0.5} />
          {/* Curved path 3: Europe to Australia */}
          <FlightPath pathId="path3" d="M 650 300 Q 800 500 1150 600" delay={0.8} />
          {/* Curved path 4: North America to Europe */}
          <FlightPath pathId="path4" d="M 300 350 Q 500 150 650 300" delay={1.1} />

          {/* Country Location Pins */}
          <MapPin x={300} y={350} icon="🗼" name="Toronto" delay={1.2} />
          <MapPin x={650} y={300} icon="🏛️" name="London" delay={1.4} />
          <MapPin x={950} y={350} icon="🕌" name="Dubai" delay={1.6} />
          <MapPin x={1000} y={300} icon="🏯" name="Beijing" delay={1.8} />
          <MapPin x={1150} y={600} icon="🎭" name="Sydney" delay={2.0} />

        </motion.div>
      </div>
      {/* ------------------------------------------- */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 relative"
        >

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Why Choose <br /> <span className="text-[#f15a24]">FTI Consultants</span>
          </h2>

        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 relative"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <FeatureCard feature={feature} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-[2rem] overflow-hidden shadow-2xl"
        >
          {/* Deep vibrant gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-500" />

          {/* Premium noise texture overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/noise.svg')" }} />

          {/* Animated subtle shapes inside the stats banner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-yellow-300/10 rounded-full blur-[60px]"
          />

          <div className="relative z-10 p-6 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
