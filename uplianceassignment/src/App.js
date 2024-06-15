import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import UpdateProfile from "./components/UpdateProfile";
import Topbar from "./components/Topbar";
import ToDo from "./components/ToDoList";

function App() {
  const { user } = useAuth();
  console.log(user);

  return (
    <AuthProvider>
      {user && <Topbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/updateprofile" /> : <SignupForm />} />
        <Route path="/login" element={user ? <Navigate to="/updateprofile" /> : <LoginForm />} />
        <Route path="/updateprofile" element={user ? <UpdateProfile /> : <Navigate to="/login" />} />
        <Route path="/todolist" element={user ? <ToDo /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
