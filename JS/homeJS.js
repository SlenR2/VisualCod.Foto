function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navigation ul');
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
}

document.querySelectorAll('.navigation a').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const tooltip = item.querySelector('::after');
        const rect = tooltip.getBoundingClientRect();

        if (rect.right > window.innerWidth) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '0';
            tooltip.style.transform = 'translateX(-10px)'; /* отступ от правого края */
        }
    });
});

// Перенаправление на страницу бронирования для услуг
function bookService() {
    window.location.href = "/buoking/booking.html";
}
// Функция проверки и перенаправления
function checkAnchorOrRedirect(event, anchorId, fallbackUrl) {
    event.preventDefault(); // Останавливаем стандартное поведение ссылки
    const targetElement = document.querySelector(anchorId);

    if (targetElement) {
        // Если элемент с таким якорем существует, прокручиваем к нему
        targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
        // Если элемента нет, перенаправляем на fallbackUrl
        window.location.href = fallbackUrl;
    }
}

// Назначаем обработчики события клика на ссылки навигации
document.querySelectorAll('.navigation a').forEach(link => {
    const anchorId = link.getAttribute('href');
    let fallbackUrl;

    // Задаем соответствующие страницы для перенаправления
    switch (anchorId) {
        case '#home':
            fallbackUrl = '/home/home.html';
            break;
        case '#about':
            fallbackUrl = 'about.html';
            break;
        case '#portfolio':
            fallbackUrl = '/portfolio/portfolio.html';
            break;
        case '#services':
            fallbackUrl = '/services/services.html';
            break;
        case '#shop':
            fallbackUrl = '/buoking/booking.html';
            break;
        case '#contact':
            fallbackUrl = 'contact.html';
            break;
        default:
            fallbackUrl = 'index.html';
    }

    // Добавляем обработчик клика с проверкой якоря или переходом по fallbackUrl
    link.addEventListener('click', (event) => checkAnchorOrRedirect(event, anchorId, fallbackUrl));
});












const slider = document.querySelector('.testimonial-slider');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

leftArrow.addEventListener('click', () => {
    slider.scrollBy({
        left: -300, // Прокрутка влево
        behavior: 'smooth'
    });
});

rightArrow.addEventListener('click', () => {
    slider.scrollBy({
        left: 300, // Прокрутка вправо
        behavior: 'smooth'
    });
});

let startX;

const handleTouchStart = (event) => {
    startX = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
    if (!startX) return;

    const diffX = startX - event.touches[0].clientX;

    if (diffX > 50) {
        slider.scrollBy({ left: 300, behavior: 'smooth' }); // Прокрутка вправо
        startX = null;
    } else if (diffX < -50) {
        slider.scrollBy({ left: -300, behavior: 'smooth' }); // Прокрутка влево
        startX = null;
    }
};

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);




document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const hours = new Date().getHours();
    let greetingMessage = 'Добро пожаловать в мир фотографии';

    if (hours < 12) {
        greetingMessage = 'Доброе утро! Добро пожаловать в мир фотографии';
    } else if (hours < 18) {
        greetingMessage = 'Добрый день! Добро пожаловать в мир фотографии';
    } else {
        greetingMessage = 'Добрый вечер! Добро пожаловать в мир фотографии';
    }

    greetingElement.textContent = greetingMessage;
});


 

// Динамическое приветствие на основе времени суток
document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const hours = new Date().getHours();
    if (hours < 12) {
        greetingElement.textContent = 'Доброе утро!';
    } else if (hours < 18) {
        greetingElement.textContent = 'Добрый день!';
    } else {
        greetingElement.textContent = 'Добрый вечер!';
    }
});

// Показать или скрыть дополнительный текст
function toggleMoreText() {
    const moreText = document.getElementById('more-text');
    const btnText = document.getElementById('more-text-btn');
    if (moreText.style.display === 'none') {
        moreText.style.display = 'block';
        btnText.textContent = 'Скрыть';
    } else {
        moreText.style.display = 'none';
        btnText.textContent = 'Читать дальше';
    }
}