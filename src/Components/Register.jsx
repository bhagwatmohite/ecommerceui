/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons from lucide-react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [emailExists, setEmailExists] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobno: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [nameError, setNameError] = useState({ fname: '', lname: '' }); // State for name validation errors
  const navigate = useNavigate();

  // General change handler for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    if (name === 'fname') handleNameChange(e, 'fname');
    if (name === 'lname') handleNameChange(e, 'lname');
  };

  // Specific handler for name fields to validate only letters and spaces
  const handleNameChange = (e, type) => {
    const regex = /^[a-zA-Z\s]*$/;
    const { name, value } = e.target;

    if (regex.test(value)) {
      setFormData({ ...formData, [name]: value });
      setNameError({ ...nameError, [type]: '' });
    } else {
      setNameError({ ...nameError, [type]: 'Only letters and spaces are allowed' });
    }
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = 'First Name is required';
    } else if (nameError.fname) {
      newErrors.fname = nameError.fname;
    }
    if (!formData.lname) {
      newErrors.lname = 'Last Name is required';
    } else if (nameError.lname) {
      newErrors.lname = nameError.lname;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.mobno) {
      newErrors.mobno = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobno)) {
      newErrors.mobno = 'Mobile Number must be exactly 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/registeruserr', formData);
        console.log('User registered successfully:', response.data);
        alert("Register Successfully...");
        navigate('/login');
      } catch (error) {
        console.error('Error adding customer:', error);
        if (error.response) {
          if (error.response.status === 400 && error.response.data.includes('already exists')) {
            setEmailExists(true);
            setErrors({ ...errors, email: 'Email already exists' });
            alert('Email already exists');
          }
        } else if (error.request) {
          console.error('Request:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    } else {
      alert("Please fill all required fields correctly");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7 col-xl-6">
            <div className="card mx-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">E-mail</span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter Email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">First Name</span>
                    <input
                      type="text"
                      className={`form-control ${errors.fname || nameError.fname ? 'is-invalid' : ''}`}
                      placeholder="Enter First Name"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                    />
                    {(errors.fname || nameError.fname) && <div className="invalid-feedback">{errors.fname || nameError.fname}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">Last Name</span>
                    <input
                      type="text"
                      className={`form-control ${errors.lname || nameError.lname ? 'is-invalid' : ''}`}
                      placeholder="Enter Last Name"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                    />
                    {(errors.lname || nameError.lname) && <div className="invalid-feedback">{errors.lname || nameError.lname}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">Username</span>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Enter Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">MobNumber</span>
                    <input
                      type="text"
                      className={`form-control ${errors.mobno ? 'is-invalid' : ''}`}
                      placeholder="Enter Mobile Number"
                      name="mobno"
                      value={formData.mobno}
                      onChange={handleChange}
                    />
                    {errors.mobno && <div className="invalid-feedback">{errors.mobno}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">Password</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />} {/* Conditional rendering of Eye and EyeOff icons */}
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">Confirm Password</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Enter Confirm Password"
                      autoComplete="new-password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />} {/* Conditional rendering of Eye and EyeOff icons */}
                    </button>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
