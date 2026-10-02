document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  
  const navbar = document.querySelector(".navbar");

  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navItems.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  
  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow) {
    window.addEventListener("pointermove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  
  const photoCard = document.querySelector(".photo-card");

  if (photoCard && window.matchMedia("(pointer: fine)").matches) {
    photoCard.addEventListener("pointermove", event => {
      const rect = photoCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      photoCard.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });

    photoCard.addEventListener("pointerleave", () => {
      photoCard.style.transform = "";
    });
  }

  
  document.querySelectorAll(".skill-row").forEach(row => {
    row.addEventListener("mouseenter", () => row.classList.add("hovered"));
    row.addEventListener("mouseleave", () => row.classList.remove("hovered"));
  });

  
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  
  const translations = {
    fr: {
      nav: ["Accueil", "À propos", "Compétences", "Projets", "Contact"],
      navCta: "Disponible",
      menuLabel: "Ouvrir le menu",
      metaDescription: "Portfolio de BOVIELLINE Senila - Informaticienne et Développeuse Web",
      title: "BOVIELLINE Senila | Portfolio",

      heroKicker: "INFORMATICIENNE · DÉVELOPPEUSE WEB",
      heroTitle: `Je transforme<br>les <span>idées</span> en <strong>solutions.</strong>`,
      heroDescription: `Bonjour, je suis <b>BOVIELLINE Senila</b>.<br>Je conçois des expériences numériques modernes,<br>élégantes et pensées pour être réellement utiles.`,
      heroProjects: `Explorer mes projets <i class="fa-solid fa-arrow-up-right-from-square"></i>`,
      heroCv: `<i class="fa-solid fa-file-pdf"></i> Mon CV`,
      role: "Web Developer",
      status: "Disponible",
      scroll: "SCROLL TO DISCOVER",

      aboutLabel: "01 / PROFIL",
      aboutTitle: `Une vision <em>technique</em>,<br>un esprit créatif.`,
      aboutQuote: `Je ne me contente pas de coder :<strong>je cherche à créer des solutions simples,<br>utiles et mémorables.</strong>`,
      philosophy: "MA PHILOSOPHIE",
      aboutP1: `Je suis <strong>BOVIELLINE Senila</strong>, titulaire d'une Licence en Informatique à l'Université IESTIME.`,
      aboutP2: `Passionnée par le développement web, l'analyse des données et les technologies modernes, j'aime concevoir des interfaces élégantes, rapides et adaptées aux besoins des utilisateurs.`,
      aboutP3: `Mon expérience chez <strong>Novion Limited</strong> m'a également permis de renforcer mes compétences techniques et professionnelles.`,
      facts: ["FORMATION", "Licence Informatique", "SPÉCIALITÉ", "Développement Web", "LOCALISATION", "Madagascar"],

      skillsLabel: "02 / EXPERTISE",
      skillsTitle: `Ce que je sais<br><em>construire.</em>`,
      skillsIntro: "Un ensemble d'outils pour passer d'une idée à une solution fonctionnelle.",
      skillNames: [
        "Développement Web", "Python & API", "Frameworks", "Bases de données", "Programmation", "Analyse des données"
      ],
      skillDescriptions: [
        "Interfaces modernes, responsives et interactives.",
        "Applications, automatisation et back-end.",
        "Développement structuré avec des frameworks modernes.",
        "Gestion et manipulation de données relationnelles.",
        "Applications desktop et solutions informatiques.",
        "Exploration, traitement et analyse de données."
      ],

      projectsLabel: "03 / SÉLECTION",
      projectsTitle: `Quelques projets<br><em>dont je suis fière.</em>`,
      projectCategories: ["E-COMMERCE / WEB", "WEB DESIGN", "APPLICATION DESKTOP / PYTHON", "APPLICATION DESKTOP"],
      projectNames: ["SoaSound", "Portfolio Personnel", "Madio Mada", "Application POS"],
      projectDescriptions: [
        "Site e-commerce dédié à la vente d'instruments de musique, avec une interface moderne pour présenter les produits de manière claire et attractive.",
        "Portfolio professionnel conçu pour présenter mon parcours, mes compétences, mes projets et mon univers numérique.",
        "Application Python dédiée à la gestion et à la collecte des déchets. Elle permet de gérer les utilisateurs, les signalements et le suivi des déchets.",
        "Application de gestion des ventes et des stocks développée avec C# et SQL Server."
      ],
      projectButtons: ["Voir le projet", "Explorer le portfolio", "Voir le projet", "Demander plus d'informations"],

      contactLabel: "04 / CONTACT",
      contactTitle: `Une idée ?<br><em>Construisons-la.</em>`,
      contactDescription: "Vous avez un projet, une opportunité professionnelle ou simplement une question ? Je serais ravie d'échanger avec vous.",
      phoneLabel: "TÉLÉPHONE",
      footerRole: "Informaticienne & Développeuse Web"
    },

    en: {
      nav: ["Home", "About", "Skills", "Projects", "Contact"],
      navCta: "Available",
      menuLabel: "Open menu",
      metaDescription: "BOVIELLINE Senila's Portfolio - Computer Scientist and Web Developer",
      title: "BOVIELLINE Senila | Portfolio",

      heroKicker: "COMPUTER SCIENTIST · WEB DEVELOPER",
      heroTitle: `I turn<br><span>ideas</span> into <strong>solutions.</strong>`,
      heroDescription: `Hello, I'm <b>BOVIELLINE Senila</b>.<br>I create modern digital experiences<br>that are elegant, practical, and truly useful.`,
      heroProjects: `Explore my projects <i class="fa-solid fa-arrow-up-right-from-square"></i>`,
      heroCv: `<i class="fa-solid fa-file-pdf"></i> My Resume`,
      role: "Web Developer",
      status: "Available",
      scroll: "SCROLL TO DISCOVER",

      aboutLabel: "01 / PROFILE",
      aboutTitle: `A <em>technical</em> vision,<br>a creative mindset.`,
      aboutQuote: `I don't just code:<strong>I aim to create simple,<br>useful, and memorable solutions.</strong>`,
      philosophy: "MY PHILOSOPHY",
      aboutP1: `I am <strong>BOVIELLINE Senila</strong>, with a Bachelor's degree in Computer Science from IESTIME University.`,
      aboutP2: `Passionate about web development, data analysis, and modern technologies, I enjoy designing elegant, fast, and user-focused interfaces.`,
      aboutP3: `My experience at <strong>Novion Limited</strong> has also helped me strengthen my technical and professional skills.`,
      facts: ["EDUCATION", "Computer Science Degree", "SPECIALIZATION", "Web Development", "LOCATION", "Madagascar"],

      skillsLabel: "02 / EXPERTISE",
      skillsTitle: `What I can<br><em>build.</em>`,
      skillsIntro: "A set of tools to turn an idea into a functional solution.",
      skillNames: [
        "Web Development", "Python & API", "Frameworks", "Databases", "Programming", "Data Analysis"
      ],
      skillDescriptions: [
        "Modern, responsive, and interactive interfaces.",
        "Applications, automation, and back-end development.",
        "Structured development with modern frameworks.",
        "Management and manipulation of relational data.",
        "Desktop applications and software solutions.",
        "Data exploration, processing, and analysis."
      ],

      projectsLabel: "03 / SELECTION",
      projectsTitle: `A few projects<br><em>I am proud of.</em>`,
      projectCategories: ["E-COMMERCE / WEB", "WEB DESIGN", "DESKTOP APPLICATION / PYTHON", "DESKTOP APPLICATION"],
      projectNames: ["SoaSound", "Personal Portfolio", "Madio Mada", "POS Application"],
      projectDescriptions: [
        "E-commerce website for selling musical instruments, with a modern interface designed to present products clearly and attractively.",
        "Professional portfolio designed to showcase my background, skills, projects, and digital world.",
        "Python application dedicated to waste management and collection. It manages users, reports, and waste tracking.",
        "Sales and inventory management application developed with C# and SQL Server."
      ],
      projectButtons: ["View project", "Explore the portfolio", "View project", "Request more information"],

      contactLabel: "04 / CONTACT",
      contactTitle: `Have an idea?<br><em>Let's build it.</em>`,
      contactDescription: "Do you have a project, a career opportunity, or simply a question? I would be happy to hear from you.",
      phoneLabel: "PHONE",
      footerRole: "Computer Scientist & Web Developer"
    }
  };

  const setHTML = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  };

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  function applyLanguage(lang) {
    const t = translations[lang] || translations.fr;

    document.documentElement.lang = lang;
    document.title = t.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.metaDescription);

    document.querySelectorAll(".nav-links a").forEach((link, i) => {
      if (t.nav[i]) link.textContent = t.nav[i];
    });

    const navCta = document.querySelector(".nav-cta");
    if (navCta) {
      const dot = navCta.querySelector("span");
      navCta.childNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) node.remove(); });
      navCta.insertBefore(document.createTextNode(t.navCta + " "), dot || null);
    }

    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) {
      menuButton.setAttribute("aria-label", t.menuLabel);
    }
    setText(".hero-kicker", t.heroKicker);
    setHTML(".hero-copy h1", t.heroTitle);
    setHTML(".hero-description", t.heroDescription);
    setHTML(".hero-actions .button-main", t.heroProjects);
    setHTML(".hero-actions .button-ghost", t.heroCv);
    setText(".photo-bottom small", "ROLE");
    setText(".photo-bottom strong", t.role);
    setText(".fc-bottom b", t.status);

    const heroFooterSpans = document.querySelectorAll(".hero-footer > span");
    if (heroFooterSpans[0]) heroFooterSpans[0].textContent = t.scroll;

    setText(".about-section .section-heading p", t.aboutLabel);
    setHTML(".about-section .section-heading h2", t.aboutTitle);
    setHTML(".about-statement p", t.aboutQuote);
    setText(".about-statement > span", t.philosophy);
    setHTML(".about-text p:nth-of-type(1)", t.aboutP1);
    setHTML(".about-text p:nth-of-type(2)", t.aboutP2);
    setHTML(".about-text p:nth-of-type(3)", t.aboutP3);

    const facts = document.querySelectorAll(".about-facts > div");
    facts.forEach((fact, i) => {
      const span = fact.querySelector("span");
      const strong = fact.querySelector("strong");
      if (span) span.textContent = t.facts[i * 2];
      if (strong) strong.textContent = t.facts[i * 2 + 1];
    });

    setText(".skills-section .section-heading p", t.skillsLabel);
    setHTML(".skills-section .section-heading h2", t.skillsTitle);
    setText(".skills-intro p", t.skillsIntro);

    document.querySelectorAll(".skill-row").forEach((row, i) => {
      const name = row.querySelector(".skill-name h3");
      const desc = row.querySelector(".skill-name p");
      if (name) name.textContent = t.skillNames[i];
      if (desc) desc.textContent = t.skillDescriptions[i];
    });

    setText(".projects-heading p", t.projectsLabel);
    setHTML(".projects-heading h2", t.projectsTitle);

    document.querySelectorAll(".project").forEach((project, i) => {
      const category = project.querySelector(".project-category");
      const name = project.querySelector(".project-info h3");
      const desc = project.querySelector(".project-info p");
      const primary = project.querySelector(".project-primary");
      if (category) category.textContent = t.projectCategories[i];
      if (name) name.textContent = t.projectNames[i];
      if (desc) desc.textContent = t.projectDescriptions[i];
      if (primary) {
        const icon = primary.querySelector("i");
        primary.textContent = t.projectButtons[i] + " ";
        if (icon) primary.appendChild(icon);
      }
    });

    setText(".contact-label", t.contactLabel);
    setHTML(".contact-copy h2", t.contactTitle);
    setText(".contact-copy > p:not(.contact-label)", t.contactDescription);
    setText(".contact-cards .contact-card:nth-child(2) small", t.phoneLabel);
    setText(".footer-brand small", t.footerRole);

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    localStorage.setItem("portfolio-language", lang);
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  const savedLanguage = localStorage.getItem("portfolio-language") || "fr";
  applyLanguage(savedLanguage);
});
