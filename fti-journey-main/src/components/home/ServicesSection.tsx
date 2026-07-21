import { ArrowRight, Globe, GraduationCap, FileCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';

const services = [
  {
    icon: Globe,
    title: 'Career Counselling',
    description: 'Expert guidance to choose the right country, university and program for your career goals.',
    link: '/services',
    color: 'from-orange-400 to-orange-300',
    shadow: 'shadow-orange-500/20'
  },
  {
    icon: GraduationCap,
    title: 'University Admissions',
    description: 'Complete application support from shortlisting to acceptance letter and documentation.',
    link: '/services',
    color: 'from-orange-500 to-orange-400',
    shadow: 'shadow-orange-500/20'
  },
  {
    icon: FileCheck,
    title: 'Visa Guidance',
    description: 'End-to-end visa documentation, mock interviews, and financial guidance for high success rates.',
    link: '/services',
    color: 'from-orange-400 to-amber-400',
    shadow: 'shadow-orange-500/20'
  },
  {
    icon: BookOpen,
    title: 'IELTS / PTE Preparation',
    description: 'Professional training with modern facilities, experienced faculty, and proven study material.',
    link: '/ielts',
    color: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-500/20'
  },
];

const ServicesSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            We guide you through every step of your study abroad journey
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants} className="h-full">
              <Link
                to={service.link}
                className="group relative flex flex-col h-full bg-white rounded-2xl p-6 border border-orange-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Hover Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`} />
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-bl-full translate-x-16 -translate-y-16 transition-transform duration-700 group-hover:scale-[2] pointer-events-none`} />

                {/* Animated Floating Icon Container */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 rounded-xl`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-xl rounded-xl ${service.shadow} group-hover:opacity-40 transition-opacity duration-500`} />
                  <service.icon className={`w-8 h-8 relative z-10 text-orange-600 group-hover:scale-110 transition-transform duration-500`} />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm mb-10 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>

                <div className="flex items-center text-primary font-bold text-sm mt-auto absolute bottom-6 left-6">
                  <span className="relative overflow-hidden h-5 w-auto block">
                    <span className="block transform group-hover:-translate-y-full transition-transform duration-300">Explore Service</span>
                    <span className="absolute top-0 left-0 block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">Explore Service</span>
                  </span>
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
