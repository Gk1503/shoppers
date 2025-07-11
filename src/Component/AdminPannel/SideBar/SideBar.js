import "../SideBar/SideBar.css";

function SideBar({ setActivePage, activePage, admin, handleLogout }) {
  return (
    <div id="Sidebar">
      <div>
        <h3>Admin - Shop</h3>
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
        className={`sidebar-item ${
          activePage === "AddProduct" ? "active" : ""
        }`}
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

      {admin && (
        <div className="sidebar-item logout" onClick={handleLogout}>
          Logout
        </div>
      )}
    </div>
  );
}

export default SideBar;
