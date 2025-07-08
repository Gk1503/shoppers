import './App.css';
import Home from './Component/Homepage/Home';
import Login from './Component/Header/headder1/Login/Login';
import Checkout from './Component/Checkout/Checkout';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductView from './Component/ProductView/ProductView';
import Admin from './Component/AdminPannel/Admin';


function App() {
  return (
  //  <Home/>
  <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/Checkout" element={<Checkout/>}></Route>
  <Route path="/ProductView" element={<ProductView/>}></Route>
  <Route path="/admin" element={<Admin/>}></Route>
 
</Routes>
  );
}

export default App;
