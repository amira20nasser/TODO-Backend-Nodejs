
const getToDoById = async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await TODO.findById(todoId);
      if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }      
      if (todo.userId.toString() !== req.userId) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      
      return res.status(200).json({
        success: true,
        todo: {
          id: todo._id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          userId: todo.userId
        }
      });
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllToDos = async (req, res) => {
    try {
      const todos = await TODO.find({ userId: req.userId })
      if (!todos) {
        return res.status(404).json({ success: false, message: 'You don\'t have todos' });
      }      
      const mappedTodos = todos.map(todo => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        userId: todo.userId
      }))
      
      return res.status(200).json({ success: true, todos: mappedTodos })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getRemainTodos = async (req, res) => {
    try {
      const remainingTodos = await TODO.find({ userId: req.userId, status: false });
      
      const mappedTodos = remainingTodos.map(todo => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        userId: todo.userId
      }));
      
      return res.status(200).json({ success: true, remainingTodos: mappedTodos });
    } catch (error) {
        return res.status(500).json(error)
    }
  }
  
module.exports = {getToDoById,getAllToDos,getRemainTodos}