import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

import MainScreen from "./Components/MainScreen";
import 'firebase/app';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAabTWUwgcTkOXeWM-NdrxXpW2YV-4AKlA",
  authDomain: "chatty-8ac08.firebaseapp.com",
  projectId: "chatty-8ac08",
  storageBucket: "chatty-8ac08.appspot.com",
  messagingSenderId: "313924004391",
  appId: "1:313924004391:web:c030bf38ff3b8886073c02",
  measurementId: "G-HKLXBBJHPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return (
    user ? <MainScreen/> : <SignIn />
  );
}

export default App;