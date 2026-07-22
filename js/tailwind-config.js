// Set BEFORE the Tailwind CDN <script> runs is not required — Tailwind's
// Play CDN watches window.tailwind.config, so this file just needs to load
// before the `tailwind.config = ...` assignment in each page's <head>.
window.TRISAGE_TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-deep': 'var(--color-ink-deep)',
        creamy: 'var(--color-creamy)',
        limeglow: 'var(--color-limeglow)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        anton: ['Anton', '"Arial Narrow"', 'sans-serif'],
      },
    },
  },
};
