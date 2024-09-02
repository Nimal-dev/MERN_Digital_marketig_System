import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Common/Sidebar";

function EditServiceProvider() {
  const [providername, setProviderName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [authid, setAuthid] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const ids = { id: loc.state.id };
    fetch("http://localhost:4000/admin/updateServiceProviderById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        setProviderName(result.providerDetails.providername);
        setType(result.providerDetails.type);
        setContact(result.providerDetails.contact);
        setAddress(result.providerDetails.address);
        setEmail(result.authDetails.email);
        setAuthid(result.authDetails._id); // Store auth ID for update
      });
  }, [loc.state.id]);

  const ServiceProvider = () => {
    const params = {
      id: loc.state.id,
      providername: providername,
      contact: contact,
      type: type,
      address: address,
      email: email,
      userstatus: 1,
      authid: authid // Pass auth ID for update
    };
    fetch("http://localhost:4000/admin/editAndUpdateServiceProvider", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/AdminHome");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Update Service Provider</h3>
                </div>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="stateNameInput"
                      placeholder="Kerala Disaster management"
                      value={providername}
                      onChange={(event) => setProviderName(event.target.value)}
                    />
                    <label htmlFor="stateNameInput">Provider Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="contactInput"
                      placeholder="Contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                    />
                    <label htmlFor="contactInput">Contact</label>
                  </div>


                   {/*------------------------- Type Input ---------------------------------*/}
                  <div class="form-floating mb-3">
                                <select class="form-select form-select mb-3" id="floatingSelect"
                                    aria-label="Floating label select example" onChange={(e) => setType(e.target.value)}
                                    style={{height: "60px"}}
                                    >
                                    <option selected>Select Type</option>
                                    <option value="Company">Company</option>
                                    <option value="Freelancer">Freelancer</option>
                                </select>
                                <label for="floatingSelect">What are you?</label>
                            </div>


                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    <label htmlFor="addressInput">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={ServiceProvider}
                  >
                    <strong>UPDATE</strong>{" "}
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditServiceProvider;
