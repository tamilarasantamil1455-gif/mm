import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/layout/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Overview from './components/sections/Overview';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import AdminPanel from './components/admin/AdminPanel';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.pathname === '/admin')
  );

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminOpen(true);
      }
    };

    const handleKeyDown = (e) => {
      // Ctrl+Shift+A or Cmd+Shift+A toggles Admin Panel
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname || '/');
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ProjectsProvider>
      <LoadingScreen onComplete={() => setLoading(false)} />
      
      {isAdminOpen ? (
        <AdminPanel onClose={handleCloseAdmin} />
      ) : (
        <div
          className="relative bg-[var(--bg-base)] min-h-screen text-[var(--text-primary)] transition-colors duration-300 overflow-hidden"
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          <Navbar />
        
          <main>
            <Hero />
            <About />
            <Overview />
            <Skills />
            <Projects />
            <Services />
            <Contact />
          </main>
        </div>
      )}
    </ProjectsProvider>
  );
}

export default App;

