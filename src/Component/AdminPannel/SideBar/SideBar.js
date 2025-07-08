import "../SideBar/SideBar.css";

function SideBar({ setActivePage, activePage }) {
  return (
    <div id="Sidebar">
      {/* Replace image logo with text */}
      <div className="sidebar-logo-text">
        <h1>GK Shopping</h1>
      </div>

      <div
        className={`sidebar-item ${activePage === "dashboard" ? "active" : ""}`}
        onClick={() => setActivePage("dashboard")}
      >
        Dashboard
      </div>

      <div
        className={`sidebar-item ${activePage === "orders" ? "active" : ""}`}
        onClick={() => setActivePage("orders")}
      >
        Orders
      </div>

      <div
        className={`sidebar-item ${activePage === "AddProduct" ? "active" : ""}`}
        onClick={() => setActivePage("AddProduct")}
      >
        Product
      </div>
      <div
        className={`sidebar-item ${activePage === "Category" ? "active" : ""}`}
        onClick={() => setActivePage("Category")}
      >
        Category
      </div>

      <div
        className={`sidebar-item ${activePage === "customers" ? "active" : ""}`}
        onClick={() => setActivePage("customers")}
      >
        Customers
      </div>

      <div
        className={`sidebar-item ${activePage === "settings" ? "active" : ""}`}
        onClick={() => setActivePage("settings")}
      >
        Settings
      </div>
      

    </div>
  );
}

export default SideBar;
