import React, { useState, useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddPackage() {
  const [packagename, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [packagePrice, setPackagePrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewServices")
      .then((res) => res.json())
      .then((result) => {
        setAllServices(result);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    if (selectedService && !services.includes(selectedService)) {
      setServices([...services, selectedService]);
    }
  };

  const removeService = (service) => {
    setServices(services.filter((s) => s !== service));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!packagename.trim()) {
      formErrors.packagename = "Package Name is required";
    }
    if (!description.trim()) {
      formErrors.description = "Description is required";
    }
    if (services.length === 0) {
      formErrors.services = "At least one service must be selected";
    }
    if (!packagePrice.trim()) {
      formErrors.packagePrice = "Package Price is required";
    } else if (isNaN(packagePrice) || parseFloat(packagePrice) <= 0) {
      formErrors.packagePrice = "Package Price must be a valid positive number";
    }
    if (!image) {
      formErrors.image = "Package Image is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const savePackage = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const providerId = userdata._id;

    let formData = new FormData();
    formData.append("packagename", packagename);
    formData.append("description", description);
    formData.append("services", JSON.stringify(services));
    formData.append("packagePrice", packagePrice); // Convert to number
    formData.append("image", image);
    formData.append("providerId", providerId);

    try {
      const response = await fetch(
        "http://localhost:4000/provider/AddPackage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add package");
      }

      const result = await response.json();
      setMessage(result.message);
      setImage(null);

      setTimeout(() => {
        navigate("/ServiceProviderHome"); // Replace with actual route
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add package. Please try again.");
    }
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
            <div className="col-12 col-sm-8 col-md-5 col-lg-5 col-xl-5">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Package</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={savePackage}>
                  {/*------------------------- Package Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="packageNameInput"
                      placeholder="Package Name"
                      value={packagename}
                      onChange={(event) => setPackageName(event.target.value)}
                    />
                    <label htmlFor="packageNameInput">Package Name</label>
                    {errors.packagename && (
                      <small className="text-danger">
                        {errors.packagename}
                      </small>
                    )}
                  </div>

                  {/*------------------------- Description Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="descriptionInput"
                      placeholder="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="descriptionInput">Description</label>
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description}
                      </small>
                    )}
                  </div>

                  {/*------------------------- Package Services Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      onChange={handleServiceChange}
                    >
                      <option value="" disabled selected>
                        Select Services
                      </option>
                      {allServices.map((service) => (
                        <option key={service._id} value={service.servicename}>
                          {service.servicename}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingSelect">Select Services</label>
                    {errors.services && (
                      <small className="text-danger">{errors.services}</small>
                    )}
                  </div>

                  {/*------------------------- Selected Services ---------------------------------*/}
                  <div className="mb-3">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <span className="me-2">{service}</span>
                        <div
                          onClick={() => removeService(service)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fa fa-times"
                            aria-hidden="true"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/*------------------------- Package Price Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="packagePriceInput"
                      placeholder="Package Price"
                      onChange={(event) => setPackagePrice(event.target.value)}
                    />
                    <label htmlFor="packagePriceInput">Package Price</label>
                    {errors.packagePrice && (
                      <small className="text-danger">
                        {errors.packagePrice}
                      </small>
                    )}
                  </div>

                  {/*------------------------- Image Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="productImageInput"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    <label htmlFor="productImageInput">Product Image</label>
                    {errors.image && (
                      <small className="text-danger">{errors.image}</small>
                    )}
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
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

export default AddPackage;
