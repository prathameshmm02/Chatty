import { Link } from "react-router-dom";
import chatImage from "../chatImage.svg";
import google from "../Google.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

let user;

const signInWithEmailAndPassword = () => {
  const auth = getAuth();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
      console.log(user);
      console.log("Ok");
    })
    .catch((error) => {
      console.log(error.code + error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      user = result.user;
      // ...
    })
    .catch((error) => {
      console.log(error.message);
    });
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
          aria-label="E-Mail"
        />
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Passwrd"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={signInWithEmailAndPassword}
        >
          Login
        </button>
        <Link to="/sign-up" className="btn btn-link">
          <button type="button" className="btn btn-link">
            Create account
          </button>
        </Link>
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
