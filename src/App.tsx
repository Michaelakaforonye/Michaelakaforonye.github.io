import { useEffect, useRef, useState } from 'react';

// ─── Download-package file listing ───────────────────────────────────────────
const FILES = [
  {
    name: 'index.html',
    desc: 'The complete portfolio website — open directly in any browser',
    icon: 'fa-file-code',
    color: '#22d3ee',
    path: '/portfolio-download/index.html',
  },
  {
    name: 'images/your-photo.jpg',
    desc: 'Replace this with your own profile photo (180×180 px, circular)',
    icon: 'fa-image',
    color: '#a855f7',
    path: null,
  },
  {
    name: 'images/project1.jpg',
    desc: 'Screenshot placeholder for Project Card 1 (800×400 px recommended)',
    icon: 'fa-image',
    color: '#3b82f6',
    path: null,
  },
  {
    name: 'images/project2.jpg',
    desc: 'Screenshot placeholder for Project Card 2 (800×400 px recommended)',
    icon: 'fa-image',
    color: '#3b82f6',
    path: null,
  },
  {
    name: 'README.md',
    desc: 'Full guide: edit content, add projects, host online',
    icon: 'fa-book-open',
    color: '#22c55e',
    path: '/portfolio-download/README.md',
  },
  {
    name: 'QUICK-START.txt',
    desc: 'Get up and running in under 5 minutes',
    icon: 'fa-bolt',
    color: '#facc15',
    path: '/portfolio-download/QUICK-START.txt',
  },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    sectionsRef.current = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionsRef.current.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  const resetForm = () => setFormSubmitted(false);

  const navLinks = [
    { href: '#intro', label: 'Welcome' },
    { href: '#about', label: 'About Me' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-family: 'Inter', sans-serif; }
        body { background: #020617; color: #e2e8f0; min-height: 100vh; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 3px; }

        /* ── SIDEBAR ── */
        #sidebar {
          position: fixed; top: 0; left: 0; height: 100%; width: 256px;
          background: linear-gradient(180deg, #0f172a, #1e293b, #0f172a);
          z-index: 40; display: flex; flex-direction: column; justify-content: center;
          box-shadow: 4px 0 30px rgba(0,0,0,0.5);
          transition: transform 0.3s;
        }
        #sidebar::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7);
        }
        #sidebar::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #a855f7, #3b82f6, #22d3ee);
        }
        .sidebar-brand { padding: 0 2rem; margin-bottom: 2.5rem; }
        .sidebar-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: #22d3ee; font-weight: 600; margin-bottom: 4px; }
        .sidebar-name { color: #fff; font-weight: 700; font-size: 1.1rem; line-height: 1.3; }
        .sidebar-name span { color: #22d3ee; }
        .sidebar-role { color: #94a3b8; font-size: 0.75rem; margin-top: 4px; }
        #sidebar nav { padding: 0 1.5rem; flex: 1; }
        #sidebar nav ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        #sidebar nav a {
          display: block; padding: 0.75rem 1rem; border-radius: 0.5rem;
          color: #cbd5e1; font-size: 0.875rem; font-weight: 500; text-decoration: none;
          transition: all 0.2s;
        }
        #sidebar nav a:hover, #sidebar nav a.active {
          background: rgba(34,211,238,0.1); color: #22d3ee;
          border-left: 2px solid #22d3ee;
        }
        .sidebar-socials { padding: 0 2rem 2rem; display: flex; gap: 1rem; }
        .sidebar-socials a { color: #64748b; font-size: 1.1rem; text-decoration: none; transition: color 0.2s; }
        .sidebar-socials a:hover { color: #22d3ee; }

        #hamburger {
          display: none; position: fixed; top: 1rem; left: 1rem; z-index: 50;
          background: rgba(30,41,59,0.9); color: #fff; border: none; cursor: pointer;
          padding: 0.75rem; border-radius: 0.5rem; font-size: 1.1rem; backdrop-filter: blur(8px);
        }
        #overlay {
          display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 30;
        }
        #overlay.open { display: block; }

        main { margin-left: 256px; }

        /* ── HERO ── */
        #intro {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          background: #020617;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(2,6,23,0.87), rgba(15,23,42,0.78), rgba(8,47,73,0.72));
        }
        .hero-grid {
          position: absolute; inset: 0; opacity: 0.08;
          background-image: linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-orb1 {
          position: absolute; top: 25%; left: 25%;
          width: 384px; height: 384px; background: rgba(6,182,212,0.08);
          border-radius: 50%; filter: blur(60px);
          animation: pulse 3s ease-in-out infinite;
        }
        .hero-orb2 {
          position: absolute; bottom: 25%; right: 25%;
          width: 320px; height: 320px; background: rgba(37,99,235,0.08);
          border-radius: 50%; filter: blur(60px);
          animation: pulse 3s ease-in-out 1s infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .hero-content { position: relative; z-index: 10; text-align: center; padding: 1.5rem; max-width: 56rem; }
        .hero-tag { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; color: #22d3ee; font-weight: 600; margin-bottom: 1rem; }
        .hero-name { font-size: clamp(3rem, 8vw, 5rem); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 1rem; }
        .hero-name span { background: linear-gradient(90deg, #22d3ee, #60a5fa, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-divider { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .hero-line { height: 1px; width: 3rem; background: rgba(34,211,238,0.6); }
        .hero-subtitle { color: #cbd5e1; font-size: 1.1rem; font-weight: 500; }
        .hero-desc { color: #94a3b8; font-size: 1rem; max-width: 40rem; margin: 0 auto 2.5rem; line-height: 1.7; }
        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-primary {
          padding: 0.875rem 2rem; background: linear-gradient(90deg, #06b6d4, #2563eb);
          color: #fff; font-weight: 600; border-radius: 0.5rem; text-decoration: none;
          transition: all 0.2s; box-shadow: 0 0 20px rgba(6,182,212,0.3);
          display: inline-block;
        }
        .btn-primary:hover { background: linear-gradient(90deg, #22d3ee, #3b82f6); transform: translateY(-2px); box-shadow: 0 0 30px rgba(6,182,212,0.5); }
        .btn-outline {
          padding: 0.875rem 2rem; border: 1px solid rgba(6,182,212,0.5);
          color: #22d3ee; font-weight: 600; border-radius: 0.5rem; text-decoration: none;
          transition: all 0.2s; display: inline-block;
        }
        .btn-outline:hover { background: rgba(6,182,212,0.1); transform: translateY(-2px); }
        .scroll-indicator {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          color: rgba(34,211,238,0.6); font-size: 1.2rem;
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }

        /* ── SECTIONS COMMON ── */
        section { padding: 6rem 1.5rem; }
        .section-inner { max-width: 72rem; margin: 0 auto; }
        .section-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.3em; color: #22d3ee; font-weight: 600; margin-bottom: 0.5rem; text-align: center; }
        .section-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #fff; text-align: center; }
        .section-line { width: 4rem; height: 4px; border-radius: 9999px; background: linear-gradient(90deg, #22d3ee, #2563eb); margin: 0.75rem auto 0; }
        .section-desc { color: #94a3b8; text-align: center; max-width: 40rem; margin: 1rem auto 0; line-height: 1.7; }
        .section-head { margin-bottom: 3.5rem; }

        /* ── ABOUT ── */
        #about { background: #0f172a; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        .about-text p { color: #cbd5e1; font-size: 1rem; line-height: 1.75; margin-bottom: 1.25rem; }
        .about-text p span { color: #22d3ee; font-weight: 600; }
        .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2rem; }
        .tag { padding: 0.375rem 0.75rem; font-size: 0.7rem; font-weight: 600; color: #67e8f9; background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.3); border-radius: 9999px; }

        /* ── ABOUT PHOTO ── */
        .about-photo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .about-photo {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid rgba(34,211,238,0.5);
          box-shadow: 0 0 30px rgba(6,182,212,0.25), 0 8px 32px rgba(0,0,0,0.4);
          display: block;
          background: rgba(30,41,59,0.6);
        }

        .edu-title { color: #fff; font-weight: 700; font-size: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .edu-title i { color: #22d3ee; }
        .edu-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem; transition: border-color 0.2s; }
        .edu-card:hover { border-color: rgba(6,182,212,0.4); }
        .edu-card-inner { display: flex; gap: 1rem; align-items: flex-start; }
        .edu-icon { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; background: linear-gradient(135deg, rgba(6,182,212,0.2), rgba(37,99,235,0.2)); border: 1px solid rgba(6,182,212,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .edu-icon i { color: #22d3ee; font-size: 0.875rem; }
        .edu-degree { color: #fff; font-weight: 600; font-size: 0.875rem; line-height: 1.4; }
        .edu-inst { color: #22d3ee; font-size: 0.75rem; margin-top: 2px; font-weight: 500; }
        .edu-period { color: #64748b; font-size: 0.7rem; margin-top: 4px; }

        /* ── EXPERIENCE ── */
        #experience { background: #020617; }
        .timeline { position: relative; }
        .timeline::before {
          content: ''; position: absolute; left: 50%; transform: translateX(-50%);
          top: 0; bottom: 0; width: 1px;
          background: linear-gradient(180deg, rgba(6,182,212,0.5), rgba(37,99,235,0.3), transparent);
        }
        .timeline-item { position: relative; display: flex; gap: 2rem; margin-bottom: 2.5rem; }
        .timeline-item:nth-child(even) { flex-direction: row-reverse; }
        .exp-card { width: calc(50% - 2rem); background: rgba(30,41,59,0.7); border: 1px solid rgba(51,65,85,0.5); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
        .exp-card:hover { border-color: rgba(6,182,212,0.4); transform: translateY(-4px); }
        .exp-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exp-icon-wrap { width: 3rem; height: 3rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .exp-icon-wrap i { color: #fff; font-size: 1.1rem; }
        .exp-role { color: #fff; font-weight: 700; font-size: 0.9rem; line-height: 1.3; }
        .exp-company { color: #22d3ee; font-size: 0.875rem; font-weight: 600; }
        .exp-meta { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.75rem; color: #94a3b8; }
        .exp-meta span { display: flex; align-items: center; gap: 4px; }
        .exp-meta i { color: #06b6d4; }
        .exp-points { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .exp-points li { display: flex; gap: 0.5rem; color: #cbd5e1; font-size: 0.875rem; line-height: 1.6; }
        .exp-points li .chevron { color: #22d3ee; flex-shrink: 0; margin-top: 4px; font-size: 0.7rem; }
        .timeline-dot { width: 4rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .timeline-dot-inner { width: 1rem; height: 1rem; border-radius: 50%; background: linear-gradient(135deg, #22d3ee, #2563eb); box-shadow: 0 0 15px rgba(6,182,212,0.5); outline: 4px solid #020617; }
        .timeline-spacer { width: calc(50% - 2rem); }

        /* ── SKILLS ── */
        #skills { background: #0f172a; }
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .skill-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; }
        .skill-card:hover { border-color: rgba(6,182,212,0.4); transform: translateY(-8px); box-shadow: 0 20px 40px rgba(6,182,212,0.1); }
        .skill-icon { width: 3.5rem; height: 3.5rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: transform 0.3s; }
        .skill-card:hover .skill-icon { transform: scale(1.1); }
        .skill-icon i { color: #fff; font-size: 1.5rem; }
        .skill-title { color: #fff; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; transition: color 0.2s; }
        .skill-card:hover .skill-title { color: #22d3ee; }
        .skill-desc { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; }
        .competencies { margin-top: 3.5rem; background: rgba(30,41,59,0.4); border: 1px solid rgba(51,65,85,0.4); border-radius: 1rem; padding: 2rem; }
        .competencies h3 { color: #fff; font-weight: 700; font-size: 1.1rem; text-align: center; margin-bottom: 1.5rem; }
        .comp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .comp-item { display: flex; align-items: center; gap: 0.75rem; background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.4); border-radius: 0.75rem; padding: 1rem; }
        .comp-item span { color: #cbd5e1; font-size: 0.875rem; font-weight: 500; }

        /* ── PROJECTS ── */
        #projects { background: #020617; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .project-card {
          background: rgba(30,41,59,0.7);
          border: 1px solid rgba(51,65,85,0.5);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          border-color: rgba(6,182,212,0.4);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(6,182,212,0.12);
        }
        .project-img-link {
          display: block;
          overflow: hidden;
          position: relative;
        }
        .project-img-link::after {
          content: '\f35d';
          font-family: 'Font Awesome 6 Free';
          font-weight: 900;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #fff;
          background: rgba(6,182,212,0.0);
          transition: background 0.3s, opacity 0.3s;
          opacity: 0;
        }
        .project-card:hover .project-img-link::after {
          background: rgba(2,6,23,0.55);
          opacity: 1;
        }
        .project-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s;
          background: rgba(15,23,42,0.8);
        }
        .project-card:hover .project-img {
          transform: scale(1.05);
        }
        .project-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .project-title {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 0.625rem;
          transition: color 0.2s;
        }
        .project-card:hover .project-title { color: #22d3ee; }
        .project-desc {
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.65;
          margin-bottom: 1.25rem;
          flex: 1;
        }
        .project-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(51,65,85,0.5);
        }
        .project-tags-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .project-tag {
          padding: 0.25rem 0.6rem;
          font-size: 0.65rem;
          font-weight: 600;
          color: #67e8f9;
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.3);
          border-radius: 9999px;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #22d3ee;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          padding: 0.4rem 0.9rem;
          border: 1px solid rgba(34,211,238,0.4);
          border-radius: 0.4rem;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .project-link:hover {
          background: rgba(34,211,238,0.1);
          border-color: #22d3ee;
          transform: translateY(-1px);
        }

        /* ── CONTACT ── */
        #contact { background: #0f172a; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .form-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 1rem; padding: 2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.65rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
        .form-group input, .form-group textarea {
          width: 100%; background: rgba(51,65,85,0.5); border: 1px solid rgba(71,85,105,0.5);
          color: #fff; border-radius: 0.5rem; padding: 0.75rem 1rem; font-size: 0.875rem;
          font-family: 'Inter', sans-serif; transition: all 0.2s; outline: none;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { color: #475569; }
        .form-group input:focus, .form-group textarea:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.15); }
        .form-group textarea { resize: none; }
        .contact-info { display: flex; flex-direction: column; gap: 1rem; }
        .contact-card { display: flex; gap: 1rem; background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 0.75rem; padding: 1.25rem; transition: border-color 0.2s; }
        .contact-card:hover { border-color: rgba(6,182,212,0.4); }
        .contact-icon { width: 3rem; height: 3rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .contact-icon i { color: #fff; }
        .contact-label { font-size: 0.65rem; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
        .contact-value { color: #e2e8f0; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: color 0.2s; }
        .contact-value:hover { color: #22d3ee; }
        .social-card { background: rgba(30,41,59,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 0.75rem; padding: 1.25rem; }
        .social-label { font-size: 0.65rem; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .social-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .social-link { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(51,65,85,0.5); border: 1px solid rgba(71,85,105,0.5); border-radius: 0.5rem; color: #cbd5e1; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.2s; }
        .social-link:hover { background: rgba(71,85,105,0.7); color: #fff; }

        /* ── FOOTER ── */
        footer { background: #0f172a; border-top: 1px solid #1e293b; padding: 2rem 1.5rem; }
        .footer-inner { max-width: 72rem; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .footer-copy { color: #475569; font-size: 0.875rem; }
        .footer-role { color: #334155; font-size: 0.75rem; }

        /* ── GRADIENT HELPERS ── */
        .g-green  { background: linear-gradient(135deg, #22c55e, #059669); }
        .g-blue   { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .g-yellow { background: linear-gradient(135deg, #facc15, #ca8a04); }
        .g-orange { background: linear-gradient(135deg, #fb923c, #ea580c); }
        .g-purple { background: linear-gradient(135deg, #a855f7, #7c3aed); }
        .g-cyan   { background: linear-gradient(135deg, #06b6d4, #0d9488); }
        .g-blue2  { background: linear-gradient(135deg, #3b82f6, #06b6d4); }
        .g-teal   { background: linear-gradient(135deg, #14b8a6, #22c55e); }
        .g-violet { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .text-purple { color: #a855f7; }
        .text-green  { color: #22c55e; }
        .text-blue   { color: #3b82f6; }
        .text-orange { color: #fb923c; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          #sidebar { transform: translateX(-100%); }
          #sidebar.open { transform: translateX(0); }
          #hamburger { display: block; }
          main { margin-left: 0; }
          .about-grid, .contact-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .comp-grid { grid-template-columns: 1fr 1fr; }
          .timeline::before { display: none; }
          .timeline-item, .timeline-item:nth-child(even) { flex-direction: column; }
          .exp-card { width: 100%; }
          .timeline-dot, .timeline-spacer { display: none; }
          .form-row { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; }
          .comp-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HAMBURGER ── */}
      <button id="hamburger" onClick={toggleSidebar}>
        <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* ── OVERLAY ── */}
      <div id="overlay" className={sidebarOpen ? 'open' : ''} onClick={closeSidebar}></div>

      {/* ── SIDEBAR ── */}
      <aside id="sidebar" className={sidebarOpen ? 'open' : ''}>
        <div className="sidebar-brand">
          <p className="sidebar-label">Portfolio</p>
          <h2 className="sidebar-name">Akaforonye<br /><span>Michael</span></h2>
          <p className="sidebar-role">Data Analyst</p>
        </div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                  onClick={closeSidebar}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-socials">
          <a href="https://github.com/Rolandakason" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://x.com/Rolandakason" target="_blank" rel="noreferrer"><i className="fab fa-x-twitter"></i></a>
          <a href="mailto:ucheson2003@gmail.com"><i className="fas fa-envelope"></i></a>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main>

        {/* ── HERO ── */}
        <section id="intro">
          <div className="hero-overlay"></div>
          <div className="hero-grid"></div>
          <div className="hero-orb1"></div>
          <div className="hero-orb2"></div>
          <div className="hero-content">
            <p className="hero-tag">Welcome to my portfolio</p>
            <h1 className="hero-name">Akaforonye<br /><span>Michael</span></h1>
            <div className="hero-divider">
              <div className="hero-line"></div>
              <p className="hero-subtitle">Data Analyst &nbsp;|&nbsp; Petroleum Engineer</p>
              <div className="hero-line"></div>
            </div>
            <p className="hero-desc">Transforming complex data into clear, actionable insights. Skilled in Excel, SQL, Python &amp; Power BI.</p>
            <div className="hero-btns">
              <a href="#about" className="btn-primary">Learn More <i className="fas fa-arrow-down"></i></a>
              <a href="#contact" className="btn-outline">Get In Touch <i className="fas fa-envelope"></i></a>
            </div>
          </div>
          <div className="scroll-indicator"><i className="fas fa-chevron-down"></i></div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about">
          <div className="section-inner">
            <div className="section-head">
              <p className="section-label">01 / About Me</p>
              <h2 className="section-title">Who I Am</h2>
              <div className="section-line"></div>
            </div>
            <div className="about-grid">
              {/* Left column: photo + bio text + tags */}
              <div className="about-text">
                {/* ── PHOTO ── */}
                <div className="about-photo-wrap">
                  <img
                    src="path/to/your-photo.jpg"
                    alt="Akaforonye Michael"
                    className="about-photo"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(37,99,235,0.15))';
                      t.style.border = '3px solid rgba(34,211,238,0.4)';
                    }}
                  />
                </div>
                <p>I am a <span>Data Analyst</span> with a background in <span>Petroleum Engineering</span> and hands-on experience analysing structured datasets using Excel, SQL, Python, and Power BI.</p>
                <p>Experienced in data cleaning, exploratory analysis, and dashboard development to find trends and improve business performance. I combine strong analytical thinking with attention to detail to provide accurate and meaningful data solutions.</p>
                <p>Good at turning complex data into clear, actionable insights that help with strategic decisions — bridging the gap between raw numbers and business value.</p>
                <div className="tags">
                  <span className="tag">Excel</span>
                  <span className="tag">SQL</span>
                  <span className="tag">Python</span>
                  <span className="tag">Power BI</span>
                  <span className="tag">Data Cleaning</span>
                  <span className="tag">EDA</span>
                  <span className="tag">KPI Dashboards</span>
                </div>
              </div>

              {/* Right column: education */}
              <div>
                <p className="edu-title"><i className="fas fa-graduation-cap"></i> Education</p>
                <div className="edu-card">
                  <div className="edu-card-inner">
                    <div className="edu-icon"><i className="fas fa-graduation-cap"></i></div>
                    <div>
                      <p className="edu-degree">Bachelor of Engineering – Petroleum Engineering</p>
                      <p className="edu-inst">Federal University of Technology Owerri (FUTO)</p>
                      <p className="edu-period"><i className="fas fa-calendar-alt"></i> Jan 2020 – Jul 2025</p>
                    </div>
                  </div>
                </div>
                <div className="edu-card">
                  <div className="edu-card-inner">
                    <div className="edu-icon"><i className="fas fa-laptop-code"></i></div>
                    <div>
                      <p className="edu-degree">Data Analytics Training Programme</p>
                      <p className="edu-inst">TSA Academy</p>
                      <p className="edu-period"><i className="fas fa-calendar-alt"></i> Nov 2025 – Feb 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience">
          <div className="section-inner">
            <div className="section-head">
              <p className="section-label">02 / Experience</p>
              <h2 className="section-title">My Journey</h2>
              <div className="section-line"></div>
            </div>
            <div className="timeline">

              <div className="timeline-item">
                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-icon-wrap g-blue2"><i className="fas fa-chart-pie"></i></div>
                    <div>
                      <p className="exp-role">Data Analyst Trainee</p>
                      <p className="exp-company">TSA Academy</p>
                    </div>
                  </div>
                  <div className="exp-meta">
                    <span><i className="fas fa-calendar"></i> Nov 2025 – Mar 2026</span>
                    <span><i className="fas fa-map-marker-alt"></i> Nigeria</span>
                  </div>
                  <ul className="exp-points">
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Cleaned and transformed raw datasets to improve accuracy and usability for analysis.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Analysed structured datasets with Excel and Python to identify trends and support data-driven decisions.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Wrote SQL queries to extract, filter, and aggregate data from relational databases.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Created interactive Power BI dashboards to track KPIs including revenue, profit, and customer performance.</li>
                  </ul>
                </div>
                <div className="timeline-dot"><div className="timeline-dot-inner"></div></div>
                <div className="timeline-spacer"></div>
              </div>

              <div className="timeline-item">
                <div className="exp-card">
                  <div className="exp-header">
                    <div className="exp-icon-wrap g-teal"><i className="fas fa-flask"></i></div>
                    <div>
                      <p className="exp-role">Terminal Chemist Intern</p>
                      <p className="exp-company">Menj Oil Limited</p>
                    </div>
                  </div>
                  <div className="exp-meta">
                    <span><i className="fas fa-calendar"></i> Jan 2024 – Jul 2024</span>
                    <span><i className="fas fa-map-marker-alt"></i> Lagos, Nigeria</span>
                  </div>
                  <ul className="exp-points">
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Performed testing of petroleum products including density, flash point, and distillation.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Carried out sampling operations and ensured compliance with quality and safety standards.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Participated in petroleum product sampling from storage tanks and cargo vessels using zone samplers.</li>
                    <li><span className="chevron"><i className="fas fa-chevron-right"></i></span> Maintained accurate data recording and reporting of laboratory results.</li>
                  </ul>
                </div>
                <div className="timeline-dot"><div className="timeline-dot-inner"></div></div>
                <div className="timeline-spacer"></div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills">
          <div className="section-inner">
            <div className="section-head">
              <p className="section-label">03 / Skills</p>
              <h2 className="section-title">What I Do</h2>
              <div className="section-line"></div>
              <p className="section-desc">A blend of data analytics tools and petroleum engineering expertise that powers my problem-solving approach.</p>
            </div>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon g-green"><i className="fas fa-file-excel"></i></div>
                <h3 className="skill-title">Microsoft Excel</h3>
                <p className="skill-desc">Advanced data manipulation, pivot tables, VLOOKUP, and statistical analysis for business reporting.</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon g-blue"><i className="fas fa-database"></i></div>
                <h3 className="skill-title">SQL</h3>
                <p className="skill-desc">Writing complex queries to extract, filter, join, and aggregate data from relational databases.</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon g-yellow"><i className="fab fa-python"></i></div>
                <h3 className="skill-title">Python</h3>
                <p className="skill-desc">Data cleaning, exploratory analysis, and automation using Pandas, NumPy, and Matplotlib.</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon g-orange"><i className="fas fa-chart-bar"></i></div>
                <h3 className="skill-title">Power BI</h3>
                <p className="skill-desc">Building interactive dashboards to track KPIs like revenue, profit, and customer performance.</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon g-purple"><i className="fas fa-chart-line"></i></div>
                <h3 className="skill-title">Data Visualization</h3>
                <p className="skill-desc">Creating clear, informative charts and reports that communicate insights to non-technical teams.</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon g-cyan"><i className="fas fa-oil-well"></i></div>
                <h3 className="skill-title">Petroleum Engineering</h3>
                <p className="skill-desc">Laboratory testing, product sampling, quality compliance, and operational data recording.</p>
              </div>
            </div>
            <div className="competencies">
              <h3>Core Competencies</h3>
              <div className="comp-grid">
                <div className="comp-item"><i className="fas fa-brain text-purple" style={{ fontSize: '1.2rem' }}></i><span>Analytical Thinking</span></div>
                <div className="comp-item"><i className="fas fa-comments text-green" style={{ fontSize: '1.2rem' }}></i><span>Communication Skills</span></div>
                <div className="comp-item"><i className="fas fa-chart-pie text-blue" style={{ fontSize: '1.2rem' }}></i><span>Statistical Knowledge</span></div>
                <div className="comp-item"><i className="fas fa-robot text-orange" style={{ fontSize: '1.2rem' }}></i><span>Automation &amp; Scripting</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div className="section-inner">
            <div className="section-head">
              <p className="section-label">04 / Projects</p>
              <h2 className="section-title">My Work</h2>
              <div className="section-line"></div>
              <p className="section-desc">A selection of data analytics projects showcasing my skills in analysis, visualisation, and storytelling with data.</p>
            </div>

            <div className="projects-grid">

              {/* ── PROJECT CARD 1 ── */}
              <div className="project-card">
                <a href="#" target="_blank" rel="noreferrer" className="project-img-link">
                  <img
                    src="path/to/project-image.jpg"
                    alt="Sales Performance Dashboard"
                    className="project-img"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(37,99,235,0.15))';
                      t.style.height = '200px';
                    }}
                  />
                </a>
                <div className="project-body">
                  <h3 className="project-title">Sales Performance Dashboard</h3>
                  <p className="project-desc">
                    An interactive Power BI dashboard analysing sales revenue, profit margins, and customer performance
                    across multiple regions. Built using cleaned transactional data with DAX measures for dynamic KPI tracking.
                  </p>
                  <div className="project-footer">
                    <div className="project-tags-row">
                      <span className="project-tag">Power BI</span>
                      <span className="project-tag">DAX</span>
                      <span className="project-tag">Excel</span>
                    </div>
                    <a href="#" target="_blank" rel="noreferrer" className="project-link">
                      View Project <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* ── PROJECT CARD 2 ── */}
              <div className="project-card">
                <a href="#" target="_blank" rel="noreferrer" className="project-img-link">
                  <img
                    src="path/to/project-image.jpg"
                    alt="Customer Churn Analysis"
                    className="project-img"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.background = 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(37,99,235,0.15))';
                      t.style.height = '200px';
                    }}
                  />
                </a>
                <div className="project-body">
                  <h3 className="project-title">Customer Churn Analysis</h3>
                  <p className="project-desc">
                    A Python-based exploratory data analysis project identifying key drivers of customer churn for a
                    telecommunications dataset. Leveraged Pandas, Matplotlib, and Seaborn to uncover actionable retention insights.
                  </p>
                  <div className="project-footer">
                    <div className="project-tags-row">
                      <span className="project-tag">Python</span>
                      <span className="project-tag">Pandas</span>
                      <span className="project-tag">Matplotlib</span>
                    </div>
                    <a href="#" target="_blank" rel="noreferrer" className="project-link">
                      View Project <i className="fas fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <div className="section-inner">
            <div className="section-head">
              <p className="section-label">05 / Contact</p>
              <h2 className="section-title">Get In Touch</h2>
              <div className="section-line"></div>
              <p className="section-desc">Have a project in mind or want to discuss data opportunities? Feel free to reach out — I'd love to connect!</p>
            </div>
            <div className="contact-grid">

              {/* Contact Form */}
              <div className="form-card">
                {!formSubmitted ? (
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows={6} placeholder="Tell me about your project or opportunity..." required></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '1rem' }}
                    >
                      Send Message <i className="fas fa-paper-plane"></i>
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <i className="fas fa-check" style={{ color: '#22c55e', fontSize: '1.5rem' }}></i>
                    </div>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: '#94a3b8' }}>Thank you for reaching out. I'll get back to you soon.</p>
                    <button
                      onClick={resetForm}
                      style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', textDecoration: 'underline', fontFamily: "'Inter', sans-serif" }}
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-icon g-violet"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <p className="contact-label">Address</p>
                    <p className="contact-value">New-site, Community Rd, Satellite Town, Lagos</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon g-blue2"><i className="fas fa-envelope"></i></div>
                  <div>
                    <p className="contact-label">Email</p>
                    <a href="mailto:ucheson2003@gmail.com" className="contact-value">ucheson2003@gmail.com</a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon g-teal"><i className="fas fa-phone"></i></div>
                  <div>
                    <p className="contact-label">Phone</p>
                    <a href="tel:+2348164032654" className="contact-value">+234 8164032654</a>
                  </div>
                </div>
                <div className="social-card">
                  <p className="social-label">Social Profiles</p>
                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/akaforonyemichael/" target="_blank" rel="noreferrer" className="social-link"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    <a href="https://x.com/Rolandakason" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-x-twitter"></i> Twitter/X</a>
                    <a href="https://github.com/Rolandakason" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-github"></i> GitHub</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Akaforonye Michael. All rights reserved.</p>
          <p className="footer-role">Data Analyst &nbsp;|&nbsp; Petroleum Engineering Background</p>
        </div>

        {/* ── DOWNLOAD PANEL TOGGLE ── */}
        <div style={{ maxWidth: '72rem', margin: '1.5rem auto 0', padding: '0' }}>
          <button
            onClick={() => setShowDownload(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.3)',
              color: '#22d3ee', padding: '0.6rem 1.25rem', borderRadius: '0.5rem',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.825rem',
              fontWeight: 600, transition: 'all 0.2s', width: '100%', justifyContent: 'center',
            }}
          >
            <i className={`fas ${showDownload ? 'fa-chevron-up' : 'fa-download'}`}></i>
            {showDownload ? 'Hide Download Package' : '⬇ Download Source Package'}
          </button>

          {showDownload && (
            <div style={{
              marginTop: '1rem', background: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(34,211,238,0.25)', borderRadius: '1rem',
              padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  background: 'linear-gradient(90deg,rgba(6,182,212,0.15),rgba(37,99,235,0.15))',
                  border: '1px solid rgba(6,182,212,0.3)', borderRadius: '9999px',
                  padding: '0.35rem 1rem', marginBottom: '1rem',
                }}>
                  <i className="fas fa-box-open" style={{ color: '#22d3ee', fontSize: '0.8rem' }}></i>
                  <span style={{ color: '#22d3ee', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Download Package
                  </span>
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Your Portfolio · Source Files
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.6 }}>
                  Pure HTML / CSS / JS — no build tools required. Open <code style={{ color: '#22d3ee', background: 'rgba(6,182,212,0.1)', padding: '1px 6px', borderRadius: '4px' }}>index.html</code> in
                  any browser, or drag the folder onto Netlify to go live in seconds.
                </p>
              </div>

              {/* File list */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {FILES.map(f => (
                  <div key={f.name} style={{
                    background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.5)',
                    borderRadius: '0.75rem', padding: '1rem',
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  }}>
                    <div style={{
                      width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', flexShrink: 0,
                      background: `${f.color}22`, border: `1px solid ${f.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`fas ${f.icon}`} style={{ color: f.color, fontSize: '0.875rem' }}></i>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.8rem', marginBottom: '3px', fontFamily: 'monospace' }}>
                        {f.name}
                      </p>
                      <p style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.5 }}>{f.desc}</p>
                      {f.path && (
                        <a href={f.path} target="_blank" rel="noreferrer"
                          style={{ color: '#22d3ee', fontSize: '0.7rem', fontWeight: 600, textDecoration: 'none', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          View file <i className="fas fa-external-link-alt" style={{ fontSize: '0.6rem' }}></i>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <a href="/portfolio-download/index.html" target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(90deg,#06b6d4,#2563eb)',
                    color: '#fff', fontWeight: 600, borderRadius: '0.5rem',
                    textDecoration: 'none', fontSize: '0.875rem',
                    boxShadow: '0 0 20px rgba(6,182,212,0.3)',
                  }}>
                  <i className="fas fa-eye"></i> Preview index.html
                </a>
                <a href="/portfolio-download/README.md" target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    border: '1px solid rgba(6,182,212,0.5)', color: '#22d3ee',
                    fontWeight: 600, borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem',
                  }}>
                  <i className="fas fa-book-open"></i> Read README.md
                </a>
              </div>

              {/* How-to steps */}
              <div style={{
                background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: '0.75rem', padding: '1.25rem',
              }}>
                <p style={{ color: '#22d3ee', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.875rem' }}>
                  <i className="fas fa-rocket" style={{ marginRight: '0.4rem' }}></i>How to use this package
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.625rem' }}>
                  {[
                    ['1', 'Save the files', 'Click "View file" above and save index.html + the images/ folder to your computer'],
                    ['2', 'Add your photo', 'Put your photo in images/your-photo.jpg'],
                    ['3', 'Edit content', 'Open index.html in VS Code and search for "EDIT:" comments'],
                    ['4', 'Go live free', 'Drag the folder to netlify.com — live in 30 seconds'],
                  ].map(([num, title, desc]) => (
                    <div key={num} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '1.5rem', height: '1.5rem', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg,#22d3ee,#2563eb)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                      }}>{num}</div>
                      <div>
                        <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.775rem', marginBottom: '2px' }}>{title}</p>
                        <p style={{ color: '#64748b', fontSize: '0.725rem', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
