/* =========================================================
   NUEVO DESTINO VIAJES — js/firebase-config.js
   Proyecto: nuevo-destino-web
   Colección Firestore: "paquetes"
   ========================================================= */

const firebaseConfig = {
  apiKey:            "AIzaSyA-rqJU8LIZyUajUKzzEkbo67ASlPmH-GQ",
  authDomain:        "nuevo-destino-web.firebaseapp.com",
  projectId:         "nuevo-destino-web",
  storageBucket:     "nuevo-destino-web.firebasestorage.app",
  messagingSenderId: "287208628191",
  appId:             "1:287208628191:web:cf99598c33cd1614766e6a",
  measurementId:     "G-TP19NYNE9N"
};

firebase.initializeApp(firebaseConfig);

const db   = firebase.firestore();
const auth = firebase.auth();

const PAQUETES_COL = db.collection("paquetes");

// Firebase Storage para subir imágenes, PDFs y flyers
const storage = firebase.storage();
