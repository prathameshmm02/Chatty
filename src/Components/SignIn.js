import chatImage from "../chatImage.svg";
import google from "../Google.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

const signInWithEmailAndPassword = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider);
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <div>
        <img src={chatImage} className="chat-image" alt="logo" />
      </div>
      <div className="content">
        <h1 className="title">Chatty</h1>
        <input
          id="email"
          type="text"
          className="form-control"
          placeholder="E-Mail"
          aria-label="E-Mail"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Passwrd"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button type="button" className="btn btn-link">
          Create account
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={signInWithGoogle}
        >
          <img src={google} alt="" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
