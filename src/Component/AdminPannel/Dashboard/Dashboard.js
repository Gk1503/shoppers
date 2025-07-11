import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import TopBar from "../TopBar/TopBar";
import Graph1 from "../../Images/Graph1.png";
import Graph2 from "../../Images/Graph2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faStar,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../../utils/apiConfig";
import { getCustomerCount, getOrder } from "../../../utils/constant";

function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    apiConfig.get(getCustomerCount).then((res) => {
      setCustomerCount(res.data.count);
    });

    apiConfig.get(getOrder).then((res) => {
      const orders = res.data;
      const earnings = orders.reduce(
        (total, order) => total + (order.CartItemTotal || 0),
        0
      );
      setTotalEarnings(earnings);
      setOrderCount(orders.length);
    });
  }, []);

  const orderList = [
    {
      id: 1,
      productId: "#12987B",
      date: "Jan 24th, 2021",
      customer: "Roberto Carlo",
      amount: "$34.56",
      status: "Complete",
    },
    {
      id: 2,
      productId: "#4935A3",
      date: "Jan 24th, 2021",
      customer: "Dianne Rialis",
      amount: "$21.22",
      status: "Pending",
    },
    {
      id: 3,
      productId: "#432333",
      date: "Jan 26th, 2021",
      customer: "Oskar Ramos",
      amount: "$36.74",
      status: "Cancelled",
    },
  ];

  const productList = [
    {
      id: 1,
      productId: "#12987B",
      type: "Cloth",
      vendor: "Roberto Carlo",
      price: "$34.56",
    },
    {
      id: 2,
      productId: "#4935A3",
      type: "Food",
      vendor: "Dianne Rialis",
      price: "$21.22",
    },
    {
      id: 3,
      productId: "#432333",
      type: "Furniture",
      vendor: "Oskar Ramos",
      price: "$36.74",
    },
  ];

  useEffect(() => {
    apiConfig.get(getCustomerCount).then((res) => {
      setCustomerCount(res.data.count);
    });
  }, []);

  return (
    <>
      {/* <TopBar/> */}
      <div id="maindasboard">
        <div id="row1">
          <div id="TotalOrder">
            <label>TOTAL ORDER</label>
            <span id="to">
              <FontAwesomeIcon icon={faArrowUpRightDots} />+ 16.24 %
            </span>
            <br></br>
            <label id="Ton">{orderCount}</label>
            <br></br>
            <label className="des">View all orders</label>
            <span className="symbol">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <div id="TotalCustomer">
            <label>TOTAL CUSTOMERS</label>
            <span id="tc">
              <FontAwesomeIcon
                icon={faArrowUpRightDots}
                style={{ color: "red" }}
              />{" "}
              - 2.3 %
            </span>
            <br />
            <label id="Tcn">{customerCount}</label>
            <br></br>
            <label className="des">See Details&nbsp;&nbsp;&nbsp;</label>
            <span className="symbol">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div id="TotalEarning">
            <label>TOTAL EARNINGS</label>
            <span id="te">
              <FontAwesomeIcon icon={faArrowUpRightDots} /> + 16.24 %
            </span>
            <br />
            <label id="Ten">₹{totalEarnings.toLocaleString()}</label>
            <br></br>
            <label className="des">View net earnings</label>
            <span className="symbol">
              <FontAwesomeIcon icon={faWallet} />
            </span>
          </div>
          <div id="FinalBalance">
            <label>FINAL BALANCE</label>
            <span id="fb">
              <FontAwesomeIcon
                icon={faArrowUpRightDots}
                style={{ color: "red" }}
              />{" "}
              - 2.3 %
            </span>
            <br />
            <label id="Fbn">$ 330M</label>
            <br></br>
            <label className="des">See details</label>
            <span className="symbol">
              <FontAwesomeIcon icon={faWallet} />
            </span>
          </div>
        </div>
        <div id="row2">
          <div id="Revenue">
            <img id="Graph1" src={Graph1} />
          </div>
          <div id="CustomerReview">
            <img id="Graph2" src={Graph2} />
          </div>
        </div>

        <div id="row3">
          <div id="orderlist">
            <div className="list-header">
              <h3>Order List</h3>
              <div className="tabs">
                <span className="active">Monthly</span>
                <span>Weekly</span>
                <span>Today</span>
              </div>
            </div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  <th>Status Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <tr key={order.id}>
                    <td>{String(index + 1).padStart(2, "0")}</td>
                    <td>{order.productId}</td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="action-icons">📝 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div id="productlist">
            <div className="list-header">
              <h3>Products List</h3>
              <div className="sort-by">
                Sort by: <strong>Last 7 Days</strong>
              </div>
            </div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product ID</th>
                  <th>Product Type</th>
                  <th>Vendor</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={product.id}>
                    <td>{String(index + 1).padStart(2, "0")}</td>
                    <td>{product.productId}</td>
                    <td>{product.type}</td>
                    <td>{product.vendor}</td>
                    <td>{product.price}</td>
                    <td className="action-icons">📝 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
