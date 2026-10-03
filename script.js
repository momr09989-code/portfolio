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

  // Certificate Image Modals / Popups
  let lastFocusedElement = null;

  const openCertModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    const closeBtn = modal.querySelector('.cert-modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeCertModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
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
})();
