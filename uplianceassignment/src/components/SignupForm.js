import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import '../Styles/SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, gender, dob, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const newProfile = { firstName, lastName, email, phone, gender, dob };

      await fetch("https://form-assignment-70397-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      });

      setUserProfile(newProfile);
      setRedirectToProfile(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (redirectToProfile && userProfile) {
    return <Navigate to="/profile" state={{ userProfile }} />;
  }

  return (
    <div className="signup-container">
      <div className="signup-card-left">
        <p className="signup-welcome-text">
          Welcome to <span className="signup-brand-name">upliance</span>
        </p>
      </div>
      <div className="signup-card-right">
        <p className="signup-form-title">Sign Up</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
            />
          </div>
          <div className="signup-row">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Id"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="signup-row">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-row">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit">SIGN UP</button>
          
          {error && <p className="signup-error-message">{error}</p>}
          <p className="signup-login-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
