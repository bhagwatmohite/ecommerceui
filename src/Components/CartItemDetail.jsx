/* eslint-disable react/prop-types */
import { Button, Card, Col, Row } from 'react-bootstrap';

const CartItemDetail = ({ item, handleRemoveItem }) => {

  const handleRemove = () => {
    handleRemoveItem(item.id);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={2}>
            <img src={item.imageUrl} alt={item.name} className="img-fluid" />
          </Col>
          <Col md={8}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text className="text-muted">
              Brand: {item.brandname}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">₹{item.sellprice}</span>
              <span className="text-muted ms-2 text-decoration-line-through">₹{item.price}</span>
              <span className="text-success ms-2">{Math.round(((item.price - item.sellprice) / item.price) * 100)}% Off</span>
            </Card.Text>
            <div className="d-flex align-items-center">
              {/* Add quantity handling buttons */}
            </div>
          </Col>
          <Col md={2} className="d-flex flex-column justify-content-between align-items-end">
            <Button variant="link" className="p-0 mb-2" onClick={handleRemove}>Remove</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItemDetail;
