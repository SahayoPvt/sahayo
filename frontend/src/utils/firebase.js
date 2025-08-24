import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3JxYI6dganEtyrxc7KOKbAqeizBIQnF4",
  authDomain: "login-43728.firebaseapp.com",
  projectId: "login-43728",
  storageBucket: "login-43728.firebasestorage.app",
  messagingSenderId: "512830318095",
  appId: "1:512830318095:web:56e19fce9221cf3837a57a",
  measurementId: "G-D8WP0R37MS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default app;
