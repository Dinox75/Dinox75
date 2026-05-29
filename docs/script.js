// =========================
// PORTFÓLIO GAME IMERSIVO | VINICIUS LIMA
// Versão: v13
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDj5sHZk23QTcDtjppGDMa3DanfYhOVPFWs9G4hhTFeMc2qPoVAqOuSMqrJnA2_FUa/exec";

  const html = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const introGate = document.getElementById("introGate");
  const introSkip = document.getElementById("introSkip");
  const scrollProgress = document.getElementById("scrollProgress");

  const menuMobile = document.getElementById("menuMobile");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section[id]");
  const expandableCards = document.querySelectorAll(".expandable-card");

  const themeToggle = document.getElementById("themeToggle");
  const themeTransition = document.getElementById("themeTransition");

  const mascot = document.getElementById("mascot");
  const mascotButton = document.getElementById("mascotButton");
  const mascotBubble = document.getElementById("mascotBubble");
  const pupilLeft = document.getElementById("pupilLeft");
  const pupilRight = document.getElementById("pupilRight");
  const interactiveRoom = document.getElementById("interactiveRoom");

  const roomDialog = document.getElementById("roomDialog");
  const roomDialogBadge = document.getElementById("roomDialogBadge");
  const roomDialogTitle = document.getElementById("roomDialogTitle");
  const roomDialogText = document.getElementById("roomDialogText");
  const roomDialogLink = document.getElementById("roomDialogLink");
  const closeDialogButtons = document.querySelectorAll("[data-close-dialog]");


  // =========================
  // PIXELS DA TRANSIÇÃO DE TEMA
  // =========================

  function criarPixelsDeTema() {
    if (!themeTransition || themeTransition.children.length > 0) return;

    const colunas = 18;
    const linhas = 12;
    const total = colunas * linhas;

    for (let i = 0; i < total; i += 1) {
      const pixel = document.createElement("span");
      pixel.className = "theme-pixel";

      const coluna = i % colunas;
      const linha = Math.floor(i / colunas);
      const delay = (coluna + linha) * 0.018;

      pixel.style.animationDelay = `${delay}s`;
      themeTransition.appendChild(pixel);
    }
  }

  criarPixelsDeTema();


  // =========================
  // TEMA CLARO / ESCURO
  // =========================

  function obterTemaSalvo() {
    return localStorage.getItem("portfolio-theme") || "dark";
  }

  function salvarTema(tema) {
    localStorage.setItem("portfolio-theme", tema);
  }

  function atualizarBotaoTema(tema) {
    if (!themeToggle) return;

    const icone = themeToggle.querySelector(".theme-toggle-icon i");
    const texto = themeToggle.querySelector(".theme-toggle-text");

    if (tema === "light") {
      if (icone) icone.className = "fa-solid fa-sun";
      if (texto) texto.textContent = "Claro";
      themeToggle.setAttribute("aria-label", "Alternar para tema escuro");
    } else {
      if (icone) icone.className = "fa-solid fa-moon";
      if (texto) texto.textContent = "Escuro";
      themeToggle.setAttribute("aria-label", "Alternar para tema claro");
    }
  }

  function aplicarTema(tema) {
    html.setAttribute("data-theme", tema);
    salvarTema(tema);
    atualizarBotaoTema(tema);

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", tema === "light" ? "#eff8ff" : "#020617");
    }
  }

  let trocandoTema = false;

  function alternarTemaComTransicao() {
    if (trocandoTema) return;

    trocandoTema = true;

    const temaAtual = html.getAttribute("data-theme") || "dark";
    const novoTema = temaAtual === "dark" ? "light" : "dark";

    if (themeTransition) {
      themeTransition.classList.remove("active");
      void themeTransition.offsetWidth;
      themeTransition.classList.add("active");
    }

    falarMascote(
      novoTema === "light"
        ? "Amanhecendo o mapa... tema claro ativado."
        : "Modo noturno ativado. Neon ligado."
    );

    setTimeout(() => {
      aplicarTema(novoTema);
    }, 460);

    setTimeout(() => {
      if (themeTransition) {
        themeTransition.classList.remove("active");
      }

      trocandoTema = false;
    }, 1500);
  }

  aplicarTema(obterTemaSalvo());

  if (themeToggle) {
    themeToggle.addEventListener("click", alternarTemaComTransicao);
  }


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
      fecharDialog();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      fecharMenu();
    }
  });


  // =========================
  // HEADER E LINK ATIVO
  // =========================

  function controlarHeader() {
    if (!header) return;

    if (window.scrollY > 80) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  }

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
  // MASCOTE FIXO COM OLHOS + REAÇÃO AO SCROLL
  // =========================

  const mensagensMascote = [
    "Clique no monitor para abrir os projetos.",
    "A estante mostra estudos, documentação e evolução.",
    "O portal leva para contato profissional.",
    "O painel mostra dados e automação.",
    "O terminal abre o GitHub.",
    "Passe o mouse nos cards para sentir o efeito 3D.",
    "Role devagar para aproveitar melhor a experiência."
  ];

  let timeoutMascote = null;
  let mascoteLivreParaFalar = true;
  let ultimoScrollY = window.scrollY;
  let ultimoTempoScroll = performance.now();
  let timeoutZonzo = null;

  function falarMascote(mensagem, tempo = 4200) {
    if (!mascot || !mascotBubble) return;

    mascotBubble.textContent = mensagem;
    mascot.classList.add("talking");

    clearTimeout(timeoutMascote);

    timeoutMascote = setTimeout(() => {
      mascot.classList.remove("talking");
    }, tempo);
  }

  function falarMascoteComIntervalo(mensagem) {
    if (!mascoteLivreParaFalar) return;

    mascoteLivreParaFalar = false;
    falarMascote(mensagem, 3600);

    setTimeout(() => {
      mascoteLivreParaFalar = true;
    }, 6000);
  }

  function mensagemAleatoriaMascote() {
    const indice = Math.floor(Math.random() * mensagensMascote.length);
    falarMascote(mensagensMascote[indice]);
  }

  function moverOlhosDoMascote(event) {
    if (!pupilLeft || !pupilRight) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduzido) return;

    [pupilLeft, pupilRight].forEach((pupila) => {
      const rect = pupila.getBoundingClientRect();
      const centroX = rect.left + rect.width / 2;
      const centroY = rect.top + rect.height / 2;
      const angulo = Math.atan2(event.clientY - centroY, event.clientX - centroX);
      const distancia = 5;
      const moverX = Math.cos(angulo) * distancia;
      const moverY = Math.sin(angulo) * distancia;

      pupila.style.transform = `translate(${moverX}px, ${moverY}px)`;
    });

    const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

    html.style.setProperty("--mouse-x", mouseX.toFixed(3));
    html.style.setProperty("--mouse-y", mouseY.toFixed(3));
  }

  if (mascotButton) {
    mascotButton.addEventListener("click", mensagemAleatoriaMascote);
  }

  document.addEventListener("mousemove", moverOlhosDoMascote, {
    passive: true,
  });

  if (mascot) {
    setTimeout(() => {
      falarMascote("Bem-vindo ao meu mapa! Comece pelo quarto interativo.");
    }, 900);
  }


  // =========================
  // INTRO IMERSIVA
  // =========================

  function encerrarIntro() {
    if (!introGate) return;

    introGate.classList.add("hide");
    introGate.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      introGate.style.display = "none";
      falarMascote("Mapa carregado. Clique nos objetos do quarto para explorar.");
    }, 720);
  }

  if (introSkip) {
    introSkip.addEventListener("click", encerrarIntro);
  }

  setTimeout(encerrarIntro, 3600);


  // =========================
  // SCROLL IMERSIVO
  // =========================

  function atualizarScrollProgress() {
    if (!scrollProgress) return;

    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;

    scrollProgress.style.width = `${progresso}%`;
  }

  function reagirVelocidadeScroll() {
    const agora = performance.now();
    const deltaY = Math.abs(window.scrollY - ultimoScrollY);
    const deltaTempo = Math.max(16, agora - ultimoTempoScroll);
    const velocidade = deltaY / deltaTempo;

    if (velocidade > 2.2 && mascot) {
      mascot.classList.add("dizzy");
      falarMascoteComIntervalo("Uau, scroll rápido! Fiquei meio zonzo aqui.");

      clearTimeout(timeoutZonzo);

      timeoutZonzo = setTimeout(() => {
        mascot.classList.remove("dizzy");
      }, 1300);
    }

    ultimoScrollY = window.scrollY;
    ultimoTempoScroll = agora;
  }

  window.addEventListener("scroll", () => {
    atualizarScrollProgress();
    reagirVelocidadeScroll();
  }, {
    passive: true,
  });

  atualizarScrollProgress();


  // =========================
  // QUARTO INTERATIVO
  // =========================

  const dadosDoQuarto = {
    projetos: {
      badge: "Terminal",
      titulo: "Projetos em destaque",
      texto: "Aqui estão meus principais projetos: Smart Market, WorkWatch, Simulador de Escala, Sistema de Média Escolar, Sistema Bancário DIO e Simulador de Entrevista.",
      link: "#projetos",
      cta: "Abrir projetos",
      fala: "Terminal acessado. Os projetos são a parte mais importante do mapa."
    },
    dados: {
      badge: "Painel de dados",
      titulo: "Dados, automação e análise",
      texto: "Meu foco atual envolve Python, Power BI, Excel, CSV, JSON, relatórios e automações voltadas para problemas reais.",
      link: "#skills",
      cta: "Ver habilidades",
      fala: "Painel de dados aberto. Aqui ficam as skills de análise e automação."
    },
    estudos: {
      badge: "Estante",
      titulo: "Estudos e evolução contínua",
      texto: "Minha evolução vem de estudo constante, prática com Python, documentação no GitHub, criação de Wikis e projetos publicados.",
      link: "#sobre",
      cta: "Ver trajetória",
      fala: "A estante guarda a evolução: estudar, praticar, documentar e melhorar."
    },
    contato: {
      badge: "Portal",
      titulo: "Contato profissional",
      texto: "Use esta área para acessar e-mail, WhatsApp, LinkedIn, GitHub e currículo. Estou aberto a conexões, feedbacks e oportunidades de entrada na área.",
      link: "#contato",
      cta: "Ir para contato",
      fala: "Portal aberto. Caminho direto para contato e networking."
    },
    midia: {
      badge: "Arcade",
      titulo: "Games, eventos e criação de conteúdo",
      texto: "Além da tecnologia, também mantenho contato com games, eventos, cultura digital e criação de conteúdo.",
      link: "#entretenimento",
      cta: "Ver mídia",
      fala: "Arcade ligado. Essa parte mostra seu lado criativo."
    },
    curriculo: {
      badge: "Documento",
      titulo: "Currículo profissional",
      texto: "Acesse meu currículo em PDF para ver minha formação, certificados e informações profissionais.",
      link: "assets/cv/curriculo-vinicius-lima.pdf",
      cta: "Abrir currículo",
      fala: "Documento encontrado. Currículo pronto para visualização."
    },
    github: {
      badge: "Terminal",
      titulo: "GitHub e repositórios",
      texto: "Meu GitHub reúne projetos, estudos, documentação, READMEs, Wikis e minha evolução prática em tecnologia.",
      link: "https://github.com/Dinox75",
      cta: "Abrir GitHub",
      fala: "Terminal aberto. Repositórios carregados."
    }
  };

  function abrirDialog(chave) {
    const dados = dadosDoQuarto[chave];

    if (!dados || !roomDialog) return;

    roomDialogBadge.textContent = dados.badge;
    roomDialogTitle.textContent = dados.titulo;
    roomDialogText.textContent = dados.texto;
    roomDialogLink.textContent = dados.cta;
    roomDialogLink.setAttribute("href", dados.link);

    if (dados.link.endsWith(".pdf") || dados.link.startsWith("http")) {
      roomDialogLink.setAttribute("target", "_blank");
      roomDialogLink.setAttribute("rel", "noopener noreferrer");
    } else {
      roomDialogLink.removeAttribute("target");
      roomDialogLink.removeAttribute("rel");
    }

    roomDialog.classList.add("active");
    roomDialog.setAttribute("aria-hidden", "false");

    falarMascote(dados.fala);
  }

  function fecharDialog() {
    if (!roomDialog) return;

    roomDialog.classList.remove("active");
    roomDialog.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".room-object").forEach((objeto) => {
    objeto.addEventListener("click", () => {
      abrirDialog(objeto.dataset.room);
    });

    objeto.addEventListener("mouseenter", () => {
      const dados = dadosDoQuarto[objeto.dataset.room];
      if (dados) {
        falarMascote(dados.fala, 2800);
      }
    });
  });

  closeDialogButtons.forEach((botao) => {
    botao.addEventListener("click", fecharDialog);
  });

  if (roomDialogLink) {
    roomDialogLink.addEventListener("click", () => {
      fecharDialog();
    });
  }

  if (interactiveRoom) {
    interactiveRoom.addEventListener("mousemove", (event) => {
      const rect = interactiveRoom.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;

      interactiveRoom.style.setProperty("--room-x", `${x}px`);
      interactiveRoom.style.setProperty("--room-y", `${y}px`);
    });

    interactiveRoom.addEventListener("mouseleave", () => {
      interactiveRoom.style.setProperty("--room-x", "0px");
      interactiveRoom.style.setProperty("--room-y", "0px");
    });
  }

  document.addEventListener("click", (event) => {
    const pixel = document.createElement("span");

    pixel.className = "click-pixel";
    pixel.style.left = `${event.clientX}px`;
    pixel.style.top = `${event.clientY}px`;

    document.body.appendChild(pixel);

    setTimeout(() => {
      pixel.remove();
    }, 650);
  });


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
        falarMascote("Detalhes do projeto abertos. Boa leitura.");
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
  // EFEITO 3D NOS CARDS
  // =========================

  function configurarEfeito3D() {
    const elementos3D = document.querySelectorAll(".card-tilt, .hero-card-3d");

    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dispositivoTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefereMenosMovimento || dispositivoTouch) return;

    elementos3D.forEach((elemento) => {
      elemento.addEventListener("mousemove", (event) => {
        const rect = elemento.getBoundingClientRect();

        const posicaoX = event.clientX - rect.left;
        const posicaoY = event.clientY - rect.top;

        const centroX = rect.width / 2;
        const centroY = rect.height / 2;

        const rotacaoX = ((posicaoY - centroY) / centroY) * -5;
        const rotacaoY = ((posicaoX - centroX) / centroX) * 5;

        const glowX = (posicaoX / rect.width) * 100;
        const glowY = (posicaoY / rect.height) * 100;

        elemento.style.setProperty("--glow-x", `${glowX}%`);
        elemento.style.setProperty("--glow-y", `${glowY}%`);

        elemento.style.transform = `
          perspective(900px)
          rotateX(${rotacaoX}deg)
          rotateY(${rotacaoY}deg)
          translateY(-8px)
        `;
      });

      elemento.addEventListener("mouseleave", () => {
        elemento.style.transform = "";
        elemento.style.removeProperty("--glow-x");
        elemento.style.removeProperty("--glow-y");
      });
    });
  }

  configurarEfeito3D();


  // =========================
  // COMENTÁRIOS
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
      <div class="feedback-card card-3d card-tilt">
        <p>“${texto}”</p>
        <span>${nome}</span>
      </div>
    `;
  }

  function removerComentariosDuplicados(comentarios) {
    const vistos = new Set();

    return comentarios.filter((comentario) => {
      const nome = String(comentario.nome || "Visitante").trim().toLowerCase();
      const texto = String(comentario.comentario || "").trim().toLowerCase();
      const chave = `${nome}-${texto}`;

      if (!texto) return false;

      if (vistos.has(chave)) {
        return false;
      }

      vistos.add(chave);
      return true;
    });
  }

  function configurarCarrosselFeedback() {
    const carousel = document.getElementById("feedbackCarousel");
    const track = document.getElementById("feedbackTrack");
    const btnPrev = document.getElementById("feedbackPrev");
    const btnNext = document.getElementById("feedbackNext");
    const sectionComentarios = document.getElementById("comentarios");

    if (!carousel || !track || !sectionComentarios) return;

    if (track.dataset.carouselConfigurado === "true") {
      return;
    }

    track.dataset.carouselConfigurado = "true";

    let cardsReais = [];
    let indiceAtual = 0;
    let quantidadeClones = 1;
    let autoScroll = null;
    let timeoutRetorno = null;
    let pausadoPeloUsuario = false;
    let travadoDuranteReset = false;

    function obterCardsReais() {
      return Array.from(track.querySelectorAll(".feedback-card:not([data-clone='true'])"));
    }

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
      track.querySelectorAll("[data-clone='true']").forEach((clone) => {
        clone.remove();
      });
    }

    function criarClone(card) {
      const clone = card.cloneNode(true);
      clone.dataset.clone = "true";
      clone.setAttribute("aria-hidden", "true");
      return clone;
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

    function montarLoop() {
      removerClones();

      cardsReais = obterCardsReais();

      if (cardsReais.length === 0) return;

      if (cardsReais.length === 1) {
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

    function remontarCarrossel() {
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

    carousel.addEventListener("touchstart", () => {
      pausarTemporariamente();
    }, {
      passive: true,
    });

    track.addEventListener("transitionend", corrigirLoopInfinito);

    window.addEventListener("resize", () => {
      clearTimeout(timeoutRetorno);

      timeoutRetorno = setTimeout(() => {
        remontarCarrossel();
      }, 250);
    });

    const observerFeedback = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reiniciarNoComeco();
            pausadoPeloUsuario = false;
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

    montarLoop();
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

        falarMascote("Feedback enviado para aprovação. Obrigado pela ajuda!");
      }, 1400);
    });
  }


  // =========================
  // ANIMAÇÕES DE ENTRADA
  // =========================

  const elementosAnimados = document.querySelectorAll(
    ".section-title, .hero-content, .hero-stage, .room-instructions, .game-room, .quest-log, .sobre-text, .sobre-panel, .sobre-timeline, .timeline-item, .info-card, .resumo-card, .projeto-card, .skill-tree, .entretenimento-text, .entretenimento-gallery, .feedback-slider, .comentario-action, .contato-content"
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

  // =========================
  // FALAS DO MASCOTE POR SEÇÃO
  // =========================

  const falasPorSecao = {
    inicio: "Essa é a tela inicial do portfólio.",
    "game-room": "Este é o quarto interativo. Clique nos objetos.",
    sobre: "Aqui fica a trajetória e a forma como venho evoluindo.",
    resumo: "Resumo rápido da minha evolução e foco atual.",
    projetos: "Aqui estão os projetos principais.",
    skills: "Esta é a árvore de habilidades.",
    entretenimento: "Aqui aparece meu lado gamer e criativo.",
    comentarios: "Essa área recebe feedbacks e sugestões.",
    contato: "Aqui estão os caminhos para falar comigo."
  };

  if ("IntersectionObserver" in window) {
    const observerSecoes = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");
          const fala = falasPorSecao[id];

          if (fala) {
            falarMascoteComIntervalo(fala);
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    sections.forEach((section) => {
      observerSecoes.observe(section);
    });
  }

});
