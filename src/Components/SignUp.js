export default function SignUp() {
  return (
    <div className="container">
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
        <button type="button" className="btn btn-primary">
          Register
        </button>
        <button type="button" className="btn btn-primary">
          Register with Google
        </button>
      </div>
    </div>
  );
}
