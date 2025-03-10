import Swiper from "swiper";
import "swiper/css/bundle";
import { Navigation, Keyboard } from "swiper/modules";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", async function () {
    const reviewsSection = document.querySelector(".reviews");
    const reviewsBlock = document.querySelector(".reviews-block");
    try {
        const response = await fetch("https://portfolio-js.b.goit.study/api/reviews");
        const reviewsData = await response.json();
        let reviewsHTML = reviewsData
            .map(
                ({ avatar_url, author, review }) => `
     <li class="swiper-slide reviews-elem"> 
       <img class="reviews-img" src="${avatar_url}" alt="${author}">
       <div class="reviews-info">
         <p class="reviews-autor">${author}</p>
         <p class="reviews-text">${review}</p>
       </div>
     </li>
   `
            )
            .join("");
        reviewsBlock.innerHTML = reviewsHTML;
        const swiper = new Swiper(".swiper", {
            modules: [Navigation, Keyboard],
            simulateTouch: true,
            touchRatio: 1,
            touchEventsTarget: "container",
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1280: { slidesPerView: 4 },
            },
        });
    } catch (error) {
        console.error(error);
        reviewsBlock.innerHTML = `<p class="not-found">Not found</p>`;
        const observer = new IntersectionObserver(
            (reviewss) => {
                reviewss.forEach((review) => {
                    if (review.isIntersecting) {
                        iziToast.error({
                            message: "Reviews not found",
                            position: "topRight",
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(reviewsSection);
    }
});
