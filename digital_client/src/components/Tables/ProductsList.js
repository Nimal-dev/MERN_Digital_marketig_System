import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const entrepreneurId = userdata._id;
    fetch(`http://localhost:4000/entrepreneur/viewProducts?entrepreneurId=${entrepreneurId}`)
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setProducts(result);
        } else {
          console.error("Unexpected response format:", result);
          setProducts([]);
        }
        console.log(result, 'products');
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [refresh]);

  
  const deleteProduct = (id) => {
    fetch("http://localhost:4000/entrepreneur/deleteProduct", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="col-sm-6 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">PRODUCTS LIST</h6>
          <Link className="btn btn-primary" to="/AddProduct">
            ADD PRODUCT
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₹{product.price}</td>
                <td>
                  <img
                    src={`http://localhost:4000${product.imageUrl}`}
                    alt={product.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>
                <Link to={`/SellerProductViewList`} state={{ id: product._id }} className="btn btn-success ms-2">
                    View
                  </Link>
                  <Link to={"/EditProduct"} state={{id:product._id}} className="btn btn-warning ms-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsList;
