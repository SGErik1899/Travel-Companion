// Firebase SDK importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyCxdlwpIrYzOZth3h2NMOOva2NRVVPFX0M",
  authDomain: "reiseplaner-erik.firebaseapp.com",
  projectId: "reiseplaner-erik",
  storageBucket: "reiseplaner-erik.firebasestorage.app",
  messagingSenderId: "1025613186399",
  appId: "1:1025613186399:web:949472acc21f59b664a2ea"
};

// Firebase starten
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

console.log("✅ Firebase erfolgreich initialisiert");

async function loginWithGoogle() {

    try {

        const result = await signInWithPopup(auth, provider);

        console.log(result.user);

    } catch (error) {

        console.error("Login fehlgeschlagen:", error);

    }

}
window.loginWithGoogle = loginWithGoogle;
