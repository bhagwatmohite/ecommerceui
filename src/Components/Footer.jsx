// import { Col, Container, Row } from 'react-bootstrap';

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light py-4">
//       <Container>
//         <Row>
//           <Col md={3}>
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Categories</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Products</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a></li>
//             </ul>
//           </Col>
//           <Col md={3}>
//             <h5>Customer Care</h5>
//             <ul className="list-unstyled">
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>FAQs</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Shipping</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Returns</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</a></li>
//             </ul>
//           </Col>
//           <Col md={3}>
//             <h5>Contact Us</h5>
//             <p>411008,Nigdi Pradhikaran Street, Pune</p>
//             <p>Email: ezioinfotech@gmail.com</p>
//             <p>Phone: +1234567890</p>
//           </Col>
//           <Col md={3}>
//             <h5>Follow Us</h5>
//             <ul className="list-unstyled">
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Facebook</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Twitter</a></li>
//               <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Instagram</a></li>
//             </ul>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
import { Col, Container, Row } from 'react-bootstrap';
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebook, FaGooglePay, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          {/* Quick Links */}
          <Col md={3}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Electronics</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Fashion</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Appliances</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Grocery</a></li>
            </ul>
          </Col>

          {/* Customer Care */}
          <Col md={3}>
            <h5 className="mb-3">Customer Care</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Help Center</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Returns</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Track Order</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Shipping</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>FAQs</a></li>
            </ul>
          </Col>

          {/* About Us */}
          <Col md={3}>
            <h5 className="mb-3">About Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About Flipkart</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Careers</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Press</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Corporate Info</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Sustainability</a></li>
            </ul>
          </Col>

          {/* Policies */}
          <Col md={3}>
            <h5 className="mb-3">Policies</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Return Policy</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms Of Use</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Security</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Sitemap</a></li>
            </ul>
          </Col>
        </Row>

        {/* Payment Methods */}
        <hr className="bg-light" />
        <Row className="mt-3">
          <Col md={6}>
            <h5>We Accept</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3"><FaCcVisa size={40} /></li>
              <li className="me-3"><FaCcMastercard size={40} /></li>
              <li className="me-3"><FaCcPaypal size={40} /></li>
              <li className="me-3"><FaGooglePay size={40} /></li>
              <li className="me-3"><FaCcAmex size={40} /></li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={6} className="text-end">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-end">
              <li className="me-3"><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}><FaFacebook size={30} /></a></li>
              <li className="me-3"><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}><FaTwitter size={30} /></a></li>
              <li className="me-3"><a href="#" style={{ textDecoration: 'none', color: 'inherit' }}><FaInstagram size={30} /></a></li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <hr className="bg-light" />
        <Row className="mt-3">
          <Col md={12} className="text-center">
            <p className="mb-0">© 2024 EzioKart. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
