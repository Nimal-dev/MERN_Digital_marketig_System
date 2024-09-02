import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    let param = {
      providerId: userdata._id,
    };

    fetch("http://localhost:4000/customer/getOrdersByProvider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((result) => {
        setOrders(result.orders || []);
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      });
  }, []);

  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const filteredOrders = orders.filter(order =>
    order.items && order.items.some(item =>
      item.packageId && item.packageId.providerId && item.packageId.providerId._id === userdata._id
    )
  );
  console.log("Filtered Orders",filteredOrders)

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-secondary rounded h-100 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-0">ORDERS LIST</h6>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Customer Contact</th>
                      <th scope="col">Package Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error && (
                      <tr>
                        <td colSpan="4" className="text-center text-danger">
                          {error}
                        </td>
                      </tr>
                    )}
                    {!error &&
                    
                      filteredOrders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{(order.userId.firstname) + (order.userId.lastname) || "N/A"}</td>
                          <td>{order.userId.contact || "N/A"}</td>
                          <td>{order.items.find(item => item.packageId)?.packageId?.packagename || "N/A"}</td>
                          <td>{order.items.find(item => item.packageId)?.packageId?.packagePrice || "N/A"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;









// import React, { useEffect, useState } from "react";
// import Navbar from "../Common/Navbar";
// import Sidebar from "../Common/Sidebar";
// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     const userdata =  JSON.parse(localStorage.getItem("userdata"));
//     let param = {
//       providerId: userdata._id,
//     };
//     fetch("http://localhost:4000/customer/getOrdersByProvider", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(param),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         setOrders(result.orders || []);
//         console.log(orders.items[].packageId, "Orders");
//       })
//       .catch((error) => {
//         setError("Error fetching data");
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Sidebar />
//       <div className="content">
//         <Navbar />
//         <div className="container-fluid pt-4 px-4">
//           <div className="row g-4">
//             <div className="col-sm-6 col-xl-7">
//               <div className="bg-secondary rounded h-100 p-4">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h6 className="mb-0">ORDERS LIST</h6>
//                 </div>
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">User Name</th>
//                       <th scope="col">Package Name</th>
//                       <th scope="col">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {error && (
//                       <tr>
//                         <td colSpan="4" className="text-center text-danger">
//                           {error}
//                         </td>
//                       </tr>
//                     )}
//                     {!error &&
//                       orders.map((order, index) => {
//                         console.log(orders,"hehe")
// return(
//   <tr key={order._id}>
//   <td>{index + 1}</td>
//   <td>{order.userId?.firstname || "N/A"}</td>
//   <td>{order.items[0]?.packageId?.packagename || "N/A"}</td>
//   <td>{order.items[0]?.packageId?.packagePrice || "N/A"}</td>
// </tr>
// )
//                       }
            
//                       )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Orders;
