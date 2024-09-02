import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';
import { Link, useLocation } from "react-router-dom";

function PackageView() {
  const location = useLocation();
  const providerId = location.state ? location.state.id : null;
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;

    fetch(`http://localhost:4000/provider/viewPackages?providerId=${providerId}`)
      .then(res => res.json())
      .then(result => {
        if (Array.isArray(result)) {
          setPackages(result);
        } else {
          console.error("Unexpected response format:", result);
          setPackages([]); // Set packages to an empty array if the response is not an array
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching packages:", error);
        setLoading(false); // Handle errors by setting loading to false
      });
  }, [providerId]);

  return (
    <>
      <CustomerNavbar />
      <h1 style={{ color: 'black', marginLeft: '50px', marginTop: '50px' }}>Packages</h1>
      <div className="product-section">
        <div className="container">
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : packages.length === 0 ? (
              <p style={{color:"black"}}>No packages available</p>
            ) : (
              packages.map(pkg => (
                <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-3 ms-3"
                  
                  key={pkg._id}>
                  <div className="product-item">
                    <img
                      src={`http://localhost:4000${pkg.imageUrl}`}
                      alt={pkg.packagename}
                      style={{ width: '290px', height: '245px', borderRadius: "10px 10px 5px 5px" }}
                      className="img-fluid product-thumbnail"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image.jpg'; }} // Fallback image handling
                    />
                    <h3 className="product-title">{pkg.packagename}</h3>
                    <p style={{color:"black"}}>{pkg.services[0]}, {pkg.services[1]}</p>
                   
                    <strong className="product-price">₹{pkg.packagePrice}</strong><br/>

                    <Link to="/PackageViewList" state={{ id: pkg._id }}>
                      <button type="button" className="btn btn-dark">View Details</button>
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

export default PackageView;
