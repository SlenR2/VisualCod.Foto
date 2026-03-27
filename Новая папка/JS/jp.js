triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
        const targetSelector = trigger.getAttribute('data-scroll-to');
        if (!targetSelector) return;

        const target = document.querySelector(targetSelector);
        if (!target) return;

        event.preventDefault();

        // Закрываем мобильное меню при переходе
        closeMobileMenuIfOpen();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});