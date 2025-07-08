const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsControllers');

router.post('/',productController.createProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getproducts);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router;