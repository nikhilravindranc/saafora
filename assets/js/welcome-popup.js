(function () {
  const SESSION_KEY = 'saaforaPromoShown';
  const SHOW_DELAY_MS = 6000;
  const WHATSAPP_NUMBER = '918111843786';
  const WHATSAPP_MESSAGE = 'Hello SAAFORA, I came across your website and would like to know more about the 10% welcome offer. I would like to discuss my project and the service I am interested in.';

  const overlay = document.getElementById('promoOverlay');
  if (!overlay) return;

  const claimBtn = document.getElementById('promoClaim');
  const laterBtn = document.getElementById('promoLater');
  const closeBtn = document.getElementById('promoClose');

  if (claimBtn) {
    claimBtn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
  }

  function alreadyShown() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function markShown() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {}
  }

  function openPromo() {
    if (alreadyShown()) return;
    markShown();
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('promo-open');
  }

  function closePromo() {
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('promo-open');
  }

  if (!alreadyShown()) {
    setTimeout(openPromo, SHOW_DELAY_MS);
  }

  if (laterBtn) laterBtn.addEventListener('click', closePromo);
  if (closeBtn) closeBtn.addEventListener('click', closePromo);
  if (claimBtn) claimBtn.addEventListener('click', closePromo);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePromo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) closePromo();
  });
})();
