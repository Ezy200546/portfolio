/* ==========================================================================
   Ezy Ibrahima Cherif — Portfolio Script
   Sections:
   1. Theme toggle (dark/light, persisted in localStorage)
   2. Header scroll state + mobile nav
   3. Scrollspy (highlight active nav link)
   4. Scroll-reveal animations
   5. Projects data + rendering + filtering  <-- ADD NEW PROJECTS HERE
   6. Hero canvas node-network animation
   7. Contact form (mailto, no backend)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderAndNav();
  initScrollReveal();
  initProjects();
  initHeroCanvas();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------------------- */
/* 1. THEME TOGGLE                                                        */
/* ---------------------------------------------------------------------- */
function initTheme() {
  const root = document.body;
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ezy-portfolio-theme';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }
  // Default stays 'dark' (set in HTML) if nothing saved yet.

  updateToggleState();

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    updateToggleState();
  });

  function updateToggleState() {
    const isLight = root.getAttribute('data-theme') === 'light';
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
}

/* ---------------------------------------------------------------------- */
/* 2. HEADER SCROLL STATE + MOBILE NAV                                    */
/* ---------------------------------------------------------------------- */
function initHeaderAndNav() {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after tapping a link
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 3. SCROLLSPY                                                           */
/* ---------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => spy.observe(section));
}

/* ---------------------------------------------------------------------- */
/* 4. SCROLL REVEAL                                                       */
/* ---------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));

  // Scrollspy depends on section elements existing; init here too.
  initScrollSpy();
}

/* ---------------------------------------------------------------------- */
/* 5. PROJECTS DATA + RENDERING + FILTERING                               */
/*    To add a future project: copy one object below and edit its        */
/*    fields. category must be one of: 'software', 'hardware', 'academic'*/
/*    (a project can have more than one category, e.g. ['software',      */
/*    'academic']). No other file needs to change.                       */
/* ---------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: 'Student Management System',
    categories: ['software', 'academic'],
    course: 'Academic project — 2nd semester',
    description:
      'A console-based Student Management System written in C, built with my lab group. It manages student records and course enrollments, with functionality to store, update, and retrieve student data.',
    tech: ['C'],
    group: true,
    status: 'Completed',
    repo: 'https://github.com/Ezy200546/Student-Management',
  },
  {
    title: 'Online Shopping (OOP)',
    categories: ['software', 'academic'],
    course: 'Object-Oriented Programming project',
    description:
      'A group project exploring object-oriented programming concepts through an online shopping application. Built as coursework to practice OOP design principles in a practical context.',
    tech: ['OOP'],
    group: true,
    status: 'Completed',
    repo: 'https://github.com/Ezy200546/online-shopping-OOP-',
  },
  {
    title: 'LED Matrix Traveller',
    categories: ['hardware', 'academic'],
    course: 'Digital Logic Design',
    description:
      'A hardware/digital-logic project built with a 10×10 LED matrix. The system lights LEDs one at a time and supports movement in four directions, with interactive direction changes and path history for reverse traversal and restart.',
    tech: ['Digital Logic'],
    group: true,
    status: 'Completed',
    repo: 'https://github.com/Ezy200546/LED-Matrix-Traveller',
  },
  {
    title: 'Finite State Machine — Simple Cache Controller',
    categories: ['hardware', 'academic'],
    course: 'Computer Organization and Architecture',
    description:
      'A group project built around a finite state machine implementing a simple cache controller, developed to demonstrate understanding of FSM design and cache-controller concepts.',
    tech: ['FSM', 'Digital Design'],
    group: true,
    status: 'Completed',
    repo: 'https://github.com/Ezy200546/Finite-State-Machine-simple-cache-controller-',
  },

  /* ---- Add future projects below this line, following the same shape ---- */
];

function initProjects() {
  const grid = document.getElementById('projectsGrid');
  const filterBar = document.getElementById('filterBar');

  renderProjects(PROJECTS);

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      const cats = card.dataset.categories.split(',');
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });

  function renderProjects(projects) {
    grid.innerHTML = projects
      .map(
        (p, i) => `
      <article class="project-card" data-categories="${p.categories.join(',')}" style="animation-delay:${i * 60}ms">
        <div class="project-visual">
          ${projectIcon(p.categories[0])}
        </div>
        <div class="project-body">
          <div class="project-meta">
            ${p.group ? '<span class="badge badge-group">Group Project</span>' : ''}
            <span class="badge">${p.status}</span>
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="project-course">${escapeHtml(p.course)}</p>
          <p class="project-desc">${escapeHtml(p.description)}</p>
          <div class="project-tech">
            ${p.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}
          </div>
          <a class="project-link" href="${p.repo}" target="_blank" rel="noopener noreferrer">
            View on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg>
          </a>
        </div>
      </article>`
      )
      .join('');
  }

  function projectIcon(category) {
    if (category === 'hardware') {
      return `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    }
    return `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* ---------------------------------------------------------------------- */
/* 6. HERO CANVAS — subtle node network (signature visual)                */
/*    Nodes drift slowly and connect when close; represents the several   */
/*    strands (academics, projects, football, community) coming together.*/
/* ---------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 130;

  function resize() {
    const hero = canvas.parentElement;
    width = canvas.width = hero.clientWidth;
    height = canvas.height = hero.clientHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 1,
    }));
  }

  function getAccentColor() {
    const styles = getComputedStyle(document.body);
    return styles.getPropertyValue('--accent').trim() || '#4f8cff';
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    const accent = getAccentColor();

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = hexWithAlpha(accent, (1 - dist / LINK_DIST) * 0.22);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = hexWithAlpha(accent, 0.55);
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  function hexWithAlpha(hex, alpha) {
    // Supports #rrggbb; falls back gracefully otherwise.
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return hex;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  resize();
  makeNodes();
  step();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      makeNodes();
      if (prefersReducedMotion) step();
    }, 200);
  });
}

/* ---------------------------------------------------------------------- */
/* 7. CONTACT FORM — mailto, no backend                                   */
/* ---------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:ezyibrahima@iut-dhaka.edu?subject=${subject}&body=${body}`;
  });
}
