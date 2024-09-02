import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderSignup() {
  const [providername, setProviderName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!providername.trim()) {
      formErrors.providername = 'Full Name is required';
    }
    if (!contact.trim()) {
        formErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(contact)) {
        formErrors.contact = 'Contact number must be 10 digits';
    }
    if (!type.trim() || type === 'Select Type') {
      formErrors.type = 'Please select a type';
    }
    if (!address.trim()) {
      formErrors.address = 'Address is required';
    }
    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      formErrors.password = 'Password is required';
    } else if (password.length < 3) {
      formErrors.password = 'Password must be at least 3 characters long';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const registerVolunteer = () => {
    if (!validateForm()) {
      return;
    }

    let params = {
      providername: providername,
      contact: contact,
      type: type,
      address: address,
      email: email,
      password: password,
      usertype: 1,
    };

    fetch("http://localhost:4000/auth/providerSignup", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(params),
    }).then((res) => res.json()).then((result) => {
      if (result === 'success') {
        setMessage('Registered successfully');
      } else {
        setMessage('Registration failed');
      }
      console.log(result);
    });
  };

  useEffect(() => {
    if (message === 'Registered successfully') {
      setTimeout(() => {
        navigate('/'); // Redirect to the home page after 2 seconds
      }, 2000);
    }
  }, [message, navigate]);

  return (
    <div className='background1'>

    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
          <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="/" className="">
                <h3 className="text-primary">eMarketix SERVICE PROVIDER</h3>
              </a>
              <h3>REGISTER NOW!</h3>
            </div>
            {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingText"
                placeholder="Full Name"
                onChange={(e) => setProviderName(e.target.value)}
              />
              <label htmlFor="floatingText">Full Name</label>
              {errors.providername && <small className="text-danger">{errors.providername}</small>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingText"
                placeholder="Phone Number"
                onChange={(e) => setContact(e.target.value)}
              />
              <label htmlFor="floatingText">Contact</label>
              {errors.contact && <small className="text-danger">{errors.contact}</small>}
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select form-select mb-3"
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => setType(e.target.value)}
                style={{ height: "60px"}}
              >
                <option selected>Select Type</option>
                <option value="Company">Company</option>
                <option value="Freelancer">Freelancer</option>
              </select>
              <label htmlFor="floatingSelect">What are you?</label>
              {errors.type && <small className="text-danger">{errors.type}</small>}
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Enter Address"
                id="floatingTextarea"
                name="address"
                style={{ height: "100px" }}
                onChange={(event) => setAddress(event.target.value)}
              ></textarea>
              <label htmlFor="floatingTextarea">Address</label>
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <button
              type="button"
              className="btn btn-primary py-3 w-100 mb-4"
              onClick={registerVolunteer}
            >
              Sign Up
            </button>
            <p className="text-center mb-0" style={{color:"white"}}>Already have an Account? <a href="/">Sign In</a></p>
          </div>
        </div>
      </div>
                </div>
    </div>
  );
}

export default ProviderSignup;
