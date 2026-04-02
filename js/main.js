// ============================================
// devZync — Main JavaScript
// ============================================

// ---- SMOOTH MOMENTUM SCROLL ----
// This creates the slow-to-fast premium scroll effect
// The page "catches up" to where you're scrolling — like a luxury feel

const html = document.documentElement;
let currentY = window.scrollY;
let targetY  = window.scrollY;
let isScrolling = false;

// Speed: 0.05 = cinematic slow | 0.09 = smooth | 0.15 = snappy
const EASE = 0.09;

const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

if (!isMobile) {

  document.body.style.overflow = 'hidden';

  const scroller = document.createElement('div');
  scroller.id = 'smooth-scroller';
  scroller.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    will-change: transform;
  `;

  while (document.body.firstChild) {
    scroller.appendChild(document.body.firstChild);
  }
  document.body.appendChild(scroller);

  const spacer = document.createElement('div');
  spacer.id = 'scroll-spacer';
  document.body.appendChild(spacer);

  function updateSpacerHeight() {
    spacer.style.height = scroller.scrollHeight + 'px';
  }
  updateSpacerHeight();
  window.addEventListener('resize', updateSpacerHeight);
  new ResizeObserver(updateSpacerHeight).observe(scroller);

  window.addEventListener('scroll', () => {
    targetY = window.scrollY;
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothLoop);
    }
  }, { passive: true });

  function smoothLoop() {
    const diff = targetY - currentY;
    currentY += diff * EASE;

    if (Math.abs(diff) < 0.5) {
      currentY = targetY;
      isScrolling = false;
      scroller.style.transform = `translateY(${-currentY}px)`;
      return;
    }

    scroller.style.transform = `translateY(${-currentY}px)`;
    requestAnimationFrame(smoothLoop);
  }

  // Fix anchor links to work with custom scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + currentY;
        window.scrollTo({ top, behavior: 'instant' });
        targetY = top;
      }
    });
  });

  // Reveal check on every frame for desktop
  function checkReveals() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
    requestAnimationFrame(checkReveals);
  }
  requestAnimationFrame(checkReveals);

} else {
  html.style.scrollBehavior = 'smooth';
}

// ---- CUSTOM CURSOR ----
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .service-card, .work-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.service-card, .work-card, .stat-item, .about-text, .about-visual, .contact-info, .contact-form, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

// Mobile uses IntersectionObserver, desktop uses checkReveals() above
if (isMobile) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
}

// ---- STAGGERED SERVICE CARDS ----
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ---- FORM SUBMIT via Formspree ----
// Formspree sends the form data to your email for FREE
// Replace YOUR_FORM_ID below with your real ID from formspree.io
const FORMSPREE_ID = 'YOUR_FORM_ID';

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const name     = document.getElementById('f-name').value;
  const phone    = document.getElementById('f-phone').value;
  const business = document.getElementById('f-business').value;
  const message  = document.getElementById('f-message').value;

  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        business_type: business,
        message,
        _replyto: 'hello.devzync@gmail.com',
        _subject: `New enquiry from ${name} — devZync website 🖤`
      })
    });

    if (response.ok) {
      // Success!
      submitBtn.textContent = 'Sent! ✦';
      submitBtn.style.background = '#2a5c34';
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => {
        submitBtn.textContent = 'Send Message ✦';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Form error');
    }
  } catch (err) {
    // Error — show fallback message
    submitBtn.textContent = 'Send Message ✦';
    submitBtn.disabled = false;
    errorMsg.style.display = 'block';
  }
});

// ---- SMOOTH ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});
