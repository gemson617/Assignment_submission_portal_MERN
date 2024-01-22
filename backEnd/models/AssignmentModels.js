const mongoose = require('mongoose');



const assignmentSchema = new mongoose.Schema({
    name:String,
    assignedTo:String,
    dueDate:Date,
    status:Number,
    createdTime:Date
})

const assignmentModel = mongoose.model('assignment',assignmentSchema)

module.exports = assignmentModel