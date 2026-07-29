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
    addDoc,
    doc,
    setDoc,
    getDocs,
    getDoc
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

onAuthStateChanged(auth, async (user) => {

  if (user) {

   console.log("Bereits angemeldet:", user.displayName);

if (!(await userExists(user))) {

    await saveUser(user);

}

await createTrip(user, "Testreise");

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

    try {

        const docRef = await addDoc(
            collection(db, "test"),
            {
                nachricht: "Hallo Firestore!",
                erstelltAm: new Date().toISOString()
            }
        );

        console.log("✅ Testdokument gespeichert:", docRef.id);

    } catch (error) {

        console.error("❌ Fehler beim Speichern:", error);

    }
}
 async function saveUser(user) {

    try {

        await setDoc(
            doc(db, "users", user.uid),
            {
                name: user.displayName,
                email: user.email,
                lastLogin: new Date().toISOString(),
                settings: {}
            },
            {
                merge: true
            }
        );

        console.log("✅ Benutzer gespeichert");

    } catch (error) {

        console.error("❌ Benutzer konnte nicht gespeichert werden:", error);

    }

}

async function userExists(user) {

    const userDoc = await getDoc(
        doc(db, "users", user.uid)
    );

    return userDoc.exists();

}

async function createTrip(user, tripName) {

    await addDoc(
        collection(db, "users", user.uid, "trips"),
        {
            name: tripName
        }
    );

}

async function loadTrips(user) {

    const snapshot = await getDocs(
        collection(db, "users", user.uid, "trips")
    );

    const trips = [];

    snapshot.forEach(doc => {

        trips.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return trips;

}
