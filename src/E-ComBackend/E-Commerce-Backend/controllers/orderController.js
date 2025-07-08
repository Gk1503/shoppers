const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  console.log("Received Order Body:", req.body);
  try {
    const {
      AddressDetails: AddressDetails,
      CartDetails,
      CartItemSubTotal,
      CartItemTotal,
      CartPaymentStatus,
      OrderStatus
    } = req.body;

    if (!AddressDetails || !CartDetails) {
      return res.status(400).json({ error: "AddressDetails and CartDetails are required." });
    }

    const order = await Order.create({
      AddressDetails,
      CartDetails,
      CartItemSubTotal,
      CartItemTotal,
      CartPaymentStatus,
      OrderStatus
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
