// Trisage Solutions — render functions producing the markup for every
// section/component. Scroll-triggered entrance motion is handled generically
// in app.js via IntersectionObserver acting on the `.reveal*` classes /
// `[data-reveal-word]` attributes below.

function icon(name, cls) {
  return `<i data-lucide="${name}" class="${cls || ''}"></i>`;
}

function delayStyle(sec) {
  return `style="transition-delay:${sec.toFixed(2)}s"`;
}

/* ---------------------------------------------------------------- */
/* Navbar + Footer + chrome                                          */
/* ---------------------------------------------------------------- */

function navDropdownItems(kind) {
  if (kind === 'services') return SERVICES.map((s) => ({ label: s.title, href: `services.html#${s.slug}` }));
  if (kind === 'industries') return INDUSTRIES.map((i) => ({ label: i.title, href: `industries.html#${i.slug}` }));
  return [];
}

function renderNavbar(active) {
  const links = NAV_LINKS.map((link) => {
    const isActive = link.href === active;
    const children = link.children ? navDropdownItems(link.children) : [];
    if (!children.length) {
      return `
      <a href="${link.href}"
        class="relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive ? 'text-creamy' : 'text-creamy/55 hover:text-creamy'}">
        ${isActive ? '<span class="absolute inset-0 rounded-full bg-white/8"></span>' : ''}
        <span class="relative z-10">${link.label}</span>
      </a>`;
    }
    return `
      <div class="nav-dropdown group relative">
        <a href="${link.href}"
          class="relative flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${isActive ? 'text-creamy' : 'text-creamy/55 hover:text-creamy'}">
          ${isActive ? '<span class="absolute inset-0 rounded-full bg-white/8"></span>' : ''}
          <span class="relative z-10">${link.label}</span>
          <span class="relative z-10">${icon('chevron-down', 'h-3 w-3 transition-transform duration-300 nav-dropdown-caret')}</span>
        </a>
        <div class="nav-dropdown-panel invisible absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-creamy/12 bg-ink-deep p-2 opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200">
          ${children.map((c) => `<a href="${c.href}" class="block rounded-xl px-3.5 py-2.5 text-sm text-creamy/70 transition-colors hover:bg-white/5 hover:text-limeglow">${c.label}</a>`).join('')}
        </div>
      </div>`;
  }).join('');

  const mobileLinks = NAV_LINKS.map((link, i) => {
    const isActive = link.href === active;
    const children = link.children ? navDropdownItems(link.children) : [];
    const childHtml = children.length
      ? `<div class="mt-2 flex max-h-32 flex-col items-center gap-1 overflow-y-auto">${children.map((c) => `<a href="${c.href}" class="py-0.5 font-display text-xs uppercase tracking-wide text-creamy/45 hover:text-limeglow">${c.label}</a>`).join('')}</div>`
      : '';
    return `
      <div class="mobile-menu-item" style="transition-delay:${(0.15 + i * 0.07).toFixed(2)}s">
        <a href="${link.href}" class="block py-2 font-anton text-3xl uppercase tracking-wide transition-colors ${isActive ? 'text-limeglow' : 'text-creamy/70 hover:text-creamy'}">${link.label}</a>
        ${childHtml}
      </div>`;
  }).join('');

  return `
  <header id="navbar" class="fixed inset-x-0 top-4 z-[80] flex justify-center px-4 opacity-0 transition-all duration-700" style="transform:translateY(-70px);transition-timing-function:cubic-bezier(.22,1,.36,1)">
    <div id="navbar-pill" class="flex items-center gap-1 rounded-full border py-1.5 pl-2 pr-1.5 transition duration-500 border-white/8 bg-ink-deep/60 backdrop-blur-lg">
      <a href="index.html" aria-label="Trisage Solutions home" class="mr-1 flex h-9 items-center">
        <img src="assets/trisage-logo.png" alt="Trisage Solutions" class="h-12 w-auto object-contain" />
      </a>
      <nav class="hidden items-center md:flex">${links}</nav>
      <a href="contact.html" class="ml-1 hidden items-center gap-1.5 rounded-full bg-limeglow px-5 py-2 text-[13px] font-bold text-[#404041] shadow-[0_0_20px_rgba(231,255,158,0.25)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(231,255,158,0.4)] md:flex">
        ${icon('phone-call', 'h-3.5 w-3.5')} Contact Us
      </a>
      <button id="mobile-menu-btn" aria-label="Toggle menu" class="flex h-9 w-9 items-center justify-center rounded-full text-creamy/80 md:hidden">
        ${icon('menu', 'h-5 w-5')}
      </button>
    </div>
  </header>

  <div id="mobile-menu" class="mobile-menu fixed inset-0 z-[75] flex flex-col items-center justify-center gap-1 overflow-y-auto bg-ink-deep/97 py-24 backdrop-blur-2xl md:hidden">
    ${mobileLinks}
    <div class="mobile-menu-item" style="transition-delay:.55s">
      <a href="contact.html" class="mt-7 inline-block rounded-full bg-limeglow px-9 py-3.5 font-display font-semibold text-[#404041] shadow-[0_12px_40px_rgba(231,255,158,0.3)]">Contact Us</a>
    </div>
  </div>`;
}

function renderFooter() {
  const marqueeItems = SERVICES.map((s) => s.title);
  const marqueeRepeated = [...marqueeItems, ...marqueeItems];
  const marqueeHtml = marqueeRepeated.map((item) => `
    <span class="flex items-center gap-8 whitespace-nowrap font-anton text-xl uppercase tracking-wide text-[#404041]">
      ${item}<span class="text-[#404041]/40">✦</span>
    </span>`).join('');

  const socials = [
    { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { label: 'X (Twitter)', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  ];
  const socialsHtml = socials.map((s) => `
    <a href="#" aria-label="${s.label}" class="flex h-10 w-10 items-center justify-center rounded-full border border-creamy/15 text-creamy/60 transition-all hover:-translate-y-1 hover:scale-110 hover:border-limeglow hover:bg-limeglow hover:text-[#404041]">
      <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true"><path d="${s.path}"/></svg>
    </a>`).join('');

  const quickLinks = FOOTER_LINKS.map((l) => `<li><a href="${l.href}" class="text-sm text-creamy/55 transition-colors hover:text-limeglow">${l.label}</a></li>`).join('');
  const serviceLinks = SERVICES.map((s) => `<li><a href="services.html#${s.slug}" class="text-sm text-creamy/55 transition-colors hover:text-limeglow">${s.title}</a></li>`).join('');

  return `
  <footer class="relative overflow-hidden">
    <div class="overflow-hidden bg-limeglow py-4">
      <div class="flex w-max animate-marquee items-center gap-8 will-change-transform">${marqueeHtml}</div>
    </div>
    <div class="bg-ink-deep">
      <div class="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <p class="reveal mb-14 text-center font-anton text-[10vw] uppercase leading-none text-creamy/8 sm:text-[7vw]" aria-hidden="true">Trisage Solutions</p>
        <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div class="reveal">
            <a href="index.html" class="inline-flex items-center gap-2.5">
              <img src="assets/trisage-logo.png" alt="Trisage Solutions" class="h-20 w-auto object-contain" />
            </a>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-creamy/45">${COMPANY.tagline} An enterprise remote staffing &amp; talent solutions partner helping businesses scale global teams.</p>
            <div class="mt-6 flex gap-3">${socialsHtml}</div>
          </div>
          <div class="reveal" ${delayStyle(0.1)}>
            <h4 class="text-[11px] font-semibold uppercase tracking-[0.35em] text-creamy/35">Quick Links</h4>
            <ul class="mt-5 space-y-3">${quickLinks}</ul>
          </div>
          <div class="reveal" ${delayStyle(0.2)}>
            <h4 class="text-[11px] font-semibold uppercase tracking-[0.35em] text-creamy/35">Talent Categories</h4>
            <ul class="mt-5 space-y-3">${serviceLinks}</ul>
          </div>
          <div class="reveal" ${delayStyle(0.3)}>
            <h4 class="text-[11px] font-semibold uppercase tracking-[0.35em] text-creamy/35">Contact</h4>
            <a href="mailto:${COMPANY.email}" class="mt-5 inline-flex items-center gap-2 text-sm text-creamy/55 transition-colors hover:text-limeglow">${icon('mail', 'h-4 w-4')}${COMPANY.email}</a>
            <p class="mt-4 text-sm leading-relaxed text-creamy/35">Available worldwide, remote-first.</p>
            <a href="careers.html" class="mt-4 block text-sm text-creamy/40 underline decoration-creamy/20 underline-offset-4 transition-colors hover:text-limeglow">Are you a candidate looking for remote roles? Click Here</a>
          </div>
        </div>
        <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-creamy/8 pt-8 sm:flex-row">
          <p class="text-xs text-creamy/30">© 2026 Trisage Solutions. All Rights Reserved.</p>
          <button id="back-to-top" aria-label="Back to top" class="flex h-11 w-11 items-center justify-center rounded-full bg-limeglow text-[#404041] shadow-[0_8px_30px_rgba(231,255,158,0.25)] transition-transform hover:-translate-y-1">
            ${icon('arrow-up', 'h-4 w-4')}
          </button>
        </div>
      </div>
    </div>
  </footer>`;
}

function renderChrome() {
  return `
    <div id="preloader" class="fixed inset-0 z-[110] flex items-center justify-center bg-ink">
      <div class="relative flex flex-col items-center gap-6">
        <img src="assets/trisage-logo.png" alt="Trisage Solutions" class="h-20 w-auto object-contain" />
        <div class="h-[1px] w-48 overflow-hidden rounded-full bg-white/10">
          <div class="preloader-bar h-full bg-limeglow"></div>
        </div>
      </div>
    </div>
    <div id="scroll-progress" class="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-limeglow" style="transform:scaleX(0)"></div>
    <div id="cursor-ring"></div>
    <div id="cursor-dot"></div>
    <button id="theme-toggle" aria-label="Switch theme" class="fixed bottom-5 left-1/2 z-[85] flex h-9 w-[4.2rem] -translate-x-1/2 items-center rounded-full border border-creamy/20 bg-ink-deep/80 px-1 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl opacity-0 transition-opacity duration-700">
      ${icon('moon', 'absolute left-2.5 h-3.5 w-3.5 text-creamy/45')}
      ${icon('sun', 'absolute right-2.5 h-3.5 w-3.5 text-creamy/45')}
      <span id="theme-knob" class="relative z-10 ml-0 flex h-7 w-7 items-center justify-center rounded-full bg-limeglow shadow-[0_4px_15px_rgba(231,255,158,0.4)]">
        ${icon('moon', 'h-3.5 w-3.5 text-[#404041]')}
      </span>
    </button>`;
}

/* ---------------------------------------------------------------- */
/* Shared UI primitives                                              */
/* ---------------------------------------------------------------- */

function renderSectionHeading({ eyebrow, title, highlight, description, align = 'center' }) {
  return `
  <div class="mb-14 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}">
    <span class="reveal mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-limeglow">
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-limeglow"></span>${eyebrow}
    </span>
    <h2 class="reveal font-anton text-4xl uppercase leading-[1.02] tracking-[0.01em] text-creamy sm:text-5xl md:text-6xl" ${delayStyle(0.1)}>
      ${title} ${highlight ? `<span class="text-limeglow">${highlight}</span>` : ''}
    </h2>
    ${description ? `<p class="reveal mt-5 text-base leading-relaxed text-creamy/55 sm:text-lg" ${delayStyle(0.2)}>${description}</p>` : ''}
  </div>`;
}

function renderPageHeader({ eyebrow, title, gradientWords = [], description }) {
  const words = title.split(' ');
  const wordsHtml = words.map((w, i) => {
    const clean = w.replace(/[.,]/g, '');
    const isGrad = gradientWords.includes(clean);
    return `<span class="text-reveal-wrap"><span class="text-reveal-word${isGrad ? ' text-limeglow' : ''}" data-reveal-word style="transition-delay:${(0.3 + i * 0.06).toFixed(2)}s">${w}</span></span>`;
  }).join(' ');

  return `
  <section class="relative overflow-hidden pb-8 pt-36 sm:pt-40">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-96" style="background:radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.05), transparent 65%)" aria-hidden="true"></div>
    <div class="relative mx-auto max-w-4xl px-6 text-center">
      <span class="reveal mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-limeglow" ${delayStyle(0.05)}>
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-limeglow"></span>${eyebrow}
      </span>
      <h1 class="font-anton text-4xl uppercase leading-[1.02] tracking-[0.01em] text-creamy sm:text-6xl md:text-7xl">${wordsHtml}</h1>
      ${description ? `<p class="reveal mx-auto mt-6 max-w-2xl text-base leading-relaxed text-creamy/55 sm:text-lg" ${delayStyle(0.3)}>${description}</p>` : ''}
    </div>
  </section>`;
}

function renderServiceVisual({ icon: iconName, accent, tag, className = '' }) {
  return `
  <div class="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-creamy sm:h-52 ${className}">
    <div class="absolute inset-0 opacity-60" style="background-image:repeating-linear-gradient(-45deg, transparent 0 26px, rgba(35,35,32,0.045) 26px 27px)"></div>
    <div class="absolute inset-0" style="background-image:radial-gradient(circle at 28% 18%, rgba(35,35,32,0.07), transparent 55%)"></div>
    <div class="relative flex items-center justify-center">
      <div class="orbit-cw absolute h-28 w-28 rounded-full border border-dashed border-ink/30">
        <span class="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-limeglow shadow-[0_0_10px_rgba(231,255,158,0.8)]"></span>
      </div>
      <div class="orbit-ccw absolute h-40 w-40 rounded-full border border-dashed border-ink/15">
        <span class="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink shadow-lg"></span>
      </div>
      <div class="icon-pulse relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-[0_16px_40px_rgba(35,35,32,0.4)]">
        ${icon(iconName, 'h-7 w-7 text-white')}
        <span class="ring-pulse absolute inset-0 rounded-2xl border border-white/40"></span>
      </div>
      <div class="tag-bob absolute -right-6 -bottom-4 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[10px] font-semibold text-limeglow shadow-xl">${tag}</div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------- */
/* Home sections                                                     */
/* ---------------------------------------------------------------- */

function renderHero() {
  const badges = COMPLIANCE_BADGES.map((b) => `<span class="rounded-full border border-creamy/15 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-creamy/50">${b}</span>`).join('');
  return `
  <section id="hero" class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink text-creamy">
    <div class="pointer-events-none absolute inset-0" style="background:radial-gradient(ellipse 90% 70% at 50% 42%, rgba(255,255,255,0.045), transparent 60%), radial-gradient(ellipse 120% 90% at 50% 110%, rgba(0,0,0,0.5), transparent 55%)" aria-hidden="true"></div>
    <div class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-2 px-5 pt-24 pb-16 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-0 lg:pt-16">
      <div class="order-2 text-center lg:order-1 lg:justify-self-end lg:pr-6 lg:text-right">
        <p class="hero-eyebrow mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-creamy/55 sm:text-xs">Trisage Solutions</p>
        <h1 class="hero-word-left font-anton text-[15vw] uppercase leading-[0.95] tracking-[0.01em] will-change-transform sm:text-[11vw] lg:text-[clamp(3.5rem,7.5vw,7rem)]">Scale</h1>
      </div>
      <div class="hero-card group relative order-1 mx-auto mt-2 w-56 shrink-0 will-change-transform sm:w-64 lg:order-2 lg:mt-0 lg:w-72">
        <div class="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-creamy shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div class="absolute inset-0" style="background-image:radial-gradient(circle at 30% 20%, rgba(64,64,65,0.08), transparent 55%)"></div>
          <div class="absolute inset-0 opacity-50" style="background-image:repeating-linear-gradient(-45deg, transparent 0 26px, rgba(64,64,65,0.05) 26px 27px)"></div>
          <div class="absolute -right-10 -top-12 h-40 w-40 animate-float rounded-full bg-limeglow/70 blur-2xl"></div>
          <div class="absolute -bottom-14 -left-8 h-36 w-36 animate-float-slow rounded-full bg-ink/10 blur-xl"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="font-anton text-[7.5rem] leading-none text-ink transition-transform duration-700 group-hover:scale-110 sm:text-[8.5rem]">T</span>
            <span class="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/60">Global Talent</span>
          </div>
          <div class="absolute inset-8 animate-spin-slow rounded-full border border-dashed border-ink/15"></div>
        </div>
        <a href="contact.html" aria-label="Talk to us — contact us" class="hero-badge absolute -left-7 bottom-10 flex h-20 w-20 items-center justify-center rounded-full bg-limeglow font-display text-lg font-bold text-[#404041] shadow-[0_12px_35px_rgba(231,255,158,0.35)] transition-transform duration-500 hover:rotate-12 hover:scale-110">
          <span>Hi</span>
        </a>
      </div>
      <div class="order-3 text-center lg:justify-self-start lg:pl-6 lg:text-left">
        <h1 class="hero-word-right font-anton text-[15vw] uppercase leading-[0.95] tracking-[0.01em] will-change-transform sm:text-[11vw] lg:text-[clamp(3.5rem,7.5vw,7rem)]">Talent</h1>
        <p class="hero-sub mx-auto mt-3 max-w-[19rem] text-[13px] leading-relaxed text-creamy/55 lg:mx-0">Scale your global team with dedicated remote talent — engineers, executive assistants, support teams, and more, at up to 70% lower overhead.</p>
        <div class="hero-sub mx-auto mt-4 flex max-w-[19rem] flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">${badges}</div>
      </div>
    </div>
    <div class="hero-scroll-hint absolute bottom-[4.2rem] left-1/2 z-10 -translate-x-1/2">
      <div class="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-creamy/40">
        Scroll ${icon('arrow-down', 'h-3.5 w-3.5 animate-bounce-slow')}
      </div>
    </div>
  </section>`;
}

function renderValueProp() {
  const cards = [
    { icon: 'trending-up', title: 'Resource Scaling', description: 'Scale a team of one into a team of twenty without rebuilding your hiring pipeline every time.' },
    { icon: 'zap', title: 'Accelerated Sourcing', description: 'Hire in as little as 5 days, versus the 45+ days typical of domestic recruiting cycles.' },
    { icon: 'shield-check', title: 'Liability Protection', description: 'We assume compliance, payroll localization, and employer-of-record risk — you get an asset-light workforce.' },
  ];
  const cardsHtml = cards.map((c, i) => `
    <div class="reveal rounded-3xl border border-white/8 bg-white/[0.03] p-8 text-center" ${delayStyle(i * 0.1)}>
      <div class="mx-auto mb-5 inline-flex rounded-2xl bg-limeglow/12 p-3.5">${icon(c.icon, 'h-6 w-6 text-limeglow')}</div>
      <h3 class="font-anton text-lg uppercase tracking-wide text-creamy">${c.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-creamy/55">${c.description}</p>
    </div>`).join('');
  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-6 sm:grid-cols-3">${cardsHtml}</div>
    </div>
  </section>`;
}

function renderIndustries(compact = false) {
  const list = compact ? INDUSTRIES.slice(0, 6) : INDUSTRIES;
  const cards = list.map((ind, i) => `
    <div id="${ind.slug}" class="reveal group scroll-mt-28 rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-limeglow/30" ${delayStyle((i % 3) * 0.08)}>
      <div class="mb-5 inline-flex rounded-2xl bg-limeglow/12 p-3">${icon(ind.icon, 'h-5 w-5 text-limeglow')}</div>
      <h3 class="font-anton text-lg uppercase tracking-wide text-creamy">${ind.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-creamy/50">${ind.description}</p>
      <span class="mt-4 inline-block rounded-full border border-creamy/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-creamy/45">${ind.compliance}</span>
    </div>`).join('');
  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-6">
      ${renderSectionHeading({ eyebrow: 'Industries', title: 'Built For Your', highlight: 'Industry', description: 'Talent matched not just to a role, but to the regulatory and operational realities of your sector.' })}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
    </div>
  </section>`;
}

function renderAbout() {
  const statsHtml = STATS.map((stat) => `
    <div>
      <p class="font-anton text-4xl text-limeglow sm:text-5xl"><span class="counter" data-value="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</span></p>
      <p class="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-creamy/45">${stat.label}</p>
    </div>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[7fr_5fr] lg:gap-20">
      <div>
        <span class="reveal mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-limeglow">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-limeglow"></span>About Us
        </span>
        <h2 class="reveal font-anton text-4xl uppercase leading-[1.02] text-creamy sm:text-5xl" ${delayStyle(0.1)}>Built For The New Era<br />Of <span class="text-limeglow">Global Teams</span></h2>
        <p class="reveal mt-6 max-w-xl leading-relaxed text-creamy/60" ${delayStyle(0.2)}><span class="font-semibold text-creamy">${COMPANY.name}</span> is an enterprise remote staffing &amp; talent solutions partner, built on rigorous recruitment, background screening, and training infrastructure. We don't just source resumes — we embed vetted professionals into your team.</p>
        <p class="reveal mt-4 max-w-xl leading-relaxed text-creamy/60" ${delayStyle(0.3)}>Every placement is backed by operational resilience: security-first processes, guaranteed timezone overlap, and a dedicated account manager accountable for the life of the engagement.</p>
        <div class="reveal mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4" ${delayStyle(0.4)}>${statsHtml}</div>
        <a href="about.html" class="group reveal mt-10 inline-flex items-center gap-2 rounded-full border border-limeglow/60 px-6 py-3 font-display text-sm font-semibold text-limeglow transition-colors duration-300 hover:bg-limeglow hover:text-[#404041]" ${delayStyle(0.5)}>
          Our Story ${icon('arrow-right', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1')}
        </a>
      </div>
      <div class="reveal-scale relative mx-auto w-full max-w-sm">
        <div class="card-float relative aspect-[3/4] overflow-hidden rounded-[28px] bg-creamy p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div class="absolute inset-0 opacity-60" style="background-image:repeating-linear-gradient(-45deg, transparent 0 26px, rgba(64,64,65,0.045) 26px 27px)"></div>
          <div class="relative flex h-full flex-col justify-between">
            <p class="font-anton text-3xl uppercase leading-[1.08] text-ink sm:text-4xl">Think.<br />Transform.<br /><span class="inline-block bg-ink px-2 text-limeglow">Thrive.</span></p>
            <div class="flex items-end justify-between">
              <span class="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/50">Global — Remote-First</span>
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-anton text-lg text-limeglow">T</span>
            </div>
          </div>
        </div>
        <div class="reveal-scale absolute -left-5 top-10 flex h-20 w-20 items-center justify-center rounded-full bg-limeglow text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wider text-[#404041] shadow-[0_12px_35px_rgba(231,255,158,0.35)]" ${delayStyle(0.5)}>Vetted<br />Talent</div>
      </div>
    </div>
  </section>`;
}

function renderServicesSection() {
  const rows = SERVICES.map((service, i) => `
    <button data-nav-href="services.html" class="svc-row group block w-full border-b border-creamy/10 py-6 text-left first:border-t sm:py-7">
      <div class="flex items-baseline gap-4 sm:gap-6">
        <span class="font-display text-xs font-bold text-limeglow sm:text-sm">${String(i + 1).padStart(2, '0')}.</span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-3">
            <h3 class="font-anton text-2xl uppercase leading-tight text-creamy/85 transition duration-400 group-hover:translate-x-2 group-hover:text-limeglow sm:text-4xl">${service.title}</h3>
            ${icon('arrow-up-right', 'h-6 w-6 shrink-0 text-creamy/25 transition duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-limeglow')}
          </div>
          <div class="svc-row-panel">
            <div>
              <p class="pt-2.5 text-sm leading-relaxed text-creamy/50">${service.description}</p>
              <p class="pb-1 pt-2 text-xs font-medium uppercase tracking-[0.15em] text-creamy/35">${service.items.join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>
    </button>`).join('');

  return `
  <section id="services-section" class="section-pad relative overflow-hidden">
    <div class="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[5fr_7fr] lg:gap-20">
      <div>
        <div>
          <span class="reveal mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-limeglow">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-limeglow"></span>Talent Taxonomy
          </span>
          <h2 class="reveal font-anton text-4xl uppercase leading-[1.02] text-creamy sm:text-5xl" ${delayStyle(0.1)}>Every Role You<br />Need <span class="text-limeglow">Ready to Hire</span></h2>
          <p class="reveal mt-5 max-w-md leading-relaxed text-creamy/55" ${delayStyle(0.2)}>From dedicated engineers to executive assistants — vetted, compliant talent across every category your business needs to scale.</p>
          <a href="services.html" class="group reveal mt-7 inline-flex items-center gap-2 rounded-full border border-limeglow/60 px-6 py-3 font-display text-sm font-semibold text-limeglow transition-colors duration-300 hover:bg-limeglow hover:text-[#404041]" ${delayStyle(0.3)}>
            All Services ${icon('arrow-right', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1')}
          </a>
        </div>
        <div id="services-tilt-card" class="mx-auto mt-14 hidden w-64 will-change-transform lg:block">
          ${renderServiceVisual({ icon: SERVICES[0].icon, accent: SERVICES[0].accent, tag: SERVICES[0].visualTag, className: 'h-80 shadow-[0_30px_70px_rgba(0,0,0,0.45)]' })}
        </div>
      </div>
      <div>${rows}</div>
    </div>
  </section>`;
}

function projectCardHtml(project) {
  return `
  <article class="group relative w-[80vw] shrink-0 overflow-hidden rounded-[28px] border border-white/8 bg-ink-deep shadow-[0_25px_60px_rgba(0,0,0,0.5)] sm:w-[24rem] lg:w-[27rem]">
    <div class="relative h-[21rem] overflow-hidden sm:h-[23rem]">
      <div class="absolute inset-0 bg-gradient-to-br ${project.gradient}"></div>
      <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/35 to-transparent"></div>
      <span class="absolute left-5 top-5 rounded-full bg-limeglow px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#404041] shadow-lg">${project.category}</span>
      <div class="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <h3 class="font-anton text-2xl uppercase leading-tight text-creamy sm:text-3xl">${project.title}</h3>
        <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-creamy/65">${project.description}</p>
        <div class="mt-3.5 flex flex-wrap gap-2">
          ${project.tags.map((tag) => `<span class="rounded-full border border-creamy/20 bg-ink/40 px-3 py-1 text-xs text-creamy/60 backdrop-blur-sm">${tag}</span>`).join('')}
        </div>
        <div class="mt-4 flex gap-2.5 opacity-0 transition duration-500 group-hover:opacity-100 max-lg:opacity-100">
          <a href="contact.html" class="inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-limeglow px-4 py-2 text-xs font-bold text-[#404041] transition duration-500 hover:scale-105 group-hover:translate-y-0 max-lg:translate-y-0">${icon('file-text', 'h-3.5 w-3.5')} Read Case Study</a>
          <a href="hire-talent.html" class="inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-creamy/30 bg-ink/40 px-4 py-2 text-xs font-semibold text-creamy backdrop-blur-sm transition delay-75 duration-500 hover:border-limeglow hover:text-limeglow group-hover:translate-y-0 max-lg:translate-y-0">${icon('users', 'h-3.5 w-3.5')} Hire This Role</a>
        </div>
      </div>
    </div>
  </article>`;
}

function renderPortfolioRows(category) {
  const filtered = category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category);
  const half = Math.ceil(filtered.length / 2);
  const rows = filtered.length >= 4 ? [filtered.slice(0, half), filtered.slice(half)] : [filtered];

  return rows.map((row, r) => {
    const loop = [...row, ...row, ...row, ...row];
    const rightward = r % 2 === 0;
    const duration = Math.max(row.length, 2) * (rightward ? 13 : 15);
    return `
    <div class="group/row relative">
      <div class="flex w-max gap-6 py-2 animate-marquee will-change-transform group-hover/row:[animation-play-state:paused]${rightward ? ' [animation-direction:reverse]' : ''}" style="animation-duration:${duration}s">
        ${loop.map((p) => projectCardHtml(p)).join('')}
      </div>
    </div>`;
  }).join('');
}

function renderPortfolioSection() {
  const filterButtons = PROJECT_CATEGORIES.map((cat) => `
    <button data-filter="${cat}" class="portfolio-filter-btn relative rounded-full px-5 py-2.5 text-[13px] font-medium transition duration-300 ${cat === 'All' ? 'text-[#404041]' : 'border border-creamy/15 text-creamy/55 hover:border-creamy/35 hover:text-creamy'}">
      ${cat === 'All' ? '<span class="absolute inset-0 rounded-full bg-limeglow shadow-[0_8px_30px_rgba(231,255,158,0.3)]"></span>' : ''}
      <span class="relative z-10">${cat}</span>
    </button>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-6xl px-6">
      ${renderSectionHeading({ eyebrow: 'Case Studies', title: 'Proven', highlight: 'Placements', description: 'Every engagement ships with a number attached — overhead saved, hiring speed, and scaled output.' })}
      <div id="portfolio-filters" class="mb-12 flex flex-wrap justify-center gap-2.5">${filterButtons}</div>
    </div>
    <div id="portfolio-rows" class="reveal space-y-7" style="mask-image:linear-gradient(90deg, transparent, black 6%, black 94%, transparent);-webkit-mask-image:linear-gradient(90deg, transparent, black 6%, black 94%, transparent)">
      ${renderPortfolioRows('All')}
    </div>
  </section>`;
}

function renderProcess() {
  const steps = PROCESS_STEPS.map((step, i) => {
    const isLeft = i % 2 === 0;
    return `
    <div class="${isLeft ? 'reveal-x-left' : 'reveal-x-right'} relative flex items-start gap-8 pl-16 md:w-1/2 md:pl-0 ${isLeft ? 'md:mr-auto md:flex-row-reverse md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'}">
      <div class="absolute left-6 top-1 -translate-x-1/2 md:top-2 ${isLeft ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'}">
        <div class="flex h-11 w-11 items-center justify-center rounded-full border border-limeglow/50 bg-ink-deep font-anton text-sm text-limeglow shadow-[0_0_25px_rgba(231,255,158,0.15)]">${String(i + 1).padStart(2, '0')}</div>
      </div>
      <div class="w-full rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition duration-500 hover:border-limeglow/30 hover:bg-white/[0.05]">
        <h3 class="font-anton text-xl uppercase tracking-wide text-creamy">${step.title}</h3>
        <p class="mt-2.5 text-sm leading-relaxed text-creamy/55">${step.description}</p>
      </div>
    </div>`;
  }).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-5xl px-6">
      ${renderSectionHeading({ eyebrow: 'How It Works', title: 'A Pathway Built For', highlight: 'Momentum', description: 'Four stages from first call to an embedded team member — transparent at every step.' })}
      <div id="process-track" class="relative">
        <div class="absolute left-6 top-0 h-full w-px bg-creamy/10 md:left-1/2" aria-hidden="true">
          <div id="process-line" class="h-full w-full origin-top bg-limeglow" style="transform:scaleY(0)"></div>
        </div>
        <div class="space-y-12">${steps}</div>
      </div>
    </div>
  </section>`;
}

function renderWhyChoose() {
  const cards = WHY_CHOOSE.map((f, i) => `
    <div class="reveal group h-full rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:bg-creamy" ${delayStyle(i * 0.08)}>
      <div class="mb-5 inline-flex rounded-2xl bg-limeglow/12 p-3 transition-colors duration-500 group-hover:bg-ink">
        ${icon(f.icon, 'h-5 w-5 text-limeglow')}
      </div>
      <h3 class="font-anton text-lg uppercase tracking-wide text-creamy transition-colors duration-500 group-hover:text-ink">${f.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-creamy/50 transition-colors duration-500 group-hover:text-ink/65">${f.description}</p>
    </div>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-6">
      ${renderSectionHeading({ eyebrow: 'Why Trisage', title: 'The Advantage Of', highlight: 'Working With Us' })}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${cards}</div>
    </div>
  </section>`;
}

function testimonialCardHtml(t, creamCard) {
  const stars = Array.from({ length: t.rating }).map(() => icon('star', creamCard ? 'h-4 w-4 fill-ink text-ink' : 'h-4 w-4 fill-limeglow text-limeglow')).join('');
  return `
  <figure class="relative shrink-0 overflow-hidden rounded-[28px] p-7 transition-transform duration-500 hover:scale-[1.02] ${creamCard ? 'bg-creamy text-ink shadow-[0_20px_55px_rgba(0,0,0,0.35)]' : 'border border-white/8 bg-white/[0.03] text-creamy'}">
    ${icon('quote', creamCard ? 'absolute right-6 top-6 h-8 w-8 text-ink/10' : 'absolute right-6 top-6 h-8 w-8 text-creamy/10')}
    <div class="flex gap-1">${stars}</div>
    <blockquote class="mt-4 text-[15px] leading-relaxed ${creamCard ? 'text-ink/80' : 'text-creamy/70'}">"${t.quote}"</blockquote>
    <figcaption class="mt-6 flex items-center gap-3.5">
      <div class="flex h-11 w-11 items-center justify-center rounded-full font-anton text-sm ${creamCard ? 'bg-ink text-limeglow' : 'bg-limeglow text-[#404041]'}">${t.initials}</div>
      <div>
        <p class="font-display text-sm font-semibold">${t.name}</p>
        <p class="${creamCard ? 'text-xs text-ink/50' : 'text-xs text-creamy/45'}">${t.role}</p>
      </div>
    </figcaption>
  </figure>`;
}

function renderTestimonials() {
  const columns = [[], [], []];
  TESTIMONIALS.forEach((t, i) => columns[i % 3].push(t));
  const colConfig = [
    { duration: 38, reverse: false, className: '' },
    { duration: 30, reverse: true, className: 'hidden sm:block' },
    { duration: 46, reverse: false, className: 'hidden lg:block' },
  ];

  const colsHtml = columns.map((col, c) => {
    const loop = [...col, ...col];
    const cfg = colConfig[c];
    const cards = loop.map((t, i) => testimonialCardHtml(t, (i + c) % 3 === 0)).join('');
    return `
    <div class="group/col relative ${cfg.className}">
      <div class="flex flex-col gap-6 animate-marquee-y will-change-transform group-hover/col:[animation-play-state:paused]${cfg.reverse ? ' [animation-direction:reverse]' : ''}" style="animation-duration:${cfg.duration}s">${cards}</div>
    </div>`;
  }).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-6">
      ${renderSectionHeading({ eyebrow: 'Testimonials', title: 'Trusted By Businesses That', highlight: 'Wanted More' })}
      <div class="reveal grid h-[38rem] grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 lg:h-[42rem] lg:grid-cols-3" style="mask-image:linear-gradient(180deg, transparent, black 9%, black 91%, transparent);-webkit-mask-image:linear-gradient(180deg, transparent, black 9%, black 91%, transparent)">
        ${colsHtml}
      </div>
    </div>
  </section>`;
}

function renderFAQ() {
  const items = FAQS.map((faq, i) => `
    <div class="border-b border-creamy/10 first:border-t">
      <button data-faq-toggle class="group flex w-full items-center justify-between gap-4 py-6 text-left">
        <span class="faq-question font-display text-base font-semibold transition-colors duration-300 sm:text-lg ${i === 0 ? 'text-limeglow' : 'text-creamy group-hover:text-limeglow'}">${faq.question}</span>
        <span class="faq-plus-wrap flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${i === 0 ? 'bg-limeglow text-[#404041]' : 'border border-creamy/20 text-creamy/60'}">
          <span class="faq-plus inline-flex ${i === 0 ? 'open' : ''}">${icon('plus', 'h-4 w-4')}</span>
        </span>
      </button>
      <div class="faq-panel ${i === 0 ? 'open' : ''}">
        <div><p class="pb-6 leading-relaxed text-creamy/55">${faq.answer}</p></div>
      </div>
    </div>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-3xl px-6">
      ${renderSectionHeading({ eyebrow: 'FAQ', title: 'Questions,', highlight: 'Answered' })}
      <div id="faq-list">${items}</div>
    </div>
  </section>`;
}

function countrySelectHtml(idPrefix) {
  return `
  <div class="relative shrink-0 country-select" data-prefix="${idPrefix}">
    <button type="button" data-country-btn class="flex h-full items-center gap-2 rounded-2xl border border-creamy/12 bg-white/[0.04] px-3.5 text-sm text-creamy transition duration-300 hover:border-creamy/25">
      <img data-country-flag src="https://flagcdn.com/w40/us.png" alt="United States" width="20" height="15" class="h-[15px] w-5 rounded-[2px] object-cover" />
      <span data-country-dial class="font-medium">+1</span>
      ${icon('chevron-down', 'h-3.5 w-3.5 text-creamy/40 transition-transform')}
    </button>
    <div data-country-panel class="absolute bottom-full left-0 z-30 mb-2 hidden w-64 overflow-hidden rounded-2xl border border-creamy/15 bg-ink-deep shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div class="border-b border-creamy/10 p-2">
        <input data-country-search type="text" placeholder="Search country or code..." class="w-full rounded-lg bg-white/[0.05] px-3 py-2 text-sm text-creamy placeholder:text-creamy/30 outline-none focus:bg-white/[0.08]" />
      </div>
      <ul data-country-list data-lenis-prevent class="max-h-52 overflow-auto overscroll-contain p-1.5"></ul>
    </div>
    <input type="hidden" data-country-name value="United States" />
  </div>`;
}

function renderContactSection(showHeading = true) {
  const inputClass = 'w-full rounded-2xl border border-creamy/12 bg-white/[0.04] px-5 py-4 text-sm text-creamy placeholder:text-creamy/30 outline-none transition duration-300 focus:border-limeglow/60 focus:bg-white/[0.06] focus:shadow-[0_0_25px_rgba(231,255,158,0.08)]';
  const selectClass = `${inputClass} appearance-none pr-11 cursor-pointer`;
  const serviceOptions = SERVICES.map((s) => `<option value="${s.title}" class="bg-ink-deep text-creamy">${s.title}</option>`).join('');
  const teamScaleOptions = TEAM_SCALES.map((b) => `<option value="${b}" class="bg-ink-deep text-creamy">${b}</option>`).join('');
  const badgesHtml = COMPLIANCE_BADGES.map((b) => `<span class="rounded-full border border-creamy/15 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-creamy/50">${b}</span>`).join('');

  return `
  <section class="section-pad relative">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div class="reveal relative mx-auto w-full max-w-sm">
          <div class="card-float relative aspect-[3/4] overflow-hidden rounded-[28px] bg-creamy p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div class="absolute inset-0 opacity-60" style="background-image:repeating-linear-gradient(-45deg, transparent 0 26px, rgba(64,64,65,0.045) 26px 27px)"></div>
            <div class="relative flex h-full flex-col justify-between">
              <p class="font-anton text-3xl uppercase leading-[1.08] text-ink sm:text-4xl">Your<br />Team<br />Starts<br /><span class="inline-block bg-ink px-2 text-limeglow">Here</span></p>
              <div class="space-y-3">
                <a href="mailto:${COMPANY.email}" class="flex items-center gap-2.5 text-sm font-semibold text-ink/75 transition-colors hover:text-ink">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink">${icon('mail', 'h-3.5 w-3.5 text-limeglow')}</span>${COMPANY.email}
                </a>
                <p class="flex items-center gap-2.5 text-sm font-medium text-ink/55">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink">${icon('map-pin', 'h-3.5 w-3.5 text-limeglow')}</span>Worldwide — remote first
                </p>
              </div>
            </div>
          </div>
          <div class="reveal-scale absolute -left-6 bottom-12 flex h-20 w-20 items-center justify-center rounded-full bg-limeglow font-display text-lg font-bold text-[#404041] shadow-[0_12px_35px_rgba(231,255,158,0.35)]" ${delayStyle(0.4)}>Hi</div>
        </div>

        <div class="reveal" ${delayStyle(0.1)}>
          ${showHeading ? `
          <span class="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-limeglow">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-limeglow"></span>Contact
          </span>
          <h2 class="font-anton text-4xl uppercase leading-[1.02] text-creamy sm:text-5xl">Let's Build Your <span class="text-limeglow">Team</span></h2>` : ''}
          <p class="mt-4 max-w-lg leading-relaxed text-creamy/55">Tell us the roles you need to fill and we'll come back with a vetted shortlist — usually within 48 hours. We reply within 24 hours.</p>

          <div id="contact-success" class="mt-10 hidden min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-limeglow/25 bg-white/[0.03] p-10 text-center">
            ${icon('check-circle-2', 'h-14 w-14 text-limeglow')}
            <h3 class="font-anton text-2xl uppercase text-creamy">Message Sent</h3>
            <p class="max-w-sm text-creamy/55">Thanks for reaching out — we'll be in touch within 24 hours.</p>
          </div>

          <form id="contact-form" class="mt-9 space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="name" class="mb-2 block text-sm font-medium text-creamy/60">Name <span class="text-limeglow">*</span></label>
                <input id="name" name="name" type="text" required placeholder="Your full name" class="${inputClass}" />
              </div>
              <div>
                <label for="email" class="mb-2 block text-sm font-medium text-creamy/60">Email <span class="text-limeglow">*</span></label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" class="${inputClass}" />
              </div>
              <div>
                <label for="phone" class="mb-2 block text-sm font-medium text-creamy/60">Phone</label>
                <div class="flex items-stretch gap-2">
                  ${countrySelectHtml('contact')}
                  <input id="phone" name="phone" type="tel" placeholder="301 2345678" class="${inputClass}" />
                </div>
              </div>
              <div>
                <label for="business" class="mb-2 block text-sm font-medium text-creamy/60">Business</label>
                <input id="business" name="business" type="text" placeholder="Company / business name" class="${inputClass}" />
              </div>
              <div class="relative">
                <label for="service" class="mb-2 block text-sm font-medium text-creamy/60">Skill Category <span class="text-limeglow">*</span></label>
                <select id="service" name="service" required class="${selectClass}">
                  <option value="" disabled selected class="bg-ink-deep text-creamy/50">Select a skill category</option>
                  ${serviceOptions}
                  <option value="Other" class="bg-ink-deep text-creamy">Other / Not sure yet</option>
                </select>
                ${icon('chevron-down', 'pointer-events-none absolute bottom-4.5 right-4 h-4 w-4 text-creamy/40')}
              </div>
              <div class="relative">
                <label for="teamscale" class="mb-2 block text-sm font-medium text-creamy/60">Team Scale</label>
                <select id="teamscale" name="teamscale" class="${selectClass}">
                  <option value="" disabled selected class="bg-ink-deep text-creamy/50">Select team size</option>
                  ${teamScaleOptions}
                </select>
                ${icon('chevron-down', 'pointer-events-none absolute bottom-4.5 right-4 h-4 w-4 text-creamy/40')}
              </div>
            </div>
            <div>
              <label for="message" class="mb-2 block text-sm font-medium text-creamy/60">Message <span class="text-limeglow">*</span></label>
              <textarea id="message" name="message" rows="4" required placeholder="Tell us about the roles you need to fill, timeline, and any compliance requirements..." class="${inputClass} resize-none"></textarea>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-medium uppercase tracking-[0.15em] text-creamy/40">Compliance-Ready:</span>
              ${badgesHtml}
            </div>
            <p id="contact-error" class="hidden text-sm text-red-400">Something went wrong. Please email us directly at ${COMPANY.email}.</p>
            <button type="submit" class="group flex w-full items-center justify-center gap-2 rounded-2xl bg-limeglow py-4 font-display font-bold text-[#404041] shadow-[0_12px_40px_rgba(231,255,158,0.25)] transition-shadow duration-500 hover:shadow-[0_16px_55px_rgba(231,255,158,0.4)] disabled:opacity-60">
              <span data-btn-idle class="inline-flex items-center gap-2">Send Message ${icon('send', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5')}</span>
              <span data-btn-sending class="hidden items-center gap-2">${icon('loader-2', 'h-4 w-4 animate-spin')} Sending...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function renderBookACall() {
  return `
  <section id="book-a-call" class="relative overflow-hidden pb-4 pt-16 sm:pt-20">
    <div class="mx-auto max-w-5xl px-6">
      ${renderSectionHeading({ eyebrow: 'Book A Call', title: 'Prefer To Talk It', highlight: 'Through Live?', description: "Skip the form — grab 15 minutes on a video call and we'll map out your project together." })}
      <div class="reveal flex flex-col items-center gap-6 rounded-3xl border border-creamy/10 bg-white/[0.03] p-6 sm:flex-row sm:justify-between sm:p-8">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <span class="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-limeglow/15 sm:flex">${icon('video', 'h-5 w-5 text-limeglow')}</span>
          <div>
            <p class="font-anton text-lg uppercase tracking-wide text-creamy sm:text-xl">Free 15-Min Video Call</p>
            <p class="mt-1 text-sm text-creamy/50">No pressure, just a conversation about your project.</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2.5 rounded-xl bg-ink-deep/70 px-4 py-2.5">
            ${icon('clock', 'h-4 w-4 text-limeglow')}
            <div>
              <p id="pacific-time-banner" class="font-anton text-base tabular-nums leading-none text-creamy">--:--:--</p>
              <p class="mt-1 text-[10px] uppercase tracking-wide text-creamy/40">Pacific Standard Time</p>
            </div>
          </div>
          <a href="book-a-call.html" class="group flex items-center gap-2 whitespace-nowrap rounded-full bg-limeglow px-6 py-3 font-display text-sm font-bold text-[#404041] shadow-[0_10px_30px_rgba(231,255,158,0.25)] transition-shadow duration-300 hover:shadow-[0_14px_45px_rgba(231,255,158,0.4)]">
            Book Your Call ${icon('arrow-right', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1')}
          </a>
        </div>
      </div>
    </div>
  </section>`;
}

function renderServiceDetails() {
  const rows = SERVICES.map((service, i) => {
    const reversed = i % 2 === 1;
    const overviewHtml = service.overview.map((p) => `<p class="mt-4 leading-relaxed text-creamy/55">${p}</p>`).join('');
    const itemsHtml = service.items.map((item) => `<li class="flex items-center gap-2.5 text-sm text-creamy/70">${icon('check', 'h-4 w-4 shrink-0 text-limeglow')}${item}</li>`).join('');
    return `
    <div id="${service.slug}" class="grid items-center gap-10 scroll-mt-28 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}">
      <div class="${reversed ? 'reveal-x-right' : 'reveal-x-left'}">
        ${renderServiceVisual({ icon: service.icon, accent: service.accent, tag: service.visualTag, className: 'h-64 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:h-80' })}
      </div>
      <div class="reveal" ${delayStyle(0.1)}>
        <div class="flex items-center gap-4">
          <span class="font-anton text-sm text-limeglow">${String(i + 1).padStart(2, '0')}.</span>
          <div class="inline-flex rounded-2xl bg-limeglow p-3 shadow-[0_10px_30px_rgba(231,255,158,0.2)]">${icon(service.icon, 'h-5 w-5 text-[#404041]')}</div>
          <h3 class="font-anton text-2xl uppercase leading-tight text-creamy sm:text-3xl">${service.title}</h3>
        </div>
        ${overviewHtml}
        <ul class="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">${itemsHtml}</ul>
        <a href="contact.html" class="group mt-7 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-limeglow">
          Discuss this service ${icon('arrow-right', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1')}
        </a>
      </div>
    </div>`;
  }).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-6xl px-6">
      ${renderSectionHeading({ eyebrow: 'In Depth', title: 'What Each Service', highlight: 'Actually Delivers', description: 'No vague promises — here is exactly what we do, how we do it, and what you get.' })}
      <div class="space-y-20 lg:space-y-28">${rows}</div>
    </div>
  </section>`;
}

function renderBookCallForm() {
  const inputClass = 'w-full rounded-2xl border border-creamy/12 bg-white/[0.04] px-5 py-4 text-sm text-creamy placeholder:text-creamy/30 outline-none transition duration-300 focus:border-limeglow/60 focus:bg-white/[0.06] focus:shadow-[0_0_25px_rgba(231,255,158,0.08)] [color-scheme:dark]';

  return `
  <div class="mx-auto -mt-2 mb-10 flex w-fit flex-col items-center gap-1.5 rounded-2xl border border-creamy/10 bg-white/[0.03] px-6 py-3.5 text-center reveal sm:flex-row sm:gap-4" ${delayStyle(0.3)}>
    <span id="pacific-date" class="text-sm font-medium text-creamy/60"></span>
    <span class="hidden h-4 w-px bg-creamy/15 sm:block"></span>
    <span class="flex items-center gap-2">
      ${icon('clock', 'h-4 w-4 text-limeglow')}
      <span id="pacific-time" class="font-anton text-lg tabular-nums text-creamy">--:--:--</span>
      <span class="text-xs uppercase tracking-wide text-creamy/40">PST</span>
    </span>
  </div>

  <section class="section-pad relative pt-0">
    <div class="mx-auto max-w-xl px-6">
      <div class="reveal rounded-3xl border border-creamy/10 bg-white/[0.03] p-7 sm:p-9" ${delayStyle(0.1)}>
        <div id="book-success" class="hidden min-h-64 flex-col items-center justify-center gap-4 text-center">
          ${icon('check-circle-2', 'h-14 w-14 text-limeglow')}
          <h3 class="font-anton text-2xl uppercase text-creamy">Call Booked</h3>
          <p id="book-success-copy" class="max-w-sm text-creamy/55">We've got your request — a Google Meet link will be sent to your inbox shortly.</p>
        </div>

        <form id="book-form" class="space-y-5">
          <div>
            <label for="bname" class="mb-2 block text-sm font-medium text-creamy/60">Name <span class="text-limeglow">*</span></label>
            <input id="bname" name="name" type="text" required placeholder="Your full name" class="${inputClass}" />
          </div>
          <div>
            <label for="bphone" class="mb-2 block text-sm font-medium text-creamy/60">Phone <span class="text-limeglow">*</span></label>
            <div class="flex items-stretch gap-2">
              ${countrySelectHtml('book')}
              <input id="bphone" name="phone" type="tel" required placeholder="301 2345678" class="${inputClass}" />
            </div>
          </div>
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="bdate" class="mb-2 block text-sm font-medium text-creamy/60">Date <span class="text-limeglow">*</span></label>
              <input id="bdate" name="date" type="date" required class="${inputClass}" />
            </div>
            <div>
              <label for="btime" class="mb-2 block text-sm font-medium text-creamy/60">Time (PST) <span class="text-limeglow">*</span></label>
              <input id="btime" name="time" type="time" required class="${inputClass}" />
            </div>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-creamy/60">Call Via <span class="text-limeglow">*</span></label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" data-platform="Google Meet" class="platform-btn flex items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-semibold transition duration-300 border-limeglow bg-limeglow/15 text-limeglow">${icon('video', 'h-4 w-4')} Google Meet</button>
              <button type="button" data-platform="Zoom" class="platform-btn flex items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-semibold transition duration-300 border-creamy/12 bg-white/[0.04] text-creamy/60 hover:border-creamy/25 hover:text-creamy">${icon('video', 'h-4 w-4')} Zoom</button>
            </div>
            <input type="hidden" id="platform-input" name="platform" value="Google Meet" />
          </div>
          <p id="book-error" class="hidden text-sm text-red-400">Something went wrong. Please email us directly at ${COMPANY.email}.</p>
          <button type="submit" class="group flex w-full items-center justify-center gap-2 rounded-2xl bg-limeglow py-4 font-display font-bold text-[#404041] shadow-[0_12px_40px_rgba(231,255,158,0.25)] transition-shadow duration-500 hover:shadow-[0_16px_55px_rgba(231,255,158,0.4)] disabled:opacity-60">
            <span data-btn-idle class="inline-flex items-center gap-2">Confirm Booking ${icon('send', 'h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5')}</span>
            <span data-btn-sending class="hidden items-center gap-2">${icon('loader-2', 'h-4 w-4 animate-spin')} Booking...</span>
          </button>
        </form>
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- */
/* Hire Talent directory / Careers / Blog                             */
/* ---------------------------------------------------------------- */

function renderHireTalentGrid() {
  const cards = SERVICES.map((s, i) => `
    <a href="services.html#${s.slug}" id="${s.slug}" class="reveal group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-limeglow/30" ${delayStyle((i % 4) * 0.07)}>
      <div class="mb-5 inline-flex rounded-2xl bg-gradient-to-br ${s.accent} p-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">${icon(s.icon, 'h-5 w-5 text-white')}</div>
      <h3 class="font-anton text-lg uppercase leading-tight tracking-wide text-creamy">${s.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-creamy/50">${s.description}</p>
      <span class="mt-4 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wide text-limeglow">
        Browse Profiles ${icon('arrow-up-right', 'h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5')}
      </span>
    </a>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-6">
      ${renderSectionHeading({ eyebrow: 'Hire Talent', title: 'Browse Talent By', highlight: 'Skillset', description: 'Every category is staffed with pre-vetted, background-checked professionals ready to integrate into your team.' })}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
    </div>
  </section>`;
}

function renderCareersContent() {
  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-3xl px-6 text-center">
      <div class="reveal rounded-3xl border border-creamy/10 bg-white/[0.03] p-10">
        ${icon('users', 'mx-auto h-10 w-10 text-limeglow')}
        <h2 class="mt-5 font-anton text-2xl uppercase text-creamy sm:text-3xl">Join Our Global Talent Network</h2>
        <p class="mt-4 leading-relaxed text-creamy/55">Trisage Solutions places skilled remote professionals — developers, virtual assistants, support specialists, and more — with enterprise clients around the world. If you're a candidate looking for remote roles, we'd love to hear from you.</p>
        <a href="mailto:${COMPANY.email}?subject=Candidate%20Application" class="group mt-7 inline-flex items-center gap-2 rounded-full bg-limeglow px-7 py-3.5 font-display text-sm font-bold text-[#404041] shadow-[0_12px_40px_rgba(231,255,158,0.25)] transition-shadow duration-500 hover:shadow-[0_16px_55px_rgba(231,255,158,0.4)]">
          ${icon('mail', 'h-4 w-4')} Submit Your Application
        </a>
        <p class="mt-5 text-xs uppercase tracking-[0.2em] text-creamy/35">Note: this page is for candidates. Businesses looking to hire should visit our <a href="contact.html" class="text-limeglow underline underline-offset-4">Contact page</a>.</p>
      </div>
    </div>
  </section>`;
}

function renderBlogContent() {
  const topics = [
    { icon: 'globe', title: 'Managing Remote Teams Across Timezones', description: 'Practical frameworks for keeping distributed teams aligned and productive.' },
    { icon: 'shield-check', title: 'Global Payroll & Compliance 101', description: 'What enterprise buyers need to know about compliant international staffing.' },
    { icon: 'trending-up', title: 'Building an Operationally Efficient Remote Org', description: 'How fast-growing companies structure remote-first operations for scale.' },
    { icon: 'users', title: 'A Hiring Manager\'s Guide to Vetting Remote Talent', description: 'What rigorous background checks and skills testing actually look like.' },
    { icon: 'lock', title: 'Data Security in Distributed Teams', description: 'Layered security protocols for teams that span borders and time zones.' },
    { icon: 'clock', title: 'The Real Cost of a 60-Day Time-to-Hire', description: 'Why slow hiring cycles quietly compound into lost revenue.' },
  ];
  const cards = topics.map((t, i) => `
    <div class="reveal rounded-3xl border border-white/8 bg-white/[0.03] p-7" ${delayStyle((i % 3) * 0.08)}>
      <div class="mb-4 inline-flex rounded-2xl bg-limeglow/12 p-3">${icon(t.icon, 'h-5 w-5 text-limeglow')}</div>
      <h3 class="font-anton text-base uppercase leading-tight tracking-wide text-creamy">${t.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-creamy/50">${t.description}</p>
      <span class="mt-4 inline-block rounded-full border border-creamy/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-creamy/40">Coming Soon</span>
    </div>`).join('');

  return `
  <section class="section-pad relative overflow-hidden">
    <div class="mx-auto max-w-6xl px-6">
      ${renderSectionHeading({ eyebrow: 'Knowledge Center', title: 'Insights On Remote', highlight: 'Team Building', description: 'Our knowledge center is launching soon — here\'s what we\'ll be covering first.' })}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
    </div>
  </section>`;
}
