// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
// import useUserr from './useUserr';

// const BuyProducts = () => {
//   const [selectedAddress, setSelectedAddress] = useState(1);
//   const [product, setProduct] = useState(null);
//   const [showProductDetails, setShowProductDetails] = useState(false);
//   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
//   const { fname, mobno, lname, addresses, id } = useUserr();
//   const [percentage, setPercentage] = useState(0);

//   const [showAddAddressModal, setShowAddAddressModal] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

//   const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null); // State for selected delivery address
//   const [deliverHereEnabled, setDeliverHereEnabled] = useState(false); // State to manage button enable/disable

//   const location = useLocation();
//   const productId = location.state.productId;

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/product/${productId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product data');
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   useEffect(() => {

//   }, [newAddress]);

//   useEffect(() => {
//     const fetchCharges = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/all");
//         if (response.data.length > 0) {
//           const firstCharge = response.data[0];
//           setPercentage(firstCharge.percentage);
//         }
//       } catch (error) {
//         console.error('Error fetching charges:', error);
//       }
//     };

//     fetchCharges();
//   }, []);

//   const calculateNewSellPrice = (sellprice) => {
//     if (!isNaN(parseFloat(percentage))) {
//       const newPrice = parseFloat(sellprice) * (1 + parseFloat(percentage) / 100);
//       return newPrice.toFixed(2);
//     }
//     return sellprice;
//   };

//   const handleAddressChange = (event) => {
//     setSelectedAddress(parseInt(event.target.value));
//     setDeliverHereEnabled(true); // Enable "Deliver Here" button when an address is selected
//   };

//   const handleDeliverHere = () => {
//     const selected = addresses.find(address => address.id === selectedAddress);
//     setSelectedDeliveryAddress(selected);
//     setShowProductDetails(true);
//   };

//   const handleContinue = () => {
//     setShowPaymentOptions(true);
//   };

//   const handlePaymentOptionChange = (event) => {
//     setSelectedPaymentOption(event.target.value);
//   };

//   const handleShowAddAddressModal = () => {
//     setShowAddAddressModal(true);
//   };

//   const handleCloseAddAddressModal = () => {
//     setShowAddAddressModal(false);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewAddress({
//       ...newAddress,
//       [name]: value
//     });
//   };

//   const handleAddAddress = async () => {
//     try {
//       // Validate pincode length
//       if (newAddress.pincode.length !== 6) {
//         throw new Error('Pincode must be exactly 6 digits long');
//       }

//       // Replace with logic to get the logged-in user's ID
//       const userId = id; // Replace with actual logged-in user ID retrieval

//       const response = await axios.post(`http://localhost:8080/save/${userId}`, newAddress);
//       // Assuming the API responds with the added address object
//       const addedAddress = response.data;
//       // You would typically update the state with the added address
//       console.log('Added address:', addedAddress);
//       // Close the modal after successful addition
//       setShowAddAddressModal(false);
//     } catch (error) {
//       console.error('Error adding address:', error.message);
//       // Handle error appropriately (e.g., show error message to user)
//     }
//   };

//   const cardStyle = {
//     margin: '0 auto',
//     border: '1px solid #dee2e6',
//     borderRadius: '5px',
//     marginTop: '150px',
//     marginBottom: '100px',
//   };

//   const cardBodyStyle = {
//     padding: '20px',
//   };

//   const addressStyle = {
//     padding: '10px',
//     border: '1px solid #dee2e6',
//     borderRadius: '5px',
//     marginBottom: '10px',
//     cursor: 'pointer',
//   };

//   const selectedAddressStyle = {
//     ...addressStyle,
//     backgroundColor: '#e9ecef',
//   };

//   const priceDetailStyle = {
//     backgroundColor: '#f8f9fa',
//     padding: '20px',
//     borderRadius: '5px',
//     border: '1px solid #dee2e6',
//   };

//   const priceRowStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: '10px',
//   };

//   const sectionStyle = {
//     marginBottom: '20px',
//   };

//   return (
//     <Container className="mt-4">
//       <Card style={cardStyle}>
//         <Card.Body style={cardBodyStyle}>
//           <div style={sectionStyle}>
//             <h5>LOGIN USER :</h5>
//             <div style={selectedAddressStyle}>
//               <input type="radio" name="login" checked readOnly /> {fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)}-{mobno}
//             </div>
//           </div>
//           <Row>
//             <Col md={8}>
//               <div>
//                 <h5 style={{ backgroundColor: 'sky-blue', color: 'white', height: '50px', display: 'flex', textAlign: 'center' }}>DELIVERY ADDRESS :</h5>
//                 {selectedDeliveryAddress ? (
//                   <div style={selectedAddressStyle}>
//                     <b>{fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)} - {mobno}</b>
//                     <br />
//                     {`${selectedDeliveryAddress.address} - ${selectedDeliveryAddress.city}`}
//                     <br />
//                     {`${selectedDeliveryAddress.state} - `}<b>{selectedDeliveryAddress.pincode}</b>
//                   </div>
//                 ) : (
//                   <Form>
//                     {addresses.map((address) => (
//                       <div key={address.id} style={selectedAddress === address.id ? selectedAddressStyle : addressStyle}>
//                         <Form.Check
//                           type="radio"
//                           id={`address${address.id}`}
//                           label={
//                             <>
//                               <b>{fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)} - {mobno}</b>
//                               <br />
//                               {`${address.address} - ${address.city}`}
//                               <br />
//                               {`${address.state} - `}<b>{address.pincode}</b>
//                             </>
//                           }
//                           name="address"
//                           value={address.id}
//                           checked={selectedAddress === address.id}
//                           onChange={handleAddressChange}
//                         />
//                       </div>
//                     ))}
//                     <h6 style={{ display: 'flex', justifyContent: 'center', color: 'green', cursor: 'pointer' }} onClick={handleShowAddAddressModal}>add another address</h6>
//                   </Form>
//                 )}
//                 {!showProductDetails && (
//                   <Button className="mt-3 w-40" onClick={handleDeliverHere} style={{ marginLeft: '300px', background: '#fb641b' }} disabled={!deliverHereEnabled}>
//                     <b>Deliver Here</b>
//                   </Button>
//                 )}
//               </div>
//               {showProductDetails && product && (
//                 <div style={{ marginTop: '20px' }}>
//                   <h5>PRODUCT DETAILS</h5>
//                   <Card className="mb-3">
//                     <Card.Body>
//                       <Row>
//                         <Col md={2}>
//                           <img src={`http://localhost:8080/uploads/${product.imageUrl}`} alt={product.name} className="img-fluid" />
//                         </Col>
//                         <Col md={8}>
//                           <Card.Title>{product.name}</Card.Title>
//                           <Card.Text className="text-muted">
//                             Brand: {product.brandname}
//                           </Card.Text>
//                           <Card.Text>
//                             <span className="fw-bold">₹{calculateNewSellPrice(product.sellprice)}</span>
//                             <span className="text-muted ms-2 text-decoration-line-through">₹{product.price}</span>
//                             <span className="text-success ms-2">{Math.round(((product.price - product.sellprice) / product.price) * 100)}% Off</span>
//                           </Card.Text>
//                         </Col>
//                       </Row>
//                     </Card.Body>
//                   </Card>
//                   {!showPaymentOptions && (
//                     <Button variant="link" className="p-2 text-white text-decoration-none float-end" onClick={handleContinue} style={{ background: '#fb641b', color: 'white', width: '150px' }}><b>Continue</b></Button>
//                   )}
//                   {showPaymentOptions && (
//                     <>
//                       <h5>PAYMENT OPTIONS</h5>
//                       <Card className="mt-4">
//                         <Card.Body>
//                           <Form>
//                             {['UPI', 'Wallet', 'Net Banking', 'Cash on Delivery'].map((option, index) => (
//                               <div key={index}>
//                                 <Form.Check
//                                   type="radio"
//                                   label={option}
//                                   name="paymentOptions"
//                                   id={`paymentOption${index}`}
//                                   value={option}
//                                   checked={selectedPaymentOption === option}
//                                   onChange={handlePaymentOptionChange}
//                                 />
//                                 {selectedPaymentOption === 'UPI' && option === 'UPI' && (
//                                   <div style={{ marginLeft: '20px' }}>
//                                     {['PhonePe', 'UPI ID', 'Google Pay'].map((upiOption, subIndex) => (
//                                       <Form.Check
//                                         key={subIndex}
//                                         type="radio"
//                                         label={upiOption}
//                                         name="upiOptions"
//                                         id={`upiOption${subIndex}`}
//                                       />
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                           </Form>
//                         </Card.Body>
//                       </Card>
//                     </>
//                   )}
//                 </div>
//               )}
//             </Col>
//             <Col md={4}>
//               <div style={priceDetailStyle}>
//                 <h5>PRICE DETAILS</h5>
//                 <div style={priceRowStyle}>
//                   <span>Price (1 item)</span>
//                   <span>₹{product && calculateNewSellPrice(product.sellprice)}</span>
//                 </div>
//                 <div style={priceRowStyle}>
//                   <span>Delivery Charges</span>
//                   <span style={{ color: 'green' }}><s>₹40</s> FREE</span>
//                 </div>
//                 <hr />
//                 <div style={priceRowStyle}>
//                   <span>Total Payable</span>
//                   <span>₹{product && calculateNewSellPrice(product.sellprice)}</span>
//                 </div>
//                 <div style={{ color: 'green' }}>
//                   Your Total Savings on this order ₹{product && (product.price - calculateNewSellPrice(product.sellprice)).toFixed(2)}
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Modal for Add Address */}
//       <Modal show={showAddAddressModal} onHide={handleCloseAddAddressModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formAddress">
//               <Form.Label>Address</Form.Label>
//               <Form.Control type="text" placeholder="Enter address" name="address" value={newAddress.address} onChange={handleInputChange} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formCity">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" placeholder="Enter city" name="city" value={newAddress.city} onChange={handleInputChange} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formState">
//               <Form.Label>State</Form.Label>
//               <Form.Control type="text" placeholder="Enter state" name="state" value={newAddress.state} onChange={handleInputChange} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPincode">
//               <Form.Label>Pincode</Form.Label>
//               <Form.Control type="text" placeholder="Enter pincode" name="pincode" value={newAddress.pincode} onChange={handleInputChange} />
//             </Form.Group>

//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseAddAddressModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddAddress}>
//             Add Address
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default BuyProducts;






import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useUserr from './useUserr';

const BuyProducts = () => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [product, setProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const { fname, mobno, lname, addresses, id } = useUserr();
  const [percentage, setPercentage] = useState(0);

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null); // State for selected delivery address
  const [deliverHereEnabled, setDeliverHereEnabled] = useState(false); // State to manage button enable/disable

  const location = useLocation();
  const productId = location.state.productId;
  const size = location.state.size;
  const color = location.state.color;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://13.201.255.228:8080/product/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get("http://13.201.255.228:8080/all");
        if (response.data.length > 0) {
          const firstCharge = response.data[0];
          setPercentage(firstCharge.percentage);
        }
      } catch (error) {
        console.error('Error fetching charges:', error);
      }
    };

    fetchCharges();

  }, []);

  const calculateNewSellPrice = (sellprice) => {
    if (!isNaN(parseFloat(percentage))) {
      const newPrice = parseFloat(sellprice) * (1 + parseFloat(percentage) / 100);
      return newPrice.toFixed(2);
    }
    return sellprice;
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return discount.toFixed(0); // Return the discount percentage rounded to the nearest integer
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(parseInt(event.target.value));
    setDeliverHereEnabled(true); // Enable "Deliver Here" button when an address is selected
  };

  const handleDeliverHere = () => {
    const selected = addresses.find(address => address.id === selectedAddress);
    setSelectedDeliveryAddress(selected);
    setShowProductDetails(true);
  };

  const handleContinue = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handleShowAddAddressModal = () => {
    setShowAddAddressModal(true);
  };

  const handleCloseAddAddressModal = () => {
    setShowAddAddressModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  const handleAddAddress = async () => {
    try {
      // Validate pincode length
      if (newAddress.pincode.length !== 6) {
        throw new Error('Pincode must be exactly 6 digits long');
      }

      // Replace with logic to get the logged-in user's ID
      const userId = id; // Replace with actual logged-in user ID retrieval

      const response = await axios.post(`http://13.201.255.228:8080/save/${userId}`, newAddress);
      // Assuming the API responds with the added address object
      const addedAddress = response.data;
      // You would typically update the state with the added address
      console.log('Added address:', addedAddress);
      // Close the modal after successful addition
      setShowAddAddressModal(false);
    } catch (error) {
      console.error('Error adding address:', error.message);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const cardStyle = {
    margin: '0 auto',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    marginTop: '150px',
    marginBottom: '100px',
  };

  const cardBodyStyle = {
    padding: '20px',
  };

  const addressStyle = {
    padding: '10px',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
  };

  const selectedAddressStyle = {
    ...addressStyle,
    backgroundColor: '#e9ecef',
  };

  const priceDetailStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '5px',
    border: '1px solid #dee2e6',
  };

  const priceRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  return (
    <Container className="mt-4">
      <Card style={cardStyle}>
        <Card.Body style={cardBodyStyle}>
          <div style={sectionStyle}>
            <h5>LOGIN USER :</h5>
            <div style={selectedAddressStyle}>
              <input type="radio" name="login" checked readOnly /> {fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)}-{mobno}
            </div>
          </div>
          <Row>
            <Col md={8}>
              <div>
                <h5 style={{ backgroundColor: 'sky-blue', color: 'white', height: '50px', display: 'flex', textAlign: 'center' }}>DELIVERY ADDRESS :</h5>
                {selectedDeliveryAddress ? (
                  <div style={selectedAddressStyle}>
                    <b>{fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)} - {mobno}</b>
                    <br />
                    {`${selectedDeliveryAddress.address} - ${selectedDeliveryAddress.city}`}
                    <br />
                    {`${selectedDeliveryAddress.state} - `}<b>{selectedDeliveryAddress.pincode}</b>
                  </div>
                ) : (
                  <Form>
                    {addresses.map((address) => (
                      <div key={address.id} style={selectedAddress === address.id ? selectedAddressStyle : addressStyle}>
                        <Form.Check
                          type="radio"
                          id={`address${address.id}`}
                          label={
                            <>
                              <b>{fname.charAt(0).toUpperCase() + fname.slice(1)} {lname.charAt(0).toUpperCase() + lname.slice(1)} - {mobno}</b>
                              <br />
                              {`${address.address} - ${address.city}`}
                              <br />
                              {`${address.state} - `}<b>{address.pincode}</b>
                            </>
                          }
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={handleAddressChange}
                        />
                      </div>
                    ))}
                    <h6 style={{ display: 'flex', justifyContent: 'center', color: 'green', cursor: 'pointer' }} onClick={handleShowAddAddressModal}>add another address</h6>
                  </Form>
                )}
                {!showProductDetails && (
                  <Button className="mt-3 w-40" onClick={handleDeliverHere} style={{ marginLeft: '300px', background: '#fb641b' }} disabled={!deliverHereEnabled}>
                    <b>Deliver Here</b>
                  </Button>
                )}
              </div>
              {showProductDetails && product && (
                <div style={{ marginTop: '20px' }}>
                  <h5>PRODUCT DETAILS</h5>
                  <Card className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <img src={`http://13.201.255.228:8080/uploads/${product.imageUrl}`} alt={product.name} className="img-fluid" />
                        </Col>
                        <Col md={8}>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Text className="text-muted">
                            Brand: {product.brandname}<br />
                            Size:{size}
                            <br />
                            Color:{color}
                          </Card.Text>
                          <Card.Text>
                            <span className="fw-bold">₹{calculateNewSellPrice(product.sellprice)}</span>
                            <span className="text-muted ms-2 text-decoration-line-through">₹{product.price}</span>
                            <span className="text-success ms-2">{calculateDiscount(product.price, calculateNewSellPrice(product.sellprice))}% Off</span>
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  {!showPaymentOptions && (
                    <Button variant="link" className="p-2 text-white text-decoration-none float-end" onClick={handleContinue} style={{ background: '#fb641b', color: 'white', width: '150px' }}><b>Continue</b></Button>
                  )}
                  {showPaymentOptions && (
                    <>
                      <h5>PAYMENT OPTIONS</h5>
                      <Card className="mt-4">
                        <Card.Body>
                          <Form>
                            {['UPI', 'Wallet', 'Net Banking', 'Cash on Delivery'].map((option, index) => (
                              <div key={index}>
                                <Form.Check
                                  type="radio"
                                  label={option}
                                  name="paymentOptions"
                                  id={`paymentOption${index}`}
                                  value={option}
                                  checked={selectedPaymentOption === option}
                                  onChange={handlePaymentOptionChange}
                                />
                                {selectedPaymentOption === 'UPI' && option === 'UPI' && (
                                  <div style={{ marginLeft: '20px' }}>
                                    {['PhonePe', 'UPI ID', 'Google Pay'].map((upiOption, subIndex) => (
                                      <Form.Check
                                        key={subIndex}
                                        type="radio"
                                        label={upiOption}
                                        name="upiOptions"
                                        id={`upiOption${subIndex}`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </Form>
                        </Card.Body>
                      </Card>
                    </>
                  )}
                </div>
              )}
            </Col>
            <Col md={4}>
              <div style={priceDetailStyle}>
                <h5>PRICE DETAILS</h5>
                <div style={priceRowStyle}>
                  <span>Price (1 item)</span>
                  <span>₹{product && calculateNewSellPrice(product.sellprice)}</span>
                </div>
                <div style={priceRowStyle}>
                  <span>Delivery Charges</span>
                  <span style={{ color: 'green' }}><s>₹40</s> FREE</span>
                </div>
                <hr />
                <div style={priceRowStyle}>
                  <span>Total Payable</span>
                  <span>₹{product && calculateNewSellPrice(product.sellprice)}</span>
                </div>
                <div style={{ color: 'green' }}>
                  Your Total Savings on this order ₹{product && (product.price - calculateNewSellPrice(product.sellprice)).toFixed(2)}
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal for Add Address */}
      <Modal show={showAddAddressModal} onHide={handleCloseAddAddressModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" name="address" value={newAddress.address} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" name="city" value={newAddress.city} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" name="state" value={newAddress.state} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="text" placeholder="Enter pincode" name="pincode" value={newAddress.pincode} onChange={handleInputChange} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddAddressModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAddress}>
            Add Address
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BuyProducts;

