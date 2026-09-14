/* =========================================================
   Para ti, Glorita   script.js
  si ves esto, es pq hiciste trampa xd
   ========================================================= */

   console.log(`
╭──────────────────────────────╮
   Hola, Glorita :3
╰──────────────────────────────╯

Si llegaste hasta aqui...

No es un dia especial.
No hay ninguna fecha importante.
Simplemente queria hacerte algo bonito.

No soy el mejor haciendo paginas web JAJAJA,
pero hice lo mejor que pude y cada parte
la hice pensando en ti.

Espero que te haya gustado.

Y por si la pagina no lo dejo suficientemente claro:

Eres muy importante para mi.
Muchisimo.

— Sebas UwU
`);

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const gate = document.getElementById('gate');
  const enterBtn = document.getElementById('enter-btn');
  const main = document.getElementById('main');

  enterBtn.addEventListener('click', () => {
    gate.classList.add('is-leaving');
    main.hidden = false;

    const delay = prefersReducedMotion ? 0 : 650;
    window.setTimeout(() => {
      main.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      revealVisibleSections();
    }, delay);
  });

  const revealTargets = document.querySelectorAll('[data-reveal]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target);

          const revealTextEl = entry.target.querySelector('[data-reveal-text]');
          if (revealTextEl) {
            animateWordsIn(revealTextEl);
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  revealTargets.forEach((el) => sectionObserver.observe(el));

  function revealVisibleSections() {
    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('is-visible');
      }
    });
  }

  function animateWordsIn(container) {
    // Evita repetir la animacion si ya se aplico
    if (container.dataset.animated === 'true') return;
    container.dataset.animated = 'true';

    const originalText = container.textContent.trim();
    const words = originalText.split(/\s+/);

    container.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ');

    const wordEls = container.querySelectorAll('.word');

    if (prefersReducedMotion) {
      wordEls.forEach((w) => w.classList.add('is-visible'));
      return;
    }

    wordEls.forEach((wordEl, i) => {
      window.setTimeout(() => {
        wordEl.classList.add('is-visible');
      }, i * 70);
    });
  }

  const flipCards = document.querySelectorAll('[data-flip]');

  flipCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  const cinnamonBtn = document.getElementById('cinnamon-btn');
  const cinnamonMessage = document.getElementById('cinnamon-message');

  const cinnamonPhrases = [
    'Glorita es muy importante para Sebas <3',
    'Espero que nunca olvides lo mucho que significas para mí.',
    'Te mereces cosas bonitas.',
    'Gracias por existir.',
    'Nunca dudes de lo especial que eres para mí.',
  ];

  const cinnamonAnimations = ['anim-pop', 'anim-rise', 'anim-spin', 'anim-fade'];
  let lastPhraseIndex = -1;

  cinnamonBtn.addEventListener('click', () => {
    // Evita repetir la misma frase dos veces seguidas cuando es posible
    let index = Math.floor(Math.random() * cinnamonPhrases.length);
    if (cinnamonPhrases.length > 1) {
      while (index === lastPhraseIndex) {
        index = Math.floor(Math.random() * cinnamonPhrases.length);
      }
    }
    lastPhraseIndex = index;

    const animClass =
      cinnamonAnimations[Math.floor(Math.random() * cinnamonAnimations.length)];

    cinnamonMessage.textContent = cinnamonPhrases[index];

    cinnamonAnimations.forEach((c) => cinnamonMessage.classList.remove(c));
    if (!prefersReducedMotion) {
      void cinnamonMessage.offsetWidth;
      cinnamonMessage.classList.add(animClass);
    }
  });

  const letterOpenBtn = document.querySelector('[data-letter-open]');
  const letterPaper = document.querySelector('[data-letter-paper]');

  letterOpenBtn.addEventListener('click', () => {
    const isOpen = letterOpenBtn.getAttribute('aria-expanded') === 'true';

    if (!isOpen) {
      letterPaper.hidden = false;
      letterOpenBtn.setAttribute('aria-expanded', 'true');
      letterOpenBtn.querySelector('.letter__seal-label').textContent =
        'Cerrar la carta';
    } else {
      letterPaper.hidden = true;
      letterOpenBtn.setAttribute('aria-expanded', 'false');
      letterOpenBtn.querySelector('.letter__seal-label').textContent =
        'Abrir la carta';
    }
  });

  const finishBtn = document.getElementById('finish-btn');
  const finalMessage = document.getElementById('final-message');
  const finaleLayer = document.getElementById('finale-layer');

  const finaleSymbols = ['♡', '☁', '✦', '☁', '♡', '✦'];

  finishBtn.addEventListener('click', () => {
    finalMessage.hidden = false;
    finishBtn.setAttribute('disabled', 'true');
    launchFinale();
  });

  function launchFinale() {
    if (prefersReducedMotion) return;

    const total = 24;
    for (let i = 0; i < total; i++) {
      window.setTimeout(() => spawnFinaleItem(), i * 120);
    }
  }

  function spawnFinaleItem() {
    const item = document.createElement('span');
    item.className = 'finale-item';
    item.textContent =
      finaleSymbols[Math.floor(Math.random() * finaleSymbols.length)];

    const leftPos = Math.random() * 96; // vw, con margen
    const duration = 4 + Math.random() * 3; // segundos
    const size = 1 + Math.random() * 1.3; // rem

    item.style.left = leftPos + 'vw';
    item.style.fontSize = size + 'rem';
    item.style.animationDuration = duration + 's';
    item.style.color =
      Math.random() > 0.5 ? '#5B9BD5' : '#E79BC1';

    finaleLayer.appendChild(item);

    window.setTimeout(() => {
      item.remove();
    }, duration * 1000 + 200);
  }

  const topBtn = document.getElementById('top-btn');

  window.addEventListener('scroll', () => {
    topBtn.hidden = window.scrollY < window.innerHeight * 0.6;
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
})();
