const express = require('express');
const router = express.Router();
const controller  = require('../controllers/product');

router.get('/', controller.getproducts);
router.get('/:id', controller.getoneproduct);
router.post('/', controller.newproduct);
router.put('/:id', controller.updateproduct);
router.delete('/:id', controller.deleteproduct);


module.exports = router;
