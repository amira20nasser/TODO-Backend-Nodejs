const {Router} = require("express")
const router = Router();
const controller = require("../controllers/auth.controller");
require("dotenv").config()

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.get("/signout", controller.signOut);

module.exports = router;