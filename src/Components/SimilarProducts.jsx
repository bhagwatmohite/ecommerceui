/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const SimilarProducts = ({ productName }) => {

  const { id } = useParams();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/allproduct");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on productName
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productName.toLowerCase())
  );

  const handleClick = () => {
    navigate(`/productdetails/${id}`)
  }
  return (
    <div style={{ background: '#f2f2f2', padding: '20px' }}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Similar Products</h2>
        <Row onClick={handleClick}>
          {filteredProducts.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SimilarProducts;