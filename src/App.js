import "./App.css";

import MainScreen from "./Components/MainScreen";
import "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Start from "./Components/Start";

const firebaseConfig = {
  apiKey: "AIzaSyCyFLNN1H6jLMQH8Ld004LXL6p06lbjIAA",
  authDomain: "chatty-f3c4a.firebaseapp.com",
  projectId: "chatty-f3c4a",
  storageBucket: "chatty-f3c4a.appspot.com",
  messagingSenderId: "996566643806",
  appId: "1:996566643806:web:b581ffa8184811c19a30cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return user ? <MainScreen /> : <Start />;
}

export default App;
