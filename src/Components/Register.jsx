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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = 'First Name is required';
    }
    if (!formData.lname) {
      newErrors.lname = 'Last Name is required';
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
          // Example: Check if email already exists based on error response
          if (error.response.status === 400 && error.response.data.includes('already exists')) {
            setEmailExists(true);
            setErrors({ ...errors, email: 'Email already exists' });
            alert('Email already exists');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error:', error.message);
        }
      }
    } else {
      alert("Please fill all required fields correctly");
    }
  };

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
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">FN</span>
                    <input
                      type="text"
                      className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                      placeholder="First Name"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                    />
                    {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">LN</span>
                    <input
                      type="text"
                      className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                      placeholder="Last Name"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                    />
                    {errors.lname && <div className="invalid-feedback">{errors.lname}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">U</span>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">#</span>
                    <input
                      type="text"
                      className={`form-control ${errors.mobno ? 'is-invalid' : ''}`}
                      placeholder="Mobile Number"
                      name="mobno"
                      value={formData.mobno}
                      onChange={handleChange}
                    />
                    {errors.mobno && <div className="invalid-feedback">{errors.mobno}</div>}
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text">*</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
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
                    <span className="input-group-text">*</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Confirm Password"
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
