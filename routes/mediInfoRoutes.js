const express = require("express");
const router = express.Router();
const getMediInfoCtrl = require("../controllers/getMediInfoCtrl");

router.get("/api/mediinfo/:id", getMediInfoCtrl.getMediInfoById);

module.exports = router;
