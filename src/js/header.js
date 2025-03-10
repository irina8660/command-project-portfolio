const refs = {
  headerMenuButton: document.querySelector('.header__menu-button'),
  navList: document.querySelector('.header__nav-list'),
  mobileMenuContainer: document.querySelector('.header__mobile-menu-container'),
  mobileMenuButton: document.querySelector('.header__mobile-menu-button'),
  mobileMenuCloseButton: document.querySelector(
    '.header__mobile-menu-close-button'
  ),
  mobileMenuNav: document.querySelector('.header__mobile-nav'),
  navLinks: document.querySelectorAll('.header__mobile-nav-link'),
  orderButtonMobile: document.querySelector('.header__mobile-order-button'),
};

refs.headerMenuButton.addEventListener('click', event => {
  event.preventDefault();
  const isVisible = refs.navList.classList.contains('menu-visible');
  refs.navList.classList.toggle('menu-visible', !isVisible);
});

document.addEventListener('click', event => {
  const isClickInsideMenu =
    refs.mobileMenuContainer.contains(event.target) ||
    refs.headerMenuButton.contains(event.target);
  if (!isClickInsideMenu && refs.navList.classList.contains('menu-visible')) {
    refs.navList.classList.remove('menu-visible');
  }
});

refs.mobileMenuButton.addEventListener('click', openMobileMenu);
refs.mobileMenuCloseButton.addEventListener('click', closeMobileMenu);

function openMobileMenu() {
  refs.mobileMenuContainer.classList.add('show');
  document.body.classList.add('ModalBodyLock');
}

function closeMobileMenu() {
  refs.mobileMenuContainer.classList.remove('show');
  document.body.classList.remove('ModalBodyLock');
}

refs.navLinks.forEach(link => {
  link.addEventListener('click', event => {
    closeMobileMenu();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

refs.orderButtonMobile.addEventListener('click', event => {
  closeMobileMenu();
  const targetSection = document.querySelector('#work-together');

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});
