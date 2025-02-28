import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: window.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: window.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: window.env.REACT_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: window.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: window.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
