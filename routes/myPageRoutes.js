const router = require("express").Router();
const { postMyMedi } = require("../controllers/postMyMedi");

router.post("/myMedi", postMyMedi);

module.exports = router;
