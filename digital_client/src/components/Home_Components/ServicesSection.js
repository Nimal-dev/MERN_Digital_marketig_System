import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';
import { Link } from "react-router-dom";

function ServicesSection() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/provider/viewProviders')
      .then(response => response.json())
      .then(data => {
        setProviders(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
        setLoading(false); // Handle errors by setting loading to false
      });
  }, []);

  return (
    <>
      <CustomerNavbar />
      <h1 style={{ color: 'black', marginLeft: '50px', marginTop: '50px' }}>Services</h1>
      <div className="product-section">
        <div className="container">
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : providers.length === 0 ? (
              <p>No providers available</p>
            ) : (
              providers.map(provider => (
                <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-3 ms-3"
                  style={{ borderBottom: "1px solid black", borderRadius: "30px" }}
                  key={provider._id}>
                  <div className="product-item">
                    <h2 className="product-title" style={{ color: "black" }}>{provider.providername}</h2>
                    <strong className="product-price">{provider.type}</strong>
                    <p style={{ color: "brown" }}>Address: {provider.address}</p>
                    <Link to="/PackageView" state={{ id: provider._id }}>
                      <button className="btn btn-dark">View Packages</button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
}

export default ServicesSection;
