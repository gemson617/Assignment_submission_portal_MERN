const mongoose = require('mongoose');
const AssignmentModel = require('./AssignmentModels'); // Adjust the path based on your file structure



const completedAssignmentSchema = new mongoose.Schema({
    assignmentId    :   String,
    assignmentDetails: {
      type: AssignmentModel.schema,
    },
    studentId       :   String,
    attachment      :   String,
    comments        :   String,
    marks           :   String,
    status          :   String,     //1-> evaluated, 2->not evaluated
    submittedOn     :   Date
}, {
    timestamps  : true,
  })

const CompletedAssignmentModel = mongoose.model('completed_assignment',completedAssignmentSchema)

module.exports = CompletedAssignmentModel