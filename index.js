import{i as a,S as l,N as u,K as d}from"./assets/vendor-UAZo-maW.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",async function(){const n=document.querySelector(".reviews"),t=document.querySelector(".reviews-block");try{let e=(await(await fetch("https://portfolio-js.b.goit.study/api/reviews")).json()).map(({avatar_url:r,author:o,review:c})=>`
     <li class="swiper-slide reviews-elem"> 
       <img class="reviews-img" src="${r}" alt="${o}">
       <div class="reviews-info">
         <p class="reviews-autor">${o}</p>
         <p class="reviews-text">${c}</p>
       </div>
     </li>
   `).join("");t.innerHTML=e}catch(i){console.error(i),t.innerHTML='<p class="not-found">Not found</p>';const s=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(a.error({message:"Reviews not found",position:"topRight"}),s.disconnect())})},{threshold:.1});s.observe(n)}new l(".swiper",{modules:[u,d],simulateTouch:!0,touchRatio:1,touchEventsTarget:"container",grabCursor:!0,slidesPerView:1,spaceBetween:16,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0,onlyInViewport:!0},breakpoints:{768:{slidesPerView:2},1280:{slidesPerView:4}}})});
//# sourceMappingURL=index.js.map
