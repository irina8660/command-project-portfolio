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

// Mobile menu

document.addEventListener('DOMContentLoaded', () => {
  const menuOpenBtn = document.querySelector('[data-menu-open]');
  const menuCloseBtn = document.querySelector(
    '.header__mobile-menu-close-button'
  );
  const mobileMenu = document.querySelector('.header__mobile-menu-container');
  const mobileNavLinks = document.querySelectorAll('.header__mobile-nav-link');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  menuOpenBtn.addEventListener('click', toggleMenu);
  menuCloseBtn.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
});
