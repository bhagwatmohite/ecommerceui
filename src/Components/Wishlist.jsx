import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './Wishlist.css'; // Custom CSS file for styling
import useUserr from './useUserr';
// Adjust the path based on your project structure

const Wishlist = () => {
  const { userrDetails } = useUserr(); // Assuming useUserr provides user details and id
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!userrDetails) return; // Ensure userrDetails is available

        // Fetch wishlist items from the API using userrDetails.id
        const response = await fetch(`http://localhost:8080/wishlist/user/${userrDetails.id}/productIds`);
        if (response.ok) {
          const productIds = await response.json();

          // Fetch details of each product in the wishlist
          const promises = productIds.map(productId =>
            fetch(`http://localhost:8080/product/${productId}`)
              .then(response => response.json())
          );

          const products = await Promise.all(promises);
          setWishlistItems(products);
        } else {
          console.error('Failed to fetch wishlist items:', response.status);
        }
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlist();
  }, [userrDetails]); // Add userrDetails to the dependencies array to re-run effect when it changes

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      // Remove item from wishlist API call
      const response = await fetch(`http://localhost:8080/wishlist/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        // Update the wishlist items after removing
        setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to remove item from wishlist:', response.status);
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
  };

  const calculateNewSellPrice = (sellPrice) => {
    // Replace with your actual calculation logic if needed
    return sellPrice; // For now, returning sell price as is
  };

  const handleDecreaseQuantity = (itemId) => {
    // Implement decrease quantity functionality if needed
    console.log('Decrease quantity for item:', itemId);
  };

  const handleIncreaseQuantity = (itemId) => {
    // Implement increase quantity functionality if needed
    console.log('Increase quantity for item:', itemId);
  };

  const handleSaveForLater = (itemId) => {
    // Implement save for later functionality if needed
    console.log('Save item for later:', itemId);
  };



  return (
    <Container className="wishlist-container" fluid style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Row>
        {/* <Col md={3}>
          <div className="sidebar">
            <h5>Hello, {userrDetails ? userrDetails.name : ''}</h5>
            <ul className="sidebar-menu">
              <li>MY ORDERS</li>
              <li>ACCOUNT SETTINGS</li>
              <ul className="submenu">
                <li>Profile Information</li>
                <li>Manage Addresses</li>
                <li>PAN Card Information</li>
              </ul>
              <li>PAYMENTS</li>
              <ul className="submenu">
                <li>Gift Cards</li>
                <li>Saved UPI</li>
                <li>Saved Cards</li>
              </ul>
              <li>MY STUFF</li>
            </ul>
          </div>
        </Col> */}
        <Col md={9}>
          <h4>My Wishlist ({wishlistItems.length})</h4>
          {wishlistItems.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <Image src={`http://localhost:8080/uploads/${item.imageUrl}`} alt={item.name} className="img-fluid" />
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
                      <span className="mx-2">1</span> {/* Hardcoded quantity for now */}
                      <Button variant="outline-secondary" size="sm" onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                    </div>
                  </Col>
                  <Col md={2} className="d-flex flex-column justify-content-between align-items-end">
                    <Button variant="link" className="p-0 mb-2" onClick={() => handleSaveForLater(item.id)}>Save for Later</Button>
                    <Button variant="link" className="p-0 text-danger text-decoration-none" onClick={() => handleRemoveFromWishlist(item.id)}>Remove</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Wishlist;
