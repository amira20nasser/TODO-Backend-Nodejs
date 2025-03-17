const TODO = require("../models/todo.model")

const addTODO = async (req,res) => {
    console.log("Adding To Do....");
    console.log(req.userId);
    
    try{
        const { title, description, status } = req.body;
        const newTODO = await TODO.create({
            title,
            description,
            status,
            userId: req.userId
            
        })
        return res.status(201).send({
            "success": true,
            "message": "Todo added successfully",
            "todo": {
                id: newTODO._id,
                title: newTODO.title,
                description: newTODO.description,
                status: newTODO.status,
                userId: newTODO.userId
              },
        });
    }catch(error){
        return res.status(500).json(error);
    }
}

const changeStatus = async (req,res)=>{
    try {
        const {id} = req.query.id
        const todo =  TODO.findById(id)
        if (!todo) {
         return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        if (todo.userId.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        todo.status = !todo.status;
        await todo.save();
        return res.status(200).json({ 
            success: true,
            message: 'Todo status updated successfully'
         });

    }catch(err){
        return res.status(500).json(err);
    }
}

const deleteToDo = async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await TODO.findById(id);
      if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
      if (todo.userId.toString() !== req.userId) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      
      await TODO.findByIdAndDelete(id);
      
      return res.status(200).json(
        { 
            success: true, 
            message: 'Todo deleted successfully' 
        }
      );
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = {addTODO,changeStatus,deleteToDo}