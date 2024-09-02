import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function ShopOwnersList() {
    const [entrepreneurs, setEntrepreneur] = useState([]);
    const [refresh] = useState(0);
    // const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:4000/admin/viewentrepreneurs")
        .then((res) => res.json())
        .then((result) => {
            setEntrepreneur(result);
            console.log(result)
        })
        .catch((error) => {
          console.error("Error fetching Entrepreneurs:", error);
        });
    }, [refresh]);
    return (
      <>
        <div class="col-12">
          <div class="bg-secondary rounded h-100 p-4">
            <h6 class="mb-2">SELLER LIST</h6>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {entrepreneurs.map((entrepreneurs, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entrepreneurs.entrepreneurname}</td>
                      <td>
                      {entrepreneurs.contact}
                      </td>
                      <td>
                      {entrepreneurs.address}
                      </td>
                      <td>
                       {entrepreneurs.authid.email}
                      </td>
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

export default ShopOwnersList