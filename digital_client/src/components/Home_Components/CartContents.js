
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal and Button
import CustomerFooter from '../Common/CustomerFooter';
import axios from 'axios';

function CartContents() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (!userdata) {
      navigate('/SignIn');
      return;
    }
    const customerId = userdata._id;

    fetch(`http://localhost:4000/customer/getCart/${customerId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched cart items:', data);
        setCartItems(data.items);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, [navigate]);

  const removeItem = (itemId, isPackage = false) => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    fetch(`http://localhost:4000/customer/removeFromCart/${customerId}/${itemId}/${isPackage}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Remove item response:', data);
        if (data.success) {
          setCartItems(prevItems =>
            prevItems.filter(item =>
              isPackage ? item.packageId?._id !== itemId : item.productId?._id !== itemId
            )
          );
          alert('Item removed successfully');
        } else {
          alert('Error removing item: ' + data.message);
        }
      })
      .catch(error => console.error('Error removing item:', error));
  };

  const proceedToCheckout = () => {
    if (!address) {
      setShowModal(true); // Show modal if address is not provided
      return;
    }

    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const customerId = userdata._id;

    const amount = cartItems.reduce((acc, item) => {
      const price = item.productId?.price || item.packageId?.packagePrice || 0;
      return acc + price;
    }, 0);

    const options = {
      key: 'rzp_test_4Ex6Tyjkp79GFy',
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'eMarketix: Digital marketing platform',
      description: 'Payment',
      image: "https://i.postimg.cc/SxJbGqJj/e-Marketix-logo.jpg",
      handler: (response) => {
        console.log('Razorpay response:', response);
        if (response.razorpay_payment_id) {
          fetch('http://localhost:4000/customer/placeOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId, address, paymentId: response.razorpay_payment_id }),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Place order response:', data);
              if (data.success) {
                alert('Order placed successfully');
                navigate('/checkout', { state: { cartItems: [] } });
              } else {
                alert('Error placing order: ' + data.message);
              }
            })
            .catch(error => console.error('Error placing order:', error));
        } else {
          alert('Payment failed');
        }
      },
      prefill: {
        name: userdata.name,
        email: userdata.email,
        contact: userdata.phone,
      },
      notes: {
        address: address,
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.error('Razorpay payment failed:', response.error);
      alert('Payment failed: ' + response.error.description);
    });

    rzp1.open();
  };

  return (
    <>
      <div className="untree_co-section before-footer-section">
        <div className="container">
        <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center' }}>
                    <img src="./img/empty-cart.png" alt="Image" className="img-fluid" style={{ width: "300px", height: "300px" }} />
                    <h2 style={{ color: 'black' }}>No Products in the cart. Add items to cart</h2>
                  </div>
                ) : (
                  <table className="tables">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product/Package</th>
                        <th className="product-price">Price</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.productId ? item.productId._id : item.packageId._id}>
                          <td className="product-thumbnail">
                            <img src={`http://localhost:4000${item.productId?.imageUrl || item.packageId?.imageUrl}`} alt="Image" className="img-fluid" />
                          </td>
                          <td className="product-name">
                            <h2 className="h5">{item.productId ? item.productId.name : item.packageId.packagename}</h2>
                          </td>
                          <td>
                            ₹{(item.productId?.price || item.packageId?.packagePrice || 0).toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                const itemId = item.productId?._id || item.packageId?._id;
                                const isPackage = !!item.packageId;
                                removeItem(itemId, isPackage);
                              }}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </form>
          </div>
          {cartItems.length > 0 && (
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6">
                    <a className="btn btn-secondary" href='/CustomerHome'>Continue Shopping</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 style={{ color: "black" }} className="h4 text-uppercase">Cart Totals</h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span style={{ color: "black" }}>Subtotal</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong style={{ color: "black" }}>
                          ₹{cartItems.reduce((acc, item) => acc + (item.productId?.price || item.packageId?.packagePrice || 0), 0).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span style={{ color: "black" }}>Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong style={{ color: "black" }}>
                          ₹{cartItems.reduce((acc, item) => acc + (item.productId?.price || item.packageId?.packagePrice || 0), 0).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        
                        <button className="btn btn-secondary btn-lg py-3 px-10 mb-5" onClick={proceedToCheckout}>Proceed To Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomerFooter />

      {/* Modal for Address Input */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control bg-white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => {
            setShowModal(false);
            proceedToCheckout();
          }}>
            Procced to Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartContents;
