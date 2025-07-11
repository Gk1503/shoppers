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
import { useNavigate } from "react-router-dom";

function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdmin(null);
    navigate("/"); // navigate to home on logout
  };

  const renderPage = () => {
    if (activePage === "dashboard") return <Dashboard />;
    if (activePage === "orders") return <Orders />;
    if (activePage === "customers") return <Customers />;
    if (activePage === "settings") return <Settings />;
    if (activePage === "AddProduct") return <ATP />;
    if (activePage === "Category") return <Category />;
    return <Dashboard />;
  };

  return (
    <div id="mainAdmin" style={{ display: "flex", flexDirection: "column" }}>
      {/* Pass admin + logout handler */}
      {!admin ? (
        <TopBar setAdmin={setAdmin} />
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <SideBar
              setActivePage={setActivePage}
              activePage={activePage}
              admin={admin}
              handleLogout={handleLogout}
            />
            <div style={{ flex: 1 }}>{renderPage()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
