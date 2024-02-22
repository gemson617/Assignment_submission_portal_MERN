const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({
    dNo         : String,
    first_name  : String,
    last_name   : String,
    classes     : String,
    section     : String,
    email       : String,
    password    : String,
    status      : {
      type: Number,
      default: 1,
    },
  }, {
    timestamps  : true,
  });

const studentModel = mongoose.model('student',studentSchema)

module.exports = studentModel