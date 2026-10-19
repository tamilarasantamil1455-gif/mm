import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwd-text',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden bg-[#050507]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.p
          className="text-[11px] font-mono tracking-[0.35em] uppercase text-primary font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Overview
        </motion.p>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white mb-10 wwd-text uppercase">
          WHAT WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7700] via-[#FF4500] to-[#FF0033]">DO</span>
        </h2>

        <div className="max-w-4xl space-y-8">
          <p className="wwd-text text-gray-300 text-base md:text-lg leading-[1.9] font-light">
            At <span className="text-primary font-medium">SYNEX</span>, we help businesses, startups, and creators establish a strong digital presence through modern technology and creative design.
          </p>
          <p className="wwd-text text-gray-400 text-sm md:text-base leading-[1.9] font-light">
            We specialize in responsive website development, UI/UX design, graphic design, and video editing—creating digital solutions that are fast, visually engaging, and tailored to each client's goals.
          </p>
          <p className="wwd-text text-gray-400 text-sm md:text-base leading-[1.9] font-light">
            Every project we build focuses on quality, performance, user experience, and long-term value, ensuring your brand stands out in today's digital world.
          </p>
        </div>
      </div>
    </section>
  );
}
