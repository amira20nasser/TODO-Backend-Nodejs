const {Router} = require("express")
const router = Router();
const controller = require("../controllers/todo.controller");
const {authentication} = require("../middlewares/auth.middleware")

router.post("/add-todo",authentication,controller.addTODO)
router.put("/change-status",authentication,controller.changeStatus)
router.delete("/delete-todo",authentication,controller.deleteToDo)

router.get("/getById",authentication,controller.getToDoById)
router.get("/get-todos",authentication,controller.getAllToDos)
router.get("/get-remain-todo",authentication,controller.getRemainTodos)

module.exports = router