const mongoose = require('mongoose');



const assignmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    classes: String,
    section: String,
    dueDate: Date,
    notes: String,
    status: {
      type: Number,
      default: 1,
    },
  }, {
    timestamps: true,
  });

const assignmentModel = mongoose.model('assignment',assignmentSchema)

module.exports = assignmentModel