document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted') && banner) {
        banner.style.display = 'flex';
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.style.display = 'none';
        });
    }
});
