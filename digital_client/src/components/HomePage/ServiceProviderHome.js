import React from "react";

// import VolunteerList from "../Tables/VolunteerList";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import PackagesList from "../Tables/PackagesList";
import AddPackage from "../Forms/AddPackage";

function ServiceProviderHome() {
  return (
    <>
      <Sidebar/>
      <div className="content">
        <Navbar/>
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
           <PackagesList/>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceProviderHome;
