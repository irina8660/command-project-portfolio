import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Keyboard } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  new Accordion('.about-me__list', {
    duration: 400,
    showMultiple: true,
    openOnInit: [0],
    elementClass: 'about-me__item',
    triggerClass: 'about-me__inner',
    panelClass: 'about-me__details',
    collapse: true,
    beforeOpen: element => {
      const arrowIcon = element.querySelector('.about-me__icon');
      if (arrowIcon) {
        arrowIcon.style.transform = 'rotate(180deg)';
      }
    },
    beforeClose: element => {
      const arrowIcon = element.querySelector('.about-me__icon');
      if (arrowIcon) {
        arrowIcon.style.transform = 'rotate(0deg)';
      }
    },
  });
});

const swiper = new Swiper('.about-me__skills-wrapper', {
  modules: [Navigation, Keyboard],
  simulateTouch: true,
  touchRatio: 1,
  touchEventsTarget: 'container',
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 0,
  navigation: {
    nextEl: '.about-me__skills-button-next',
    prevEl: '.about-me__skills-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

// import { Navigation, Keyboard } from 'swiper/modules';

// const refs = {
//   prevButton: document.querySelector(
//     '.about-me__skills-button.swiper-button-prev'
//   ),
//   nextButton: document.querySelector(
//     '.about-me__skills-button.swiper-button-next'
//   ),
//   buttonWrapper: document.querySelector('.about-me__button-wraper'),
// };

// if (refs.buttonWrapper) {
//   refs.buttonWrapper.addEventListener('mousedown', e => {
//     if (e.target === e.currentTarget) return;
//     setTimeout(() => e.target.closest('button')?.blur(), 0);
//   });
// }

// const swiper = new Swiper('.swiper', {
//   modules: [Navigation, Keyboard],
//   speed: 250,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   spaceBetween: 0,
//   breakpoints: {
//     768: { slidesPerView: 2 },
//     1440: { slidesPerView: 4 },
//   },
//   keyboard: {
//     enabled: true,
//     onlyInViewport: true,
//   },
//   on: {
//     slideChange: () => checkNavigationButtons(swiper),
//   },
// });

// function checkNavigationButtons(swiper) {
//   if (swiper.isBeginning) {
//     refs.prevButton.setAttribute('disabled', 'true');
//   } else {
//     refs.prevButton.removeAttribute('disabled');
//   }
//   if (swiper.isEnd) {
//     refs.nextButton.setAttribute('disabled', 'true');
//   } else {
//     refs.nextButton.removeAttribute('disabled');
//   }
// }
