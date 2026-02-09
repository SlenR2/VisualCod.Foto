document.addEventListener('DOMContentLoaded', function () {
    // Переменные для работы со слайдером
    const slider = document.querySelector('.testimonials-slider');
    const container = document.querySelector('.testimonial-container');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const totalCards = cards.length;
    let autoSlideInterval;
    let visibleCards = 0;

    // Функция для расчета видимых карточек
    function calculateVisibleCards() {
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth + 20; // Учитываем margin
        visibleCards = Math.floor(containerWidth / cardWidth);
        if (visibleCards < 1) visibleCards = 1; // Минимум одна карточка
        if (visibleCards > totalCards) visibleCards = totalCards;
        return visibleCards;
    }

    // Функция для обновления отображения слайдера
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // Учитываем margin между карточками
        const visibleCardsCount = calculateVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCardsCount); // Максимальный индекс
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    // Функция для автоматической прокрутки
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = currentIndex + 1;
            const visibleCardsCount = calculateVisibleCards();
            if (currentIndex >= totalCards - visibleCardsCount) {
                currentIndex = 0; // Возвращаемся в начало, если достигли конца
            }
            updateSlider();
        }, 15000); // Интервал 5 секунд
    }

    // Функция для остановки авто-прокрутки
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Обработка клика по стрелке "Следующий"
    nextArrow.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex += 1;
        const visibleCardsCount = calculateVisibleCards();
        if (currentIndex >= totalCards - visibleCardsCount) {
            currentIndex = 0; // Циклическая прокрутка
        }
        updateSlider();
    });

    // Обработка клика по стрелке "Предыдущий"
    prevArrow.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex -= 1;
        if (currentIndex < 0) {
            const visibleCardsCount = calculateVisibleCards();
            currentIndex = Math.max(0, totalCards - visibleCardsCount); // Возвращаемся к последней группе
        }
        updateSlider();
    });

    // Пересчитываем видимые карточки при изменении размера окна
    window.addEventListener('resize', () => {
        calculateVisibleCards();
        updateSlider();
    });

    // Инициализация слайдера
    calculateVisibleCards();
    updateSlider();
    startAutoSlide();

    // Фильтрация отзывов по категориям
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Объект соответствия между data-filter и русским текстом
    const filterMapping = {
        'all': 'все', // Показать все
        'wedding': 'свадьба',
        'portrait': 'индивидуальная',
        'event': 'события',
        'family': 'семейная'
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterKey = this.getAttribute('data-filter');
            const filterValue = filterMapping[filterKey] || filterKey; // Получаем русский эквивалент

            // Фильтруем карточки
            cards.forEach(card => {
                const projectText = card.querySelector('.project-info').textContent.toLowerCase();
                if (filterKey === 'all' || projectText.includes(filterValue.toLowerCase())) {
                    card.style.display = 'block'; // Показываем подходящие отзывы
                } else {
                    card.style.display = 'none'; // Скрываем неподходящие
                }
            });
            currentIndex = 0; // Сбрасываем индекс слайдера после фильтрации
            updateSlider(); // Обновляем слайдер
        });
    });

    // Открытие и закрытие формы для отзыва
    const addTestimonialBtn = document.querySelector('.add-testimonial-btn');
    const formContainer = document.querySelector('.testimonial-form-container');
    addTestimonialBtn.addEventListener('click', () => {
        if (formContainer.style.display === 'none' || !formContainer.style.display) {
            formContainer.style.display = 'block'; // Показываем форму
        } else {
            formContainer.style.display = 'none'; // Скрываем форму
        }
    });

    // Валидация и отправка формы
    const form = document.querySelector('#testimonial-form');
    const formMessage = document.querySelector('#form-message');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Получаем значения полей формы
        const name = document.querySelector('#client-name').value.trim();
        const email = document.querySelector('#client-email').value.trim();
        const text = document.querySelector('#testimonial-text').value.trim();
        const rating = document.querySelector('#rating').value;

        // Проверка обязательных полей
        if (!name || !email || !text || !rating) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
            return;
        }

        // Проверка формата email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.style.display = 'block';
            formMessage.style.color = 'red';
            formMessage.textContent = 'Пожалуйста, введите корректный email-адрес.';
            return;
        }

        // Пока серверная часть не реализована, просто показываем сообщение об успехе
        formMessage.style.display = 'block';
        formMessage.style.color = 'green';
        formMessage.textContent = 'Ваш отзыв успешно отправлен и скоро будет опубликован!';
        form.reset(); // Очищаем форму
        setTimeout(() => {
            formContainer.style.display = 'none'; // Скрываем форму через 3 секунды
            formMessage.style.display = 'none';
        }, 3000);
    });

    // Всплывающее окно с полным текстом отзыва при клике на карточку
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const fullText = this.querySelector('.testimonial-text').textContent;
            const clientName = this.querySelector('.client-name').textContent;
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';

            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.padding = '20px';
            modalContent.style.maxWidth = '600px';
            modalContent.style.borderRadius = '10px';
            modalContent.style.textAlign = 'center';

            modalContent.innerHTML = `
                <h3>${clientName}</h3>
                <p>${fullText}</p>
                <button class="close-modal" style="margin-top: 10px; padding: 10px 20px; background-color: #333; color: white; border: none; cursor: pointer;">Закрыть</button>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Закрытие модального окна
            modalContent.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Интерактивность: легкое затемнение при наведении на карточку
    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            this.style.opacity = '0.9';
            this.style.transition = 'opacity 0.3s ease';
        });
        card.addEventListener('mouseout', function () {
            this.style.opacity = '1';
        });
    });

    // Lazy Loading для изображений через IntersectionObserver
    const lazyImages = document.querySelectorAll('.client-photo img');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src; // Загружаем изображение
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => observer.observe(img));
    }
});