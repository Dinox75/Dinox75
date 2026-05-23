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

  controlarHeader();
  window.addEventListener("scroll", controlarHeader);


  // =========================
  // LINK ATIVO NO MENU
  // =========================

  function ativarLinkMenu() {
    const scrollAtual = window.scrollY + 130;

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

  ativarLinkMenu();
  window.addEventListener("scroll", ativarLinkMenu);


  // =========================
  // CARDS EXPANSÍVEIS
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
  // COMENTÁRIOS DINÂMICOS
  // =========================

  function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }

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

  function carregarComentarios() {
    const feedbackTrack = document.getElementById("feedbackTrack");

    if (!feedbackTrack) return;

    const callbackName = `receberComentarios_${Date.now()}`;

    window[callbackName] = (comentarios) => {
      if (Array.isArray(comentarios) && comentarios.length > 0) {
        const comentariosDuplicados = [...comentarios, ...comentarios];

        feedbackTrack.innerHTML = comentariosDuplicados
          .map(criarCardComentario)
          .join("");
      }

      delete window[callbackName];
      script.remove();
    };

    const script = document.createElement("script");
    script.src = `${APPS_SCRIPT_URL}?action=list&callback=${callbackName}&t=${Date.now()}`;
    script.onerror = () => {
      delete window[callbackName];
      script.remove();
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
    feedbackForm.addEventListener("submit", () => {
      feedbackStatus.textContent = "Enviando feedback...";

      setTimeout(() => {
        feedbackStatus.textContent = "Feedback enviado! Ele aparecerá no site após aprovação.";
        feedbackForm.reset();
      }, 1200);
    });
  }


  // =========================
  // ANIMAÇÃO SUAVE
  // =========================

  const elementosAnimados = document.querySelectorAll(
    ".section-title, .sobre-text, .info-card, .resumo-card, .projeto-card, .demo-card, .entretenimento-text, .entretenimento-gallery, .rede-card, .comentario-action, .contato-content"
  );

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
});