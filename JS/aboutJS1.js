window.onload = function() {
    // Получаем контейнер для изображений
    const galleryContainer = document.getElementById('gallery-images');

    // Делаем запрос к серверу для получения списка изображений
    fetch('/gallery-images')
        .then(response => response.json())
        .then(images => {
            // Для каждого изображения создаем элемент img и добавляем его в галерею
            images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = `/images/gallery/${image}`;
                imgElement.alt = "Галерея работы";
                imgElement.classList.add("gallery-image");

                // Генерируем случайные позиции и углы для картинок
                const frameRect = galleryContainer.getBoundingClientRect();
                const randomX = Math.random() * (frameRect.width - 250); // Ограничиваем по ширине контейнера
                const randomY = Math.random() * (frameRect.height - 250); // Ограничиваем по высоте контейнера
                const randomRotation = Math.random() * 30 - 15; // Значения от -15 до 15 градусов

                imgElement.style.position = "absolute";
                imgElement.style.left = `${randomX}px`;
                imgElement.style.top = `${randomY}px`;
                imgElement.style.transform = `rotate(${randomRotation}deg)`;

                // Добавляем изображение в галерею
                galleryContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Ошибка при загрузке изображений:', error));
};






const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Эндпоинт для получения списка изображений
app.get('/gallery-images', (req, res) => {
    const galleryDir = path.join(__dirname, 'images', 'gallery');

    fs.readdir(galleryDir, (err, files) => {
        if (err) {
            res.status(500).send("Ошибка при чтении директории");
            return;
        }

        const imageList = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
        res.json(imageList); // Отправляем список изображений в формате JSON
    });
});

app.listen(3000, () => {
    console.log('Сервер работает на порту 3000');
});














