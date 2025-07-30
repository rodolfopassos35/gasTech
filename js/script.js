/* const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnEsquerda = document.querySelector('.seta-esquerda');
const btnDireita = document.querySelector('.seta-direita');
const paginadores = document.querySelector('.paginadores');

let index = 0;
let itemWidth = 0;
let imagensPorPagina = 1;
let maxIndex = imagens.length - 1;

// Calcular itemWidth e atualizar carrossel
function atualizarCarrossel() {
    itemWidth = imagens[0].offsetWidth + 10;

    const larguraCarrossel = document.querySelector('.carrossel-container').offsetWidth;
    imagensPorPagina = Math.floor(larguraCarrossel / itemWidth);
    maxIndex = imagens.length - imagensPorPagina;

    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    const deslocamento = index * itemWidth;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;

    document.querySelectorAll('.paginador').forEach((p, i) => {
        p.classList.toggle('ativo', i === index);
    });
}

// Evento de carregamento inicial
window.addEventListener('load', () => {
    atualizarCarrossel();
});

// Redimensionamento da tela
window.addEventListener('resize', () => {
    atualizarCarrossel();
});

// Botões manuais
btnEsquerda.addEventListener('click', () => {
    index--;
    atualizarCarrossel();
});

btnDireita.addEventListener('click', () => {
    index++;
    atualizarCarrossel();
});

// Swipe em mobile
let touchStartX = 0;
let touchEndX = 0;

carrossel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carrossel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    const sensibilidade = 50;
    if (touchEndX < touchStartX - sensibilidade) {
        index++;
        atualizarCarrossel();
    } else if (touchEndX > touchStartX + sensibilidade) {
        index--;
        atualizarCarrossel();
    }
}

// Criar paginadores
imagens.forEach((_, i) => {
    const ponto = document.createElement('span');
    ponto.classList.add('paginador');
    if (i === 0) ponto.classList.add('ativo');
    paginadores.appendChild(ponto);
});
 */
const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnEsquerda = document.querySelector('.seta-esquerda');
const btnDireita = document.querySelector('.seta-direita');
const paginadores = document.querySelector('.paginadores');

let index = 0;
let itemWidth = 0;
let imagensPorPagina = 1;
let maxIndex = imagens.length - 1;

// Atualiza largura, calcula imagens por página e move o carrossel
function atualizarCarrossel() {
    itemWidth = imagens[0].offsetWidth + 10;

    const larguraCarrossel = document.querySelector('.carrossel-container').offsetWidth;
    imagensPorPagina = Math.floor(larguraCarrossel / itemWidth);
    maxIndex = imagens.length - imagensPorPagina;

    // Corrige o índice se ultrapassar os limites
    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    const deslocamento = index * itemWidth;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;

    // Atualiza paginador ativo
    const paginaAtual = Math.floor(index);
    document.querySelectorAll('.paginador').forEach((p, i) => {
        p.classList.toggle('ativo', i === paginaAtual);
    });

}

// Cria paginadores de acordo com a quantidade de páginas
function criarPaginadores() {
    paginadores.innerHTML = ''; // Limpa os pontos anteriores

    const numPaginas = Math.ceil(imagens.length / imagensPorPagina);
    for (let i = 0; i < numPaginas; i++) {
        const ponto = document.createElement('span');
        ponto.classList.add('paginador');
        if (i === 0) ponto.classList.add('ativo');

        ponto.addEventListener('click', () => {
            index = i;
            atualizarCarrossel();
        });

        paginadores.appendChild(ponto);
    }
}

// Botões de navegação
btnEsquerda.addEventListener('click', () => {
    if (index > 0) {
        index--;
        atualizarCarrossel();
    }
});

btnDireita.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
        atualizarCarrossel();
    }
});


// Swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

carrossel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carrossel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    const sensibilidade = 50;
    if (touchEndX < touchStartX - sensibilidade) {
        index++;
        atualizarCarrossel();
    } else if (touchEndX > touchStartX + sensibilidade) {
        index--;
        atualizarCarrossel();
    }
}

// Eventos de inicialização e redimensionamento
window.addEventListener('load', () => {
    atualizarCarrossel();
    criarPaginadores();
});

window.addEventListener('resize', () => {
    atualizarCarrossel();
    criarPaginadores();
});


