const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({
    dNo         : String,
    name        : String,
    classes     : String,
    section     : String,
    status      : {
      type: Number,
      default: 1,
    },
  }, {
    timestamps  : true,
  });

const studentModel = mongoose.model('student',studentSchema)

module.exports = studentModel