import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: String(window.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(window.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(window.env.REACT_APP_FIREBASE_PROJECT_ID),
  messagingSenderId: String(window.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(window.env.REACT_APP_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
