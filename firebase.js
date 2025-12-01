// ===============================
// IMPORTS
// ===============================
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";



// ===============================
// CONFIGURACIÓN FIREBASE
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCH0uHCCfDaJqVtYb1JVpTcC9-CED_FbFc",
  authDomain: "testfrom-58b86.firebaseapp.com",
  projectId: "testfrom-58b86",
  storageBucket: "testfrom-58b86.firebasestorage.app",
  messagingSenderId: "956313429651",
  appId: "1:956313429651:web:02d65f4eca3ce741e18f66",
  measurementId: "G-3DDMTLWDNC"
};


// ===============================
// INICIALIZAR APP, DB Y STORAGE
// ===============================
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// ============================================================================
// 1) FORMULARIO DE CONTACTO (PÁGINA PRINCIPAL)
// ============================================================================
export async function enviarFormulario() {

  const name = document.getElementById("username")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  const selectedServices = [...document.querySelectorAll(".service:checked")]
    .map(cb => cb.value);

  if (!name || !email || !message) {
    alert("Por favor llena todos los campos.");
    return;
  }

  try {
    const customId = "web-contact-request-" + Date.now();

    await setDoc(doc(db, "client_requests", customId), {
      name,
      email,
      message,
      services: selectedServices,
      date: new Date(),
      idType: "web-contact-request"
    });

    alert("¡Tu información fue enviada con éxito!");

  } catch (err) {
    console.error("Error al guardar:", err);
    alert("Hubo un error al enviar la información.");
  }
}


export async function registrarProducto() {

  const nombre = document.getElementById("nombre")?.value;
  const precio = parseFloat(document.getElementById("precio")?.value);
  const descripcion = document.getElementById("descripcion")?.value;
  const imagenURL = document.getElementById("imagenURL")?.value;

  if (!nombre || !precio || !descripcion || !imagenURL) {
    alert("Llena todos los campos.");
    return;
  }

  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      descripcion,
      imagen: imagenURL,   // ⬅️ Guardamos la URL local
      fecha: new Date()
    });

    alert("Producto registrado con éxito");

  } catch (error) {
    console.error("Error al registrar producto:", error);
    alert("Hubo un error al guardar el producto.");
  }
}


// ============================================================================
// 3) CARGAR PRODUCTOS PARA LA TIENDA
// ============================================================================
export function cargarProductos(callback) {

  onSnapshot(collection(db, "productos"), (snapshot) => {
    const lista = [];

    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });

    callback(lista);
  });

}


// ============================================================================
// 4) AUTO-ENLACE DEL BOTÓN DEL FORMULARIO (POR SI EXISTE EN LA PÁGINA)
// ============================================================================
const btn = document.getElementById("getStartedBtn");

if (btn) {
  btn.addEventListener("click", enviarFormulario);
}
