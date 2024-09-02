import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import CustomerNavbar from '../Common/CustomerNavbar';
import CustomerFooter from '../Common/CustomerFooter';
import StarRating from './StarRating';

function PackageViewList() {
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
      <CustomerNavbar />
      <div className="package-details-container">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`http://localhost:4000${packageDetails.imageUrl}`}
                alt={packageDetails.packagename}
                className="img-fluid rounded"
                style={{ minWidth:"600px", height: 'auto' }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="package-title">{packageDetails.packagename}</h1>
              <h4 className="text-secondary">Service Provider: {packageDetails.providerId.providername}</h4>
              <p className="text-muted">{packageDetails.providerId.type}</p>
              <p>{packageDetails.providerId.address}</p>
              <p className="mt-4">{packageDetails.description}</p>
              <h5 className="mt-4">Services:</h5>
              <ul className="list-unstyled">
                {packageDetails.services.map((service, index) => (
                  <li key={index} className="mb-2"><i className="bi bi-check-circle-fill text-success"></i> {service}</li>
                ))}
              </ul>
              <h3 className="text-danger mt-4">Price: ₹{packageDetails.packagePrice}</h3>
              <button
                onClick={() => addToCart(packageDetails._id)}
                className="btn btn-secondary mt-3"
              >
                <i className="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart
              </button>
            </div>

            <div className="reviews-section mt-5">
              <h3 style={{ color: "black" }}>Reviews</h3>
              <div className="reviews-container">
                {reviews.length === 0 && <p style={{color:"black", fontSize:"20px"}}>Be the first person to add a review!</p>}
                {reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <p><b>{review.customerId.firstname + " " + review.customerId.lastname}</b> <StarRating rating={review.rating} setRating={setRating} /></p>
                    <p>{review.reviewText}</p>
                  </div>
                ))}
              </div>
              <div className="add-review mt-4">
                <h4 style={{ color: "black", fontSize:"18px"}}>Add a review</h4>
                <textarea
                  style={{ backgroundColor: "white", color: "black" }}
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="form-control"
                  rows="3"
                />
                <StarRating rating={rating} setRating={setRating} />
                <button
                  onClick={submitReview}
                  className="btn btn-primary mt-3"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
}

export default PackageViewList;
