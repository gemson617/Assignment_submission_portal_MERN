const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({
    dNo         :String,
    name        : String,
    // description : String,
    classes     : String,
    section     : String,
    // dueDate     : Date,
    // notes       : String,
    status      : {
      type: Number,
      default: 1,
    },
  }, {
    timestamps  : true,
  });

const studentModel = mongoose.model('student',studentSchema)

module.exports = studentModel