const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/',cartController.createCart);
router.get('/',cartController.getCart);
router.get('/:id',cartController.getCarts);
router.put('/:id',cartController.updateCart);
router.delete('/delete/:id',cartController.deleteCart);
router.put("/update/:id",cartController.updateCartQuantity);


module.exports = router;

