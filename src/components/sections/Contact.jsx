import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Zap, CheckCircle2, ChevronDown, Rocket, Lock } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inputClass =
  'w-full bg-[var(--bg-input)] border border-[var(--border-input)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm placeholder-[var(--text-placeholder)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all duration-200 shadow-sm';

const selectClass =
  'w-full bg-[var(--bg-input)] border border-[var(--border-input)] rounded-xl px-4 py-3 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all duration-200 appearance-none cursor-pointer shadow-sm';

const labelClass = 'text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block font-mono';

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
    </div>
  );
}

const infoItems = [
  {
    icon: Mail,
    color: '#FF5500',
    label: 'Email',
    value: 'tamilarasantamil1455@gmail.com',
    href: 'mailto:tamilarasantamil1455@gmail.com',
  },
  {
    icon: Phone,
    color: '#25D366',
    label: 'Phone / WhatsApp',
    value: '+91 86108 51455',
    href: 'tel:+918610851455',
    whatsappHref: 'https://wa.me/918610851455?text=Hello%20Nextify!%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss%20it%20with%20you.',
  },
  {
    icon: MapPin,
    color: '#FF0033',
    label: 'Location',
    value: 'Salem, Tamil Nadu, India',
    href: null,
  },
  {
    icon: Clock,
    color: '#FF8800',
    label: 'Working Hours',
    value: 'Mon – Sat · 9 AM – 7 PM',
    href: null,
  },
  {
    icon: Zap,
    color: '#E6002A',
    label: 'Response Time',
    value: 'Within 24 Hours',
    href: null,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Form field validation & trimming
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const service = formData.service;
    const timeline = formData.timeline;
    const message = formData.message.trim();

    if (!fullName || !email || !service || !message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Prevent duplicate submissions
    setSending(true);

    const templateParams = {
      from_name: fullName,
      from_email: email,
      phone: phone || 'N/A',
      service: service,
      timeline: timeline || 'Not specified',
      project_details: message,
      submitted_at: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are missing');
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSending(false);
      setSent(true);
      // Reset form after successful send
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        timeline: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS submit error:', error);
      setSending(false);
      setErrorMsg("We couldn't send your request right now. Please try again or contact us directly.");
    }
  };

  if (sent) {
    return (
      <section id="contact" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[110px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="section-num">05 — Contact</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-panel)] shadow-[var(--shadow-panel)] backdrop-blur-xl p-14 flex flex-col items-center justify-center text-center gap-6 max-w-xl mx-auto mt-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
            >
              <CheckCircle2 size={38} className="text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)]">
              Thank you for contacting <span className="text-gradient">NEXTIFY!</span>
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Your project enquiry has been sent successfully. We'll get back to you soon.
            </p>
            <motion.button
              onClick={() => {
                setSent(false);
                setErrorMsg('');
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--accent)]/40 text-[var(--accent-text)] hover:bg-[var(--accent)]/10 transition-all duration-200"
            >
              Submit Another Inquiry
            </motion.button>
          </motion.div>
          <div className="mt-24 pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-muted)] text-sm font-semibold">
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-3 flex-nowrap">
              <span className="text-gradient text-base font-bold tracking-wider leading-none">NEXTIFY</span>
            </div>
            <div className="flex gap-8 flex-1 justify-center">
              <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms &amp; Support</a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
            </div>
            <div className="flex-1 text-center sm:text-right font-semibold">&copy; {new Date().getFullYear()} NEXTIFY</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 md:px-12 relative overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[110px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="section-num">05 — Contact</div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-3 leading-tight text-[var(--heading-color)]">
          Contact <span className="text-gradient">Us</span>
        </h2>
        <p className="text-[var(--text-secondary)] mb-16 text-sm max-w-lg">
          Ready to bring your ideas to life? Tell us about your project, and we'll get back to you within 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Info Card ── */}
          <div className="contact-item lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-panel)] shadow-[var(--shadow-card)] backdrop-blur-xl p-7 flex flex-col gap-5 h-full">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-1">Contact Information</p>

              {infoItems.map(({ icon: Icon, color, label, value, href, whatsappHref }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                  >
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-0.5">{label}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium break-all">
                          {value}
                        </a>
                      ) : (
                        <span className="text-[var(--text-primary)] text-sm font-medium">{value}</span>
                      )}
                      {whatsappHref && (
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/30 transition-all duration-200"
                          title="Chat on WhatsApp"
                        >
                          <FaWhatsapp size={12} />
                          Chat
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-[var(--divider)] pt-4 mt-auto flex gap-3">
                <motion.a
                  href="https://instagram.com/_nextify._?obrf=MTFqeWY3aG42bXBmOQ%3D%3D"
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl border border-[var(--border-subtle)] bg-[var(--pill-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#FF5500] transition-colors duration-200"
                  title="Instagram @_nextify._"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </motion.a>
                <motion.a
                  href="https://wa.me/918610851455?text=Hello%20Nextify!%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss%20it%20with%20you."
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl border border-[var(--border-subtle)] bg-[var(--pill-bg)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#25D366] transition-colors duration-200"
                  title="WhatsApp (+91 86108 51455)"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-item lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-panel)] shadow-[var(--shadow-card)] backdrop-blur-xl p-8 md:p-10 flex flex-col gap-5">

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm leading-relaxed"
                >
                  {errorMsg}
                </motion.div>
              )}

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 2: Phone + Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone / WhatsApp (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>Service Required *</label>
                  <SelectWrapper>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled className="bg-[var(--bg-surface)] text-[var(--text-muted)]">Select a Service</option>
                      <option value="Web Development" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Web Development</option>
                      <option value="App Development" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">App Development</option>
                      <option value="AI & Agentic Solutions" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">AI & Agentic Solutions</option>
                      <option value="Video Editing" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Video Editing</option>
                      <option value="Graphic Design" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Graphic Design</option>
                    </select>
                  </SelectWrapper>
                </div>
              </div>

              {/* Row 3: Timeline */}
              <div>
                <label htmlFor="timeline" className={labelClass}>Expected Timeline (Optional)</label>
                <SelectWrapper>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="" disabled className="bg-[var(--bg-surface)] text-[var(--text-muted)]">Select Timeline</option>
                    <option value="Urgent (1–3 Days)" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Urgent (1–3 Days)</option>
                    <option value="Within 1 Week" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Within 1 Week</option>
                    <option value="Within 2 Weeks" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Within 2 Weeks</option>
                    <option value="Within 1 Month" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Within 1 Month</option>
                    <option value="Flexible" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Flexible</option>
                  </select>
                </SelectWrapper>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="message" className={labelClass}>Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? { scale: 1.02, boxShadow: '0 0 35px rgba(217,107,11,0.45)' } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}
                className="relative w-full mt-1 rounded-xl py-4 font-bold text-sm overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #FF7700 0%, #FF5500 40%, #FF0033 100%)',
                  color: '#ffffff',
                  boxShadow: '0 0 25px rgba(255,85,0,0.3)',
                }}
              >
                <AnimatePresence mode="wait">
                  {sending ? (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending Request...
                    </motion.span>
                  ) : (
                    <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-white">
                      <Rocket size={16} />
                      Request Free Quote
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[var(--divider)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-muted)] text-sm font-semibold">
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-3 flex-nowrap">
          <span className="text-gradient text-base font-bold tracking-wider leading-none">NEXTIFY</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 flex-1 justify-center">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms &amp; Support</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
          <a href="#admin" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100 text-xs font-mono">
            <Lock size={12} />
            Admin Panel
          </a>
        </div>
        <div className="flex-1 text-center sm:text-right font-semibold">&copy; {new Date().getFullYear()} NEXTIFY</div>
      </div>
    </section>
  );
}
