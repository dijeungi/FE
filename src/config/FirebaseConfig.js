import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZQsMko9usaLnt1d9OOVFXMfB2voSSWtQ",
    authDomain: "test1-56b19.firebaseapp.com",
    projectId: "test1-56b19",
    messagingSenderId: "window.env.66672623217",
    appId: "1:666726232179:web:1d8f5ea641e26a2fc9ba06",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
