const express = require('express');
const router = express.Router();
const entrepreneurController = require('../Controllers/entrepreneurController');


router.post('/AddProduct',entrepreneurController.addProduct );
router.get('/viewProducts',entrepreneurController.viewProducts );
router.get('/viewProductss',entrepreneurController.viewProductss );
router.get('/getProductDetails',entrepreneurController.getProductDetails );
router.post('/DeleteProduct',entrepreneurController.deleteProduct );
router.put('/updateProduct', entrepreneurController.updateProduct);
router.get('/getEntrepreneurOrders/:entrepreneurId', entrepreneurController.getEntrepreneurOrders);


router.get('/getProduct', entrepreneurController.getProductDetails);

module.exports = router;