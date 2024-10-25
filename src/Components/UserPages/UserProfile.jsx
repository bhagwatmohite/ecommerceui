/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ProfileImage from '../../assets/ProfileImage.jpg';
import useUserr from '../useUserr';
import Wishlist from '../Wishlist';
import AddressInformation from './AdressInformation';
import MyOrders from './MyOrders';
import PersonalInformation from './PersonalInformation';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [activeItem, setActiveItem] = useState(2); // Set default active item to Personal Information
  const { id } = useUserr();

  useEffect(() => {
    fetchUserData();
  }, [id]); // Adding an empty dependency array to fetch user data only once

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/userr/${id}`);
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const renderComponent = () => {
    switch (activeItem) {
      case 0:
        return <MyOrders />;
      case 1:
        return <AddressInformation />;
      case 2:
        return <PersonalInformation userData={userData} />;
      case 3:
        return <Wishlist />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '1200px' }}>
      {userData && (
        <div className="row" style={{ marginTop: '100px', marginBottom: '60px' }}>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body text-center">
                <img
                  src={ProfileImage}
                  alt="User Avatar"
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: '100px', height: '100px' }}
                />
                <h5 className="card-title">{`${userData.fname} ${userData.lname}`}</h5>
              </div>
              <ul className="list-group list-group-flush cursor-pointer" >
                <li
                  className={`list-group-item  ${activeItem === 0 ? 'active' : ''}`}
                  onClick={() => handleItemClick(0)}

                >
                  My Orders
                </li>
                <li
                  className={`list-group-item ${activeItem === 1 ? 'active' : ''}`}
                  onClick={() => handleItemClick(1)}
                >
                  Address Information
                </li>
                <li
                  className={`list-group-item ${activeItem === 2 ? 'active' : ''}`}
                  onClick={() => handleItemClick(2)}
                >
                  Profile Information
                </li>
                <li
                  className={`list-group-item ${activeItem === 3 ? 'active' : ''}`}
                  onClick={() => handleItemClick(3)}
                >
                  wishLIst
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
