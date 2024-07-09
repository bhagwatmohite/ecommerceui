/* eslint-disable no-unused-vars */

// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import CategoryWiseProducts from './Components/CategoryWiseProducts';
// import ErrorPage from './Components/ErrorPage';
// import ForgotPassword from './Components/ForgotPassword';
// import Home from './Components/Home';
// import HomeLayout from './Components/Layout/HomeLayout';
// import Login from './Components/Login';
// import ProductDetail from './Components/ProductDetail';
// import Register from './Components/Register';

// function App() {
//   return (
//     <Router>
//       <div>

//         <Routes>

//           <Route element={<HomeLayout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Register />} />
//             <Route path="/forgotpassword" element={<ForgotPassword />} />
//             <Route path="/category/:categoryId" element={<CategoryWiseProducts />} />

//             <Route path="/productdetails/:id" element={<ProductDetail />} />
//             {/* Define more routes as needed */}
//             <Route path="*" element={<ErrorPage />} />
//           </Route>
//         </Routes>
//         {/* <ProductDetail /> */}
//       </div>
//     </Router>
//   );
// }

// export default App;





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


  useEffect(() => {
    // Check local storage for login status on initial render
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("email");
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

            <Route path="/cart" element={<PrivateRoutes path="/cart" isLoggedIn={isLoggedIn}><Cart cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} /></PrivateRoutes>} />
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

