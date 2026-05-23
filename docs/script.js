// =========================
// MENU MOBILE
// =========================

const menuMobile = document.getElementById("menuMobile");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const header = document.querySelector(".header");

// Abre e fecha o menu mobile
if (menuMobile && navMenu) {
  menuMobile.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      menuMobile.innerHTML = "✕";
      menuMobile.setAttribute("aria-label", "Fechar menu");
    } else {
      menuMobile.innerHTML = "☰";
      menuMobile.setAttribute("aria-label", "Abrir menu");
    }
  });
}

// Fecha o menu ao clicar em qualquer link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuMobile.innerHTML = "☰";
    menuMobile.setAttribute("aria-label", "Abrir menu");
  });
});


// =========================
// FECHAR MENU AO CLICAR FORA
// =========================

document.addEventListener("click", (event) => {
  const clicouNoMenu = navMenu.contains(event.target);
  const clicouNoBotao = menuMobile.contains(event.target);

  if (!clicouNoMenu && !clicouNoBotao) {
    navMenu.classList.remove("active");
    menuMobile.innerHTML = "☰";
    menuMobile.setAttribute("aria-label", "Abrir menu");
  }
});


// =========================
// EFEITO NO CABEÇALHO AO ROLAR
// =========================

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  });
}


// =========================
// DESTACAR LINK ATIVO NO MENU
// =========================

const sections = document.querySelectorAll("section[id]");

function ativarLinkMenu() {
  const scrollAtual = window.scrollY + 120;

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

window.addEventListener("scroll", ativarLinkMenu);


// =========================
// ANIMAÇÃO SUAVE DE ENTRADA
// =========================

const elementosAnimados = document.querySelectorAll(
  ".section-title, .projeto-card, .demo-card, .rede-card, .comentario-card, .contato-card, .info-card"
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