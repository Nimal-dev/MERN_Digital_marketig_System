import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    let param = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/auth/signin", {
      method: "post",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("data", data);
          if (data === "Invalid password") {
            setMessage("Wrong password");
          } else if (data === "Invalid email" || data === "User not found") {
            setMessage("Invalid email or user not found");
          } else {
            setMessage("");
            localStorage.setItem("userdata", JSON.stringify(data));
            const userType = data.authid.usertype;

            if (userType === 0) {
              navigate("/AdminHome");
              window.location.reload()
            } else if (userType === 1) {
              navigate("/ServiceProviderHome");
              window.location.reload()
            } else if (userType === 2) {
              navigate("/EntrepreneurHome");
              window.location.reload()
            } else if (userType === 3) {
              navigate("/CustomerHome");
              window.location.reload()
            } else {
              console.log("Unknown user type");
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="background1">
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
            <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="text-primary">Let's Get You Logged In!</h3>
              </div>
              {message && <div className="alert alert-danger">{message}</div>}{" "}
              {/* Display error message */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary py-3 w-100 mb-4"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <p className="text-center mb-0" style={{color:"white"}}>
                Don't have an Account? <a href="/Signup">Sign Up</a>
              </p>
              <br />
              <p className="text-center mb-0" style={{color:"white"}}>
                Become a <a href="/ProviderSignup">Service Provider</a>!
              </p>
              <br />
              <p className="text-center mb-0" style={{color:"white"}}>
                Do you have Products to sell, Register as an{" "}
                <a href="/EntrepreneurSignup">Seller</a>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
