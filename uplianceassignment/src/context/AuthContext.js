import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/updateprofile');
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const signup = async (firstName, lastName, email, phone, gender, dob, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const newProfile = { firstName, lastName, email, phone, gender, dob };

      await fetch("https://form-assignment-70397-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
      });

      setUser(newProfile);
      navigate('/profile'); 
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
