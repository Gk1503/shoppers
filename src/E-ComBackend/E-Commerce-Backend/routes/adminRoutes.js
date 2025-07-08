const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminControllers');


router.post('/', AdminController.createAdmin);
router.get('/', AdminController.getAdmin);
router.post('/login', AdminController.loginAdmin);
router.post('/update-password', AdminController.updatePassword);





module.exports = router;