














document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth Scroll
    setupSmoothScroll();

    // 2. Testimonial Slider
    setupTestimonialSlider();

    // 3. Form Validation
    setupFormValidation();

    // 4. Scroll Animation (using AOS)
    AOS.init({
        duration: 1200, // Animation duration in ms
        once: true,     // Animate only once
    });
});

// Smooth Scroll to Sections
function setupSmoothScroll() {
    const links = document.querySelectorAll('a\(href^="#"\)');
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

// Testimonial Slider
function setupTestimonialSlider() {
    const slider = document.querySelector(".testimonial-slider");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Form Validation
function setupFormValidation() {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const message = form.querySelector("#message");

        let isValid = true;

        // Name Validation
        if (name.value.trim() === "") {
            isValid = false;
            showError(name, "Пожалуйста, введите ваше имя.");
        } else {
            clearError(name);
        }

        // Email Validation
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, "Пожалуйста, введите корректный email.");
        } else {
            clearError(email);
        }

        // Message Validation
        if (message.value.trim() === "") {
            isValid = false;
            showError(message, "Пожалуйста, введите сообщение.");
        } else {
            clearError(message);
        }

        if (isValid) {
            alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.");
            form.reset();
        }
    });
}


// Helper Functions
function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector(".error-message");
    if (!error) {
        error = document.createElement("small");
        error.classList.add("error-message");
        formGroup.appendChild(error);
    }
    error.textContent = message;
    input.classList.add("error");
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-message");
    if (error) error.textContent = "";
    input.classList.remove("error");
}

function validateEmail(email) {
    const re = /^\(^\s@\)+@\(^\s@\)+\.\(^\s@\)+$/;
    return re.test(String(email).toLowerCase());
}




window.onload = function() {
    const frames = document.querySelectorAll('.image-frame');

    frames.forEach(frame => {
      const images = frame.querySelectorAll('.scattered-images img');
      const frameRect = frame.getBoundingClientRect(); // Получаем размеры рамки

      images.forEach(image => {
        // Получаем размеры изображения
        const imgWidth = image.width;
        const imgHeight = image.height;

        // Генерируем случайные координаты X и Y в пределах рамки
        const randomX = Math.random() * (frameRect.width - imgWidth); // Ограничиваем по ширине контейнера
        const randomY = Math.random() * (frameRect.height - imgHeight); // Ограничиваем по высоте контейнера

        // Генерация случайного наклона в пределах -15° до 15°
        const randomRotation = Math.random() * 30 - 15; // Значения от -15 до 15 градусов

        // Применяем случайные координаты
        image.style.position = "absolute";
        image.style.left = `${randomX}px`;
        image.style.top = `${randomY}px`;

        // Применяем случайный наклон
        image.style.transform = `rotate(${randomRotation}deg)`;

        // Генерация случайного z-index для каждого изображения
        const randomZIndex = Math.floor(Math.random() * 25) + 1; // Случайное значение от 1 до 10
        image.style.zIndex = randomZIndex;

        // Добавляем обработчик события для изменения z-index при наведении
        image.addEventListener('mouseenter', function() {
            const hoverZIndex = Math.floor(Math.random() * 30) + 30; // Случайное значение z-index, больше текущего
          image.style.zIndex = hoverZIndex;
          image.style.transform = `scale(1.1) rotate(0deg)`; // Увеличиваем изображение при наведении и убираем наклон
        });

        // Добавляем обработчик для возвращения z-index и наклона к исходному состоянию при уходе мыши
        image.addEventListener('mouseleave', function() {
          image.style.transform = `scale(1) rotate(${randomRotation}deg)`; // Возвращаем исходный наклон и размер
          image.style.zIndex = randomZIndex; // Восстанавливаем исходный z-index
        });
      });
    });
  };














