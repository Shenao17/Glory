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

    // Al terminar el desvanecido se quita la portada del flujo,
    // asi no queda una pantalla en blanco arriba al hacer scroll.
    const delay = prefersReducedMotion ? 0 : 800;
    window.setTimeout(() => {
      gate.hidden = true;
      window.scrollTo({ top: 0, behavior: 'auto' });
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

  /* ---------- modo noche ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');

  function isNight() {
    return root.getAttribute('data-theme') === 'night';
  }

  function syncThemeBtn() {
    themeBtn.textContent = isNight() ? '☀️' : '🌙';
    themeBtn.setAttribute(
      'aria-label',
      isNight() ? 'Cambiar a modo día' : 'Cambiar a modo noche'
    );
  }

  themeBtn.addEventListener('click', () => {
    if (isNight()) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'night');
    syncThemeBtn();
    // si Cinnamonroll estaba hablando, se "despierta" / "duerme" y se calla
    const msg = document.getElementById('cinnamon-message');
    if (msg) msg.textContent = '';
  });
  syncThemeBtn();

  /* ---------- nube secreta ---------- */
  const secretCloud = document.getElementById('secret-cloud');
  const secretMessage = document.getElementById('secret-message');

  secretCloud.addEventListener('click', () => {
    secretCloud.classList.add('is-found');
    secretMessage.hidden = false;
  });

  /* ---------- hormiguita ---------- */
  const ant = document.getElementById('ant');
  const antToast = document.getElementById('ant-toast');
  let antToastTimer;

  function walkAnt() {
    ant.hidden = false;
    ant.classList.remove('is-walking');
    void ant.offsetWidth;
    ant.classList.add('is-walking');
  }

  ant.addEventListener('animationend', () => {
    ant.classList.remove('is-walking');
    ant.hidden = true;
    // vuelve a pasar en un rato (entre 35 y 70 segundos)
    window.setTimeout(walkAnt, 35000 + Math.random() * 35000);
  });

  ant.addEventListener('click', () => {
    antToast.hidden = false;
    window.clearTimeout(antToastTimer);
    antToastTimer = window.setTimeout(() => {
      antToast.hidden = true;
    }, 4500);
  });

  // la primera vez aparece un ratito despues de entrar
  if (!prefersReducedMotion) {
    enterBtn.addEventListener(
      'click',
      () => window.setTimeout(walkAnt, 12000),
      { once: true }
    );
  }

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

    // de noche Cinnamonroll habla entre sueños
    cinnamonMessage.textContent = isNight()
      ? `(entre sueños) ${cinnamonPhrases[index]} ...zzz`
      : cinnamonPhrases[index];

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

  const finalLines = finalMessage.querySelectorAll('[data-final-line]');
  const restartBtn = document.getElementById('restart-btn');

  // de dia: corazones, nubes, la abejita y la hormiguita
  // de noche: estrellas y lunitas
  const daySymbols = ['♡', '☁', '✦', '♡', '🐝', '♡', '☁', '🐜'];
  const nightSymbols = ['✦', '☆', '♡', '🌙', '✦', '♡', '🐝'];

  finishBtn.addEventListener('click', () => {
    finishBtn.hidden = true;
    finalMessage.hidden = false;
    revealFinalLines();
    launchFinale();
  });

  restartBtn.addEventListener('click', backToGate);

  function revealFinalLines() {
    if (prefersReducedMotion) {
      finalLines.forEach((line) => line.classList.add('is-visible'));
      return;
    }
    finalLines.forEach((line, i) => {
      window.setTimeout(() => {
        line.classList.add('is-visible');
        line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400 + i * 1400);
    });
  }

  function launchFinale() {
    if (prefersReducedMotion) return;

    // tres oleadas de cositas subiendo mientras aparecen las palabras
    for (let wave = 0; wave < 3; wave++) {
      for (let i = 0; i < 18; i++) {
        window.setTimeout(() => spawnFinaleItem(), wave * 3500 + i * 140);
      }
    }

    // la abejita cruza volando y la hormiguita pasa por abajo
    window.setTimeout(flyBee, 1800);
    window.setTimeout(() => {
      if (!ant.classList.contains('is-walking')) walkAnt();
    }, 4500);
  }

  function flyBee() {
    const bee = document.createElement('span');
    bee.className = 'finale-bee';
    bee.textContent = '🐝';
    finaleLayer.appendChild(bee);
    bee.addEventListener('animationend', () => bee.remove());
  }

  function spawnFinaleItem() {
    const symbols = isNight() ? nightSymbols : daySymbols;
    const item = document.createElement('span');
    item.className = 'finale-item';
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const leftPos = Math.random() * 96; // vw, con margen
    const duration = 4 + Math.random() * 3; // segundos
    const size = 1 + Math.random() * 1.3; // rem

    item.style.left = leftPos + 'vw';
    item.style.fontSize = size + 'rem';
    item.style.animationDuration = duration + 's';
    item.style.color = isNight()
      ? Math.random() > 0.5 ? '#FDF3C4' : '#F6CFE0'
      : Math.random() > 0.5 ? '#5B9BD5' : '#E79BC1';

    finaleLayer.appendChild(item);

    window.setTimeout(() => {
      item.remove();
    }, duration * 1000 + 200);
  }

  const topBtn = document.getElementById('top-btn');

  window.addEventListener(
    'scroll',
    () => {
      topBtn.hidden = window.scrollY < window.innerHeight * 0.6;
    },
    { passive: true }
  );

  const gateReturn = document.getElementById('gate-return');
  const enterLabel = enterBtn.querySelector('.gate__enter-label');

  // Al subir del todo, vuelve la portada con un mensaje extra.
  topBtn.addEventListener('click', backToGate);

  function backToGate() {
    if (gate.hidden) {
      const prevY = window.scrollY;
      gate.hidden = false;
      gateReturn.hidden = false;
      enterLabel.textContent = 'Volver a entrar';

      // La portada empuja todo hacia abajo: compensamos para que no salte
      // y luego subimos suave hasta ella.
      window.scrollTo({ top: prevY + gate.offsetHeight, behavior: 'auto' });
      void gate.offsetWidth;
      gate.classList.remove('is-leaving');
    }

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }
})();
