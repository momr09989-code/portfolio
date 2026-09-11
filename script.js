(() => {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  const icon = toggle.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const profileImage = document.getElementById('profile-image');
  const profileFrame = document.querySelector('.profile-frame');

  const setTheme = (theme) => {
    const isLight = theme === 'light';
    body.classList.toggle('light-mode', isLight);
    icon.textContent = isLight ? '☾' : '☀';
    toggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', isLight ? '#f3f7f3' : '#081012');
  };

  const savedTheme = localStorage.getItem('omar-theme');
  if (savedTheme) setTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const theme = body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem('omar-theme', theme);
    setTheme(theme);
  });

  const setMenu = (isOpen) => {
    nav.classList.toggle('open', isOpen);
    body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  };

  menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    setMenu(false);
  }));

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700 && nav.classList.contains('open')) setMenu(false);
  });

  profileImage.addEventListener('error', () => profileFrame.classList.add('no-image'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
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

  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please complete all fields with a valid email address.';
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = `${data.get('subject')} — Portfolio enquiry from ${data.get('name')}`;
    const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    status.textContent = 'Opening your email app with your message…';
    window.location.href = `mailto:momr09989@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
})();
