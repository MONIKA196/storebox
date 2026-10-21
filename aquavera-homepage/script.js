// AQUAVERA homepage interactions
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal content as the visitor scrolls.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Solution cards preselect the relevant enquiry type.
document.querySelectorAll('[data-solution]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.querySelector('#need');
    const value = link.dataset.solution;
    [...select.options].forEach(option => {
      if (option.textContent.trim() === value) select.value = option.value || option.textContent;
    });
  });
});

// Front-end demo form: validate inputs, then show honest feedback.
// This is a prototype and intentionally does not pretend to send data to a backend.
const form = document.querySelector('#contactForm');
const success = document.querySelector('#formSuccess');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.querySelector('#name').value.trim();
  success.textContent = `Thanks, ${name}! Your demo enquiry is ready. Connect this form to a backend or form service to receive submissions.`;
  success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
