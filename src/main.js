import "./style.css";

document.querySelector("#app").innerHTML = `
  <header>
    <nav role="navigation" aria-label="Navegación principal">
      <h1>Galletatpi</h1>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h2>Bienvenido a Galletatpi</h2>
      <p class="subtitle">Técnicas de Programación para Internet - UES</p>
      <p class="description">
        Galletatpi es tu portal oficial para la materia de TPI en la Universidad de El Salvador.
        Descubre el mundo de la programación web moderna y aprende las mejores prácticas actuales.
      </p>
    </section>

    <section class="cookie-section">
      <div class="cookie-container">
        <button id="cookie-btn" type="button" aria-label="Hacer click en la galleta para ver mensaje de bienvenida" class="cookie-button">
          <img src="/cookie.svg" alt="Galleta de Galletatpi" class="cookie-icon">
        </button>
        <p class="cookie-instruction">¡Haz click en la galleta de Galletatpi!</p>
      </div>
      <div id="message" class="message" role="alert" aria-live="polite"></div>
    </section>

    <section class="info-section">
      <article class="info-card">
        <h3>💻 ¿Qué es Galletatpi?</h3>
        <p>Galletatpi es la plataforma educativa para la materia de TPI donde aprenderás programación web moderna desde cero</p>
      </article>
      <article class="info-card">
        <h3>🎓 Universidad de El Salvador</h3>
        <p>Galletatpi ofrece formación académica de excelencia en tecnologías de internet avalada por la UES</p>
      </article>
      <article class="info-card">
        <h3>🚀 Proyectos Modernos</h3>
        <p>Con Galletatpi desarrollarás aplicaciones web utilizando las mejores prácticas y tecnologías actuales</p>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Galletatpi - Universidad de El Salvador (UES)</p>
  </footer>
`;

// Configurar funcionalidad de la galleta
const cookieBtn = document.querySelector("#cookie-btn");
const messageDiv = document.querySelector("#message");
let clickCount = 0;

cookieBtn.addEventListener("click", () => {
  clickCount++;

  // Añadir animación al botón
  cookieBtn.classList.add("clicked");
  setTimeout(() => cookieBtn.classList.remove("clicked"), 300);

  // Mostrar mensaje
  messageDiv.textContent = "¡Bienvenido a la materia de TPI en la UES!";
  messageDiv.classList.add("show");

  // Opcional: agregar contador de clicks con branding Galletatpi
  if (clickCount > 1) {
    messageDiv.textContent = `¡Bienvenido a la materia de TPI en la UES! (${clickCount} galletas de Galletatpi)`;
  }
});

// Efecto de partículas al mover el mouse
let mouseX = 0;
let mouseY = 0;
let particles = [];

// Crear elemento canvas para partículas
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "999";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Actualizar tamaño del canvas al redimensionar
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Clase para las partículas
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 2;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.fillStyle = `rgba(99, 102, 241, ${this.life / 100})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Seguir el mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Crear partículas ocasionalmente
  if (Math.random() < 0.1) {
    particles.push(new Particle(mouseX, mouseY));
  }
});

// Animar partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Efecto de inclinación 3D en las tarjetas
const cards = document.querySelectorAll(".info-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});
