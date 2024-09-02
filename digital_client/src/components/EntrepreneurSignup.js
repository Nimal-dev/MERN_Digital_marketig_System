import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EntrepreneurSignup() {
    const [entrepreneurname, setEntrepreneurName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const validateForm = () => {
        let formErrors = {};
        if (!entrepreneurname.trim()) {
            formErrors.entrepreneurname = "Full Name is required";
        }
        if (!contact.trim()) {
          formErrors.contact = 'Contact number is required';
      } else if (!/^\d{10}$/.test(contact)) {
          formErrors.contact = 'Contact number must be 10 digits';
      }
        if (!address.trim()) {
            formErrors.address = "Address is required";
        }
        if (!email.trim()) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email address is invalid";
        }
        if (!password.trim()) {
            formErrors.password = "Password is required";
        } else if (password.length < 3) {
            formErrors.password = "Password must be at least 3 characters";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const registerEntrepreneur = () => {
        if (!validateForm()) {
            return;
        }

        let params = {
            entrepreneurname: entrepreneurname,
            contact: contact,
            address: address,
            email: email,
            password: password,
            usertype: 2 
        };

        fetch("http://localhost:4000/auth/entrepreneurSignup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(params)
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
        <div className='background3'>

        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                    <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" className="">
                                <h3 className="text-primary">DMS SELLER</h3>
                            </a>
                            <h3>REGISTER NOW!</h3>
                        </div>
                        {message && <div className="alert alert-info">{message}</div>}
                        
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingText" placeholder="Full Name"
                                value={entrepreneurname}
                                onChange={(e) => setEntrepreneurName(e.target.value)} />
                            <label htmlFor="floatingText">Full Name</label>
                            {errors.entrepreneurname && <small className="text-danger">{errors.entrepreneurname}</small>}
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingText" placeholder="Phone Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)} />
                            <label htmlFor="floatingText">Contact</label>
                            {errors.contact && <small className="text-danger">{errors.contact}</small>}
                        </div>

                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Enter Address"
                                id="floatingTextarea"
                                name="address"
                                style={{ height: "100px" }}
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                            <label htmlFor="floatingTextarea">Address</label>
                            {errors.address && <small className="text-danger">{errors.address}</small>}
                        </div>
                       
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>

                        <div className="form-floating mb-4">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="floatingPassword">Password</label>
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>

                        <button type="button" className="btn btn-primary py-3 w-100 mb-4"
                            onClick={registerEntrepreneur}
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

export default EntrepreneurSignup;
