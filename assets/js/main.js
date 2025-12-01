//===================== Kaydırma Animasyonu
// GSAP eklentilerini kaydet
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

if (window.innerWidth > 768) {
  smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: ".smooth-content",
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    speed: 1.5,
  });

  // HEADER STICKY
  ScrollTrigger.create({
    trigger: ".smooth-content",
    start: "top top",
    end: "bottom bottom",
    pin: "header",
    pinSpacing: false,
  });

  // NAV anchor tıklamasını GSAP ile çözüyoruz
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.getAttribute("href");
      smoother.scrollTo(target, true, "top top");
    });
  });
}

// ==================== Hamburger =======================

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const navLinks = nav.querySelectorAll("a");

// Menü aç/kapa
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // dış tıklama açma davranışından etkilenmesin

  if (nav.classList.contains("show")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// MENÜ AÇMA FONKSİYONU
function openMenu() {
  nav.style.display = "flex";
  nav.classList.add("show");
  hamburger.classList.add("active");
}

// MENÜ KAPAMA FONKSİYONU + Animasyon
function closeMenu() {
  nav.classList.remove("show");
  nav.classList.add("closing");
  hamburger.classList.remove("active");

  nav.addEventListener(
    "animationend",
    () => {
      nav.classList.remove("closing");
      nav.style.display = "none";
    },
    { once: true }
  );
}

// 📌 1) Menüdeki bir linke tıklayınca kapanır
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// 📌 2) Ekranın herhangi bir yerine tıklayınca kapanır
document.addEventListener("click", (e) => {
  const isClickInsideMenu = nav.contains(e.target);
  const isClickHamburger = hamburger.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickHamburger &&
    nav.classList.contains("show")
  ) {
    closeMenu();
  }
});

// ==================== Process =======================

const swiper = new Swiper(".myProcessSwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  on: {
    slideChangeTransitionStart: () => {
      const activeSlide = document.querySelector(
        ".swiper-slide-active .slide-content"
      );

      // Fade + Scale giriş animasyonu
      gsap.fromTo(
        activeSlide,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      // Neon pulse efekti
      gsap.to(activeSlide, {
        boxShadow: "0 0 30px rgba(0,255,255,0.3)",
        duration: 0.4,
        repeat: 1,
        yoyo: true,
      });
    },
  },
});

// ==================== FAQ =======================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
