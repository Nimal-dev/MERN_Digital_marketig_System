const express = require('express');
const router = express.Router();
const providerController = require('../Controllers/serviceProviderController');


router.post('/AddPackage', providerController.AddPackage);
router.get('/viewPackages', providerController.viewPackages);
router.get('/viewProviders', providerController.viewProviders);
router.get('/getPackageDetails', providerController.getPackageDetails);
router.post('/deletePackage', providerController.deletePackage);
router.post('/updatePackageById', providerController.updatePackageById);
router.post('/updatePackage', providerController.updatePackage);


module.exports = router