import chatImage from "../assets/ChatImage.svg";
import google from "../assets/Google.svg";
import { useState } from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAlert } from "react-alert";

export default function Start() {
  const [isLoginScreen, setLoginScreen] = useState(true);
  const alert = useAlert();

  const signInWithEmailPass = (e, email, password) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert.show(err.message)
    );
  };

  const signUpWithEmailPass = (e, email, password) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => setLoginScreen(value))
      .catch((err) => alert.show(err.message));
    sendEmailVerification(auth.currentUser).catch((err) =>
      alert.show(err.message)
    );
  };

  const signInWithGoogle = (e) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).catch((err) => alert.show(err.message));
  };

  return (
    <div className="flex flex-col items-center h-screen container md:flex-row ">
      <div>
        <img src={chatImage} className="m-3 w-11/12" alt="logo" />
      </div>
      {isLoginScreen ? <SignIn /> : <SignUp />}
    </div>
  );

  function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="h-2/3 md:w-1/2 w-2/3 flex flex-col justify-around p-4 rounded-2xl hover:shadow-lg hover:shadow-gray-500/30 transition duration-300 bg-slate-200">
        <h1 className="text-center">Chatty</h1>
        <form
          onSubmit={(e) => signInWithEmailPass(e, email, password)}
          className="flex flex-col items-center justify-around gap-y-4"
        >
          <input
            type="text"
            className="form-control"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email).catch((err) =>
              alert.show(err.message)
            );
          }}
        >
          Forgot Password
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="h-2/3 w-1/2 flex flex-col justify-around p-4 rounded-2xl hover:shadow-lg hover:shadow-gray-500/30 transition duration-300 bg-slate-200">
        <h1 className="text-center">Chatty</h1>
        <form
          onSubmit={(e) => signUpWithEmailPass(e, email, password)}
          className="flex flex-col items-center justify-around gap-y-4"
        >
          <input
            type="text"
            className="form-control"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-primary w-full">
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
