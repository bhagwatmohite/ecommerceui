// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import ProductCard from './ProductCard';

// const SimilarProducts = ({ productName }) => {

//   const { id } = useParams();

//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/allproduct");
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter products based on productName
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(productName.toLowerCase())
//   );

//   const handleClick = () => {
//     navigate(`/productdetails/${id}`)
//   }
//   return (
//     <div style={{ background: '#f2f2f2', padding: '20px' }}>
//       <Container>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Similar Products</h2>
//         <Row onClick={handleClick}>
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

// export default SimilarProducts;

//23.10
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const SimilarProducts = ({ productName }) => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [products, setProducts] = useState([]); // State to store the list of products

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/allproduct");
      setProducts(response.data); // Set the products state with the fetched data
    } catch (error) {
      console.error('Error fetching products:', error); // Log any errors during the fetch
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function on component mount
  }, []); // Empty dependency array to run only once when the component mounts

  // Filter products based on productName
  const filteredProducts = products.filter(product => {
    // Check if product and product.name are defined
    if (product && product.name && typeof productName === 'string') {
      return product.name.toLowerCase().includes(productName.toLowerCase());
    }
    return false; // Exclude products that do not have a valid name
  });

  const handleClick = (productId) => {
    navigate(`/productdetails/${productId}`); // Navigate to the product details page with the specific product ID
  };

  return (
    <div style={{ background: '#f2f2f2', padding: '20px' }}>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Similar Products</h2>
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4}>
                <div onClick={() => handleClick(product.id)}> {/* Call handleClick with the product ID */}
                  <ProductCard product={product} /> {/* Render the ProductCard for each product */}
                </div>
              </Col>
            ))
          ) : (
            <Col sm={12}>
              <h4 style={{ textAlign: 'center' }}>No similar products found</h4>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SimilarProducts;
