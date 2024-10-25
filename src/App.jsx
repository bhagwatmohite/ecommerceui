
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BuyProducts from './Components/BuyProducts';
import Cart from './Components/Cart'; // Import the Cart component
import CategoryWiseProducts from './Components/CategoryWiseProducts';
import ErrorPage from './Components/ErrorPage';
import ForgotPassword from './Components/ForgotPassword';
import Home from './Components/Home';
import HomeLayout from './Components/Layout/HomeLayout';
import Login from './Components/Login';
import PrivateRoutes from './Components/PrivateRoutes';
import ProductDetail from './Components/ProductDetail';
import Register from './Components/Register';
import UserProfile from './Components/UserPages/UserProfile';
import Wishlist from './Components/Wishlist';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleUpdateCartQuantity = (quantity) => {
    setTotalItemsInCart(quantity);
  };


  // useEffect(() => {
  //   // Check local storage for login status on initial render
  //   const storedLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (storedLoggedIn === "true") {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem("isLoggedIn", true);

  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem("isLoggedIn", false);
  //   localStorage.removeItem("email");
  // };


  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const logoutTime = localStorage.getItem("logoutTime");

    if (storedLoggedIn === "true") {
      const now = Date.now();

      if (logoutTime && now < logoutTime) {
        setIsLoggedIn(true);

        const remainingTime = logoutTime - now;

        // Set a timeout for automatic logout
        const logoutTimer = setTimeout(() => {
          handleLogout();
        }, remainingTime);

        // Cleanup the timer on component unmount or re-render
        return () => clearTimeout(logoutTimer);
      } else {
        handleLogout(); // If the logout time has passed, log out
      }
    }
  }, []);

  const handleLogin = () => {
    const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    const logoutTime = Date.now() + twelveHours;

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("logoutTime", logoutTime.toString());

    // Set a timeout for automatic logout
    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, twelveHours);

    // Store the timer ID in localStorage (Note: this is not generally a good practice; you can handle it differently if needed)
    localStorage.setItem("logoutTimer", logoutTimer.toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("logoutTime");

    const timerId = localStorage.getItem("logoutTimer");
    if (timerId) {
      clearTimeout(parseInt(timerId, 10)); // Clear the timeout using the stored ID
      localStorage.removeItem("logoutTimer");
    }
  };


  return (
    <Router>
      <div>
        <Routes>
          <Route element={<HomeLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} totalQuantity={totalItemsInCart} onSearch={handleSearch} />}>
            <Route path="/" element={<Home childProp={searchQuery} />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/login" element={<Login isLoggedIn onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/category/:categoryId" element={<CategoryWiseProducts />} />
            <Route path="/productdetails/:id" element={<ProductDetail setCartItems={setCartItems} />} />

            {/* <Route path="/reports" element={<PrivateRoutes isLoggedIn={isLoggedIn}><Reports /></PrivateRoutes>} /> */}

            <Route path="/cart" element={<PrivateRoutes path="/cart" isLoggedIn={isLoggedIn}><Cart cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} totalQuantity={totalItemsInCart} /></PrivateRoutes>} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/buyproducts" element={<BuyProducts />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

