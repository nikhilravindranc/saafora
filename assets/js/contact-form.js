(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const WHATSAPP_NUMBER = '918111843786';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    let text = 'Hello SAAFORA, I would like to get in touch.\n\n';
    text += 'Name: ' + name + '\n';
    text += 'Phone: ' + phone + '\n';
    text += 'Service: ' + service;
    if (message) {
      text += '\n\nProject Details: ' + message;
    }

    const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
    window.open(waLink, '_blank', 'noopener');
  });
})();
