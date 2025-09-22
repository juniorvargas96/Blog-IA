document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.querySelector('.carossel');
  const cards = Array.from(document.querySelectorAll('.carossel .card'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const container = document.querySelector('.carossel-container');

  if (!carrossel || cards.length === 0 || !prev || !next) {
    console.error('Elementos do carossel não encontrados. Verifique nomes/classes e paths dos arquivos.');
    return;
  }

  let current = 0;
  const total = cards.length;
  const angle = 360 / total;

  // ------------ troca de tema + logo ------------
    const html = document.documentElement;
    const logo = document.getElementById("logo") || document.querySelector('.logo img');

  // calcula um raio adequado com base na largura do card
  const cardWidth = cards[0].offsetWidth || 380;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / total)) + 20;

  // posiciona cada card ao redor do eixo Y
  cards.forEach((card, i) => {
    const rotation = angle * i;
    card.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
  });

  function update() {
    // move o "carrossel" para mostrar o card atual (e cria profundidade)
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

  // pausa autoplay ao passar o mouse
  container.addEventListener('mouseenter', () => clearInterval(autoId));
  container.addEventListener('mouseleave', resetAuto);

  // inicializa
  update();
});
