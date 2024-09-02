import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const getSellerId = () => {
  //   const userdata = JSON.parse(localStorage.getItem("userdata"));
  //   console.log(userdata._id);
  //   return userdata ? userdata._id : null;
  // };

  const validateForm = () => {
    let formErrors = {};
    if (!productname.trim()) {
      formErrors.productname = "Product Name is required";
    }
    if (!description.trim()) {
      formErrors.description = "Description is required";
    }
    if (!productprice.trim()) {
      formErrors.productprice = "Product Price is required";
    } else if (isNaN(productprice) || parseFloat(productprice) <= 0) {
      formErrors.productprice = "Product Price must be a valid positive number";
    }
    if (!image) {
      formErrors.image = "Image is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // const sellerId = getSellerId();
    // if (!sellerId) {
    //   setMessage("Failed to get seller information. Please log in again.");
    //   return;
    // }
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const entrepreneurId = userdata._id

    const formData = new FormData();
    formData.append("name", productname);
    formData.append("description", description);
    formData.append("price", productprice);
    formData.append("image", image);
    formData.append("entrepreneurId", entrepreneurId);

    try {
      const response = await fetch("http://localhost:4000/entrepreneur/AddProduct", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      setMessage(result.message);
      // Clear form fields after successful submission
      setProductName("");
      setDescription("");
      setProductPrice("");
      setImage(null);
      setTimeout(() => {
        navigate("/EntrepreneurHome"); // Replace with actual route
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add product. Please try again.");
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
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Product</h3>
                </div>
                {/*------------------------- ALERT MESSAGE ---------------------------------*/}
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  {/*------------------------- Product Name Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="productNameInput"
                      placeholder="Product Name"
                      name="Productname"
                      
                      onChange={(event) => setProductName(event.target.value)}
                    />
                    <label htmlFor="productNameInput">Product Name</label>
                    {errors.productname && <small className="text-danger">{errors.productname}</small>}
                  </div>

                  {/*------------------------- Product Description Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="productDescriptionInput"
                      placeholder="Product Description"
                      name="Productdescription"
                     
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <label htmlFor="productDescriptionInput">Product Description</label>
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                  </div>

                  {/*------------------------- Product Price Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="productPriceInput"
                      placeholder="Product Price"
                      name="productPrice"
                      
                      onChange={(event) => setProductPrice(event.target.value)}
                    />
                    <label htmlFor="productPriceInput">Product Price</label>
                    {errors.productprice && <small className="text-danger">{errors.productprice}</small>}
                  </div>

                  {/*------------------------- Image Input ---------------------------------*/}
                  <div className="form-floating mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="productImageInput"
                      name="image"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    <label htmlFor="productImageInput">Product Image</label>
                    {errors.image && <small className="text-danger">{errors.image}</small>}
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                  >
                    <strong>ADD PRODUCT </strong>
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

export default AddProducts;
