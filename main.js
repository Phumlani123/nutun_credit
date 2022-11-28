// import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

"use strict";

const toggleNav = document.querySelector(".mobile-toggle");
const nav = document.querySelector(".navbar");
const signIn = document.querySelector(".get-started");
const multiForm = document.querySelector("[data-multi-step]");
const dashboardCard = document.querySelector(".dashboard-card");

if (dashboardCard) {
  dashboardCard.addEventListener("click", () => {
    dashboardCard.classList.toggle("animate");
  });
}

toggleNav.addEventListener("click", () => {
  nav.hasAttribute("data-visible")
    ? nav.setAttribute("aria-expanded", false)
    : nav.setAttribute("aria-expanded", true);
  nav.toggleAttribute("data-visible");
});

signIn
  ? signIn.addEventListener("click", () => {
      location.href = "signin.html";
    })
  : null;

if (multiForm) {
  const formSteps = [...multiForm.querySelectorAll("[data-step]")];
  const nextBtn = document.querySelector("[data-next]");
  const prevBtn = document.querySelector("[data-prev]");
  const submitBtn = document.querySelector("[data-submit]");

  let currentStep = formSteps.findIndex((step) => {
    return step.classList.contains("active");
  });

  if (currentStep < 0) {
    currentStep = 0;
    formSteps[currentStep].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    formSteps[currentStep].classList.remove("active");
    currentStep++;
    formSteps[currentStep].classList.add("active");
  });

  prevBtn.addEventListener("click", () => {
    formSteps[currentStep].classList.remove("active");
    currentStep--;
    formSteps[currentStep].classList.add("active");
  });

  submitBtn.addEventListener("click", () => {
    location.href = "admin.html";
  });
}

const menuIcon = document.querySelector(".menu-icon");
const aside = document.querySelector(".aside");
const asideClose = document.querySelector(".aside_close-icon");

if (menuIcon) {
  function toggle(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

  menuIcon.addEventListener("click", function () {
    toggle(aside, "active");
  });

  asideClose.addEventListener("click", function () {
    toggle(aside, "active");
  });
}
