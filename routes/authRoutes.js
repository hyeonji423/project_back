const router = require("express").Router();
const { postAuth, postLogin, sendEmailVerification, findPwd, resetPwd } = require("../controllers/postAuthCtrl");
const { updateAuth } = require("../controllers/updateAuthCtrl");
const { deleteAuth } = require("../controllers/deleteAuthCtrl");
const upload = require("./upload");

router.post("/register", upload.single("profile_img"), postAuth);
router.post("/login", postLogin);
router.post("/emailVerification", sendEmailVerification);
router.put("/update_user/:id", updateAuth);
router.delete("/delete_user/:id", deleteAuth);
router.post("/find_pwd", findPwd);
router.post("/reset_pwd", resetPwd);

module.exports = router;
