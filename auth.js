// Mi Espacio — Firebase: inicio de sesión + base de datos del diario.
// El apiKey de Firebase web NO es un secreto: es un identificador público del proyecto.
// La protección real la dan las Security Rules (firestore.rules) y App Check, no ocultar esta clave.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, collection, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc,
  query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyALsQt6xNVTdBe6CpBTaeh1nxmhw68MGzU",
  authDomain: "psicoapp-a7b6e.firebaseapp.com",
  projectId: "psicoapp-a7b6e",
  storageBucket: "psicoapp-a7b6e.firebasestorage.app",
  messagingSenderId: "175161913424",
  appId: "1:175161913424:web:195279326691b492ec2155"
};

// ⚠️ CAMBIA ESTE CORREO por el de Diana (en minúsculas) cuando lo tengas,
//    y pon EXACTAMENTE EL MISMO en firestore.rules. Es el único admin.
const ADMIN_EMAIL = "psico.dianayala@gmail.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence).catch(() => {});

window.MiAuth = {
  ready: false,
  user: null,
  adminEmail: ADMIN_EMAIL,
  isAdmin: () => !!(window.MiAuth.user && window.MiAuth.user.email &&
                    window.MiAuth.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()),
  signIn: (email, pwd) => signInWithEmailAndPassword(auth, email, pwd),
  signUp: async (email, pwd) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pwd);
    try { await sendEmailVerification(cred.user); } catch (e) {}
    return cred;
  },
  signOut: () => signOut(auth),
  reset: (email) => sendPasswordResetEmail(auth, email),
};

// Base de datos del diario (y perfil mínimo).
window.MiDB = {
  setNombre: (uid, nombre) =>
    setDoc(doc(db, "participantes", uid), { nombre }, { merge: true }),
  getPerfil: async (uid) => {
    const d = await getDoc(doc(db, "participantes", uid));
    return d.exists() ? { uid, ...d.data() } : null;
  },
  listEntradas: async (uid) => {
    const q = query(collection(db, "participantes", uid, "diario"), orderBy("creado", "desc"));
    const s = await getDocs(q);
    return s.docs.map((d) => ({ id: d.id, ...d.data() }));
  },
  getEntrada: async (uid, id) => {
    const d = await getDoc(doc(db, "participantes", uid, "diario", id));
    return d.exists() ? { id: d.id, ...d.data() } : null;
  },
  addEntrada: (uid, e) =>
    addDoc(collection(db, "participantes", uid, "diario"), {
      titulo: e.titulo || "", texto: e.texto || "", emocion: e.emocion || "",
      sesion: !!e.sesion, creado: serverTimestamp(),
    }),
  delEntrada: (uid, id) => deleteDoc(doc(db, "participantes", uid, "diario", id)),
  listParticipantes: async () => {
    const s = await getDocs(collection(db, "participantes"));
    return s.docs.map((d) => ({ uid: d.id, ...d.data() }));
  },
};

onAuthStateChanged(auth, (u) => {
  window.MiAuth.user = u ? { email: u.email, uid: u.uid, verificado: u.emailVerified } : null;
  window.MiAuth.ready = true;
  // Crea/actualiza el perfil mínimo de la participante (se ignora si las reglas aún no están).
  if (u) {
    setDoc(doc(db, "participantes", u.uid), { email: u.email, creado: serverTimestamp() }, { merge: true })
      .catch(() => {});
  }
  if (window.__authChanged) window.__authChanged();
});
