import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, update, push, set } from "firebase/database";
import { db } from "../firebase";
import UserDetailsForm from "./UserDetailsForm";
import ReactModal from "react-modal";
import "../Styles/UpdateProfile.css";

ReactModal.setAppElement("#root");

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    uid: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const snapshot = await get(ref(db, "users"));
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userClick = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const addUser = () => {
    setSelectedUser({
      email: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone: "",
      uid: "",
    });
    setShowDetails(true);
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const usersRef = ref(db, "users");
      const userRef = selectedUser.uid
        ? ref(usersRef, selectedUser.uid)
        : push(usersRef);
      await set(userRef, selectedUser);
      console.log(
        selectedUser.uid
          ? "User details updated successfully!"
          : "New user added successfully!"
      );
      setShowDetails(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleCancel = () => {
    setShowDetails(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="update-profile-container">
      <h1>Profile Details</h1>
      <ul className="user-list">
        {currentUsers.map((user, index) => (
          <li key={index}>
            <button
              className="user-email-button"
              onClick={() => userClick(user)}
            >
              {user.email}
            </button>
          </li>
        ))}
      </ul>
      <button className="add-user-button" onClick={addUser}>
        {showDetails ? "Cancel Add User" : "Add User"}
      </button>
      <ReactModal
        isOpen={showDetails}
        onRequestClose={handleCancel}
        contentLabel="User Details"
        className="modal"
        overlayClassName="overlay"
      >
        <UserDetailsForm
          selectedUser={selectedUser}
          handleInputChange={inputChange}
          handleSaveChanges={saveChanges}
        />
      </ReactModal>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{color : "524e94"}}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentUsers.length < usersPerPage}
          style={{color : "524e94"}}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserForm;
