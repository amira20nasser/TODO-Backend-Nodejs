
const {Router} = require("express")
const router = Router();
const controller = require("../controllers/userFunction.controller");
const {authentication} = require("../middlewares/auth.middleware")

router.get("/getById",authentication,controller.getToDoById)
router.get("/get-todos",authentication,controller.getAllToDos)
router.get("/get-remain-todo",authentication,controller.getRemainTodos)

module.exports = router