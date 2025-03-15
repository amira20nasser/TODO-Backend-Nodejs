const mongoose = require("mongoose")

const todoScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
    

},{ timestamps: true })

module.exports = mongoose.model("todos", todoScheme);