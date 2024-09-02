import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ServicesCategory() {
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewServices")
      .then((res) => res.json())
      .then((result) => {
        setServices(result);
        console.log(result, 'resultssss');
      })
      .catch((error) => {
        console.error("Error fetching Service Providers:", error);
      });
  }, [refresh]);

  const deleteService = (id) => {
    fetch("http://localhost:4000/admin/deleteService", {
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
        setRefresh((prev) => prev + 1); // Trigger a refresh
      })
      .catch((error) => {
        console.error("Error deleting provider:", error);
      });
  };

  return (
    <div className="col-sm-6 col-xl-5">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">SERVICES CATEGORY</h6>
          <Link className="btn btn-primary" to="/AddServices">
            ADD SERVICES
          </Link>
        </div>
        <div className="table-responsive" style={{ maxHeight: "300px" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Service Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.servicename}</td>
                  <td>
                    <Link to="/EditServiceCategory" state={{ id: service._id }}>
                      <button className="btn btn-success">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteService(service._id)}
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
    </div>
  );
}

export default ServicesCategory;
