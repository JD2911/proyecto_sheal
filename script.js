document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MENÚ MÓVIL
  // =========================
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // =========================
  // SLIDER HERO
  // =========================
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".dot")];
  let currentSlide = 0;
  let sliderTimer;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5500);
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      startSlider();
    });
  });

  showSlide(0);
  startSlider();

  // =========================
  // FLECHA DE DESTINOS
  // =========================
  const destinationsNext = document.querySelector(".destinations-next");
  const destinationsGrid = document.querySelector("#destinos-grid");

  destinationsNext?.addEventListener("click", () => {
    destinationsGrid.scrollBy({
      left: 230,
      behavior: "smooth"
    });
  });

  // =========================
  // CONTROLES DE PAQUETES
  // =========================
  const packageGrid = document.querySelector("#paquetes-grid");
  const packageButtons = document.querySelectorAll(".carousel-controls button");

  packageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const direction = index === 0 ? -230 : 230;
      packageGrid.scrollBy({
        left: direction,
        behavior: "smooth"
      });
    });
  });

  // =========================
  // SCROLL REVEAL SUTIL
  // =========================
  const revealElements = document.querySelectorAll(
    ".travel-card, .benefit, .section-intro, .center-heading"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => observer.observe(el));
});
