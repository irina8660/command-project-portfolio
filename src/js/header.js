const menuButton = document.querySelector('.header__menu-button');
const menuContainer = document.querySelector('.header__mobile-menu-container');
const closeButton = document.querySelector('.header__mobile-menu-close-button');
const orderButton = document.querySelector('.header__mobile-order-button');
const navList = document.querySelector('.header__nav-list');
menuButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});

closeButton.addEventListener('click', () => {
  menuContainer.classList.remove('active');
});

// Прокрутка к секции work-together при нажатии "Order the project"
orderButton.addEventListener('click', () => {
  menuContainer.classList.remove('active');
  document
    .querySelector('.work-together')
    .scrollIntoView({ behavior: 'smooth' });
});
