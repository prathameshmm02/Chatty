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

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider);
};

const signUpWithEmailPass = () => {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password);
};

export default function Start() {
  return (
    <div className="container">
      <div>
        <img src={chatImage} className="chat-image" alt="logo" />
      </div>
      <SignIn />
    </div>
  );
}

function SignIn() {
  return (
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
        className="btn btn-primary login"
        onClick={signInWithEmailPass}
      >
        Login
      </button>
      <button type="button" className="btn btn-link">
        Create account
      </button>
      <button
        type="button"
        className="btn btn-primary google-signin"
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
        onClick={signUpWithEmailPass}
      >
        Register
      </button>
      <button type="button" className="btn btn-link">
        Create account
      </button>
    </div>
  );
}
