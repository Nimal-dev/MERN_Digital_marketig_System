import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./components/SignIn";
import Signup from "./components/SignUp";
import ProviderSignup from "./components/ProviderSignup";
import EntrepreneurSignup from "./components/EntrepreneurSignup";
import AdminHome from "./components/HomePage/adminHome";
import ServiceProviderHome from "./components/HomePage/ServiceProviderHome";
import AddServiceProvider from "./components/Forms/AddServiceProvider";
import EditServiceProvider from "./components/Forms/EditServiceProvider";
import AddServices from "./components/Forms/AddServices";
import EditServiceCategory from "./components/Forms/EditServiceCateory";
import AddPackage from "./components/Forms/AddPackage";
import EntrepreneurHome from "./components/HomePage/EntrepreneurHome";
import AddProducts from "./components/Forms/AddProducts";
import EditProduct from "./components/Forms/EditProduct";
import CustomerHome from "./components/HomePage/CustomerHome";
import FullProductSection from "./components/Home_Components/FullProductSection";
import ServicesSection from "./components/Home_Components/ServicesSection";
import Cart from "./components/Home_Components/Cart";
import CheckoutPage from "./components/Home_Components/CheckoutPage";
import Checkout from "./components/Home_Components/Checkout";
import MyOrders from "./components/Home_Components/MyOrders";
import EntrepreneurOrders from "./components/Tables/EntrepreneurOrders";
import Editpackage from "./components/Forms/Editpackage";
import EditPackage from "./components/Forms/Editpackage";
import PackageView from "./components/Home_Components/PackageView";
import PackageViewList from "./components/Home_Components/PackageViewList";
import { useState } from "react";
import Orders from "./components/Tables/Orders";
import ProductViewList from "./components/Home_Components/ProductViewList";
import SellerProductViewList from "./components/Tables/SellerProductViewList";
import ProviderPackageViewList from "./components/Tables/ProviderPackageViewList";

function App() {
  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("userdata")));
  const usertype = authenticated?.authid?.usertype;  // Add null checks here

  console.log("authenticated:", authenticated); 
  return (
    <BrowserRouter>
      <Routes>
        {usertype == null ? (
          <>
            <Route path="/" element={<CustomerHome />} />
            <Route path="/SignIn" element={<SigninPage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/ProviderSignup" element={<ProviderSignup />} />
            <Route path="/EntrepreneurSignup" element={<EntrepreneurSignup />} />
            <Route path="/Services" element={<ServicesSection />} />
            <Route path="/Products" element={<FullProductSection />} />
            <Route path="/PackageView" element={<PackageView />} />
            <Route path="/ProductViewList" element={<ProductViewList />} />
            <Route path="/PackageViewList" element={<PackageViewList />} />
            
          </>
        ) : usertype === 0 ? (
          <>
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/AddServiceProvider" element={<AddServiceProvider />} />
            <Route path="/EditServiceProvider" element={<EditServiceProvider />} />
            <Route path="/AddServices" element={<AddServices />} />
            <Route path="/EditServiceCategory" element={<EditServiceCategory />} />
          </>
        ) : usertype === 1 ? (
          <>
            <Route path="/ServiceProviderHome" element={<ServiceProviderHome />} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/AddPackage" element={<AddPackage />} />
            <Route path="EditPackage" element={<EditPackage />} />
            <Route path="/" element={<CustomerHome />} />
            <Route path="/Products" element={<FullProductSection />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/Services" element={<ServicesSection />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/PackageView" element={<PackageView />} />
            <Route path="/PackageViewList" element={<PackageViewList />} />
            <Route path="/ProductViewList" element={<ProductViewList />} />
            <Route path="/CustomerHome" element={<CustomerHome />} />
            <Route path="/ProviderPackageViewList" element={<ProviderPackageViewList />} />
          </>
        ) : usertype === 2 ? (
          <>
          
            <Route path="/EntrepreneurHome" element={<EntrepreneurHome />} />
            <Route path="/EntreprenurOrders" element={<EntrepreneurOrders />} />
            <Route path="/AddProduct" element={<AddProducts />} />
            <Route path="/EditProduct" element={<EditProduct />} />
            <Route path="/SellerProductViewList" element={<SellerProductViewList />} />
          </>
        ) : usertype === 3 ? (
          <>
            <Route path="/CustomerHome" element={<CustomerHome />} />
            <Route path="/Products" element={<FullProductSection />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/Services" element={<ServicesSection />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/PackageView" element={<PackageView />} />
            <Route path="/PackageViewList" element={<PackageViewList />} />
            <Route path="/ProductViewList" element={<ProductViewList />} />
          </>
        ) : (
          ""
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
