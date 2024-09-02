import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let formErrors = {};

        if (!firstname.trim()) formErrors.firstname = 'First name is required';
        if (!lastname.trim()) formErrors.lastname = 'Last name is required';
        if (!contact.trim()) {
            formErrors.contact = 'Contact number is required';
        } else if (!/^\d{10}$/.test(contact)) {
            formErrors.contact = 'Contact number must be 10 digits';
        }
        if (!email.trim()) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
        }
        // if (!password.trim()) {
        //     formErrors.password = 'Password is required';
        // } else if (password.length < 8) {
        //     formErrors.password = 'Password must be at least 8 characters';
        // }
        if (!password) {
            formErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            formErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const registerUser = () => {
        if (!validateForm()) {
            return;
        }

        let params = {
            firstname,
            lastname,
            contact,
            email,
            password,
            usertype: 3
        };

        fetch("http://localhost:4000/auth/signup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
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
        <div className="background1">
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                    <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" className="">
                                <h3 className="text-primary">DIGITAL MANAGEMENT SYSTEM</h3>
                            </a>
                            <h3>REGISTER NOW!</h3>
                        </div>
                        {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="floatingText" 
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)} 
                            />
                            <label htmlFor="floatingText">First Name</label>
                            {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
                        </div>

                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="floatingText" 
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                            <label htmlFor="floatingText">Last Name</label>
                            {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
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
                            onClick={registerUser}
                        >
                            Sign Up
                        </button>
                        <p className="text-center mb-0">Already have an Account? <a href="/">Sign In</a></p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Signup;
