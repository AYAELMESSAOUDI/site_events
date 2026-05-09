// ════════════════════════════════════════
//   Aya.js — YourEvents JavaScript
// ════════════════════════════════════════

// ── 1. NAVBAR : change d'apparence au scroll ──
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.backgroundColor = 'rgba(45, 90, 76, 0.97)'; // vert foncé au scroll
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // blanc au départ
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  }
});


// ── 2. SCROLL REVEAL : éléments qui apparaissent en scrollant ──
const revealElements = document.querySelectorAll(
  '.card, .ye-hammam-card, .ye-rituel-card, .ye-feature, .ye-theme-card, .ye-sweet-card, .ye-anim-card, .ye-package, .category-header, .ye-section-head'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Délai progressif pour chaque élément
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});


// ── 3. TABS ANNIVERSAIRE : navigation entre sections ──
const tabs = document.querySelectorAll('.ye-tab');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();

    // Retirer la classe active de tous les tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Ajouter active sur le tab cliqué
    tab.classList.add('active');

    // Scroll doux vers la section ciblée
    const targetId = tab.getAttribute('href'); // ex: #thematique
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offset = 100; // hauteur du header
      const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── 4. COMPTEUR ANIMÉ (chiffres qui s'incrémentent) ──
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

// Observer pour déclencher les compteurs quand ils sont visibles
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ── 5. NAVBAR : lien actif selon la page courante ──
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});


// ── 6. MENU BURGER pour mobile ──

// Créer le bouton burger dynamiquement
const nav = document.querySelector('nav');

if (nav) {
  const burger = document.createElement('button');
  burger.innerHTML = '☰';
  burger.id = 'burger-btn';
  burger.style.cssText = `
    display: none;
    background: none;
    border: 2px solid var(--brun-sombre, #D4AF37);
    color: var(--brun-sombre, #D4AF37);
    font-size: 1.4rem;
    padding: 5px 12px;
    cursor: pointer;
    border-radius: 4px;
  `;

  // Insérer le burger avant la nav
  header.insertBefore(burger, nav);

  // Afficher le burger seulement sur mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      #burger-btn { display: block !important; }
      nav { display: none; width: 100%; }
      nav.open {
        display: block;
        position: absolute;
        top: 70px;
        left: 0; right: 0;
        background: rgba(45, 90, 76, 0.98);
        padding: 20px;
        z-index: 999;
      }
      nav.open ul {
        flex-direction: column;
        gap: 15px;
      }
      nav.open ul li a {
        color: white !important;
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Toggle menu au clic
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
  });

  // Fermer le menu quand on clique sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.innerHTML = '☰';
    });
  });
}


// ── 7. RETOUR EN HAUT (bouton scroll-to-top) ──
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.id = 'scroll-top';
scrollBtn.title = 'Retour en haut';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--brun-maroc, #2D5A4C);
  color: white;
  border: 2px solid var(--brun-sombre, #D4AF37);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 9999;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.transform = 'translateY(0)';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.transform = 'translateY(10px)';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── 8. CARTES : effet de survol avec son ombre dorée ──
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 50px rgba(197, 160, 89, 0.25)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 30px 60px rgba(0,0,0,0.1)';
  });
});


// ── 9. MESSAGE DE CONFIRMATION dans le formulaire ──
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.textContent = '✓ Message envoyé !';
      btn.style.backgroundColor = '#2D5A4C';
      btn.style.color = 'white';
      btn.disabled = true;
    }

    // Remettre après 3 secondes
    setTimeout(() => {
      if (btn) {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }
      form.reset();
    }, 3000);
  });
}


// ── 10. FOOTER : liens sociaux avec animation ──
const socialLinks = document.querySelectorAll('.social-icons a');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateX(5px)';
    link.style.transition = 'transform 0.2s ease';
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateX(0)';
  });
});

console.log('✦ YourEvents JS chargé avec succès');