import React from 'react'
// import CustomerProducts from '../Tables/CustomerProducts'
import CustomerNavbar from '../Common/CustomerNavbar'
import HeroSection from '../Home_Components/HeroSection'
import ProductSection from '../Home_Components/ProductSection'
import ChooseUs from '../Home_Components/ChooseUs'
import CustomerFooter from '../Common/CustomerFooter'

function CustomerHome() {
  return (
    <>
    <CustomerNavbar/>
    <HeroSection/>
    <ProductSection/>
    <ChooseUs/>
    <CustomerFooter/>
    </>
  )
}

export default CustomerHome