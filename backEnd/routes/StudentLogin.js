const express = require('express')
const multer = require('multer');
const router = express.Router()
const AssignmentModel = require('../models/AssignmentModels')
const CompletedAssignmentModel = require('../models/CompletedAssignmentsModel')
const studentModel = require('../models/StudentModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
require('dotenv').config()
const {protect} = require('../middleware/AuthMiddleware')



router.get('/getStudent',protect, async(req, res) => {

  // const studentId = req.params.id;

  const student = req.student;
  const studentId = student._id;

  try {
        res.send({student:student});
  } catch (error) {

        console.error('Error fetching PDF:', error);
        res.status(500).send('can\'t get assignments..sorry Admin!');

  }

});



router.post('/updateStudent', asyncHandler(async(req, res) => {
    const {first_name, last_name, email, password} = req.body;
    // console.log('password : '+password);
  
    try {

        const studentExists = await studentModel.findOne({email:email});

        if(studentExists){

          let newPassword = '';

          if(password !== ''){
            const salt = await bcrypt.genSalt(10);
            newPassword = await bcrypt.hash(password,salt);
          }else{
            newPassword = studentExists.password;
          }


            studentExists.first_name = first_name;
            studentExists.last_name = last_name;
            studentExists.email = email;
            studentExists.password = newPassword;

            // Save the updated student
            await studentExists.save();

            res.status(200).json({msg:'Profile Updated Successfully',success:true})


        }else{
            res.status(404).json({msg:'Student Not Found'})
        }

        
    } catch (error) {
      res.status(500).json({"msg":'something went wrong on post...'})
    }
  
    }));



    router.post('/studentLogin', asyncHandler(async(req, res) => {
      const {email, password} = req.body;
      try {
  
          const studentExists = await studentModel.findOne({email:email});
  
          if(studentExists && (await bcrypt.compare(password,studentExists.password))){
              
            const tokenVal = generateToken(studentExists._id);            

            // localStorage.setItem('token', tokenVal);

              res.status(200).json({msg:'Loggeddd In Successfully!',success:true, token : tokenVal})
  
  
          }else{
              res.json({success:false,msg:'Email or Password is Incorrect'})
          }
  
          
      } catch (error) {
        res.status(500).json({"msg":'something went wrong...'})
      }
    
      }));



      const generateToken = (id) =>{
        return jwt.sign({id},process.env.JWT_SECRET,{
          expiresIn:'30d',
        })
      }
    

    module.exports = router
