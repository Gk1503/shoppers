import "../Orders/Orders.css";
import TopBar from "../TopBar/TopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightDots, faStar, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../../utils/apiConfig";
import { getOrder } from "../../../utils/constant";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    apiConfig
      .get(getOrder)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
  }, []);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSaveOrder = () => {
    if (!selectedOrder?.OrderStatus) return alert("Please select a status");

    apiConfig
      .put(`/api/orders/${selectedOrder._id}`, selectedOrder)
      .then((res) => {
        const updatedOrders = orders.map((o) =>
          o._id === res.data._id ? res.data : o
        );
        setOrders(updatedOrders);
        setShowModal(false);
      })
      .catch((err) => {
        alert("Failed to update order");
        console.error(err);
      });
  };

  const handleDeleteOrder = (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    apiConfig
      .delete(`/api/orders/${id}`)
      .then(() => {
        const filtered = orders.filter((o) => o._id !== id);
        setOrders(filtered);
        setShowModal(false);
      })
      .catch((err) => {
        alert("Failed to delete order");
        console.error(err);
      });
  };

  return (
    <>
      <div id="row1">
        <div id="TotalOrder2">
          <label>TOTAL ORDER</label>
          <span id="to">
            <FontAwesomeIcon icon={faArrowUpRightDots} /> + 16.24 %
          </span>
          <br />
          <label id="Ton">{orders.length}</label>
          <br />
          <label className="des">View all orders</label>
          <span className="symbol">
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>

        <div id="completedOrders">
          <label>COMPLETED ORDERS </label>
          <span id="CO">
            <FontAwesomeIcon icon={faArrowUpRightDots} /> + 16.24 %
          </span>
          <br />
          <label id="Ten">
            {
              orders.filter(
                (order) =>
                  order.OrderStatus &&
                  order.OrderStatus.toLowerCase() === "completed"
              ).length
            }
          </label>
          <br />
          <label className="des">View net earnings</label>
          <span className="symbol">
            <FontAwesomeIcon icon={faWallet} />
          </span>
        </div>

        <div id="PendingOrders">
          <label>PENDING ORDERS</label>
          <span id="tc">
            <FontAwesomeIcon icon={faArrowUpRightDots} style={{ color: "red" }} /> - 2.3 %
          </span>
          <br />
          <label id="Tcn">
            {
              orders.filter(
                (order) =>
                  order.OrderStatus &&
                  order.OrderStatus.toLowerCase() === "processing"
              ).length
            }
          </label>
          <br />
          <label className="des">See Details&nbsp;&nbsp;&nbsp;</label>
          <span className="symbol">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </div>

      <div id="orderlist2">
        <div className="list-header">
          <h3>Order List</h3>
          <div className="tabs">
            <span className="active2">Monthly</span>
            <span>Weekly</span>
            <span>Today</span>
          </div>
        </div>
        <table className="styled-table">
          <thead>
            <tr id="trth">
              <th>No.</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr id="tbody" key={order._id}>
                <td>{String(index + 1).padStart(2, "0")}</td>
                <td>
                  {order?.AddressDetails?.FirstName || "NA"}{" "}
                  {order?.AddressDetails?.LastName || ""}
                </td>
                <td>{order?.AddressDetails?.PhoneNO || "NA"}</td>
                <td>₹{order?.CartItemTotal || 0}</td>
                <td>
                  <span
                    className={`status ${order.OrderStatus?.toLowerCase() || "unknown"}`}
                  >
                    {order.OrderStatus || "Unknown"}
                  </span>
                </td>
                <td className="action-icons">
                  <span role="button" onClick={() => handleEditClick(order)}>📝</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Order Status</Form.Label>
            <Form.Select
              value={selectedOrder?.OrderStatus || ""}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder,
                  OrderStatus: e.target.value,
                })
              }
            >
              <option value="">Select Status</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteOrder(selectedOrder._id)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveOrder}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Orders;
