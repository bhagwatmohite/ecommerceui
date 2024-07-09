/* eslint-disable react/prop-types */
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons from lucide-react
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/userr/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.text(); // Get response as text
      if (response.ok) {
        if (responseData === 'Logged in successfully') {

          sessionStorage.setItem('user', JSON.stringify(responseData));
          localStorage.setItem('user', JSON.stringify(responseData));
          onLogin();
          navigate('/');
        } else {
          setError('Login failed');
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    localStorage.setItem('email', value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <div className="container">
          <div className="row">
            {/* Login Card */}
            <div className="col-md-6">
              <div className="card bg-body-tertiary">
                <div className="card-body">
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <div className="mb-3 input-group">
                    <span className="input-group-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 0a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V4a4 4 0 0 1 4-4zm0 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 2a6 6 0 0 1-6 6v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1a6 6 0 0 1-6-6z" />
                      </svg>
                    </span>
                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} autoComplete="email" />
                  </div>
                  <div className="mb-3 input-group">
                    <span className="input-group-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 0a4 4 0 0 1 4 4v2H4V4a4 4 0 0 1 4-4zm3 6H5v1h6V6z" />
                        <path d="M4 6v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6H4z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="row">
                    <div className="col-6">
                      <button type="button" className="btn btn-primary px-4" onClick={handleLogin}>
                        Login
                      </button>
                    </div>
                    <div className="col-6 text-end">
                      <Link type="button" className="btn btn-link px-0" to="/forgotpassword">Forgot password?</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Signup Card */}
            <div className="col-md-6">
              <div className="card bg-primary text-white py-5">
                <div className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      If you have not registered yet, you must register before login. Go to the register page and press the button below:
                    </p>
                    <Link type="button" className="btn btn-primary mt-3" tabIndex={-1} to="/signup">Register Now!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
