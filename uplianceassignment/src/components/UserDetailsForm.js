import React from "react";

const UserDetailsForm = ({
  selectedUser,
  handleInputChange,
  handleSaveChanges,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    handleSaveChanges();
  };

  return (
    <div>
      <h3>User Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email" 
            name="email"
            value={selectedUser.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={selectedUser.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={selectedUser.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={selectedUser.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={selectedUser.gender}
            onChange={handleInputChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel" 
            name="phone"
            value={selectedUser.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="save-changes-button"
          type="submit" 
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
