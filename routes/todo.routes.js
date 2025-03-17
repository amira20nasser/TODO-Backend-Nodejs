const {Router} = require("express")
const router = Router();
const controller = require("../controllers/todo.controller");
const {authentication} = require("../middlewares/auth.middleware")

router.post("/add-todo",authentication,controller.addTODO)
router.put("/change-status",authentication,controller.changeStatus)
router.delete("/delete-todo",authentication,controller.deleteToDo)

module.exports = router
