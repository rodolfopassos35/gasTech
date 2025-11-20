// Seletores principais
const carrossel = document.querySelector('.carrossel');
const imagens = document.querySelectorAll('.carrossel img');
const btnEsquerda = document.querySelector('.seta-esquerda');
const btnDireita = document.querySelector('.seta-direita');
const paginadores = document.querySelector('.paginadores');

let index = 0;
let itemWidth = 0;
let imagensPorPagina = 1;
let maxIndex = imagens.length - 1;
let paginasAtuais = 0;

// Atualiza largura, calcula imagens por página e move o carrossel
function atualizarCarrossel() {
    const rect = imagens[0].getBoundingClientRect();
    itemWidth = rect.width + 10;

    const larguraCarrossel = document.querySelector('.carrossel-container').offsetWidth;
    imagensPorPagina = Math.floor(larguraCarrossel / itemWidth);
    maxIndex = imagens.length - imagensPorPagina;

    index = Math.max(0, Math.min(index, maxIndex));
    const deslocamento = index * itemWidth;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;

    const paginaAtual = Math.floor(index);
    const pontos = document.querySelectorAll('.paginador');
    if (pontos[paginaAtual]) {
        pontos.forEach((p, i) => {
            p.classList.toggle('ativo', i === paginaAtual);
        });
    }
}

// Cria paginadores de acordo com a quantidade de páginas
function criarPaginadores() {
    const numPaginas = Math.ceil(imagens.length / imagensPorPagina);
    if (numPaginas === paginasAtuais) return;
    paginasAtuais = numPaginas;

    paginadores.innerHTML = '';
    for (let i = 0; i < numPaginas; i++) {
        const ponto = document.createElement('span');
        ponto.classList.add('paginador');
        if (i === 0) ponto.classList.add('ativo');
        ponto.addEventListener('click', () => {
            index = i;
            requestIdleCallback(atualizarCarrossel);
        });
        paginadores.appendChild(ponto);
    }
}

// Botões de navegação
btnEsquerda.addEventListener('click', () => {
    if (index > 0) {
        index--;
        requestIdleCallback(atualizarCarrossel);
    }
});

btnDireita.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
        requestIdleCallback(atualizarCarrossel);
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
    const sensibilidade = 50;
    if (touchEndX < touchStartX - sensibilidade && index < maxIndex) {
        index++;
        requestIdleCallback(atualizarCarrossel);
    } else if (touchEndX > touchStartX + sensibilidade && index > 0) {
        index--;
        requestIdleCallback(atualizarCarrossel);
    }
}, false);

// Resize com debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        requestIdleCallback(() => {
            atualizarCarrossel();
            criarPaginadores();
        });
    }, 300);
});

// Scroll otimizado para ícone do WhatsApp
document.addEventListener("DOMContentLoaded", () => {
    const icone = document.querySelector(".icone-whats-animado");
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                icone.classList.toggle("mostrar", scrollY > 100);
                icone.classList.toggle("escondido", scrollY <= 100);
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Formulário WhatsApp com validação
document.getElementById('btn-whatsapp').addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !telefone || !mensagem) {
        alert("Preencha todos os campos antes de enviar.");
        return;
    }

    const texto = `Olá, meu nome é ${nome}. Telefone: ${telefone}. Mensagem: ${mensagem}`;
    const numeroWhatsApp = '5519986005315';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
});

// Inicialização
window.addEventListener('load', () => {
    requestIdleCallback(() => {
        atualizarCarrossel();
        criarPaginadores();
    });
});
