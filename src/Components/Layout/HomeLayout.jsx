/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
const HomeLayout = ({ isLoggedIn, onLogout, totalQuantity, onSearch }) => {


  return (
    <>
      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
        {/* Navbar */}
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} totalQuantity={totalQuantity} onSearch={onSearch} />
        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default HomeLayout