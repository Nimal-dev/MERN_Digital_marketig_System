import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ServiceProvidersList() {
  const [providers, setProviders] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // const navigate = useNavigate();

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
  }, [refresh]);

  const deleteProvider = (id) => {
    fetch("http://localhost:4000/admin/deleteServiceProvider", {
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
    <div className="col-sm-6 col-xl-7">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <h6 className="mb-0">SERVICE PROVIDERS LIST</h6>
          <Link className="btn btn-primary" to="/AddServiceProvider">
            ADD SERVICE PROVIDERS
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Contact</th> */}
              <th scope="col">Type</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((providers, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{providers.providername}</td>
                {/* <td>{providers.contact}</td> */}
                <td>{providers.type}</td>
                <td>{providers.authid.email}</td>
                
                <td>
                  <Link to="/EditServiceProvider" state={{ id: providers._id }}>
                    <button className="btn btn-success">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteProvider(providers._id)}
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

export default ServiceProvidersList;
