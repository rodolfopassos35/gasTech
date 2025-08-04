// analytics.js

// Inicializa o Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-0X987YBY1V'); // Substitua pelo seu ID do GA4

// Função para rastrear cliques em botões
function trackButtonClick(label) {
    gtag('event', 'click', {
        event_category: 'Botão',
        event_label: label,
        value: 1
    });
}

// Exemplo: rastrear clique no botão WhatsApp
document.addEventListener('DOMContentLoaded', function () {
    const whatsappBtn = document.getElementById('btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function () {
            trackButtonClick('Botão WhatsApp');
        });
    }
});
