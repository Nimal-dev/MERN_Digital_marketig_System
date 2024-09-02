import React, { useState, useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

function EditPackage() {
  const [packagename, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [packagePrice, setPackagePrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const loc = useLocation();

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

  useEffect(() => {
    const ids = { id: loc.state.id };
    fetch("http://localhost:4000/provider/updatePackageById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        setPackageName(result.packageDetails.packagename);
        setDescription(result.packageDetails.description);
        setServices(result.packageDetails.services);
        setPackagePrice(result.packageDetails.packagePrice.toString());
        setImage(result.packageDetails.image);
      });
  }, [loc.state.id]);

  const validateForm = () => {
    let formErrors = {};
    if (!packagename.trim()) {
      formErrors.packagename = 'Package Name is required';
    }
    if (!description.trim()) {
      formErrors.description = 'Description is required';
    }
    if (services.length === 0) {
      formErrors.services = 'At least one service must be selected';
    }
    if (!packagePrice.trim()) {
      formErrors.packagePrice = 'Package Price is required';
    } else if (isNaN(packagePrice) || parseFloat(packagePrice) <= 0) {
      formErrors.packagePrice = 'Package Price must be a valid positive number';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const UpdatePackage = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("id", loc.state.id);
    formData.append("packagename", packagename);
    formData.append("description", description);
    formData.append("services", JSON.stringify(services));
    formData.append("packagePrice", packagePrice);
    if (image instanceof File) {
      formData.append("image", image);
    }

    fetch("http://localhost:4000/provider/updatePackage", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating package:", error);
      });
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
                  <h3>Edit Package</h3>
                </div>
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={UpdatePackage}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="packageNameInput"
                      placeholder="Package Name"
                      name="packagename"
                      value={packagename}
                      onChange={(event) => setPackageName(event.target.value)}
                    />
                    <label htmlFor="packageNameInput">Package Name</label>
                    {errors.packagename && (
                      <small className="text-danger">{errors.packagename}</small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="descriptionInput"
                      placeholder="Description"
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="descriptionInput">Description</label>
                    {errors.description && (
                      <small className="text-danger">{errors.description}</small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
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
                  <div className="mb-3">
                    {services.map((service, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <span className="me-2">{service}</span>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeService(service)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="packagePriceInput"
                      placeholder="Package Price"
                      name="packagePrice"
                      value={packagePrice}
                      onChange={(event) => setPackagePrice(event.target.value)}
                    />
                    <label htmlFor="packagePriceInput">Package Price</label>
                    {errors.packagePrice && (
                      <small className="text-danger">{errors.packagePrice}</small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="productImageInput"
                      name="image"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    <label htmlFor="productImageInput">Product Image</label>
                    {errors.image && (
                      <small className="text-danger">{errors.image}</small>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                    <strong>Update</strong>
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

export default EditPackage;
