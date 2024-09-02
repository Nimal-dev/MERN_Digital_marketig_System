import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PackagesList() {
  const [packages, setPackages] = useState([]);
  const [refresh, setRefresh] = useState(0);


    useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const providerId = userdata._id;

    fetch(`http://localhost:4000/provider/viewPackages?providerId=${providerId}`)
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setPackages(result);
        } else {
          console.error("Unexpected response format:", result);
          setPackages([]); // Set packages to an empty array if the response is not an array
        }
        console.log(result, 'packages');
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, [refresh]);

  const deletePackage = (id) => {
    fetch("http://localhost:4000/provider/deletePackage", {
      method: "POST",
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
        console.error("Error deleting package:", error);
      });
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">PACKAGES LIST</h6>
          <Link className="btn btn-primary" to="/AddPackage">
            ADD PACKAGE
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Package Name</th>
              <th scope="col">Services</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              packages.length == 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">You have not added any packages yet!</td>
                </tr>
              ):(
           
            packages.map((packageItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{packageItem.packagename}</td>
                <td>{Array.isArray(packageItem.services) ? packageItem.services.join(", ") : packageItem.services}</td>
                <td>₹{packageItem.packagePrice}</td>
                <td>
                <Link to="/ProviderPackageViewList" state={{ id: packageItem._id }}>
                    <button className="btn btn-warning ">View</button>
                  </Link>
                <Link to="/EditPackage" state={{ id: packageItem._id }}>
                    <button className="btn btn-success">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deletePackage(packageItem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PackagesList;
