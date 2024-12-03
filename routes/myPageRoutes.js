const router = require("express").Router();
const { getMyMedi } = require("../controllers/getMyMediCtrl");
const { postMyMedi } = require("../controllers/postMyMediCtrl");

router.post("/myMedi", postMyMedi);
router.get("/myMediList/:user_id", getMyMedi); // :userId는 다이나믹한 문자열의 이름을 지정할 때 앞에 콜론을 사용

module.exports = router;
