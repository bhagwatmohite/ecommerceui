/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import ProductCard from './ProductCard';

// const ProductList = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/allproduct");
//         setProducts(response.data);
//         setFilteredProducts(response.data); // Initialize filteredProducts
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchData();
//   }, []);



//   return (
//     <div style={{ background: '#f2f2f2', padding: '20px' }}>
//       <Container>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Discounts for You</h2>
//         <Row>
//           {filteredProducts.map(product => (
//             <Col key={product.id} sm={12} md={6} lg={4}>
//               <ProductCard product={product} />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ProductList;






import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/allproduct");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error state or retry logic if needed
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery ? searchQuery.toLowerCase().trim() : '';
    if (!lowerCaseQuery) {
      setFilteredProducts(products); // Show all products if searchQuery is empty
    } else {
      const filtered = products.filter(product =>
        (product.name && product.name.toLowerCase().includes(lowerCaseQuery)) ||
        (product.brandname && product.brandname.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    // Check if filteredProducts is empty to show no results message
    if (filteredProducts && filteredProducts.length === 0 && searchQuery) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [filteredProducts, searchQuery]);

  return (
    <div style={{ background: '#f2f2f2', padding: '20px' }}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Discounts for You</h2>
        {noResults ? (
          <Alert variant="warning" style={{ marginBottom: '20px' }}>
            No products found for {searchQuery}
          </Alert>
        ) : null}
        <Row>
          {filteredProducts && filteredProducts.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4} style={{ width: '24.33%' }}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;


