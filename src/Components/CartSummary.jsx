/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

const CartSummary = ({ totalItems, totalPrice, discount, deliveryCharges, packagingFee }) => {
  return (
    <Card className="p-3">
      <Card.Body>
        <Card.Title className="mb-3">PRICE DETAILS</Card.Title>
        <div className="d-flex justify-content-between mb-2">
          <span>Price ({totalItems} items)</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Discount</span>
          <span className="text-success">- ₹{discount}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Delivery Charges</span>
          <span className="text-success">Free</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>Secured Packaging Fee</span>
          <span>₹{packagingFee}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold mb-3">
          <span>Total Amount</span>
          <span>₹{totalPrice - discount + packagingFee}</span>
        </div>
        <div className="text-success">
          You will save ₹{discount} on this order
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
