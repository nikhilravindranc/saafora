// ===== Header scroll state =====
const header = document.getElementById('siteHeader');

function updateHeaderState() {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });
}

// ===== Hero video: fade in once playable, keep poster as instant paint =====
const heroVideo = document.getElementById('heroVideo');
const heroPoster = document.getElementById('heroPoster');

if (heroVideo) {
  const reveal = () => {
    heroVideo.classList.add('is-loaded');
    if (heroPoster) heroPoster.style.opacity = '0';
  };

  if (heroVideo.readyState >= 3) {
    reveal();
  } else {
    heroVideo.addEventListener('canplay', reveal, { once: true });
  }

  // Sound toggle: browsers block autoplay with sound, so the video starts muted
  const soundBtn = document.getElementById('heroSound');
  if (soundBtn) {
    const label = soundBtn.querySelector('.hero-sound-label');
    soundBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted && heroVideo.paused) heroVideo.play().catch(() => {});
      const on = !heroVideo.muted;
      soundBtn.classList.toggle('is-on', on);
      soundBtn.setAttribute('aria-pressed', String(on));
      soundBtn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
      if (label) label.textContent = on ? 'Sound off' : 'Sound on';
    });
  }

  // Respect users who prefer reduced motion — freeze on poster frame
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
  }
}

// ===== Footer year =====
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();
