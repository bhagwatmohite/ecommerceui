/* eslint-disable react/no-unescaped-entities */

import ElectronicsImage from '../assets/Electronic1.jpg';
import fashionImage from '../assets/fashion1.jpg';
const Advertisement = () => {
  return (
    <div className="container" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>


      {/* Fashion Section */}
      <div className="row">
        {/* Image on the Left Side */}
        <div className="col-md-6">
          <img
            src={fashionImage}
            alt="Fashion Products"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Text on the Right Side */}
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h2 style={{ fontWeight: 'bold', color: '#343a40' }}>Exclusive Fashion Collection!</h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              Discover the latest trends in fashion, including stylish outfits, accessories, and more.
              Shop our premium collections and revamp your wardrobe!
            </p>
            <ul style={{ color: '#e83e8c', listStyleType: 'none', padding: 0, fontSize: '1.1rem', marginTop: '15px' }}>
              <li style={{ marginBottom: '10px' }}>✔ Summer Dresses starting from 49₹</li>
              <li style={{ marginBottom: '10px' }}>✔ Men's Formal Wear with 25% off</li>
              <li>✔ Free shipping on fashion orders above 300₹</li>
            </ul>
            {/* <button
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                marginTop: '15px',
                cursor: 'pointer'
              }}
            >
              Explore Now
            </button> */}
          </div>
        </div>
      </div>

      {/* Electronics Section */}
      <div className="row" style={{ marginBottom: '40px' }}>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h2 style={{ fontWeight: 'bold', color: '#343a40' }}>Best Deals on Electronics!</h2>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              Upgrade your tech game with top-rated products like laptops, smartphones, and accessories.
              Hurry, shop now and enjoy amazing discounts on our best-selling gadgets!
            </p>
            <ul style={{ color: '#28a745', listStyleType: 'none', padding: 0, fontSize: '1.1rem', marginTop: '15px' }}>
              <li style={{ marginBottom: '10px' }}>✔ Laptops starting from 29,999₹</li>
              <li style={{ marginBottom: '10px' }}>✔ Smartphones with 30% off</li>
              <li>✔ Free shipping on orders above 500₹</li>
            </ul>
            {/* <button
              style={{
                backgroundColor: '#ff5722',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                marginTop: '15px',
                cursor: 'pointer'
              }}
            >
              Shop Now
            </button> */}
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={ElectronicsImage}
            alt="Top Products"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>
      </div>



    </div>
  );
};

export default Advertisement;
