/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useUserr from './useUserr';

const Cart = ({ onUpdateCartQuantity }) => {
  const { userrDetails } = useUserr();
  const [productIds, setProductIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false); // State to track loading state
  const navigate = useNavigate();


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userrDetails.id}/productIds`);
        if (response.data) {
          setProductIds(response.data);
        } else {
          setProductIds([]); // Set empty array if response.data is null or undefined
        }
      } catch (error) {
        console.error("Error fetching product IDs:", error);
      }
    };

    fetchData();
  }, [userrDetails]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoadingProducts(true); // Set loading state to true
      const promises = productIds.map(async (productId) => {
        try {
          const response = await axios.get(`http://localhost:8080/product/${productId}`);
          return { ...response.data, quantity: 1 };
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          return null;
        }
      });

      const products = await Promise.all(promises);
      const filteredProducts = products.filter(product => product !== null);
      setCartItems(filteredProducts);
      setLoadingProducts(false); // Set loading state to false after fetching data
    };

    if (productIds.length > 0) {
      fetchProductDetails();
    } else {
      setCartItems([]); // Set cart items to empty array if productIds is empty
    }
  }, [productIds]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all");
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

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(total);
    onUpdateCartQuantity(total);
  }, [cartItems, onUpdateCartQuantity]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.get('http://localhost:8080/getallcart');
      const cartItem = response.data.find(item => item.productId === productId && item.userrId === userrDetails.id);

      if (!cartItem) {
        console.error(`Cart item with productId ${productId} not found for user ${userrDetails.id}.`);
        return;
      }

      const cartItemId = cartItem.id;
      await axios.delete(`http://localhost:8080/deletecart/${cartItemId}`);
      setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
      console.log(`Item with productId ${productId} removed from cart.`);
    } catch (error) {
      console.error(`Error removing item with productId ${productId} from cart:`, error);
    }
  };

  const handleSaveForLater = (itemId) => {
    console.log(`Saving item with ID ${itemId} for later`);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handlePlaceOrder = () => {
    const productIdsToBuy = cartItems.map(item => item.id);
    navigate('/buyproducts', { state: { productId: productIdsToBuy } });
    console.log('Placing order', productIdsToBuy);
  };

  const calculateNewSellPrice = (sellprice) => {
    if (!isNaN(parseFloat(percentage))) {
      const newPrice = parseFloat(sellprice) * (1 + parseFloat(percentage) / 100);
      return newPrice.toFixed(2); // Limit to 2 decimal places
    }
    return sellprice;
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
  };

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(calculateNewSellPrice(item.sellprice)) * item.quantity, 0);
  const totalDiscount = cartItems.reduce((total, item) => total + (item.price - parseFloat(calculateNewSellPrice(item.sellprice))) * item.quantity, 0);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} style={{ marginTop: '150px' }}>
          {loadingProducts ? (
            <p>Loading...</p>
          ) : (
            cartItems.map(item => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={2}>
                      <img src={`http://localhost:8080/uploads/${item.imageUrl}`} alt={item.name} className="img-fluid" />
                    </Col>
                    <Col md={8}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className="text-muted">
                        Brand: {item.brandname}
                      </Card.Text>
                      <Card.Text>
                        <span className="fw-bold">₹{calculateNewSellPrice(item.sellprice)}</span>
                        <span className="text-muted ms-2 text-decoration-line-through">₹{item.price}</span>
                        <span className="text-success ms-2">{calculateDiscount(item.price, calculateNewSellPrice(item.sellprice))}% Off</span>
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="outline-secondary" size="sm" onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                      </div>
                    </Col>
                    <Col md={2} className="d-flex flex-column justify-content-between align-items-end">
                      <Button variant="link" className="p-0 mb-2" onClick={() => handleSaveForLater(item.id)}></Button>
                      <Button variant="link" className="p-0 text-danger text-decoration-none" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
        <Col md={4} style={{ marginTop: '100px', marginBottom: '50px' }}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title className="mb-3">PRICE DETAILS</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({totalQuantity} items)</span>
                <span>₹{totalPrice.toFixed(2)}</span> {/* Limit to 2 decimal places */}
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="text-success"> ₹{totalDiscount.toFixed(2)}</span> {/* Limit to 2 decimal places */}
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-success">Free</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total Amount</span>
                <span>₹{totalPrice.toFixed(2)}</span> {/* Limit to 2 decimal places */}
              </div>
              <div className="text-success">
                You will save ₹{totalDiscount.toFixed(2)} on this order
              </div>
            </Card.Body>
          </Card>
          <Button variant="warning" className="w-100 mt-3" onClick={handlePlaceOrder}>PLACE ORDER</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
