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
    submittedOn     :   Date
}, {
    timestamps  : true,
  })

const CompletedAssignmentModel = mongoose.model('completed_assignment',completedAssignmentSchema)

module.exports = CompletedAssignmentModel