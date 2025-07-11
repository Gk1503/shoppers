const AdminDetails = require("../models/adminModel");



exports.createAdmin = async(req,res) => {

    try{
        const Admins = await AdminDetails.create(req.body);
    } catch(err) {
        res.status(400).json({error:err.message});
    }
};

exports.getAdmin = async (req,res) => {
    try{
        const Admins = await AdminDetails.find();
        res.json(Admins);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.loginAdmin = async (req, res) => {
  const { AdminEmail, AdminPassword } = req.body;

  try {
    const admin = await AdminDetails.findOne({ AdminEmail });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (admin.AdminPassword !== AdminPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json(admin); // You can return a token here if needed
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.updatePassword = async (req, res) => {
  const { AdminEmail, oldPassword, newPassword } = req.body;
  console.log("Backend Received :" , req.body);

  try {
    const admin = await AdminDetails.findOne({ AdminEmail });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.AdminPassword !== oldPassword) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    admin.AdminPassword = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
