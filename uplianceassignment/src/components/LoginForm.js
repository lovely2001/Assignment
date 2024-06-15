import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import "../Styles/LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card-left">
        <p className="welcome-text">
          Welcome to <span className="brand-name">upliance..</span>
        </p>
      </div>


      <div className="login-card-right">
        <p className="form-title">Log in</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
          <p className="register-link">
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
