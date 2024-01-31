const mongoose = require('mongoose');



const completedAssignmentSchema = new mongoose.Schema({
    assignmentId    :   String,
    studentId       :   String,
    attachment      :   String,
    comments        :   String,
    submittedOn     :   Date
}, {
    timestamps  : true,
  })

const CompletedAssignmentModel = mongoose.model('completed_assignment',completedAssignmentSchema)

module.exports = CompletedAssignmentModel