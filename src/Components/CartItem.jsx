/* eslint-disable react/prop-types */

import { Button, Card, Col, Row } from 'react-bootstrap';

const CartItem = ({ item }) => {
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
              Seller: {item.seller}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">₹{item.discountedPrice}</span>
              <span className="text-muted ms-2 text-decoration-line-through">₹{item.originalPrice}</span>
              <span className="text-success ms-2">{item.discount}% Off</span>
            </Card.Text>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" size="sm">-</Button>
              <span className="mx-2">{item.quantity}</span>
              <Button variant="outline-secondary" size="sm">+</Button>
            </div>
          </Col>
          <Col md={2} className="d-flex flex-column justify-content-between align-items-end">
            <Button variant="link" className="p-0 mb-2">Save for later</Button>
            <Button variant="link" className="p-0 text-danger">Remove</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
