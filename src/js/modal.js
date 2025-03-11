const openMenuBtn = document.querySelector('[data-menu-open]');
const closeMenuBtn = document.querySelector(
  '.header__mobile-menu-close-button'
);
const menuContainer = document.querySelector('.header__mobile-menu-container');

if (openMenuBtn && closeMenuBtn && menuContainer) {
  openMenuBtn.addEventListener('click', () => {
    menuContainer.classList.add('is-open');
  });

  closeMenuBtn.addEventListener('click', () => {
    menuContainer.classList.remove('is-open');
  });

  // Закрытие по клику вне меню
  menuContainer.addEventListener('click', e => {
    if (e.target === menuContainer) {
      menuContainer.classList.remove('is-open');
    }
  });
}
