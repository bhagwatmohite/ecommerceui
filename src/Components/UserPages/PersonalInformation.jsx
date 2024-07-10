/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const PersonalInformation = ({ userData }) => {
  // State to manage editable values and errors
  const [editableUserData, setEditableUserData] = useState(userData);
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditableUserData({
      ...editableUserData,
      [id]: value,
    });
  };

  // Function to handle input validation for first name and last name
  const handleNameInput = (e) => {
    const { id, value } = e.target;
    // Validate that the input does not contain numbers
    if (/^\d+$/.test(value)) {
      // If the input contains numbers, prevent updating state
      return;
    }
    // Update the state with valid input
    setEditableUserData({
      ...editableUserData,
      [id]: value,
    });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression to check if the email ends with @gmail.com
    return /^[^\s@]+@gmail\.com$/.test(email);
  };

  // Function to handle save/update
  const handleSave = async () => {
    let formIsValid = true;
    const errors = {};

    // Validate email format
    if (!validateEmail(editableUserData.email)) {
      errors.email = "Please enter a valid email address ending with @gmail.com.";
      formIsValid = false;
    }

    // Validate first name (should not contain numbers)
    if (!/^[a-zA-Z]+$/.test(editableUserData.fname)) {
      errors.fname = "First name should only contain alphabetic characters.";
      formIsValid = false;
    }

    // Validate last name (should not contain numbers)
    if (!/^[a-zA-Z]+$/.test(editableUserData.lname)) {
      errors.lname = "Last name should only contain alphabetic characters.";
      formIsValid = false;
    }

    // Validate mobile number (should be exactly 10 digits)
    if (editableUserData.mobno && editableUserData.mobno.length !== 10) {
      errors.mobno = "Mobile number must be exactly 10 digits.";
      formIsValid = false;
    }

    // Set errors state
    setErrors(errors);

    // If form is valid, proceed with save/update
    if (formIsValid) {
      try {
        const response = await axios.put(`http://13.201.255.228:8080/userr/${userData.id}`, editableUserData);
        console.log('Profile updated successfully:', response.data);
        alert("Profile updated successfully");
        // Optionally, you can show a success message or update UI state upon successful update
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error scenarios based on your application's needs
      }
    }
  };

  return (
    <div>
      <h5 className="card-title">Personal Information</h5>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={editableUserData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              value={editableUserData.fname}
              onChange={handleNameInput} // Use handleNameInput for first name
            />
            {errors.fname && <div className="text-danger">{errors.fname}</div>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={editableUserData.lname}
              onChange={handleNameInput} // Use handleNameInput for last name
            />
            {errors.lname && <div className="text-danger">{errors.lname}</div>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={editableUserData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mobno">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobno"
              value={editableUserData.mobno}
              onChange={handleInputChange}
            />
            {errors.mobno && <div className="text-danger">{errors.mobno}</div>}
          </div>
        </div>
        <br />
        <button
          type="button"
          className="btn btn-primary px-4"
          onClick={handleSave}
          style={{ marginLeft: '150px' }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
