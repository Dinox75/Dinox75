// =========================
// PORTFÓLIO | VINICIUS LIMA
// Interações gerais da página
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDj5sHZk23QTcDtjppGDMa3DanfYhOVPFWs9G4hhTFeMc2qPoVAqOuSMqrJnA2_FUa/exec";

  const menuMobile = document.getElementById("menuMobile");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section[id]");
  const expandableCards = document.querySelectorAll(".expandable-card");

  // =========================
  // MENU MOBILE
  // =========================

  function abrirMenu() {
    if (!menuMobile || !navMenu) return;

    navMenu.classList.add("active");
    menuMobile.innerHTML = "✕";
    menuMobile.setAttribute("aria-label", "Fechar menu");
  }

  function fecharMenu() {
    if (!menuMobile || !navMenu) return;

    navMenu.classList.remove("active");
    menuMobile.innerHTML = "☰";
    menuMobile.setAttribute("aria-label", "Abrir menu");
  }

  function alternarMenu() {
    if (!navMenu) return;

    if (navMenu.classList.contains("active")) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }

  if (menuMobile && navMenu) {
    menuMobile.addEventListener("click", (event) => {
      event.stopPropagation();
      alternarMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      fecharMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!menuMobile || !navMenu) return;

    const clicouNoMenu = navMenu.contains(event.target);
    const clicouNoBotao = menuMobile.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fecharMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      fecharMenu();
    }
  });


  // =========================
  // HEADER AO ROLAR
  // =========================

  function controlarHeader() {
    if (!header) return;

    if (window.scrollY > 80) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  }


  // =========================
  // LINK ATIVO NO MENU
  // =========================

  function ativarLinkMenu() {
    const scrollAtual = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      const linkMenu = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

      if (scrollAtual >= sectionTop && scrollAtual < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active-link"));

        if (linkMenu) {
          linkMenu.classList.add("active-link");
        }
      }
    });
  }

  function aoRolarPagina() {
    controlarHeader();
    ativarLinkMenu();
  }

  aoRolarPagina();

  window.addEventListener("scroll", aoRolarPagina, {
    passive: true,
  });


  // =========================
  // CARDS EXPANSÍVEIS DOS PROJETOS
  // =========================

  expandableCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Expandir detalhes do projeto");

    card.addEventListener("click", (event) => {
      const clicouEmLink = event.target.closest("a");

      if (clicouEmLink) return;

      expandableCards.forEach((outroCard) => {
        if (outroCard !== card) {
          outroCard.classList.remove("card-open");
          outroCard.setAttribute("aria-label", "Expandir detalhes do projeto");
        }
      });

      card.classList.toggle("card-open");

      if (card.classList.contains("card-open")) {
        card.setAttribute("aria-label", "Recolher detalhes do projeto");
      } else {
        card.setAttribute("aria-label", "Expandir detalhes do projeto");
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });


  // =========================
  // UTILITÁRIO DE SEGURANÇA
  // Evita que comentários virem HTML dentro do site
  // =========================

  function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }


  // =========================
// COMENTÁRIOS DINÂMICOS + CARROSSEL INFINITO
// =========================

function criarCardComentario(comentario) {
  const nome = escaparHTML(comentario.nome || "Visitante");
  const texto = escaparHTML(comentario.comentario || "");

  return `
    <div class="feedback-card">
      <p>“${texto}”</p>
      <span>${nome}</span>
    </div>
  `;
}

let limparCarrosselFeedback = null;

function configurarCarrosselFeedback() {
  const carousel = document.getElementById("feedbackCarousel");
  const track = document.getElementById("feedbackTrack");
  const btnPrev = document.getElementById("feedbackPrev");
  const btnNext = document.getElementById("feedbackNext");
  const sectionComentarios = document.getElementById("comentarios");

  if (!carousel || !track || !sectionComentarios) return;

  if (limparCarrosselFeedback) {
    limparCarrosselFeedback();
    limparCarrosselFeedback = null;
  }

  track.querySelectorAll('[data-clone="true"]').forEach((clone) => {
    clone.remove();
  });

  let cardsReais = Array.from(track.querySelectorAll(".feedback-card"));

  if (cardsReais.length === 0) return;

  let indiceAtual = 0;
  let quantidadeClones = 1;
  let autoScroll = null;
  let timeoutRetorno = null;
  let pausadoPeloUsuario = false;
  let travadoDuranteReset = false;

  function obterGap() {
    const estilosTrack = window.getComputedStyle(track);
    return parseFloat(estilosTrack.columnGap || estilosTrack.gap) || 22;
  }

  function obterLarguraCard() {
    const card = track.querySelector(".feedback-card");

    if (!card) return 360;

    return card.getBoundingClientRect().width + obterGap();
  }

  function obterQuantidadeVisivel() {
    const larguraCard = obterLarguraCard();

    if (!larguraCard) return 1;

    return Math.max(1, Math.ceil(carousel.clientWidth / larguraCard));
  }

  function removerClones() {
    track.querySelectorAll('[data-clone="true"]').forEach((clone) => {
      clone.remove();
    });
  }

  function criarClone(card) {
    const clone = card.cloneNode(true);
    clone.dataset.clone = "true";
    clone.setAttribute("aria-hidden", "true");
    return clone;
  }

  function montarLoop() {
    removerClones();

    cardsReais = Array.from(track.querySelectorAll(".feedback-card"));

    if (cardsReais.length <= 1) {
      indiceAtual = 0;
      aplicarTransform(false);
      return;
    }

    quantidadeClones = Math.min(obterQuantidadeVisivel(), cardsReais.length);

    const clonesInicio = cardsReais
      .slice(-quantidadeClones)
      .map(criarClone);

    const clonesFim = cardsReais
      .slice(0, quantidadeClones)
      .map(criarClone);

    clonesInicio.forEach((clone) => {
      track.insertBefore(clone, track.firstChild);
    });

    clonesFim.forEach((clone) => {
      track.appendChild(clone);
    });

    indiceAtual = quantidadeClones;
    aplicarTransform(false);
  }

  function aplicarTransform(comAnimacao = true) {
    const distancia = obterLarguraCard();
    const deslocamento = indiceAtual * distancia;

    if (comAnimacao) {
      track.style.transition = "transform 0.45s ease";
    } else {
      track.style.transition = "none";
    }

    track.style.transform = `translateX(-${deslocamento}px)`;
  }

  function irParaProximo(manual = true) {
    if (cardsReais.length <= 1 || travadoDuranteReset) return;

    indiceAtual += 1;
    aplicarTransform(true);

    if (manual) {
      pausarTemporariamente();
    }
  }

  function irParaAnterior(manual = true) {
    if (cardsReais.length <= 1 || travadoDuranteReset) return;

    indiceAtual -= 1;
    aplicarTransform(true);

    if (manual) {
      pausarTemporariamente();
    }
  }

  function corrigirLoopInfinito() {
    if (cardsReais.length <= 1) return;

    const totalReais = cardsReais.length;
    const inicioReais = quantidadeClones;
    const fimReais = quantidadeClones + totalReais - 1;

    if (indiceAtual > fimReais) {
      travadoDuranteReset = true;
      indiceAtual = inicioReais;
      aplicarTransform(false);

      requestAnimationFrame(() => {
        travadoDuranteReset = false;
      });
    }

    if (indiceAtual < inicioReais) {
      travadoDuranteReset = true;
      indiceAtual = fimReais;
      aplicarTransform(false);

      requestAnimationFrame(() => {
        travadoDuranteReset = false;
      });
    }
  }

  function pararAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = null;
  }

  function iniciarAutoScroll() {
    pararAutoScroll();

    if (pausadoPeloUsuario || cardsReais.length <= 1) return;

    autoScroll = setInterval(() => {
      if (!document.hidden) {
        irParaProximo(false);
      }
    }, 4200);
  }

  function pausarTemporariamente() {
    pausadoPeloUsuario = true;
    pararAutoScroll();
    clearTimeout(timeoutRetorno);

    timeoutRetorno = setTimeout(() => {
      pausadoPeloUsuario = false;
      iniciarAutoScroll();
    }, 7000);
  }

  function reiniciarNoComeco() {
    indiceAtual = quantidadeClones;
    aplicarTransform(false);
  }

  function aoEntrarOuSairDaSecao(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reiniciarNoComeco();
        pausadoPeloUsuario = false;
        iniciarAutoScroll();
      } else {
        pararAutoScroll();
      }
    });
  }

  function remontarAoRedimensionar() {
    pararAutoScroll();
    montarLoop();
    iniciarAutoScroll();
  }

  btnNext?.addEventListener("click", () => {
    irParaProximo(true);
  });

  btnPrev?.addEventListener("click", () => {
    irParaAnterior(true);
  });

  carousel.addEventListener("mouseenter", pararAutoScroll);

  carousel.addEventListener("mouseleave", iniciarAutoScroll);

  carousel.addEventListener("touchstart", pausarTemporariamente, {
    passive: true,
  });

  track.addEventListener("transitionend", corrigirLoopInfinito);

  window.addEventListener("resize", remontarAoRedimensionar);

  const observerFeedback = new IntersectionObserver(aoEntrarOuSairDaSecao, {
    threshold: 0.35,
  });

  observerFeedback.observe(sectionComentarios);

  montarLoop();

  limparCarrosselFeedback = () => {
    pararAutoScroll();
    clearTimeout(timeoutRetorno);

    btnNext?.removeEventListener("click", irParaProximo);
    btnPrev?.removeEventListener("click", irParaAnterior);

    carousel.removeEventListener("mouseenter", pararAutoScroll);
    carousel.removeEventListener("mouseleave", iniciarAutoScroll);
    track.removeEventListener("transitionend", corrigirLoopInfinito);
    window.removeEventListener("resize", remontarAoRedimensionar);

    observerFeedback.disconnect();
  };
}

function removerComentariosDuplicados(comentarios) {
  const vistos = new Set();

  return comentarios.filter((comentario) => {
    const nome = String(comentario.nome || "Visitante").trim().toLowerCase();
    const texto = String(comentario.comentario || "").trim().toLowerCase();
    const chave = `${nome}-${texto}`;

    if (vistos.has(chave)) {
      return false;
    }

    vistos.add(chave);
    return true;
  });
}

function carregarComentarios() {
  const feedbackTrack = document.getElementById("feedbackTrack");

  if (!feedbackTrack) return;

  const callbackName = `receberComentarios_${Date.now()}`;
  const script = document.createElement("script");

  let callbackExecutado = false;

  function limparJSONP() {
    delete window[callbackName];

    if (script.parentNode) {
      script.remove();
    }
  }

  function usarComentariosPadrao() {
    configurarCarrosselFeedback();
  }

  const timerFallback = setTimeout(() => {
    if (!callbackExecutado) {
      usarComentariosPadrao();
      limparJSONP();
    }
  }, 3500);

  window[callbackName] = (comentarios) => {
    callbackExecutado = true;
    clearTimeout(timerFallback);

    if (Array.isArray(comentarios) && comentarios.length > 0) {
      const comentariosUnicos = removerComentariosDuplicados(comentarios);

      feedbackTrack.innerHTML = comentariosUnicos
        .map(criarCardComentario)
        .join("");
    }

    configurarCarrosselFeedback();
    limparJSONP();
  };

  script.src = `${APPS_SCRIPT_URL}?action=list&callback=${callbackName}&t=${Date.now()}`;

  script.onerror = () => {
    clearTimeout(timerFallback);
    usarComentariosPadrao();
    limparJSONP();
  };

  document.body.appendChild(script);
}

carregarComentarios();


  // =========================
  // ENVIO DO FEEDBACK
  // =========================

  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackStatus = document.getElementById("feedbackStatus");

  if (feedbackForm && feedbackStatus) {
    const botaoFeedback = feedbackForm.querySelector('button[type="submit"]');

    feedbackForm.addEventListener("submit", (event) => {
      const campoComentario = document.getElementById("comentarioFeedback");
      const comentario = campoComentario ? campoComentario.value.trim() : "";

      if (!comentario) {
        event.preventDefault();

        feedbackStatus.textContent = "Digite um comentário antes de enviar.";
        feedbackStatus.classList.remove("sucesso");
        feedbackStatus.classList.add("erro");

        return;
      }

      feedbackStatus.textContent = "Enviando feedback...";
      feedbackStatus.classList.remove("sucesso", "erro");

      if (botaoFeedback) {
        botaoFeedback.disabled = true;
        botaoFeedback.style.opacity = "0.75";
        botaoFeedback.style.cursor = "not-allowed";
      }

      setTimeout(() => {
        feedbackStatus.textContent = "Feedback enviado! Ele aparecerá no site após aprovação.";
        feedbackStatus.classList.remove("erro");
        feedbackStatus.classList.add("sucesso");

        feedbackForm.reset();

        if (botaoFeedback) {
          botaoFeedback.disabled = false;
          botaoFeedback.style.opacity = "1";
          botaoFeedback.style.cursor = "pointer";
        }
      }, 1400);
    });
  }


  // =========================
  // ANIMAÇÃO SUAVE AO ENTRAR NA TELA
  // =========================

  const elementosAnimados = document.querySelectorAll(
    ".section-title, .sobre-text, .sobre-panel, .sobre-timeline, .timeline-item, .info-card, .resumo-card, .projeto-card, .demo-card, .entretenimento-text, .entretenimento-gallery, .rede-card, .feedback-slider, .comentario-action, .contato-content"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("hidden");
      observer.observe(elemento);
    });
  } else {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("show");
    });
  }
});