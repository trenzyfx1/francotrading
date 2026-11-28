// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0oJPcnr8ij_AUCRrGSs2Pf7DWjSl_ZNc",
  authDomain: "francotrading-11fa5.firebaseapp.com",
  projectId: "francotrading-11fa5",
  storageBucket: "francotrading-11fa5.firebasestorage.app",
  messagingSenderId: "583238316249",
  appId: "1:583238316249:web:65dc5f6dd27503b6facec8",
  measurementId: "G-2X0W0EZVGF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make these available globally for your HTML scripts to use
window.db = db;
window.doc = doc;
window.setDoc = setDoc;
window.serverTimestamp = serverTimestamp;

// Helper to get or create a unique session ID for this user
window.getSessionId = function() {
    let id = sessionStorage.getItem('franco_session_id');
    if (!id) {
        id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        // FIXED: Changed 'student_session_id' to 'franco_session_id' here
        sessionStorage.setItem('franco_session_id', id);
    }
    return id;
};