import React from "react";
import chatImage from "../chatImage.svg";
import google from "../Google.svg";
import { useState } from "react";
import { useAlert } from "react-alert";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const signInWithEmailPass = (e) => {
  e.preventDefault();
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (error) {}
};

const signUpWithEmailPass = (e) => {
  e.preventDefault();
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = (e) => {
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
      <div className="content flex flex-col justify-around p-4 rounded-2xl hover:shadow-lg hover:shadow-gray-500/30 transition duration-300 bg-slate-200">
        <h1 className="text-center">Chatty</h1>
        <form
          onSubmit={signInWithEmailPass}
          className="flex flex-col items-center justify-around gap-y-4"
        >
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
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
          className="flex flex-row border-accent border-2 rounded-md p-2 hover:bg-accent hover:text-white w-fit self-center"
          onClick={signInWithGoogle}
        >
          <img className="mr-2" src={google} alt="" />
          Sign in with Google
        </button>
      </div>
    );
  }

  function SignUp() {
    return (
      <div className="content flex flex-col justify-around p-4 rounded-2xl hover:shadow-lg hover:shadow-gray-500/30 transition duration-300 bg-slate-200">
        <h1 className="text-center">Chatty</h1>
        <form
          onSubmit={signInWithGoogle}
          className="flex flex-col items-center justify-around gap-y-4"
        >
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
            className="btn btn-primary w-full"
            onClick={signUpWithEmailPass}
          >
            Register
          </button>
        </form>
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
          className="flex flex-row border-accent border-2 rounded-md p-2 hover:bg-accent hover:text-white w-fit self-center"
          onClick={signInWithGoogle}
        >
          <img className="mr-2" src={google} alt="" />
          Register with Google
        </button>
      </div>
    );
  }
}
