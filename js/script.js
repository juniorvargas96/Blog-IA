document.addEventListener('DOMContentLoaded', () => {
  // ------------ banner rotativo ------------
  const imagens = [
    "assert/jp.png",
    "assert/senac-sc.png"
  ];
  let index = 0;
  const banner = document.getElementById("banner");

  function trocarBanner() {
    if (!banner) return;
    banner.style.backgroundImage = `url('${imagens[index]}')`;
    index = (index + 1) % imagens.length;
  }

  trocarBanner();
  setInterval(trocarBanner, 4000);

  // ------------ carrossel ------------
  const carrossel = document.querySelector('.carossel');
  const cards = Array.from(document.querySelectorAll('.carossel .card'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const container = document.querySelector('.carossel-container');

  if (carrossel && cards.length && prev && next) {
    let current = 0;
    const total = cards.length;
    const angle = 360 / total;

    // calcula um raio adequado com base na largura do card
    const cardWidth = cards[0].offsetWidth || 380;
    const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / total)) + 20;

    // posiciona cada card ao redor do eixo Y
    cards.forEach((card, i) => {
      const rotation = angle * i;
      card.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
    });

    function update() {
      carrossel.style.transform = `translateZ(-${radius}px) rotateY(${-current * angle}deg)`;
    }

    next.addEventListener('click', () => {
      current = (current + 1) % total;
      update();
      resetAuto();
    });

    prev.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      update();
      resetAuto();
    });

    // autoplay (a cada 4s)
    let autoId = setInterval(() => {
      current = (current + 1) % total;
      update();
    }, 4000);

    function resetAuto() {
      clearInterval(autoId);
      autoId = setInterval(() => {
        current = (current + 1) % total;
        update();
      }, 4000);
    }

    if (container) {
      container.addEventListener('mouseenter', () => clearInterval(autoId));
      container.addEventListener('mouseleave', resetAuto);
    }

    // inicializa
    update();
  } else {
    console.error('Elementos do carrossel não encontrados. Verifique nomes/classes e paths dos arquivos.');
  }

  // ------------ troca de tema + logo ------------
  const html = document.documentElement;
  const logo = document.getElementById("logo") || document.querySelector('.logo img');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  } else if (saved === 'light') {
    html.classList.add('light');
    html.classList.remove('dark');
  }

  function setLogo() {
    if (!logo) return;
    if (html.classList.contains('dark')) {
      logo.src = "assert/logo-jp-dark.png";
    } else {
      logo.src = "assert/logo-jp.png";
    }
  }

  setLogo();

  window.toggleMode = function () {
    html.classList.toggle('dark');
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    setLogo();
  };

  // ------------ menu hamburguer ------------
  const hamburguer = document.getElementById('hamburguer');
  const navLinks = document.getElementById('nav-links');

  if (hamburguer && navLinks) {
    hamburguer.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});
