const router = require("express").Router();
const { postMyMedi } = require("../controllers/postMyMediCtrl");

router.post("/myMedi", postMyMedi);

module.exports = router;
