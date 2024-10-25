/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { Container, Form, FormControl, InputGroup, Nav, Navbar } from 'react-bootstrap';
// import { BiSearch } from 'react-icons/bi';
// import { CgProfile } from "react-icons/cg";
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo1.png';
// import useUserr from './useUserr';

// const Header = ({ isLoggedIn, onLogout, onSearch, totalQuantity }) => {
//   const { fname } = useUserr();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleHome = () => {
//     navigate('/');
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   return (
//     <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//       <Navbar.Brand onClick={handleHome} >
//         <Container className="d-flex align-items-center">
//           <img style={{ cursor: 'pointer' }} src={logo} alt="Logo" height="30" className="d-inline-block align-top mr-2" />
//         </Container>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Form inline className="mx-auto" onSubmit={handleSearchSubmit}>
//           <InputGroup className="mr-sm-2" style={{ width: '500px', flexWrap: 'nowrap' }}>
//             <InputGroup.Text><BiSearch /></InputGroup.Text>
//             <FormControl
//               type="text"
//               placeholder="Search for products, brands and more"
//               aria-label="Search"
//               aria-describedby="search-icon"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </InputGroup>
//         </Form>
//         <Nav style={{ marginRight: '100px', color: 'white' }}>
//           <Nav.Link onClick={handleHome} style={{ color: 'white' }}>Home</Nav.Link>
//           {isLoggedIn && (
//             <>
//               <Nav.Link as={Link} to="/userprofile" style={{ color: 'white', textDecoration: 'none' }} >
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '2px 6px 2px 6px',
//                   borderRadius: '10px',
//                   border: '1px solid #ccc',
//                 }}>
//                   <CgProfile style={{ width: '25px', height: '25px', marginRight: '7px' }} />
//                   <span>{fname.charAt(0).toUpperCase() + fname.slice(1)}</span>
//                 </div>
//               </Nav.Link>
//               <Nav.Link onClick={onLogout} style={{ color: 'white' }}>Logout</Nav.Link>
//               <Nav.Link href="#cart" style={{ color: 'white', position: 'relative' }} as={Link} to="/cart">
//                 <FaShoppingCart style={{ marginRight: '5px' }} size={20} />
//                 {totalQuantity > 0 && (
//                   <span style={{
//                     position: 'absolute',
//                     top: '-5px',
//                     right: '-10px',
//                     backgroundColor: 'red',
//                     color: 'white',
//                     borderRadius: '50%',
//                     padding: '2px 6px',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                   }}>
//                     {totalQuantity}
//                   </span>
//                 )}
//                 Cart
//               </Nav.Link>
//             </>
//           )}
//           {!isLoggedIn && (
//             <Nav.Link onClick={handleLogin} style={{ color: 'white' }}>Login</Nav.Link>
//           )}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Header;



//23.10

// import { useState } from 'react';
// import { Container, Form, FormControl, InputGroup, Nav, Navbar } from 'react-bootstrap';
// import { BiSearch } from 'react-icons/bi';
// import { CgProfile } from "react-icons/cg";
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
// import logo from '../assets/logo1.png';
// import useUserr from './useUserr'; // Assuming this is a custom hook for user info


// const Header = ({ isLoggedIn, onLogout, onSearch, totalQuantity }) => {
//   const { fname } = useUserr(); // Assuming useUserr fetches user info
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   // console.log("search", onSearch)

//   const handleHome = () => {
//     navigate('/');
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogout = () => {
//     onLogout();
//     toast.success('Logout successful!'); // Show success toast
//     navigate('/'); // Redirect to home page on logout
//   };

//   const handleHome1 = () => {

//     navigate('/'); // Redirect to login page on logout
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery.trim()); // Trim search query and invoke onSearch callback
//     // console.log("Submitting search query:", searchQuery.trim());
//   };

//   return (
//     <>
//       <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//         <Navbar.Brand onClick={handleHome}>
//           <Container className="d-flex align-items-center">
//             <img style={{ cursor: 'pointer' }} src={logo} alt="Logo" height="30" className="d-inline-block align-top mr-2" onClick={handleHome1} />
//           </Container>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Form inline className="mx-auto" onSubmit={handleSearchSubmit} >
//             <InputGroup className="mr-sm-2" style={{ width: '500px', flexWrap: 'nowrap' }}>
//               <InputGroup.Text><BiSearch /></InputGroup.Text>
//               <FormControl
//                 type="text"
//                 placeholder="Search for products name, brands and more"
//                 aria-label="Search"
//                 aria-describedby="search-icon"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </InputGroup>
//           </Form>
//           <Nav style={{ marginRight: '100px', color: 'white' }}>
//             <Nav.Link onClick={handleHome} style={{ color: 'white' }}>Home</Nav.Link>
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link as={Link} to="/userprofile" style={{ color: 'white', textDecoration: 'none' }} >
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '2px 6px 2px 6px',
//                     borderRadius: '10px',
//                     border: '1px solid #ccc',
//                   }}>
//                     <CgProfile style={{ width: '25px', height: '25px', marginRight: '7px' }} />
//                     <span>{fname.charAt(0).toUpperCase() + fname.slice(1)}</span>
//                   </div>

//                 </Nav.Link>
//                 <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Logout</Nav.Link>
//                 <Nav.Link href="#cart" style={{ color: 'white', position: 'relative' }} as={Link} to="/cart">
//                   <FaShoppingCart style={{ marginRight: '5px' }} size={20} />
//                   {totalQuantity > 0 && (
//                     <span style={{
//                       position: 'absolute',
//                       top: '-5px',
//                       right: '-10px',
//                       backgroundColor: 'red',
//                       color: 'white',
//                       borderRadius: '50%',
//                       padding: '2px 6px',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                     }}>
//                       {totalQuantity}
//                     </span>
//                   )}
//                   Cart
//                 </Nav.Link>
//               </>
//             ) : (
//               <Nav.Link onClick={handleLogin} style={{ color: 'white' }}>Login</Nav.Link>
//             )}
//           </Nav>

//         </Navbar.Collapse>
//       </Navbar>
//       <ToastContainer />
//     </>

//   );
// };

// export default Header;


import { useState } from 'react';
import { Container, Form, FormControl, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import logo from '../assets/logo1.png';
import useUserr from './useUserr'; // Assuming this is a custom hook for user info

const Header = ({ isLoggedIn, onLogout, onSearch, totalQuantity }) => {
  const { fname } = useUserr(); // Assuming useUserr fetches user info
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    onLogout();
    toast.success('Logout successful!'); // Show success toast
    navigate('/'); // Redirect to home page on logout
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); // Trim search query and invoke onSearch callback
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Navbar.Brand onClick={handleHome}>
          <Container className="d-flex align-items-center">
            <img style={{ cursor: 'pointer' }} src={logo} alt="Logo" height="30" className="d-inline-block align-top mr-2" />
          </Container>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mx-auto" onSubmit={handleSearchSubmit}>
            <InputGroup className="mr-sm-2" style={{ width: '500px', flexWrap: 'nowrap' }}>
              <InputGroup.Text><BiSearch /></InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search for products name, brands and more"
                aria-label="Search"
                aria-describedby="search-icon"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Form>
          <Nav style={{ marginRight: '100px', color: 'white' }}>
            <Nav.Link onClick={handleHome} style={{ color: 'white' }}>Home</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/userprofile" style={{ color: 'white', textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                  }}>
                    <CgProfile style={{ width: '25px', height: '25px', marginRight: '7px' }} />
                    <span>{fname.charAt(0).toUpperCase() + fname.slice(1)}</span>
                  </div>
                </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Logout</Nav.Link>
                <Nav.Link href="#cart" style={{ color: 'white', position: 'relative' }} as={Link} to="/cart">
                  <FaShoppingCart style={{ marginRight: '5px' }} size={20} />
                  {totalQuantity > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-10px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}>
                      {totalQuantity}
                    </span>
                  )}
                  Cart
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogin} style={{ color: 'white' }}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer /> {/* Include ToastContainer for toasts */}
    </>
  );
};

export default Header;
