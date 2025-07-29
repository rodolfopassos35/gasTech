const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnEsquerda = document.querySelector('.seta-esquerda');
const btnDireita = document.querySelector('.seta-direita');
const paginadores = document.querySelector('.paginadores');
let itemWidth;

window.addEventListener('load', () => {
    itemWidth = imagens[0].offsetWidth + 10;
    atualizarCarrossel();
});

let index = 0;

// Botões manuais
btnEsquerda.addEventListener('click', () => {
    index = (index - 1 + imagens.length) % imagens.length;
    atualizarCarrossel();
});

btnDireita.addEventListener('click', () => {
    index = (index + 1) % imagens.length;
    atualizarCarrossel();
});

// Paginadores
imagens.forEach((_, i) => {
    const ponto = document.createElement('span');
    ponto.classList.add('paginador');
    if (i === 0) ponto.classList.add('ativo');
    paginadores.appendChild(ponto);
});

function atualizarCarrossel() {
    const limiteMax = (imagens.length - 3) * itemWidth;
    carrossel.style.transform = `translateX(-${Math.min(index * itemWidth, limiteMax)}px)`;

    document.querySelectorAll('.paginador').forEach((p, i) => {
        p.classList.toggle('ativo', i === index);
    });
}


// Responsividade ao redimensionar
window.addEventListener('resize', () => {
    atualizarCarrossel();
});

