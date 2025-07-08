import "../Category/CAtegory.css";
import { useEffect, useState } from "react";
import apiConfig from "../../../utils/apiConfig";
const categoryEndpoint = "/api/category";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [modalTitle, setModalTitle] = useState("Add Category");

  const fetchCategories = () => {
    apiConfig.get(categoryEndpoint)
      .then(res => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setEditId(category._id);
    setCategoryName(category.categoryName);
    setModalTitle("Edit Category");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      apiConfig.delete(`${categoryEndpoint}/${id}`)
        .then(() => fetchCategories())
        .catch(err => console.error("Error deleting category:", err));
    }
  };

  const handleSave = () => {
    if (!categoryName.trim()) return alert("Category name cannot be empty");

    const payload = { categoryName };

    if (editId) {
      // Update existing
      apiConfig.put(`${categoryEndpoint}/${editId}`, payload)
        .then(() => {
          fetchCategories();
          handleCloseModal();
        })
        .catch(err => console.error("Error updating category:", err));
    } else {
      // Add new
      apiConfig.post(categoryEndpoint, payload)
        .then(() => {
          fetchCategories();
          handleCloseModal();
        })
        .catch(err => console.error("Error creating category:", err));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setCategoryName("");
    setModalTitle("Add Category");
  };

  const handleAddCategory = () => {
    setCategoryName("");
    setEditId(null);
    setModalTitle("Add Category");
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h4>{modalTitle}</h4>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
            <button onClick={handleSave}>{editId ? "Update" : "Add"}</button>
          </div>
        </div>
      )}

      <div className="category-container">
        <div className="category-header">
          <h3>Category List</h3> <div><button className="add-category-button" onClick={handleAddCategory}>+ Add Category</button></div>
          
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>{cat._id}</td>
                  <td>{cat.categoryName}</td>
                  <td className="action-icons">
                    <button id="EditBtn" onClick={() => handleEdit(cat)}>📝</button>
                    <button onClick={() => handleDelete(cat._id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Categories Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Category;
