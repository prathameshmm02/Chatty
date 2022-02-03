import "./SignIn.css";
import chatImage from './chatImage.svg';

function SignIn() {
  return (
    <div className="container">
      <img src={chatImage} className="chat-image" alt="logo" />
      <div className="content">
        <h1 className="title">Chatty</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Passwrd"
        />
        <button type="button" className="btn btn-primary">
          Login
        </button>
        <button type="button" className="btn btn-link">Create account</button>
      </div>
    </div>
  );
}

export default SignIn;
