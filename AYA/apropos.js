

document.addEventListener('DOMContentLoaded', () => {

  
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'ap-particle';

      const size = Math.random() * 4 + 1.5;
      const left = Math.random() * 100;
      const delay = Math.random() * 6;
      const duration = 4 + Math.random() * 5;
      const bottom = Math.random() * 60;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: ${bottom}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: 0;
      `;
      particlesContainer.appendChild(p);
    }
  }


  // ── 2. SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));


  // ── 3. COMPTEURS ANIMÉS ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));


 
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 70) {
        header.style.backgroundColor = 'rgba(45, 90, 76, 0.97)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
        
        document.querySelectorAll('nav ul li a').forEach(a => {
          a.style.color = 'rgba(245,245,220,0.9)';
        });
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        document.querySelectorAll('nav ul li a').forEach(a => {
          a.style.color = '';
        });
      }
    }, { passive: true });
  }


  
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Retour en haut');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px; right: 30px;
    width: 50px; height: 50px;
    border-radius: 50%;
    background: var(--brun-maroc, #2D5A4C);
    color: var(--brun-sombre, #D4AF37);
    border: 2px solid var(--brun-sombre, #D4AF37);
    font-size: 1.3rem;
    cursor: pointer;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 9999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    font-family: inherit;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
      scrollBtn.style.transform = 'translateY(8px)';
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


 
  const nav = document.getElementById('main-nav');
  if (nav && header) {
    const burger = document.createElement('button');
    burger.innerHTML = '☰';
    burger.id = 'ap-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.style.cssText = `
      display: none;
      background: none;
      border: 2px solid var(--brun-sombre, #D4AF37);
      color: var(--brun-sombre, #D4AF37);
      font-size: 1.3rem;
      padding: 6px 13px;
      cursor: pointer;
      border-radius: 4px;
      order: 3;
    `;
    header.appendChild(burger);

    
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
      @media (max-width: 768px) {
        #ap-burger { display: block !important; }
        #main-nav {
          display: none !important;
          position: absolute;
          top: 100%; left: 0; right: 0;
          background: rgba(45,90,76,0.98);
          padding: 20px 30px;
          z-index: 999;
          border-top: 2px solid var(--brun-sombre, #D4AF37);
        }
        #main-nav.ap-open { display: block !important; }
        #main-nav ul {
          flex-direction: column;
          gap: 16px;
        }
        #main-nav ul li a {
          color: var(--beige-clair, #F5F5DC) !important;
          font-size: 1rem;
        }
        header {
          position: relative;
          flex-wrap: wrap;
        }
      }
    `;
    document.head.appendChild(mobileStyle);

    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('ap-open');
      burger.innerHTML = isOpen ? '✕' : '☰';
    });

    
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('ap-open');
        burger.innerHTML = '☰';
      });
    });
  }


  
  document.querySelectorAll('.ap-team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


 
  const timelineItems = document.querySelectorAll('.ap-timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 200);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => tlObserver.observe(item));


 
  const valueCards = document.querySelectorAll('.ap-value-card');
  const valuesSection = document.querySelector('.ap-values');

  if (valuesSection) {
    const valObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          valueCards.forEach((card, i) => {
            setTimeout(() => {
              card.style.borderTopColor = 'var(--brun-sombre)';
              card.style.boxShadow = '0 8px 30px rgba(212,175,55,0.12)';
            }, i * 150);
          });
          valObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    valObserver.observe(valuesSection);
  }


  
  document.querySelectorAll('.ap-stat-num').forEach(num => {
    num.addEventListener('mouseenter', () => {
      num.style.transition = 'transform 0.2s ease, color 0.2s ease';
      num.style.transform = 'scale(1.1)';
      num.style.color = 'var(--gold-light, #e6be8a)';
    });
    num.addEventListener('mouseleave', () => {
      num.style.transform = 'scale(1)';
      num.style.color = '';
    });
  });


  console.log('✦ apropos.js chargé avec succès');
});