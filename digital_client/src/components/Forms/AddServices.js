import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddServices() {
  const [servicename, setServiceName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateForm = () => {
    let formErrors = {};
    if (!servicename.trim()) {
      formErrors.servicename = "Service Name is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const saveService = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return;
    }

    let params = {
      servicename: servicename,
    };
    fetch("http://localhost:4000/admin/AddServices", {
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
        setMessage("Service added successfully.");
        // Clear form fields after successful submission
        setServiceName("");
      })
      .catch((error) => {
        console.error("Error adding Service:", error);
        // Show error message
        setMessage("Failed to add Service. Please try again.");
      });
    setTimeout(() => {
      navigate('/AdminHome');
    }, 2000);
  };

  return (
    <>
      <Sidebar/>
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Services</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={saveService}>
                  {/*------------------------- Service Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="ServiceNameInput"
                      placeholder="Service Name"
                      name="servicename"
                      value={servicename}
                      onChange={(event) => setServiceName(event.target.value)}
                    />
                    <label htmlFor="ServiceNameInput">Service Name</label>
                    {errors.servicename && <small className="text-danger">{errors.servicename}</small>}
                  </div>
                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                  >
                    <strong>ADD SERVICE</strong>
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

export default AddServices;
