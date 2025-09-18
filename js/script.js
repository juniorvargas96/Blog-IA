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
  
    // ------------ troca de tema + logo ------------
    const html = document.documentElement;
    const logo = document.getElementById("logo") || document.querySelector('.logo img');
  
    // Aplica tema salvo (se existir) ou mantém o padrão do HTML
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
  
    // garante logo correta ao carregar
    setLogo();
  
    // se você usa onclick="toggleMode()" no HTML, precisamos expor essa função globalmente:
    window.toggleMode = function () {
      html.classList.toggle('dark');
      html.classList.toggle('light');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      setLogo();
    };
  
    // alternativa: se não quiser onclick inline, pode associar evento:
    // const switchEl = document.getElementById('switch');
    // if (switchEl) switchEl.addEventListener('click', window.toggleMode);
  });
  
  const hamburguer = document.getElementById('hamburguer');
  const navLinks = document.getElementById('nav-links');
  
  hamburguer.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });