/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';

// const CategoryWiseProducts = ({ categoryId }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/category/${categoryId}`);
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [categoryId]);

//   return (
//     <Container>
//       <h2>Category Wise Products</h2>
//       <Row>
//         {products.map(product => (
//           <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <Card className="mb-3">
//               <Card.Img variant="top" src={product.image} />
//               <Card.Body>
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text>{product.description}</Card.Text>
//                 <Card.Text>Price: ${product.price}</Card.Text>
//                 {/* Add more details if needed */}
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };






import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const CategoryWiseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const [filters, setFilters] = useState({
    assured: false,
    priceRange: [0, 1000], // Default, can be adjusted dynamically
    size: "",
    brand: "",
    subcatid: "" // New state for subcategory filter
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000); // Default maximum price
  const [subcategories, setSubcategories] = useState([]); // State to store fetched subcategories

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const response = await axios.get(`http://13.201.255.228:8080/category/${categoryId}`);
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);


        // Calculate the maximum sell price dynamically
        const validSellPrices = fetchedProducts.filter(product => typeof product.sellprice === 'number' && !isNaN(product.sellprice));
        const maxSellPrice = validSellPrices.length > 0 ? Math.max(...validSellPrices.map(product => product.sellprice)) : 1000;
        setMaxPrice(maxSellPrice);

        // Adjust initial priceRange based on maxSellPrice
        setFilters(prevFilters => ({
          ...prevFilters,
          priceRange: [0, maxSellPrice]
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://13.201.255.228:8080/subcategory/bycategory/${categoryId}`);
        setSubcategories(response.data);

      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  useEffect(() => {
    let filtered = products;

    filtered = filtered.filter(product => product.sellprice >= filters.priceRange[0] && product.sellprice <= filters.priceRange[1]);
    if (filters.size) {
      filtered = filtered.filter(product => product.sizes && product.sizes.includes(filters.size.toUpperCase()));
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brandname && product.brandname.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.subcatid) {
      filtered = filtered.filter(product =>
        product.subcategoryId === parseInt(filters.subcatid)
      );
    }
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters(prevFilters => {
      if (name === 'assured') {
        return { ...prevFilters, [name]: checked };
      } else {
        return { ...prevFilters, [name]: value };
      }
    });
  };

  const handlePriceChange = (priceRange) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange
    }));
  };

  const handleSubcategoryChange = (event) => {
    const { value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      subcatid: value
    }));
  };

  return (
    <div style={{ background: '#f2f2f2', padding: '20px' }}>
      <Container fluid>
        <Row>
          <Col md={2} className="border-end" style={{ paddingRight: '20px', marginTop: '80px' }}>
            <h4>Filters</h4>
            <Form style={{ marginTop: '50px' }}>
              <Form.Group className="mb-3">
                <Form.Label>Price Range</Form.Label>
                <Slider
                  range
                  min={0}
                  max={maxPrice} // Use dynamically calculated max price
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                />
                <div className="d-flex justify-content-between mt-2">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter size (e.g., S, M, XL)"
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand name"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control
                  as="select"
                  name="subcategory"
                  value={filters.subcatid}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map(subcategory => (
                    <option key={subcategory.subcatid} value={subcategory.subcatid}>{subcategory.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={9}>
            <div className="my-4 py-5">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <div>
                  {filteredProducts.length === 0 ? (
                    <p>No products found in this category.</p>
                  ) : (
                    <div>
                      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Category Wise Products</h2>
                      <Row xs={1} sm={2} md={3} className="g-4">
                        {filteredProducts.map(product => (
                          <Col key={product.id} className="d-flex">
                            <ProductCard product={product} />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryWiseProducts;
