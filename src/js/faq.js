import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".questions", {
    duration: 400,
    showMultiple: true,
    openOnInit: [],
    elementClass: "question-group",
    triggerClass: "svg-icon-group",
    panelClass: "answer",
    collapse: true,
    beforeOpen: (element) => {
      const arrowIcon = element.querySelector(".arrow-icon");
      if (arrowIcon) {
        arrowIcon.style.transform = "rotate(180deg)";
      }
    },

    beforeClose: (element) => {
      const arrowIcon = element.querySelector(".arrow-icon");
      if (arrowIcon) {
        arrowIcon.style.transform = "rotate(0deg)";
      }
    },
  });
});

