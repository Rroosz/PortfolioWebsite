// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCH0uHCCfDaJqVtYb1JVpTcC9-CED_FbFc",
  authDomain: "testfrom-58b86.firebaseapp.com",
  projectId: "testfrom-58b86",
  storageBucket: "testfrom-58b86.firebasestorage.app",
  messagingSenderId: "956313429651",
  appId: "1:956313429651:web:02d65f4eca3ce741e18f66",
  measurementId: "G-3DDMTLWDNC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Evento del botón
document.getElementById("getStartedBtn").addEventListener("click", async () => {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Obtener checkboxes seleccionadas
  const selectedServices = [...document.querySelectorAll(".service:checked")]
    .map(cb => cb.value);

  // Validación simple
  if (!name || !email || !message) {
    alert("Por favor llena todos los campos.");
    return;
  }

  try {
    // Generar ID único para cada solicitud
    const customId = "web-contact-request-" + Date.now();

    await setDoc(doc(db, "client_requests", customId), {
      name: name,
      email: email,
      message: message,
      services: selectedServices,
      date: new Date(),
      idType: "web-contact-request"
    });

    alert("¡Tu información fue enviada con éxito!");
  } catch (err) {
    console.error("Error al guardar:", err);
    alert("Hubo un error al enviar la información.");
  }
});
