const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.createUser = async(req,res) => {
//   try{
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   }catch(err) {
//     res.status(400).json({error:err.message});
//   }
// }


exports.createUser = async (req, res) => {
  try {
    const { Email, Password, ConfirmPassword, Name, MobileNo } = req.body;
    console.log("Backend Recived :" , req.body);

    // Field validation
    if (!Email || !Password || !ConfirmPassword || !Name || !MobileNo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      Name,
      MobileNo,
      Email,
      Password ,
      ConfirmPassword,
    });

    const token = jwt.sign({ userID: user._id, Email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};



exports.checkLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userID: user._id, Email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { Email, MobileNo, Password, ConfirmPassword } = req.body;
    console.log("Backend Received:", req.body);

    if (!Email || !MobileNo || !Password || !ConfirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.MobileNo = MobileNo;
    user.Password = Password;
    user.ConfirmPassword = ConfirmPassword;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCustomerCount = async(req,res) => {
  try{
    const count = await User.countDocuments();
    res.json({count});
  } catch(err){
    res.status(500).json({error: err.message});
  }
};


