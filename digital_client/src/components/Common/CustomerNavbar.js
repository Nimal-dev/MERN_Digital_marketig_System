import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CustomerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(()=>{
    const authenticated= JSON.parse(localStorage.getItem("userdata"));
  const usertype = authenticated?.authid?.usertype;
    console.log(usertype,"asdfghjkl;")
    if (usertype==1) {
      setIsProvider(true);
    }
    else{setIsProvider(false);
    } 
  })

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
    
    window.location.reload();
  };

  return (
    <>
      <nav className="customer-navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
        <div className="container">
          <a className="navbar-brand" href="index.html">eMarketix</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="customer-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className={`nav-item ${currentPath === '/CustomerHome' ? 'active' : ''}`}>
              {isLoggedIn ? (
                <a className="nav-link" href="/CustomerHome">Home</a>
              ):
              (
              <a className="nav-link" href="/">Home</a>)
              }
                
              </li>
              <li className={`nav-item ${currentPath === '/products' ? 'active' : ''}`}>
                <a className="nav-link" href="/products">Products</a>
              </li>
              <li className={`nav-item ${currentPath === '/Services' ? 'active' : ''}`}>
                <a className="nav-link" href="/Services">Services</a>
              </li>
              {isLoggedIn && (
                <>
                {isProvider &&(
                  <li className={`nav-item ${currentPath === '/MyOrders' ? 'active' : ''}`}>
                  <a className="nav-link" href="/ServiceProviderHome">Dashboard</a>
                </li>
                )}
                  <li className={`nav-item ${currentPath === '/MyOrders' ? 'active' : ''}`}>
                    <a className="nav-link" href="/MyOrders">My Orders</a>
                  </li>
                  <li className={`nav-item ${currentPath === '/Cart' ? 'active' : ''}`}>
                    <a className="nav-link" href="/Cart">
                      <img src="img/cart.svg" alt="Cart" />
                      <strong> Cart</strong>
                    </a>
                  </li>
                </>
              )}
            </ul>
            {isLoggedIn ? (
              <button className="btn btn-primary" onClick={handleLogout}><b>Log Out</b></button>
            ) : (
              <a className="btn btn-primary" href='/SignIn'><b>Log In</b></a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default CustomerNavbar;
