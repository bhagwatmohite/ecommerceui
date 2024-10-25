
// import axios from "axios"; // Import Axios for API calls
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false); // State for loading spinner
//   const navigate = useNavigate();

//   // Handle email submission for OTP
//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show spinner
//     try {
//       // Send a request to the new send OTP API
//       await axios.post("http://localhost:8080/sendOtp", null, { params: { email } });
//       toast.success("Your OTP has been sent successfully!"); // Use Toastify for success message
//       setStep(2); // Move to the OTP step
//     } catch (error) {
//       console.error(error);
//       toast.error("Error sending OTP. Please try again."); // Use Toastify for error message
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   // Handle OTP verification
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show spinner
//     try {
//       // Validate OTP with the new API
//       const response = await axios.post("http://localhost:8080/validateOtp", null, {
//         params: { email, otp },
//       });
//       if (response.status === 200) {
//         toast.success("OTP verified!"); // Use Toastify for success message
//         setStep(3); // Move to the password reset step
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Invalid OTP. Please try again."); // Use Toastify for error message
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   // Handle password reset
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!"); // Use Toastify for error message
//       return;
//     }
//     setLoading(true); // Show spinner
//     try {
//       // Change password with the new API
//       await axios.post("http://localhost:8080/changePassword", null, {
//         params: {
//           email,
//           otp,
//           newPassword: password,
//         },
//       });
//       toast.success("Password successfully updated!"); // Use Toastify for success message
//       navigate("/login"); // Redirect to login
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating password. Please try again."); // Use Toastify for error message
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <div className="container position-relative">
//         <div className="row justify-content-center">
//           <div className="col-md-9 col-lg-7 col-xl-6">
//             <div className="card mx-4">
//               <div className="card-body p-4 position-relative">
//                 {loading && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       backgroundColor: "rgba(255, 255, 255, 0.8)",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       zIndex: 10,
//                     }}
//                   >
//                     <div
//                       className="spinner"
//                       style={{
//                         border: "4px solid rgba(0, 0, 0, 0.1)",
//                         borderRadius: "50%",
//                         width: "36px",
//                         height: "36px",
//                         borderLeftColor: "#09f",
//                         animation: "spin 1s linear infinite",
//                       }}
//                     ></div>
//                   </div>
//                 )}
//                 {step === 1 && (
//                   <form onSubmit={handleEmailSubmit}>
//                     <h1>Forgot Password</h1>
//                     <p className="text-body-secondary">
//                       Enter your email to reset your password
//                     </p>
//                     <div className="mb-3 input-group">
//                       <span className="input-group-text">@</span>
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Email"
//                         autoComplete="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Send OTP
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 {step === 2 && (
//                   <form onSubmit={handleOtpSubmit}>
//                     <h1>Enter OTP</h1>
//                     <p className="text-body-secondary">
//                       We have sent an OTP to your email. Please enter it below:
//                     </p>
//                     <div className="mb-3 input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Verify OTP
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 {step === 3 && (
//                   <form onSubmit={handlePasswordSubmit}>
//                     <h1>Reset Password</h1>
//                     <div className="mb-3">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="New Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Update Password
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 <ToastContainer /> {/* Add ToastContainer here */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

//25.10

// import axios from "axios"; // Import Axios for API calls
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [identifier, setIdentifier] = useState(""); // Can be either email or mobile number
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false); // State for loading spinner
//   const navigate = useNavigate();

//   // Handle identifier submission for OTP (email or mobile)
//   const handleIdentifierSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show spinner
//     try {
//       // Determine whether to send OTP to email or mobile
//       const url = identifier.includes('@') ? "http://localhost:8080/sendOtp" : "http://localhost:8080/sendOtpToMobile";
//       const params = identifier.includes('@') ? { email: identifier } : { mobno: identifier }; // Use appropriate parameter name
//       await axios.post(url, null, { params });
//       toast.success("Your OTP has been sent successfully!");
//       setStep(2); // Move to the OTP step
//     } catch (error) {
//       console.error(error);
//       toast.error("Error sending OTP. Please try again.");
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   // Handle OTP verification
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show spinner
//     try {
//       // Validate OTP with the new API
//       const url = identifier.includes('@') ? "http://localhost:8080/validateOtp" : "http://localhost:8080/validateOtpToMobile";
//       const params = identifier.includes('@') ? { email: identifier, otp } : { mobno: identifier, otp }; // Use appropriate parameter name
//       const response = await axios.post(url, null, { params });
//       if (response.status === 200) {
//         toast.success("OTP verified!");
//         setStep(3); // Move to the password reset step
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   // Handle password reset
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }
//     setLoading(true); // Show spinner
//     try {
//       // Change password with the new API
//       const url = identifier.includes('@') ? "http://localhost:8080/changePassword" : "http://localhost:8080/changePassword";
//       await axios.post(url, null, {
//         params: {
//           identifier,
//           otp,
//           newPassword: password,
//         },
//       });
//       toast.success("Password successfully updated!");
//       navigate("/login"); // Redirect to login
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating password. Please try again.");
//     } finally {
//       setLoading(false); // Hide spinner
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <div className="container position-relative">
//         <div className="row justify-content-center">
//           <div className="col-md-9 col-lg-7 col-xl-6">
//             <div className="card mx-4">
//               <div className="card-body p-4 position-relative">
//                 {loading && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       backgroundColor: "rgba(255, 255, 255, 0.8)",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       zIndex: 10,
//                     }}
//                   >
//                     <div
//                       className="spinner"
//                       style={{
//                         border: "4px solid rgba(0, 0, 0, 0.1)",
//                         borderRadius: "50%",
//                         width: "36px",
//                         height: "36px",
//                         borderLeftColor: "#09f",
//                         animation: "spin 1s linear infinite",
//                       }}
//                     ></div>
//                   </div>
//                 )}
//                 {step === 1 && (
//                   <form onSubmit={handleIdentifierSubmit}>
//                     <h1>Forgot Password</h1>
//                     <p className="text-body-secondary">
//                       Enter your email or mobile number to reset your password
//                     </p>
//                     <div className="mb-3 input-group">
//                       <span className="input-group-text">@</span>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Email or Mobile Number"
//                         value={identifier}
//                         onChange={(e) => setIdentifier(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Send OTP
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 {step === 2 && (
//                   <form onSubmit={handleOtpSubmit}>
//                     <h1>Enter OTP</h1>
//                     <p className="text-body-secondary">
//                       We have sent an OTP to your {identifier.includes('@') ? 'email' : 'mobile number'}. Please enter it below:
//                     </p>
//                     <div className="mb-3 input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Verify OTP
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 {step === 3 && (
//                   <form onSubmit={handlePasswordSubmit}>
//                     <h1>Reset Password</h1>
//                     <div className="mb-3">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="New Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                         disabled={loading} // Disable form when loading
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" disabled={loading}>
//                         Update Password
//                       </button>
//                     </div>
//                   </form>
//                 )}
//                 <ToastContainer /> {/* Add ToastContainer here */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



//implemeting both via email and mobilenumber changing password 
import axios from "axios"; // Import Axios for API calls
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState(""); // Can be either email or mobile number
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  // Handle identifier submission for OTP (email or mobile)
  const handleIdentifierSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      // Determine whether to send OTP to email or mobile
      const url = identifier.includes('@') ? "http://localhost:8080/sendOtp" : "http://localhost:8080/sendOtpToMobile";
      const params = identifier.includes('@') ? { email: identifier } : { mobno: identifier }; // Use appropriate parameter name
      await axios.post(url, null, { params });
      toast.success("Your OTP has been sent successfully!");
      setStep(2); // Move to the OTP step
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    try {
      // Validate OTP with the new API
      const url = identifier.includes('@') ? "http://localhost:8080/validateOtp" : "http://localhost:8080/validateOtpToMobile";
      const params = identifier.includes('@') ? { email: identifier, otp } : { mobno: identifier, otp }; // Use appropriate parameter name
      const response = await axios.post(url, null, { params });
      if (response.status === 200) {
        toast.success("OTP verified!");
        setStep(3); // Move to the password reset step
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Handle password reset
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true); // Show spinner
    try {
      // Determine the URL for changing the password
      const url = identifier.includes('@')
        ? "http://localhost:8080/changePassword"
        : "http://localhost:8080/changePasswordToMobile"; // Use appropriate endpoint

      const params = identifier.includes('@')
        ? { email: identifier, otp, newPassword: password }
        : { mobno: identifier, otp, newPassword: password }; // Send appropriate identifier

      await axios.post(url, null, { params });
      toast.success("Password successfully updated!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error(error);
      toast.error("Error updating password. Please try again.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7 col-xl-6">
            <div className="card mx-4">
              <div className="card-body p-4 position-relative">
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 10,
                    }}
                  >
                    <div
                      className="spinner"
                      style={{
                        border: "4px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        borderLeftColor: "#09f",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                  </div>
                )}
                {step === 1 && (
                  <form onSubmit={handleIdentifierSubmit}>
                    <h1>Forgot Password</h1>
                    <p className="text-body-secondary">
                      Enter your email or mobile number to reset your password
                    </p>
                    <div className="mb-3 input-group">
                      <span className="input-group-text">@</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email or Mobile Number"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        disabled={loading} // Disable form when loading
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        Send OTP
                      </button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form onSubmit={handleOtpSubmit}>
                    <h1>Enter OTP</h1>
                    <p className="text-body-secondary">
                      We have sent an OTP to your {identifier.includes('@') ? 'email' : 'mobile number'}. Please enter it below:
                    </p>
                    <div className="mb-3 input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        disabled={loading} // Disable form when loading
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        Verify OTP
                      </button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <form onSubmit={handlePasswordSubmit}>
                    <h1>Reset Password</h1>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading} // Disable form when loading
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading} // Disable form when loading
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
                <ToastContainer /> {/* Add ToastContainer here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
