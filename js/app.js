// Trisage Solutions — bootstraps every page: injects chrome/nav/footer,
// renders the page's sections from sections.js, then wires up all behavior
// (scroll reveals, forms, marquees, dropdowns, GSAP hero, etc).

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const PAGE_CONFIG = {
  home: { navHref: 'index.html' },
  about: { navHref: 'about.html' },
  services: { navHref: 'services.html' },
  'hire-talent': { navHref: 'hire-talent.html' },
  industries: { navHref: 'industries.html' },
  'how-it-works': { navHref: 'how-it-works.html' },
  'case-studies': { navHref: 'case-studies.html' },
  contact: { navHref: 'contact.html' },
  'book-a-call': { navHref: 'book-a-call.html' },
  careers: { navHref: 'careers.html' },
  blog: { navHref: 'blog.html' },
};

function buildPageContent(page) {
  switch (page) {
    case 'home':
      return (
        renderHero() +
        renderValueProp() +
        renderServicesSection() +
        renderIndustries(true) +
        renderProcess() +
        renderWhyChoose() +
        renderTestimonials() +
        renderFAQ() +
        renderContactSection(true) +
        renderBookACall()
      );
    case 'about':
      return (
        renderPageHeader({
          eyebrow: 'About Us',
          title: 'The Talent Partner Behind Your Growth',
          gradientWords: ['Growth'],
          description: 'Rigorous recruitment, background screening, and training infrastructure — built for operational resilience at global scale.',
        }) + renderAbout() + renderWhyChoose()
      );
    case 'services':
      return (
        renderPageHeader({
          eyebrow: 'Services',
          title: 'Every Engagement Model You Need',
          gradientWords: ['Engagement'],
          description: 'Eight staffing models, one team — from dedicated engineers to compliance-ready specialists.',
        }) + renderServiceDetails() + renderWhyChoose() + renderFAQ()
      );
    case 'hire-talent':
      return (
        renderPageHeader({
          eyebrow: 'Hire Talent',
          title: 'Browse Talent By Skillset',
          gradientWords: ['Skillset'],
          description: 'The top-level directory for every role we staff — pick a category to see exactly what you get.',
        }) + renderHireTalentGrid()
      );
    case 'industries':
      return (
        renderPageHeader({
          eyebrow: 'Industries',
          title: 'Talent Matched To Your Industry',
          gradientWords: ['Industry'],
          description: 'Regulatory and operational realities differ by sector — our vetting and training reflect that.',
        }) + renderIndustries(false) + renderFAQ()
      );
    case 'how-it-works':
      return (
        renderPageHeader({
          eyebrow: 'How It Works',
          title: 'From First Call To Embedded Team Member',
          gradientWords: ['Embedded'],
          description: 'A structured four-stage pipeline designed to remove friction and guarantee continuity.',
        }) + renderProcess() + renderWhyChoose()
      );
    case 'case-studies':
      return (
        renderPageHeader({
          eyebrow: 'Case Studies',
          title: 'Results That Speak in Numbers',
          gradientWords: ['Numbers'],
          description: 'Overhead reduced, hiring accelerated, output scaled — real placements, real outcomes.',
        }) + renderPortfolioSection() + renderTestimonials()
      );
    case 'contact':
      return (
        renderPageHeader({
          eyebrow: 'Contact',
          title: 'Start Building Your Team Today',
          gradientWords: ['Team'],
          description: 'Free consultation, clear scoping, a vetted shortlist within 48 hours — no surprises.',
        }) + renderContactSection(false) + renderFAQ()
      );
    case 'book-a-call':
      return (
        renderPageHeader({
          eyebrow: 'Book A Call',
          title: 'Schedule Your Free Call',
          gradientWords: ['Free', 'Call'],
          description: "15 minutes, zero pressure — pick a date and time and we'll send you a Google Meet or Zoom link.",
        }) + renderBookCallForm()
      );
    case 'careers':
      return (
        renderPageHeader({
          eyebrow: 'Careers',
          title: 'Work With Trisage Solutions',
          gradientWords: ['Trisage'],
          description: 'Looking for a remote role, not looking to hire? This page is for you.',
        }) + renderCareersContent()
      );
    case 'blog':
      return (
        renderPageHeader({
          eyebrow: 'Blog',
          title: 'The Knowledge Center',
          gradientWords: ['Knowledge'],
          description: 'Resources on remote team management, global payroll compliance, and operational efficiency.',
        }) + renderBlogContent()
      );
    default:
      return '';
  }
}

function initPage() {
  const page = document.body.dataset.page;
  const cfg = PAGE_CONFIG[page] || PAGE_CONFIG.home;

  document.getElementById('chrome-root').innerHTML = renderChrome();
  document.getElementById('navbar-root').innerHTML = renderNavbar(cfg.navHref);
  document.getElementById('main-content').innerHTML = buildPageContent(page);
  document.getElementById('footer-root').innerHTML = renderFooter();

  if (window.lucide) window.lucide.createIcons();

  initPreloader();
  initNavbar();
  initNavDropdowns();
  initMobileMenu();
  initScrollProgress();
  initCustomCursor();
  initThemeToggle();
  initRevealObserver();
  initCounters();
  initFAQAccordion();
  initBackToTop();
  document.querySelectorAll('.country-select').forEach(initCountrySelect);

  if (page === 'case-studies') initPortfolioFilters();
  if (page === 'home') {
    initHeroAnimation();
    initServicesTilt();
    initPacificBanner();
  }
  if (document.getElementById('process-track')) initProcessLine();
  if (document.getElementById('contact-form')) initContactForm();
  if (document.getElementById('book-form')) initBookForm();
}

document.addEventListener('DOMContentLoaded', initPage);

/* ---------------------------------------------------------------- */
/* Preloader                                                         */
/* ---------------------------------------------------------------- */

function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 550);
  }, 500);
}

/* ---------------------------------------------------------------- */
/* Navbar                                                             */
/* ---------------------------------------------------------------- */

function initNavbar() {
  const header = document.getElementById('navbar');
  const pill = document.getElementById('navbar-pill');
  if (!header || !pill) return;

  setTimeout(() => {
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }, 900);

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    pill.classList.toggle('border-white/10', scrolled);
    pill.classList.toggle('bg-ink-deep/85', scrolled);
    pill.classList.toggle('shadow-[0_10px_40px_rgba(0,0,0,0.45)]', scrolled);
    pill.classList.toggle('backdrop-blur-xl', scrolled);
    pill.classList.toggle('border-white/8', !scrolled);
    pill.classList.toggle('bg-ink-deep/60', !scrolled);
    pill.classList.toggle('backdrop-blur-lg', !scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.innerHTML = open
      ? '<i data-lucide="x" class="h-5 w-5"></i>'
      : '<i data-lucide="menu" class="h-5 w-5"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      open = false;
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initNavDropdowns() {
  document.querySelectorAll('.nav-dropdown').forEach((dd) => {
    const panel = dd.querySelector('.nav-dropdown-panel');
    const caret = dd.querySelector('.nav-dropdown-caret');
    if (!panel) return;
    const show = () => {
      panel.classList.remove('invisible', 'opacity-0');
      panel.classList.add('opacity-100');
      panel.style.transform = 'translate(-50%, 4px)';
      if (caret) caret.style.transform = 'rotate(180deg)';
    };
    const hide = () => {
      panel.classList.add('invisible', 'opacity-0');
      panel.classList.remove('opacity-100');
      panel.style.transform = 'translate(-50%, 0)';
      if (caret) caret.style.transform = '';
    };
    dd.addEventListener('mouseenter', show);
    dd.addEventListener('mouseleave', hide);
    dd.addEventListener('focusin', show);
    dd.addEventListener('focusout', (e) => {
      if (!dd.contains(e.relatedTarget)) hide();
    });
  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------------- */
/* Scroll progress bar                                                */
/* ---------------------------------------------------------------- */

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------------------------------------------------------------- */
/* Custom cursor                                                     */
/* ---------------------------------------------------------------- */

function initCustomCursor() {
  const ring = document.getElementById('cursor-ring');
  const dot = document.getElementById('cursor-dot');
  if (!ring || !dot) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let dotX = -100, dotY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const isPointer = !!e.target.closest('a, button, [role="button"], input, textarea, select');
    ring.classList.toggle('hover', isPointer);
  });

  function tick() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    dotX += (mouseX - dotX) * 0.38;
    dotY += (mouseY - dotY) * 0.38;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------- */
/* Theme toggle                                                      */
/* ---------------------------------------------------------------- */

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const knob = document.getElementById('theme-knob');
  if (!btn || !knob) return;

  const apply = (theme) => {
    document.documentElement.classList.toggle('light', theme === 'light');
    knob.style.marginLeft = theme === 'light' ? 'auto' : '0';
    knob.innerHTML = theme === 'light'
      ? '<i data-lucide="sun" class="h-3.5 w-3.5 text-[#404041]"></i>'
      : '<i data-lucide="moon" class="h-3.5 w-3.5 text-[#404041]"></i>';
    if (window.lucide) window.lucide.createIcons();
  };

  const stored = localStorage.getItem('trisage-theme') || 'dark';
  apply(stored);

  setTimeout(() => { btn.style.opacity = '1'; }, 2000);

  btn.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    apply(next);
    localStorage.setItem('trisage-theme', next);
  });
}

/* ---------------------------------------------------------------- */
/* Scroll reveal (generic replacement for Framer Motion whileInView)  */
/* ---------------------------------------------------------------- */

let revealObserver;

function initRevealObserver() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0 },
  );
  observeReveals(document);
}

function observeReveals(root) {
  const els = root.querySelectorAll('.reveal, .reveal-scale, .reveal-x-left, .reveal-x-right, [data-reveal-word]');
  els.forEach((el) => {
    if (!el.dataset.revealBound) {
      el.dataset.revealBound = '1';
      revealObserver.observe(el);
    }
  });
}

/* ---------------------------------------------------------------- */
/* Animated counters                                                  */
/* ---------------------------------------------------------------- */

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target;
        const value = parseFloat(el.dataset.value);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(eased * value)}${suffix}`;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0 },
  );
  counters.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------- */
/* FAQ accordion                                                      */
/* ---------------------------------------------------------------- */

function initFAQAccordion() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  const items = Array.from(list.children);

  items.forEach((item) => {
    const toggle = item.querySelector('[data-faq-toggle]');
    const panel = item.querySelector('.faq-panel');
    const question = item.querySelector('.faq-question');
    const plusWrap = item.querySelector('.faq-plus-wrap');
    const plus = item.querySelector('.faq-plus');

    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.contains('open');
      items.forEach((other) => {
        other.querySelector('.faq-panel').classList.remove('open');
        other.querySelector('.faq-plus').classList.remove('open');
        other.querySelector('.faq-question').classList.remove('text-limeglow');
        other.querySelector('.faq-question').classList.add('text-creamy');
        other.querySelector('.faq-plus-wrap').classList.remove('bg-limeglow', 'text-[#404041]');
        other.querySelector('.faq-plus-wrap').classList.add('border', 'border-creamy/20', 'text-creamy/60');
      });
      if (!isOpen) {
        panel.classList.add('open');
        plus.classList.add('open');
        question.classList.remove('text-creamy');
        question.classList.add('text-limeglow');
        plusWrap.classList.remove('border', 'border-creamy/20', 'text-creamy/60');
        plusWrap.classList.add('bg-limeglow', 'text-[#404041]');
      }
    });
  });
}

/* ---------------------------------------------------------------- */
/* Portfolio filters                                                  */
/* ---------------------------------------------------------------- */

function initPortfolioFilters() {
  const wrap = document.getElementById('portfolio-filters');
  const rows = document.getElementById('portfolio-rows');
  if (!wrap || !rows) return;

  wrap.querySelectorAll('.portfolio-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      wrap.querySelectorAll('.portfolio-filter-btn').forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('text-[#404041]', isActive);
        b.classList.toggle('border', !isActive);
        b.classList.toggle('border-creamy/15', !isActive);
        b.classList.toggle('text-creamy/55', !isActive);
        const existingPill = b.querySelector('span.absolute.inset-0');
        if (existingPill) existingPill.remove();
        if (isActive) {
          b.insertAdjacentHTML('afterbegin', '<span class="absolute inset-0 rounded-full bg-limeglow shadow-[0_8px_30px_rgba(231,255,158,0.3)]"></span>');
        }
      });
      rows.innerHTML = renderPortfolioRows(category);
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

/* ---------------------------------------------------------------- */
/* Country select (phone dial code picker)                            */
/* ---------------------------------------------------------------- */

function initCountrySelect(container) {
  const btn = container.querySelector('[data-country-btn]');
  const panel = container.querySelector('[data-country-panel]');
  const list = container.querySelector('[data-country-list]');
  const search = container.querySelector('[data-country-search]');
  const flagImg = container.querySelector('[data-country-flag]');
  const dialSpan = container.querySelector('[data-country-dial]');
  const nameInput = container.querySelector('[data-country-name]');

  function renderList(query) {
    const q = (query || '').toLowerCase();
    const filtered = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q));
    if (filtered.length === 0) {
      list.innerHTML = '<li class="px-3 py-4 text-center text-sm text-creamy/40">No matches</li>';
      return;
    }
    list.innerHTML = filtered.map((c) => `
      <li>
        <button type="button" data-iso="${c.iso}" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors text-creamy/70 hover:bg-white/5 hover:text-creamy">
          <img src="https://flagcdn.com/w40/${c.iso}.png" alt="${c.name}" width="20" height="15" class="h-[15px] w-5 rounded-[2px] object-cover" />
          <span class="flex-1 truncate">${c.name}</span>
          <span class="text-creamy/45">${c.dial}</span>
        </button>
      </li>`).join('');
    list.querySelectorAll('button[data-iso]').forEach((li) => {
      li.addEventListener('click', () => {
        const c = COUNTRIES.find((x) => x.iso === li.dataset.iso);
        if (!c) return;
        flagImg.src = `https://flagcdn.com/w40/${c.iso}.png`;
        flagImg.alt = c.name;
        dialSpan.textContent = c.dial;
        nameInput.value = c.name;
        nameInput.dataset.iso = c.iso;
        nameInput.dataset.dial = c.dial;
        panel.classList.add('hidden');
      });
    });
  }
  renderList('');
  nameInput.dataset.iso = 'us';
  nameInput.dataset.dial = '+1';

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (willOpen && search) {
      search.value = '';
      renderList('');
      setTimeout(() => search.focus(), 0);
    }
  });

  if (search) {
    search.addEventListener('input', () => renderList(search.value));
  }

  document.addEventListener('mousedown', (e) => {
    if (!container.contains(e.target)) panel.classList.add('hidden');
  });
}

/* ---------------------------------------------------------------- */
/* Contact form                                                       */
/* ---------------------------------------------------------------- */

function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  const errorEl = document.getElementById('contact-error');
  const submitBtn = form.querySelector('button[type="submit"]');
  const idle = submitBtn.querySelector('[data-btn-idle]');
  const sending = submitBtn.querySelector('[data-btn-sending]');
  const countryInput = form.querySelector('.country-select [data-country-name]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');
    idle.classList.add('hidden');
    sending.classList.remove('hidden');
    sending.classList.add('inline-flex');
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const dial = countryInput ? countryInput.dataset.dial || '+1' : '+1';
      data.set('phone', `${dial} ${data.get('phone') || ''}`);
      data.set('country', countryInput ? countryInput.value : '');
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Request failed');
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.classList.add('flex');
      form.reset();
    } catch (err) {
      errorEl.classList.remove('hidden');
      idle.classList.remove('hidden');
      sending.classList.add('hidden');
      sending.classList.remove('inline-flex');
      submitBtn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------- */
/* Book-a-call page                                                   */
/* ---------------------------------------------------------------- */

function initBookForm() {
  const form = document.getElementById('book-form');
  const success = document.getElementById('book-success');
  const successCopy = document.getElementById('book-success-copy');
  const errorEl = document.getElementById('book-error');
  const submitBtn = form.querySelector('button[type="submit"]');
  const idle = submitBtn.querySelector('[data-btn-idle]');
  const sending = submitBtn.querySelector('[data-btn-sending]');
  const countryInput = form.querySelector('.country-select [data-country-name]');
  const platformInput = document.getElementById('platform-input');
  const dateInput = document.getElementById('bdate');

  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  let platform = 'Google Meet';
  form.querySelectorAll('.platform-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      platform = btn.dataset.platform;
      platformInput.value = platform;
      form.querySelectorAll('.platform-btn').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('border-limeglow', active);
        b.classList.toggle('bg-limeglow/15', active);
        b.classList.toggle('text-limeglow', active);
        b.classList.toggle('border-creamy/12', !active);
        b.classList.toggle('bg-white/[0.04]', !active);
        b.classList.toggle('text-creamy/60', !active);
      });
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');
    idle.classList.add('hidden');
    sending.classList.remove('hidden');
    sending.classList.add('inline-flex');
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const dial = countryInput ? countryInput.dataset.dial || '+1' : '+1';
      data.set('phone', `${dial} ${data.get('phone') || ''}`);
      data.set('country', countryInput ? countryInput.value : '');
      data.set('platform', platform);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Request failed');
      successCopy.textContent = `We've got your request — a ${platform} link will be sent to your inbox shortly.`;
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.classList.add('flex');
      form.reset();
    } catch (err) {
      errorEl.classList.remove('hidden');
      idle.classList.remove('hidden');
      sending.classList.add('hidden');
      sending.classList.remove('inline-flex');
      submitBtn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------- */
/* Pacific clock                                                      */
/* ---------------------------------------------------------------- */

function initPacificBanner() {
  const el = document.getElementById('pacific-time-banner');
  if (!el) return;
  const update = () => {
    el.textContent = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Los_Angeles',
    });
  };
  update();
  setInterval(update, 1000);
}

(function initPacificClockPage() {
  document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.getElementById('pacific-time');
    const dateEl = document.getElementById('pacific-date');
    if (!timeEl && !dateEl) return;
    const update = () => {
      const now = new Date();
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Los_Angeles',
        });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles',
        });
      }
    };
    update();
    setInterval(update, 1000);
  });
})();

/* ---------------------------------------------------------------- */
/* Scroll-linked effects: services tilt card + process line fill      */
/* ---------------------------------------------------------------- */

function scrollProgress01(el, startFrac, endFrac) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const startY = vh * startFrac;
  const endY = vh * endFrac;
  const total = startY - endY;
  if (total <= 0) return 0;
  const traveled = startY - rect.top;
  return Math.min(1, Math.max(0, traveled / total));
}

function initServicesTilt() {
  const section = document.getElementById('services-section');
  const card = document.getElementById('services-tilt-card');
  if (!section || !card) return;
  const update = () => {
    const p = scrollProgress01(section, 0.85, 0.15);
    const rotate = -9 + p * 18;
    const y = 40 - p * 80;
    card.style.transform = `rotate(${rotate}deg) translateY(${y}px)`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function initProcessLine() {
  const track = document.getElementById('process-track');
  const line = document.getElementById('process-line');
  if (!track || !line) return;
  const update = () => {
    const p = scrollProgress01(track, 0.75, 0.6);
    line.style.transform = `scaleY(${p})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------------------------------------------------------------- */
/* Hero GSAP-style intro + parallax                                   */
/* ---------------------------------------------------------------- */

function initHeroAnimation() {
  const section = document.getElementById('hero');
  if (!section) return;

  if (typeof gsap === 'undefined') {
    section.querySelectorAll('.hero-card, .hero-word-left, .hero-word-right, .hero-eyebrow, .hero-sub, .hero-badge, .hero-scroll-hint')
      .forEach((el) => { el.style.opacity = '1'; });
    return;
  }

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.fromTo('.hero-card', { scale: 0.5, yPercent: 18, opacity: 0 }, { scale: 1, yPercent: 0, opacity: 1, duration: 1.15 })
    .fromTo('.hero-word-left', { x: () => Math.min(window.innerWidth * 0.22, 300), opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, '-=0.55')
    .fromTo('.hero-word-right', { x: () => -Math.min(window.innerWidth * 0.22, 300), opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, '<')
    .fromTo('.hero-eyebrow', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.7')
    .fromTo('.hero-sub', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '<+=0.1')
    .fromTo('.hero-badge', { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.4')
    .fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3');

  if (window.ScrollTrigger) {
    gsap.to('.hero-card', { yPercent: -14, scale: 0.94, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 40%', scrub: 1 } });
    gsap.to('.hero-word-left', { xPercent: -18, opacity: 0.25, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 40%', scrub: 1 } });
    gsap.to('.hero-word-right', { xPercent: 18, opacity: 0.25, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 40%', scrub: 1 } });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    const cardX = gsap.quickTo('.hero-card', 'x', { duration: 0.7, ease: 'power3' });
    const cardY = gsap.quickTo('.hero-card', 'y', { duration: 0.7, ease: 'power3' });
    const wordLX = gsap.quickTo('.hero-word-left', 'xPercent', { duration: 0.9, ease: 'power3' });
    const wordRX = gsap.quickTo('.hero-word-right', 'xPercent', { duration: 0.9, ease: 'power3' });
    window.addEventListener('mousemove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      cardX(nx * 22);
      cardY(ny * 16);
      wordLX(nx * -2.5);
      wordRX(nx * 2.5);
    });
  }
}
