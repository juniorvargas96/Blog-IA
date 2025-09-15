// lista de anúncios (caminho dentro da pasta assets)
const imagens = [
    "assert/jp.png",
    "assert/senac-sc.png",
];

let index = 0;
const banner = document.getElementById("banner");

function trocarBanner() {
    banner.style.backgroundImage = `url(${imagens[index]})`;
    index = (index + 1) % imagens.length; // volta ao início quando chega no fim
}

// inicia e troca a cada 4 segundos
trocarBanner();
setInterval(trocarBanner, 4000);


