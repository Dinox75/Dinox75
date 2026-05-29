// =========================
// PORTFÓLIO GAME PROFISSIONAL - VINICIUS LIMA
// v18 | Dev Profile Book + Project Code Editor + Three.js + GSAP + VanillaTilt + Typed.js
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // CONFIGURAÇÕES
  // =========================

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwDj5sHZk23QTcDtjppGDMa3DanfYhOVPFWs9G4hhTFeMc2qPoVAqOuSMqrJnA2_FUa/exec";

  const html = document.documentElement;
  const body = document.body;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const introGate = document.getElementById("introGate");
  const introEnter = document.getElementById("introEnter");
  const introProjects = document.getElementById("introProjects");

  const scrollProgress = document.getElementById("scrollProgress");
  const themeTransition = document.getElementById("themeTransition");

  const menuMobile = document.getElementById("menuMobile");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section[id]");

  const themeToggle = document.getElementById("themeToggle");

  const mascot = document.getElementById("mascot");
  const mascotButton = document.getElementById("mascotButton");
  const mascotBubble = document.getElementById("mascotBubble");
  const robotHead = document.getElementById("robotHead");
  const pupilLeft = document.getElementById("pupilLeft");
  const pupilRight = document.getElementById("pupilRight");

  const projectEditor = document.getElementById("projectEditor");
  const fileButtons = document.querySelectorAll(".file-item");
  const projectTabName = document.getElementById("projectTabName");
  const projectFileName = document.getElementById("projectFileName");
  const projectCodeLines = document.getElementById("projectCodeLines");
  const projectStatus = document.getElementById("projectStatus");
  const projectIcon = document.getElementById("projectIcon");
  const projectTitle = document.getElementById("projectTitle");
  const projectDescription = document.getElementById("projectDescription");
  const projectPain = document.getElementById("projectPain");
  const projectSolution = document.getElementById("projectSolution");
  const projectTechList = document.getElementById("projectTechList");
  const projectActions = document.getElementById("projectActions");


  // =========================
  // INTRO
  // =========================

  let introEncerrada = false;

  function encerrarIntro() {
    if (!introGate || introEncerrada) return;

    introEncerrada = true;
    introGate.classList.add("hide");
    introGate.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      introGate.style.display = "none";
      falarMascote("Bem-vindo ao mapa! Abra o Dev Profile ou o Editor de Projetos.");
      definirExpressaoMascote("happy");
    }, 720);
  }

  if (introEnter) {
    introEnter.addEventListener("click", encerrarIntro);
  }

  if (introProjects) {
    introProjects.addEventListener("click", encerrarIntro);
  }

  setTimeout(encerrarIntro, 4700);


  // =========================
  // PIXELS DA TRANSIÇÃO DE TEMA
  // =========================

  function criarPixelsDeTema() {
    if (!themeTransition || themeTransition.children.length > 0) return;

    const colunas = 22;
    const linhas = 14;
    const total = colunas * linhas;

    for (let i = 0; i < total; i += 1) {
      const pixel = document.createElement("span");
      const coluna = i % colunas;
      const linha = Math.floor(i / colunas);
      const atraso = (coluna + linha) * 0.014;

      pixel.className = "theme-pixel";
      pixel.style.animationDelay = `${atraso}s`;

      themeTransition.appendChild(pixel);
    }
  }

  criarPixelsDeTema();


  // =========================
  // TEMA CLARO / ESCURO
  // =========================

  function obterTemaSalvo() {
    try {
      return localStorage.getItem("portfolio-theme") || "dark";
    } catch {
      return "dark";
    }
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem("portfolio-theme", tema);
    } catch {
      return;
    }
  }

  function atualizarBotaoTema(tema) {
    if (!themeToggle) return;

    const icone = themeToggle.querySelector(".theme-toggle-icon i");
    const texto = themeToggle.querySelector(".theme-toggle-text");

    if (tema === "light") {
      if (icone) {
        icone.className = "fa-solid fa-sun";
      }

      if (texto) {
        texto.textContent = "Claro";
      }

      themeToggle.setAttribute("aria-label", "Alternar para tema escuro");
    } else {
      if (icone) {
        icone.className = "fa-solid fa-moon";
      }

      if (texto) {
        texto.textContent = "Escuro";
      }

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

    if (novoTema === "light") {
      falarMascote("Amanhecendo o mapa... tema claro ativado.");
    } else {
      falarMascote("Modo noturno ativado. Neon ligado.");
    }

    definirExpressaoMascote("thinking");

    setTimeout(() => {
      aplicarTema(novoTema);
    }, 480);

    setTimeout(() => {
      if (themeTransition) {
        themeTransition.classList.remove("active");
      }

      trocandoTema = false;
      definirExpressaoMascote("happy");
    }, 1550);
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

  if (menuMobile) {
    menuMobile.addEventListener("click", (event) => {
      event.stopPropagation();
      alternarMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", fecharMenu);
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
      encerrarIntro();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      fecharMenu();
    }
  });


  // =========================
  // MASCOTE
  // =========================

  const mensagensMascote = [
    "Clique nos arquivos do editor para trocar o projeto.",
    "O Dev Profile Book mostra sua trajetória em formato de código.",
    "O fundo 3D usa Three.js com cubos em pixel style.",
    "A transição de tema usa blocos pixelados em diagonal.",
    "Role devagar para ver as animações de entrada.",
    "Passe o mouse nos cards para sentir o efeito 3D.",
    "Os projetos com demo têm botão separado para abrir a página."
  ];

  let timeoutMascote = null;
  let timeoutExpressao = null;
  let mascoteLivreParaFalar = true;

  function definirExpressaoMascote(expressao, tempo = 2600) {
    if (!mascot) return;

    mascot.classList.remove("happy", "thinking", "dizzy");

    if (expressao) {
      mascot.classList.add(expressao);
    }

    clearTimeout(timeoutExpressao);

    if (expressao && expressao !== "dizzy") {
      timeoutExpressao = setTimeout(() => {
        mascot.classList.remove("happy", "thinking");
      }, tempo);
    }
  }

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
    if (mascoteLivreParaFalar === false) return;

    mascoteLivreParaFalar = false;
    falarMascote(mensagem, 3600);

    setTimeout(() => {
      mascoteLivreParaFalar = true;
    }, 6000);
  }

  function mensagemAleatoriaMascote() {
    const indice = Math.floor(Math.random() * mensagensMascote.length);
    const mensagem = mensagensMascote[indice];

    falarMascote(mensagem);
    definirExpressaoMascote("happy");
  }

  function moverOlhosECabecaDoMascote(event) {
    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefereMenosMovimento) return;

    const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

    html.style.setProperty("--mouse-x", mouseX.toFixed(3));
    html.style.setProperty("--mouse-y", mouseY.toFixed(3));

    if (robotHead) {
      const rotacao = mouseX * 7;
      const deslocamento = mouseX * 4;

      robotHead.style.setProperty("--head-rotate", `${rotacao.toFixed(2)}deg`);
      robotHead.style.setProperty("--head-x", `${deslocamento.toFixed(2)}px`);
    }

    const pupilas = [pupilLeft, pupilRight].filter(Boolean);

    pupilas.forEach((pupila) => {
      const rect = pupila.getBoundingClientRect();
      const centroX = rect.left + rect.width / 2;
      const centroY = rect.top + rect.height / 2;
      const angulo = Math.atan2(event.clientY - centroY, event.clientX - centroX);
      const distancia = 4;
      const moverX = Math.cos(angulo) * distancia;
      const moverY = Math.sin(angulo) * distancia;

      pupila.style.transform = `translate(${moverX}px, ${moverY}px)`;
    });
  }

  if (mascotButton) {
    mascotButton.addEventListener("click", mensagemAleatoriaMascote);
  }

  document.addEventListener("mousemove", moverOlhosECabecaDoMascote, {
    passive: true,
  });


  // =========================
  // SCROLL
  // =========================

  let ultimoScrollY = window.scrollY;
  let ultimoTempoScroll = performance.now();
  let timeoutZonzo = null;

  function atualizarScrollProgress() {
    if (!scrollProgress) return;

    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;

    scrollProgress.style.width = `${progresso}%`;
  }

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

      if (!sectionId) return;

      const linkMenu = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

      if (scrollAtual >= sectionTop && scrollAtual < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active-link");
        });

        if (linkMenu) {
          linkMenu.classList.add("active-link");
        }
      }
    });
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
      }, 1350);
    }

    ultimoScrollY = window.scrollY;
    ultimoTempoScroll = agora;
  }

  function aoRolarPagina() {
    atualizarScrollProgress();
    controlarHeader();
    ativarLinkMenu();
    reagirVelocidadeScroll();
  }

  aoRolarPagina();

  window.addEventListener("scroll", aoRolarPagina, {
    passive: true,
  });


  // =========================
  // TYPED.JS HERO
  // =========================

  function iniciarTypedHero() {
    const typedHero = document.getElementById("typedHero");

    if (!typedHero) return;

    if (typeof Typed === "undefined") {
      typedHero.textContent = "Desenvolvedor em formação";
      return;
    }

    new Typed("#typedHero", {
      strings: [
        "Desenvolvedor em formação",
        "Estudante de Dados e Sistemas",
        "Criador de projetos em Python",
        "Explorando automação e Power BI",
        "Construindo evolução no GitHub"
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 1350,
      loop: true,
      smartBackspace: true
    });
  }

  iniciarTypedHero();


  // =========================
  // THREE.JS BACKGROUND
  // =========================

  function iniciarCenaThree() {
    const canvas = document.getElementById("threeScene");

    if (!canvas || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const group = new THREE.Group();
    scene.add(group);

    const colors = [0x38bdf8, 0x8b5cf6, 0x22c55e, 0xfacc15];
    const geometry = new THREE.BoxGeometry(0.38, 0.38, 0.38);

    for (let i = 0; i < 48; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: i % 5 === 0,
        transparent: true,
        opacity: i % 5 === 0 ? 0.45 : 0.72,
      });

      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = (Math.random() - 0.5) * 16;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;

      cube.userData = {
        speedX: 0.002 + Math.random() * 0.006,
        speedY: 0.002 + Math.random() * 0.006,
        floatSpeed: 0.5 + Math.random() * 1.5,
        baseY: cube.position.y,
      };

      group.add(cube);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener(
      "mousemove",
      (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      {
        passive: true,
      }
    );

    function animar() {
      requestAnimationFrame(animar);

      const tempo = performance.now() * 0.001;

      group.rotation.y += 0.0015;
      group.rotation.x += 0.0007;

      group.position.x += (mouseX * 0.35 - group.position.x) * 0.02;
      group.position.y += (-mouseY * 0.25 - group.position.y) * 0.02;

      group.children.forEach((cube) => {
        cube.rotation.x += cube.userData.speedX;
        cube.rotation.y += cube.userData.speedY;
        cube.position.y = cube.userData.baseY + Math.sin(tempo * cube.userData.floatSpeed) * 0.18;
      });

      renderer.render(scene, camera);
    }

    animar();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  iniciarCenaThree();


  // =========================
  // GSAP ANIMATIONS
  // =========================

  function iniciarAnimacoesGSAP() {
    if (typeof gsap === "undefined") {
      document
        .querySelectorAll(".reveal-up, .reveal-scale")
        .forEach((elemento) => {
          elemento.classList.add("fallback-show");
        });

      return;
    }

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.utils.toArray(".reveal-up").forEach((elemento) => {
      gsap.fromTo(
        elemento,
        {
          opacity: 0,
          y: 42,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elemento,
            start: "top 82%",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-scale").forEach((elemento) => {
      gsap.fromTo(
        elemento,
        {
          opacity: 0,
          scale: 0.94,
          rotateX: 4,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elemento,
            start: "top 82%",
          },
        }
      );
    });

    gsap.utils.toArray(".skill-hud").forEach((hud, index) => {
      gsap.to(hud, {
        y: -12,
        duration: 2.2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }

  iniciarAnimacoesGSAP();


  // =========================
  // PROJECT CODE EDITOR
  // =========================

  const projetos = {
    smartMarket: {
      file: "smart_market.py",
      icon: "🛒",
      title: "Smart Market",
      status: "Em desenvolvimento",
      description:
        "Sistema em Python para controle de compras de mercado, histórico de preços, comparação entre compras e análise de gastos.",
      pain: "Dificuldade em acompanhar gastos, preços e variações entre compras.",
      solution:
        "Registrar compras, comparar preços e identificar aumentos, quedas e novos produtos.",
      techs: ["Python", "JSON", "Automação"],
      repo: "https://github.com/Dinox75/Smart_market",
      demo: "",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"Smart Market"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Em desenvolvimento"</span>',
        '<span class="code-keyword">stack</span> = [<span class="code-string">"Python"</span>, <span class="code-string">"JSON"</span>, <span class="code-string">"Automação"</span>]',
        '<span class="code-keyword">pain</span> = <span class="code-string">"Controlar gastos e variações de preço"</span>',
        '<span class="code-keyword">solution</span> = <span class="code-string">"Histórico + comparação de compras"</span>',
        '<span class="code-keyword">next_step</span> = <span class="code-string">"Leitura de nota fiscal via XML"</span>'
      ]
    },

    workWatch: {
      file: "workwatch.py",
      icon: "📊",
      title: "WorkWatch",
      status: "Em desenvolvimento",
      description:
        "Ferramenta local para monitoramento de produtividade no computador, registrando janelas ativas e atividades em CSV.",
      pain: "Pouca visibilidade sobre como o tempo é usado no computador.",
      solution:
        "Registrar programas e janelas ativas para gerar dados de análise e relatórios.",
      techs: ["Python", "CSV", "Monitoramento"],
      repo: "https://github.com/Dinox75/WorkWatch",
      demo: "",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"WorkWatch"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Em desenvolvimento"</span>',
        '<span class="code-keyword">stack</span> = [<span class="code-string">"Python"</span>, <span class="code-string">"CSV"</span>, <span class="code-string">"Monitoramento"</span>]',
        '<span class="code-keyword">goal</span> = <span class="code-string">"Analisar produtividade local"</span>',
        '<span class="code-keyword">logs</span> = <span class="code-string">"janela ativa + data/hora"</span>',
        '<span class="code-keyword">future</span> = <span class="code-string">"Dashboard e relatórios"</span>'
      ]
    },

    escala: {
      file: "simulador_escala.py",
      icon: "📅",
      title: "Simulador de Escala",
      status: "Demo publicada",
      description:
        "Sistema em Python criado para calcular dias de trabalho e folga com base em escalas configuráveis, como 6x3.",
      pain: "Dificuldade de prever folgas e dias trabalhados em escalas rotativas.",
      solution:
        "Calcular automaticamente o status de uma data e os próximos dias da escala.",
      techs: ["Python", "CLI", "GitHub Pages"],
      repo: "https://github.com/Dinox75/simulador-escala-trabalho",
      demo: "https://dinox75.github.io/simulador-escala-trabalho/demo/",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"Simulador de Escala"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Demo publicada"</span>',
        '<span class="code-keyword">scale</span> = <span class="code-string">"6x3"</span>',
        '<span class="code-keyword">function</span> calcular_status(data_inicio, data_consulta):',
        '    <span class="code-keyword">return</span> <span class="code-string">"Trabalhando ou Folga"</span>',
        '<span class="code-keyword">demo</span> = <span class="code-string">"GitHub Pages"</span>'
      ]
    },

    media: {
      file: "media_escolar.html",
      icon: "🎓",
      title: "Sistema de Média Escolar",
      status: "Demo publicada",
      description:
        "Projeto para cálculo de média escolar, reforçando fundamentos de lógica, entrada de dados, condições e apresentação em página web.",
      pain: "Praticar fundamentos de programação de forma simples e visual.",
      solution:
        "Calcular médias e transformar um exercício em projeto publicável.",
      techs: ["Python", "HTML", "GitHub Pages"],
      repo: "https://github.com/Dinox75/Sistema_media_escolar",
      demo: "https://dinox75.github.io/Sistema_media_escolar/",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"Sistema de Média Escolar"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Demo publicada"</span>',
        '<span class="code-keyword">base</span> = [<span class="code-string">"lógica"</span>, <span class="code-string">"condições"</span>, <span class="code-string">"média"</span>]',
        '<span class="code-keyword">origin</span> = <span class="code-string">"Curso em Vídeo - Mundo 2"</span>',
        '<span class="code-keyword">goal</span> = <span class="code-string">"Reforçar fundamentos"</span>',
        '<span class="code-keyword">publish</span> = <span class="code-string">"GitHub Pages"</span>'
      ]
    },

    bancario: {
      file: "sistema_bancario.py",
      icon: "🏦",
      title: "Sistema Bancário DIO",
      status: "Desafio DIO",
      description:
        "Desafio prático em Python para simular depósito, saque, extrato e controle de regras.",
      pain: "Praticar lógica aplicada com regras de negócio simples.",
      solution:
        "Criar um sistema bancário de terminal com operações controladas.",
      techs: ["Python", "Funções", "Regras"],
      repo: "https://github.com/Dinox75/Sistema-bancario-DIO",
      demo: "",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"Sistema Bancário DIO"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Desafio prático"</span>',
        '<span class="code-keyword">operations</span> = [<span class="code-string">"depósito"</span>, <span class="code-string">"saque"</span>, <span class="code-string">"extrato"</span>]',
        '<span class="code-keyword">rules</span> = <span class="code-string">"limites e validações"</span>',
        '<span class="code-keyword">goal</span> = <span class="code-string">"Treinar lógica aplicada"</span>',
        '<span class="code-keyword">next</span> = <span class="code-string">"Refatorar com funções"</span>'
      ]
    },

    entrevista: {
      file: "entrevista_bot.py",
      icon: "💼",
      title: "Simulador de Entrevista",
      status: "Projeto prático",
      description:
        "Sistema em Python para simular uma entrevista de emprego, coletar respostas e organizar uma avaliação final do candidato.",
      pain: "Treinar estrutura de perguntas, respostas e análise de perfil.",
      solution:
        "Criar um fluxo de entrevista com coleta de dados e avaliação textual.",
      techs: ["Python", "Validação", "Fluxo"],
      repo: "https://github.com/Dinox75/Simulador-de-Entrevista",
      demo: "",
      code: [
        '<span class="code-keyword">project</span> = <span class="code-string">"Simulador de Entrevista"</span>',
        '<span class="code-keyword">status</span> = <span class="code-string">"Projeto prático"</span>',
        '<span class="code-keyword">flow</span> = [<span class="code-string">"perguntas"</span>, <span class="code-string">"respostas"</span>, <span class="code-string">"avaliação"</span>]',
        '<span class="code-keyword">goal</span> = <span class="code-string">"Treinar fluxo e validação"</span>',
        '<span class="code-keyword">analysis</span> = <span class="code-string">"palavras-chave e perfil"</span>',
        '<span class="code-keyword">future</span> = <span class="code-string">"Interface mais amigável"</span>'
      ]
    }
  };

  function renderizarLinhasCodigo(linhas) {
    return linhas.map((linha) => `<li>${linha}</li>`).join("");
  }

  function renderizarTechs(techs) {
    return techs.map((tech) => `<span>${tech}</span>`).join("");
  }

  function renderizarActions(projeto) {
    const repoButton = `
      <a href="${projeto.repo}" target="_blank" rel="noopener noreferrer" class="btn-card">
        <i class="fa-brands fa-github"></i>
        Repositório
      </a>
    `;

    const demoButton = projeto.demo
      ? `
        <a href="${projeto.demo}" target="_blank" rel="noopener noreferrer" class="btn-card btn-card-secondary">
          <i class="fa-solid fa-play"></i>
          Demo
        </a>
      `
      : "";

    return repoButton + demoButton;
  }

  function selecionarProjeto(chave) {
    const projeto = projetos[chave];

    if (!projeto) return;

    fileButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.project === chave);
    });

    if (projectTabName) projectTabName.textContent = projeto.file;
    if (projectFileName) projectFileName.textContent = projeto.file;
    if (projectCodeLines) projectCodeLines.innerHTML = renderizarLinhasCodigo(projeto.code);
    if (projectStatus) projectStatus.textContent = projeto.status;
    if (projectIcon) projectIcon.textContent = projeto.icon;
    if (projectTitle) projectTitle.textContent = projeto.title;
    if (projectDescription) projectDescription.textContent = projeto.description;
    if (projectPain) projectPain.textContent = projeto.pain;
    if (projectSolution) projectSolution.textContent = projeto.solution;
    if (projectTechList) projectTechList.innerHTML = renderizarTechs(projeto.techs);
    if (projectActions) projectActions.innerHTML = renderizarActions(projeto);

    falarMascote(`Arquivo carregado: ${projeto.file}`);
    definirExpressaoMascote("happy");

    if (typeof gsap !== "undefined" && projectEditor) {
      gsap.fromTo(
        ".project-preview",
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
      );

      gsap.fromTo(
        ".project-code-lines li",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.28, stagger: 0.035, ease: "power2.out" }
      );
    }

    configurarEfeito3D();
  }

  fileButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selecionarProjeto(button.dataset.project);
    });
  });


  // =========================
  // EFEITO 3D NOS CARDS
  // =========================

  function configurarEfeito3D() {
    const elementos3D = document.querySelectorAll(
      ".card-tilt, .profile-card, .skill-node, .feedback-card, .contact-card, .timeline-card, .mini-project-card, .project-preview, .code-window, .profile-avatar-frame"
    );

    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!elementos3D.length) return;

    if (prefereMenosMovimento) {
      html.classList.add("no-tilt");
      return;
    }

    if (typeof VanillaTilt !== "undefined") {
      html.classList.remove("no-tilt");

      elementos3D.forEach((elemento) => {
        if (elemento.vanillaTilt) return;

        VanillaTilt.init(elemento, {
          max: 8,
          speed: 450,
          glare: true,
          "max-glare": 0.18,
          scale: 1.015,
          perspective: 900,
        });
      });

      return;
    }

    html.classList.add("no-tilt");
    configurarBrilhoFallback(elementos3D);
  }

  function configurarBrilhoFallback(elementos) {
    elementos.forEach((elemento) => {
      if (elemento.dataset.fallbackGlow === "true") return;

      elemento.dataset.fallbackGlow = "true";

      elemento.addEventListener("mousemove", (event) => {
        const rect = elemento.getBoundingClientRect();
        const brilhoX = ((event.clientX - rect.left) / rect.width) * 100;
        const brilhoY = ((event.clientY - rect.top) / rect.height) * 100;

        elemento.style.setProperty("--glow-x", `${brilhoX}%`);
        elemento.style.setProperty("--glow-y", `${brilhoY}%`);
      });

      elemento.addEventListener("mouseleave", () => {
        elemento.style.removeProperty("--glow-x");
        elemento.style.removeProperty("--glow-y");
      });
    });
  }

  configurarEfeito3D();


  // =========================
  // PIXEL CLICK
  // =========================

  document.addEventListener("click", (event) => {
    const pixel = document.createElement("span");

    pixel.className = "click-pixel";
    pixel.style.left = `${event.clientX}px`;
    pixel.style.top = `${event.clientY}px`;

    body.appendChild(pixel);

    setTimeout(() => {
      pixel.remove();
    }, 650);
  });


  // =========================
  // CARROSSEL DE FEEDBACKS
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
      <article class="feedback-card card-tilt">
        <p>“${texto}”</p>
        <span>${nome}</span>
      </article>
    `;
  }

  function removerComentariosDuplicados(comentarios) {
    const vistos = new Set();

    return comentarios.filter((comentario) => {
      const nome = String(comentario.nome || "Visitante").trim().toLowerCase();
      const texto = String(comentario.comentario || "").trim().toLowerCase();
      const chave = `${nome}-${texto}`;

      if (!texto) return false;
      if (vistos.has(chave)) return false;

      vistos.add(chave);
      return true;
    });
  }

  function configurarCarrosselFeedback() {
    const carousel = document.getElementById("feedbackCarousel");
    const track = document.getElementById("feedbackTrack");
    const btnPrev = document.getElementById("feedbackPrev");
    const btnNext = document.getElementById("feedbackNext");
    const sectionFeedback = document.getElementById("feedbacks");

    if (!carousel || !track || !sectionFeedback) return;

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

      track.style.transition = comAnimacao ? "transform 0.45s ease" : "none";
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

      const clonesInicio = cardsReais.slice(-quantidadeClones).map(criarClone);
      const clonesFim = cardsReais.slice(0, quantidadeClones).map(criarClone);

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
      if (manual) pausarTemporariamente();
    }

    function irParaAnterior(manual = true) {
      if (cardsReais.length <= 1 || travadoDuranteReset) return;
      indiceAtual -= 1;
      aplicarTransform(true);
      if (manual) pausarTemporariamente();
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

    if (btnNext) {
      btnNext.addEventListener("click", () => irParaProximo(true));
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => irParaAnterior(true));
    }

    carousel.addEventListener("mouseenter", pararAutoScroll);
    carousel.addEventListener("mouseleave", iniciarAutoScroll);
    carousel.addEventListener("touchstart", pausarTemporariamente, { passive: true });
    track.addEventListener("transitionend", corrigirLoopInfinito);

    window.addEventListener("resize", () => {
      clearTimeout(timeoutRetorno);

      timeoutRetorno = setTimeout(() => {
        pararAutoScroll();
        removerClones();
        montarLoop();
        iniciarAutoScroll();
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
      { threshold: 0.35 }
    );

    observerFeedback.observe(sectionFeedback);
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
      configurarEfeito3D();
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
  // ENVIO DE FEEDBACK
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
        definirExpressaoMascote("happy");
      }, 1400);
    });
  }


  // =========================
  // FALAS POR SEÇÃO
  // =========================

  if ("IntersectionObserver" in window) {
    const observerFalas = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const fala = entry.target.dataset.mascot;

          if (fala) {
            falarMascoteComIntervalo(fala);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((section) => {
      observerFalas.observe(section);
    });
  }


  // =========================
  // INICIALIZAÇÃO FINAL
  // =========================

  selecionarProjeto("smartMarket");
});
