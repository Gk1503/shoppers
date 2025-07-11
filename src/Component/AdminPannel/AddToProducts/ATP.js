import "../AddToProducts/ATP.css";
import apiConfig from "../../../utils/apiConfig";
import { getproducts } from "../../../utils/constant";
import { useEffect, useState } from "react";

function ATP() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productCategory: "",
    productTitle: "",
    productDescription: "",
    productOrginalAmount: "",
    productAmount: "",
    productOffer: ""
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

  const fetchProducts = () => {
    apiConfig.get(getproducts)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.log("Failed to fetch details");
        }
      })
      .catch((error) => console.error("Error Fetching Products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      productCategory: "",
      productTitle: "",
      productDescription: "",
      productOrginalAmount: "",
      productAmount: "",
      productOffer: ""
    });
    setFile(null);
    setPreviewUrl(null);
    setEditProductId(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("productImage", file);
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    if (editProductId) {
      apiConfig.put(`/api/products/${editProductId}`, data, config)
        .then(() => {
          fetchProducts();
          handleCloseModal();
        }).catch((err) => console.error("Error Updating Product:", err));
    } else {
      apiConfig.post('/api/products', data, config)
        .then(() => {
          fetchProducts();
          handleCloseModal();
        }).catch((err) => console.error("Error Creating Product:", err));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      productCategory: product.productCategory,
      productTitle: product.productTitle,
      productDescription: product.productDescription,
      productOrginalAmount: product.productOrginalAmount,
      productAmount: product.productAmount,
      productOffer: product.productOffer
    });
    setEditProductId(product._id);
    setPreviewUrl(product.productImage); // Show existing image
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      apiConfig.delete(`/api/products/${id}`)
        .then(() => fetchProducts())
        .catch((err) => console.error("Error Deleting Product:", err));
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content3" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h4>{editProductId ? "Edit Product" : "Add Product"}</h4>
            <input type="file" onChange={handleFileChange} required={!editProductId} />
            {previewUrl && (
              <img src={previewUrl} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />
            )}
            <input type="text" name="productCategory" placeholder="Category" value={formData.productCategory} onChange={handleInputChange} />
            <input type="text" name="productTitle" placeholder="Title" value={formData.productTitle} onChange={handleInputChange} />
            <textarea name="productDescription" placeholder="Description" value={formData.productDescription} onChange={handleInputChange}></textarea>
            <input type="text" name="productOrginalAmount" placeholder="Original Amount" value={formData.productOrginalAmount} onChange={handleInputChange} />
            <input type="text" name="productAmount" placeholder="Discounted Amount" value={formData.productAmount} onChange={handleInputChange} />
            <input type="text" name="productOffer" placeholder="Offer %" value={formData.productOffer} onChange={handleInputChange} />
            <button onClick={handleSubmit}>{editProductId ? "Update" : "Add"}</button>
          </div>
        </div>
      )}

      <div id="orderlist2">
        <div className="list-header">
          <h3>Product List</h3>
          <div className="tabs">
            <button id="AddProductButton" onClick={() => setShowModal(true)}>Add Product</button>
          </div>
        </div>
        <table className="styled-table">
          <thead>
            <tr id="tr">
              <th>No.</th>
              <th>Product ID</th>
              <th>Category</th>
              <th>Title</th>
              <th>Original Amount</th>
              <th>Amount</th>
              <th>Offer</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr id="pd" key={product._id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>{product._id}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.productTitle}</td>
                  <td>{product.productOrginalAmount}</td>
                  <td>{product.productAmount}</td>
                  <td>{product.productOffer}</td>
                  <td>
                    <img src={product.productImage} alt="product" width="50" />
                  </td>
                  <td className="action-icons">
                    <button id="EditBtn" onClick={() => handleEdit(product)}>📝</button>
                    <button onClick={() => handleDelete(product._id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9">No Products Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ATP;
