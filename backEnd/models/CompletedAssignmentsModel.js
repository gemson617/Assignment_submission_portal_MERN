const mongoose = require('mongoose');
const AssignmentModel = require('./AssignmentModels'); // Adjust the path based on your file structure
const StudentModel = require('./StudentModel'); // Adjust the path based on your file structure



const completedAssignmentSchema = new mongoose.Schema({
    assignmentId    :   String,
    assignmentDetails: {
      type: AssignmentModel.schema,
    },
    studentId       :   String,
    studentDetails: {
      type: StudentModel.schema,
    },
    attachment      :   String,
    feedback        :   String,
    marks           :   String,
    is_evaluated    : {
        type    : Number,
        default : 0, // 1->evaluated, 0->not evaluated
    },
    status          :   String,
    submittedOn     :   Date
}, {
    timestamps  : true,
  })

const CompletedAssignmentModel = mongoose.model('completed_assignment',completedAssignmentSchema)

module.exports = CompletedAssignmentModel