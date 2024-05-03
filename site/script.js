let burgerBtn = document.querySelector('.burger-menu-btn');
let burgerCloseBtn = document.querySelector('.crest');
let burgerMenu = document.querySelector('.burger-menu');
let vhodLink = document.querySelector('.btn'); // Выбираем кнопку "Вход"
let regLink = document.querySelector('.btn.btn-blue'); // Кнопка "Регистрация"
regLink.addEventListener('click', () => {
    window.location.href = 'reg.html'; // Перенаправление на страницу reg.html при клике на кнопку "Регистрация"
});

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('none');
});

burgerCloseBtn.addEventListener('click', () => {
    burgerMenu.classList.add('none');
});

vhodLink.addEventListener('click', () => {
    window.location.href = 'vhod.html'; // Переход на страницу vhod.html при клике на кнопку "Вход"
});
