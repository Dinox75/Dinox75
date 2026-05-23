// =========================
// PORTFÓLIO | VINICIUS LIMA
// Interações gerais da página
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const menuMobile = document.getElementById("menuMobile");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section[id]");
  const expandableCards = document.querySelectorAll(".expandable-card");

  // =========================
  // FUNÇÕES AUXILIARES
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


  // =========================
  // MENU MOBILE
  // =========================

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
  // EFEITO NO CABEÇALHO AO ROLAR
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
  // ANIMAÇÃO SUAVE DE ENTRADA
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