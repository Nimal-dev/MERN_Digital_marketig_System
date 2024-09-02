import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CustomersList() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  console.log(auth, "datagyudgauthththh");
  const [customer, setCustomer] = useState([]);
  const [refresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewcustomers")
      .then((res) => res.json())
      .then((result) => {
        setCustomer(result);
      })
      .catch((error) => {
        console.error("Error fetching Customers:", error);
      });
  }, [refresh]);
  return (
    <>
      <div class="col-12">
        <div class="bg-secondary rounded h-100 p-4">
          <h6 class="mb-2">CUSTOMERS LIST</h6>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {customer
                  .filter((customer) => customer.authid.usertype === 3)
                  .map((customer, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{customer.firstname}</td>
                      <td>{customer.lastname}</td>
                      <td>{customer.contact}</td>
                      <td>{customer.authid.email}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersList;
