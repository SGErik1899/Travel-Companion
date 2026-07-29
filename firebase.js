// Firebase SDK importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

console.log("✅ Firebase erfolgreich initialisiert");
testFirestore();

async function loginWithGoogle() {

    try {

        const result = await signInWithPopup(auth, provider);

        console.log(result.user);

    } catch (error) {

        console.error("Login fehlgeschlagen:", error);

    }

}
async function logout() {

    try {

        await signOut(auth);

        console.log("Erfolgreich abgemeldet");

    } catch (error) {

        console.error("Abmeldung fehlgeschlagen:", error);

    }

}
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Bereits angemeldet:", user.displayName);

    document.getElementById("cloudStatus").textContent = "✅ Angemeldet";
    document.getElementById("cloudUser").textContent = user.displayName;
    document.getElementById("googleLoginButton").style.display = "none";
    document.getElementById("logoutButton").style.display = "block";

} else {

    console.log("Kein Benutzer angemeldet");

    document.getElementById("cloudStatus").textContent = "❌ Nicht angemeldet";
    document.getElementById("cloudUser").textContent = "-";

    document.getElementById("googleLoginButton").style.display = "block";
    document.getElementById("logoutButton").style.display = "none";

}

});
async function testFirestore() {

    console.log("Testfunktion wurde gefunden");

}
