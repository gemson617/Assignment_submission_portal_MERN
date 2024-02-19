const express = require('express')
const studentModel = require('../models/StudentModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
require('dotenv').config()


const protect = asyncHandler(async (req,res,next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

       try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.student = await studentModel.findById(decoded.id).select('-password')

            next();
       } catch (error) {
            
            res.status(401)
            throw new Error('Not Authorized!')
       }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No token!')
    }   
})

module.exports = {protect}