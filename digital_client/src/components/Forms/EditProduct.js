import React, { useState, useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

function EditProduct() {
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.state.id;

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/entrepreneur/getProduct?productId=${id}`);
      const result = await response.json();
      setProductName(result.name);
      setDescription(result.description);
      setProductPrice(result.price.toString()); // Convert price to string
      setImage(result.imageUrl); // Assuming imageUrl is the path to the image
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!productname.trim()) {
      formErrors.productname = "Product Name is required";
    }
    if (!description.trim()) {
      formErrors.description = "Description is required";
    }
    if (productprice === "") {
      formErrors.productprice = "Product Price is required";
    } else if (isNaN(productprice) || parseFloat(productprice) <= 0) {
      formErrors.productprice = "Product Price must be a valid positive number";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("id", productId);
    formData.append("name", productname);
    formData.append("description", description);
    formData.append("price", productprice);
    if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      const url = `http://localhost:4000/entrepreneur/updateProduct`;
      const response = await fetch(url, {
        method: "put",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const result = await response.json();
      setMessage(result.message);
      // Clear form fields after successful submission
      setTimeout(() => {
        navigate("/EntrepreneurHome"); // Replace with actual route
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to update product. Please try again.");
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
                  <h3>Edit Product</h3>
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
                      value={productname}
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
                      value={description}
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
                      value={productprice}
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
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                    <label htmlFor="productImageInput">Product Image</label>
                  </div>

                  {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                  >
                    <strong>UPDATE PRODUCT</strong>
                    <i className="fa fa-save"></i>
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

export default EditProduct;

















// import React, { useState, useEffect } from "react";
// import Sidebar from "../Common/Sidebar";
// import { useNavigate, useLocation } from "react-router-dom";

// function EditProduct() {
//   const [productname, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [productprice, setProductPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const productId = location.state.id;

//   useEffect(() => {
//     if (productId) {
//       fetchProductDetails(productId);
//     }
//   }, [productId]);

//   const fetchProductDetails = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:4000/entrepreneur/getProduct?productId=${id}`);
//       const result = await response.json();
//         setProductName(result.name);
//       setDescription(result.description);
//       setProductPrice(result.price);
//       setImage(result.imageUrl); // Assuming imageUrl is the path to the image
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     }
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!productname.trim()) {
//       formErrors.productname = "Product Name is required";
//     }
//     if (!description.trim()) {
//       formErrors.description = "Description is required";
//     }
//     if (!productprice.trim()) {
//       formErrors.productprice = "Product Price is required";
//     } else if (isNaN(productprice) || parseFloat(productprice) <= 0) {
//       formErrors.productprice = "Product Price must be a valid positive number";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const formData = new FormData();
//     formData.append("name", productname);
//     formData.append("description", description);
//     formData.append("price", productprice);
//     if (image && typeof image !== "string") {
//       formData.append("image", image);
//     }

//     try {
//       const url = `http://localhost:4000/entrepreneur/updateProduct/${productId}`;
//       const response = await fetch(url, {
//         method: "put",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }

//       const result = await response.json();
//       setMessage(result.message);
//       // Clear form fields after successful submission
//       setTimeout(() => {
//         navigate("/EntrepreneurHome"); // Replace with actual route
//       }, 2000);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Failed to update product. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className="content">
//         <div className="container-fluid">
//           <div
//             className="row h-100 align-items-center justify-content-center"
//             style={{ minHeight: "100vh" }}
//           >
//             <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
//               <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
//                 <div className="d-flex align-items-center justify-content-center mb-3">
//                   <h3>Edit Product</h3>
//                 </div>
//                 {/*------------------------- ALERT MESSAGE ---------------------------------*/}
//                 {message && (
//                   <div className="alert alert-success" role="alert">
//                     {message}
//                   </div>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                   {/*------------------------- Product Name Input ---------------------------------*/}
//                   <div className="form-floating mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="productNameInput"
//                       placeholder="Product Name"
//                       value={productname}
//                       onChange={(event) => setProductName(event.target.value)}
//                     />
//                     <label htmlFor="productNameInput">Product Name</label>
//                     {errors.productname && <small className="text-danger">{errors.productname}</small>}
//                   </div>

//                   {/*------------------------- Product Description Input ---------------------------------*/}
//                   <div className="form-floating mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="productDescriptionInput"
//                       placeholder="Product Description"
//                       value={description}
//                       onChange={(event) => setDescription(event.target.value)}
//                     />
//                     <label htmlFor="productDescriptionInput">Product Description</label>
//                     {errors.description && <small className="text-danger">{errors.description}</small>}
//                   </div>

//                   {/*------------------------- Product Price Input ---------------------------------*/}
//                   <div className="form-floating mb-3">
//                     <input
//                       type="number"
//                       className="form-control"
//                       id="productPriceInput"
//                       placeholder="Product Price"
//                       value={productprice}
//                       onChange={(event) => setProductPrice(event.target.value)}
//                     />
//                     <label htmlFor="productPriceInput">Product Price</label>
//                     {errors.productprice && <small className="text-danger">{errors.productprice}</small>}
//                   </div>

//                   {/*------------------------- Image Input ---------------------------------*/}
//                   <div className="form-floating mb-3">
//                     <input
//                       type="file"
//                       className="form-control"
//                       id="productImageInput"
//                       onChange={(event) => setImage(event.target.files[0])}
//                     />
//                     <label htmlFor="productImageInput">Product Image</label>
//                   </div>

//                   {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
//                   <button
//                     type="submit"
//                     className="btn btn-primary py-3 w-100 mb-4"
//                   >
//                     <strong>UPDATE PRODUCT</strong>
//                     <i className="fa fa-save"></i>
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditProduct;
