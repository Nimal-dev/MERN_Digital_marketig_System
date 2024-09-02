import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';
import StarRating from '../Home_Components/StarRating';
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';

function ProviderPackageViewList() {
  const location = useLocation();
  const packageId = location.state ? location.state.id : null;
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!packageId) return;

    fetch(`http://localhost:4000/provider/getPackageDetails?packageId=${packageId}`)
      .then(res => res.json())
      .then(result => {
        setPackageDetails(result);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching package details:", error);
        setLoading(false);
      });

      fetch(`http://localhost:4000/customer/getPackageReviews/${packageId}`)
      .then(res => res.json())
      .then(result => {
        setReviews(result.reviews || []);
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }, [packageId]);

  const addToCart = (packageId) => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (!userdata) {
      navigate('/SignIn')
      return;
    }
    const customerId = userdata._id;

    fetch("http://localhost:4000/customer/AddCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId, packageId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Package added to cart successfully");
        } else {
          alert(data.message || "Error adding package to cart");
        }
      })
      .catch((error) => console.error("Error adding package to cart:", error));
  };

  const submitReview = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (!userdata) {
      navigate('/SignIn');
      return;
    }
    const customerId = userdata._id;

    fetch("http://localhost:4000/customer/addPackageReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ packageId, customerId, reviewText: newReview, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReviews([...reviews, { customerId: userdata, reviewText: newReview, rating }]);
          setNewReview('');
          setRating(1);
        } else {
          alert(data.message || "Error submitting review");
        }
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!packageDetails) {
    return <p>No package details available</p>;
  }

  return (
    <>
      <Sidebar/>
      <div className="content">
        
      <Navbar/>
      <div className="package-details-container">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`http://localhost:4000${packageDetails.imageUrl}`}
                alt={packageDetails.packagename}
                className="img-fluid rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
                />
            </div>
            <div className="col-md-6">
              <h1 className="package-title text-white">{packageDetails.packagename}</h1>
              <h4 className="text-white">Service Provider: {packageDetails.providerId.providername}</h4>
              <p className="text-white">{packageDetails.providerId.type}</p>
              <p className="text-white">{packageDetails.providerId.address}</p>
              <p className="mt-4 text-white">{packageDetails.description}</p>
              <h5 className="mt-4 text-white">Services:</h5>
              <ul className="list-unstyled">
                {packageDetails.services.map((service, index) => (
                    <li key={index} className="mb-2 text-white"><i className="bi bi-check-circle-fill text-success"></i> {service}</li>
                ))}
              </ul>
              <h3 className="text-danger mt-4">Price: ₹{packageDetails.packagePrice}</h3>
              
            </div>

            <div className="reviews-section mt-5 bg-secondary mb-5" style={{borderRadius:"20px", padding:"20px"}}>
              <h3 style={{ color: "white" }}>Reviews</h3>
              <div className="reviews-container">
                {reviews.length === 0 && <p style={{color:"white", fontSize:"20px"}}>No Reviews yet!</p>}
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                    <p className="text-white"><b>{review.customerId.firstname + " " + review.customerId.lastname}</b> <StarRating rating={review.rating} setRating={setRating} /></p>
                    <p className="text-white">{review.reviewText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
                    </div>
  
    </>
  );
}

export default ProviderPackageViewList;
