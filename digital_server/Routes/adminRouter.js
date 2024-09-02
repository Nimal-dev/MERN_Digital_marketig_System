const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Define your routes here
// router.post('/AddState', adminController.addState);
// router.get('/viewstate', adminController.viewstate);
// router.post('/deleteState', adminController.deleteState);

router.get('/viewServiceProviders', adminController.viewServiceProviders);
router.post('/deleteServiceProvider', adminController.deleteServiceProvider);


router.post('/AddServiceProvider', adminController.AddServiceProvider);
router.post('/updateServiceProviderById', adminController.updateServiceProviderById);
router.post('/editAndUpdateServiceProvider', adminController.editAndUpdateServiceProvider);


router.post('/AddServices', adminController.AddServices);
router.get('/viewServices', adminController.viewServices);
router.post('/updateServiceById', adminController.updateServiceById);
router.post('/editAndUpdateServiceCategory', adminController.editAndUpdateServiceCategory);
router.post('/deleteService', adminController.deleteService);

// Customers Rouutes
router.get('/viewcustomers', adminController.viewcustomers);



// Entrepreneurs Rouutes
router.get('/viewentrepreneurs', adminController.viewEntrepreneurs);
router.get('/vieworder', adminController.vieworders);

// router.post('/updateVolunteerById', adminController.UpdateVolunteer);;
// router.post('/editAndUpdateVolunteer', adminController.editAndUpdateVolunteer);
// router.get('/viewvolunteer', adminController.viewvolunteer);
// router.post('/AddVolunteer', adminController.AddVolunteer);
// router.post('/deleteVolunteer', adminController.deleteVolunteer);

module.exports = router;
