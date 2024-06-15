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

  const formFields = [
    { label: "Email:", type: "email", name: "email" },
    { label: "First Name:", type: "text", name: "firstName" },
    { label: "Last Name:", type: "text", name: "lastName" },
    { label: "Date of Birth:", type: "date", name: "dob" },
    { label: "Phone:", type: "tel", name: "phone" },
    { label: "Gender:", type: "select", name: "gender" },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={selectedUser[field.name]}
                onChange={handleInputChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={selectedUser[field.name]}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
        ))}

        <button className="save-changes-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
