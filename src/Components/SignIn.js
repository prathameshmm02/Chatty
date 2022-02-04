import chatImage from "../chatImage.svg";
import google from "../Google.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const signInWithEmailPass = () => {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider);
};

export default function SignIn() {

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
        />
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={signInWithEmailPass}
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
