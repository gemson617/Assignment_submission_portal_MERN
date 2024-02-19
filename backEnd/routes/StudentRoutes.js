const express = require('express')
const multer = require('multer');
const router = express.Router()
const AssignmentModel = require('../models/AssignmentModels')
const CompletedAssignmentModel = require('../models/CompletedAssignmentsModel')
const studentModel = require('../models/StudentModel')
const {protect} = require('../middleware/AuthMiddleware')



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

            const fileData = req.file.filename;

            const assignmentId =  req.body.assignmentId;
            // const studentId = '65ad2cda37e1038743c9b06b';

            const student = req.student;
            const studentId = student._id;

            const comments = req.body.comments;


            const assignmentDetails = await AssignmentModel.findById(assignmentId).select({
              _id: 0,       
              classes: 0,   
              section: 0,   
              status: 0,   
              updatedAt: 0,   
              __v: 0,   
            });

            const studentDetails = await studentModel.findById(studentId).select({ 
              _id: 0,        
              status: 0,   
              timestamps: 0,   
              __v: 0,   
            });


            const newAssignment = new CompletedAssignmentModel({
              attachment         :   fileData,
              comments           :   comments,
              studentId          :   studentId,
              assignmentId       :   assignmentId,
              assignmentDetails  :   assignmentDetails,
              studentDetails     :   studentDetails,
            });

            
            try {
              const insertedAssignment = await newAssignment.save();

              res.json({ message: 'File uploaded and assignment submitted successfully!', success:true });
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
     
  
      console.log('Assignment Id : ' +assignment)

      res.send({data:assignment});
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('Internal Server Error');
    }

  });


  router.post('/addAssignment', async(req, res) => {
    const newAssignment = req.body;
  // console.log(newAssignment)
  
    try {
        const Assignment =await AssignmentModel.insertMany(newAssignment);
        res.json(Assignment)
    } catch (error) {
      res.status(500).json({"msg":'something went wrong on post...'})
    }
  
    });


    router.get('/getAssignments',protect, async(req, res) => {


      const student = req.student;
      const studentId = student._id;

      const studentDetails = await studentModel.findById(studentId);


     const assignments = await AssignmentModel.find( { classes: studentDetails.classes } );
     const completedAssignments = await CompletedAssignmentModel.find({ studentId: studentId });


     const filteredAssignments = assignments.filter(assignment => {
       // Assuming assignment._id and completedAssignment.assignmentId are both ObjectId
       return !completedAssignments.some(completedAssignment =>
         completedAssignment.assignmentId === String(assignment._id)
       );
     });

      try {

          assignment = await AssignmentModel.find({});
       
        res.send({data:filteredAssignments});
      } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).send('can\'t get assignments..sorry Admin!');
      }
  
    });



    router.get('/getSubmitted/:id', async(req, res) => {

      const studentId = req.params.id;

      try {

            const completedAssignments = await CompletedAssignmentModel.find({ studentId: studentId });

            res.send({data:completedAssignments});
          //  console.log(completedAssignments)
      } catch (error) {

            console.error('Error fetching PDF:', error);
            res.status(500).send('can\'t get assignments..sorry Admin!');

      }
  
    });


       // GET ASSIGNMENT BY ID - TO UPDATE
  router.get('/getAssignmentsById/:id', async(req, res) => {
    const id = req.params.id;
  
    let assignment;
    try {

        // Default query when no specific conditions are met
        assignment = await AssignmentModel.findById(id);
        console.log(assignment)
     
      res.send({data:assignment});
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('can\'t get assignments..sorry Admin!');
    }

  });



  module.exports = router