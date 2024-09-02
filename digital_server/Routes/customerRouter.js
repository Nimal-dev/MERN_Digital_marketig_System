const express = require('express');
const router = express.Router();
const customerController = require('../Controllers/customerController');

router.post('/AddCart', customerController.addToCart);
router.get('/getCart/:customerId', customerController.getCart);
router.delete('/removeFromCart/:customerId/:itemId/:isPackage', customerController.removeFromCart); 


// ----------Order placing ----------------
router.post('/removeFromCart/:customerId/:productId', customerController.removeFromCart);
router.post('/placeOrder', customerController.placeOrder);
router.post('/verify', customerController.verify);
// router.get('/getOrders/:customerId', customerController.getOrders);
router.post('/updatePaymentStatus/:customerId', customerController.updatePaymentStatus);
router.get('/getOrders/:customerId', customerController.getOrders);
router.post('/getOrdersByProvider', customerController.getOrdersByProvider);
router.post('/getOrdersBySeller', customerController.getOrdersBySeller);







router.post('/addReview', customerController.addReview); // New route for adding reviews
router.post('/addPackageReview', customerController.addPackageReview); // New route for adding reviews for packages
router.get('/getReviews/:productId', customerController.getReviews); // New route for fetching reviews
router.get('/getPackageReviews/:packageId', customerController.getPackageReviews); // New route for fetching reviews


module.exports = router;
