function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navigation ul');
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
}

// Корректная реализация toggle-кнопки меню
document.querySelector('.menu-toggle').onclick = () => {
    document.querySelector('.menu-toggle').classList.toggle('active');
    document.querySelector('.navigation ul').classList.toggle('active');
  };
  
  // Функция проверки якоря и редиректа
  function checkAnchorOrRedirect(event, anchorId, fallbackUrl) {
    event.preventDefault();
    const targetElement = document.querySelector(anchorId);
  
    if (targetElement) {
      targetElement.scrollIntoView({behavior: "smooth"});
    } else {
      window.location.href = fallbackUrl;
    }
  }
  
  // Назначаем клики на ссылки с корректными fallbackUrl
  const linkFallbacks = {
    '#home': '/index.html',
    '#about': '/Обо мне/about.html',
    '#portfolio': '/Портфолио/portfolio.html',
    '#services': '/services.html',
    '#shop': '/shop.html',
    '#contact': '/contact.html'
  };
  
  document.querySelectorAll('.navigation a').forEach(link => {
    const anchorId = link.getAttribute('href');
    const fallbackUrl = linkFallbacks[anchorId] || '/index.html';
  
    link.addEventListener('click', (e) => checkAnchorOrRedirect(e, anchorId, fallbackUrl));
  });




// Функция для отображения модального окна с информацией об услуге
function showMoreInfo(serviceType) {
  const modal = document.getElementById("more-info-popup");
  const content = document.getElementById("more-info-content");

  let title = "";
  let description = "";

  switch (serviceType) {
    case 'group':
      title = "Групповая съемка – сплоченность и стиль в каждом кадре.";
      description = "Групповые фотосессии позволяют создать атмосферу единства, подчеркнуть общие цели и передать уникальную динамику команды, семьи или друзей. Я предлагаю профессиональные групповые съемки, где каждый участник почувствует себя комфортно, а каждая деталь будет продумана с учетом ваших потребностей. От корпоративных портретов для компаний, стремящихся отразить свою культуру и ценности, до дружеских или семейных съемок, где важен каждый момент – я обеспечу комфортную организацию и высокое качество результата. Я помогу вам с позами, подберу правильное освещение и окружение, чтобы создать естественные и запоминающиеся кадры, которые будут отражать подлинную химию и энергию вашей группы. Со мной вы можете быть уверены, что ваша история будет рассказана на высшем уровне и станет источником теплых воспоминаний или мощного инструмента для создания позитивного имиджа вашего бренда.";
      break;
      
    case 'individual':
      title = "Индивидуальная съемка";
      description = " Я предлагаю персонализированные фотосессии, которые подчеркнут вашу индивидуальность и помогут создать память на долгие годы. Независимо от цели – будь то портрет для личного бренда, запоминающийся момент ожидания малыша, корпоративная съемка, стильный контент для социальных сетей или создание профессионального модельного портфолио – Я позабочусь о каждом аспекте съемки. Я адаптируюсь под ваш график и потребности, гарантируя высокий уровень сервиса, творческий подход и уважение к вашему времени. Создайте визуальную историю, отражающую вашу уникальность и усиливающую ваш успех.";
      break;
    case 'family':
      title = "Семейная съемка";
      description = "Я создам теплые и живые фотографии, отражающие настоящие эмоции и связи между вами. Превращая фотосессию в веселое приключение для всей семьи, я учитываю ваши пожелания и уникальность. Профессиональное качество снимков позволит вам с гордостью делиться ими с родными и друзьями, а также украсить ваш семейный альбом. Создайте воспоминания, которые будут объединять поколения.";
      break;
    case 'lovestory':
      title = "Love Story";
      description = "Я создаю романтичные и душевные фотосессии Love Story, которые отражают глубину ваших чувств и уникальность вашей пары. Мой индивидуальный подход позволит вам почувствовать себя комфортно и свободно перед камерой, чтобы запечатлеть настоящие эмоции и искренние моменты. Я помогу подобрать идеальные локации и концепции, соответствующие вашему стилю и настроению. Создайте прекрасные воспоминания о вашем пути вместе, которые станут ценными для вас сегодня и в будущем.";
      break;
    case 'pet':
      title = "Съемка с питомцем";
      description = "Я предлагаю уникальные фотосессии для вас и ваших любимцев, чтобы запечатлеть особые моменты вашей дружбы и любви. Ваши питомцы – это больше, чем просто животные; они часть вашей семьи, и я знаю, как важно сохранить эти драгоценные мгновения. Я создам комфортную и дружелюбную обстановку, чтобы вы и ваши питомцы чувствовали себя расслабленно и естественно перед камерой. Я помогу подобрать идеальные локации и задумки для съемки, которые отражают индивидуальность вашего питомца и ваши особенные отношения. Создайте фотоснимки, к которым вы будете с радостью возвращаться снова и снова.";
      break;
    case 'wedding':
      title = "Свадебная съемка";
      description = "Запечатлейте историю вашей любви со мной и моей комадой – мы создадим трогательные и искренние фотографии, отражающие уникальные моменты вашего пути к свадьбе. Персонализированный подход позволяет разработать концепцию, подчеркивающую индивидуальность вашей пары. Наша профессиональная команда будет рядом на каждом этапе – от предсвадебной съемки до самого торжества – чтобы сохранить каждую деталь и эмоцию. Создайте воспоминания, которые останутся на всю жизнь и будут вызывать теплоту и радость..";
      break;
    default:
      title = "Информация недоступна";
      description = "Информация о выбранной услуге временно недоступна.";
      break;
  }

content.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    modal.classList.add("show");
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById("more-info-popup");
  modal.classList.remove("show");
}


// Закрытие при клике вне области модального окна
window.onclick = function(event) {
    const modal = document.getElementById("more-info-popup");
    if (event.target === modal) {
        closeModal();
    }
}




// Перенаправление на страницу бронирования для услуг
function bookService() {
    window.location.href = "booking.html";
}


// Открытие всплывающего окна для товара с уникальным ID
function openProductPopupUnique(productName) {
    document.getElementById("product-title-unique").innerText = productName;
    document.getElementById("product-popup-unique").style.display = "block";
}

// Закрытие всплывающего окна для товаров с уникальным ID
function closeProductPopupUnique() {
    document.getElementById("product-popup-unique").style.display = "none";
    document.getElementById("thank-you-message-unique").style.display = "none"; // Скрываем сообщение с благодарностью при закрытии
}

// Функция для оформления заказа 
function submitProductOrderUnique() {
    // Получаем значения из полей формы
    const name = document.getElementById("name-unique").value;
    const email = document.getElementById("email-unique").value;
    const phone = document.getElementById("phone-unique").value;
    const address = document.getElementById("address-unique").value;
    const city = document.getElementById("city-unique").value;
    const comments = document.getElementById("comments-unique").value;
    const vkChecked = document.getElementById("vk-unique").checked;

    // Проверка на заполнение обязательных полей
    if (!name || !email || !phone || !address || !city) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    // Сообщение о скидке
    let discountMessage = vkChecked ? "Вы получили скидку 5% за активность в VK!" : "Без скидки";

    // Формируем текст заказа для отправки
    const orderDetails = `
        Товар: ${document.getElementById("product-title-unique").innerText}\n
        Имя: ${name}\n
        Email: ${email}\n
        Телефон: ${phone}\n
        Адрес: ${address}\n
        Город: ${city}\n
        Комментарии: ${comments}\n
        ${discountMessage}
    `;

    // Показ временного сообщения с благодарностью
    document.getElementById("thank-you-message-unique").style.display = "block";

    // Имитация отправки на сервер и вывод в консоль
    console.log("Заказ отправлен продавцу и покупателю:\n", orderDetails);

    // Отправка подтверждения (имитация)
    alert(`Спасибо за ваш заказ, ${name}! Копия отправлена на ${email}.`);

    // Сброс полей и закрытие окна после небольшой задержки
    setTimeout(() => {
        closeProductPopupUnique();
        resetFormUnique();
    }, 3000);
}

// Функция для сброса формы после отправки заказа
function resetFormUnique() {
    document.getElementById("name-unique").value = "";
    document.getElementById("email-unique").value = "";
    document.getElementById("phone-unique").value = "";
    document.getElementById("address-unique").value = "";
    document.getElementById("city-unique").value = "";
    document.getElementById("comments-unique").value = "";
    document.getElementById("vk-unique").checked = false;
}