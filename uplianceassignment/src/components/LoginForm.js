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

  const formFields = [
    { id: 'email', type: 'email', label: 'Email', value: email, onChange: setEmail },
    { id: 'password', type: 'password', label: 'Password', value: password, onChange: setPassword }
  ];

  return (
    <div className="login-container">
      <div className="login-card-left">
        <p className="welcome-text">
          Welcome to <span className="brand-name">upliance.ai </span>
        </p>
      </div>

      <div className="login-card-right">
        <p className="form-title">Log in</p>
        <form className="login-form" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <label key={field.id} htmlFor={field.id}>
              {field.label}:
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
              />
            </label>
          ))}
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
