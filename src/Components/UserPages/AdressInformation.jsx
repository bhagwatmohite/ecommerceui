import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useUserr from "../useUserr";

const AddressInformation = () => {
  const { id } = useUserr();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [pincodeError, setPincodeError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/addresses/user/${id}`);
        setAddresses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAddress(null);
    setPincodeError('');
    setFormError('');
  };

  const handleInputChange = (event, property) => {
    const updatedAddress = { ...selectedAddress, [property]: event.target.value };
    setSelectedAddress(updatedAddress);
  };

  const handleNewAddressChange = (event, property) => {
    const updatedNewAddress = { ...newAddress, [property]: event.target.value };
    setNewAddress(updatedNewAddress);
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateForm = () => {
    if (!newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      setFormError('Please fill out all fields.');
      return false;
    }
    if (!validatePincode(newAddress.pincode)) {
      setFormError('Pincode should be exactly 6 digits and numeric.');
      return false;
    }
    return true;
  };

  const handleAddAddress = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const response = await axios.post(`http://localhost:8080/save/${id}`, {
        userId: id,
        ...newAddress
      });

      const addedAddress = response.data;
      setAddresses([...addresses, addedAddress]);
      setShowModal(false);
      setNewAddress({
        address: "",
        city: "",
        state: "",
        pincode: ""
      });
      setFormError('');
      alert("Address added successfully");
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`http://localhost:8080/address/${addressId}`);
      const updatedAddresses = addresses.filter(address => address.id !== addressId);
      setAddresses(updatedAddresses);
      alert("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!validatePincode(selectedAddress.pincode)) {
        setPincodeError('Pincode should be exactly 6 digits and numeric.');
        return;
      }

      await axios.put(`http://localhost:8080/address/${selectedAddress.id}`, selectedAddress);
      const updatedAddresses = addresses.map(addr => addr.id === selectedAddress.id ? selectedAddress : addr);
      setAddresses(updatedAddresses);
      setShowModal(false);
      alert("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <>
      <h5 className="card-title">Address Information</h5>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {addresses.length > 0 ? (
            <ul className="list-group">
              {addresses.map((address) => (
                <li key={address.id} className="list-group-item">
                  <strong>Address:</strong> {address.address}<br />
                  <strong>City:</strong> {address.city}<br />
                  <strong>State:</strong> {address.state}<br />
                  <strong>Pincode:</strong> {address.pincode}<br />
                  <h6 style={{ display: 'flex', justifyContent: 'center', color: 'green', cursor: 'pointer' }} onClick={() => handleEditAddress(address)}>Edit Address</h6>
                  <h6 style={{ display: 'flex', justifyContent: 'center', color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(address.id)}>Delete</h6>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}
          <br></br>
          <h6 style={{ display: 'flex', justifyContent: 'center', color: 'green', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Add Address</h6>
        </div>
      )}

      {/* Modal for Editing or Adding Address */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAddress ? 'Edit Address' : 'Add Address'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={selectedAddress ? selectedAddress.address : newAddress.address}
              onChange={(e) => selectedAddress ? handleInputChange(e, "address") : handleNewAddressChange(e, "address")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={selectedAddress ? selectedAddress.city : newAddress.city}
              onChange={(e) => selectedAddress ? handleInputChange(e, "city") : handleNewAddressChange(e, "city")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              value={selectedAddress ? selectedAddress.state : newAddress.state}
              onChange={(e) => selectedAddress ? handleInputChange(e, "state") : handleNewAddressChange(e, "state")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              className={`form-control ${pincodeError && 'is-invalid'}`}
              id="pincode"
              value={selectedAddress ? selectedAddress.pincode : newAddress.pincode}
              onChange={(e) => {
                selectedAddress ? handleInputChange(e, "pincode") : handleNewAddressChange(e, "pincode");
                if (!validatePincode(e.target.value)) {
                  setPincodeError('Pincode should be exactly 6 digits and numeric.');
                } else {
                  setPincodeError('');
                }
              }}
            />
            {pincodeError && <div className="invalid-feedback">{pincodeError}</div>}
          </div>
          {formError && <div className="text-danger">{formError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
          {selectedAddress ? (
            <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
          ) : (
            <Button variant="primary" onClick={handleAddAddress}>Add Address</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressInformation;
