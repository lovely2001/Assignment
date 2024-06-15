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

  const usersPerPage = 7;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
      setShowDetails(false);
      fetchUsers();
      alert("Details Saved")
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleCancel = () => {
    setShowDetails(false);
  };


  return (
    <div className="update-profile-container">
      <h1>Profile Details</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => userClick(user)}>
                  {user.email}
                </button>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-user-button" onClick={addUser}>
        Want to add More User Details ? <span style={{fontWeight: "500", color: "#0000FF" , marginLeft: "5px"}}> Click Here  </span>
      </button>

      <ReactModal
        isOpen={showDetails}
        onRequestClose={handleCancel}
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
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentUsers.length < usersPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserForm;
