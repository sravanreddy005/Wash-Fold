const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');
const WebController = require('../controllers/WebController');

//Manage Authentication
router.post('/addContactInfo', WebController.addContactInfo);
router.post('/getBranches', AdminController.getBranches);


module.exports = router;