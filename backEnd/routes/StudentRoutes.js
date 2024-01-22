const express = require('express')
const multer = require('multer');
const router = express.Router()
const AssignmentModel = require('../models/AssignmentModels')
const CompletedAssignmentModel = require('../models/CompletedAssignmentsModel')


// Set up multer storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"./files");
  },
  filename:function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
})

const upload = multer({ storage: storage });



//get all Friendss
router.post('/submitAssignment', upload.single('file'), async(req, res) => {


  console.log(req.file);
  // res.send('done')
            const fileData = req.file.filename;
            const comments = req.body.comments;

            const newAssignment = new CompletedAssignmentModel({
              attachment: fileData, // Assuming you have a field named fileData in your schema
              comments: comments,
            });

            // console.log(newAssignment)
            
            try {
              const insertedAssignment = await newAssignment.save();
              res.json({ message: 'File uploaded and assignment submitted successfully!', assignment: insertedAssignment });
            } catch (error) {
              console.error('Error inserting assignment:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }


            // res.json({ message: 'File uploaded successfully!' });
  });


  router.get('/getAssignmentPDF/:id', async(req, res) => {
    const assignmentId = req.params.id;
// res.send(assignmentId)
    try {
      const assignment = await CompletedAssignmentModel.findById(assignmentId);
     
  
    
      res.send({data:assignment});
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('Internal Server Error');
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