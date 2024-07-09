/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BankOfferIcon from '../assets/Bankoffericon.svg';
import Star from '../assets/star.svg';
import SimilarProducts from './SimilarProducts';
import useUserr from './useUserr';

const ProductDetail = ({ setCartItems }) => {
  const [product, setProduct] = useState(null);
  const [percentage, setPercentage] = useState(0); // State to store the fetched percentage
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { id } = useParams();
  const navigate = useNavigate();
  const { userrDetails } = useUserr();

  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all");
        console.log("get charges ", response.data);
        if (response.data.length > 0) {
          const firstCharge = response.data[0]; // Assuming you only need the first item from the array
          setPercentage(firstCharge.percentage); // Set percentage from the response
        }
        setLoading(false); // Update loading state
      } catch (error) {
        console.error('Error fetching charges:', error);
        setLoading(false); // Update loading state in case of error
      }
    };

    fetchCharges();
  }, []);

  const handleAddToCart = async () => {
    try {

      if (!selectedColor || !selectedSize) {
        alert('Please select color and size before adding to cart');
        return;
      }

      const response = await fetch('http://localhost:8080/addcartitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id, // Assuming product.id corresponds to the product's unique identifier
          userrId: userrDetails.id, // Replace with the actual userId from your authentication or session
          color: selectedColor,
          size: selectedSize,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      // Update the local state or perform any other necessary actions
      setCartItems(prevItems => [...prevItems, product]);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  //handle buy now 
  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size before proceeding to buy');
      return;
    }
    console.log("selceted", selectedColor, selectedSize);

    // Navigate to buyproducts page with state
    navigate('/buyproducts', { state: { productId: product.id, color: selectedColor, size: selectedSize } });
  };

  if (!product || loading) {
    return <p>Loading...</p>;
  }

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
  };

  // Function to calculate new sell price after applying percentage increase
  const calculateNewSellPrice = () => {
    if (percentage === 0 || isNaN(parseFloat(percentage))) {
      return product.sellprice; // Return original sell price if percentage is not fetched or invalid
    }

    const newPrice = parseFloat(product.sellprice) * (1 + parseFloat(percentage) / 100);
    return newPrice.toFixed(2); // Return new sell price rounded to 2 decimal places
  };

  //selected color and sizes
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Static customer review data
  const reviews = [
    { name: 'John Doe', rating: 4, comment: 'Great product, highly recommended!' },
    { name: 'Jane Smith', rating: 5, comment: 'Excellent quality and fast delivery.' },
    { name: 'David Johnson', rating: 3, comment: 'Product is good but could improve packaging.' },
  ];

  return (
    <>
      <Container fluid style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Row>
          <Col md={6} className="overflow-hidden">
            <div className="left-div" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
              <img src={`http://localhost:8080/uploads/${product.imageUrl}`} alt={product.name} style={{ width: '416px', height: '416px' }} className="img-fluid" />
              <div className='button-div' style={{ paddingTop: '20px' }}>
                <Button
                  style={{ height: 'clamp(60px, 8vh, 80px)', width: 'clamp(200px, 40vw, 150px)', borderRadius: '5px', cursor: 'pointer', marginRight: '10px', border: '1px solid #E05D00', color: '#E05D00', backgroundColor: 'white' }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
                <Button
                  style={{ height: 'clamp(60px, 8vh, 80px)', width: 'clamp(200px, 40vw, 150px)', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'black', color: 'white' }}
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </Button>
              </div>
            </div>
          </Col>
          <Col md={6} className="overflow-auto">
            <div className="right-div">
              <div className="right-content">
                <h1>{product.name}</h1>
                <h3>{product.brandname}</h3>
                <p>{product.description}</p>
                <h3>₹{calculateNewSellPrice()} <span className='price' style={{ textDecoration: 'line-through', fontWeight: '300' }}> ₹{product.price} </span> <span className='off-color' style={{ color: 'green', marginLeft: '0.5rem' }}>{calculateDiscount(product.price, calculateNewSellPrice())}% off</span></h3>

                <img src={Star} alt='star img' />
                <span className='review' style={{ textAlign: 'center' }}>1,32 Rating & 197 Review</span>
                <br></br>
                <br></br>
                <h6>Size:
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      className={`d-inline-block p-2 border rounded shadow-sm ${selectedSize === size ? 'bg-primary text-white' : 'bg-light'}`}  // Highlight selected size
                      style={{
                        fontSize: '16px',
                        color: '#333',
                        marginLeft: '20px',
                        marginTop: '10px',
                        cursor: 'pointer'  // Make cursor pointer to indicate it's clickable
                      }}
                      onClick={() => handleSizeSelect(size)}  // Handle size selection
                    >
                      <span className="font-weight-bold">{size}</span>
                    </div>
                  ))}

                  {/* <div className="d-inline-block p-2 border rounded shadow-sm" style={{ backgroundColor: '#f9f9f9', fontSize: '16px', color: '#333', scrollMarginLeft: '10px', marginLeft: '20px', marginTop: '10px' }}>
                    <span className="font-weight-bold" style={{ color: '#000' }}>{product.sizes}</span>
                  </div> */}

                </h6>
                <br></br>
                <h6 style={{ display: 'flex', alignItems: 'center' }}>Color:</h6>
                <div>
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        marginLeft: '10px',
                        border: selectedColor === color ? '2px solid blue' : '2px solid black',  // Highlight selected color
                        cursor: 'pointer'  // Make cursor pointer to indicate it's clickable
                      }}
                      onClick={() => handleColorSelect(color)}  // Handle color selection
                    ></span>
                  ))}

                  {/* <span style={{ display: 'inline-block', width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }}>{product.colors}</span> */}

                </div>
                <br></br>
                {product.stock ? <h6>In Stock</h6> : <h6>Out of Stock</h6>}
                <br></br>
                <h3 className='availabel-offer' style={{ color: '#F13E1E' }}>Available offers</h3>

                <div>
                  <img src={BankOfferIcon} alt="Bank Offer Icon" />
                  <span className='bank-offer' style={{ fontWeight: 'bold' }}>Bank Offer</span> Get ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above
                  <span className='tc-color' style={{ color: '#2874F0' }}> T&C</span>
                </div>
                <br></br>
                <div>
                  <img src={BankOfferIcon} alt="Bank Offer Icon" />
                  <span className='bank-offer' style={{ fontWeight: 'bold' }}>Bank Offer</span> 5% Cashback on Flipkart Axis Bank Card
                  <span className='tc-color' style={{ color: '#2874F0' }}> T&C</span>
                </div>
                <br></br>
                <div>
                  <img src={BankOfferIcon} alt="Bank Offer Icon" />
                  <span className='bank-offer' style={{ fontWeight: 'bold' }}>Bank Offer</span> 10% Upto 2500 off on Axis Bank Signature credit card
                  <span className='tc-color' style={{ color: '#2874F0' }}> T&C</span>
                </div>
                <br />
                <h4 className='view-7offer' style={{ color: '#F13E1E' }}>View 7 more offers</h4>
                <br />
                <div>3 month On Going Support.</div><br />
                <div>3 month On Going Support.</div><br />
                <div>3 month On Going Support.</div><br />
                <div>3 month On Going Support.</div><br />
              </div>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row style={{ marginTop: '40px', alignItems: 'center', justifyContent: 'center' }}>
          <Col md={8} className="overflow-auto">
            <div>
              <h3>Customer Reviews :</h3>
              {reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <h4>{review.name}</h4>
                  <div>Rating: {review.rating}/5</div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <hr></hr>
      <div>
        <SimilarProducts productName={product.name}></SimilarProducts>
      </div>
    </>
  );
};

export default ProductDetail;
