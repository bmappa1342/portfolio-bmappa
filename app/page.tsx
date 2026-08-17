"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Menu, X, Code2, Smartphone,
  Database, Server, Send,
  MapPin, Phone, Mail, Briefcase, GraduationCap, Download,
  Globe, ExternalLink, ChevronRight,
  Loader2, CheckCircle, AlertCircle
} from "lucide-react";

// --- ICÔNES SVG PERSONNALISÉES ---
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- COMPOSANTS PREMIUM ---
const RevealText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mr-2 md:mr-3"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useSpring(0, { stiffness: 400, damping: 40 });
  const y = useSpring(0, { stiffness: 400, damping: 40 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = event.clientX - rect.left - rect.width / 2;
    const yPos = event.clientY - rect.top - rect.height / 2;
    x.set(xPos / 15);
    y.set(yPos / 15);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d" }}
      className="h-full w-full perspective-1000"
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full relative">
        {children}
      </div>
    </motion.div>
  );
};

// --- DICTIONNAIRE DE TRADUCTIONS COMPLET ---
type Language = 'fr' | 'en';

const DICTIONARY = {
  fr: {
    nav: { home: "Accueil", experience: "Parcours", projects: "Projets", contact: "Contact" },
    hero: {
      location: "Basé à Dakar, Sénégal",
      role: "Ingénieur Logiciel Fullstack",
      description: "Ingénieur logiciel bilingue doté d'une forte expertise en architecture backend (Symfony, CodeIgniter, Node.js) et en développement frontend interactif (Vue.js, React). Je fiabilise les écosystèmes complexes et instaure des processus de qualité rigoureux.",
      btnExperience: "Voir mon parcours",
      btnCV: "Télécharger mon CV",
      btnContact: "Me contacter"
    },
    skills: {
      backend: "PHP, Symfony, Laravel, Node.js, Spring Boot",
      frontend: "Vue.js, React.js, Angular, Tailwind, Next.js",
      mobile: "Flutter",
      data: "SQL, PostgreSQL, Looker, Docker, Postman"
    },
    experienceSection: {
      titlePrefix: "Mon ",
      titleHighlight: "Parcours",
      subtitle: "Plusieurs années d'expérience dans la conception d'infrastructures robustes.",
      diplomaTitle: "Master 2 Professionnel en Génie Logiciel",
      diplomaSchool: "Institut Supérieur d'Informatique (ISI) - Dakar (2018-2023)",
      diplomaDesc: "Spécialisations: Architecture Systèmes, Sécurité (SI), Intelligence Artificielle (IA) et Bases de Données.",
      experiences: [
        {
          id: 1, role: "Ingénieur de Conception & Fullstack", company: "Smartphone-ID.com", period: "Septembre 2024 - Présent",
          description: "Stabilisation de l'infrastructure Back-Office (Symfony/CodeIgniter), développement d'interfaces Front-end (Vue.js), requêtage SQL performant, création de Dashboards Looker et automatisation QA."
        },
        {
          id: 2, role: "Ingénieur Conception", company: "Smartphone-ID", period: "Avril 2024 - Septembre 2024",
          description: "Audits complets de qualité du code, restructuration d'architecture logicielle, gestion de la sécurité inter-serveurs et rédaction de documentation technique exhaustive des APIs."
        },
        {
          id: 3, role: "Ingénieur Développeur & Designer", company: "Smartphone-ID", period: "Mai 2023 - Avril 2024",
          description: "Pilotage de la migration de CodeIgniter vers Symfony. Création et optimisation SEO sous WordPress. Développement de modules Frontend réactifs pour l'application photo."
        },
        {
          id: 4, role: "Stagiaire Ingénieur Conception", company: "SOSEN-AFRICA", period: "Décembre 2021 - Septembre 2022",
          description: "Conception de la solution de portefeuille électronique 'CRONE'. Logique Back-Office (Laravel, Python/Odoo) et programmation mobile multiplateforme (Xamarin/C#)."
        }
      ]
    },
    projectSection: {
      titlePrefix: "Mes ",
      titleHighlight: "Projets Techniques",
      subtitle: "Un aperçu de mes réalisations majeures en architecture logicielle.",
      githubBtn: "Voir sur GitHub →",
      projects: [
        {
          id: 6, 
          title: "LiquidUI - Dashboard Analytique IA", 
          tech: ["Next.js", "React", "Tailwind CSS", "NextAuth"], 
          link: "#", 
          github: "https://github.com/bmappa1342/liquid-ui-poc", 
          description: "Conception d'une plateforme SaaS de Business Intelligence (BI) générant des tableaux de bord dynamiques via des requêtes en langage naturel (IA). Intégration de NextAuth, gestion d'équipe (RBAC), import CSV et génération de clés API."
        },
        {
          id: 4, 
          title: "Gestion de Stock SaaS", 
          tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"], 
          link: "#", 
          github: "https://github.com/bmappa1342/Gestion-stock-don",
          description: "Développement d'une application SaaS professionnelle dédiée à la gestion de stock et de dons. Architecture fortement typée pour garantir la fiabilité des données logistiques et la scalabilité du système."
        },
        {
          id: 5, 
          title: "Portfolio Interactif", 
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], 
          link: "#", 
          github: "https://github.com/bmappa1342/portfolio-bmappa",
          description: "Conception et développement de mon portfolio de développeur Fullstack (ce site). Interface moderne, animations fluides au défilement et design responsive orienté expérience utilisateur (UX/UI)."
        },
        {
          id: 3, 
          title: "Système d'APIs RESTful", 
          tech: ["Node.js", "Express", "MongoDB", "Postman"], 
          link: "#", 
          github: "https://github.com/bmappa1342/CrudNodejsVuejs",
          description: "Création d'une architecture MVC performante. Implémentation de la gestion des livres (CRUD) et mise en place de tests unitaires automatisés via Postman."
        }
      ]
    },
    contactSection: {
      titlePrefix: "Travaillons ",
      titleHighlight: "Ensemble",
      subtitle: "Je suis ouvert aux nouvelles opportunités et collaborations.",
      labels: { phone: "Téléphone", location: "Localisation" },
      form: {
        nameLabel: "Nom complet", namePlaceholder: "Votre nom",
        emailLabel: "Adresse Email", emailPlaceholder: "vous@exemple.com",
        messageLabel: "Votre message", messagePlaceholder: "Comment puis-je vous aider ?",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé !",
        error: "Erreur lors de l'envoi"
      }
    },
    footer: "Construit avec Next.js & Tailwind CSS."
  },
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", contact: "Contact" },
    hero: {
      location: "Based in Dakar, Senegal",
      role: "Fullstack Software Engineer",
      description: "Bilingual software engineer with strong expertise in backend architecture (Symfony, CodeIgniter, Node.js) and interactive frontend development (Vue.js, React). I secure complex ecosystems and implement rigorous quality processes.",
      btnExperience: "View my journey",
      btnCV: "Download my Resume",
      btnContact: "Contact me"
    },
    skills: {
      backend: "PHP, Symfony, Laravel, Node.js, Spring Boot",
      frontend: "Vue.js, React.js, Angular, Tailwind",
      mobile: "Flutter",
      data: "SQL, PostgreSQL, Looker, Airtable, Monday Crm, Docker, Postman"
    },
    experienceSection: {
      titlePrefix: "My ",
      titleHighlight: "Experience",
      subtitle: "Several years of experience designing robust infrastructures.",
      diplomaTitle: "Master's Degree in Software Engineering",
      diplomaSchool: "Higher Institute of Computer Science (ISI) - Dakar (2018-2023)",
      diplomaDesc: "Specializations: Systems Architecture, IT Security, Artificial Intelligence (AI), and Databases.",
      experiences: [
        {
          id: 1, role: "Design & Fullstack Engineer", company: "Smartphone-ID.com", period: "September 2024 - Present",
          description: "Stabilized the Back-Office infrastructure (Symfony/CodeIgniter), developed Front-end interfaces (Vue.js), optimized SQL querying, created Looker Dashboards, and automated QA."
        },
        {
          id: 2, role: "Design Engineer", company: "Smartphone-ID", period: "April 2024 - September 2024",
          description: "Conducted comprehensive code quality audits, restructured software architecture, managed cross-server security, and drafted extensive technical API documentation."
        },
        {
          id: 3, role: "Developer & Designer Engineer", company: "Smartphone-ID", period: "May 2023 - April 2024",
          description: "Led the migration from CodeIgniter to Symfony. Created and optimized SEO on WordPress. Developed reactive Frontend modules for the photo application."
        },
        {
          id: 4, role: "Design Engineer Intern", company: "SOSEN-AFRICA", period: "December 2021 - September 2022",
          description: "Designed the 'CRONE' electronic wallet solution. Back-Office logic (Laravel, Python/Odoo) and cross-platform mobile programming (Xamarin/C#)."
        }
      ]
    },
    projectSection: {
      titlePrefix: "My ",
      titleHighlight: "Technical Projects",
      subtitle: "An overview of my major achievements in software architecture.",
      githubBtn: "View on GitHub →",
      projects: [
        {
          id: 6, 
          title: "LiquidUI - AI Analytics Dashboard", 
          tech: ["Next.js", "React", "Tailwind CSS", "NextAuth"], 
          link: "#", 
          github: "https://github.com/bmappa1342/liquid-ui-poc", 
          description: "Designed an AI-powered Business Intelligence (BI) SaaS platform that generates dynamic dashboards through natural language queries. Features include NextAuth, team role management (RBAC), CSV imports, and API key generation."
        },
        {
          id: 4, 
          title: "SaaS Inventory Management", 
          tech: ["TypeScript", "React", "Next.js", "Tailwind CSS"], 
          link: "#", 
          github: "https://github.com/bmappa1342/Gestion-stock-don",
          description: "Developed a professional SaaS application dedicated to inventory and donation management. Strongly typed architecture to ensure logistics data reliability and system scalability."
        },
        {
          id: 5, 
          title: "Interactive Portfolio", 
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], 
          link: "#", 
          github: "https://github.com/bmappa1342/portfolio-bmappa",
          description: "Design and development of my Fullstack developer portfolio (this site). Modern interface, smooth scroll animations, and UX/UI-oriented responsive design."
        },
        {
          id: 3, 
          title: "RESTful API System", 
          tech: ["Node.js", "Express", "MongoDB", "Postman"], 
          link: "#", 
          github: "https://github.com/bmappa1342/CrudNodejsVuejs",
          description: "Created a high-performance MVC architecture. Implemented book management (CRUD) and automated unit testing via Postman."
        }
      ]
    },
    contactSection: {
      titlePrefix: "Let's Work ",
      titleHighlight: "Together",
      subtitle: "I am open to new opportunities and collaborations.",
      labels: { phone: "Phone", location: "Location" },
      form: {
        nameLabel: "Full Name", namePlaceholder: "Your name",
        emailLabel: "Email Address", emailPlaceholder: "you@example.com",
        messageLabel: "Your message", messagePlaceholder: "How can I help you?",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent!",
        error: "Failed to send"
      }
    },
    footer: "Built with Next.js & Tailwind CSS."
  }
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('fr');
  const t = DICTIONARY[lang];

  // SCROLL PROGRESS
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // PARALLAX EFFECTS
  const { scrollY } = useScroll();
  const yParallax1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yParallax2 = useTransform(scrollY, [0, 1000], [0, 150]);

  // --- GESTION DU FORMULAIRE VIA JSON ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xgawnjaw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset(); 
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("Erreur Formspree :", errorData);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Erreur de requête :", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#050505] text-slate-50 min-h-screen font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 z-[60] origin-left" style={{ scaleX }} />

      {/* BACKGROUND GRID (Tech Style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "top-2 px-4" : "top-0 px-0"}`}>
        <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 ${isScrolled ? "bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-3 shadow-2xl shadow-black/50" : "bg-transparent py-6"}`}>
          <div className="flex items-center justify-between">
            <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity z-10 relative">
              B.<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">MAPPA</span>
            </a>

            <div className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
              {['home', 'experience', 'projects', 'contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item === 'experience' ? 'parcours' : item}`} 
                  onClick={(e) => scrollToSection(e, `#${item === 'experience' ? 'parcours' : item}`)}
                  className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </a>
              ))}
            </div>
              
            <div className="hidden md:flex items-center space-x-4 pl-4">
              <a href="https://github.com/bmappa1342" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com/in/bertrand-mappa" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:bg-white/10 border border-white/10 transition-all">
                <LinkedinIcon size={18} />
              </a>
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full border border-white/10 transition-all">
                <Globe size={14} /> {lang.toUpperCase()}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-xs font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {lang.toUpperCase()}
              </button>
              <button className="text-slate-300 p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute w-full top-full left-0"
            >
              <div className="flex flex-col space-y-4 p-6">
                {['home', 'experience', 'projects', 'contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item === 'experience' ? 'parcours' : item}`}
                    onClick={(e) => scrollToSection(e, `#${item === 'experience' ? 'parcours' : item}`)} 
                    className="text-lg text-slate-300 hover:text-white font-medium"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center min-h-[90vh]">
        {/* Parallax Blobs */}
        <motion.div style={{ y: yParallax1 }} className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
        <motion.div style={{ y: yParallax2 }} className="absolute bottom-[10%] right-[10%] w-[35rem] h-[35rem] bg-emerald-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center justify-center">
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm font-medium text-slate-200 mb-10 shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            {t.hero.location}
          </motion.div>
            
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter mb-6 leading-[1.05] flex flex-col items-center">
            <RevealText text="Bertrand Rene" className="justify-center" />
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-400 mt-2 block">
              MAPPA.
            </motion.span>
          </h1>
            
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl md:text-3xl font-medium text-slate-400 mb-8 max-w-3xl">
            {t.hero.role}
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed">
            {t.hero.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#parcours" onClick={(e) => scrollToSection(e, "#parcours")} className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.hero.btnExperience} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href={lang === 'en' ? "/CV_Bertrand_MAPPA_EN.pdf" : "/CV_Bertrand_MAPPA.pdf"} download className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <Download size={18} /> {t.hero.btnCV}
            </a>
          </motion.div>

          {/* SKILLS GRIDS */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full text-left">
            {[
              { icon: Server, title: "Backend", desc: t.skills.backend, color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Code2, title: "Frontend", desc: t.skills.frontend, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Smartphone, title: "Mobile", desc: t.skills.mobile, color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: Database, title: "Data & DevOps", desc: t.skills.data, color: "text-pink-400", bg: "bg-pink-500/10" }
            ].map((skill, idx) => (
              <div key={idx} className="group flex flex-col items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-colors backdrop-blur-sm">
                <div className={`p-3 rounded-2xl ${skill.bg} ${skill.color} group-hover:scale-110 transition-transform`}>
                  <skill.icon size={24} />
                </div>
                <div>
                  <span className="block font-bold text-slate-200 mb-1">{skill.title}</span>
                  <span className="text-sm text-slate-500 leading-snug block">{skill.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PARCOURS SECTION --- */}
      <section id="parcours" className="py-24 relative z-10 bg-[#020202]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.experienceSection.titlePrefix}<span className="text-emerald-400">{t.experienceSection.titleHighlight}</span></h2>
            <p className="text-slate-400 text-lg">{t.experienceSection.subtitle}</p>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-3 md:ml-0 md:pl-8 space-y-12">
            {t.experienceSection.experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="absolute -left-[41px] md:-left-[41px] top-1 h-5 w-5 rounded-full border-4 border-[#020202] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                
                <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl hover:bg-white/[0.04] transition-colors group">
                  <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase mb-2 block">{exp.period}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-slate-400 mb-4 font-medium">
                    <Briefcase size={18} className="text-slate-500" />
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
            
          {/* Diplôme */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mt-16 bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-white/10 text-blue-300 rounded-2xl shrink-0">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{t.experienceSection.diplomaTitle}</h3>
                <p className="text-blue-300 font-medium mb-2">{t.experienceSection.diplomaSchool}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{t.experienceSection.diplomaDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.projectSection.titlePrefix}<span className="text-blue-400">{t.projectSection.titleHighlight}</span></h2>
              <p className="text-slate-400 text-lg max-w-2xl">{t.projectSection.subtitle}</p>
            </div>
            <a href="https://github.com/bmappa1342" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group">
              {t.projectSection.githubBtn} <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {t.projectSection.projects.map((project) => (
              <TiltCard key={project.id}>
                <div className="group relative h-full min-h-[350px] rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col p-8 hover:border-blue-500/50 transition-colors backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-20 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                        <Code2 size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full z-30">
                        <GithubIcon size={20} />
                      </a>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed flex-grow mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-black/40 border border-white/10 text-xs font-semibold rounded-lg text-slate-300 backdrop-blur-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 relative overflow-hidden bg-[#020202] border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contactSection.titlePrefix}<span className="text-emerald-400">{t.contactSection.titleHighlight}</span></h2>
            <p className="text-slate-400 text-lg">{t.contactSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:mappabertrand@gmail.com" className="text-lg text-white hover:text-blue-400 font-medium transition-colors break-all">mappabertrand@gmail.com</a>
                </div>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">{t.contactSection.labels.phone}</p>
                  <a href="tel:+221774148870" className="text-lg text-white hover:text-emerald-400 font-medium transition-colors">+221 77 414 88 70</a>
                </div>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">{t.contactSection.labels.location}</p>
                  <p className="text-lg text-white font-medium">Dakar, Sénégal</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">{t.contactSection.form.nameLabel}</label>
                    <input type="text" name="nom" required className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder={t.contactSection.form.namePlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">{t.contactSection.form.emailLabel}</label>
                    <input type="email" name="email" required className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder={t.contactSection.form.emailPlaceholder} />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">{t.contactSection.form.messageLabel}</label>
                  <textarea rows={5} name="message" required className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none" placeholder={t.contactSection.form.messagePlaceholder}></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full flex items-center justify-center gap-3 font-bold text-lg rounded-2xl px-6 py-5 transition-all duration-300 ${
                    submitStatus === 'success' ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' :
                    submitStatus === 'error' ? 'bg-red-500 text-white' :
                    'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-[0.98]'
                  } disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={20} className="animate-spin" /> {t.contactSection.form.sending}</>
                  ) : submitStatus === 'success' ? (
                    <><CheckCircle size={20} /> {t.contactSection.form.success}</>
                  ) : submitStatus === 'error' ? (
                    <><AlertCircle size={20} /> {t.contactSection.form.error}</>
                  ) : (
                    <><Send size={20} /> {t.contactSection.form.submit}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-white/5 bg-[#050505]">
        <p className="text-slate-500 font-medium flex flex-col md:flex-row items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} Bertrand Rene MAPPA.</span>
          <span className="hidden md:inline text-slate-700">•</span> 
          <span>{t.footer}</span>
        </p>
      </footer>
    </div>
  );
}