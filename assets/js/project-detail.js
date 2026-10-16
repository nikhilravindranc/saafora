(function () {
  const container = document.getElementById('projectDetail');
  if (!container || typeof SAAFORA_PROJECTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const project = SAAFORA_PROJECTS.find((p) => p.slug === slug) || SAAFORA_PROJECTS[0];

  document.title = project.name + ' | SAAFORA Projects';

  const locationIcon = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4c-4.4 0-8 3.5-8 8 0 6 8 16 8 16s8-10 8-16c0-4.5-3.6-8-8-8Z" stroke="var(--color-taupe)" stroke-width="1.4" stroke-linejoin="round"/><circle cx="16" cy="12" r="3" stroke="var(--color-taupe)" stroke-width="1.4"/></svg>';

  document.getElementById('breadcrumbCurrent').textContent = project.name;
  document.getElementById('detailHeroImage').src = project.image;
  document.getElementById('detailHeroImage').alt = project.name;
  document.getElementById('detailCategory').textContent = project.categoryLabel;
  document.getElementById('detailTitle').textContent = project.name;
  document.getElementById('detailLocation').innerHTML = locationIcon + project.location;

  const textEl = document.getElementById('detailText');
  textEl.innerHTML = project.description.map((p) => '<p>' + p + '</p>').join('');

  const scopeList = document.getElementById('detailScopeList');
  scopeList.innerHTML = project.scope.map((item) => '<li>' + item + '</li>').join('');

  document.getElementById('factCategory').textContent = project.categoryLabel;
  document.getElementById('factLocation').textContent = project.location;
  [['Client', 'client'], ['Duration', 'duration'], ['Completed', 'completed']].forEach(([id, key]) => {
    if (!project[key]) return;
    document.getElementById('fact' + id).textContent = project[key];
    document.getElementById('fact' + id + 'Row').hidden = false;
  });

  const galleryEl = document.getElementById('detailGallery');
  const gridEl = document.getElementById('detailGalleryGrid');
  let galleryHtml = '';
  if (project.video) {
    galleryHtml += '<div class="detail-gallery-video"><video controls playsinline preload="metadata" poster="' + project.video.poster + '"><source src="' + project.video.src + '" type="video/mp4"></video></div>';
  }
  (project.gallery || []).forEach((img) => {
    galleryHtml += '<div class="detail-gallery-item"><img src="' + img.src + '" alt="' + img.alt + '" loading="lazy"></div>';
  });
  if (galleryHtml) {
    gridEl.innerHTML = galleryHtml;
    galleryEl.hidden = false;
  }

  const claimBtn = document.getElementById('detailWhatsapp');
  if (claimBtn) {
    const message = 'Hello SAAFORA, I came across your ' + project.name + ' project and would like to discuss a similar project of mine.';
    claimBtn.href = 'https://wa.me/918111843786?text=' + encodeURIComponent(message);
  }

  container.classList.add('is-ready');
})();
