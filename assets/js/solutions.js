(function () {
  const tabsEl = document.getElementById('solutionsTabs');
  const detailEl = document.getElementById('solutionsDetail');
  if (!tabsEl || !detailEl || typeof SAAFORA_SOLUTIONS === 'undefined') return;

  const pad = (n) => String(n).padStart(2, '0');

  SAAFORA_SOLUTIONS.forEach((sol, i) => {
    const tab = document.createElement('button');
    tab.className = 'solutions-tab' + (i === 0 ? ' is-active' : '');
    tab.type = 'button';
    tab.dataset.index = i;
    tab.innerHTML = `
      <span class="tab-num">${pad(i + 1)}</span>
      <span class="tab-divider"></span>
      <span class="tab-icon"><svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">${sol.icon}</svg></span>
      <span class="tab-label">${sol.title}</span>
      <span class="tab-arrow" aria-hidden="true">&rsaquo;</span>
    `;
    tabsEl.appendChild(tab);

    const panel = document.createElement('div');
    panel.className = 'detail-panel' + (i === 0 ? ' is-active' : '');
    panel.dataset.index = i;
    panel.innerHTML = `
      <div class="detail-head">
        <span class="detail-num">${pad(i + 1)}</span>
        <span class="rule rule-sm"></span>
        <h3 class="detail-title">${sol.title}</h3>
        <span class="rule rule-sm"></span>
        <p class="detail-tagline">${sol.tagline}</p>
      </div>

      <div class="detail-visual">
        <img src="${sol.image}" alt="${sol.title}">
      </div>

      <div class="detail-items">
        <ul class="items-full">
          ${sol.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <a href="projects.html" class="detail-cta">View projects featuring this solution <span aria-hidden="true">&rarr;</span></a>
    `;
    detailEl.appendChild(panel);
  });

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.solutions-tab');
    if (!btn) return;
    const idx = btn.dataset.index;

    tabsEl.querySelectorAll('.solutions-tab').forEach(t => t.classList.toggle('is-active', t.dataset.index === idx));
    detailEl.querySelectorAll('.detail-panel').forEach(p => p.classList.toggle('is-active', p.dataset.index === idx));
  });
})();
