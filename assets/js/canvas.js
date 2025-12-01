document.addEventListener("DOMContentLoaded", () => {
  initParticles("projects-canvas");
  initParticles("process-canvas");
});

function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height;
  const particles = [];

  // *** TELEFON OPTİMİZASYONU ***
  const isMobile = window.innerWidth < 768;

  const numParticles = isMobile ? 30 : 80;
  const maxDistance = isMobile ? 70 : 120;
  const interactionRadius = isMobile ? 70 : 100;
  const pushPower = isMobile ? 0.03 : 0.05;

  let mouseX = 0;
  let mouseY = 0;

  const random = (min, max) => Math.random() * (max - min) + min;

  function setCanvasSize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  // Mouse + Touch destekli
  function updatePointer(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    } else {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
  }

  canvas.addEventListener("mousemove", updatePointer);
  canvas.addEventListener("touchmove", updatePointer);

  class Particle {
    constructor() {
      this.x = random(0, width);
      this.y = random(0, height);
      this.radius = random(1, isMobile ? 2 : 3);

      gsap.set(this, { x: this.x, y: this.y });
      this.animate();
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Daha düşük animasyon yoğunluğu telefon için
    animate() {
      gsap.to(this, {
        x: `+=${random(isMobile ? -30 : -50, isMobile ? 30 : 50)}`,
        y: `+=${random(isMobile ? -30 : -50, isMobile ? 30 : 50)}`,
        duration: random(isMobile ? 8 : 5, isMobile ? 18 : 15),
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        overwrite: "auto",
      });
    }
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numParticles; i++) {
      const p1 = particles[i];

      const dx = mouseX - p1.x;
      const dy = mouseY - p1.y;
      const distSq = dx * dx + dy * dy;

      // Yakınlaşınca itme
      if (!isMobile && distSq < interactionRadius * interactionRadius) {
        gsap.to(p1, {
          x: p1.x - dx * pushPower,
          y: p1.y - dy * pushPower,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      p1.draw();

      for (let j = i + 1; j < numParticles; j++) {
        const p2 = particles[j];
        const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * (isMobile ? 0.35 : 0.5);
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

          gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(255, 0, 255, ${opacity})`);

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = isMobile ? 0.6 : 1;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  gsap.ticker.add(render);
}
