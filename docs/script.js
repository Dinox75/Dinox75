// =========================
// MENU MOBILE
// =========================

const menuMobile = document.getElementById("menuMobile");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuMobile && navMenu) {
  menuMobile.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


// =========================
// EFEITO NO CABEÇALHO AO ROLAR
// =========================

const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  });
}