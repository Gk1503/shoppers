const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const auth = require("../middeware/auth");

router.post("/", userController.createUser);
router.post("/updateprofile", auth, userController.updateProfile);
router.get("/",  userController.getUsers);
router.delete("/delete/:id",  userController.deleteUser);
router.post("/login", userController.checkLogin);
router.get('/Update',userController.getCustomerCount);

module.exports = router;
