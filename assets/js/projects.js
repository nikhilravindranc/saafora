(function () {
  const tabsEl = document.getElementById('filterTabs');
  const grid = document.getElementById('projectsGrid');
  if (!tabsEl || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function applyFilter(value) {
    cards.forEach(card => {
      const match = value === 'all' || card.dataset.category === value;
      card.style.display = match ? '' : 'none';
    });
    tabsEl.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('is-active', t.dataset.filter === value));
  }

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    applyFilter(btn.dataset.filter);
  });
})();
