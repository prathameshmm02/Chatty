import React from "react";
import chatImage from "../chatImage.svg";
import google from "../Google.svg";
import { useState } from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const signInWithEmailPass = () => {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password);
};

const signUpWithEmailPass = () => {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider);
};

export default function Start() {
  const [isLoginScreen, setLoginScreen] = useState(true);

  return (
    <div className="flex flex-col items-center h-screen container md:flex-row">
      <div>
        <img src={chatImage} className="start-image" alt="logo" />
      </div>
      {isLoginScreen ? <SignIn /> : <SignUp />}
    </div>
  );

  function SignIn() {
    return (
      <div className="content flex flex-col items-center justify-around content-center p-4 rounded-2xl shadow-lg   bg-slate-200">
        <h1 className="text-center">Chatty</h1>
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
          className="btn btn-primary submit"
          onClick={signInWithEmailPass}
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={(e) => {
            setLoginScreen(false);
          }}
        >
          Create account
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={signInWithGoogle}
        >
          <img className="google-logo" src={google} alt="" />
          Sign in with Google
        </button>
      </div>
    );
  }

  function SignUp() {
    return (
      <div className="content">
        <h1 className="text-center">Chatty</h1>
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
          className="btn btn-primary submit"
          onClick={signUpWithEmailPass}
        >
          Register
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={(e) => {
            setLoginScreen(true);
          }}
        >
          Login instead
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={signInWithGoogle}
        >
          <img className="google-logo" src={google} alt="" />
          Register with Google
        </button>
      </div>
    );
  }
}
