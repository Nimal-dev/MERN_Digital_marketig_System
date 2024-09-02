import React, { useEffect, useState } from "react";
import CustomerNavbar from "../Common/CustomerNavbar";
import CustomerFooter from "../Common/CustomerFooter";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (userdata && userdata._id) {
      const customerId = userdata._id;

      fetch(`http://localhost:4000/customer/getOrders/${customerId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          } else {
            console.error("Error fetching orders:", data.message);
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setError(error.message);
        })
        .finally(() => setLoading(false));
    } else {
      setError("User data not found in localStorage");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CustomerNavbar />
      <div
        style={{
          backgroundColor: "#3b5d50",
          padding: "5px 0px 20px 0px",
        }}
      >
        <h1 style={{ marginLeft: "50px", marginTop: "20px" }}>My Orders</h1>
      </div>
      <div className="container">
        {orders.length === 0 ? (
          // <p style={{color:"black"}}>You have not placed any Bookings yet.</p>
          <div style={{ textAlign: "center" }}>
            <img
              src="./img/Empty-pana.png"
              alt="Image"
              className="img-fluid"
              style={{ width: "300px", height: "300px" }}
            />
            <h2 style={{ color: "black" }}>
              You have No Orders Yet!
            </h2>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>SL.No</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    ₹{order.total}
                    {/* {order.items
                      .reduce(
                        (acc, item) =>
                          acc +
                          (item.productId?.price ||
                            item.packageId?.packagePrice ||
                            0),
                        0
                      )
                      .toFixed(2)} */}
                  </td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.productId?._id || item.packageId?._id}>
                          {item.productId
                            ? item.productId.name
                            : item.packageId.packagename}{" "}
                          - ₹
                          {(
                            item.productId?.price ||
                            item.packageId?.packagePrice ||
                            0
                          ).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CustomerFooter />
    </>
  );
}

export default MyOrders;
