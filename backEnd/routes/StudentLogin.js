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





router.post('/updateStudent', asyncHandler(async(req, res) => {
    const {email, password} = req.body;
  
    try {

        const studentExists = await studentModel.findOne({email:email});

        if(studentExists){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            console.log(hashedPassword);

            studentExists.email = email;
            studentExists.password = hashedPassword;

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
