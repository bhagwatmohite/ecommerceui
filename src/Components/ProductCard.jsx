// /* eslint-disable react/prop-types */
// import axios from 'axios'; // Import axios for HTTP requests
// import { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons
// import { useNavigate } from 'react-router-dom';
// import './ProductCard.css'; // Custom CSS file for styling

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const [hover, setHover] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false); // State to check if the product is wishlisted
//   const [percentage, setPercentage] = useState(0); // State to store the percentage

//   useEffect(() => {
//     const fetchCharges = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/all");
//         if (response.data.length > 0) {
//           const firstCharge = response.data[0];
//           setPercentage(firstCharge.percentage);
//         }
//       } catch (error) {
//         console.error('Error fetching charges:', error);
//       }
//     };

//     fetchCharges();
//   }, []);

//   const handleCardClick = () => {
//     navigate(`/productdetails/${product.id}`);
//   };

//   const handleWishlistClick = async () => {
//     try {
//       // API call to add the product to the wishlist
//       await fetch(`http://localhost:8080/wishlist`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ productId: product.id }),
//       });
//       setIsWishlisted(true); // Update the state to show the product is wishlisted
//     } catch (error) {
//       console.error('Error adding product to wishlist:', error);
//     }
//   };

//   const cardStyles = {
//     width: '288px', // Fixed width
//     height: '407px', // Fixed height
//     boxShadow: hover ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
//     transform: hover ? 'translateY(-5px)' : 'translateY(0)',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     cursor: 'pointer',
//     position: 'relative',
//   };

//   const imageContainerStyles = {
//     position: 'relative',
//     paddingBottom: '100%',
//     overflow: 'hidden',
//   };

//   const imageStyles = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//   };

//   const titleStyles = {
//     fontSize: '16px',
//     lineHeight: '1.4',
//     fontWeight: 'bold',
//   };

//   const textStyles = {
//     fontSize: '14px',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//   };

//   const discountColor = {
//     color: 'green',
//     marginLeft: '0.5rem',
//   };

//   const wishlistIconStyles = {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     fontSize: '24px',
//     color: isWishlisted ? 'red' : 'gray',
//     cursor: 'pointer',
//   };

//   // const calculateDiscount = (originalPrice, discountedPrice) => {
//   //   const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
//   //   return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
//   // };

//   // const calculateNewSellPrice = () => {
//   //   if (!isNaN(parseFloat(percentage))) {
//   //     const newPrice = parseFloat(product.sellprice) * (1 + parseFloat(percentage) / 100);
//   //     return newPrice.toFixed(2);
//   //   }
//   //   return product.sellprice;
//   // };

//   const calculateDiscount = (originalPrice, discountedPrice) => {
//     const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
//     return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
//   };

//   const calculateNewSellPrice = () => {
//     if (percentage === 0 || isNaN(parseFloat(percentage))) {
//       return product.sellprice; // Return original sell price if percentage is not fetched or invalid
//     }

//     const newPrice = parseFloat(product.sellprice) * (1 + parseFloat(percentage) / 100);
//     return newPrice.toFixed(2); // Return new sell price rounded to 2 decimal places
//   };

//   return (
//     <Card
//       className="m-2 border-0"
//       style={cardStyles}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div style={imageContainerStyles} onClick={handleCardClick}>
//         <Card.Img
//           variant="top"
//           src={`http://localhost:8080/uploads/${product.imageUrl}`}
//           alt={product.name}
//           style={imageStyles}
//         />
//       </div>
//       <AiOutlineHeart
//         style={wishlistIconStyles}
//         onClick={handleWishlistClick}
//         className="wishlist-icon"
//       />
//       <Card.Body className="p-2">
//         <Card.Title className="mb-1" style={titleStyles}>{product.name}</Card.Title>
//         <Card.Text className="text-muted" style={textStyles}>
//           <span style={{ fontWeight: '500' }}>{product.brandname}</span> <br />
//           {product.description}
//         </Card.Text>
//         <h6 style={{ margin: '0.5rem 0' }}>
//           ₹{calculateNewSellPrice()} <span className='price' style={{ textDecoration: 'line-through', fontWeight: '300' }}>₹{product.price}</span>
//           <span className='off-color' style={discountColor}>{calculateDiscount(product.price, calculateNewSellPrice())}% off</span>
//         </h6>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductCard;

/* eslint-disable react/prop-types */
import axios from 'axios'; // Import axios for HTTP requests
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Custom CSS file for styling
import useUserr from './useUserr';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false); // State to check if the product is wishlisted
  const [percentage, setPercentage] = useState(0); // State to store the percentage
  const { userrDetails } = useUserr(); // Assuming useUserr() provides user details including id

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get("http://13.201.255.228:8080/all");
        if (response.data.length > 0) {
          const firstCharge = response.data[0];
          setPercentage(firstCharge.percentage);
        }
      } catch (error) {
        console.error('Error fetching charges:', error);
      }
    };

    fetchCharges();
  }, []);

  const handleCardClick = () => {
    navigate(`/productdetails/${product.id}`);
  };

  const handleWishlistClick = async () => {
    try {
      // API call to add the product to the wishlist
      await axios.post(`http://localhost:8080/addwishlist`, {
        userrId: userrDetails.id,
        productId: product.id
      });
      setIsWishlisted(true); // Update the state to show the product is wishlisted
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const cardStyles = {
    width: '288px', // Fixed width
    height: '407px', // Fixed height
    boxShadow: hover ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    transform: hover ? 'translateY(-5px)' : 'translateY(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
  };

  const imageContainerStyles = {
    position: 'relative',
    paddingBottom: '100%',
    overflow: 'hidden',
  };

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const titleStyles = {
    fontSize: '16px',
    lineHeight: '1.4',
    fontWeight: 'bold',
  };

  const textStyles = {
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const discountColor = {
    color: 'green',
    marginLeft: '0.5rem',
  };

  const wishlistIconStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    color: isWishlisted ? 'red' : 'gray',
    cursor: 'pointer',
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
  };

  const calculateNewSellPrice = () => {
    if (percentage === 0 || isNaN(parseFloat(percentage))) {
      return product.sellprice; // Return original sell price if percentage is not fetched or invalid
    }

    const newPrice = parseFloat(product.sellprice) * (1 + parseFloat(percentage) / 100);
    return newPrice.toFixed(2); // Return new sell price rounded to 2 decimal places
  };

  return (
    <Card
      className="m-2 border-0"
      style={cardStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={imageContainerStyles} onClick={handleCardClick}>
        <Card.Img
          variant="top"
          src={`http://localhost:8080/uploads/${product.imageUrl}`}
          alt={product.name}
          style={imageStyles}
        />
      </div>
      <AiOutlineHeart
        style={wishlistIconStyles}
        onClick={handleWishlistClick}
        className="wishlist-icon"
      />
      <Card.Body className="p-2">
        <Card.Title className="mb-1" style={titleStyles}>{product.name}</Card.Title>
        <Card.Text className="text-muted" style={textStyles}>
          <span style={{ fontWeight: '500' }}>{product.brandname}</span> <br />
          {product.description}
        </Card.Text>
        <h6 style={{ margin: '0.5rem 0' }}>
          ₹{calculateNewSellPrice()} <span className='price' style={{ textDecoration: 'line-through', fontWeight: '300' }}>₹{product.price}</span>
          <span className='off-color' style={discountColor}>{calculateDiscount(product.price, calculateNewSellPrice())}% off</span>
        </h6>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

