'use strict';

const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.setAttribute('aria-expanded', 'false');
  sidebarBtn.setAttribute('aria-controls', 'sidebar-info-more');

  sidebarBtn.addEventListener("click", () => {
    elementToggleFunc(sidebar);
    const expanded = sidebar.classList.contains('active');
    sidebarBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

// Testimonials modal (verifică existența înainte)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {
  for (const item of testimonialsItem) {
    item.addEventListener("click", function () {
      const av = this.querySelector("[data-testimonials-avatar]");
      const tt = this.querySelector("[data-testimonials-title]");
      const tx = this.querySelector("[data-testimonials-text]");
      if (av && modalImg) { modalImg.src = av.src; modalImg.alt = av.alt || ""; }
      if (tt && modalTitle) modalTitle.textContent = tt.textContent || "";
      if (tx && modalText) modalText.innerHTML = tx.innerHTML; // conținutul e intern, sigur
      testimonialsModalFunc();
    });
  }
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// Custom select (păstrează denumirea actuală; dacă vrei, redenumește în data-select-value)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select && selectValue) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  const filterFunc = (selectedValue) => {
    for (const el of filterItems) {
      if (selectedValue === "all" || selectedValue === el.dataset.category) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  };

  for (const it of selectItems) {
    it.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  let lastClickedBtn = filterBtn[0];
  for (const btn of filterBtn) {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// Form
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
if (form && formInputs.length && formBtn) {
  for (const inp of formInputs) {
    inp.addEventListener("input", () => {
      if (form.checkValidity()) formBtn.removeAttribute("disabled");
      else formBtn.setAttribute("disabled", "");
    });
  }
}

// Nav
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
if (navigationLinks.length && pages.length) {
  for (const nav of navigationLinks) {
    nav.addEventListener("click", function () {
      for (let i = 0; i < pages.length; i++) {
        if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          this.setAttribute('aria-current', 'page');
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].removeAttribute('aria-current');
          navigationLinks[i].classList.remove("active");
        }
      }
    });
  }
}
