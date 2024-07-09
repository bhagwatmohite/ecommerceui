import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Categories</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Products</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Customer Care</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>FAQs</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Shipping</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Returns</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>411008,Nigdi Pradhikaran Street, Pune</p>
            <p>Email: ezioinfotech@gmail.com</p>
            <p>Phone: +1234567890</p>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Facebook</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Twitter</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Instagram</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
