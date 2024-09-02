import React from 'react'
import CustomerNavbar from '../Common/CustomerNavbar'
import CartContents from './CartContents'

function Cart() {
  return (
    <>
    <CustomerNavbar/>
    {/* -------------Top Bar Start--------------- */}
    <div
        style={{
            backgroundColor: "#3b5d50",
            padding: "5px 0px 20px 0px",
            
            }}
            >
        <h1 style={{ marginLeft: "50px", marginTop: "20px" }}>CHECKOUT</h1>
      </div>
          {/* -------------Top Bar End--------------- */}
    <CartContents/>
    </>
  )
}

export default Cart