import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, LayoutTemplate, Palette, Video, Share2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Website Development',
    description: 'We build modern, responsive, and user-friendly websites for businesses, startups, and personal brands. Every website is designed to deliver a clean experience across all devices.',
    icon: Globe,
    cta: 'Contact Our Team',
    color: '#FF5500',
    features: ['Responsive Design', 'Modern UI', 'Mobile Friendly', 'Contact Form', 'Fast Loading', 'Cross-Browser Support'],
  },
  {
    title: 'Landing Page Development',
    description: 'Professional landing pages designed to showcase your business, product, or service with a clean and engaging user experience.',
    icon: LayoutTemplate,
    cta: 'Contact Our Team',
    color: '#FF0033',
    features: ['Responsive Layout', 'Modern Design', 'Fast Loading', 'Contact Form', 'Call-to-Action Sections'],
  },
  {
    title: 'Graphic Design',
    description: 'Creative and professional designs that strengthen your brand identity and help your business stand out online.',
    icon: Palette,
    cta: 'Contact Our Team',
    color: '#FF8800',
    features: ['Logo Design', 'Brand Identity', 'Poster Design', 'Social Media Creatives', 'Banner Design'],
  },
  {
    title: 'Video Editing',
    description: 'Professional video editing for businesses and creators, delivering engaging content for social media and marketing.',
    icon: Video,
    cta: 'Contact Our Team',
    color: '#E6002A',
    features: ['Trending Reels Editing', 'Long-form Video Editing', 'YouTube Shorts', 'Promotional Videos', 'Subtitle & Caption Editing'],
  },
  {
    title: 'Social Media Design',
    description: 'Professional social media designs that help businesses maintain a consistent and attractive online presence.',
    icon: Share2,
    cta: 'Contact Our Team',
    color: '#FF3300',
    features: ['Instagram Posts', 'Story Design', 'Facebook Banners', 'Promotional Creatives', 'Event Posters'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="section-num justify-end">04 — Services</div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-right leading-tight text-[var(--heading-color)]">
          What We <span className="text-gradient">Offer</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-right mb-16 text-sm max-w-md ml-auto">
          Premium digital services tailored to help your business stand out online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="service-card relative flex flex-col p-7 group overflow-hidden cursor-default rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-panel)] backdrop-blur-xl"
                style={{
                  boxShadow: 'var(--shadow-card)',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 30px 70px -15px ${service.color}35`,
                  borderColor: `${service.color}40`,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                {/* Top color accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }}
                />

                {/* Ambient glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{ background: service.color }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}18`,
                    border: `1px solid ${service.color}35`,
                    boxShadow: `0 0 20px ${service.color}20`,
                  }}
                >
                  <Icon style={{ color: service.color }} className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug">{service.title}</h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 flex-1 font-normal">{service.description}</p>

                {/* Feature list */}
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-[var(--divider)] pt-5">
                  {/* CTA */}
                  <a
                    href="#contact"
                    className="group/btn flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    {service.cta}
                    <ArrowRight
                      size={13}
                      className="group-hover/btn:translate-x-1 transition-transform duration-200"
                      style={{ color: service.color }}
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
