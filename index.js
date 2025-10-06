 const goTopBtn = document.getElementById("goTopBtn");
  const mainDiv = document.getElementById("main");

  // Mostrar botón cuando bajes más allá de #main
  window.addEventListener("scroll", () => {
    if (window.scrollY > mainDiv.offsetHeight) {
      goTopBtn.style.display = "block";
    } else {
      goTopBtn.style.display = "none";
    }
  });

  // Volver arriba con scroll suave
  goTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

    // Función para abrir modal
document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = card.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    goTopBtn.classList.add("blur"); 
  });
});

// Función para cerrar modal (botón)
document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.style.display = "none";
    goTopBtn.classList.remove("blur"); 
  });
});

// Cerrar modal con ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.style.display = "none";
    });
    goTopBtn.classList.remove("blur");
  }
});

// Cerrar modal clickeando afuera
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      goTopBtn.classList.remove("blur");
    }
  });
});

  function descargarPDF() {
    const link = document.createElement("a");
    link.href = "Assets/Curriculum Cesar Ibarra.pdf"; 
    link.download = "Curriculum Cesar Ibarra.pdf";
    link.click();
  }

  //animacion h1//
const hello = document.getElementById('hello');
const originalHTML = hello.innerHTML; // respeta <br>
const textParts = originalHTML.split(/(<br>)/g); // divide en texto y saltos de línea

hello.innerHTML = '';

textParts.forEach((part, i) => {
  if (part === '<br>') {
    hello.appendChild(document.createElement('br')); // mantener saltos
  } else {
    const container = document.createElement('span');
    container.className = 'split-text';

    [...part].forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === " " ? "\u00A0" : char; // conserva espacios
      span.style.animationDelay = `${(i * 0.3) + index * 0.05}s`;
      container.appendChild(span);
    });

    hello.appendChild(container);
  }
});