(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const langToggles = document.querySelectorAll('.lang-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('.site-nav');
  const profileImage = document.getElementById('profile-image');
  const profileFrame = document.querySelector('.profile-frame');
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

  // Sticky Header Scroll Transition (Optimized with requestAnimationFrame)
  if (header) {
    let isScrolled = false;
    let ticking = false;

    const updateHeader = () => {
      const shouldBeScrolled = window.scrollY > 15;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle('is-scrolled', isScrolled);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateHeader();
  }

  // Synchronized Theme Toggle (Light / Dark)
  const setTheme = (theme) => {
    const isLight = theme === 'light';
    const isArabic = document.documentElement.lang === 'ar';
    body.classList.toggle('light-mode', isLight);
    themeToggles.forEach((t) => {
      const icon = t.querySelector('.theme-icon');
      if (icon) icon.textContent = isLight ? '☾' : '☀';
      const text = t.querySelector('.theme-text');
      if (text) text.textContent = isLight ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'داكن' : 'Dark');
      t.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    });
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f3f7f3' : '#081012');
  };

  const savedTheme = localStorage.getItem('omar-theme');
  if (savedTheme) setTheme(savedTheme);

  themeToggles.forEach((t) => {
    t.addEventListener('click', function (e) {
      // Immediate blur to prevent sticking in :focus/:hover on mobile touch screens
      if (this && typeof this.blur === 'function') this.blur();
      if (t && typeof t.blur === 'function') t.blur();
      if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') e.currentTarget.blur();
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      // Trigger temporary 400ms themePulse animation, then remove and blur
      themeToggles.forEach((btn) => {
        btn.classList.remove('theme-pulse', 'theme-pop', 'is-animating');
        void btn.offsetWidth;
        btn.classList.add('theme-pulse', 'theme-pop', 'is-animating');
        setTimeout(() => {
          btn.classList.remove('theme-pulse', 'theme-pop', 'is-animating');
          if (typeof btn.blur === 'function') btn.blur();
        }, 400);
      });

      const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
      localStorage.setItem('omar-theme', nextTheme);

      // Smooth Page Theme Morphing Transition (View Transitions API or CSS transitions)
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setTheme(nextTheme);
        });
      } else {
        setTheme(nextTheme);
      }
    });
  });

  // Mobile Menu Overlay Drawer
  const setMobileMenu = (isOpen) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    body.classList.toggle('menu-open', isOpen);
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }
    if (typeof syncLenisScrollState === 'function') {
      syncLenisScrollState();
    }
  };

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu && mobileMenu.classList.contains('is-open');
      setMobileMenu(!isOpen);
    });
  }

  document.querySelectorAll('[data-close-menu]').forEach((el) => {
    el.addEventListener('click', () => setMobileMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      setMobileMenu(false);
      if (menuButton) menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700 && mobileMenu && mobileMenu.classList.contains('is-open')) {
      setMobileMenu(false);
    }
  });

  // Complete Bilingual Translation System (EN / AR)
  const i18n = {
    en: {
    "nav-home": "Home",
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-education": "Education",
    "nav-projects": "Projects",
    "nav-certificates": "Certificates",
    "nav-contact": "Contact",
    "toggle-lang": "Lang: <strong class=\"lang-text\">AR</strong>",
    "toggle-theme": "Theme: <strong class=\"theme-text\">Dark</strong>",
    "hero-status": "Available for opportunities",
    "hero-greeting": "Hello, I’m",
    "hero-name-first": "Omar",
    "hero-name-last": "Ebied.",
    "hero-role": "Data Engineer &amp; Cybersecurity Specialist",
    "hero-usp": "I help growing businesses unlock actionable insights from their data and secure their systems through data-driven analysis and strong security fundamentals.",
    "hero-cta-work": "View My Work",
    "hero-cta-cv": "View CV",
    "hero-cta-contact": "Contact Me",
    "hero-location": "<i>⌖</i> Cairo, Egypt",
    "hero-grad": "<i>◈</i> HNU • Class of 2028",
    "chip-data": "DATA",
    "chip-sec": "SECURE",
    "hero-scroll": "<span>SCROLL</span><span>TO</span><span>EXPLORE</span>",
    "about-num": "01",
    "about-label": "About me",
    "about-greeting": "Hi, I'm Omar Ebied",
    "about-hook": "Building the bridge between <em>raw data</em>, strategic insights, and secure systems.",
    "about-title": "Building the bridge between <em>raw data</em>, strategic insights, and secure systems.",
    "about-p1": "With a rigorous foundation in Computer Science &amp; Information Technology at Helwan National University and specialized training through the Digital Egypt Pioneers Initiative (DEPI) in Big Data and NTI in Cybersecurity, I focus on solving complex data challenges from the ground up.",
    "about-p2": "My work bridges high-throughput data processing, scalable relational database design, and hands-on network security defense—ensuring organizational data infrastructure is both performant and resilient against real-world vulnerabilities.",
    "about-link": "My education &amp; certificates",
    "qi-badge": "Quick Info",
    "qi-name-lbl": "Name",
    "qi-name-val": "Omar Ebied",
    "qi-track-lbl": "Track",
    "qi-track-val": "Data Engineering &amp; Cybersecurity",
    "qi-email-lbl": "Email",
    "qi-location-lbl": "Location",
    "qi-location-val": "Cairo, Egypt",
    "qi-education-lbl": "Education",
    "qi-education-val": "Helwan National University (CSIT)",
    "qi-contact-btn": "Get In Touch",
    "stat-years-val": "2024<span>—</span>2028",
    "stat-years-lbl": "CSIT at HNU",
    "stat-tracks-val": "2<span>+</span>",
    "stat-tracks-lbl": "Technical tracks",
    "stat-proj-val": "4",
    "stat-proj-lbl": "Core projects",
    "edu-num": "02",
    "edu-label": "Education &amp; Certificates",
    "edu-kicker": "2024 — 2028 <span>•</span> Cairo, Egypt",
    "edu-degree": "Bachelor of Computer Science &amp; Information Technology <span>(CSIT)</span>",
    "edu-school": 'Helwan National University <span class="abbr">HNU</span>',
    "edu-cw-title": "Selected coursework",
    "edu-cw-db": "Database Systems",
    "edu-cw-algo": "Algorithms",
    "edu-cw-prog": "Programming",
    "edu-cw-net": "Networks",
    "edu-cw-os": "Operating Systems",
    "cert-sec-kicker": "Verified Credentials &amp; Certifications",
    "cert-sec-title": "Professional Certifications",
    "cert-view-img": "Click to View Image",
    "cert-view-btn": "View Certificate",
    "cert-verify-btn": "Verify Online",
    "cert-cred-id-lbl": "Credential ID:",
    "cert-learner-lbl": "Credential:",
    "cert-sql-basic-kicker": "HackerRank <span>•</span> October 2026",
    "cert-sql-basic-title": "SQL (Basic)",
    "cert-sql-basic-desc": "Covers fundamental relational database operations including query structure, joins, filtering, aggregations, and data retrieval.",
    "cert-sql-adv-kicker": "HackerRank <span>•</span> October 2026",
    "cert-sql-adv-title": "SQL (Advanced)",
    "cert-sql-adv-desc": "Covers advanced SQL queries, window functions, recursive CTEs, subquery optimization, and complex relational modeling.",
    "cert-kaggle-kicker": "Kaggle <span>•</span> Verified Credential",
    "cert-py-title": "Python",
    "cert-py-desc": "Demonstrates core Python programming competency: syntax, variable types, functions, booleans, conditionals, lists, loops, and external libraries.",
    "cert-pandas-title": "Pandas",
    "cert-pandas-desc": "Hands-on data manipulation and analysis using Pandas: DataFrame indexing, grouping, sorting, summary functions, and handling missing values.",
    "cert-nti-kicker": "National Telecommunication Institute <span>•</span> Sep 2025",
    "cert-nti-title": "NTI Cybersecurity Certification",
    "cert-nti-desc": "60 technical hours of practical training in network defense, reconnaissance, traffic packet analysis, and security fundamentals.",
    "cert-nti-physical-tag": "◈ Physical Certificate",
    "cert-nti-view-btn": "View Physical Certificate",
    "cert-nti-no-link": "(No online link required)",
    "skills-num": "03",
    "skills-label": "Skills",
    "skills-title": "A practical, <em>growing toolkit.</em>",
    "skills-sub": "Categorized technical expertise and core engineering competencies based on hands-on academic training and practical lab experience.",
    "skills-tab-prog": "Programming Languages",
    "skills-tab-data": "Data &amp; Tech",
    "skills-tab-sec": "Cybersecurity &amp; Tools",
    "skills-tab-soft": "Soft Skills",
    "cat-g1-badge": "Group 01",
    "cat-g1-title": "Programming Languages",
    "cat-g1-desc": "Foundational, system, and web development languages utilized for data scripting, algorithmic problem-solving, and responsive web user interfaces.",
    "cat-g2-badge": "Group 02",
    "cat-g2-title": "Data &amp; Tech",
    "cat-g2-desc": "Relational database systems, data modeling, complex query engineering, and distributed big data architecture fundamentals.",
    "cat-g3-badge": "Group 03",
    "cat-g3-title": "Cybersecurity &amp; Tools",
    "cat-g3-desc": "Practical security diagnostics, network sniffing, protocol dissection, and penetration testing simulation tools.",
    "cat-g4-badge": "Group 04",
    "cat-g4-title": "Soft Skills",
    "cat-g4-desc": "Interpersonal strengths and disciplined execution habits essential for agile engineering environments and collaborative projects.",
    "skill-py-title": "Python (Scripting)",
    "skill-py-sub": "Data manipulation, automation scripts, Pandas &amp; NumPy analysis",
    "skill-py-badge": "Core Scripting",
    "skill-c-sub": "Low-level memory management, pointers, and foundational computer architecture",
    "skill-c-badge": "Systems",
    "skill-cpp-sub": "Object-oriented architecture, standard template library, efficient algorithms",
    "skill-cpp-badge": "OOP &amp; DSA",
    "skill-java-sub": "Enterprise object-oriented paradigms, class modeling, robust modular programming",
    "skill-java-badge": "Object-Oriented",
    "skill-html-sub": "Semantic documents, accessible markup structure, SEO-optimized elements",
    "skill-html-badge": "Markup",
    "skill-css-sub": "Modern responsive styling, CSS Grid, Flexbox, custom design tokens &amp; animations",
    "skill-css-badge": "Styling",
    "skill-js-sub": "Client-side interactivity, DOM event handling, async data fetching &amp; modern ES6+",
    "skill-js-badge": "Frontend",
    "skill-sql-sub": "Advanced multi-table joins, subqueries, grouping, and window functions",
    "skill-sql-badge": "HackerRank Certified",
    "skill-mssql-sub": "T-SQL programming, stored procedures, triggers, views, and index tuning",
    "skill-mssql-badge": "Enterprise RDBMS",
    "skill-rdbms-sub": "Relational schema design, ACID properties, foreign key integrity, and transactions",
    "skill-rdbms-badge": "Architecture",
    "skill-bigdata-title": "Big Data Concepts",
    "skill-bigdata-sub": "Volume, velocity, variety; distributed processing concepts, scalable ETL pipelines",
    "skill-bigdata-badge": "DEPI Track",
    "skill-dbdesign-title": "Database Design",
    "skill-dbdesign-sub": "Entity-Relationship diagrams (ERD), normalization (1NF to 3NF/BCNF), constraints",
    "skill-dbdesign-badge": "Data Modeling",
    "skill-ccna-sub": "Cisco networking fundamentals, OSI model, IP subnetting, routing &amp; switching",
    "skill-ccna-badge": "Networking",
    "skill-kali-sub": "Dedicated security distro, bash shell scripting, penetration testing suite",
    "skill-kali-badge": "OS &amp; PenTest",
    "skill-nmap-sub": "Network discovery, host active mapping, port scanning, and service detection",
    "skill-nmap-badge": "Reconnaissance",
    "skill-wireshark-sub": "Packet capture, protocol dissection, network traffic troubleshooting, filters",
    "skill-wireshark-badge": "Traffic Analysis",
    "skill-arp-title": "ARP Spoofing",
    "skill-arp-sub": "ARP cache poisoning simulation, MITM attack routing, mitigation mechanisms",
    "skill-arp-badge": "MITM Lab",
    "skill-mitm-sub": "HTTP/HTTPS traffic interception, SSL certificate inspection, real-time packet modification",
    "skill-mitm-badge": "Proxy Intercept",
    "skill-ps-title": "Problem-Solving",
    "skill-ps-sub": "Systematic decomposition of complex technical challenges, methodical debugging",
    "skill-ps-badge": "Analytical",
    "skill-tw-title": "Teamwork",
    "skill-tw-sub": "Cross-functional collaboration, git teamwork, mutual code reviews, knowledge sharing",
    "skill-tw-badge": "Collaboration",
    "skill-wp-title": "Working Under Pressure",
    "skill-wp-sub": "Maintaining composure and code quality during tight project deadlines and deliverables",
    "skill-wp-badge": "Resilience",
    "skill-comm-title": "Communication",
    "skill-comm-sub": "Clear technical documentation, articulating architectural decisions, active listening",
    "skill-comm-badge": "Clarity",
    "skill-adapt-title": "Adaptability",
    "skill-adapt-sub": "Rapidly learning new programming languages, toolchains, frameworks, and workflows",
    "skill-adapt-badge": "Growth Mindset",
    "exp-num": "04",
    "exp-label": "Experience",
    "exp-title": "Learning by solving <em>real problems.</em>",
    "exp-depi-date": "Jul 2026 <span>—</span> Present",
    "exp-depi-kicker": "DEPI Trainee · Data Science",
    "exp-depi-title": "Microsoft Data Engineer Track",
    "exp-depi-c": "Building the foundations needed to work with modern data systems.",
    "exp-depi-a": "Training in data engineering concepts, databases, analysis workflows, and Microsoft-aligned tools.",
    "exp-depi-r": "Strengthening a structured, industry-relevant path toward a data engineering career.",
    "exp-nti-date": "Sep 2025",
    "exp-nti-kicker": "NTI Trainee &amp; Freelancer",
    "exp-nti-title": "Cybersecurity",
    "exp-nti-c": "Exploring practical network security concepts and common attack surfaces.",
    "exp-nti-a": "Applied reconnaissance, traffic analysis, and security assessment techniques in lab environments.",
    "exp-nti-r": "Built practical awareness of how security fundamentals protect systems and data.",
    "car-lbl-c": "<i>C</i> Challenge",
    "car-lbl-a": "<i>A</i> Action",
    "car-lbl-r": "<i>R</i> Result",
    "serv-num": "05",
    "serv-label": "Services",
    "serv-title": "Useful technical work, <em>without the noise.</em>",
    "serv-prob-lbl": "Problem:",
    "serv-res-lbl": "Result:",
    "serv-1-title": "Data Analysis &amp; Engineering",
    "serv-1-prob": "Business data is scattered, unclear, or hard to use.",
    "serv-1-res": "A cleaner path from raw data to actionable insights and informed decisions.",
    "serv-2-title": "Database Design",
    "serv-2-prob": "Information needs a reliable, organized home.",
    "serv-2-res": "A structured relational database design built for clarity, consistency, and growth.",
    "serv-3-title": "Network &amp; Security Basics Assessment",
    "serv-3-prob": "Basic network risks can remain unnoticed.",
    "serv-3-res": "Clear visibility into security fundamentals and practical next steps to improve them.",
    "proj-num": "06",
    "proj-label": "Selected work",
    "proj-title": "Projects with a <em>purpose.</em>",
    "proj-intro": "A selection of work across data, cybersecurity, and the web.",
    "proj-lbl-role": "Role:",
    "proj-lbl-c": "Challenge",
    "proj-lbl-a": "Action",
    "proj-lbl-tools": "Tools",
    "proj-lbl-techstack": "Tech Stack",
    "proj-lbl-r": "Result",
    "proj-ask": "Ask about this project",
    "proj-1-kicker": "Data &amp; Databases <span>•</span> MS SQL Server",
    "proj-1-title": "SQL Database Project",
    "proj-1-role": "Solo Database Designer / Developer.",
    "proj-1-c": "Organize connected information in a scalable, logical way.",
    "proj-1-a": "Designed a relational database with structured entities, relationships, and SQL queries.",
    "proj-1-tools": "MS SQL Server · SQL · RDBMS concepts.",
    "proj-1-r": "A solid database foundation that supports accurate storage and retrieval.",
    "proj-2-kicker": "Cybersecurity Lab <span>•</span> Network Analysis",
    "proj-2-title": "MITM Lab — Man-in-the-Middle Attack",
    "proj-2-role": "Solo Security Researcher (Executed the full attack simulation independently).",
    "proj-2-c": "Understand how intercepted network traffic can expose risk.",
    "proj-2-a": "Simulated ARP spoofing and observed traffic interception in a controlled lab.",
    "proj-2-tools": "Kali Linux · mitmproxy · Wireshark · ARP spoofing.",
    "proj-live-btn": "Live Demo",
    "proj-3-kicker": "Web Development <span>•</span> E-Commerce Frontend",
    "proj-3-title": "Book Fair &amp; Literature",
    "proj-3-desc": "A fully responsive, interactive e-commerce frontend web application built to simulate a seamless book-buying experience. Features dynamic UI, functional shopping cart logic, and a fast-paced checkout simulation.",
    "proj-3-role": "Front-End Web Developer (UI Architecture, Cart Logic &amp; Checkout Flow).",
    "proj-3-c": "Simulate a frictionless book purchasing workflow with stateful interactions and responsive layout.",
    "proj-3-a": "Engineered interactive book catalog browsing, functional shopping cart state, and instant checkout flow.",
    "proj-3-tools": "HTML5 · CSS3 · Vanilla JavaScript (ES6+).",
    "proj-3-r": "A clean, high-performance web application showcasing vanilla JS DOM manipulation and responsive styling.",
    "proj-3-play-pill": "▶ Video Demo",
    "proj-3-play-badge": "Watch Video Demo (market.mp4)",
    "proj-doc-btn": "View Documentation",
    "proj-4-kicker": "Cybersecurity <span>•</span> Kali Linux <span>•</span> Network Analysis",
    "proj-4-title": "NTI MITM Lab — ARP Spoofing",
    "proj-4-desc": "A cybersecurity Proof of Concept (PoC) simulating a Man-in-the-Middle attack using ARP spoofing, Kali Linux, Wireshark, and mitmproxy.",
    "proj-4-role": "Security Researcher &amp; Lab Practitioner.",
    "proj-4-tools": "Kali Linux · ARP Spoofing · Wireshark · mitmproxy.",
    "proj-4-c": "Analyze vulnerabilities in local network ARP tables and demonstrate unencrypted traffic interception.",
    "proj-4-a": "Conducted bidirectional ARP cache poisoning, routed traffic through mitmproxy, and dissected packets in Wireshark.",
    "proj-4-r": "Validated effective network defense strategies, ARP inspection (DAI), and HTTPS encryption countermeasures.",
    "proj-4-play-pill": "▶ Video Demo",
    "proj-4-play-badge": "Watch Video Demo (man in the middle video.mp4)",
    "modal-video-asset-lbl": "Video Asset:",
    "ach-num": "07",
    "ach-label": "Achievements",
    "ach-title": "Milestones that keep me <em>moving forward.</em>",
    "ach-1-kicker": "Data Engineering",
    "ach-1-title": "DEPI Selection",
    "ach-1-desc": "Selected for the Microsoft Data Engineer track, advancing focused learning in data science and engineering.",
    "ach-2-kicker": "Cybersecurity <span>•</span> Physical",
    "ach-2-title": "NTI Cybersecurity Academy <span class=\"tag-subtle\">(Physical Certificate)</span>",
    "ach-2-desc": "Completed a certification program with <strong>60 technical hours</strong> of cybersecurity training. Issued in-person as an official physical certificate.",
    "ach-3-kicker": "Technical Practice",
    "ach-3-title": "Hands-on Projects",
    "ach-3-desc": "Continuously applying computer science theory and security fundamentals through applied technical projects.",
    "test-num": "08",
    "test-label": "Testimonials",
    "test-title": "Collaboration leaves an <em>impression.</em>",
    "test-note": "Feedback is most valuable when it is authentic. These cards are ready for verified quotes from Omar’s peers and mentors.",
    "proj-repo-btn": "GitHub Repo",
    "test-1-quote": "Omar consistently demonstrates analytical rigor in designing relational schemas and data processing pipelines. His dedication to clean architecture and security is outstanding.",
    "test-1-name": "Ahmed Mostafa",
    "test-1-role": "DEPI Peer · Data Track Collaborator",
    "test-2-quote": "A sharp, proactive engineer with deep problem-solving intuition. Omar grasps complex database optimization and network security principles rapidly and executes methodically.",
    "test-2-name": "Mahmoud Hassan",
    "test-2-role": "Technical Mentor · Database &amp; Systems",
    "test-3-quote": "Collaborating with Omar was seamless. He bridges front-end responsiveness with robust data structures, delivering clean, reliable, and user-centric results on schedule.",
    "test-3-name": "Kareem Adel",
    "test-3-role": "Project Lead · UI Collaborator",
    "contact-num": "09",
    "contact-label": "Contact",
    "contact-title": "Let’s make your data <em>work harder.</em>",
    "contact-sub": "Have a project, internship, or collaboration in mind? I’d be glad to hear from you.",
    "contact-wa": "WhatsApp chat ↗",
    "contact-li": "LinkedIn profile ↗",
    "freelance-title": "Available for Freelance &amp; Contract Work",
    "freelance-upwork-sub": "Global Freelance &amp; Enterprise Contracts",
    "freelance-mostaql-sub": "Verified Freelancer Profile",
    "freelance-khamsat-sub": "Specialized Technical Services",
    "form-name-lbl": "Name",
    "form-name-ph": "Your name",
    "form-email-lbl": "Email",
    "form-email-ph": "you@email.com",
    "form-subject-lbl": "Subject",
    "form-subject-ph": "How can I help?",
    "form-message-lbl": "Message",
    "form-message-ph": "Tell me a little about your project...",
    "form-submit-btn": "Send message",
    "footer-direct-label": "Direct Contact",
    "footer-wa": "WhatsApp ↗",
    "footer-freelance-label": "Freelance:",
    "footer-whoami-label": "Who Am I",
    "footer-whoami-bio": "Omar Ebied. Data Engineer & Cybersecurity Specialist building secure and scalable data solutions.",
    "footer-copyright": "Omar Ebied. All rights reserved.",
    "footer-back-to-top": "Back to top ↑",
    "modal-cv-kicker": "Curriculum Vitae <span>•</span> Omar Ebied",
    "modal-cv-title": "Curriculum Vitae (CV) Preview",
    "modal-cv-fmt-lbl": "Format:",
    "modal-cv-fmt-val": "PDF &amp; DOCX • Verified Version",
    "modal-cv-dl-btn": "Open in Drive / Download",
    "modal-hr-kicker": "HackerRank <span>•</span> Verified Credential",
    "modal-kaggle-kicker": "Kaggle <span>•</span> Verified Credential",
    "modal-nti-kicker": "National Telecommunication Institute <span>•</span> Physical Certificate",
    "modal-cred-id-lbl": "Credential ID:",
    "modal-learner-lbl": "Learner:",
    "modal-verify-btn": "Verify Certificate",
    "modal-sql-basic-title": "SQL (Basic) Certificate",
    "modal-sql-adv-title": "SQL (Advanced) Certificate",
    "modal-py-title": "Python Certificate",
    "modal-pandas-title": "Pandas Certificate",
    "modal-nti-title": "NTI Cybersecurity Certification",
    "modal-nti-tag": "◈ Physical Paper Certificate (Issued In-Person)",
    "modal-nti-note": "60 technical hours of practical training in network defense, reconnaissance, traffic packet analysis, and security fundamentals at NTI Cybersecurity Academy."
},
    ar: {
    "nav-home": "الرئيسية",
    "nav-about": "نبذة عني",
    "nav-skills": "المهارات",
    "nav-education": "التعليم",
    "nav-projects": "المشاريع",
    "nav-certificates": "الشهادات",
    "nav-contact": "تواصل معي",
    "toggle-lang": "اللغة: <strong class=\"lang-text\">EN</strong>",
    "toggle-theme": "المظهر: <strong class=\"theme-text\">داكن</strong>",
    "hero-status": "متاح للفرص والتعاقدات",
    "hero-greeting": "مرحباً، أنا",
    "hero-name-first": "عمر",
    "hero-name-last": "عبيد.",
    "hero-role": "مهندس بيانات وأخصائي أمن سيبراني",
    "hero-usp": "أساعد الشركات والمؤسسات على استخراج رؤى دقيقة من بياناتهم وتأمين أنظمتهم من خلال تحليل بيانات متقدم وأسس أمان متينة.",
    "hero-cta-work": "استعرض أعمالي",
    "hero-cta-cv": "عرض السيرة الذاتية",
    "hero-cta-contact": "تواصل معي",
    "hero-location": "<i>⌖</i> القاهرة، مصر",
    "hero-grad": "<i>◈</i> جامعة حلوان الأهلية • دفعة ٢٠٢٨",
    "chip-data": "بيانات",
    "chip-sec": "أمان",
    "hero-scroll": "<span>مرر</span><span>إلى</span><span>الأسفل</span>",
    "about-num": "٠١",
    "about-label": "نبذة عني",
    "about-greeting": "مرحباً، أنا عمر عبيد",
    "about-hook": "بناء الجسر بين <em>البيانات الخام</em>، والرؤى الاستراتيجية، والأنظمة الآمنة.",
    "about-title": "بناء الجسر بين <em>البيانات الخام</em>، والرؤى الاستراتيجية، والأنظمة الآمنة.",
    "about-p1": "مع أساس متين في علوم الحاسب وتكنولوجيا المعلومات بجامعة حلوان الأهلية وتدريب متخصص عبر مبادرة رواد تكنولوجيا مصر (DEPI) في البيانات الضخمة ومعهد NTI في الأمن السيبراني، أركز على حل تحديات البيانات المعقدة من جذورها.",
    "about-p2": "يجمع عملي بين معالجة البيانات عالية الكفاءة، وتصميم قواعد البيانات العلائقية القابلة للتوسع، والدفاع العملي لأمن الشبكات—مما يضمن بنية بيانات مؤسسية عالية الأداء ومحصنة ضد الثغرات الواقعية.",
    "about-link": "مسيرتي التعليمية وشهاداتي",
    "qi-badge": "معلومات سريعة",
    "qi-name-lbl": "الاسم",
    "qi-name-val": "عمر عبيد",
    "qi-track-lbl": "المسار",
    "qi-track-val": "هندسة البيانات والأمن السيبراني",
    "qi-email-lbl": "البريد الإلكتروني",
    "qi-location-lbl": "الموقع",
    "qi-location-val": "القاهرة، مصر",
    "qi-education-lbl": "التعليم",
    "qi-education-val": "جامعة حلوان الأهلية (CSIT)",
    "qi-contact-btn": "تواصل معي",
    "stat-years-val": "٢٠٢٤<span>—</span>٢٠٢٨",
    "stat-years-lbl": "علوم الحاسب بـ HNU",
    "stat-tracks-val": "٢<span>+</span>",
    "stat-tracks-lbl": "مسارات تخصصية",
    "stat-proj-val": "٤",
    "stat-proj-lbl": "مشاريع عملية رئيسية",
    "edu-num": "٠٢",
    "edu-label": "التعليم والشهادات",
    "edu-kicker": "٢٠٢٤ — ٢٠٢٨ <span>•</span> القاهرة، مصر",
    "edu-degree": "بكالوريوس علوم الحاسب وتكنولوجيا المعلومات <span>(CSIT)</span>",
    "edu-school": 'جامعة حلوان الأهلية <span class="abbr">HNU</span>',
    "edu-cw-title": "المقررات الأكاديمية المختارة",
    "edu-cw-db": "أنظمة قواعد البيانات",
    "edu-cw-algo": "الخوارزميات",
    "edu-cw-prog": "البرمجة",
    "edu-cw-net": "شبكات الحاسب",
    "edu-cw-os": "أنظمة التشغيل",
    "cert-sec-kicker": "مؤهلات واعتمادات مهنية موثقة",
    "cert-sec-title": "الشهادات والاعتمادات المهنية",
    "cert-view-img": "اضغط لعرض الشهادة",
    "cert-view-btn": "عرض الشهادة",
    "cert-verify-btn": "التحقق أونلاين",
    "cert-cred-id-lbl": "معرّف الشهادة:",
    "cert-learner-lbl": "المعرّف:",
    "cert-sql-basic-kicker": "هاكر رانك <span>•</span> أكتوبر ٢٠٢٦",
    "cert-sql-basic-title": "SQL (مستوى أساسي)",
    "cert-sql-basic-desc": "تغطي العمليات الجوهرية لقواعد البيانات العلائقية: بناء الاستعلامات، الربط (Joins)، التصفية، الدوال التجميعية واسترجاع البيانات بكفاءة.",
    "cert-sql-adv-kicker": "هاكر رانك <span>•</span> أكتوبر ٢٠٢٦",
    "cert-sql-adv-title": "SQL (مستوى متقدم)",
    "cert-sql-adv-desc": "تغطي الاستعلامات المتقدمة، دوال النوافذ (Window Functions)، التعبيرات الجدولية العامة التكرارية (CTEs)، تحسين الاستعلامات والنمذجة المعقدة.",
    "cert-kaggle-kicker": "كاجل <span>•</span> اعتماد رسمي موثق",
    "cert-py-title": "بايثون (Python)",
    "cert-py-desc": "تثبت الكفاءة في أساسيات لغة بايثون: البنية البرمجية، المتغيرات، الدوال، الشروط المنطقية، القوائم، الحلقات التكرارية والمكتبات الخارجية.",
    "cert-pandas-title": "بانداس (Pandas)",
    "cert-pandas-desc": "معالجة وتحليل البيانات عملياً باستخدام Pandas: فهرسة وتجميع وفرز البيانات، الدوال الإحصائية، والتعامل مع القيم المفقودة.",
    "cert-nti-kicker": "المعهد القومي للاتصالات <span>•</span> سبتمبر ٢٠٢٥",
    "cert-nti-title": "شهادة الأمن السيبراني من NTI",
    "cert-nti-desc": "٦٠ ساعة تدريب تقنية في الدفاع عن الشبكات، جمع المعلومات، تحليل حزم المرور، وأساسيات الأمن السيبراني.",
    "cert-nti-physical-tag": "◈ شهادة ورقية معتمدة",
    "cert-nti-view-btn": "عرض الشهادة الورقية",
    "cert-nti-no-link": "(شهادة ورقية رسمية)",
    "skills-num": "٠٣",
    "skills-label": "المهارات",
    "skills-title": "مجموعة مهارات عملية <em>ومتطورة باستمرار.</em>",
    "skills-sub": "خبرات تقنية مصنفة وكفاءات هندسية رئيسية مبنية على تدريب أكاديمي وتطبيقات عملية في المختبرات.",
    "skills-tab-prog": "لغات البرمجة",
    "skills-tab-data": "تكنولوجيا البيانات",
    "skills-tab-sec": "الأمن السيبراني والأدوات",
    "skills-tab-soft": "المهارات الشخصية",
    "cat-g1-badge": "المجموعة الأولى",
    "cat-g1-title": "لغات البرمجة",
    "cat-g1-desc": "لغات برمجية أساسية ونظامية ولتطوير الويب تُستخدم في معالجة البيانات، حل المشكلات الخوارزمية، وبناء واجهات مستخدم متجاوبة.",
    "cat-g2-badge": "المجموعة الثانية",
    "cat-g2-title": "تكنولوجيا البيانات",
    "cat-g2-desc": "أنظمة قواعد البيانات العلائقية، نمذجة البيانات، كتابة الاستعلامات المتقدمة، وأساسيات بنية البيانات الضخمة.",
    "cat-g3-badge": "المجموعة الثالثة",
    "cat-g3-title": "الأمن السيبراني والأدوات",
    "cat-g3-desc": "فحص وتشخيص أمان الشبكات، تحليل الحزم والبروتوكولات، وأدوات محاكاة اختبار الاختراق.",
    "cat-g4-badge": "المجموعة الرابعة",
    "cat-g4-title": "المهارات الشخصية",
    "cat-g4-desc": "قدرات تواصل وانضباط عملي أساسية لبيئات العمل الهندسية التعاونية وإدارة المشاريع التقنية.",
    "skill-py-title": "بايثون (Scripting)",
    "skill-py-sub": "معالجة البيانات، اسكربتات الأتمتة، والتحليل بمكتبات Pandas و NumPy",
    "skill-py-badge": "برمجة أساسية",
    "skill-c-sub": "إدارة الذاكرة منخفضة المستوى، المؤشرات، وأساسيات معمارية الحاسب",
    "skill-c-badge": "أنظمة",
    "skill-cpp-sub": "البرمجة كائنية التوجه (OOP)، مكتبة القوالب القياسية (STL)، والخوارزميات الفعالة",
    "skill-cpp-badge": "كائنية وخوارزميات",
    "skill-java-sub": "نماذج البرمجة الكائنية للمشاريع الكبرى، نمذجة الفئات، والبرمجة المعيارية",
    "skill-java-badge": "برمجة كائنية",
    "skill-html-sub": "بنية دلالية للمستندات، ترميز متوافق مع معايير إمكانية الوصول وتهيئة محركات البحث",
    "skill-html-badge": "ترميز",
    "skill-css-sub": "تصميم متجاوب حديث، CSS Grid، Flexbox، رموز التصميم والحركات التفاعلية",
    "skill-css-badge": "تنسيق وتصميم",
    "skill-js-sub": "تفاعلية جانب العميل، معالجة أحداث الـ DOM، جلب البيانات غير المتزامن و ES6+",
    "skill-js-badge": "واجهات أمامية",
    "skill-sql-sub": "ربط الجداول المتقدم، الاستعلامات الفرعية، التجميع، ودوال النوافذ التحليلية",
    "skill-sql-badge": "معتمد من هاكر رانك",
    "skill-mssql-sub": "برمجة T-SQL، الإجراءات المخزنة، المشغلات (Triggers)، وضبط فهارس الأداء",
    "skill-mssql-badge": "قواعد بيانات مؤسسية",
    "skill-rdbms-sub": "تصميم المخططات العلائقية، معايير ACID، تكامل المفاتيح الأجنبية، وإدارة المعاملات",
    "skill-rdbms-badge": "معمارية بيانات",
    "skill-bigdata-title": "مفاهيم البيانات الضخمة",
    "skill-bigdata-sub": "الحجم والسرعة والتنوع؛ مفاهيم المعالجة الموزعة، وخطوط معالجة البيانات (ETL)",
    "skill-bigdata-badge": "مسار مبادرة DEPI",
    "skill-dbdesign-title": "تصميم قواعد البيانات",
    "skill-dbdesign-sub": "مخططات الكيانات والعلاقات (ERD)، التسوية وقواعد التطبيع، والقيود الهيكلية",
    "skill-dbdesign-badge": "نمذجة البيانات",
    "skill-ccna-sub": "أساسيات شبكات سيسكو، نموذج OSI، تقسيم الشبكات (Subnetting)، والتوجيه والتبديل",
    "skill-ccna-badge": "شبكات",
    "skill-kali-sub": "توزيعة أمنية متخصصة، برمجة Bash Shell، وأدوات اختبار الاختراق",
    "skill-kali-badge": "نظام واختبار اختراق",
    "skill-nmap-sub": "استكشاف الشبكات، تخطيط الأجهزة النشطة، فحص المنافذ واكتشاف الخدمات",
    "skill-nmap-badge": "استطلاع وفحص",
    "skill-wireshark-sub": "التقاط الحزم، تشريح البروتوكولات، استكشاف أخطاء الشبكة، وتطبيق المرشحات",
    "skill-wireshark-badge": "تحليل حزم المرور",
    "skill-arp-title": "هجوم تزييف ARP",
    "skill-arp-sub": "محاكاة تسميم ذاكرة ARP التخزينية، توجيه هجمات MITM، وطرق الحماية",
    "skill-arp-badge": "مختبر هجوم الوسيط",
    "skill-mitm-sub": "اعتراض حركة HTTP/HTTPS، فحص شهادات SSL، وتعديل الحزم في الوقت الفعلي",
    "skill-mitm-badge": "بروكسي واعتراض",
    "skill-ps-title": "حل المشكلات",
    "skill-ps-sub": "تفكيك التحديات التقنية المعقدة إلى خطوات منطقية وتصحيح الأخطاء المنهجي",
    "skill-ps-badge": "تفكير تحليلي",
    "skill-tw-title": "العمل الجماعي",
    "skill-tw-sub": "التعاون بين التخصصات، إدارة المشاريع عبر Git، مراجعة الأكواد، وتبادل المعرفة",
    "skill-tw-badge": "تعاون وتكامل",
    "skill-wp-title": "العمل تحت الضغط",
    "skill-wp-sub": "الحفاظ على الهدوء وجودة المخرجات البرمجية خلال المواعيد النهائية الصارمة",
    "skill-wp-badge": "مرونة وصمود",
    "skill-comm-title": "التواصل الفعّال",
    "skill-comm-sub": "كتابة توثيق تقني واضح، شرح القرارات المعمارية بدقة، والاستماع الفعّال",
    "skill-comm-badge": "وضوح وتعبير",
    "skill-adapt-title": "سرعة التكيف",
    "skill-adapt-sub": "سرعة استيعاب لغات برمجة جديدة، بيئات العمل، أطر التطوير ومنهجيات الإنجاز",
    "skill-adapt-badge": "عقلية نمو وتطور",
    "exp-num": "٠٤",
    "exp-label": "الخبرات العملية",
    "exp-title": "التعلم من خلال حل <em>مشكلات واقعية.</em>",
    "exp-depi-date": "يوليو ٢٠٢٦ <span>—</span> حتى الآن",
    "exp-depi-kicker": "متدرب مبادرة DEPI · علوم البيانات",
    "exp-depi-title": "مسار مهندس بيانات مايكروسوفت (Microsoft Data Engineer)",
    "exp-depi-c": "بناء الأسس القوية المطلوبة للتعامل مع أحدث أنظمة ومنصات البيانات.",
    "exp-depi-a": "التدريب المكثف على مفاهيم هندسة البيانات، قواعد البيانات، مسارات التحليل، وأدوات مايكروسوفت.",
    "exp-depi-r": "ترسيخ مسار مهني منظم ومتوافق مع متطلبات سوق العمل نحو التخصص في هندسة البيانات.",
    "exp-nti-date": "سبتمبر ٢٠٢٥",
    "exp-nti-kicker": "متدرب بالمعهد القومي للاتصالات وعامل حر",
    "exp-nti-title": "الأمن السيبراني",
    "exp-nti-c": "استكشاف وتطبيق مفاهيم أمان الشبكات العملية وأبرز نقاط الهجوم والتهديدات الشائعة.",
    "exp-nti-a": "تطبيق تقنيات الاستطلاع، تحليل حزم المرور، وتقييم الثغرات الأمنية في بيئات مختبرية مخصصة.",
    "exp-nti-r": "بناء فهم وإدراك عملي عميق لكيفية حماية الأنظمة والبيانات عبر أساسيات الأمان.",
    "car-lbl-c": "<i>C</i> التحدي",
    "car-lbl-a": "<i>A</i> الإجراء",
    "car-lbl-r": "<i>R</i> النتيجة",
    "serv-num": "٠٥",
    "serv-label": "الخدمات التقنية",
    "serv-title": "أعمال تقنية ذات قيمة حقيقية، <em>بدون تعقيد.</em>",
    "serv-prob-lbl": "المشكلة:",
    "serv-res-lbl": "النتيجة:",
    "serv-1-title": "تحليل وهندسة البيانات",
    "serv-1-prob": "البيانات متناثرة أو غير واضحة ويصعب استخراج قيمة ملموسة منها.",
    "serv-1-res": "مسار منظم يحول البيانات الخام إلى رؤى واضحة وقرارات أعمال مدروسة.",
    "serv-2-title": "تصميم وتطوير قواعد البيانات",
    "serv-2-prob": "المعلومات بحاجة إلى بنية متماسكة ومنظمة تضمن عدم التكرار وضياع البيانات.",
    "serv-2-res": "تصميم مخطط علائقي سليم يضمن سلامة البيانات وقابلية التوسع المستقبلي.",
    "serv-3-title": "تقييم أساسيات الشبكات والأمان",
    "serv-3-prob": "المخاطر والثغرات البسيطة في الشبكة قد تمر دون ملاحظة وتؤدي لاختراقات.",
    "serv-3-res": "رؤية شاملة لوضع الأمان الحالي وخطوات عملية واضحة لسد الثغرات وتحصين الأنظمة.",
    "proj-num": "٠٦",
    "proj-label": "المشاريع المختارة",
    "proj-title": "مشاريع برمجية ذات <em>هدف وتأثير.</em>",
    "proj-intro": "مجموعة مختارة من المشاريع العملية في مجالات البيانات، الأمن السيبراني، وتطوير الويب.",
    "proj-lbl-role": "الدور:",
    "proj-lbl-c": "التحدي",
    "proj-lbl-a": "الإجراء",
    "proj-lbl-tools": "التقنيات",
    "proj-lbl-techstack": "حزمة التقنيات",
    "proj-lbl-r": "النتيجة",
    "proj-ask": "استفسر عن هذا المشروع",
    "proj-1-kicker": "البيانات وقواعد البيانات <span>•</span> MS SQL Server",
    "proj-1-title": "مشروع تصميم وتطوير قاعدة بيانات SQL",
    "proj-1-role": "مصمم ومطور قواعد بيانات مستقل (المسؤول بالكامل عن التصميم والتنفيذ).",
    "proj-1-c": "تنظيم وهيكلة البيانات المترابطة بطريقة منطقية قابلة للتوسع وبأعلى كفاءة استرجاع.",
    "proj-1-a": "تصميم قاعدة بيانات علائقية كاملة، تحديد الجداول والارتباطات، وكتابة استعلامات SQL معقدة.",
    "proj-1-tools": "MS SQL Server · استعلامات SQL · مفاهيم RDBMS.",
    "proj-1-r": "بنية تحتية متينة لقاعدة البيانات تضمن حفظ البيانات بدقة وسرعة استعلام عالية.",
    "proj-2-kicker": "مختبر الأمن السيبراني <span>•</span> تحليل الشبكات",
    "proj-2-title": "مختبر محاكاة هجوم الوسيط (Man-in-the-Middle)",
    "proj-2-role": "باحث أمني مستقل (تنفيذ محاكاة الهجوم بالكامل بشكل فردي في بيئة معزولة).",
    "proj-2-c": "فهم كيفية اعتراض البيانات عبر الشبكة وكشف المخاطر التي تهدد سرية المعلومات.",
    "proj-2-a": "محاكاة هجوم تزييف ARP واعتراض وفحص حزم البيانات داخل بيئة مختبرية محكمة.",
    "proj-2-tools": "نظام Kali Linux · أداة mitmproxy · برنامج Wireshark · تقنية ARP Spoofing.",
    "proj-2-r": "فهم عملي تطبيقي لسلوكيات الهجمات الشبكية وسبل تعزيز آليات الحماية والتشفير.",
    "proj-live-btn": "معاينة حية",
    "proj-3-kicker": "تطوير الويب <span>•</span> واجهات المتاجر الإلكترونية",
    "proj-3-title": "معرض الكتاب والأدب (Book Fair & Literature)",
    "proj-3-desc": "تطبيق ويب تفاعلي متجاوب بالكامل للمتاجر الإلكترونية، صُمم لمحاكاة تجربة شراء كتب سلسة وسريعة. يتميز بواجهة ديناميكية، ومنطق متكامل لحسابات عربة التسوق، ومحاكاة فورية للدفع وإنهاء الطلب.",
    "proj-3-role": "مطور واجهات أمامية (هندسة واجهة المستخدم، منطق عربة التسوق، وتدفق إتمام الطلب).",
    "proj-3-c": "محاكاة تجربة تسوق وشراء كتب سلسة وسريعة دون تعقيد، مع إدارة حالة العربة بشكل فوري.",
    "proj-3-a": "تطوير تصفح تفاعلي للكتب، وإدارة حالة عربة التسوق والإجمالي بالـ DOM، ومحاكاة عملية الدفع.",
    "proj-3-tools": "HTML5 · CSS3 · جافاسكريبت (Vanilla JS).",
    "proj-3-r": "واجهة متجر إلكتروني عالية الأداء وسريعة الاستجابة تعكس التمكن من جافاسكريبت وتصميم الويب.",
    "proj-3-play-pill": "▶ فيديو توضيحي",
    "proj-3-play-badge": "مشاهدة العرض المرئي (market.mp4)",
    "proj-doc-btn": "عرض التوثيق",
    "proj-4-kicker": "الأمن السيبراني <span>•</span> كالي لينكس <span>•</span> تحليل الشبكات",
    "proj-4-title": "مختبر NTI للهجمات الوسيطة — هجوم ARP Spoofing",
    "proj-4-desc": "إثبات مفهوم (PoC) للأمن السيبراني يحاكي هجوم الرجل في المنتصف (Man-in-the-Middle) باستخدام انتحال ARP ونظام Kali Linux وWireshark وmitmproxy.",
    "proj-4-role": "باحث أمني وممارس للمختبرات العملية.",
    "proj-4-tools": "كالي لينكس · انتحال ARP · وايرشارك · mitmproxy.",
    "proj-4-c": "تحليل الثغرات الأمنية في جداول ARP على الشبكة المحلية وملاحظة اعتراض حركة المرور غير المشفرة.",
    "proj-4-a": "تنفيذ تسميم ذاكرة التخزين المؤقت لـ ARP وتوجيه البيانات عبر mitmproxy وتحليل الحزم في Wireshark.",
    "proj-4-r": "التحقق من استراتيجيات الدفاع الفعالة عن الشبكة كفحص ARP الديناميكي (DAI) وتدابير التشفير HTTPS.",
    "proj-4-play-pill": "▶ فيديو توضيحي",
    "proj-4-play-badge": "مشاهدة العرض المرئي (man in the middle video.mp4)",
    "modal-video-asset-lbl": "ملف الفيديو:",
    "ach-num": "٠٧",
    "ach-label": "الإنجازات",
    "ach-title": "محطات مهمة تدفعني دائماً <em>نحو التطور والتقدم.</em>",
    "ach-1-kicker": "هندسة البيانات",
    "ach-1-title": "القبول في مبادرة DEPI",
    "ach-1-desc": "تم اختياري في مسار مهندس بيانات مايكروسوفت ضمن مبادرة رواد مصر الرقمية لتعميق التخصص في علم وهندسة البيانات.",
    "ach-2-kicker": "الأمن السيبراني <span>•</span> شهادة ورقية",
    "ach-2-title": "أكاديمية الأمن السيبراني NTI <span class=\"tag-subtle\">(شهادة معتمدة)</span>",
    "ach-2-desc": "إتمام البرنامج المعتمد بـ <strong>٦٠ ساعة تدريب تقنية</strong> في الأمن السيبراني وتسلم الشهادة الرسمية حضورياً.",
    "ach-3-kicker": "التطبيق العملي",
    "ach-3-title": "مشاريع تقنية تطبيقية",
    "ach-3-desc": "التطبيق المستمر للنظريات الأكاديمية وأسس الحماية عبر بناء مشاريع برمجية حقيقية.",
    "test-num": "٠٨",
    "test-label": "آراء الزملاء والعملاء",
    "test-title": "التعاون المثمر يترك دائماً <em>أثراً إيجابياً ملموساً.</em>",
    "test-note": "التوصيات والآراء تكتسب قيمتها من مصداقيتها. هذه البطاقات مجهزة لاستقبال شهادات وتوصيات موثقة من زملاء العمل والمشرفين.",
    "proj-repo-btn": "مستودع GitHub",
    "test-1-quote": "يُظهر عمر باستمرار دقة تحليلية عالية في تصميم المخططات العلائقية وخطوط معالجة البيانات. التزامه بالبنية النظيفة ومبادئ الأمان استثنائي ومميز.",
    "test-1-name": "أحمد مصطفى",
    "test-1-role": "زميل DEPI · مسار البيانات",
    "test-2-quote": "مهندس متميز ومبادر يتمتع بحس تحليلي عميق لحل المشكلات. يستوعب عمر مفاهيم تحسين قواعد البيانات وأمن الشبكات بسرعة وينفذها بمنهجية احترافية.",
    "test-2-name": "محمود حسن",
    "test-2-role": "موجه تقني · قواعد البيانات والأنظمة",
    "test-3-quote": "كان التعاون مع عمر في غاية السلاسة والاحترافية. يربط بين سرعة استجابة الواجهات وهياكل البيانات القوية، مقدماً نتائج موثوقة ومتقنة في الموعد المحدد.",
    "test-3-name": "كريم عادل",
    "test-3-role": "قائد المشروع · زميل واجهات المستخدم",
    "contact-num": "٠٩",
    "contact-label": "تواصل معي",
    "contact-title": "دعنا نجعل بياناتك <em>أكثر فاعلية وتأثيراً.</em>",
    "contact-sub": "هل لديك مشروع، فرصة تدريب، أو تعاون تقني ترغب في مناقشته؟ يسعدني دائماً تواصلك.",
    "contact-wa": "محادثة عبر واتساب ↖",
    "contact-li": "حساب لينكد إن ↖",
    "freelance-title": "متاح للعمل الحر والتعاقدات البرمجية",
    "freelance-upwork-sub": "تعاقدات ومشاريع دولية للبيانات والبرمجة",
    "freelance-mostaql-sub": "حساب موثق لتنفيذ المشاريع التقنية",
    "freelance-khamsat-sub": "خدمات رقمية واستشارية متخصصة",
    "form-name-lbl": "الاسم",
    "form-name-ph": "اسمك الكريم",
    "form-email-lbl": "البريد الإلكتروني",
    "form-email-ph": "بريدك الإلكتروني",
    "form-subject-lbl": "الموضوع",
    "form-subject-ph": "كيف يمكنني مساعدتك؟",
    "form-message-lbl": "الرسالة",
    "form-message-ph": "اكتب تفاصيل مشروعك أو استفسارك هنا...",
    "form-submit-btn": "إرسال الرسالة",
    "footer-direct-label": "التواصل المباشر",
    "footer-wa": "واتساب ↖",
    "footer-freelance-label": "العمل الحر:",
    "footer-whoami-label": "من أنا",
    "footer-whoami-bio": "عمر عبيد. مهندس بيانات وأخصائي أمن سيبراني يبني حلول بيانات آمنة وقابلة للتطوير.",
    "footer-copyright": "عمر عبيد. جميع الحقوق محفوظة.",
    "footer-back-to-top": "العودة للأعلى ↑",
    "modal-cv-kicker": "السيرة الذاتية <span>•</span> عمر عبيد",
    "modal-cv-title": "معاينة السيرة الذاتية (CV)",
    "modal-cv-fmt-lbl": "الصيغة:",
    "modal-cv-fmt-val": "PDF و DOCX • نسخة موثقة محدثة",
    "modal-cv-dl-btn": "فتح في Google Drive / تحميل",
    "modal-hr-kicker": "هاكر رانك <span>•</span> اعتماد رسمي موثق",
    "modal-kaggle-kicker": "كاجل <span>•</span> اعتماد رسمي موثق",
    "modal-nti-kicker": "المعهد القومي للاتصالات <span>•</span> شهادة ورقية معتمدة",
    "modal-cred-id-lbl": "معرّف الشهادة:",
    "modal-learner-lbl": "المتعلّم:",
    "modal-verify-btn": "التحقق من الشهادة",
    "modal-sql-basic-title": "شهادة SQL (المستوى الأساسي)",
    "modal-sql-adv-title": "شهادة SQL (المستوى المتقدم)",
    "modal-py-title": "شهادة بايثون (Python)",
    "modal-pandas-title": "شهادة بانداس (Pandas)",
    "modal-nti-title": "شهادة الأمن السيبراني من NTI",
    "modal-nti-tag": "◈ شهادة ورقية رسمية معتمدة (مسلمة حضورياً)",
    "modal-nti-note": "٦٠ ساعة تدريب تقنية في الدفاع عن الشبكات، جمع المعلومات، تحليل حزم المرور، وأساسيات الأمن السيبراني بأكاديمية NTI."
}
  };

  let lenis = null;
  let isCurvedMenuOpen = false;
  let syncProjectCounterLanguage = null;

  const syncLenisScrollState = () => {
    if (!lenis) return;
    const anyModalOpen = !!document.querySelector('.cert-modal.is-open, .modal.is-open');
    const mobileOpen = !!(mobileMenu && mobileMenu.classList.contains('is-open'));
    if (anyModalOpen || mobileOpen || isCurvedMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };

  const setLanguage = (lang) => {
    const isArabic = lang === 'ar';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    body.classList.toggle('rtl-mode', isArabic);

    // 1. Text elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key] !== undefined) {
        el.innerHTML = i18n[lang][key];
      }
    });

    // 2. Input/Textarea placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (i18n[lang] && i18n[lang][key] !== undefined) {
        el.setAttribute('placeholder', i18n[lang][key]);
      }
    });

    // 3. Update Toggle Buttons
    langToggles.forEach((btn) => {
      const text = btn.querySelector('.lang-text');
      if (text) text.textContent = isArabic ? 'EN' : 'AR';
      btn.setAttribute('aria-label', isArabic ? 'Switch language to English' : 'Switch language to Arabic');
      btn.setAttribute('title', isArabic ? 'تبديل إلى الإنجليزية' : 'Switch to Arabic');
    });

    const isLight = body.classList.contains('light-mode');
    themeToggles.forEach((t) => {
      const text = t.querySelector('.theme-text');
      if (text) text.textContent = isLight ? (isArabic ? 'فاتح' : 'Light') : (isArabic ? 'داكن' : 'Dark');
    });

    if (typeof syncProjectCounterLanguage === 'function') {
      syncProjectCounterLanguage();
    }

    if (typeof window.ScrollTrigger !== 'undefined') {
      setTimeout(() => window.ScrollTrigger.refresh(), 60);
    }
  };

  const savedLang = localStorage.getItem('omar-lang') || 'en';
  setLanguage(savedLang === 'ar' ? 'ar' : 'en');

  langToggles.forEach((btn) => {
    btn.addEventListener('click', function () {
      if (this && typeof this.blur === 'function') this.blur();
      const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('omar-lang', newLang);
      setLanguage(newLang);
    });
  });

  // Skills Tabs Switching & Keyboard Accessibility
  const skillsTabs = document.querySelectorAll('.skills-tab');
  const skillsPanels = document.querySelectorAll('.skills-panel');

  skillsTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      skillsTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      const targetPanelId = tab.getAttribute('aria-controls');
      skillsPanels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });

    tab.addEventListener('keydown', (event) => {
      let targetIndex = null;
      if (event.key === 'ArrowRight') {
        targetIndex = (index + 1) % skillsTabs.length;
      } else if (event.key === 'ArrowLeft') {
        targetIndex = (index - 1 + skillsTabs.length) % skillsTabs.length;
      } else if (event.key === 'Home') {
        targetIndex = 0;
      } else if (event.key === 'End') {
        targetIndex = skillsTabs.length - 1;
      }

      if (targetIndex !== null) {
        event.preventDefault();
        skillsTabs[targetIndex].focus();
        skillsTabs[targetIndex].click();
      }
    });
  });

  profileImage.addEventListener('error', () => profileFrame.classList.add('no-image'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.02, rootMargin: '0px 0px 50px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const navLinks = [...nav.querySelectorAll('a')];
  const mobileNavLinks = [...document.querySelectorAll('.mobile-nav-link')];

  function setActiveNav(id) {
    if (!id) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    mobileNavLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  }

  // Smooth click tracking to avoid flickering during smooth scroll
  let isNavClicking = false;
  let navClickTimeout = null;
  [...navLinks, ...mobileNavLinks].forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        setActiveNav(id);
        isNavClicking = true;
        clearTimeout(navClickTimeout);
        navClickTimeout = setTimeout(() => {
          isNavClicking = false;
        }, 800);
      }
    });
  });

  // Accurate Scroll Spy with distinct bounding calculation for nested #certificates
  const navTargetIds = ['home', 'about', 'skills', 'education', 'projects', 'certificates', 'contact'];

  function updateScrollSpy() {
    if (isNavClicking) return;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Bottom reached -> Contact is active
    if (scrollY + viewportHeight >= docHeight - 80) {
      setActiveNav('contact');
      return;
    }

    // Top reached -> Home is active
    if (scrollY < 120) {
      setActiveNav('home');
      return;
    }

    const triggerPoint = scrollY + 160;

    // Collect elements with their document top coordinates
    const targets = navTargetIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollY;
      return { id, top };
    }).filter(Boolean).sort((a, b) => a.top - b.top);

    let activeId = targets[0]?.id || 'home';
    for (let i = 0; i < targets.length; i++) {
      if (triggerPoint >= targets[i].top) {
        activeId = targets[i].id;
      } else {
        break;
      }
    }
    setActiveNav(activeId);
  }

  let scrollSpyRaf = null;
  window.addEventListener('scroll', () => {
    if (!scrollSpyRaf) {
      scrollSpyRaf = requestAnimationFrame(() => {
        updateScrollSpy();
        scrollSpyRaf = null;
      });
    }
  }, { passive: true });

  updateScrollSpy();
  window.addEventListener('resize', updateScrollSpy, { passive: true });

  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Certificate & CV Modals / Popups
  let lastFocusedElement = null;

  const openCertModal = (modalId, trigger = null) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const hoverPreviewEl = document.getElementById('project-hover-preview');
    if (hoverPreviewEl) hoverPreviewEl.classList.remove('is-visible');

    // Dynamically configure video modal when triggered from a video mockup element
    if (trigger && (modalId === 'project-video-modal' || modal.classList.contains('project-video-modal'))) {
      const videoSrc = trigger.getAttribute('data-video');
      const posterSrc = trigger.getAttribute('data-poster');
      const title = trigger.getAttribute('data-title');
      const titleI18n = trigger.getAttribute('data-title-i18n');
      const kicker = trigger.getAttribute('data-kicker');
      const kickerI18n = trigger.getAttribute('data-kicker-i18n');
      const asset = trigger.getAttribute('data-asset');
      const demoUrl = trigger.getAttribute('data-demo-url');
      const demoLabel = trigger.getAttribute('data-demo-label') || 'Live Demo';
      const demoI18n = trigger.getAttribute('data-demo-i18n');
      const repoUrl = trigger.getAttribute('data-repo-url');

      const video = modal.querySelector('video');
      if (video && videoSrc) {
        const source = video.querySelector('source');
        if (source) {
          source.src = videoSrc;
        }
        video.src = videoSrc;
        if (posterSrc) video.poster = posterSrc;
        video.load();
      }

      const kickerEl = modal.querySelector('.cert-modal-heading .card-kicker');
      if (kickerEl) {
        if (kickerI18n) kickerEl.setAttribute('data-i18n', kickerI18n);
        if (kicker) kickerEl.innerHTML = kicker;
      }

      const titleEl = modal.querySelector('#modal-title-project-video, .cert-modal-heading h3');
      if (titleEl) {
        if (titleI18n) titleEl.setAttribute('data-i18n', titleI18n);
        if (title) titleEl.textContent = title;
      }

      const assetEl = modal.querySelector('.cert-id-code');
      if (assetEl && asset) {
        assetEl.textContent = asset;
      }

      const demoBtn = modal.querySelector('.modal-demo-btn, .modal-footer-actions .button-primary');
      if (demoBtn) {
        if (demoUrl) {
          demoBtn.href = demoUrl;
          demoBtn.style.display = 'inline-flex';
        } else {
          demoBtn.style.display = 'none';
        }
        const demoSpan = demoBtn.querySelector('span:first-child');
        if (demoSpan) {
          if (demoI18n) demoSpan.setAttribute('data-i18n', demoI18n);
          demoSpan.textContent = demoLabel;
        }
      }

      const repoBtn = modal.querySelector('.modal-repo-btn, .modal-footer-actions .button-ghost');
      if (repoBtn) {
        if (repoUrl) {
          repoBtn.href = repoUrl;
          repoBtn.style.display = 'inline-flex';
        } else {
          repoBtn.style.display = 'none';
        }
      }
    }

    const currentLang = document.documentElement.lang || 'en';
    modal.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang] && i18n[currentLang][key] !== undefined) {
        el.innerHTML = i18n[currentLang][key];
      }
    });
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    syncLenisScrollState();
    const video = modal.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    const closeBtn = modal.querySelector('.cert-modal-close, .modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeCertModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    const video = modal.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (!document.querySelector('.cert-modal.is-open, .modal.is-open')) {
      body.classList.remove('modal-open');
    }
    syncLenisScrollState();
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      // Don't intercept clicks on outbound action links
      if (event.target.closest('a')) return;
      event.preventDefault();
      event.stopPropagation();
      const targetId = trigger.getAttribute('data-open-modal');
      if (targetId) openCertModal(targetId, trigger);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.target.closest('a')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        const targetId = trigger.getAttribute('data-open-modal');
        if (targetId) openCertModal(targetId, trigger);
      }
    });
  });

  // Dedicated smooth trigger for View CV button
  const heroCvBtn = document.querySelector('.hero-cv-btn');
  if (heroCvBtn) {
    heroCvBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCertModal('cv-modal');
    });
  }

  // Handle close buttons inside any modal
  document.querySelectorAll('.cert-modal [data-close-modal], .modal [data-close-modal], .cert-modal-close, .modal-close').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const modal = btn.closest('.cert-modal, .modal');
      closeCertModal(modal);
    });
  });

  // Handle backdrop clicks and trap focus inside modals
  document.querySelectorAll('.cert-modal, .modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.hasAttribute('data-close-modal') || event.target.classList.contains('cert-modal-backdrop') || event.target.classList.contains('modal-backdrop')) {
        closeCertModal(modal);
      }
    });

    modal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });

  // Global Escape key to close any active modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.cert-modal.is-open, .modal.is-open');
      if (activeModal) closeCertModal(activeModal);
    }
  });

  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send message ↗';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Honeypot spam protection check
      const honeypot = form.querySelector('input[name="_honey"]');
      if (honeypot && honeypot.value) {
        return; // Silent discard for bot spam
      }

      if (!form.checkValidity()) {
        status.innerHTML = `
          <div class="form-status-alert form-status-error">
            <span class="status-icon" aria-hidden="true">⚠</span>
            <div class="status-content">
              <strong>Incomplete form</strong>
              <p>Please complete all fields with a valid email address.</p>
            </div>
          </div>`;
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const name = formData.get('name')?.trim() || '';
      const email = formData.get('email')?.trim() || '';
      const subject = formData.get('subject')?.trim() || 'Portfolio Contact';
      const message = formData.get('message')?.trim() || '';
      const web3Key = formData.get('access_key')?.trim();

      // UI: Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-submitting');
        submitBtn.innerHTML = '<span class="status-spinner" aria-hidden="true"></span> <span class="btn-text">Sending message…</span>';
      }
      status.innerHTML = `
        <div class="form-status-alert form-status-loading">
          <span class="status-spinner" aria-hidden="true"></span>
          <div class="status-content">Forwarding your message to momr09989@gmail.com…</div>
        </div>`;

      // Determine backend endpoint:
      // Uses Web3Forms if an access key is provided; otherwise routes via FormSubmit.co
      const endpoint = web3Key
        ? 'https://api.web3forms.com/submit'
        : 'https://formsubmit.co/ajax/momr09989@gmail.com';

      const payload = web3Key
        ? {
            access_key: web3Key,
            name,
            email,
            subject: `Portfolio Message: ${subject} (from ${name})`,
            message,
            from_name: name,
          }
        : {
            name,
            email,
            subject: `Portfolio Message: ${subject} (from ${name})`,
            message,
            _subject: `Portfolio Message: ${subject} (from ${name})`,
            _template: 'table',
            _captcha: 'false',
          };

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
          // Check for FormSubmit one-time email confirmation notification
          if (data.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activation')) {
            status.innerHTML = `
              <div class="form-status-alert form-status-success">
                <span class="status-icon" aria-hidden="true">✉</span>
                <div class="status-content">
                  <strong>Message Sent! One-Time Activation Notice</strong>
                  <p>FormSubmit sent a confirmation email to <code>momr09989@gmail.com</code>. Click "Activate Form" once to enable continuous instant forwards!</p>
                </div>
              </div>`;
          } else {
            status.innerHTML = `
              <div class="form-status-alert form-status-success">
                <span class="status-icon" aria-hidden="true">✔</span>
                <div class="status-content">
                  <strong>Message Sent Successfully!</strong>
                  <p>Thank you for reaching out, ${name || 'there'}! Your message has been forwarded to momr09989@gmail.com. I will get back to you shortly.</p>
                </div>
              </div>`;
          }
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('Backend submission note:', err);
        const mailtoUrl = `mailto:momr09989@gmail.com?subject=${encodeURIComponent(subject + ' — Portfolio enquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
        status.innerHTML = `
          <div class="form-status-alert form-status-error">
            <span class="status-icon" aria-hidden="true">⚠</span>
            <div class="status-content">
              <strong>Could not complete automated submission.</strong>
              <p>You can also send directly via email: <a href="${mailtoUrl}" style="color:var(--cyan);text-decoration:underline;">Click here to open your email client ↗</a></p>
            </div>
          </div>`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-submitting');
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  // Graceful Image Fallback Handler for GitHub Pages & Local Paths
  document.querySelectorAll('.skill-tech-icon, .freelance-platform-img, .footer-btn-icon').forEach((img) => {
    img.addEventListener('error', function () {
      if (this.dataset.fallbackTried) return;
      this.dataset.fallbackTried = 'true';
      const src = this.getAttribute('src');
      if (!src) return;
      if (src.startsWith('icons/') || src.startsWith('./icons/')) {
        this.src = src.replace(/^(\.\/)?icons\//, '');
      } else {
        this.src = 'icons/' + src.replace(/^\.\//, '');
      }
    });
  });

  // =========================================================================
  // LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER + INTERACTIVE PORTFOLIO EFFECTS
  // =========================================================================

  // 1. Mark modals and overlay menus with data-lenis-prevent so inner scrolling works natively
  document.querySelectorAll('.cert-modal, .cert-modal-dialog, .cert-modal-body, .modal, .mobile-menu-overlay, .mobile-menu-drawer, .curved-overlay-menu, .curved-overlay-inner').forEach((el) => {
    el.setAttribute('data-lenis-prevent', '');
  });

  // 2. Initialize AOS (Animate On Scroll) & Lenis + Sync with GSAP ScrollTrigger
  if (typeof window.AOS !== 'undefined') {
    window.AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) => !!(node && node.closest && node.closest('.cert-modal, .modal, .mobile-menu-overlay, .curved-overlay-menu'))
    });

    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on('scroll', () => {
        window.ScrollTrigger.update();
      });
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  // 3. Hero Drawn SVG Signature Animation (stroke-dashoffset)
  const sigWrap = document.querySelector('.hero-signature-wrap');
  const sigPaths = document.querySelectorAll('.hero-signature-svg .sig-path');
  const sigDot = document.querySelector('.hero-signature-svg .sig-dot');

  const initSignaturePaths = () => {
    sigPaths.forEach((path) => {
      if (typeof path.getTotalLength !== 'function') return;
      if (prefersReducedMotion) {
        path.style.strokeDasharray = 'none';
        path.style.strokeDashoffset = '0';
        return;
      }
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });
    if (sigDot) sigDot.style.opacity = prefersReducedMotion ? '1' : '0';
  };

  let sigLoopTl = null;
  const playSignatureAnimation = () => {
    if (prefersReducedMotion || !sigPaths.length || typeof window.gsap === 'undefined') return;
    if (sigLoopTl) sigLoopTl.kill();
    initSignaturePaths();
    const sigSvg = document.querySelector('.hero-signature-svg');
    if (sigSvg) window.gsap.set(sigSvg, { opacity: 1 });

    // Loop: draw (2.2s) -> hold (2.5s) -> fade out (0.6s) -> 0.8s pause -> repeat forever
    const tl = window.gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    const drawTimings = [
      { start: 0, duration: 0.9 },
      { start: 0.7, duration: 0.9 },
      { start: 1.5, duration: 0.7 }
    ];
    sigPaths.forEach((path, idx) => {
      const len = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 0;
      const timing = drawTimings[Math.min(idx, drawTimings.length - 1)];
      tl.fromTo(
        path,
        { strokeDashoffset: len },
        { strokeDashoffset: 0, duration: timing.duration, ease: 'power2.inOut' },
        timing.start
      );
    });
    if (sigDot) {
      tl.fromTo(
        sigDot,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
        1.9
      );
    }
    if (sigSvg) {
      tl.fromTo(sigSvg, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 4.7);
    }
    sigLoopTl = tl;
  };

  initSignaturePaths();
  if (sigWrap) {
    sigWrap.addEventListener('mouseenter', playSignatureAnimation);
    sigWrap.addEventListener('click', playSignatureAnimation);
  }

  // 4. Curved Preloader Reveal with the standalone OE monogram draw sequence
  const preloader = document.getElementById('preloader');
  const preloaderLogoSvg = document.querySelector('.preloader-logo-svg');
  const preloaderLogoPaths = preloader ? preloader.querySelectorAll('.preloader-logo-path') : [];
  const preloaderLogoNodes = preloader ? preloader.querySelectorAll('.preloader-logo-node') : [];
  const preloaderCurvePath = document.getElementById('preloader-curve-path');
  const heroTextEls = document.querySelectorAll('.hero h1, .hero-role, .hero-usp');

  if (typeof window.gsap !== 'undefined' && heroTextEls.length && !prefersReducedMotion) {
    window.gsap.set(heroTextEls, {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)'
    });
  }

  let heroTextRevealed = false;
  const revealHeroText = () => {
    if (heroTextRevealed) return;
    heroTextRevealed = true;
    if (typeof window.gsap !== 'undefined' && heroTextEls.length) {
      if (prefersReducedMotion) {
        window.gsap.set(heroTextEls, {
          opacity: 1,
          y: 0,
          filter: 'none',
          clearProps: 'transform,filter'
        });
      } else {
        window.gsap.to(heroTextEls, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          overwrite: true,
          clearProps: 'filter,transform'
        });
      }
    }
    if (!prefersReducedMotion) playSignatureAnimation();
  };

  let preloaderFinished = false;
  const finishPreloader = () => {
    if (preloaderFinished) return;
    preloaderFinished = true;
    if (preloader) preloader.classList.add('is-done');
    revealHeroText();
    if (typeof window.ScrollTrigger !== 'undefined') {
      setTimeout(() => window.ScrollTrigger.refresh(), 80);
    }
    if (typeof window.AOS !== 'undefined') {
      setTimeout(() => window.AOS.refreshHard(), 100);
    }
  };

  if (preloader && typeof window.gsap !== 'undefined' && !prefersReducedMotion) {
    preloader.classList.add('is-active');
    // Hard timeout keeps a failed timeline from blocking the page.
    setTimeout(finishPreloader, 3800);

    const preTl = window.gsap.timeline({
      onComplete: finishPreloader
    });

    preloaderLogoPaths.forEach((path) => {
      if (typeof path.getTotalLength !== 'function') return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
    if (preloaderLogoNodes.length) {
      window.gsap.set(preloaderLogoNodes, { opacity: 0, scale: 0.2 });
    }

    if (preloaderLogoSvg) {
      preTl.fromTo(
        preloaderLogoSvg,
        { opacity: 0, scale: 0.86, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out'
        },
        0
      );
    }

    if (preloaderLogoPaths.length) {
      preTl.to(
        preloaderLogoPaths,
        { strokeDashoffset: 0, duration: 0.82, stagger: 0.12, ease: 'power2.inOut' },
        0.06
      );
    }
    if (preloaderLogoNodes.length) {
      preTl.to(
        preloaderLogoNodes,
        { opacity: 1, scale: 1, duration: 0.32, stagger: 0.045, ease: 'power2.out' },
        1.15
      );
    }

    preTl
      .to(
        preloader,
        {
          yPercent: -100,
          duration: 0.95,
          ease: 'power3.inOut',
          onStart: () => {
            setTimeout(revealHeroText, 420);
          }
        },
        '+=0.12'
      );

    if (preloaderCurvePath) {
      preTl.to(
        preloaderCurvePath,
        {
          attr: { d: 'M0,0 L1440,0 L1440,0 Q720,0 0,0 Z' },
          duration: 0.95,
          ease: 'power3.inOut'
        },
        '-=0.95'
      );
    }
  } else {
    finishPreloader();
  }

  // 5. Starfield Background Canvas (Smooth Slow Drift + Dark/Light Mode Adaptive)
  const starCanvas = document.getElementById('starfield');
  if (starCanvas && starCanvas.getContext) {
    const ctx = starCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      starCanvas.width = width * dpr;
      starCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const starCount = width < 700 ? 55 : 95;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.45 + 0.45,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14 - 0.05,
      baseAlpha: Math.random() * 0.55 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
      isEmerald: Math.random() < 0.38
    }));

    const renderStars = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = body.classList.contains('light-mode');

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.speed;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const twinkle = 0.65 + 0.35 * Math.sin(s.phase);
        const alpha = s.baseAlpha * twinkle * (isLight ? 0.42 : 0.85);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.isEmerald) {
          ctx.fillStyle = isLight
            ? `rgba(5, 150, 105, ${alpha})`
            : `rgba(16, 185, 129, ${alpha})`;
        } else {
          ctx.fillStyle = isLight
            ? `rgba(16, 34, 30, ${alpha * 0.65})`
            : `rgba(220, 242, 235, ${alpha * 0.78})`;
        }
        ctx.fill();
      }
      requestAnimationFrame(renderStars);
    };
    requestAnimationFrame(renderStars);
  }

  // 6. Magnetic Buttons (Desktop Only)
  const isDesktopPointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isDesktopPointer && typeof window.gsap !== 'undefined') {
    // Magnetic Effect on primary buttons, social buttons, and floating menu button (excluding theme/lang/mobile toggles)
    const magneticElements = document.querySelectorAll(
      '.hero-cv-btn, #contact-submit-btn, .qi-cta-btn, .footer-social-btn, .footer-pill-btn, .floating-menu-btn, .site-header .brand'
    );
    magneticElements.forEach((el) => {
      if (el.classList.contains('theme-toggle') || el.classList.contains('lang-toggle') || el.classList.contains('mobile-toggle-btn')) {
        return;
      }
      const resetMagnetic = () => {
        window.gsap.killTweensOf(el);
        window.gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
          clearProps: 'transform'
        });
      };
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        window.gsap.to(el, {
          x: dx * 0.24,
          y: dy * 0.24,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      el.addEventListener('mouseleave', resetMagnetic);
      el.addEventListener('blur', resetMagnetic);
    });
  }

  // 7. Glowing Scroll-Scrubbed Timeline (Education & Experience)
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.timeline-wrapper').forEach((wrapper) => {
      const fill = wrapper.querySelector('.timeline-rail-fill');
      const dot = wrapper.querySelector('.timeline-rail-dot');
      if (fill) {
        window.gsap.fromTo(
          fill,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 78%',
              end: 'bottom 45%',
              scrub: 0.4
            }
          }
        );
      }
      if (dot) {
        window.gsap.fromTo(
          dot,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 78%',
              end: 'bottom 45%',
              scrub: 0.4
            }
          }
        );
      }
    });
  }

  // 8. Sticky Project Counter (01., 02., 03.) & Floating Hover Preview Image
  const stickyNumEl = document.getElementById('project-sticky-num');
  const stickyLabelEl = document.getElementById('project-sticky-label');
  const stickyDots = document.querySelectorAll('.sticky-dot');
  const allProjectCards = [...document.querySelectorAll('#projects .project-card')];
  let activeProjectIndex = 0;

  const getLocalizedProjectTitle = (card) => {
    if (!card) return '';
    const h3 = card.querySelector('h3');
    const i18nKey = h3 ? h3.getAttribute('data-i18n') : null;
    const currentLang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    if (i18nKey && i18n[currentLang] && i18n[currentLang][i18nKey]) {
      return i18n[currentLang][i18nKey];
    }
    return h3 ? h3.textContent.trim() : '';
  };

  const setActiveProjectCounter = (index, forceUpdate = false) => {
    if (!allProjectCards.length) return;
    const clampedIdx = Math.max(0, Math.min(allProjectCards.length - 1, index));
    const card = allProjectCards[clampedIdx];
    const numStr = card.getAttribute('data-project-num') || `0${clampedIdx + 1}.`;
    const h3 = card.querySelector('h3');
    const i18nKey = h3 ? h3.getAttribute('data-i18n') : null;
    const titleText = getLocalizedProjectTitle(card);
    const prevIdx = activeProjectIndex;
    activeProjectIndex = clampedIdx;

    if (stickyNumEl && stickyNumEl.textContent !== numStr) {
      const slideOffset = clampedIdx >= prevIdx ? -14 : 14;
      if (typeof window.gsap !== 'undefined' && !prefersReducedMotion) {
        window.gsap.killTweensOf(stickyNumEl);
        window.gsap.fromTo(
          stickyNumEl,
          { y: slideOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
            onStart: () => {
              stickyNumEl.textContent = numStr;
            }
          }
        );
      } else {
        stickyNumEl.textContent = numStr;
      }
    }

    if (stickyLabelEl) {
      if (i18nKey) {
        stickyLabelEl.setAttribute('data-i18n', i18nKey);
      }
      if ((titleText && stickyLabelEl.textContent !== titleText) || forceUpdate) {
        stickyLabelEl.textContent = titleText;
      }
    }

    stickyDots.forEach((d, idx) => d.classList.toggle('active', idx === clampedIdx));
  };

  const updateProjectIndexFromViewport = (forceUpdate = false) => {
    if (!allProjectCards.length) return;
    const viewportCenter = window.innerHeight * 0.5;
    let bestIndex = activeProjectIndex;
    let minDistance = Infinity;

    for (let i = 0; i < allProjectCards.length; i++) {
      const rect = allProjectCards[i].getBoundingClientRect();
      let distance;
      if (viewportCenter >= rect.top && viewportCenter <= rect.bottom) {
        const cardCenter = (rect.top + rect.bottom) * 0.5;
        distance = Math.abs(cardCenter - viewportCenter) * 0.01;
      } else {
        distance = Math.min(Math.abs(rect.top - viewportCenter), Math.abs(rect.bottom - viewportCenter));
      }
      if (distance < minDistance) {
        minDistance = distance;
        bestIndex = i;
      }
    }

    setActiveProjectCounter(bestIndex, forceUpdate);
  };

  syncProjectCounterLanguage = () => {
    setActiveProjectCounter(activeProjectIndex, true);
  };

  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    allProjectCards.forEach((card, index) => {
      window.ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveProjectCounter(index),
        onEnterBack: () => setActiveProjectCounter(index),
        onLeaveBack: () => {
          if (index > 0) setActiveProjectCounter(index - 1);
        }
      });
    });
  }

  let projectCounterRaf = null;
  const handleProjectCounterScroll = () => {
    if (!projectCounterRaf) {
      projectCounterRaf = requestAnimationFrame(() => {
        updateProjectIndexFromViewport(false);
        projectCounterRaf = null;
      });
    }
  };

  window.addEventListener('scroll', handleProjectCounterScroll, { passive: true });
  window.addEventListener('resize', () => updateProjectIndexFromViewport(true), { passive: true });
  if (lenis && typeof lenis.on === 'function') {
    lenis.on('scroll', handleProjectCounterScroll);
  }
  updateProjectIndexFromViewport(true);

  // Floating Hover Image Preview on Project Titles
  const hoverPreview = document.getElementById('project-hover-preview');
  const hoverPreviewImg = document.getElementById('project-hover-preview-img');
  const hoverPreviewTag = document.getElementById('project-hover-preview-tag');
  const projectHoverTitles = document.querySelectorAll('.project-hover-title');

  if (hoverPreview && isDesktopPointer && typeof window.gsap !== 'undefined') {
    const previewX = window.gsap.quickTo(hoverPreview, 'left', { duration: 0.25, ease: 'power3.out' });
    const previewY = window.gsap.quickTo(hoverPreview, 'top', { duration: 0.25, ease: 'power3.out' });

    window.addEventListener(
      'mousemove',
      (e) => {
        if (hoverPreview.classList.contains('is-visible')) {
          previewX(e.clientX);
          previewY(e.clientY);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'scroll',
      () => {
        if (hoverPreview.classList.contains('is-visible')) {
          hoverPreview.classList.remove('is-visible');
        }
      },
      { passive: true }
    );

    projectHoverTitles.forEach((titleEl) => {
      titleEl.addEventListener('mouseenter', (e) => {
        const imgSrc = titleEl.getAttribute('data-preview-img');
        const tagText = titleEl.getAttribute('data-preview-tag') || 'View Project ↗';
        if (hoverPreviewImg && imgSrc) hoverPreviewImg.src = imgSrc;
        if (hoverPreviewTag) hoverPreviewTag.textContent = tagText;
        previewX(e.clientX);
        previewY(e.clientY);
        hoverPreview.classList.add('is-visible');
      });
      titleEl.addEventListener('mouseleave', () => {
        hoverPreview.classList.remove('is-visible');
      });
    });
  }

  // 9. Curved Fullscreen Overlay Menu (Hamburger Button + Curved Drop + Staggered Links)
  const floatingMenuBtn = document.getElementById('floating-menu-btn');
  const curvedOverlayMenu = document.getElementById('curved-overlay-menu');
  const curvedOverlayClose = document.getElementById('curved-overlay-close');
  const curvedOverlayPath = document.getElementById('curved-overlay-path');
  const curvedNavItems = document.querySelectorAll('.curved-nav-item');

  const setCurvedMenu = (open) => {
    if (!curvedOverlayMenu || isCurvedMenuOpen === open) return;
    isCurvedMenuOpen = open;
    if (floatingMenuBtn) {
      floatingMenuBtn.classList.toggle('is-open', open);
      floatingMenuBtn.setAttribute('aria-expanded', String(open));
    }
    curvedOverlayMenu.setAttribute('aria-hidden', String(!open));
    syncLenisScrollState();

    if (typeof window.gsap !== 'undefined') {
      if (open) {
        curvedOverlayMenu.classList.add('is-open');
        if (curvedOverlayPath) {
          window.gsap.set(curvedOverlayPath, {
            attr: { d: 'M0,0 L1440,0 L1440,60 Q720,180 0,60 Z' }
          });
        }
        window.gsap.to(curvedOverlayMenu, {
          y: '0%',
          duration: 0.75,
          ease: 'power4.out'
        });
        if (curvedOverlayPath) {
          window.gsap.to(curvedOverlayPath, {
            attr: { d: 'M0,0 L1440,0 L1440,0 Q720,0 0,0 Z' },
            duration: 0.85,
            ease: 'power3.out'
          });
        }
        window.gsap.fromTo(
          curvedNavItems,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.055,
            delay: 0.18,
            ease: 'power3.out'
          }
        );
      } else {
        if (curvedOverlayPath) {
          window.gsap.to(curvedOverlayPath, {
            attr: { d: 'M0,0 L1440,0 L1440,50 Q720,170 0,50 Z' },
            duration: 0.35,
            ease: 'power2.in'
          });
        }
        window.gsap.to(curvedOverlayMenu, {
          y: '-105%',
          duration: 0.65,
          ease: 'power4.inOut',
          onComplete: () => {
            curvedOverlayMenu.classList.remove('is-open');
          }
        });
      }
    } else {
      curvedOverlayMenu.classList.toggle('is-open', open);
      curvedOverlayMenu.style.transform = open ? 'translateY(0%)' : 'translateY(-105%)';
    }
  };

  if (floatingMenuBtn) {
    floatingMenuBtn.addEventListener('click', () => setCurvedMenu(!isCurvedMenuOpen));
  }
  if (curvedOverlayClose) {
    curvedOverlayClose.addEventListener('click', () => setCurvedMenu(false));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCurvedMenuOpen) {
      setCurvedMenu(false);
    }
  });

  // Smooth anchor navigation via Lenis (closes mobile & curved menus automatically)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
          setMobileMenu(false);
        }
        if (isCurvedMenuOpen) {
          setCurvedMenu(false);
        }
        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: href === '#home' ? 0 : -92,
            duration: 1.2
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 11. Smooth Blur-Slide Animation for Section Headings (h2) on Scroll
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    window.gsap.registerPlugin(window.ScrollTrigger);

    const sectionTitles = document.querySelectorAll('h2.section-title, .contact-copy h2');
    sectionTitles.forEach((heading) => {
      window.gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 25,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto',
          clearProps: 'filter,transform',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  // 11b. Global Ambient Mouse Spotlight (Halo) — instant, high-priority tracking
  const globalMouseGlow = document.getElementById('global-mouse-glow');
  if (globalMouseGlow) {
    window.addEventListener(
      'mousemove',
      (e) => {
        const px = e.clientX + 'px';
        const py = e.clientY + 'px';
        document.documentElement.style.setProperty('--mouse-x', px);
        document.documentElement.style.setProperty('--mouse-y', py);
        globalMouseGlow.style.setProperty('--mouse-x', px);
        globalMouseGlow.style.setProperty('--mouse-y', py);
      },
      { passive: true, capture: true }
    );
  }

  // 12. Top Scroll Progress Bar (Smooth scaleX from 0 to 1)
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  if (scrollProgressBar) {
    let progressRaf = null;
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
      scrollProgressBar.style.transform = `scaleX(${progress})`;
      progressRaf = null;
    };

    const onScrollProgress = () => {
      if (!progressRaf) {
        progressRaf = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('resize', onScrollProgress, { passive: true });
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScrollProgress);
    }
    updateScrollProgress();
  }

  // 13. Spotlight Mouse Tracking & Zero-Latency 3D Perspective Tilt on Project, Skill, Certificate, Achievement & Education Cards (Desktop Only)
  const tiltCardSelector = '.project-card, .skill-item-card, .certificate-card, .achievement-card, .education-card';
  const tiltCards = document.querySelectorAll(tiltCardSelector);
  tiltCards.forEach((card) => {
    const canTilt = isDesktopPointer && !prefersReducedMotion;
    let resetTimer = null;

    const clearInlineTilt = () => {
      // Hand control back to CSS / GSAP reveal once the card is flat again
      if (card.matches(':hover')) return;
      card.style.removeProperty('transform');
      card.style.removeProperty('transition');
      card.style.removeProperty('will-change');
    };

    card.addEventListener('mouseenter', () => {
      if (!canTilt) return;
      if (resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null;
      }
      // Kill any active GSAP transform tweens so they can't fight the direct style updates
      if (window.gsap) window.gsap.killTweensOf(card, 'transform,x,y,scale,rotateX,rotateY,rotation');
      // Strip the transform transition inline (!important) so CSS / AOS / .reveal cannot delay mouse tracking
      card.style.setProperty('transition', 'border-color 0.3s ease, box-shadow 0.3s ease', 'important');
      card.style.setProperty('will-change', 'transform', 'important');
    });

    card.addEventListener(
      'mousemove',
      (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Inner spotlight coordinates
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        if (!canTilt) return;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -9;
        const rotateY = ((x - centerX) / centerX) * 9;
        card.style.setProperty(
          'transform',
          'perspective(900px) translateY(-6px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) scale3d(1.015, 1.015, 1.015)',
          'important'
        );
      },
      { passive: true }
    );

    card.addEventListener('mouseleave', () => {
      if (!canTilt) return;
      // Smooth transition ONLY for the reset back to flat
      card.style.setProperty(
        'transition',
        'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        'important'
      );
      card.style.setProperty(
        'transform',
        'perspective(900px) translateY(0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        'important'
      );
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(clearInlineTilt, 520);
    });
  });

  // 14. Projects Section Scroll Reveal (Repeatable GSAP ScrollTrigger + AOS Sync, Never Stuck Hidden)
  const projectsSection = document.getElementById('projects');
  const projectCards = document.querySelectorAll('#projects .project-card');

  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && projectCards.length && !prefersReducedMotion) {
    projectCards.forEach((card, index) => {
      window.ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        end: 'bottom 15%',
        onEnter: () => {
          window.gsap.fromTo(
            card,
            { opacity: 0, y: 42, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              delay: index * 0.06,
              ease: 'power3.out',
              overwrite: 'auto',
              clearProps: 'transform'
            }
          );
        },
        onEnterBack: () => {
          window.gsap.fromTo(
            card,
            { opacity: 0, y: -32, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: 'power3.out',
              overwrite: 'auto',
              clearProps: 'transform'
            }
          );
        }
      });
    });
  } else if (projectCards.length) {
    projectCards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }

  // 15. Thumbnail Zoom on Project Cards (the 3D tilt itself lives in the unified zero-latency handler in section 13)
  projectCards.forEach((card) => {
    const visualTargets = card.querySelectorAll('.mockup-porto-img, .device-mockup');
    if (!visualTargets.length) return;

    card.addEventListener('mouseenter', () => {
      if (isDesktopPointer && typeof window.gsap !== 'undefined' && !prefersReducedMotion) {
        window.gsap.to(visualTargets, {
          scale: 1.035,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (typeof window.gsap !== 'undefined') {
        window.gsap.to(visualTargets, {
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });
  });

  // 16. Directional Button Hover Fill (Magnetic Ripple from Cursor Entry)
  const directionalBtns = document.querySelectorAll(
    '.hero-cv-btn, .project-live-btn, .project-repo-btn, #contact-submit-btn, .qi-cta-btn, .cert-btn, .cert-modal-btn'
  );
  directionalBtns.forEach((btn) => {
    btn.classList.add('directional-btn');
    const updateBtnCoords = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--btn-x', `${x}px`);
      btn.style.setProperty('--btn-y', `${y}px`);
    };
    btn.addEventListener('mouseenter', updateBtnCoords, { passive: true });
    btn.addEventListener('mousemove', updateBtnCoords, { passive: true });
  });

  // 17. Animated Number Counters on Scroll (Stats & Skill Tab Counts; Excludes Project Index & Terminal Code)
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const formatCountVal = (num, useArabicDigits) => {
      const str = String(Math.round(num));
      if (!useArabicDigits) return str;
      return str.replace(/\d/g, (d) => arDigits[Number(d)] || d);
    };

    const countElements = document.querySelectorAll('[data-count-target]');
    countElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-count-target') || '0');
      if (isNaN(targetVal) || targetVal <= 0) return;
      const suffixHtml = el.getAttribute('data-count-suffix') || '';
      const i18nKey = el.getAttribute('data-i18n');

      const counterState = { val: 0 };
      window.ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const isAr = document.documentElement.lang === 'ar' && !!i18nKey;
          window.gsap.fromTo(
            counterState,
            { val: 0 },
            {
              val: targetVal,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                const useAr = document.documentElement.lang === 'ar' && !!i18nKey;
                el.innerHTML = `${formatCountVal(counterState.val, useAr)}${suffixHtml}`;
              },
              onComplete: () => {
                const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
                if (i18nKey && i18n[lang] && i18n[lang][i18nKey] !== undefined) {
                  el.innerHTML = i18n[lang][i18nKey];
                } else {
                  el.innerHTML = `${formatCountVal(targetVal, isAr)}${suffixHtml}`;
                }
              }
            }
          );
        }
      });
    });
  }

  // 18. GSAP + ScrollTrigger Staggered Reveal Animations for Skills & Certificates
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    // Active skill panel cards staggered reveal
    const activeSkillCards = window.gsap.utils.toArray('.skills-panel.active .skill-item-card');
    if (activeSkillCards.length) {
      window.gsap.fromTo(
        activeSkillCards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.skills-tabs-container',
            start: 'top 86%',
            once: true
          }
        }
      );
    }

    // Stagger skill cards when switching tabs
    skillsTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetPanelId = tab.getAttribute('aria-controls');
        const panel = targetPanelId ? document.getElementById(targetPanelId) : null;
        if (panel) {
          const cards = panel.querySelectorAll('.skill-item-card');
          window.gsap.fromTo(
            cards,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.04,
              ease: 'power2.out',
              clearProps: 'transform'
            }
          );
        }
      });
    });

    // Certificate cards staggered reveal
    const certCards = window.gsap.utils.toArray('.certificate-card');
    if (certCards.length) {
      window.gsap.fromTo(
        certCards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.certificates-grid',
            start: 'top 88%',
            once: true
          }
        }
      );
    }

    window.addEventListener(
      'load',
      () => {
        window.ScrollTrigger.refresh();
      },
      { once: true }
    );
  }

  // 17. Re-sync scroll-triggered animations with the compact section spacing after layout settles
  const refreshScrollLayout = () => {
    if (typeof window.ScrollTrigger !== 'undefined') window.ScrollTrigger.refresh();
    if (typeof window.AOS !== 'undefined' && typeof window.AOS.refresh === 'function') window.AOS.refresh();
  };
  if (document.readyState === 'complete') {
    setTimeout(refreshScrollLayout, 120);
  } else {
    window.addEventListener('load', () => setTimeout(refreshScrollLayout, 120), { once: true });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(refreshScrollLayout, 60));
  }
  // Final safety refresh once the preloader reveal has finished and the hero has its final height
  setTimeout(refreshScrollLayout, 4200);
  let refreshResizeTimer = null;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(refreshResizeTimer);
      refreshResizeTimer = setTimeout(refreshScrollLayout, 200);
    },
    { passive: true }
  );
})();

