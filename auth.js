// Mi Espacio — inicio de sesión con Firebase Authentication (correo y contraseña).
// Nota: el apiKey de Firebase web NO es un secreto; es un identificador público del proyecto.
// La protección real se hace con Security Rules y App Check, no ocultando esta clave.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, sendPasswordResetEmail, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyALsQt6xNVTdBe6CpBTaeh1nxmhw68MGzU",
  authDomain: "psicoapp-a7b6e.firebaseapp.com",
  projectId: "psicoapp-a7b6e",
  storageBucket: "psicoapp-a7b6e.firebasestorage.app",
  messagingSenderId: "175161913424",
  appId: "1:175161913424:web:195279326691b492ec2155"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(() => {});

window.MiAuth = {
  ready: false,
  user: null,
  signIn: (email, pwd) => signInWithEmailAndPassword(auth, email, pwd),
  signOut: () => signOut(auth),
  reset: (email) => sendPasswordResetEmail(auth, email),
};

onAuthStateChanged(auth, (u) => {
  window.MiAuth.user = u ? { email: u.email, uid: u.uid, verificado: u.emailVerified } : null;
  window.MiAuth.ready = true;
  if (window.__authChanged) window.__authChanged();
});
