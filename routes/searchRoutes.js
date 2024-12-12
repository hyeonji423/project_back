const express = require("express");
const router = express.Router();
const {
  searchMediInfo,
  getMediInfo,
} = require("../controllers/getMediInfoCtrl");

// router.get("/search", searchMediInfo);
router.get("/info", getMediInfo);

module.exports = router;
