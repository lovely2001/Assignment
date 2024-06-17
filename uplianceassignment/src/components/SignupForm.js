import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { signup } = useAuth();

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
      await signup(firstName, lastName, email, phone, gender, dob, password);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const inputFields = [
    [
      { name: 'firstName', type: 'text', placeholder: 'First Name' },
      { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    ],
    [
      { name: 'email', type: 'email', placeholder: 'Email Id' },
      { name: 'gender', type: 'select', placeholder: 'Gender' },
    ],
    [
      { name: 'phone', type: 'tel', placeholder: 'Phone Number' },
      { name: 'dob', type: 'date', placeholder: 'Date of Birth' },
    ],
    [
      { name: 'password', type: 'password', placeholder: 'Password' },
      { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
    ],
  ];

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
          {inputFields.map((row, rowIndex) => (
            <div className="signup-row" key={rowIndex}>
              {row.map((field, fieldIndex) => (
                field.type !== 'select' ? (
                  <input
                    key={fieldIndex}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                  />
                ) : (
                  <select
                    key={fieldIndex}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{field.placeholder}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )
              ))}
            </div>
          ))}

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
