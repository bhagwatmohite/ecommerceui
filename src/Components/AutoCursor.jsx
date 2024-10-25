import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// Import images correctly from the assets folder
import { default as B } from "../assets/banner1.jpg";
import { default as banner2 } from "../assets/banner2.png";
import { default as banner3 } from "../assets/banner3.jpg";
import { default as img1 } from '../assets/logo1.png'; // Correct import for image 1
const AutoCursor = () => {
  const carouselRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);

  // Static Product Data with correct category name, discount, and image imports
  const staticProducts = [
    {
      id: 1,
      categoryname: 'Electronics',
      discount: 30,  // Discount percentage
      imageUrl: B,  // Using the imported image
    },
    {
      id: 2,
      categoryname: 'Clothing',
      discount: 20,
      imageUrl: banner2,  // Using the imported image
    },
    {
      id: 3,
      categoryname: 'Accessories',
      discount: 15,
      imageUrl: img1,
    },
    {
      id: 4,
      categoryname: 'Home Decor',
      discount: 25,
      imageUrl: banner3,
    },
  ];

  useEffect(() => {
    // Directly setting static product data
    setProducts(staticProducts);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      if (carousel) {
        carousel.scrollBy({ left: 2, behavior: 'smooth' });
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleQuoteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#d8e7e4', marginTop: '50px', marginBottom: '50px' }}>
      <b><h4 style={{ color: 'Black', textAlign: 'center', paddingBottom: '30px' }}><b>Explore More Products</b></h4></b>
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          width: '100%',
          gap: '10px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {products.concat(products).map((product) => (
          <div
            className="card"
            key={product.id}
            style={{
              flex: '0 0 auto',
              margin: '0 10px',
              transition: 'transform 0.8s ease',
              border: 'none',  // Remove border if needed
            }}
          >
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.categoryname}
              style={{ height: '200px', objectFit: 'cover', width: '200px' }}
            />
            <div
              className="card-body text-center"
              style={{
                backgroundColor: '#000',  // Set background color below the image to black
                color: '#fff',  // Set text color to white
                padding: '10px',
              }}
            >
              <p className="card-title" style={{ margin: 0 }}>{product.categoryname}</p>
              <p style={{ margin: 0 }}>{product.discount}% OFF</p>  {/* Display only the discount percentage */}
              <Button className="btn btn-light" onClick={() => handleQuoteClick(product)}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details: {selectedProduct?.categoryname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.categoryname}
                style={{ width: '100%', height: 'auto' }}
              />
              <h5 className="mt-3">Brand: Shree Mangal Murti Industry</h5>
              <p className="mt-2">Discount: {selectedProduct.discount}% Off</p>
              <p className="mt-2">Here you can add more product information.</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AutoCursor;
