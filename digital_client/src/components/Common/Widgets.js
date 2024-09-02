import React, { useState, useEffect } from "react";

function Widgets() {
  const [providers, setProviders] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [entrepreneur, setEntrepreneur] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/admin/viewcustomers")
      .then((res) => res.json())
      .then((result) => {
        setCustomer(result);
      })
      .catch((error) => {
        console.error("Error fetching Customers:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewentrepreneurs")
      .then((res) => res.json())
      .then((result) => {
        setEntrepreneur(result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching Entrepreneurs:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewServiceProviders")
      .then((res) => res.json())
      .then((result) => {
        setProviders(result);
        console.log(result,'resultssss');
      })
      .catch((error) => {
        console.error("Error fetching Service Providers:", error);
      });
  }, []);

  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div class="col-sm-6 col-xl-4">
            <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i class="fa fa-users fa-3x text-primary"></i>
              <div class="ms-3">
                <p class="mb-2">Customers</p>
                <h6 class="mb-0">{customer.length-1}</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-4">
            <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i class="fa fa-user-circle  fa-3x text-primary"></i>
              <div class="ms-3">
                <p class="mb-2">Service Providers</p>
                <h6 class="mb-0">{providers.length}</h6>
              </div>
            </div>
          </div>
          <div class="col-sm- col-xl-4">
            <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i class="fa fa-building fa-3x text-primary"></i>
              <div class="ms-3">
                <p class="mb-2">Sellers</p>
                <h6 class="mb-0">{entrepreneur.length}</h6>
              </div>
            </div>
          </div>
          {/* <div class="col-sm-6 col-xl-3">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-chart-pie fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Total Revenue</p>
                                <h6 class="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </>
  );
}

export default Widgets;
