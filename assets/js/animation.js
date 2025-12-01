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

  // Anchor smooth scroll
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      smoother.scrollTo(target, true, "top top");
    });
  });
}
// ========================== Cursor hareketi
const cursor = document.querySelector(".cursor");

// Mouse'u takip ettir
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Büyüme olmasını istediğimiz elementler
// Yazı içeren tüm elementleri seçiyoruz, ama nav içindekileri çıkartıyoruz
const textElements = document.querySelectorAll(
  "p, h1, h2, h3, h4, h5, h6, span, a:not(nav a), li, button, .text, .title"
);

// Bu yazılara hover olunca cursor büyür
textElements.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
});

// ================ banner animation

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".banner",
    start: "top top",
    end: "200% top",
    scrub: true,
    pin: true,
    pinSpacing: true,
  },
});

// AŞAMA 1 → ekrana yakın + yatık durumda görünür hale gelir
tl.to(".banner h2, .banner p", {
  opacity: 0,
  duration: 0.1,
  stagger: 0.15,
  y: 200,
});

// AŞAMA 2 → yazılar ekranın içine doğru (Z geri) kayar
tl.to(".banner h2, .banner p", {
  opacity: 1,
  translateZ: -800, // ekranın içine doğru
  rotateX: 50, // hâlâ yatık
  duration: 1,
  stagger: 0.15,
  y: 100,
})

  // AŞAMA 3 → dikleşmeye başlar (rotateX → 0)
  .to(".banner h2, .banner p", {
    rotateX: 0,
    duration: 1,
    stagger: 0.15,
    y: 0,
  });

// AŞAMA 4 → kullanıcıya geri yaklaşır (Z → 0)
tl.to(".banner h2, .banner p", {
  translateZ: 0,
  duration: 1,
  stagger: 0.15,
})

  // ANİMASYON BİTİNCE 0.5s BEKLE → SONRA KAYDIR
  .to(".banner", {
    duration: 0.2, // kayma süresi
    delay: 0.2, // animasyon sonrası gecikme
  });

// ==================== services

gsap.registerPlugin(ScrollTrigger);

// === Sol Text Block Girişi ===
gsap.from(".service-section .text-block", {
  opacity: 0,
  x: -80,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".service-section",
    start: "top 80%",
  },
});

// === Sağdaki Görsel Girişi ===
gsap.from(".service-section .image-block img", {
  opacity: 0,
  x: 80,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".service-section",
    start: "top 80%",
  },
});

// === Maddelerin Tek Tek Fade-Up Girişi ===
gsap.utils.toArray(".features-text p").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: i * 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".features-text",
      start: "top 85%",
    },
  });
});

// ==================== Process
function animateProcessSection() {
  gsap.from(".process-section", {
    scrollTrigger: {
      trigger: ".process-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    y: 60,
    filter: "blur(2px)",
    duration: 1.6,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateProcessSection();
});
// ==================== Tech
function animateTechSection() {
  gsap.from(".tech-values-section", {
    scrollTrigger: {
      trigger: ".tech-values-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    x: 60,
    filter: "blur(2px)",
    duration: 3,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateTechSection();
});

// ==================== Projects
function animateProjectsSection() {
  gsap.from(".projects-section", {
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    x: -60,
    filter: "blur(2px)",
    duration: 3,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateProjectsSection();
});

// ====================== about-us

gsap.registerPlugin(ScrollTrigger);

function animateAboutSection() {
  // Sol taraf (soldan sağa)
  gsap.from(".about-left", {
    scrollTrigger: {
      trigger: ".about-us-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    x: -80,
    duration: 1.4,
    ease: "power3.out",
  });

  // Sağ taraf (sağdan sola)
  gsap.from(".about-right", {
    scrollTrigger: {
      trigger: ".about-us-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    x: 80,
    duration: 1.4,
    ease: "power3.out",
  });
}

document.addEventListener("DOMContentLoaded", animateAboutSection);

// ====================== Call Us

function animateCallUsSection() {
  gsap.from(".call-us-section", {
    scrollTrigger: {
      trigger: ".call-us-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    y: -60,
    filter: "blur(2px)",
    duration: 1.6,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateCallUsSection();
});

// ====================== FAQ

function animateFAQSection() {
  gsap.from(".faq-section", {
    scrollTrigger: {
      trigger: ".faq-section",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    y: 60,
    filter: "blur(2px)",
    duration: 1.6,
    ease: "power2.out",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateFAQSection();
});
