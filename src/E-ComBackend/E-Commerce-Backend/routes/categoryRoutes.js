const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/',categoryController.createCategory);
router.get('/',categoryController.getCategory);
router.get('/:id',categoryController.getcategory);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);


module.exports = router;