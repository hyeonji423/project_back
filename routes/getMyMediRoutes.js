const router = require('express').Router(); // express 모듈에서 Router 클래스 import
const { getMyMedi } = require("../controllers/getMyMediCtrl");

router.get("/getMyMedi/:user_id", getMyMedi); // :userId는 다이나믹한 문자열의 이름을 지정할 때 앞에 콜론을 사용

module.exports = router;