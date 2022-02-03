import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAabTWUwgcTkOXeWM-NdrxXpW2YV-4AKlA",
  authDomain: "chatty-8ac08.firebaseapp.com",
  projectId: "chatty-8ac08",
  storageBucket: "chatty-8ac08.appspot.com",
  messagingSenderId: "313924004391",
  appId: "1:313924004391:web:c030bf38ff3b8886073c02",
  measurementId: "G-HKLXBBJHPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <SignIn/> } />
        <Route path="/sign-up" element={ <SignUp/> } />
      </Routes>
    </Router>
  );
}

export default App;