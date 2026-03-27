document.addEventListener("DOMContentLoaded", () => {
    initializeEventListeners();
    updateShootingTimeLabel();
    populateShootingTypeField();
    calculatePrice();
    
    setupAutoUpdate();
    collectBookingData(); // Собрать первоначальные данные
    updateSummary(); // Обновить отображение
});

const bookingData = {
    name: "",
    phone: "",
    date: "",
    time: "",
    type: "",
    participants: 1,
    location: "",
    studio: "",
    studioPricePerHour: 0,
    duration: 0.5,
    totalPrice: 0,
    partialPrice: 0,
    address: "",
    specialRequests: "",
    shootingTheme: "",
};

// Предопределенный список услуг
const services = [
    { name: "Портретная съемка", price: 2000 },
    { name: "Семейная съемка", price: 3000 },
    { name: "Свадебная съемка", price: 5000 },
];

function initializeEventListeners() {
  
  // Привязка обработчиков событий
  document.getElementById("confirm-button").addEventListener("click", function (event) {
    event.preventDefault(); // Останавливаем отправку формы
    confirmData(); // Выполняем подтверждение данных
});
document.getElementById("prepayment-button").addEventListener("click", function (event) {
    event.preventDefault(); // Останавливаем отправку формы
    prepayment();
});


    // Заполняем список услуг
    populateShootingTypeField();

    // Изменение типа съёмки
    document.getElementById("shooting-type").addEventListener("change", () => {
        calculatePrice();
        bookingData.type = document.getElementById("shooting-type").value;
    }); 


    // Изменение типа съёмки
    document.getElementById("shooting-type").addEventListener("change", () => {
        calculatePrice();
        bookingData.type = document.getElementById("shooting-type").value;
    });

    // Изменение времени съемки
    document.getElementById("shooting-time").addEventListener("input", () => {
        updateShootingTimeLabel();
        calculatePrice();
    });

    // Изменение местоположения
    document.getElementById("location").addEventListener("change", () => {
        showStudioOptions();
        calculatePrice();
    });

    // Изменение студии
    const studioSelect = document.getElementById("studio-select");
    if (studioSelect) {
        studioSelect.addEventListener("change", () => {
            updateStudioLink();
            calculatePrice();
        });
    }

    // Переход между шагами
    document.querySelectorAll("[data-step]").forEach((button) => {
        button.addEventListener("click", (e) => {
            const step = parseInt(e.target.dataset.step, 10);
            if (validateStep(step - 1)) {
                collectBookingData();
                goToStep(step);
            }
        });
    });

    // Подтверждение записи
    
}

// Функция для заполнения списка услуг
function populateShootingTypeField() {
    const shootingTypeField = document.getElementById("shooting-type");
    
    // Загружаем внешний HTML-файл с услугами
    fetch('services.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const packages = doc.querySelectorAll('.package');

            const services = [];

            packages.forEach(pkg => {
                const serviceName = pkg.dataset.name;
                const servicePrice = pkg.dataset.price;

                services.push({
                    name: serviceName,
                    price: servicePrice
                });
            });

            // Очищаем текущие опции
            // shootingTypeField.innerHTML = '';

            // Заполняем список услуг в select
            services.forEach(service => {
                const option = document.createElement("option");
                option.value = service.name;
                option.textContent = `${service.name} (от ${service.price} ₽)`;
                option.dataset.price = service.price;
                shootingTypeField.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке услуг:', error);
        });
    }

function updateShootingTimeLabel() {
    const shootingTime = parseFloat(document.getElementById("shooting-time").value) || 0.5;
    const label = document.getElementById("shooting-time-label");
    const hours = Math.floor(shootingTime);
    const minutes = Math.round((shootingTime - hours) * 60);
    let timeLabel = hours > 0 ? `${hours} час${hours > 1 ? "а" : ""}` : "";
    timeLabel += minutes > 0 ? (timeLabel ? " и " : "") + `${minutes} минут` : "";
    label.textContent = timeLabel || "0 минут";
    bookingData.duration = shootingTime;
}

function calculatePrice() {
    const shootingTypeField = document.getElementById("shooting-type");
    const studioselectField = document.getElementById("studio-select");
    const shootingTime = parseFloat(document.getElementById("shooting-time").value) || 0.5;
    const selectedOption = shootingTypeField.selectedOptions[0];
    const selectedStudioOption = studioselectField.selectedOptions[0];
    const location = document.getElementById("location").value;

    if (!selectedOption || !selectedStudioOption) {
        updatePriceDisplay(0, 0);
        return;
    }

    const basePrice = parseInt(selectedOption.dataset.price || "0", 10);
    let locationPrice = 0;

    // Проверка, выбрана ли студия и есть ли цена
    if (location === "studio" && selectedStudioOption) {
        locationPrice = parseInt(selectedStudioOption.dataset.price || "0", 10);
    }

    let totalPrice = basePrice * shootingTime;

    if (location === "studio") {
        totalPrice += locationPrice * shootingTime;
    }

    if (location === "client-location") {
        totalPrice += 500; // Доплата за выезд
    }

    // Обновление данных бронирования
    bookingData.totalPrice = totalPrice;
    bookingData.partialPrice = totalPrice * 0.25;

    // Обновление отображения цены
    updatePriceDisplay(totalPrice, bookingData.partialPrice);
}

function updatePriceDisplay(totalPrice, partialPrice) {
    document.getElementById("total-price").textContent = `${totalPrice.toFixed(2)} ₽`;
    document.getElementById("partial-price").textContent = `${partialPrice.toFixed(2)} ₽`;
}

function updateStudioLink() {
    const studioSelect = document.getElementById("studio-select");
    const selectedOption = studioSelect.options[studioSelect.selectedIndex];
    bookingData.studio = selectedOption.textContent.trim();
    bookingData.studioPricePerHour = parseFloat(selectedOption.dataset.price) || 0;
    bookingData.studioLink = selectedOption.value || "#";

    const studioLink = document.getElementById("studio-link");
    studioLink.href = bookingData.studioLink;
    studioLink.style.pointerEvents = studioLink.href !== "#" ? "auto" : "none";
}

function showStudioOptions() {
    const location = document.getElementById("location").value;
    const studioOptions = document.getElementById("studio-options");
    const clientAddress = document.getElementById("client-address");
    studioOptions.style.display = location === "studio" ? "block" : "none";
    clientAddress.style.display = location === "client-location" ? "block" : "none";
    bookingData.location = location;
}

function goToStep(step) {
    document.querySelectorAll(".form-step").forEach((form) => {
        form.style.display = "none";
    });
    document.getElementById(`booking-form-step-${step}`).style.display = "block";

    if (step === 3) {
        updateSummary();
    }
}

function validateStep(step) {
    let valid = true;
    const currentStep = document.getElementById(`booking-form-step-${step}`);
    const inputs = currentStep.querySelectorAll("input, select");

    inputs.forEach((input) => {
        if (!input.checkValidity()) {
            valid = false;
            input.reportValidity();
        }
    });

    return valid;
}

function collectBookingData() {
    bookingData.name = document.getElementById("name").value || "Не указано";
    bookingData.phone = document.getElementById("phone").value || "Не указано";
    bookingData.date = document.getElementById("date").value || "Не выбрана";
    bookingData.time = document.getElementById("time-slot").value || "Не выбрано";
    bookingData.type = document.getElementById("shooting-type").value || "Не указано";
    bookingData.participants = parseInt(document.getElementById("participants").value, 10) || 1;
    bookingData.location = document.getElementById("location").value || "Не указана";
    bookingData.studio = document.getElementById("studio-select").value || "Не выбрана";
    bookingData.shootingTheme = document.getElementById("shooting-theme").value || "Не указана";
    bookingData.specialRequests = document.getElementById("special-requests").value || "Нет";
    bookingData.address = document.getElementById("address").value || "Не указан";
    bookingData.shootingTime = parseFloat(document.getElementById("shooting-time").value) || 0.5;
}

function updateSummary() {
    document.getElementById("summary-name").textContent = bookingData.name || "Не указано";
    document.getElementById("summary-phone").textContent = bookingData.phone || "Не указано";
    document.getElementById("summary-date").textContent = bookingData.date || "Не выбрана";
    document.getElementById("summary-time").textContent = bookingData.time || "Не выбрано";
    document.getElementById("summary-shooting").textContent = bookingData.type || "Не указано";
    document.getElementById("summary-participants").textContent = bookingData.participants || 1;
    document.getElementById("summary-location").textContent = bookingData.location || "Не указана";
    document.getElementById("summary-studio").textContent = bookingData.studio || "Не выбрана";
    document.getElementById("summary-shooting-theme").textContent = bookingData.shootingTheme || "Не указана";
    document.getElementById("summary-special-requests").textContent = bookingData.specialRequests || "Нет";
    document.getElementById("summary-address").textContent = bookingData.address || "Не указан";
    document.getElementById("summary-total").textContent = `${bookingData.totalPrice?.toFixed(2) || 0} ₽`;
    document.getElementById("summary-total1").textContent = `${bookingData.partialPrice?.toFixed(2) || 0} ₽`;
}




 
 

function confirmData() {
    const confirmButton = document.getElementById("confirm-button");
    const confirmationMessage = document.getElementById("confirmation-message");
    const prepaymentButton = document.getElementById("prepayment-button");

    // Проверка только необходимых данных
    const requiredFields = {
        name: bookingData.name,
        phone: bookingData.phone,
        type: bookingData.type,
        date: bookingData.date,
        time: bookingData.time,
    };

    const missingFields = Object.entries(requiredFields).filter(
        ([key, value]) => !value || value === "Не указано" || value === "Не выбрано"
    );

    if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(([key]) => {
            switch (key) {
                case "name":
                    return "Имя";
                case "phone":
                    return "Телефон";
                case "type":
                    return "Тип услуг";
                case "date":
                    return "Дата";
                case "time":
                    return "Время";
                default:
                    return key;
            }
        });
        alert(`Пожалуйста, заполните следующие поля: ${missingFieldNames.join(", ")}`);
        return;
    }

    // Успешное подтверждение
    confirmationMessage.style.display = "block";
    confirmationMessage.textContent = "Данные подтверждены";
    confirmButton.style.display = "none";
    prepaymentButton.style.display = "inline-block";
}

// Функция для предоплаты
function prepayment() {
    const paymentMessage = document.getElementById("payment-message");

    // Имитация процесса оплаты
    paymentMessage.style.display = "block";
    paymentMessage.textContent = "Обработка предоплаты...";
    setTimeout(() => {
        paymentMessage.textContent = "Предоплата успешно выполнена!";
        document.getElementById("prepayment-button").style.display = "none";
        
        alert("Спасибо! Ваша запись подтверждена.");
    document.getElementById("thank-you-popup").style.display = "block";
    
    }, 2000); // Задержка для имитации процесса
}



function startPayment() {
    const paymentButton = document.getElementById("prepayment-button");
    const paymentMessage = document.getElementById("payment-message");

    paymentButton.disabled = true;
    paymentMessage.style.display = "block";
    paymentMessage.textContent = "Обработка предоплаты...";

    // Имитация вызова платежного API
    fetch("https://securepayments.sberbank.ru/payment/rest/register.do", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: 5000, // Сумма в копейках (50 рублей)
            orderNumber: "ORDER12345",
            returnUrl: "https://ваш-сайт.ru/success",
            failUrl: "https://ваш-сайт.ru/fail",
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.formUrl) {
                window.location.href = data.formUrl; // Переход на страницу оплаты
            } else {
                paymentMessage.textContent = "Ошибка при инициализации оплаты.";
                paymentButton.disabled = false;
            }
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            paymentMessage.textContent = "Произошла ошибка при оплате.";
            paymentButton.disabled = false;
        });
}












function handlePaymentStatus(status) {
    const paymentMessage = document.getElementById("payment-message");

    if (status === "success") {
        paymentMessage.textContent = "Предоплата успешно выполнена!";
        document.getElementById("prepayment-button").style.display = "none";
    } else if (status === "fail") {
        paymentMessage.textContent = "Ошибка оплаты. Попробуйте снова.";
    } else if (status === "cancel") {
        paymentMessage.textContent = "Оплата отменена.";
    }
}









function confirmBooking() {
    alert("Спасибо! Ваша запись подтверждена.");
    document.getElementById("thank-you-popup").style.display = "block";
}









function setupAutoUpdate() {
    const inputsToUpdate = [
        "name", "phone", "date", "time-slot",
        "shooting-type", "participants", "location", "address",
        "shooting-theme", "special-requests", "studio-select", "shooting-time"
    ];

    inputsToUpdate.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", () => {
                collectBookingData();
                updateSummary();
            });
        }
    });


    // Если изменение идёт через select (onchange)
    ["location", "shooting-type", "studio-select"].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("change", () => {
                collectBookingData();
                updateSummary();
            });
        }
    });
}



function showMessage(message, type) {
    const messageElement = document.getElementById("payment-message");
    messageElement.textContent = message;

    // Добавляем класс для показа
    messageElement.classList.add("show");

    // Удаляем класс через 3 секунды
    setTimeout(() => {
        messageElement.classList.remove("show");
    }, 3000);
}