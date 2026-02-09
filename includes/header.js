/*******************************************************************
  ПРОФЕССИОНАЛЬНЫЙ СКРИПТ ДЛЯ МЕНЮ
  — Без конфликтов и inline‑обработчиков
  — Работает на всех устройствах
*******************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const burger = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  const navList = nav.querySelector('ul');
  const links = nav.querySelectorAll('a');

  // Проверка
  if (!burger || !nav || !navList) {
    console.warn('Navigation structure not found!');
    return;
  }

  // ========= 1️⃣ Тоггл меню =========
  burger.addEventListener('click', () => {
    const isActive = burger.classList.toggle('active');
    navList.classList.toggle('active', isActive);
    burger.setAttribute('aria-expanded', isActive);
    // Запрещаем прокрутку, пока меню открыто
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // ========= 2️⃣ Закрытие при клике по ссылке =========
  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========= 3️⃣ Подсветка активной ссылки =========
  const current = location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('current');
  });

  // ========= 4️⃣ Закрытие при нажатии ESC =========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      burger.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ========= 5️⃣ Скрытие меню при ресайзе =========
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      burger.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});





function initHeaderMenu() {
  const burger = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.navigation ul');
  const links = document.querySelectorAll('.navigation a');

  if (!burger || !navList) {
    console.warn('Header elements not found!');
    return;
  }

  console.log('Header menu initialized');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open', burger.classList.contains('active'));
  });

  links.forEach(link =>
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
    })
  );
}

if (document.readyState !== 'loading') initHeaderMenu();
else document.addEventListener('DOMContentLoaded', initHeaderMenu);










// ============================================================
  // JS - интерактивный функционал Footer
  // ============================================================

  // Устанавливаем текущий год
  document.getElementById('year').textContent = new Date().getFullYear();

  // Кнопка "наверх"
  const backTopBtn = document.getElementById('backTop');
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Появление/скрытие кнопки при скролле
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
      backTopBtn.style.opacity = '1';
      backTopBtn.style.visibility = 'visible';
    } else {
      backTopBtn.style.opacity = '0';
      backTopBtn.style.visibility = 'hidden';
    }
  });

  // Лёгкая инициализация анимации появления футера
  window.addEventListener('load', () => {
    const footer = document.querySelector('#footer');
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 1.5s ease';
    setTimeout(() => footer.style.opacity = '1', 200);
  });

















  