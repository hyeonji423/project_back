const router = require("express").Router();
const { postAuth, postLogin } = require("../controllers/postAuthCtrl");
const upload = require("./upload");

router.post("/register", upload.single("profile_img"), postAuth);
router.post("/login", postLogin);


module.exports = router;
