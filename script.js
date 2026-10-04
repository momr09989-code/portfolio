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
    body.classList.toggle('light-mode', isLight);
    themeToggles.forEach((t) => {
      const icon = t.querySelector('.theme-icon');
      if (icon) icon.textContent = isLight ? '☾' : '☀';
      const text = t.querySelector('.theme-text');
      if (text) text.textContent = isLight ? 'Light' : 'Dark';
      t.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    });
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f3f7f3' : '#081012');
  };

  const savedTheme = localStorage.getItem('omar-theme');
  if (savedTheme) setTheme(savedTheme);

  themeToggles.forEach((t) => {
    t.addEventListener('click', () => {
      const theme = body.classList.contains('light-mode') ? 'dark' : 'light';
      localStorage.setItem('omar-theme', theme);
      setTheme(theme);
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
    "hero-scroll": "Scroll to explore",
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
    "stat-proj-val": "3",
    "stat-proj-lbl": "Core projects",
    "edu-num": "02",
    "edu-label": "Education &amp; Certificates",
    "edu-kicker": "2024 — 2028 <span>•</span> Cairo, Egypt",
    "edu-degree": "Bachelor of Computer Science &amp; Information Technology <span>(CSIT)</span>",
    "edu-school": "Helwan National University <span class=\"abbr\">HNU</span>",
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
    "hero-scroll": "مرر للاستكشاف",
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
    "stat-proj-val": "٣",
    "stat-proj-lbl": "مشاريع عملية رئيسية",
    "edu-num": "٠٢",
    "edu-label": "التعليم والشهادات",
    "edu-kicker": "٢٠٢٤ — ٢٠٢٨ <span>•</span> القاهرة، مصر",
    "edu-degree": "بكالوريوس علوم الحاسب وتكنولوجيا المعلومات <span>(CSIT)</span>",
    "edu-school": "جامعة حلوان الأهلية <span class=\"abbr\">HNU</span>",
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
  };

  const savedLang = localStorage.getItem('omar-lang') || 'en';
  if (savedLang === 'ar') setLanguage('ar');

  langToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
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
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));

  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Certificate Image Modals / Popups
  let lastFocusedElement = null;

  const openCertModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
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
    const video = modal.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    const closeBtn = modal.querySelector('.cert-modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeCertModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    const video = modal.querySelector('video');
    if (video) {
      video.pause();
    }
    if (!document.querySelector('.cert-modal.is-open')) {
      body.classList.remove('modal-open');
    }
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
      if (targetId) openCertModal(targetId);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.target.closest('a')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        const targetId = trigger.getAttribute('data-open-modal');
        if (targetId) openCertModal(targetId);
      }
    });
  });

  document.querySelectorAll('.cert-modal [data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const modal = btn.closest('.cert-modal');
      closeCertModal(modal);
    });
  });

  document.querySelectorAll('.cert-modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.cert-modal.is-open');
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
})();
