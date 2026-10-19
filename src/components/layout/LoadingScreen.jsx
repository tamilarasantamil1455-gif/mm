import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#06080F]"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#FF8C00]/20 via-[#0A1628]/30 to-transparent blur-[100px] pointer-events-none" />

          {/* Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-4 z-10"
          >
            {/* NEXTIFY Brand Title */}
            <div className="flex items-center gap-1 mt-2">
              {'NEXTIFY'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="text-4xl md:text-5xl font-display font-extrabold tracking-wider leading-none"
                  style={{
                    background: i < 3
                      ? `linear-gradient(135deg, #FF8C00, #FF6B00)`
                      : `linear-gradient(135deg, #1B3A5C, #0A1628)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: i < 3
                      ? 'drop-shadow(0 0 12px rgba(255, 140, 0, 0.5))'
                      : 'drop-shadow(0 0 12px rgba(10, 22, 40, 0.8))',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Dot loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex gap-2 mt-8 z-10"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#0A1628]"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
