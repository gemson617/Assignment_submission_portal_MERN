const express = require('express')
const router = express.Router()
const AssignmentModel = require('../models/AssignmentModels')

//get all Friendss
router.get('/', async(req, res) => {
  
    // return res.status(200).send({msg:'Success...'})

    try {
      const allAassignments = await AssignmentModel.find()
    //   if(allAassignments.length<1){
    //    return res.json({msg:'no Friends available...'})
    //   }else{
        return res.json(allAassignments)
    //   }
      
    } catch (error) {
      res.status(500).send({msg:'something went wrong dude...'})
    }
  });



  router.post('/addAssignment', async(req, res) => {
    const newAssignment = req.body;
  console.log(newAssignment)
  
    try {
        const Assignment =await AssignmentModel.insertMany(newAssignment);
        res.json(Assignment)
    } catch (error) {
      res.status(500).json({"msg":'something went wrong on post...'})
    }
  
    });

  module.exports = router