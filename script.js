// ---------- ATUALIZA DOTS E ÍNDICE ----------
const sections = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const pageIndexEl = document.querySelector('.pageindex [data-current]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      const idx = entry.target.getAttribute('data-index');
      dots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('href') === `#${id}`);
      });
      if (pageIndexEl && idx) pageIndexEl.textContent = idx;
    }
  });
}, { threshold: 0.55 });

sections.forEach(section => observer.observe(section));

// ---------- BOTÃO SCROLL NEXT ----------
document.querySelectorAll('[data-scroll-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.closest('.page').nextElementSibling;
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- ANIMAÇÃO DE ENTRADA DAS PÁGINAS ----------
const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.page').forEach(p => pageObserver.observe(p));

// ---------- PARALLAX NOS GHOST-NUMERALS ----------
window.addEventListener('scroll', () => {
  document.querySelectorAll('.ghost-numeral').forEach(el => {
    const page = el.closest('.page');
    if (!page) return;
    const rect = page.getBoundingClientRect();
    const speed = 0.15;
    const offset = (window.innerHeight - rect.top) * speed;
    el.style.transform = `translateY(${Math.min(offset, 80)}px)`;
  });
});

// ---------- CURSOR PERSONALIZADO ----------
const dotCursor = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dotCursor && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotCursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function lerpRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 24}px, ${ringY - 24}px)`;
    requestAnimationFrame(lerpRing);
  }
  lerpRing();

  const interactive = document.querySelectorAll('a, button, .dot, .photo-card, .imgph, .tools-grid li');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = `scale(1.7)`;
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = `scale(1)`;
    });
  });
}

// ---------- SCROLL SUAVE NOS DOTS ----------
document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});