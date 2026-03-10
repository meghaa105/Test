/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Database, 
  Shield, 
  Search, 
  ArrowUpRight, 
  Github, 
  Mail, 
  MapPin,
  Award,
  Code2,
  BrainCircuit,
  Activity,
  ChevronRight
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const AnimatedAvatar = () => {
  const images = [
    "/IMG_2427.jpg",
    "https://picsum.photos/seed/megha-dev-2/600/800"
  ];
  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="relative group cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Decorative HUD Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-8 border border-dashed border-neon/20 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-12 border border-dotted border-neon/10 rounded-full pointer-events-none"
      />

      {/* Main Avatar Container */}
      <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-neon transition-all duration-500 shadow-[0_0_50px_rgba(0,255,159,0.1)] bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1, filter: "grayscale(100%) brightness(0.5)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: "grayscale(0%) brightness(1)",
              x: mousePos.x * 20,
              y: mousePos.y * 20
            }}
            exit={{ opacity: 0, scale: 0.9, filter: "grayscale(100%) brightness(0.5)" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0"
          >
            <img 
              src={images[index]} 
              alt="Megha Agarwal"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Glitch Overlay (Randomized) */}
            <motion.div 
              animate={{ 
                opacity: [0, 0.1, 0, 0.2, 0],
                x: [0, -2, 2, -1, 0],
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-neon mix-blend-overlay pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-neon shadow-[0_0_15px_#00ff9f] z-10 opacity-50 pointer-events-none"
        />

        {/* Vignette & Noise */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Identity Badge */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute -bottom-6 -right-6 bg-neon text-black px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-tighter shadow-[0_0_30px_rgba(0,255,159,0.4)] z-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-black animate-ping" />
          Verified // 0x42A
        </div>
      </motion.div>

      {/* Targeting Reticle (Follows Mouse) */}
      <motion.div 
        animate={{ 
          x: mousePos.x * 280 + 140,
          y: mousePos.y * 380 + 190
        }}
        className="absolute top-0 left-0 w-12 h-12 border border-neon/40 rounded-full pointer-events-none z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-1 h-1 bg-neon rounded-full" />
        <div className="absolute w-4 h-[1px] bg-neon/40" />
        <div className="absolute h-4 w-[1px] bg-neon/40" />
      </motion.div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, number }: { title: string, subtitle?: string, number: string }) => (
  <div className="mb-12 md:mb-20">
    <div className="flex items-baseline gap-4 mb-2">
      <span className="font-mono text-neon text-sm">{number}</span>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none">
        {title}
      </h2>
    </div>
    {subtitle && <p className="font-mono text-white/50 text-sm uppercase tracking-widest">{subtitle}</p>}
  </div>
);

const SkillMarquee = () => {
  const allSkills = [...RESUME_DATA.skills.genAI, ...RESUME_DATA.skills.languages, ...RESUME_DATA.skills.cloud];
  return (
    <div className="py-10 border-y border-white/10 overflow-hidden bg-surface/50">
      <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
        {[...allSkills, ...allSkills].map((skill, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-3xl md:text-5xl font-display uppercase text-white/20 hover:text-neon transition-colors cursor-default">
              {skill}
            </span>
            <Zap className="w-6 h-6 text-neon/30" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = ({ exp, index }: { exp: typeof RESUME_DATA.experience[0], index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative pl-8 pb-12 border-l border-white/10 last:pb-0"
  >
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-neon rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_#00FF00]" />
    <div className="mb-1">
      <span className="font-mono text-neon text-xs uppercase tracking-widest">{exp.period}</span>
    </div>
    <h3 className="text-2xl font-bold mb-1 group-hover:text-neon transition-colors">{exp.role}</h3>
    <p className="text-white/60 font-mono text-sm mb-4">{exp.company}</p>
    <ul className="space-y-2">
      {exp.highlights.map((h, i) => (
        <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
          <ChevronRight className="w-4 h-4 text-neon shrink-0 mt-1" />
          {h}
        </li>
      ))}
    </ul>
  </motion.div>
);

const TerminalConsole = () => {
  const [lines, setLines] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  const commands = [
    "Initializing system...",
    "Loading Megha.OS v4.0...",
    "Scanning distributed systems...",
    "89% performance gain detected.",
    "O(1) scalability achieved for 20k VMs.",
    "GenAI Agent 'Backie' online.",
    "Ready for intelligence-first operations."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < commands.length) {
        setLines(prev => [...prev, commands[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-black border border-white/10 rounded-lg overflow-hidden font-mono text-xs md:text-sm shadow-2xl">
      <div className="bg-white/5 px-4 py-2 border-bottom border-white/10 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-white/30 uppercase text-[10px]">megha@google-cloud: ~</span>
      </div>
      <div ref={consoleRef} className="p-6 h-64 overflow-y-auto space-y-2 scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-neon opacity-50">$</span>
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-white/80"
            >
              {line}
            </motion.span>
          </div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-neon inline-block ml-1"
        />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-neon selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-gradient from-neon/5 via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-2xl tracking-tighter"
        >
          MEGHA.OS
        </motion.div>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest hidden md:flex">
          <a href="#experience" className="hover:text-neon transition-colors">Experience</a>
          <a href="#skills" className="hover:text-neon transition-colors">Stack</a>
          <a href="#projects" className="hover:text-neon transition-colors">Projects</a>
          <a href="#contact" className="hover:text-neon transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-neon" />
            <span className="font-mono text-neon text-sm uppercase tracking-[0.3em]">Systems Architect</span>
          </div>
          
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center">
            <div>
              <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.85] uppercase tracking-tighter mb-8">
                Megha <br />
                <span className="text-neon text-glow">Agarwal</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-md">
                Software Engineer at <span className="text-white font-bold">Google</span>. 
                Bridging the gap between core backend reliability and the next generation of autonomous AI solutions.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center md:justify-end"
            >
              <AnimatedAvatar />
            </motion.div>
          </div>
            
            <div className="flex flex-col gap-4 items-start md:items-end">
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href={`mailto:${RESUME_DATA.email}`}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-neon hover:text-neon transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="#"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-neon hover:text-neon transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <MapPin className="w-3 h-3" />
                {RESUME_DATA.location}
              </div>
            </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-neon to-transparent" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">Scroll</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-20 py-20 bg-surface/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "DB Performance", value: "89%", sub: "Gain" },
            { label: "Daily Records", value: "520M", sub: "Processed" },
            { label: "VM Protection", value: "20K", sub: "In ~1s" },
            { label: "Escalations", value: "-45%", sub: "YoY Reduction" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-white/5 hover:border-neon/30 transition-colors group"
            >
              <div className="text-4xl md:text-6xl font-display text-white group-hover:text-neon transition-colors mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {stat.label} <span className="text-neon/50">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 md:px-20 py-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-20">
          <div>
            <SectionHeader title="Experience" subtitle="The Journey" number="01" />
            <TerminalConsole />
          </div>
          <div className="space-y-4">
            {RESUME_DATA.experience.map((exp, i) => (
              <div key={i}>
                <ExperienceCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section id="skills" className="py-20">
        <SkillMarquee />
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 md:px-20 py-32 max-w-7xl mx-auto">
        <SectionHeader title="Intelligence" subtitle="Selected Projects" number="02" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {RESUME_DATA.projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-surface p-8 md:p-12 border border-white/10 hover:border-neon transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 group-hover:text-neon transition-all">
                <BrainCircuit className="w-20 h-20" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-neon/10 rounded-lg">
                    <Activity className="w-6 h-6 text-neon" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-neon transition-colors" />
                </div>
                
                <h3 className="text-3xl font-display uppercase mb-4 tracking-tight">{project.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(',').map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Awards Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group bg-neon p-8 md:p-12 border border-neon transition-all flex flex-col justify-between"
          >
            <div>
              <Award className="w-12 h-12 text-black mb-8" />
              <h3 className="text-3xl font-display uppercase text-black mb-6 tracking-tight">Recognition</h3>
              <ul className="space-y-3">
                {RESUME_DATA.awards.map((award, i) => (
                  <li key={i} className="flex gap-3 text-black/80 text-sm font-medium">
                    <Zap className="w-4 h-4 shrink-0 mt-1" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 font-mono text-[10px] uppercase tracking-widest text-black/40">
              Verified @ Google Scale
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section className="px-6 md:px-20 py-32 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Toolkit" subtitle="System Capabilities" number="03" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "GenAI Stack", icon: <BrainCircuit />, items: RESUME_DATA.skills.genAI },
              { title: "Cloud & Data", icon: <Database />, items: RESUME_DATA.skills.cloud },
              { title: "Languages", icon: <Code2 />, items: RESUME_DATA.skills.languages }
            ].map((box, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neon border border-white/10">
                    {box.icon}
                  </div>
                  <h4 className="font-mono text-sm uppercase tracking-widest">{box.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {box.items.map((item, j) => (
                    <span key={j} className="px-3 py-1 border border-white/10 text-xs text-white/60 font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="px-6 md:px-20 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] mb-12">
              Let's build <br />
              <span className="text-neon">Intelligence.</span>
            </h2>
            <div className="flex flex-wrap gap-8">
              <a href={`mailto:${RESUME_DATA.email}`} className="group flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon group-hover:text-neon transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Email Me</div>
                  <div className="text-xl font-medium">{RESUME_DATA.email}</div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] mb-4">System Status</div>
            <div className="flex items-center justify-end gap-2 text-neon text-sm font-mono">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              OPERATIONAL
            </div>
            <div className="mt-8 text-white/20 font-mono text-[10px]">
              © {new Date().getFullYear()} MEGHA AGARWAL. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
