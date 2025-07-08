import React, { useState } from "react";
import "../AdminPannel/Admin.css";
import SideBar from "../AdminPannel/SideBar/SideBar";
import Dashboard from "../AdminPannel/Dashboard/Dashboard";
import Orders from "../AdminPannel/Orders/Orders";
import Customers from "../AdminPannel/Customers/Customers";
import Settings from "../AdminPannel/Settings/Settings";
import ATP from "./AddToProducts/ATP";
import Category from "./Category/Category";
import TopBar from "../AdminPannel/TopBar/TopBar";

function Admin() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    if (activePage === "dashboard") {
      return <Dashboard />;
    } else if (activePage === "orders") {
      return <Orders />;
    } else if (activePage === "customers") {
      return <Customers />;
    } else if (activePage === "settings") {
      return <Settings />;
    } 
    else if (activePage === "AddProduct"){
      return <ATP/>
    }
    else if (activePage === "Category"){
      return <Category/>
    }
    else {
      return <Dashboard />; // fallback
    }
  };

  return (
    <div id="mainAdmin" style={{ display: "flex" }}>
      <SideBar setActivePage={setActivePage} activePage={activePage} />
      <div style={{ flex: 1 }}>
        <TopBar id="Topbar" />
        {renderPage()}
      </div>
    </div>
  );
}

export default Admin;
