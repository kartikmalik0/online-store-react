import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Order from "./pages/order/Order";
import PropTypes from 'prop-types';
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AllProducts from "./pages/allproducts/AllProducts";
export default function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteAdmin>
              <Dashboard />
            </ProtectedRouteAdmin>
          } />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/updateproduct" element={<UpdateProduct/>}/>
          <Route path="/productinfo/:id" element={<ProductInfo/>}/>
          <Route path="/allproducts" element={<AllProducts/>}/>
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

//user
export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login' } replace={'true'}/>
  }
}

export const ProtectedRouteAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'))

  if(admin.user.email === 'test5@gmail.com'){
    return children
  }else{
    return <Navigate to={'/login'} replace={'true'}/>
  }
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
ProtectedRouteAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};