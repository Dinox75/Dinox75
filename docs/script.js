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
  // COMENTÁRIOS DINÂMICOS
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

  function configurarCarrosselFeedback() {
    const carousel = document.getElementById("feedbackCarousel");
    const track = document.getElementById("feedbackTrack");
    const btnPrev = document.getElementById("feedbackPrev");
    const btnNext = document.getElementById("feedbackNext");
    const sectionComentarios = document.getElementById("comentarios");

    if (!carousel || !track || !sectionComentarios) return;

    if (carousel.dataset.configurado === "true") {
      return;
    }

    carousel.dataset.configurado = "true";

    let autoScroll = null;
    let tempoRetorno = null;
    let usuarioInteragiu = false;

    function obterDistanciaCard() {
      const card = track.querySelector(".feedback-card");

      if (!card) return 380;

      const estilosTrack = window.getComputedStyle(track);
      const gap = parseFloat(estilosTrack.columnGap || estilosTrack.gap) || 22;

      return card.getBoundingClientRect().width + gap;
    }

    function obterLimiteScroll() {
      return carousel.scrollWidth - carousel.clientWidth;
    }

    function resetarCarrossel() {
      carousel.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }

    function pararAutoScroll() {
      clearInterval(autoScroll);
      autoScroll = null;
    }

    function iniciarAutoScroll() {
      pararAutoScroll();

      if (usuarioInteragiu) return;

      autoScroll = setInterval(() => {
        if (document.hidden) return;

        irParaProximo(false);
      }, 4200);
    }

    function pausarTemporariamente() {
      usuarioInteragiu = true;
      pararAutoScroll();
      clearTimeout(tempoRetorno);

      tempoRetorno = setTimeout(() => {
        usuarioInteragiu = false;
        iniciarAutoScroll();
      }, 7000);
    }

    function irParaProximo(manual = true) {
      const limite = obterLimiteScroll();

      if (limite <= 0) return;

      if (carousel.scrollLeft >= limite - 20) {
        resetarCarrossel();
      }

      carousel.scrollBy({
        left: obterDistanciaCard(),
        behavior: "smooth",
      });

      if (manual) {
        pausarTemporariamente();
      }
    }

    function irParaAnterior(manual = true) {
      const limite = obterLimiteScroll();

      if (limite <= 0) return;

      if (carousel.scrollLeft <= 10) {
        carousel.scrollTo({
          left: limite,
          behavior: "auto",
        });
      }

      carousel.scrollBy({
        left: -obterDistanciaCard(),
        behavior: "smooth",
      });

      if (manual) {
        pausarTemporariamente();
      }
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        irParaProximo(true);
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        irParaAnterior(true);
      });
    }

    carousel.addEventListener("mouseenter", () => {
      pararAutoScroll();
    });

    carousel.addEventListener("mouseleave", () => {
      iniciarAutoScroll();
    });

    carousel.addEventListener("touchstart", () => {
      pausarTemporariamente();
    }, {
      passive: true,
    });

    carousel.addEventListener("wheel", () => {
      pausarTemporariamente();
    }, {
      passive: true,
    });

    const observerFeedback = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetarCarrossel();
            usuarioInteragiu = false;
            iniciarAutoScroll();
          } else {
            pararAutoScroll();
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observerFeedback.observe(sectionComentarios);
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
        const comentariosDuplicados = [...comentarios, ...comentarios];

        feedbackTrack.innerHTML = comentariosDuplicados
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