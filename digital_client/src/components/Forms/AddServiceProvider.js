import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddServiceProvider() {
  const [providername, setProviderName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateProviderName = () => {
    if (!providername) {
      return "Provider name is required.";
    }
    return null;
  };

  const validateContact = () => {
    if (!contact) {
      return "Contact is required.";
    }
    return null;
  };

  const validateType = () => {
    if (!type) {
      return "Type is required.";
    }
    return null;
  };

  const validateAddress = () => {
    if (!address) {
      return "Address is required.";
    }
    return null;
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePassword = () => {
    if (!password) {
      return "Password is required.";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {
      providername: validateProviderName(),
      contact: validateContact(),
      type: validateType(),
      address: validateAddress(),
      email: validateEmail(),
      password: validatePassword(),
    };

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => error === null);
  };

  const saveProvider = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

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

    fetch("http://localhost:4000/admin/AddServiceProvider", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Show success message
        setMessage("Service Provider added successfully.");
        // Clear form fields after successful submission
        setProviderName("");
        setContact("");
        setType("");
        setAddress("");
        setEmail("");
        setPassword("");
        setErrors({});
      })
      .catch((error) => {
        console.error("Error adding Provider:", error);
        // Show error message
        setMessage("Failed to add Provider. Please try again.");
      });
    setTimeout(() => {
      navigate("/AdminHome");
    }, 2000);
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Service Provider</h3>
                </div>
                {/*------------------------- ALERT MESSAGES ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                {Object.keys(errors).map(
                  (key) =>
                    errors[key] && (
                      <div className="alert alert-danger" role="alert" key={key}>
                        {errors[key]}
                      </div>
                    )
                )}
                <form>
                  {/*------------------------- Provider Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="providerNameInput"
                      placeholder="Service Provider Name"
                      name="providername"
                      value={providername}
                      onChange={(event) => setProviderName(event.target.value)}
                    />
                    <label htmlFor="providerNameInput">Service Provider Name</label>
                  </div>
                  {/*------------------------- Contact Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="contactInput"
                      placeholder="Contact"
                      name="contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                    />
                    <label htmlFor="contactInput">Contact</label>
                  </div>
                  {/*------------------------- Type Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <select
                      className="form-select form-select mb-3"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      style={{ height: "60px" }}
                    >
                      <option value="">Select Type</option>
                      <option value="Company">Company</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                    <label htmlFor="floatingSelect">What are you?</label>
                  </div>
                  {/*------------------------- Address Input ---------------------------------*/}
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
                  </div>
                  {/*------------------------- Email Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                  </div>
                  {/*------------------------- Password Input ---------------------------------*/}
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="passwordInput">Password</label>
                  </div>
                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="button"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={saveProvider}
                  >
                    <strong>CREATE</strong>
                    <i className="fa fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddServiceProvider;
