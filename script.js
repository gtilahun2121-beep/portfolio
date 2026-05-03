// ── Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── Navbar scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
});

// ── Skill bars animate on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// ── Fade-in on scroll
const fadeEls = document.querySelectorAll('.skill-card, .project-card, .about-card, .contact-form');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// ── Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message ✉️';
    btn.disabled = false;
    document.getElementById('formSuccess').style.display = 'block';
    this.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 4000);
  }, 1200);
});

// ── Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// ── Collapsible sections (Skills, Projects, Contact)
const toggleSections = ['skills', 'projects', 'contact'];

// Hide them on load
toggleSections.forEach(id => {
  document.getElementById(id).classList.add('section-collapsed');
});

function openSection(id) {
  const section = document.getElementById(id);
  section.classList.remove('section-collapsed');
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function toggleSection(id) {
  const section = document.getElementById(id);
  if (section.classList.contains('section-collapsed')) {
    openSection(id);
  } else {
    section.classList.add('section-collapsed');
  }
}

// Nav links (desktop + mobile)
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const targetId = link.getAttribute('href')?.replace('#', '');
  if (toggleSections.includes(targetId)) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSection(targetId);
    });
  }
});

// All other internal links pointing to toggle sections (hero btns, Hire Me, etc.)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (link.closest('.nav-links') || link.closest('.mobile-menu')) return;
  const targetId = link.getAttribute('href').replace('#', '');
  if (toggleSections.includes(targetId)) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openSection(targetId);
    });
  }
});
