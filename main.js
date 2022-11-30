"use strict";

window.onload = () => {
  const toggleButton = document.querySelector(".mobile-toggle");
  const burger = document.querySelector(".burger");
  const signInBtns = document.querySelectorAll(".get-started");
  const multiForm = document.querySelector("[data-multi-step]");

  toggleButton.addEventListener("click", () => {
    burger.classList.toggle("activated");
  });

  signInBtns
    ? signInBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          location.href = "signin.html";
        });
      })
    : null;

  // multiForm functionality

  if (multiForm) {
    const form = document.forms.RegForm;
    const formSteps = [...multiForm.querySelectorAll("[data-step]")];
    const nextBtn = document.querySelector("[data-next]");
    const prevBtn = document.querySelector("[data-prev]");
    const submitBtn = document.querySelector("[data-submit]");
    const idNumber = form.id_num;
    const name = form.name;
    const email = form.email;
    const verifyId = form.verify_id;

    const idValidation = () => {
      if (idNumber.value == "" || idNumber.value.length < 10) {
        idNumber.closest(".form-group").classList.add("error");
        return false;
      } else {
        idNumber.closest(".form-group").classList.remove("error");
      }
      return true;
    };

    const validation = () => {
      var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; //Javascript reGex for Email Validation.

      if (name.value == "") {
        name.closest(".form-group").classList.add("error");
        return false;
      } else {
        name.closest(".form-group").classList.remove("error");
      }
      if (email.value == "" || !regEmail.test(email.value)) {
        email.closest(".form-group").classList.add("error");
        return false;
      } else {
        email.closest(".form-group").classList.remove("error");
      }

      if (verifyId.value !== idNumber.value) {
        verifyId.closest(".form-group").classList.add("error");
        return false;
      } else {
        verifyId.closest(".form-group").classList.remove("error");
      }
      return true;
    };

    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains("active");
    });

    if (currentStep < 0) {
      currentStep = 0;
      formSteps[currentStep].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      if (idValidation()) {
        formSteps[currentStep].classList.remove("active");
        currentStep++;
        formSteps[currentStep].classList.add("active");
      }
    });

    prevBtn.addEventListener("click", () => {
      formSteps[currentStep].classList.remove("active");
      currentStep--;
      formSteps[currentStep].classList.add("active");
    });

    submitBtn.addEventListener("click", () => {
      if (validation()) {
        location.href = "admin.html";
      }
    });
  }

  // Nav function on mobile

  const menuIcon = document.querySelector(".menu-icon");
  const aside = document.querySelector(".aside");

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
  }

  // Page load function

  const transition_el = document.querySelector(".transition");
  const anchors = document.querySelectorAll("a");

  setTimeout(() => {
    transition_el.classList.remove("is-active");
  }, 500);

  anchors &&
    anchors.forEach((anchor, i) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        let target = e.target.href;
        transition_el.classList.add("is-active");
        setTimeout(() => {
          window.location.href = target;
        }, 500);
      });
    });

  // Tilt effect

  const tiltSettings = {
    max: 25, // max tilt rotation (degrees (deg))
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1.1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 2000, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)", // easing (transition-timing-function) of the enter/exit transition
  };

  const teamCards = document.querySelectorAll(".team-member");

  teamCards.forEach((teamCard) => {
    teamCard.addEventListener("mouseenter", cardMouseEnter);
    teamCard.addEventListener("mousemove", cardMouseMove);
    teamCard.addEventListener("mouseleave", cardMouseLeave);
  });

  function cardMouseEnter(event) {
    setTransition(event);
  }

  function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth / 2;
    const centerY = card.offsetTop + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1 * tiltSettings.max * mouseX) / (cardHeight / 2);
    const rotateYUncapped = (-1 * tiltSettings.max * mouseX) / (cardWidth / 2);
    const rotateX =
      rotateXUncapped < -tiltSettings.max
        ? -tiltSettings.max
        : rotateXUncapped > tiltSettings.max
        ? tiltSettings.max
        : rotateXUncapped;
    const rotateY =
      rotateYUncapped < -tiltSettings.max
        ? -tiltSettings.max
        : rotateYUncapped > tiltSettings.max
        ? tiltSettings.max
        : rotateYUncapped;

    card.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                              scale3d(${tiltSettings.scale}, ${tiltSettings.scale}, ${tiltSettings.scale})`;
  }

  function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
  }

  function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltSettings.speed}ms ${tiltSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
      card.style.transition = "";
    }, tiltSettings.speed);
  }
};

// Scroll function

const nav = document.querySelector(".nav-primary");

const scrollFunction = () => {
  const headerHeight = document.querySelector(".nav-header").offsetHeight;
  if (
    document.body.scrollTop > headerHeight - 120 ||
    document.documentElement.scrollTop > headerHeight - 120
  ) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

window.onscroll = () => nav && scrollFunction();
