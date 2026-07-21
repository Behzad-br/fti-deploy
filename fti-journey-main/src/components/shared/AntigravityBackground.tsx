import React from 'react';
import { motion } from 'framer-motion';

const AntigravityBackground = () => {
  // Generate random particles for the floating energy effect
  const particles = Array.from({ length: 60 });

  return (
    <div className="relative w-full h-screen bg-[#030303] overflow-hidden flex items-center justify-center">
      
      {/* Deep Space Background Gradient & Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a2e_0%,_#030303_100%)] z-0" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay z-0" />

      {/* Floating Energy Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((_, i) => {
          const size = Math.random() * 3 + 1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] mix-blend-screen"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 8, // 8-second seamless loop
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 8, // Staggered start 
              }}
            />
          );
        })}
      </div>

      {/* Subtle Magnetic Waves (Rings) */}
      <div className="absolute z-10 flex items-center justify-center w-full h-full perspective-[1000px]">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={`ring-${ring}`}
            className="absolute rounded-full border border-indigo-400/10 shadow-[0_0_30px_rgba(99,102,241,0.05)]"
            style={{
              width: `${ring * 25}vw`,
              height: `${ring * 25}vw`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: [60, 75, 60],
              rotateY: [0, 180, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8, // 8-second base loop
              repeat: Infinity,
              ease: "linear",
              delay: ring * 0.5
            }}
          />
        ))}
      </div>

      {/* The Central Elegant Luminous Orb */}
      <motion.div
        className="relative z-20 w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center"
        animate={{
          y: [-10, 10, -10],
          scale: [0.95, 1.02, 0.95],
        }}
        transition={{
          duration: 8, // 8-second seamless loop
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Core Brightness */}
        <div className="absolute inset-0 rounded-full bg-slate-100 opacity-90 shadow-[0_0_80px_#fff,0_0_120px_#818cf8,0_0_200px_#4f46e5] mix-blend-screen" />
        
        {/* Inner subtle gradient detailing */}
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-white via-indigo-100 to-transparent opacity-80 blur-[2px]" />
        
        {/* Orb breathing halo effect */}
        <motion.div 
          className="absolute -inset-10 rounded-full bg-indigo-400/20 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8, // Synced to 8 seconds
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Outer orbital rings (creating the 'magnetic' feel around the orb) */}
        <motion.div 
          className="absolute -inset-24 rounded-full border-[0.5px] border-indigo-300/30 blur-[1px] border-dashed"
          animate={{
            rotate: [0, 180, 360],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Clean UI Overlay Gradient (Ensures text placed over this will remain extremely readable) */}
      <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/40 via-transparent to-[#030303] pointer-events-none" />
    </div>
  );
};

export default AntigravityBackground;
