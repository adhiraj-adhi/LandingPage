const { Router } = require("express");
const router = Router();
// before hoisting please set token and cookie to secure connection only in login__post() method and also set IETE mail for sending mail
const { get__landing, register__post, login__post, resend__code, verifier__controller, home__Page } = require("../controllers/controller");


// ================== landing page related routings ===================
router.route("/").get(get__landing);
router.route("/register__post").post(register__post);
router.route("/login__post").post(login__post);
router.route("/resend__code").post(resend__code);
router.route("/userVerified/:token").get(verifier__controller)

// before hoisting please set token and cookie to secure connection only in login__post() method and also set IETE mail for sending mail

router.route("/mainPage").get(home__Page);

module.exports = router;

