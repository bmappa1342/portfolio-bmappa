"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu, X, Code2, Smartphone,
  Database, Server, Send,
  MapPin, Phone, Mail, Briefcase, GraduationCap, Download,
  Globe 
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

// --- DICTIONNAIRE DE TRADUCTIONS ---
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
      frontend: "Vue.js, React.js, Angular, Tailwind? Next.js",
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
        submit: "Envoyer le message"
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
      mobile: "Flutter, Xamarin, Android",
      data: "SQL, PostgreSQL, Looker, Docker, Postman"
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
        submit: "Send message"
      }
    },
    footer: "Built with Next.js & Tailwind CSS."
  }
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- GESTION DE LA LANGUE ---
  const [lang, setLang] = useState<Language>('fr');
  const t = DICTIONARY[lang];

  const toggleLanguage = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-slate-950 text-slate-50 min-h-screen overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-2xl font-bold tracking-tighter">
              B.<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">MAPPA</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.home}</a>
              <a href="#parcours" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.experience}</a>
              <a href="#projects" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.projects}</a>
              <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t.nav.contact}</a>
              
              <div className="flex items-center space-x-4 pl-6 border-l border-slate-700">
                <a href="https://github.com/bmappa1342" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <GithubIcon size={20} />
                </a>
                <a href="https://linkedin.com/in/bertrand-mappa" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <LinkedinIcon size={20} />
                </a>
                
                {/* BOUTON DE CHANGEMENT DE LANGUE */}
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700"
                >
                  <Globe size={14} />
                  {lang === 'fr' ? 'EN' : 'FR'}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={toggleLanguage}
                className="text-xs font-bold text-slate-400 border border-slate-700 px-2 py-1 rounded-md"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <button 
                className="text-slate-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 py-4 px-4 flex flex-col space-y-4 shadow-xl"
          >
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">{t.nav.home}</a>
            <a href="#parcours" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">{t.nav.experience}</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">{t.nav.projects}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white font-medium">{t.nav.contact}</a>
          </motion.div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-screen">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-emerald-300 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t.hero.location}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
              Bertrand Rene <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">MAPPA</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-8">
              {t.hero.role}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#parcours" className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors">
                {t.hero.btnExperience}
              </a>
              <a href={lang === 'en' ? "/CV_Bertrand_MAPPA_EN.pdf" : "/CV_Bertrand_MAPPA.pdf"} download className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Download size={20} /> {t.hero.btnCV}
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
                {t.hero.btnContact}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <Server size={28} className="text-blue-400" />
              <span className="font-medium text-slate-300">Backend</span>
              <span className="text-xs text-slate-500 text-center">{t.skills.backend}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <Code2 size={28} className="text-emerald-400" />
              <span className="font-medium text-slate-300">Frontend</span>
              <span className="text-xs text-slate-500 text-center">{t.skills.frontend}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <Smartphone size={28} className="text-purple-400" />
              <span className="font-medium text-slate-300">Mobile</span>
              <span className="text-xs text-slate-500 text-center">{t.skills.mobile}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              <Database size={28} className="text-pink-400" />
              <span className="font-medium text-slate-300">Data & DevOps</span>
              <span className="text-xs text-slate-500 text-center">{t.skills.data}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PARCOURS SECTION --- */}
      <section id="parcours" className="py-24 bg-slate-950/50 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.experienceSection.titlePrefix}<span className="text-emerald-400">{t.experienceSection.titleHighlight}</span></h2>
            <p className="text-slate-400 text-lg">{t.experienceSection.subtitle}</p>
          </div>

          <div className="space-y-8">
            {t.experienceSection.experiences.map((exp) => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-0">
                <div className="md:flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-all">
                  <div className="mb-4 md:mb-0 md:w-1/3">
                    <span className="text-emerald-400 font-semibold text-sm">{exp.period}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-slate-400 mt-2">
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-slate-800">
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 bg-blue-900/10 border border-blue-900/50 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t.experienceSection.diplomaTitle}</h3>
                  <p className="text-blue-300 font-medium mt-1">{t.experienceSection.diplomaSchool}</p>
                  <p className="text-slate-400 text-sm mt-2">{t.experienceSection.diplomaDesc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.projectSection.titlePrefix}<span className="text-blue-400">{t.projectSection.titleHighlight}</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.projectSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.projectSection.projects.map((project) => (
              <motion.div key={project.id} whileHover={{ y: -5 }} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all flex flex-col">
                <div className="p-8 flex-grow">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                    <Code2 size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-950 border border-slate-800 text-xs font-medium rounded-full text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <a href={project.github} className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    <GithubIcon size={16} /> {t.projectSection.githubBtn}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-slate-950/50 border-t border-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.contactSection.titlePrefix}<span className="text-emerald-400">{t.contactSection.titleHighlight}</span></h2>
            <p className="text-slate-400 text-lg">{t.contactSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Email</p>
                  <a href="mailto:mappabertrand@gmail.com" className="text-white hover:text-blue-400 font-medium">mappabertrand@gmail.com</a>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">{t.contactSection.labels.phone}</p>
                  <a href="tel:+221774148870" className="text-white hover:text-emerald-400 font-medium">+221 77 414 88 70</a>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">{t.contactSection.labels.location}</p>
                  <p className="text-white font-medium">Dakar, Sénégal</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form action="https://formspree.io/f/xojoglny" method="POST" className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">{t.contactSection.form.nameLabel}</label>
                    <input type="text" name="nom" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder={t.contactSection.form.namePlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">{t.contactSection.form.emailLabel}</label>
                    <input type="email" name="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder={t.contactSection.form.emailPlaceholder} />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">{t.contactSection.form.messageLabel}</label>
                  <textarea rows={5} name="message" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" placeholder={t.contactSection.form.messagePlaceholder}></textarea>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-xl px-4 py-4 hover:opacity-90 active:scale-[0.98] transition-all">
                  <Send size={18} />
                  {t.contactSection.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center border-t border-slate-900 bg-slate-950">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Bertrand Rene MAPPA. {t.footer}
        </p>
      </footer>
    </div>
  );
}