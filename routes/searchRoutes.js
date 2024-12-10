const express = require("express");
const router = express.Router();
const { searchMediInfo } = require("../controllers/getMediInfoCtrl");

router.get("/search", searchMediInfo);

module.exports = router;
