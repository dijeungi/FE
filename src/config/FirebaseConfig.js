import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: JSON.stringify(window.env.REACT_APP_FIREBASE_API_KEY).replace(
    /(^"|"$)/g,
    ""
  ),
  authDomain: JSON.stringify(window.env.REACT_APP_FIREBASE_AUTH_DOMAIN).replace(
    /(^"|"$)/g,
    ""
  ),
  projectId: JSON.stringify(window.env.REACT_APP_FIREBASE_PROJECT_ID).replace(
    /(^"|"$)/g,
    ""
  ),
  messagingSenderId: JSON.stringify(
    window.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  ).replace(/(^"|"$)/g, ""),
  appId: JSON.stringify(window.env.REACT_APP_FIREBASE_APP_ID).replace(
    /(^"|"$)/g,
    ""
  ),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
