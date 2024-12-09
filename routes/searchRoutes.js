const express = require('express');
const router = express.Router();
const getMediInfoCtrl = require('../controllers/getMediInfoCtrl');

router.get('/search', getMediInfoCtrl.searchMediInfo);

module.exports = router;
